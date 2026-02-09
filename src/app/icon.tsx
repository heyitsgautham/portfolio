import { ImageResponse } from "next/og";

// Import your existing React component
// import { Icons } from "@/components/icons";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

/**
 * A simple React component that returns an SVG.
 * You can replace this with an import of your existing component.
 */
function Logo() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "black",
        color: "white",
        fontSize: "20px",
        fontFamily: "monospace",
        fontWeight: "bold",
        borderRadius: "20%",
      }}
    >
      <span style={{ color: "rgba(150, 150, 150, 1)" }}>G</span>
      <span style={{ color: "rgba(190, 190, 190, 0.4)" }}>K</span>
    </div>
  );
}

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <Logo />
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
