import axios from "axios";
import useGetToken from "../../hooks/useGetToken";
import { useEffect, useState, useCallback } from "react";
import CartItems from "./Carditems";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Iproduct } from "../../models/interface";

const PerchasePage = () => {
  const [purchased, setPurchased] = useState<any>([]);
  const { headers } = useGetToken();
  const navigate = useNavigate();

  const fetchPerchase = useCallback(async () => {
    const id = localStorage.getItem("userID");
    try {
      const purchasedItems = await axios.get(
        `https://full-stack-ecart.onrender.com/profile/items/${id}`,
        {
          headers,
        }
      );
      const data = purchasedItems.data;
      console.log("hello");

      setPurchased(data);
    } catch (error) {
      console.log(error);
      navigate("/auth");
    }
  }, [headers, navigate]);

  useEffect(() => {
    fetchPerchase();
  }, [fetchPerchase]);

  return (
    <div className="card-parent">
      <h1 style={{ color: "wheat" }}>Happy Shopping!</h1>
      {purchased.map((product: Iproduct, key: any) => (
        <CartItems key={key} product={product} />
      ))}
      <h1 style={{ color: "white" }}>Your Purchased Items</h1>
    </div>
  );
};

export default PerchasePage;
