import "./components/style.css";
import React from "react";
import SiteLayout from "./layouts/SiteLayout";
import SpaListPage from "./pages/SpaListPage";

function App() {
  return (
    <SiteLayout>
      <SpaListPage />
    </SiteLayout>
  );
}

export default App;
