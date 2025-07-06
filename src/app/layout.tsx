import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Modern and Minimal Todo Application built with NextJs, v1 contains the mvp, next versions will add more features to this app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              {children}
        </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
