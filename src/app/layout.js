import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '260px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Header />
              <main style={{ padding: '32px', flex: 1 }}>
                {children}
              </main>
            </div>
          </div>
        </TrackerProvider>
      </body>
    </html>
  );
}
