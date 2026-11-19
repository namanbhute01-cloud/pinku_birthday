import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./app/App";

import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/caveat/latin-400.css";
import "@fontsource/caveat/latin-600.css";

import "./styles/theme.css";
import "./styles/global.css";
import "./styles/scrapbook.css";
import "./styles/chapters.css";
import "./styles/intro.css";
import "./styles/animations.css";
import "./styles/page-turn.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);
