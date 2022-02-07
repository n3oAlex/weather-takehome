import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { GiveHead } from "../src/utils/GiveHead";
import { ThemeProvider, styled } from "@mui/material/styles";
import { WeatherContextProvider } from "../src/contexts/WeatherContext";
import { theme } from "../src/theme";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "../src/utils/createEmotionCache";

const AppWrapper = styled("div")((p) => ({
  backgroundColor: "#111729",
  color: "#85A3B7",
  maxWidth: "100vw",
  minHeight: "100vh",
}));

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <GiveHead title="Weather takehome" options={{ overrideTitle: true }} />
      <ThemeProvider theme={theme}>
        <WeatherContextProvider>
          <CssBaseline />
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </WeatherContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
