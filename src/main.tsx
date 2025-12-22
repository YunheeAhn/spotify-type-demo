import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App";

// MUI 테마 적용을 위한 ThemeProvider 추가
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* CssBaseline: MUI에서 제공하는 기본 CSS 리셋 및 글로벌 스타일 적용 */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
