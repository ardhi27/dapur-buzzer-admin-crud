"use client";
import { Anchor, Group, Progress, Table, Text, Button } from "@mantine/core";

const data = [
  {
    fullname: "Isaac Asimov",
    username: "iasimov",
    joinDate: "1951-01-01",
    followers: 20000,
  },
  {
    fullname: "Mary Shelley",
    username: "mshelley",
    joinDate: "1818-01-01",
    followers: 100000,
  },
  {
    fullname: "Stanislaw Lem",
    username: "slem",
    joinDate: "1961-01-01",
    followers: 75000,
  },
  {
    fullname: "Frank Herbert",
    username: "fherbert",
    joinDate: "1965-01-01",
    followers: 120000,
  },
  {
    fullname: "Ursula K. Le Guin",
    username: "ukleguin",
    joinDate: "1969-01-01",
    followers: 85000,
  },
  {
    fullname: "Philip K Dick",
    username: "pkdick",
    joinDate: "1977-01-01",
    followers: 95000,
  },
];

const TableData = () => {
  const rows = data.map((row) => (
    <Table.Tr key={row.username}>
      <Table.Td>
        <Anchor component="button" fz="sm">
          {row.fullname}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" fz="sm">
          {row.username}
        </Anchor>
      </Table.Td>
      <Table.Td className="text-black">
        {Intl.NumberFormat().format(row.followers)}
      </Table.Td>
      <Table.Td className="text-black">{row.joinDate}</Table.Td>
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
