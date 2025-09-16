"use client";
import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation } from "@tanstack/react-query";
import http from "@/shared/libs/http";
import { InfluencerInformation } from "@/shared/types/data/influencer-types";
import query from "@/shared/libs/query-client";
import DeleteButtonUserProps from "@/shared/types/common/button-delete-types";

const ButtonDeleteUser = ({ userId }: DeleteButtonUserProps) => {
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string): Promise<InfluencerInformation> => {
      const res = await http.delete(`/api/influencer/${id}`);
      return res.data.data;
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["influencers"] });
    },
  });

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete Influencer's Data",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this influencer&apos;s data? This
          action is destructive and you will have to contact support to restore
          your data.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "Cancel" },
      confirmProps: { color: "red", loading: deleteUserMutation.isPending },
      onCancel: () => console.log("Cancel delete"),
      onConfirm: () => deleteUserMutation.mutate(userId),
    });

  return (
    <Button
      color="red"
      size="xs"
      variant="outline"
      onClick={openDeleteModal}
      loading={deleteUserMutation.isPending}
    >
      Delete
    </Button>
  );
};

export default ButtonDeleteUser;
