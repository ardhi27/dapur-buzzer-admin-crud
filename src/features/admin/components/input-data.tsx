/**
 * This components used for input data.
 */

"use client";
import { Button, Input, Stack, Text } from "@mantine/core";
import DropzoneFile from "./file-dropzone";

const InputData = () => {
  return (
    <Stack className="w-3xl max-md:w-md">
      <form>
        <Stack className="w-full">
          <Text className="text-black font-medium">Input Fullname's</Text>
          <Input placeholder="@username"></Input>
          <Text className="text-black font-medium">
            Input Username's Instagram Influencer
          </Text>
          <Input placeholder="John Doe"></Input>
          <Text className="text-black font-medium">Input Photo Profile</Text>
          <DropzoneFile />
          <Button className="bg-purple-600 hover:bg-purple-600">Submit</Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default InputData;
