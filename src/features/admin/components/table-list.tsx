"use client";
import { useState, useEffect } from "react";
import { Anchor, Group, Table, Button, Text } from "@mantine/core";
import axios from "axios";
import { InfluencerInformation } from "@/shared/types/data/influencer-types";

const TableData = () => {
  const [data, setData] = useState<InfluencerInformation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/influencer");
        setData(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text c="red">{error}</Text>;

  const rows = data.map((row) => (
    <Table.Tr key={row.userName}>
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
