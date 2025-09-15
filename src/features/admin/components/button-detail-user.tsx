"use client";
import ButtonDetailProps from "@/shared/types/common/button-detail-types";
import { Button } from "@mantine/core";

const ButtonDetailUser = ({
  userId,
  onClick,
  color,
  label,
}: ButtonDetailProps) => {
  return (
    <Button
      color={color}
      size="xs"
      variant="outline"
      onClick={() => onClick(userId)}
    >
      {label}
    </Button>
  );
};

export { ButtonDetailUser };
