/**
 * This components used for input data.
 */

"use client";
import { Button, Input, Stack, Text } from "@mantine/core";
import DropzoneFile from "./file-dropzone";
import { InfluencerRegisterData } from "@/shared/types/data/influencer-types";
import { Controller, useForm } from "react-hook-form";
import http from "@/shared/libs/http";

const InputData = () => {
  const { register, handleSubmit, control } = useForm<InfluencerRegisterData>({
    defaultValues: {
      userName: "",
      fullName: "",
      followers: 0,
      picture: null,
    },
  });

  const onSubmit = async (data: InfluencerRegisterData) => {
    try {
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("fullName", data.fullName);
      formData.append("followers", data.followers.toString());
      if (data.picture) {
        formData.append("picture", data.picture);
      }
      console.log("Form Data", formData);
      const res = await http.post("/api/influencer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack className="w-3xl max-md:w-md bg-white p-10 rounded-xl shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack className="w-full">
          <Text className="text-black font-medium">Input Fullname's</Text>
          <Input {...register("fullName")} placeholder="Full Name"></Input>
          <Text className="text-black font-medium">
            Input Username's Instagram Influencer
          </Text>
          <Input {...register("userName")} placeholder="@username"></Input>
          <Text className="text-black font-medium">
            Input Instagram's Followers
          </Text>
          <Input {...register("followers")} placeholder="Followers"></Input>
          <Text className="text-black font-medium">Input Photo Profile</Text>
          <Controller
            control={control}
            name="picture"
            render={({ field }) => (
              <DropzoneFile onFileSelect={(file) => field.onChange(file)} />
            )}
          />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-600">
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default InputData;
