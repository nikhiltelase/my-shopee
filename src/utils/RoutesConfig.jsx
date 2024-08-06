import React, { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const CartList = lazy(() => import("../pages/CartList"));
const Category = lazy(() => import("../pages/Category"));
const ItemView = lazy(() => import("../pages/ItemView"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

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
    }
  ];

  return routes;
}

export default RoutesConfig;
