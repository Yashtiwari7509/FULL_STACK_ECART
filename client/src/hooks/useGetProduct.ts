import axios from "axios";
import React, { useEffect, useState } from "react";
import useGetToken from "./useGetToken";
import { Iproduct } from "../models/interface";

const useGetProduct = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const { headers } = useGetToken();
  const link = process.env.REACT_APP_API_URL;

  const fetctProducts = async () => {
    try {
      const fetchedProducts = await axios.get(`${link}/product`, {
        headers,
      });

      setProducts(fetchedProducts.data);
    } catch (error: any) {
      console.log("ERROR : SOMETHING WENT WRONG");
      console.log(error);
    }
  };
  useEffect(() => {
    fetctProducts();
  }, []);
  return { products };
};

export default useGetProduct;
