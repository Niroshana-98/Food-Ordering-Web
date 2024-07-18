'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import Link from "next/link";
import Right from "@/components/icons/Right";
import Image from "next/image";
import SearchBar from "@/components/layout/SearchBar";

export default function MenuItemsPage(){

    const [menuItems, setMenuItems]=useState([]);
    const {loading, data} = useProfile();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems=>{
                setMenuItems(menuItems);
            });
        })
    }, []);

    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    if(loading){
        return <p className="text-white">Loading User Data</p>;
    }

    if(!data.admin){
        return <p className="text-white">Not an Admin</p>;
    }
    return(
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="mt-8 mb-2">
                <Link
                 className="button flex" 
                 href={'/menu-items/new'}>
                    Create New Menu Items
                    <Right/>
                </Link>
            </div>
            <div className="mt-8">
                <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
                {filteredMenuItems.length > 0 && (
                    <>
                        <h2 className="text-sm text-gray-100 mt-8">Edit Menu Item :</h2>
                        <div className="grid grid-cols-4 gap-2">
                            {filteredMenuItems.map((item) => (
                                <Link
                                    href={'/menu-items/edit/' + item._id}
                                    key={item._id}
                                    className="text-white bg-secondary rounded-lg p-6 hover:bg-primary flex-col group"
                                >
                                    <div className="relative">
                                        <Image
                                            className="rounded-lg group-hover:scale-105"
                                            src={item.image}
                                            alt={''}
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                    <div className="text-center">
                                        {item.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
                {filteredMenuItems.length === 0 && (
                    <p className="text-white font-semibold text-center mt-8">No menu items found 😞</p>
                )}
            </div>

        </section>
    );
}