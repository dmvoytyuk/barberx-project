import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.tsx";

function App(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
