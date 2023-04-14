import { Avatar, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { BiCog } from "react-icons/bi";
import { menu } from "../constants/menu";
import { useAuthStore } from "../stores/useAuthStore";

interface SidebarItemProps {
  icon?: IconType;
  label: string;
  isSelected?: boolean;
  path?: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const router = useRouter();
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    if (props.path && router.pathname.startsWith(props.path)) {
      setSelected(true);
    }
  }, [router.pathname, props.path]);

  return (
    <Link href={props.path || "#"} passHref>
      <HStack
        spacing={2}
        px={3}
        py={3}
        role="group"
        _hover={{ bg: "blue.50" }}
        borderRadius={6}
        {...(isSelected ? { bg: "blue.50" } : null)}
        onClick={props.onClick}
      >
        {props.icon ? (
          <Icon
            as={props.icon}
            fontSize="22px"
            color="gray.600"
            _groupHover={{ color: "blue.500" }}
            {...(isSelected ? { color: "blue.500" } : null)}
          />
        ) : (
          <Avatar name={props.label} size="sm" colorScheme="gray" />
        )}

        <Text
          fontSize="sm"
          color="gray.600"
          _groupHover={{ color: "blue.500" }}
          {...(isSelected ? { color: "blue.500" } : null)}
        >
          {props.label}
        </Text>
      </HStack>
    </Link>
  );
};

export const Sidebar = () => {
  const { user, logout } = useAuthStore(({ user, logout }) => ({
    user,
    logout,
  }));

  return (
    <VStack w={72} spacing={7} bg="white" align="stretch">
      <Flex px={3} pt={5}>
        <Image
          src="/images/logo.png"
          style={{ objectFit: "fill" }}
          width={150}
          height={50}
          alt="DAM"
          priority
        />
      </Flex>
      <VStack spacing={2} p={3} align="stretch">
        {menu.ADM.map((item) => (
          <SidebarItem key={item.path} {...item} />
        ))}
      </VStack>
      <Flex flex="1" />
      <VStack align="stretch" spacing={3} p={3}>
        <SidebarItem
          label={`${user?.first_name} ${user?.last_name}` || ""}
          path="/me"
        />
        <SidebarItem icon={BiCog} label="Logout" onClick={logout} />
      </VStack>
    </VStack>
  );
};
