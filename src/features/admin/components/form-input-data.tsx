"use client";
import { Button, Stack, Input, Text } from "@mantine/core";
import {
  ApiResponse,
  InfluencerRegisterData,
} from "@/shared/types/data/influencer-types";
import { Controller, useForm } from "react-hook-form";
import http from "@/shared/libs/http";
import { ErrorText } from "./error-text";
import { useState } from "react";
import { AxiosError } from "axios";
import DropzoneFile from "@/features/admin/components/file-dropzone";
import { useMutation } from "@tanstack/react-query";
import query from "@/shared/libs/query-client";

const InputData = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createUserMutation = useMutation({
    mutationFn: async (
      data: FormData
    ): Promise<ApiResponse<InfluencerRegisterData>> => {
      const res = await http.post("/api/influencer/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["influencers"] });
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
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
      if (data.picture) formData.append("picture", data.picture);

      const res = await createUserMutation.mutateAsync(formData);

      if (res.error) {
        setSuccessMessage(null);

        if (Array.isArray(res.error)) {
          // Map error Zod ke masing-masing field react-hook-form.
          res.error.forEach((issue: any) => {
            const field = issue.path[0];
            setError(field as keyof InfluencerRegisterData, {
              type: "manual",
              message: issue.message,
            });
          });
        } else {
          setErrorMessage(res.error);
        }
        return;
      }

      // Success.
      setSuccessMessage("Success input data");
      setErrorMessage(null);

      //Reset data after input's success.
      reset({
        userName: "",
        fullName: "",
        followers: 0,
        picture: null,
      });
    } catch (err) {
      const axiosErr = err as AxiosError<{ error?: string | any[] }>;
      if (Array.isArray(axiosErr.response?.data.error)) {
        const messages = axiosErr.response.data.error
          .map((issue: any) => issue.message)
          .join(", ");
        setErrorMessage(messages);
      } else {
        setErrorMessage(
          axiosErr.response?.data.error ?? "Unexpected error occurred"
        );
      }
      setSuccessMessage(null);
    }
  };

  return (
    <Stack className="w-3xl max-md:w-md bg-white p-10 rounded-xl shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack className="w-full">
          <Text className="text-black font-medium">Full Name</Text>
          <Input
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Full Name"
          />
          <ErrorText message={errors.fullName?.message} />

          <Text className="text-black font-medium">Instagram Username</Text>
          <Input
            {...register("userName", { required: "Username is required" })}
            placeholder="@username"
          />
          <ErrorText message={errors.userName?.message} />

          <Text className="text-black font-medium">Instagram Followers</Text>
          <Input
            type="number"
            {...register("followers", {
              required: "Followers count is required",
              valueAsNumber: true,
            })}
            placeholder="Followers"
          />
          <ErrorText message={errors.followers?.message} />

          <Text className="text-black font-medium">Profile Picture</Text>
          <Controller
            control={control}
            name="picture"
            rules={{ required: "Profile picture is required" }}
            render={({ field }) => (
              <DropzoneFile
                value={field.value}
                onFileSelect={(file) => field.onChange(file)}
              />
            )}
          />
          <ErrorText message={errors.picture?.message as string | undefined} />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-600">
            Submit
          </Button>

          {successMessage && (
            <Text className="text-green-600 font-bold">{successMessage}</Text>
          )}
          {errorMessage && (
            <Text className="text-red-600 font-bold">{errorMessage}</Text>
          )}
        </Stack>
      </form>
    </Stack>
  );
};

export default InputData;
