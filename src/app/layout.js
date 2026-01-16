import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./Layout.module.css";
import { TrackerProvider } from "@/context/TrackerContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AgencyOS | Prokrastination Tracker",
  description: "High-end dashboard for high-performance agencies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TrackerProvider>
          <div className={styles.layout}>
            <Sidebar />
            <div className={styles.contentWrapper}>
              <Header />
              <main className={styles.main}>
                {children}
              </main>
            </div>
          </div>
        </TrackerProvider>
      </body>
    </html>
  );
}
