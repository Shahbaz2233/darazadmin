import React from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Categories from "./components/AdminData/Pages/Categories";
import AdminLogin from "./components/AdminData/AdminLogin";
import User from "./components/AdminData/Pages/User";
import Products from "./components/AdminData/Pages/Products";
import Orders from "./components/AdminData/Pages/Orders";

const App = () => {

return (
    <div>
      <Router>
        <Routes><Route path="/user" element={<User />}/></Routes>
        <Routes><Route path="/categories" element={<Categories />}/></Routes>
        <Routes><Route path="/products" element={<Products />}/></Routes>
        <Routes><Route path="/order" element={<Orders />}/></Routes>
        <Routes><Route path="/" element={<AdminLogin />}/></Routes>
      </Router>
      
    </div>
  );
};

export default App;
