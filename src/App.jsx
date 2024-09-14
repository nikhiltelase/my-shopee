import React, { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import RoutesConfig from "./utils/RoutesConfig";
import WatchLoader from "./components/loaders/WatchLoader"
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const routes = RoutesConfig();

function App() {
  return (
    <HashRouter>
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
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.route}
            element={<Suspense fallback={<WatchLoader />}>{route.element}</Suspense>}
          />
        ))}
      </Routes>
    </HashRouter>
  );
}

export default App;
