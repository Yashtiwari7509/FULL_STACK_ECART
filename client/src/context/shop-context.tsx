import { createContext, useState, useEffect } from "react";
import useGetProduct from "../hooks/useGetProduct";
import { Iproduct } from "../models/interface";
import axios from "axios";
import useGetToken from "../hooks/useGetToken";
const link = process.env.REACT_APP_API_URL;

interface Profile {
    availableMoney : number ,
    username : string
}
export interface IshopContext {
    addToCart: (itemId: string) => void;
    removeFromCart: (itemId: string) => void;
    UpdateCartCount: (itemId: string, newCount: number) => void;
    getitemCount: (itemid: string) => number;
    getTotalAmount: () => number;
    checkout: () => void;
    profile : Profile

}

const defaultVal: IshopContext = {
    addToCart: () => null,
    removeFromCart: () => null,
    UpdateCartCount: () => null,
    getitemCount: () => 0,
    getTotalAmount: () => 0,
    checkout: () => null,
    profile : null
};

export const ShopContext = createContext(defaultVal)


export const ShopContextProvider = (props: any) => {

    const [cartItems, setCartItems] = useState<Record<string, number>>({});
    const { products } = useGetProduct()
    const { headers } = useGetToken()
    const [profile, setProfile] = useState<any>({})

    const Profile = async () => {
        const xid = localStorage.getItem('userID');
        const body = {xid}
        
        try {
            const fetched = await axios.post(`${link}/profile`, body,{headers});
            const Profiledata = fetched.data;
            // console.log(Profiledata);
            setProfile(Profiledata)
            // console.log('this is profile',profile);
            

        } catch (error) {
            console.log(error);
        }
    }

    const getitemCount = (itemId: string): number => {
        if (itemId in cartItems) {
            return cartItems[itemId];
        }
        return 0;
    };

    const addToCart = (itemId: string) => {
        
        if (itemId in cartItems) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

        } else {
            setCartItems((prev) => ({ ...prev, [itemId] : 1}));
        }
    };

    useEffect(() => {
        Profile()
    }, []);

    const removeFromCart = (itemId: string) => {
        if (!cartItems[itemId]) return;
        if (cartItems[itemId] === 0) return;
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 })) ;
    };
    const UpdateCartCount = (itemId: string, newCount: number) => {
        if (cartItems[itemId] < 0) return;
        setCartItems((prev) => ({ ...prev, [itemId]: newCount })) ;

    };
    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let ItemsInfo: Iproduct = products.find((product) => product._id === item);
                totalAmount += cartItems[item] * ItemsInfo.price;
            }
        }
        return totalAmount;
    }
    const checkout = async () => {
        const body = { customerID: localStorage.getItem('userID'), cartItems }
        try {
            const Result = await axios.post('http://localhost:3001/product/checkout', body, {
                headers
            })
            // fetchAvailableMoney()
            setCartItems({}) ;
            Profile() ;

        } catch (error: any) {
            console.log(error);

        }
    }
    const contextval: IshopContext = {
        addToCart,
        removeFromCart,
        UpdateCartCount,
        getitemCount,
        getTotalAmount,
        checkout,
        profile
    }
    return (<ShopContext.Provider value={contextval}>{props.children}</ShopContext.Provider>)
}