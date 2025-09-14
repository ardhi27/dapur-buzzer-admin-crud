import { DropzoneProps } from "@mantine/dropzone";

interface DropzoneFileProps extends Partial<DropzoneProps> {
  onFileSelect?: (file: File | null) => void;
}

export default DropzoneFileProps;
