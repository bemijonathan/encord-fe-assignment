import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useApiMutation, useApiQuery } from "../../hooks";
import { uuid } from "../../utils";
import { ImageModel } from "../../types";

const fields = [
  { label: "Title", name: "title" },
  { label: "Description", name: "description" },
];

export default function AlertDialog({ image }: { image: ImageModel }) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<Record<string, string>>();

  const { mutate } = useApiMutation("predictions");
  const { mutate: deleteImage } = useApiMutation("images", {
    method: "delete",
  });
  const {
    isLoading: loading,
    error: fetchError,
    data,
  } = useApiQuery("predict");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    setError({});
    Object.keys(formJson).forEach((key) => {
      if (!formJson[key]) {
        setError((prev) => ({ ...prev, [key]: "This field is required" }));
      }
    });
    const isValid = Object.values(formJson).every(Boolean);
    if (!isValid) return;
    mutate({
      data: {
        title: String(formJson.title),
        description: String(formJson.description),
        prediction: data,
        id: uuid(),
        image,
      },
    });
    deleteImage({
      params: `/${image.id}`,
    });
    if (!fetchError) {
      handleClose();
      return;
    }
    setError((prev) => ({ ...prev, serverError: "An error occurred" }));
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Predict
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit,
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Add a new prediction</DialogTitle>
        {error?.serverError && (
          <Alert severity="error">{error?.serverError}</Alert>
        )}
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {fields.map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                variant="outlined"
                error={!!error?.[field.name]}
                helperText={error?.[field.name]}
                onChange={() =>
                  setError((prev) => ({ ...prev, [field.name]: "" }))
                }
              />
            ))}
          </Stack>
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
          <LoadingButton
            type="submit"
            autoFocus
            variant="contained"
            loading={loading}
          >
            Predict
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
