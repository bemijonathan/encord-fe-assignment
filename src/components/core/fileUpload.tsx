import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type FileUploadProps = {
  onChange: (file: File) => void;
};
export const InputFileUpload = ({ onChange }: FileUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };
  return (
    <Button
      component="label"
      role="upload"
      variant="outlined"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      size="small"
    >
      Upload file
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
};
