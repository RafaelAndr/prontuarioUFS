import React from "react";
import AuthProvider from "./providers/authProvider.jsx";
import Routes from "./routes/index.jsx";

import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
