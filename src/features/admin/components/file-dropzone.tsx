"use client";
import { Group, Text } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import DropzoneFileProps from "@/shared/types/common/dropzone-types";
import { useState } from "react";

const DropzoneFile = ({ onFileSelect, ...props }: DropzoneFileProps) => {
  const [file, setIsFile] = useState<File | null>(null);

  return (
    <Dropzone
      onDrop={(files) => {
        const selected = files[0] ?? null;
        onFileSelect?.(selected);
        props.onDrop?.(files);
        setIsFile(selected);
        console.log("Files", selected);
      }}
      onReject={(files) => {
        console.log("rejected files", files);
        props.onReject?.(files);
      }}
      className={`${file ? "bg-black" : ""}`}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      {file ? (
        <div className="relative flex flex-col items-center justify-center gap-2">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="max-h-48 rounded-lg shadow-md"
          />
          <Text size="sm" c="dimmed">
            {file.name}
          </Text>
        </div>
      ) : (
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
      )}
    </Dropzone>
  );
};

export default DropzoneFile;
