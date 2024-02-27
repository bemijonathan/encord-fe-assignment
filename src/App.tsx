import "./App.css";
import { MuiTheme } from "./theme";
import { ColorTabs } from "./components/tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <MuiTheme>
      <QueryClientProvider client={queryClient}>
        <ColorTabs />
      </QueryClientProvider>
    </MuiTheme>
  );
};

export default App;
