import { useEffect, useState } from "react";
import { useAxios } from "../components/hooks/useAxios";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import "./app.css";

import PanelLayout from "../components/layout/PanelLayout";
import LoginPage from "../pages/login";

import { Spin } from "antd";

function App({ Component, pageProps }) {
  switch (Component.name) {
    case "LoginPage":
      return <LoginPage {...pageProps} />;
    default:
      return (
        <PanelLayout>
          <Component {...pageProps} />
        </PanelLayout>
      );
  }
}

export default App;
