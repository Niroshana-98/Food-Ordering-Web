'use client';
import {SessionProvider} from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct){
    let price = cartProduct.basePrice;
    if(cartProduct.size){
        price += cartProduct.size.price;
    }
    if(cartProduct.extras?.length > 0){
        for(const extra of cartProduct.extras){
            price += extra.price;
        }
    }
    price *= (cartProduct.quantity || 1);
    return price;
}

export function AppProvider({children}){
    const [cartProducts, setCartProducts] = useState([]);

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts( JSON.parse( ls.getItem('cart') ) );
        }
      }, []);

      function clearCart(){
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
      }

      function removeCartProduct(indexToRemove){
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts
                .filter((v,index) => index !== indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts;
        });
        toast.success('Product Removed');
      }

    function saveCartProductsToLocalStorage(cartProducts){
        if(ls){
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }

    function addToCart(product, size=null, extras=[]){
        setCartProducts(prevProducts => {
            const cartProduct =  {...product, size, extras, quantity: 1};
            const newProducts = [...prevProducts, cartProduct];
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        });
    }
    function incrementQuantity(index) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = [...prevCartProducts];
            if (newCartProducts[index].quantity < 10) {
                newCartProducts[index].quantity += 0.5;
                saveCartProductsToLocalStorage(newCartProducts);
            }
            return newCartProducts;
        });
    }

    function decrementQuantity(index) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = [...prevCartProducts];
            if (index >= 0 && index < newCartProducts.length && newCartProducts[index]?.quantity !== undefined) {
                if (newCartProducts[index].quantity < 10) {
                    newCartProducts[index].quantity -= 0.5;
                    saveCartProductsToLocalStorage(newCartProducts);
                }
            }
            return newCartProducts;
        });
    }
    return(
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts,setCartProducts,addToCart,removeCartProduct,clearCart,incrementQuantity, decrementQuantity
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    );
}