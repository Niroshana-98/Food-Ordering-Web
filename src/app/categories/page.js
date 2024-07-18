'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import {useProfile} from "@/components/UseProfile";
import toast from "react-hot-toast";
import Trash from "@/components/icons/Trash";
import Edit from "@/components/icons/Edit";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage(){

    const [categoryName,setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const {loading:profileLoading,data:profileData} = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(()=> {
        fetchCategories();
    }, []);

    function fetchCategories(){
        fetch('/api/categories').then(res=>{
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            res.json().then(categories => {
                setCategories(categories);
            }).catch(error => {
                console.error('Error parsing JSON:', error);
            });
        }).catch(error => {
            console.error('Network error:', error);
        });
    }
    
    

    async function handleCategorySubmit(ev){
        ev.preventDefault();
        const creationPromise = new Promise(async(resolve,reject)=>{
            const data = {name:categoryName};
            if(editedCategory){
                data._id = editedCategory._id;
            }

            const response = await fetch('/api/categories',{
                method: editedCategory ? 'PUT':'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if(response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(creationPromise,{
            loading: editedCategory
                        ?'Updating Category...'
                        :'Creating New Category...',
            success: editedCategory?'Category Updated':'Category Created',
            error: 'Action Unsuccessfully !',
        });  
    }

    async function handleDeleteClick(_id){
        const promise = new Promise(async(resolve,reject)=>{
            const response = await fetch('/api/categories?_id='+_id,{
                method: 'DELETE',
            });
            if(response.ok){
                resolve();
            }else{
                reject();
            }
        });
        await toast.promise(promise,{
            loading: 'Deleting...',
            success: 'Category Deleted',
            error: 'Action Unsuccessfully !',
        });

        fetchCategories();
    }

    if(profileLoading){
        return <p className="text-white">Loading User Info...</p>;
    }

    if(!profileData.admin){
        return <p className="text-white">Not an Admin</p>;
    }
    return(
        <section className="mt-8 max-w-2xl mx-auto text-white">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label className="text-white">
                            {editedCategory ? 'Update Category' : 'New Category Name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text"
                                value={categoryName}
                                onChange={ev => setCategoryName(ev.target.value)}
                        />
                    </div>
                    <div className="pb-2 flex gap-2">
                        <button className="border border-primary hover:text-secondary" type="submit">
                            {editedCategory ? 'Update': 'Create'}
                        </button>
                        <button
                         onClick={()=> {
                            setEditedCategory(null);
                            setCategoryName('');
                        }}
                         type="button"
                         className="bg-white text-secondary">
                            Cancel
                        </button>
                    </div>
                </div>    
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-100 mb-1">Existing Category:</h2>
                {categories?.length > 0 && categories.map( c => (
                    <div
                     key={c._id} 
                     className="bg-gray-200 text-black font-semibold rounded-xl p-2 px-4 flex gap-1  mb-2 hover:bg-gray-500 items-center">
                        <div
                         className="grow">
                            {c.name}
                        </div> 
                        <div className="flex gap-1">
                            <button
                             type="button"
                             className="custom-bg-edit text-white border-none"
                                onClick={() =>{
                                    setEditedCategory(c);
                                    setCategoryName(c.name);
                                }}
                            >
                                <Edit/>
                            </button> 
                            <DeleteButton
                             label={<Trash/>}
                             onDelete={() => handleDeleteClick(c._id)}
                             style={{ backgroundColor: 'red' }}/>
                        </div> 
                    </div>
                ))}
            </div>
        </section>
    );
}