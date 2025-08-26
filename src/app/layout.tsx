import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "@/styles/globals.scss";
import ReduxProvider from "./ReactProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Curriculum",
  description: "An SSR service developed in TypeScript and JSX that renders the Front-End of an HTML page, a dynamic curriculum with a strong focus on interactivity and user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
