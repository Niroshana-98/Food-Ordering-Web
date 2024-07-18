'use client';
import {useProfile} from "@/components/UseProfile";
import { useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import {redirect} from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import { data } from "autoprefixer";


export default function NewMenuItemPage(){
    
    const [redirectToItems, setRedirectToItems]=useState(false);
    const {loading, data} = useProfile();

    async function handleFormSubmit(ev, data){
        ev.preventDefault();
        const savingPromise = new Promise(async(resolve, reject)=>{
            const response = await fetch('/api/menu-items',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise,{
            loading:'Saving...',
            success:'Saved',
            error:'Error',
        });

        setRedirectToItems(true);
        
    }
    if(redirectToItems){
        return redirect('/menu-items');
    }

    if(loading){
        return <p className="text-white">Loading User Info...</p>
    }

    if(!data.admin){
        return <p>Not an Admin</p>
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left/>
                    <span>Show All Menu Items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>
    );
}