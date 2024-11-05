import { useState } from "react";
import { request } from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import InputField from "../../components/input/InputField";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = {
        username: username,
        password: password,
      };
      const response = await request({
        url: "auth/register",
        method: "POST",
        body: { ...data },
      });
      console.log("response", response);

      if (response) {
        if (response.error) {
          toast.warn(response.error);
        } else {
          toast.success(response.message);
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        }
      }
    } catch (error) {
      console.error("An error occurred while registering user:", error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};
