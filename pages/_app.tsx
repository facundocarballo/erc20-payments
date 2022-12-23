import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { DappProvider } from "../src/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DappProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </DappProvider>
  );
}
