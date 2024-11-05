import { useState } from "react";
import { request } from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/input/InputField";
import "../../App.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

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
          toast.success("Login Successful");
          localStorage.setItem("token", response.token);

          setTimeout(() => {
            navigate("/");
          }, 4000);
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
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};
