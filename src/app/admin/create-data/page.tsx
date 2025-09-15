"use client";
import InputData from "@/features/admin/components/input-data";
import LayoutPage from "@/features/common/components/layout";
import { Stack } from "@mantine/core";

const CreateInfluencerPage = () => {
  return (
    <LayoutPage>
      <Stack className="w-full items-center my-20">
        <InputData />
      </Stack>
    </LayoutPage>
  );
};

export default CreateInfluencerPage;
