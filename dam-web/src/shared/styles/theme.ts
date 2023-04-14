import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { Inter } from "@next/font/google";
import { Input } from "./components";

const inter = Inter({ subsets: ["latin"] });

export const theme = extendTheme(
  {
    components: {
      Input,
    },
    fonts: {
      heading: inter.style.fontFamily,
      body: inter.style.fontFamily,
    },
    styles: {
      global: {
        body: {
          backgroundColor: "gray.50",
        },
        p: {
          color: "gray.600",
          fontSize: "sm",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "blue" })
);
