"use client";
import { Button, Group, Stack, Text } from "@mantine/core";
import Image from "next/image";
import companyLogo from "@/assets/logo-color.png";
import LayoutProps from "@/shared/types/layout-types";
import { IconList } from "@tabler/icons-react";
import useSidebarMenu from "../hooks/use-sidebar-menu";
import SidebarMenu from "./sidebar";

const LayoutPage = ({ children }: LayoutProps) => {
  const { isOpen, open, close } = useSidebarMenu();
  return (
    <Stack className={`w-screen min-h-screen p-3 bg-gray-200/50`}>
      <SidebarMenu isOpen={isOpen} close={close} />
      <header className={`w-full rounded-md h-[6rem] bg-white shadow-md`}>
        <Group className="w-full h-full py-2 px-5 justify-between" gap={5}>
          <Button onClick={() => open()}>
            <IconList />
          </Button>
          <Image src={companyLogo} className="w-20 h-11" alt="company-logo" />
        </Group>
      </header>
      <Stack className={`text-white`}>{children}</Stack>
    </Stack>
  );
};

export default LayoutPage;
