/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";
 
 import WebPage from "./components/WebPage.jsx";
 import AddBook from "./components/AddBook.jsx";
import BookDetails from "./components/BookDetails.jsx";

function App() {
  return (
  
    <Router>
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        
         <Route path="/WebPage" element={<WebPage />} /> 
        <Route path="/AddBook" element={<AddBook />} /> 
        <Route path="/BookDetails" element={<BookDetails />} /> 
          
      </Routes>
    </Router>
    
  );
}

export default App;*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";
import WebPage from "./components/WebPage.jsx";
import AddBook from "./components/AddBook.jsx";
import BookDetails from "./components/BookDetails.jsx";
// import NotFound from "./components/NotFound.jsx"; // optional

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/webpage" element={<WebPage />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/book-details" element={<BookDetails />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

