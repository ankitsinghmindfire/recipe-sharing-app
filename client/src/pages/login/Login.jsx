import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils/request";
import InputField from "../../components/input/InputField";
import { loginSuccess } from "../../slices/authSlice";
import Button from "../../components/button/Button";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const data = {
        username: username,
        password: password,
      };
      const response = await request({
        url: "auth/login",
        method: "POST",
        body: { ...data },
      });
      if (response) {
        if (response.token) {
          dispatch(
            loginSuccess({
              token: response.token,
              id: response.userId,
              userName: response.userName,
            })
          );
          localStorage.setItem("token", response.token);
          localStorage.setItem("userId", response.userId);
          navigate("/");
        } else {
          toast.error(response.error);
        }
      }
    } catch (error) {
      console.error("Failed to login user:", error);
      toast.error("Failed to login user");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="auth-container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="form-group">
            <InputField
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              label="Username"
            />
          </div>
          <div className="form-group">
            <InputField
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
            />
          </div>
          <Button type="submit" className="btn-login">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};
