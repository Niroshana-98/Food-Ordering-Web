'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import Bars2 from "@/components/icons/Bars2";


function AuthLinks({status,userName}){
  if (status ==='authenticated'){
    return(
      <>
      <Link href={'/profile'} className="whitespace-nowrap hover:text-secondary text-white">
        Hello, {userName}
      </Link>
      <button
        onClick={()=> signOut()} 
        className="bg-primary rounded-full text-white px-8 py-2 hover:text-log border-primary">
        Logout
      </button>
    </>
    );
  }
  if(status ==='unauthenticated'){
    return(
      <>
        <Link className="hover:text-secondary" href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-6 py-2 hover:text-secondary">
          Register
        </Link>
      </>
    );  
  }
}

export default function Header(){
    const session = useSession();
    const status = session.status;
    const userData = session.data?.user;
    let userName= userData?.name || userData?.email;
    const {cartProducts} = useContext(CartContext);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    if(userName && userName.includes(' ')){
      userName =userName.split(' ')[0];
    }
    
    return(
        <header> 
          <div className=" md:hidden justify-between flex items-center  bg-primary rounded-full h-12">
            <Link className="text-secondary font-semibold text-2xl " href={'/'}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BACEMENT CAFE
            </Link>
            <div className="flex gap-8 items-center">
              <Link href={'/cart'} className=" text-bold relative">
                  <ShoppingCart/>
                  <span className="absolute -top-2 -right-4 bg-primary text-white text-xm py-1 px-1 rounded-full leading-3">({cartProducts.length})</span>
              </Link>
              <button
                className="p-1 border-primary mr-4"
                onClick={() => setMobileNavOpen(prev => !prev)}>
                <Bars2 />
              </button>
            </div> 
          </div>
          {mobileNavOpen && (
            <div
              onClick={() => setMobileNavOpen(false)}
              className="md:hidden p-4 bg-secondary rounded-lg mt-2 flex flex-col gap-2 text-center font-semibold">
              <Link className="text-white hover:text-primary "href={'/'}>Home</Link>
              <Link className="text-white hover:text-primary"href={'/menu'}>Menu</Link>
              <Link className="text-white hover:text-primary"href={'/#about'}>About</Link>
              <Link className="text-white hover:text-primary"href={'/#contact'}>Contact</Link>
              <AuthLinks status={status} userName={userName}/>
            </div>
          )}
          


        <div className="hidden md:flex flex items-center justify-between bg-primary rounded-full h-12">
          <nav className="flex items-center gap-8 text-secondary font-semibold">
              <Link className="text-secondary font-semibold text-2xl" href={'/'}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BACEMENT CAFE
              </Link>
              <Link className="hover:text-white"href={'/'}>Home</Link>
              <Link className="hover:text-white"href={'/menu'}>Menu</Link>
              <Link className="hover:text-white"href={'/#about'}>About</Link>
              <Link className="hover:text-white"href={'/#contact'}>Contact</Link>
          </nav>
          <nav className="flex items-center gap-4 text-gray-100 font-semibold">
              <AuthLinks status={status} userName={userName}/>
              <Link href={'/cart'} className=" text-bold relative mr-8">
                <ShoppingCart/>
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xm py-1 px-1 rounded-full leading-3">({cartProducts.length})</span>
              </Link>
          </nav>
        </div> 
      </header>
    );
}