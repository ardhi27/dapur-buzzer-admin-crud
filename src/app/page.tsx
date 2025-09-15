"use client";
import TableData from "@/features/admin/components/table-list";
import LayoutPage from "@/features/common/components/layout";
import { Button, Group, Stack, Text } from "@mantine/core";
import { redirect } from "next/navigation";

const ListData = () => {
  return (
    <LayoutPage>
      <Stack className="w-full p-5 bg-white shadow-xl">
        <Group className="w-full justify-between">
          <Text className="text-black font-bold text-center">Dashboard</Text>
          <Text className="text-black font-bold text-center">
            Data Influencer
          </Text>
          <Button onClick={() => redirect("/admin/create-data")}>
            Tambah Data
          </Button>
        </Group>
        <TableData />
      </Stack>
    </LayoutPage>
  );
};

export default ListData;
