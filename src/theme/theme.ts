import { createTheme, Theme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f9f4fc", // 🟣 Full-page background
      paper: "#f3ebf9", // 🧾 Card/panel background
    },
    primary: {
      main: "#a60000",
      contrastText: "#ffffff",
    },
    secondary: {
      // 🟪 Selected sidebar item (Today)
      main: "#e6daf6",
    },
    text: {
      // 🔤 Main black text
      primary: "#000000",
      // 🔤 Lighter grey text (dates, tags, etc.)
      secondary: "#7e7e7e",
      // 🕹 Sidebar inactive links
      disabled: "#4b4453",
    },
    divider: "#e3dfe5", // 📏 Divider lines between sections
  },

  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h5: {
      fontWeight: 700, // ⬆️ "Today" header
      fontSize: "1.6rem",
    },
    h6: {
      fontWeight: 600, // 🗂 "Coding" group titles
      fontSize: "1.2rem",
    },
    body1: {
      fontWeight: 600, // 📝 Task title
      fontSize: "1rem",
    },
    body2: {
      fontWeight: 400, // 📅 Date, tags
      fontSize: "0.85rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          margin: 0,
          padding: 0,
          minHeight: "100vh",
        }),
      },
    },
  },
});

export default theme;
