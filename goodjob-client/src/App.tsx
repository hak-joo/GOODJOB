import { Provider } from "react-redux";
import Router from "./Router";
import store from "./store";
import ViewCard from "@/context/viewcard/ViewCard";
import { ViewCardContext } from "./context";
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ViewCardContext.Provider value={ViewCard}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </ViewCardContext.Provider>
    </Provider>
  );
};

export default App;
