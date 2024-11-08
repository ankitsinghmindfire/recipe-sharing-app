import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils/request";
import Button from "../../components/button/Button";
import InputField from "../../components/input/InputField";
import { API, ApiMethods } from "../../utils/util";
import { Messages } from "../../utils/messages";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = {
        username: username,
        password: password,
        fullName: name,
      };
      const response = await request({
        url: API.authAPI.register,
        method: ApiMethods.POST,
        body: { ...data },
      });
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
      console.error(error);
      toast.error(Messages.errors.USER_NOT_REGISTERED);
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
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              label="Full Name"
            />
            <InputField
              type="email"
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
          <Button type="submit" className="btn-register">
            Register
          </Button>
        </form>
      </div>
    </>
  );
};
