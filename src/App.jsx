import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";
// import Login from "./Login.jsx";
 import RegisterPage from "./components/RegisterPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<Login />} /> */}
         <Route path="/RegisterPage" element={<RegisterPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
