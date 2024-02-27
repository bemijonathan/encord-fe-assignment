import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { PredictModel } from "../../types";
import { PredictionResult } from "./predictionResult";

export default function PredictionDialog({
  prediction,
}: {
  prediction: PredictModel;
}) {
  const [open, setOpen] = React.useState(false);
  const [refreshCount, setRefreshCount] = React.useState(0);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        View Prediction
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle id="alert-dialog-title">
          View prediction results for {prediction.image.fileName}
        </DialogTitle>
        <DialogContent>
          <PredictionResult
            imageUrl={"/assets/orange.jpg"}
            predictions={prediction.prediction}
            refreshCount={refreshCount}
          />
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => setRefreshCount(refreshCount + 1)}
          >
            Refresh
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
