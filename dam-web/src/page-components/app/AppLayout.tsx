import { Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Sidebar } from "../../components";

type AppLayoutProps = {
  noPad?: boolean;
  children: React.ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children, noPad }) => {
  const padding = useMemo(() => {
    return noPad ? { p: 0 } : { px: 6, py: 6 };
  }, [noPad]);

  return (
    <Flex h="100vh">
      <Sidebar />
      <Flex
        direction="column"
        bg="#FBF9FF"
        overflowY="auto"
        flex={1}
        {...padding}
      >
        {children}
      </Flex>
    </Flex>
  );
};
