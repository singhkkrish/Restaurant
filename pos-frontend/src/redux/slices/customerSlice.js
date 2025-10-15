import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    orderId: '',
    customerName: '',
    customerPhone: '',
    guests: 0,
    tableNo: ""
}
const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomerName: (state, action) => {
            const { name, phone, guests } = action.payload;
            state.orderId = `${Date.now()}`;
            state.customerName = name;
            state.customerPhone = phone;
            state.guests = guests;
        },
        removeCustomer: (state) => {
            state.customerName = '';
            state.customerPhone = '';
            state.guests = 0; 
            state.tableNo = "";
        },
        updateTable: (state, action) => {
            state.tableNo = action.payload.tableNo;
        }
    }
})
export const { setCustomerName, removeCustomer, updateTable } = customerSlice.actions;
export default customerSlice.reducer;
