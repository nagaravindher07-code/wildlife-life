import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Noise } from "@/components/Noise";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wildlife & Life · Visual Stories",
  description: "Premium photography portfolio showcasing captured moments and visual narratives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#050810", color: "#fff", margin: 0, padding: 0 }}>
        <SmoothScroll>
          <Noise />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
