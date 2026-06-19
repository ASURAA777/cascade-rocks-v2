import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1714",
          color: "#f4f1ea",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.65,
            marginBottom: 28,
          }}
        >
          {site.location.region}
        </div>
        <div style={{ fontSize: 84, fontWeight: 600 }}>{site.brandName}</div>
        <div style={{ fontSize: 30, marginTop: 24, opacity: 0.85 }}>{site.brandStatement}</div>
      </div>
    ),
    { ...size }
  );
}
