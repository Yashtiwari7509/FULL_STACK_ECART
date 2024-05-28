import { useContext, useEffect, useState } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IshopContext, ShopContext } from "../context/shop-context";

function Navbar() {
  const [isloggedIn, setLoggedIn] = useState(false);
  const [Nav, SetNav] = useState(window.innerWidth > 1000 ? true : false);
  const [cookie, , removeCookie] = useCookies();
  const navigate = useNavigate();
  const { profile } = useContext<IshopContext>(ShopContext);

  const username = profile.username?.split("@")[0];
  const money = profile.availableMoney;

  const token = Object.keys(cookie).find((item) => item === "accessToken");
  const Setter = () => {
    if (localStorage.length === 0 && !token) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  };
  useEffect(() => {
    Setter();
  }, []);

  const Logout = () => {
    removeCookie("accessToken");
    localStorage.clear();
    navigate("/auth");
    window.location.reload();
  };
  const NavSetter = () => {
    if (window.innerWidth < 1000) {
      SetNav(false);
    }
  };

  return (
    <div className="Nav-bar">
      <div className="Nav-logo">
        <h1
          style={{ fontFamily: "Monoton", fontWeight: "100", color: "white" }}
        >
          StorePik
        </h1>
      </div>
      {Nav ? (
        <div className="Nav-Links">
          <NavLink
            to="/"
            style={({ isActive }) => {
              return {
                textDecoration: "none",
                color: isActive ? "white" : "aqua",
              };
            }}
            onClick={NavSetter}
          >
            Shop
          </NavLink>
          <NavLink
            to="/purchased-items"
            style={({ isActive }) => {
              return {
                textDecoration: "none",
                color: isActive ? "white" : "aqua",
              };
            }}
            onClick={NavSetter}
          >
            Purchases
          </NavLink>
          <NavLink
            to="/checkout"
            style={({ isActive }) => {
              return {
                textDecoration: "none",
                color: isActive ? "white" : "aqua",
              };
            }}
            onClick={NavSetter}
          >
            Cart
          </NavLink>
          {isloggedIn ? (
            <div className="user-money">
              <div className="username">{username} </div>{" "}
              <p className="money">${money}</p>
            </div>
          ) : (
            <NavLink
              to="/auth"
              style={({ isActive }) => {
                return {
                  textDecoration: "none",
                  color: isActive ? "white" : "aqua",
                };
              }}
              onClick={NavSetter}
            >
              Register
            </NavLink>
          )}
          {isloggedIn && <button onClick={Logout}>Logout</button>}
        </div>
      ) : (
        <></>
      )}
      <div
        className={`nav-icon ${Nav && "click"}`}
        onClick={() => SetNav((prev) => !prev)}
      ></div>
    </div>
  );
}

export default Navbar;
