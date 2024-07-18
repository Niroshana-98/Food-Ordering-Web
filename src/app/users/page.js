'use client';
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage(){

    const [users, setUsers] = useState([]);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/users').then(response =>{
            response.json().then(users => {
                setUsers(users);
            });
        })
    }, []);

if(loading){
    return 'Loading User Info...';
}

if(!data.admin){
    return 'Not an Admin';
}

    return(
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                {users.length > 0 && users.map((user) => (
                    <div key={user._id} className="bg-white rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                            <div className="text-secondary font-semibold">
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">No Name</span>)}
                            </div>
                            <span className="text-gray-500 font-semibold">{user.email}</span>
                        </div>
                        <div>
                            <Link className="font-semibold text-secondary" href={'/users/'+ user._id}>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}