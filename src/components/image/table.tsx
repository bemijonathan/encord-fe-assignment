import { useApiQuery } from "../../hooks";
import { RowData, ImageModel } from "../../types";
import { convertToMb, formatDateTime, tableImageColumns } from "../../utils";
import { CustomTable } from "../core/table";
import AlertDialog from "./dialogue";

export const ImageTable = () => {
  const { data: images } = useApiQuery("images");

  const imageTableRows: RowData[] =
    images?.map((image: ImageModel) => ({
      id: image.id,
      fileName: image.fileName,
      size: convertToMb(image.size),
      uploadTime: formatDateTime(image.uploadTime),
      actions: <AlertDialog image={image} />,
    })) || [];

  return <CustomTable rows={imageTableRows} columns={tableImageColumns} />;
};
