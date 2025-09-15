import { Text } from "@mantine/core";

const ErrorText = ({ message }: { message?: string }) => {
  return message ? <Text c="red">{message}</Text> : null;
};

export { ErrorText };
