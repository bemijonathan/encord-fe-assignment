import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Alert, Snackbar, Stack } from "@mui/material";
import { InputFileUpload } from "./core/fileUpload";
import { uuid } from "../utils";
import { useApiMutation } from "../hooks";
import { ImageTable } from "./image/table";
import { PredictionTable } from "./prediction/table";

enum ETabs {
  IMAGES = "images",
  PREDICTIONS = "predictions",
}

const TabsTitleMapper = {
  [ETabs.IMAGES]: "Images",
  [ETabs.PREDICTIONS]: "Predictions",
};

const tabData = [
  {
    value: ETabs.IMAGES,
    label: TabsTitleMapper["images"],
  },
  {
    value: ETabs.PREDICTIONS,
    label: TabsTitleMapper["predictions"],
  },
];

export const ColorTabs = () => {
  const [currentTab, setCurrentTab] = React.useState(ETabs.IMAGES);
  const { mutate, error } = useApiMutation("images");
  const handleFileChange = async (file: File) => {
    mutate({
      data: {
        id: uuid(),
        fileName: file.name,
        size: file.size,
        type: file.type,
        uploadTime: new Date().toISOString(),
      },
    });
    setCurrentTab(ETabs.IMAGES);
  };
  const TabContentMap = {
    [ETabs.IMAGES]: <ImageTable />,
    [ETabs.PREDICTIONS]: <PredictionTable />,
  };
  return (
    <Stack spacing={2}>
      <Snackbar open={!!error} autoHideDuration={3000}>
        <Alert severity="error" variant="outlined" sx={{ width: "100%" }}>
          {error?.message || "An error occurred"}
        </Alert>
      </Snackbar>
      <Stack flexDirection="row" justifyContent="space-between">
        <Tabs
          value={currentTab}
          onChange={(_e, value) => setCurrentTab(value)}
          variant="standard"
        >
          {tabData.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              sx={{ textTransform: "capitalize" }}
            />
          ))}
        </Tabs>
        <InputFileUpload onChange={handleFileChange} />
      </Stack>
      {TabContentMap[currentTab]}
    </Stack>
  );
};
