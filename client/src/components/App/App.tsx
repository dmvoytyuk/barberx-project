import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.tsx";
import SearchPage from "../../pages/SearchPage/SearchPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
