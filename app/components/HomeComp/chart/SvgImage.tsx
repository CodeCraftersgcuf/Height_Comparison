"use client";

import { useEffect, useRef, useState } from "react";

interface SvgCanvasProps {
  svgUrl: string;
  color: string;
  width: number;
  height: number;
}

const SvgImage: React.FC<SvgCanvasProps> = ({ svgUrl, color, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSvgToCanvas = async () => {
      try {
        const response = await fetch(svgUrl);
        if (!response.ok) throw new Error(`Failed to load SVG: ${response.status}`);

        const svgText = await response.text();
        const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
        const svgUrlObject = URL.createObjectURL(svgBlob);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = svgUrlObject;
        img.onload = () => {
          // Resize canvas based on SVG width and height
          canvas.width = width;
          canvas.height = height;

          // Draw the image onto the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, width, height);

          // Apply color overlay
          ctx.globalCompositeOperation = "source-atop"; // Keeps shape but applies color
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, width, height);
          ctx.globalCompositeOperation = "source-over"; // Reset to default
        };

        img.onerror = () => {
          setError("Error loading the SVG.");
        };
      } catch (err) {
        setError((err as Error).message);
      }
    };

    loadSvgToCanvas();
  }, [svgUrl, color, width, height]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return <canvas ref={canvasRef} className="block" />;
};

export default SvgImage;
