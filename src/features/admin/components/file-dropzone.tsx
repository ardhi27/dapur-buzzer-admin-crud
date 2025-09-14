"use client";
import { Group, Text } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import DropzoneFileProps from "@/shared/types/common/dropzone-types";

const DropzoneFile = ({ onFileSelect, ...props }: DropzoneFileProps) => {
  return (
    <Dropzone
      onDrop={(files) => {
        onFileSelect?.(files[0] ?? null);
        props.onDrop?.(files);
        console.log("Files", files[0]);
      }}
      onReject={(files) => {
        console.log("rejected files", files);
        props.onReject?.(files);
      }}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={52}
            color="var(--mantine-color-blue-6)"
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            size={52}
            color="var(--mantine-color-dimmed)"
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select image files
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};

export default DropzoneFile;
