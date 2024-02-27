import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontSize: 16,
    h1: {
      fontSize: "3.2em",
      lineHeight: 1.1,
    },
    button: {
      fontWeight: 500,
    },
    body1: {
      lineHeight: 1.5,
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#242424",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
    },
    primary: {
      main: "#646cff",
      contrastText: "#ffffff",
    },
  },
});

export function MuiTheme(props: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
