import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoutesConfig from "./utils/RoutesConfig";
import Loader from "./components/loaders/Loader"
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const routes = RoutesConfig();

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.route}
            element={<Suspense fallback={<Loader />}>{route.element}</Suspense>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
