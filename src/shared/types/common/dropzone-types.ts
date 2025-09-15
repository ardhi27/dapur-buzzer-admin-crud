import { DropzoneProps } from "@mantine/dropzone";

interface DropzoneFileProps extends Partial<DropzoneProps> {
  onFileSelect?: (file: File | null) => void;
  value?: File | null;
}

export default DropzoneFileProps;
