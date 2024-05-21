import { useContext, useEffect, useState } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IshopContext, ShopContext } from "../context/shop-context";

function Navbar() {
  const [isloggedIn, setLoggedIn] = useState(false);
  const [Nav, SetNav] = useState(true);
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

  const Style = {};
  const Logout = () => {
    removeCookie("accessToken");
    localStorage.clear();
    navigate("/auth");
    window.location.reload();
  };

  return (
    <div className="Nav-bar">
      <div className="Nav-logo">
        <h1 style={{ fontFamily: "Monoton", fontWeight: "100" }}>Y-SHOPIFY</h1>
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
            >
              Register
            </NavLink>
          )}
          {isloggedIn && <button onClick={Logout}>Logout</button>}
        </div>
      ) : (
        <></>
      )}
      <div className="Menu" onClick={() => SetNav((prev) => !prev)}></div>
    </div>
  );
}

export default Navbar;
