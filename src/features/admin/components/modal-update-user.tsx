"use client";
import http from "@/shared/libs/http";
import query from "@/shared/libs/query-client";
import UserModalProps from "@/shared/types/common/modal-detail-user-types";
import {
  ApiResponse,
  UpdatedInfluencerInformation,
} from "@/shared/types/data/influencer-types";
import { Button, Input, Modal, Stack, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { ErrorText } from "./error-text";
import DropzoneFile from "./file-dropzone";
import { useState } from "react";
import { ZodIssue } from "zod/v3";
import { AxiosError } from "axios";

const ModalUpdateUser = ({ id, opened, onClose }: UserModalProps) => {
  const updateUserMutation = useMutation({
    mutationFn: async (
      data: FormData
    ): Promise<ApiResponse<UpdatedInfluencerInformation>> => {
      const res = await http.patch(`/api/influencer/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["influencers"] });
    },
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<UpdatedInfluencerInformation>({
    defaultValues: {
      userName: "",
      fullName: "",
      followers: 0,
      picture: null,
    },
  });

  const onSubmit = async (data: UpdatedInfluencerInformation) => {
    try {
      const formData = new FormData();

      if (data.userName) formData.append("userName", data.userName);
      if (data.fullName) formData.append("fullName", data.fullName);
      if (data.followers !== undefined && data.followers !== null) {
        formData.append("followers", data.followers.toString());
      }
      if (data.picture) formData.append("picture", data.picture);
      const res = await updateUserMutation.mutateAsync(formData);

      if (Array.isArray(res.error)) {
        //Validation Error(Zod)
        (res.error as ZodIssue[]).forEach((issue) => {
          const field = issue.path[0];
          setError(field as keyof UpdatedInfluencerInformation, {
            type: "manual",
            message: issue.message,
          });
        });
        return;
      }

      //General Error
      if (res.error) {
        setErrorMessage(res.error);
      }
      // Success.
      setSuccessMessage("Success update data");
      setErrorMessage(null);

      reset({
        userName: "",
        fullName: "",
        followers: 0,
        picture: null,
      });
    } catch (err) {
      const axiosErr = err as AxiosError<{ error?: string | ZodIssue[] }>;

      if (Array.isArray(axiosErr.response?.data.error)) {
        const messages = (axiosErr.response?.data.error as ZodIssue[])
          .map((issue) => issue.message)
          .join(", ");
        setErrorMessage(messages);
      } else {
        setErrorMessage(
          axiosErr.response?.data.error ?? "Unexpected error occurred"
        );
      }

      setSuccessMessage(null);
      console.error(err);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Update Data" centered>
      <Stack className="max-md:w-md p-10 rounded-xl shadow-2xl">
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
            <ErrorText
              message={errors.picture?.message as string | undefined}
            />
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
    </Modal>
  );
};

export default ModalUpdateUser;
