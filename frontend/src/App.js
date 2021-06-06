import React from "react";
import Routes from "./routes/index";

import AppProvider from "./hooks/index";

const App = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default App;
