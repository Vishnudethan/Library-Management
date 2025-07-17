import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";
 import LoginPage from "./components/LoginPage.jsx";
 import RegisterPage from "./components/RegisterPage.jsx";
 import WebPage from "./components/WebPage.jsx";

function App() {
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/RegisterPage" element={<RegisterPage />} /> 
         <Route path="/LoginPage" element={<LoginPage />} /> 
         <Route path="/WebPage" element={<WebPage />} /> 
        
      </Routes>
    </Router>
    
  );
}

export default App;
