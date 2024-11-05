import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";

export const PublicRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
};
