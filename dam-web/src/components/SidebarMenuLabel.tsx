import { HStack, Text } from "@chakra-ui/react";
import React from "react";

interface SidebarMenuLabelProps {
  label: string;
  id: number;
}
const SidebarMenuLabel: React.FC<SidebarMenuLabelProps> = ({ label, id }) => {
  return (
    <HStack
      w="full"
      align="flex-start"
      color="purple.500"
      borderRadius={10}
      px={3}
      pt={4}
    >
      <Text
        fontSize={14}
        mt={1}
        fontWeight="semibold"
        textTransform="uppercase"
      >
        {label}
      </Text>
    </HStack>
  );
};

export default SidebarMenuLabel;
