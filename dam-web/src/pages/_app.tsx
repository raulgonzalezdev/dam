import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ApiProvider } from "../hooks/useApi";
import { theme } from "../shared/styles/theme";
import Router from "next/router";
import { useEffect } from "react";
import { checkJwtIsValid } from "../shared/utils/check";
import { useAuthStore } from "../stores/useAuthStore";
import { reroute } from "../shared/utils/route";

export default function App({ Component, pageProps }: AppProps) {
  const access = useAuthStore(({ access }) => access);

  useEffect(() => {
    reroute(access);
  }, [access]);

  return (
    <ChakraProvider theme={theme}>
      <ApiProvider>
        <Component {...pageProps} />
      </ApiProvider>
    </ChakraProvider>
  );
}
