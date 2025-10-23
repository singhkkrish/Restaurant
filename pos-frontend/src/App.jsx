import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home, Auth, Orders, Tables, Menu, Dashboard } from "./pages"
import Header from "./components/shared/Header"
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useLoadData from "./hooks/useLoadData";
import FullScreenLoader from "./components/shared/FullScreenLoader";
import { GrDashboard } from "react-icons/gr";

function Layout() {
  const location = useLocation();
  const isLoading = useLoadData();
  const hideHeaderRoutes = ["/auth"];
  const { isAuth } = useSelector(state => state.user);
  if (isLoading) return <FullScreenLoader />
  return (
    <>

      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<ProtectedRoutes>
          <Home />
        </ProtectedRoutes>} />
        <Route path="/auth" element={isAuth ? <Navigate to="/" /> : <Auth />} />
        <Route path="/orders" element={<ProtectedRoutes>
          <Orders />
        </ProtectedRoutes>} />
        <Route path="/tables" element={<ProtectedRoutes>
          <Tables />
        </ProtectedRoutes>} />
        <Route path="/menu" element={<ProtectedRoutes>
          <Menu />
        </ProtectedRoutes>} />
        <Route path="/dashboard" element={<ProtectedRoutes>
          <Dashboard />
        </ProtectedRoutes>} />
        <Route path="*" element={<div> Not Found</div>} />
      </Routes>

    </>
  )
}
//  protects certain routes so that only logged-in (authenticated) users can access them.
function ProtectedRoutes({ children }) {
  const { isAuth } = useSelector((state) => state.user);
  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return children;
}
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
