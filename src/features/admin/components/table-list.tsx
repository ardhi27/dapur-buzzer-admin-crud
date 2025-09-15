"use client";
import { Anchor, Group, Table, Button, Text } from "@mantine/core";
import { InfluencerInformation } from "@/shared/types/data/influencer-types";
import http from "@/shared/libs/http";
import { useQuery } from "@tanstack/react-query";

const TableData = () => {
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

  if (isLoading) return <Text>Loading...</Text>;
  if (isError)
    return (
      <Text c="red">
        {error instanceof Error ? error.message : "Something went wrong!"}
      </Text>
    );

  const rows = userData?.map((row) => (
    <Table.Tr key={row.id}>
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
      <Table.Td className="text-black">{row.createdAt}</Table.Td>
      <Table.Td>
        <Group className="w-full justify-center">
          <Button color="blue" size="xs" variant="outline">
            Edit
          </Button>
          <Button color="red" size="xs" variant="outline">
            Delete
          </Button>
          <Button color="purple" size="xs" variant="outline">
            Detail
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr className="text-black">
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
  );
};

export default TableData;
