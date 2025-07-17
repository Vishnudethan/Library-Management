import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";
 import LoginPage from "./components/LoginPage.jsx";
 import RegisterPage from "./components/RegisterPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/RegisterPage" element={<RegisterPage />} /> 
         <Route path="/LoginPage" element={<LoginPage />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;
