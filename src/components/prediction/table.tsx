import { useApiQuery } from "../../hooks";
import { PredictModel, RowData } from "../../types";
import { convertToMb, formatDateTime, tableImageColumns } from "../../utils";
import { CustomTable } from "../core/table";
import PredictionDialog from "./dialogue";

export const PredictionTable = () => {
  const { data: predictions } = useApiQuery("predictions");

  const predictionTableRows: RowData[] =
    predictions?.map((prediction: PredictModel) => ({
      id: prediction.id,
      fileName: prediction.image.fileName,
      size: convertToMb(prediction.image.size),
      uploadTime: formatDateTime(prediction.image.uploadTime),
      actions: <PredictionDialog prediction={prediction} />,
    })) || [];

  return <CustomTable rows={predictionTableRows} columns={tableImageColumns} />;
};
