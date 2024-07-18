'use client'; 
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage(){
    const {loading, data} = useProfile();
    const [user, setUser] = useState(null);
    const{id} = useParams();

    useEffect(() =>{
        fetch('/api/profile?_id='+id).then(res =>{
            res.json().then(user =>{
                setUser(user);
            });
        })
    },[]);

    async function handleSaveButtonClick(ev, data) {
        ev.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
          const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data,_id:id}),
          });
          if (res.ok)
            resolve();
          else
            reject();
        });
    
        await toast.promise(promise, {
          loading: 'Saving User...',
          success: 'User Saved',
          error: 'An Error has Occurred While Saving the User',
        });
      }

    if(loading){
        return 'Loading User Profile...';
    }
    if(!data.admin){
        return 'Not an Admin';
    }
    return(
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true}/>
            <div className="mt-8 text-white">
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}