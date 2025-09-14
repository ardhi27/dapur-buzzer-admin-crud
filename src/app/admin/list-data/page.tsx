import TableData from "@/features/admin/components/table-list";
import LayoutPage from "@/features/common/components/layout";
import { Stack, Text } from "@mantine/core";

const ListData = () => {
  return (
    <LayoutPage>
      <Stack className="w-full p-5 bg-white shadow-xl">
        <Text className="text-black font-bold text-center">
          Data Influencer
        </Text>
        <TableData />
      </Stack>
    </LayoutPage>
  );
};

export default ListData;
