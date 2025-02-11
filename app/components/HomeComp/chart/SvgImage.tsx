"use client";

import { useLayoutEffect, useRef, useState } from "react";

interface SvgCanvasProps {
  svgUrl: string;
  color: string;
  height: number; // Height will be used to scale the width proportionally
}

const SvgImage: React.FC<SvgCanvasProps> = ({ svgUrl, color, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(1); // Default aspect ratio (square)

  useLayoutEffect(() => {
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
          const originalWidth = img.width || 100;
          const originalHeight = img.height || 100;

          // Ensure a valid aspect ratio (avoid division by zero)
          if (originalHeight > 0) {
            setAspectRatio(originalWidth / originalHeight);
          }

          // Auto-calculate width based on height and aspect ratio
          const width = height * (originalWidth / originalHeight);

          // Resize canvas before setting height
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
  }, [svgUrl, color, height]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return <canvas ref={canvasRef} className="block" />;
};

export default SvgImage;
