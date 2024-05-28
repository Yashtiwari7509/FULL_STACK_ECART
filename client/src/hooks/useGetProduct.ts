import axios from "axios";
import React, { useEffect, useState } from "react";
import useGetToken from "./useGetToken";
import { Iproduct } from "../models/interface";

const useGetProduct = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [laoder, setLoader] = useState(false);
  const { headers } = useGetToken();

  const fetctProducts = async () => {
    try {
      const fetchedProducts = await axios.get(
        `https://full-stack-ecart.onrender.com/product`,
        {
          headers,
        }
      );
      setLoader(true);

      setProducts(fetchedProducts.data);
    } catch (error: any) {
      console.log("ERROR : SOMETHING WENT WRONG");
      console.log(error);
    }
  };
  useEffect(() => {
    fetctProducts();
  }, []);
  return { products, laoder };
};

export default useGetProduct;
