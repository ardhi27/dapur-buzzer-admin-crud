"use client";
import { Button, Input, Stack, Text } from "@mantine/core";
import DropzoneFile from "./file-dropzone";
import { InfluencerRegisterData } from "@/shared/types/data/influencer-types";
import { Controller, useForm } from "react-hook-form";
import http from "@/shared/libs/http";
import { ErrorText } from "./error-text";

const InputData = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InfluencerRegisterData>({
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
          <Input
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Full Name"
          />
          <ErrorText message={errors.fullName?.message} />

          <Text className="text-black font-medium">
            Input Username's Instagram Influencer
          </Text>
          <Input
            {...register("userName", { required: "Username is required" })}
            placeholder="@username"
          />
          <ErrorText message={errors.fullName?.message} />

          <Text className="text-black font-medium">
            Input Instagram's Followers
          </Text>
          <Input
            type="number"
            {...register("followers", {
              required: "Followers count is required",
              valueAsNumber: true,
            })}
            placeholder="Followers"
          />
          <ErrorText message={errors.followers?.message} />
          <Text className="text-black font-medium">Input Photo Profile</Text>
          <Controller
            control={control}
            name="picture"
            rules={{ required: "Profile picture is required" }}
            render={({ field }) => (
              <DropzoneFile onFileSelect={(file) => field.onChange(file)} />
            )}
          />
          <ErrorText message={errors.picture?.message as string | undefined} />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-600">
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default InputData;
