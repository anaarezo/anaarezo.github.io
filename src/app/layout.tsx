import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ana Arezo - Software Engineer",
  description: "Portfolio of Ana Arezo, a software engineer based in London, UK.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
