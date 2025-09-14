import InputData from "@/features/admin/components/input-data";
import LayoutPage from "@/features/common/components/layout";
import SidebarMenu from "@/features/common/components/sidebar";
import { Stack, Text } from "@mantine/core";

const CreateInfluencerPage = () => {
  return (
    <LayoutPage>
      <Stack className="w-full items-center my-20">
        <SidebarMenu />
        <InputData />
      </Stack>
    </LayoutPage>
  );
};

export default CreateInfluencerPage;
