import { Column } from "./types";

/**
 * Generate a UUID
 * @returns string
 */
export const uuid = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const tableImageColumns: Column[] = [
  {
    title: "File Name",
    key: "fileName",
  },
  {
    title: "Size (mb)",
    key: "size",
    align: "right",
  },
  {
    title: "Upload Time",
    key: "uploadTime",
    align: "right",
  },
  {
    title: "Actions",
    key: "actions",
    align: "right",
  },
];

export const convertToMb = (size: number): string => {
  return (size / 1024 / 1024).toFixed(2) + "mb";
};

export const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString();
};
