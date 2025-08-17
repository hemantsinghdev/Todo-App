import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Sidebar from "@/components/Sidebar.component";

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
          <ThemeRegistry>
            <CssBaseline />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Sidebar />
              <Box
                component="main"
                sx={{ml: '240px'}}
                width={'100%'}
              >
                {children}
              </Box>
            </Box>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
