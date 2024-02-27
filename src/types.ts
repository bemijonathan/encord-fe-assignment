export interface Predict {
  description: string;
  predictions: Prediction[];
}
export interface Prediction {
  bbox: Bbox;
  label: string;
  score: string;
}
export interface Bbox {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
export type Column = {
  title: string;
  key: string;
  align?: "inherit" | "left" | "center" | "right" | "justify";
};
export type RowData = {
  [key: string]: React.ReactNode | string | number;
  id: string;
};
export type Model = "predictions" | "images" | "predict";
export type ImageModel = {
  id: string;
  fileName: string;
  size: number;
  type: string;
  uploadTime: string;
};
export type PredictModel = {
  id: string;
  title: string;
  description: string;
  prediction: Predict;
  image: ImageModel;
};
export type BodyTypes = ImageModel | PredictModel;
