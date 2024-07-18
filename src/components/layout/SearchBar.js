import React from "react";
import Search from "@/components/icons/Search"; // Replace with actual path to your Search icon component

const SearchBar = ({ searchTerm, onChange }) => {
    return (
        <div className="max-w-md mx-auto mb-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="text-black" />
                </div>
                <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={onChange}
                    className="text-secondary font-semibold w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                    style={{ borderRadius: '9999px' }}
                />
            </div>
        </div>
    );
};

export default SearchBar;

