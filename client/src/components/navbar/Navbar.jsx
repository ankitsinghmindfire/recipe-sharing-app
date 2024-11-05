import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../slices/authSlice";
import "./Navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const LogoutUser = () => {
    localStorage.clear();
    dispatch(logoutSuccess());
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <nav>
        <div className="nav-left">
          <FontAwesomeIcon
            icon={faBars}
            className="hamburger-icon"
            onClick={toggleMenu}
            style={isOpen ? { transform: "rotate(90deg)" } : {}}
          />

          <h2>Recipe Sharing App</h2>
        </div>
        <div className={`nav-right ${isOpen ? "open" : ""}`}>
          <ul>
            {token ? (
              <>
                <li>
                  <NavLink to="/" onClick={handleToggleMenu}>
                    Recipes
                  </NavLink>{" "}
                </li>

                <li>
                  <NavLink to="/addRecipe" onClick={handleToggleMenu}>
                    Add Recipe
                  </NavLink>{" "}
                </li>
                {/* <li>
                  <NavLink to="/favouriteRecipes" onClick={handleToggleMenu}>
                    Favourites
                  </NavLink>{" "}
                </li> */}
                <li>
                  <NavLink to="login" onClick={LogoutUser}>
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="login">Login</NavLink>{" "}
                </li>
                <li>
                  <NavLink to="signup">SignUp</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
