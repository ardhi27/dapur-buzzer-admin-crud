"use client";
import { Button, Group, Stack, Text } from "@mantine/core";
import Image from "next/image";
import companyLogo from "@/assets/logo-color.png";
import { IconFileUpload, IconHome, IconList, IconX } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import SidebarProps from "@/shared/types/common/sidebar-types";
const SidebarMenu = ({ isOpen, close }: SidebarProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Stack
      className={`w-xs h-screen fixed z-1000 shadow-xl top-0 left-0 p-5 bg-white`}
    >
      <Group className="w-full justify-between">
        <Image src={companyLogo} className="w-20 h-11" alt="company-logo" />
        <Button
          onClick={() => close()}
          className="bg-transparent hover:bg-transparent"
        >
          <IconX className="text-gray-500" />
        </Button>
      </Group>
      <Stack className="p-3 h-full my-20">
        <Button
          onClick={() => redirect("/")}
          className="bg-transparent hover:bg-transparent"
        >
          <Group className="w-xs">
            <IconHome className="text-gray-500" />
            <Text className="text-gray-500">Dashboard</Text>
          </Group>
        </Button>
        <Button
          onClick={() => redirect("/admin/create-data")}
          className="bg-transparent hover:bg-transparent"
        >
          <Group className="w-xs">
            <IconFileUpload className="text-gray-500" />
            <Text className="text-gray-500">Input Data</Text>
          </Group>
        </Button>
        <Button
          onClick={() => redirect("/admin/list-data")}
          className="bg-transparent hover:bg-transparent"
        >
          <Group className="w-xs">
            <IconList className="text-gray-500" />
            <Text className="text-gray-500">List Data</Text>
          </Group>
        </Button>
      </Stack>
    </Stack>
  );
};

export default SidebarMenu;
