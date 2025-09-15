"use client";
import { Anchor, Group, Table, Button, Text, Loader } from "@mantine/core";
import { InfluencerInformation } from "@/shared/types/data/influencer-types";
import http from "@/shared/libs/http";
import { useQuery } from "@tanstack/react-query";
import dateFormatter from "@/shared/utils/date-formatter";
import { useState } from "react";
import ButtonManageUser from "./button-manage-user";
import ModalDetailUser from "./modal-detail-user";
import ButtonDeleteUser from "./button-delete-user";
import ModalUpdateUser from "./modal-update-user";

const TableData = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const getData = async (): Promise<InfluencerInformation[]> => {
    const res = await http.get("/api/influencer");
    return res.data.data;
  };

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery<InfluencerInformation[]>({
    queryKey: ["influencers"],
    queryFn: getData,
  });

  const openDetailModal = (id: string) => {
    setSelectedUserId(id);
    setDetailModalOpen(true);
  };

  const openUpdateModal = (id: string) => {
    setSelectedUserId(id);
    setUpdateModalOpen(true);
  };
  const handleCloseModal = () => {
    setDetailModalOpen(false);
    setUpdateModalOpen(false);
    setSelectedUserId(null);
  };

  if (isLoading)
    return (
      <Group className="w-full h-full justify-center">
        <Loader />
      </Group>
    );
  if (isError)
    return (
      <Text c="red">
        {error instanceof Error ? error.message : "Something went wrong!"}
      </Text>
    );

  const rows = userData?.map((row, index) => (
    <Table.Tr key={row.id}>
      <Table.Td className="text-black">{index + 1}</Table.Td>
      <Table.Td>
        <Anchor component="button" fz="sm">
          {row.fullName}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" fz="sm">
          {row.userName}
        </Anchor>
      </Table.Td>
      <Table.Td className="text-black">
        {Intl.NumberFormat().format(row.followers)}
      </Table.Td>
      <Table.Td className="text-black">{dateFormatter(row.createdAt)}</Table.Td>
      <Table.Td>
        <Group className="w-full justify-center">
          <ButtonManageUser
            label="Update"
            userId={String(row.id)}
            onClick={openUpdateModal}
            color="blue"
          />
          <ButtonDeleteUser userId={String(row.id)} />
          <ButtonManageUser
            label="Detail"
            userId={String(row.id)}
            onClick={openDetailModal}
            color="purple"
          />
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr className="text-black">
              <Table.Th>No</Table.Th>
              <Table.Th>Full Name</Table.Th>
              <Table.Th>Username</Table.Th>
              <Table.Th>Followers</Table.Th>
              <Table.Th>Join Date</Table.Th>
              <Table.Th className="text-center">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {selectedUserId && (
        <ModalDetailUser
          opened={detailModalOpen}
          onClose={handleCloseModal}
          id={selectedUserId}
        />
      )}

      {selectedUserId && (
        <ModalUpdateUser
          opened={updateModalOpen}
          onClose={handleCloseModal}
          id={selectedUserId}
        />
      )}
    </div>
  );
};

export default TableData;
