import { useCallback, useEffect, useRef } from "react";
import { Predict } from "../../types";

const canvasDefaultWidth = 500;
const canvasDefaultHeight = 500;
const canvasPadding = 50;

export const PredictionResult = ({
  imageUrl,
  predictions,
  refreshCount,
}: {
  imageUrl: string;
  predictions: Predict;
  refreshCount: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Function to adjust the size of the canvas dynamically
  const adjustCanvasSize = useCallback(() => {
    if (canvasRef.current) {
      // Determine the maximum width the canvas can occupy within its parent container
      const maxWidth =
        canvasRef.current.parentElement?.clientWidth || window.innerWidth;
      const scaleRatio = maxWidth / canvasDefaultWidth;
      // Adjust the canvas size, remember padding
      canvasRef.current.width = canvasDefaultWidth * scaleRatio - canvasPadding;
      canvasRef.current.height =
        canvasDefaultHeight * scaleRatio - canvasPadding;
    }
  }, []);

  const drawPredictions = ({
    ctx,
    predictions,
    scale,
    centerX,
    centerY,
  }: {
    ctx: CanvasRenderingContext2D;
    predictions: Predict["predictions"];
    scale: number;
    centerX: number;
    centerY: number;
  }) => {
    predictions.forEach((prediction) => {
      const { x1, y1, x2, y2 } = prediction.bbox;
      const scaledWidth = (x2 - x1) * scale;
      const scaledHeight = (y2 - y1) * scale;
      const scaledX1 = x1 * scale + centerX;
      const scaledY1 = y1 * scale + centerY;

      ctx.fillStyle = "rgba(255, 0, 0, 0.11)";
      ctx.fillRect(scaledX1, scaledY1, scaledWidth, scaledHeight);

      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(scaledX1, scaledY1, scaledWidth, scaledHeight);

      ctx.fillStyle = "white";
      ctx.fillText(
        `${prediction.label} (${prediction.score})`,
        scaledX1 + 10,
        scaledY1 + scaledHeight - 10,
      );
    });
  };

  // Function to draw the image and predictions on the canvas
  const drawImageAndPredictions = useCallback(
    (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
      if (!canvasRef.current) return;
      adjustCanvasSize();

      // Calculate scale to fit image within the canvas
      const scale = Math.min(
        canvasRef.current.width / img.width,
        canvasRef.current.height / img.height,
      );
      // Calculate the top left corner coordinates to center the image
      const centerX = (canvasRef.current.width - img.width * scale) / 2;
      const centerY = (canvasRef.current.height - img.height * scale) / 2;
      // Draw the image scaled and centered
      ctx.drawImage(
        img,
        centerX,
        centerY,
        img.width * scale,
        img.height * scale,
      );
      // Draw each prediction box and label on the image
      drawPredictions({
        ctx,
        predictions: predictions.predictions,
        scale,
        centerX,
        centerY,
      });
    },
    [predictions.predictions, adjustCanvasSize],
  );

  // Effect to load the image and draw on canvas
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      drawImageAndPredictions(ctx, img);
    };
  }, [drawImageAndPredictions, imageUrl, refreshCount]);

  // Effect to handle canvas resizing on window resize
  useEffect(() => {
    const handleResize = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      drawImageAndPredictions(ctx, new Image());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [drawImageAndPredictions]);

  return (
    <canvas
      ref={canvasRef}
      id="myCanvas"
      width={canvasDefaultWidth}
      height={canvasDefaultHeight}
    />
  );
};
