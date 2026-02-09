import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 120,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "20%",
          fontWeight: "bold",
          fontFamily: "monospace",
        }}
      >
        <span style={{ color: "rgba(150, 150, 150, 1)" }}>G</span>
        <span style={{ color: "rgba(190, 190, 190, 0.4)" }}>K</span>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
