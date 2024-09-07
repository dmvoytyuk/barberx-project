import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.tsx";
import LoginPage from "../../pages/LoginPage/LoginPage.tsx";
import SearchPage from "../../pages/SearchPage/SearchPage.tsx";
import SignUpPage from "../../pages/SignUpPage/SignUpPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
