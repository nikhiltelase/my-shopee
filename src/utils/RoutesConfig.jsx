import React, { lazy } from "react";
import Profile from "../pages/Profile";
import OrderDetails from "../pages/OrderDetails";


const Home = lazy(() => import("../pages/Home"));
const CartList = lazy(() => import("../pages/CartList"));
const Category = lazy(() => import("../pages/Category"));
const ItemView = lazy(() => import("../pages/ItemView"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));
const Login = lazy(() => import("../pages/authonticateUser/Login"));
const Register = lazy(() => import("../pages/authonticateUser/Register"));
const ForgetPass = lazy(() => import("../pages/authonticateUser/ForgetPass"));

function RoutesConfig() {
  const routes = [
    {
      route: "/",
      element: <Home />,
    },
    {
      route: "/cart",
      element: <CartList />,
    },
    {
      route: "/category/:category",
      element: <Category />,
    },
    {
      route: "/item/:itemId",
      element: <ItemView />,
    },
    {
      route: "/checkout",
      element: <Checkout />,
    },
    {
      route: "/order-success",
      element: <OrderSuccess />,
    },
    {
      route: "/login",
      element: <Login />,
    },
    {
      route: "/register",
      element: <Register />,
    },{
      route: "/forget-password",
      element: <ForgetPass />,
    },
    {
      route: "/profile/:option",
      element: <Profile />,
    },
    {
      route: "/order-details/:orderId",
      element: <OrderDetails/>,
    },
  ];

  return routes;
}

export default RoutesConfig;
