const Razorpay = require("razorpay");
const config = require("../config/config");
const crypto = require("crypto");
const createHttpError = require("http-errors");
const Payment = require("../models/paymentModel");

const createOrder = async (req, res, next) => {
    

    const razorpay = new Razorpay({
        key_id: config.razorpayKeyId,
        key_secret: config.razorpaySecretKey,
    });
    try {
        const { amount } = req.body;
        if (amount === undefined || amount === null) {
            const err = createHttpError(400, "Amount is required");
            return next(err);
        }

        const amountNum = Number(amount);
        if (Number.isNaN(amountNum) || amountNum <= 0) {
            const err = createHttpError(400, "Invalid amount");
            return next(err);
        }

        // If frontend sends rupees (e.g. 123.45) convert to paise.
        // If frontend sends paise already (large integer), keep as-is.
        let amountInPaise = amountNum;
        if (amountNum < 100000) { // heuristic: amounts < 100000 treated as rupees
            amountInPaise = Math.round(amountNum * 100);
        }

        const options = {
            amount: amountInPaise, // paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        // Log full error from razorpay so you can see 401 reason
        console.error("Razorpay createOrder error:", error);
        if (error && error.statusCode) {
            console.error("Razorpay response body:", error.error || error);
            return res.status(error.statusCode).json({
                success: false,
                message: error.error?.description || error.message || "Razorpay error"
            });
        }
        next(error);
    }
    // try {
    //     const { amount } = req.body;
    //     const options = {
    //         amount: Math.round(amount * 100), // Amount in paisa (1 INR = 100 paisa)
    //         currency: "INR",
    //         receipt: `receipt_${Date.now()}`,
    //     };

    //     const order = await razorpay.orders.create(options);
    //     res.status(200).json({ success: true, order });
    // } catch (error) {
    //     console.log(error);
    //     next(error);
    // }
};
// const verifyPayment = async (req, res, next) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//             req.body;
//         const expectedSignature = crypto
//             .createHmac("sha256", config.razorpaySecretKey)
//             .update(razorpay_order_id + "|" + razorpay_payment_id)
//             .digest("hex");
//         if (expectedSignature === razorpay_signature) {
//             res.json({ success: true, message: "Payment verified successfully!" });
//         } else {
//             const error = createHttpError(400, "Payment verification failed!");
//             return next(error);
//         }
//     } catch (error) {
//         next(error);
//     }
// }

const verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;

        const expectedSignature = crypto
            .createHmac("sha256", config.razorpaySecretKey)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // Fetch full payment details from Razorpay and persist to DB
            try {
                const razorpay = new Razorpay({
                    key_id: config.razorpayKeyId,
                    key_secret: config.razorpaySecretKey,
                });

                const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

                // normalize and save
                const newPayment = new Payment({
                    paymentId: paymentDetails.id,
                    orderId: paymentDetails.order_id,
                    amount: (paymentDetails.amount ?? 0) / 100, // paise -> INR
                    currency: paymentDetails.currency,
                    status: paymentDetails.status,
                    method: paymentDetails.method,
                    email: paymentDetails.email,
                    contact: paymentDetails.contact,
                    createdAt: paymentDetails.created_at
                        ? new Date(paymentDetails.created_at * 1000)
                        : new Date(),
                });

                await newPayment.save();
                return res.json({ success: true, message: "Payment verified and saved." });
            } catch (fetchErr) {
                console.error("Error fetching/saving payment:", fetchErr);
                // still return verification success or forward error per your needs
                return res.status(500).json({ success: false, message: "Payment verified but failed to save payment details." });
            }
        } else {
            const error = createHttpError(400, "Payment verification failed!");
            return next(error);
        }
    } catch (error) {
        next(error);
    }
}
const webHookVerification = async (req, res, next) => {
    try {
        const secret = config.razorpyWebhookSecret;
        const signature = req.headers["x-razorpay-signature"];
        const body = JSON.stringify(req.body);

        //  Verify the signature
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body)
            .digest("hex");

        if (expectedSignature === signature) {
            console.log("✅ Webhook verified:", req.body);
            // Process payment (e.g., update DB, send confirmation email)
            if (req.body.event === "payment.captured") {
                const payment = req.body.payload.payment.entity;
                console.log(`💰 Payment Captured: ${payment.amount / 100} INR`);
                const newPayment = new Payment({
                    paymentId: payment.id,
                    orderId: payment.order_id,
                    amount: payment.amount / 100,
                    currency: payment.currency,
                    status: payment.status,
                    method: payment.method,
                    email: payment.email,
                    contact: payment.contact,
                    createdAt: new Date(payment.created_at * 1000)
                })

                await newPayment.save();
            }
            res.json({ success: true });
        } else {
            const error = createHttpError(400, "❌ Invalid Signature!");
            return next(error);
        }

    }
    catch (error) {
        next(error);
    }
}
module.exports = { createOrder, verifyPayment, webHookVerification };