'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/layout/SearchBar";

export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCategories(categories));
        });
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => setMenuItems(menuItems));
        });
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categoriesWithItems = categories.filter(category => 
        filteredMenuItems.some(item => item.category === category._id)
    );

    return (
        <section className="mt-8 text-white">
            <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
            {filteredMenuItems.length > 0 ? (
                categoriesWithItems.map((c, index) => {
                    const categoryItems = filteredMenuItems.filter(item => item.category === c._id);
                    return (
                        <div key={c._id}>
                            <div className="text-center">
                                <SectionHeaders mainHeader={c.name} />
                            </div>
                            <div className="grid md:grid-cols-4 gap-4 mt-6 mb-12">
                                {categoryItems.map((item, index) => (
                                    <MenuItem key={item._id} {...item} />
                                ))}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-center mt-6">
                    <p className="font-bold">No Menu Items Found 😔</p>
                </div>
            )}
        </section>
    );
}
