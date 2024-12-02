import React from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Converter from "./pages/Converter";
import Books from "./pages/Books";
import Repositories from "./pages/Repositories";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div>
      <header className="flex h-10 py-4 items-center bg-teal-800 gap-4 mx-auto px-auto justify-center ">
        <NavLink to="/Converter">Converter</NavLink>
        <NavLink to="/Books">Books</NavLink>
        <NavLink to="/Repositories">Repositories</NavLink>
      </header>
      <Routes>
        <Route path="/Converter" element={<Converter />} />
        <Route path="/books" element={<Books />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
