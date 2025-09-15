"use client";
import http from "@/shared/libs/http";
import { InfluencerInformation } from "@/shared/types/data/influencer-types";
import { Box, Group, Loader, Modal, SimpleGrid, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import dateFormatter from "@/shared/utils/date-formatter";
import DetailUserModalProps from "@/shared/types/common/modal-detail-user-types";

const ModalDetailUser = ({ id, opened, onClose }: DetailUserModalProps) => {
  const getUserData = async (id: string): Promise<InfluencerInformation> => {
    const res = await http.get(`/api/influencer/${id}`);
    return res.data.data;
  };

  const {
    data: userData,
    error,
    isError,
    isLoading,
  } = useQuery<InfluencerInformation>({
    queryKey: ["influencer", id],
    queryFn: () => getUserData(id),
    enabled: !!id, // Run the query if id is existed
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="User Detail"
      size="lg"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      {isLoading ? (
        <Group className="w-full h-full justify-center">
          <Loader />
        </Group>
      ) : isError ? (
        <Text c="red">
          {error instanceof Error ? error.message : "Something went wrong!"}
        </Text>
      ) : (
        <Group className="w-full h-full items-start flex-nowrap">
          <Image
            src={userData?.picture || "/default-user.png"}
            width={200}
            height={200}
            alt="userpicture"
            className="rounded-xl shadow-xl"
          />
          <Box className="max-w-xs">
            <SimpleGrid cols={2} spacing="xs" verticalSpacing="lg">
              <Text className="font-bold">Name: </Text>
              <Text>{userData?.fullName}</Text>
              <Text className="font-bold">Username: </Text>
              <Text>{userData?.userName}</Text>
              <Text className="font-bold">Followers: </Text>
              <Text>{userData?.followers}</Text>
              <Text className="font-bold">Join Date: </Text>
              <Text>{dateFormatter(userData?.createdAt ?? "")}</Text>
            </SimpleGrid>
          </Box>
        </Group>
      )}
    </Modal>
  );
};

export default ModalDetailUser;
