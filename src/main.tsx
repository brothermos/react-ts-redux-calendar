// redux
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store";

import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react"; // chakra

import { RouterProvider } from "react-router-dom"; // router provider

import router from "./routes/root"; // router

import "./global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <Provider store={store}>
      {/* <React.StrictMode> */}
      <ChakraProvider>
         <RouterProvider router={router} />
      </ChakraProvider>
      {/* </React.StrictMode> */}
   </Provider>
);
