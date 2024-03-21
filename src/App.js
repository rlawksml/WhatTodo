import { StyledEngineProvider } from "@mui/styled-engine-sc";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/pages/route";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <StyledEngineProvider>
      <CssBaseline>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CssBaseline>
    </StyledEngineProvider>
  );
}

export default App;
