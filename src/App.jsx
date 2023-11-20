import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Loading } from "./components/Loading.jsx";
import { Router } from "./general/Router.jsx";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const PageWithHeader = ({ children }) => (
  <div className="flex h-full flex-col">{children}</div>
);

export const App = () => (
  <BrowserRouter>
    <Suspense
      fallback={
        <PageWithHeader>
          <Loading name="suspense" />
        </PageWithHeader>
      }
    >
      <Router />
    </Suspense>
  </BrowserRouter>
);
