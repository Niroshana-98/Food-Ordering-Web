import EditableImage from "@/components/layout/EditableImage";
import {use, useEffect, useState} from "react";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({onSubmit,menuItem}){

    const [image, setImage] = useState(menuItem?.image || '');
    const [name,setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice,setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes,setSizes] = useState(menuItem?.sizes || []);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [
        extraIngredientPrices,
        setExtraIngredientPrices
    ] = useState(menuItem?.extraIngredientPrices || []);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }, []);

    return(
        <form
         onSubmit={ev => 
            onSubmit(ev, {
                image,name,description,basePrice,sizes,extraIngredientPrices,category,
            })
        }
         className="mt-8 max-w-2xl mx-auto">
        <div
         className="md:grid items-start gap-4" 
         style={{gridTemplateColumns:'.3fr .7fr'}}>
            <div>
                <EditableImage link={image} setLink={setImage}/>
            </div>
            <div className="grow">
                <label className="text-white">Item Name</label>
                <input
                 type="text"
                 value={name}
                 onChange={ev => setName(ev.target.value)}
                />
                <label className="text-white">Description</label>
                <textarea
                 type="text"
                 value={description}
                 onChange={ev => setDescription(ev.target.value)}
                 rows={3}
                 cols={40}
                 className="w-full px-3 py-2 text-secondary font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
                 placeholder="Enter description..."
                />
                <label  className="text-white">Category</label>
                <select className="font-semibold text-gray-700" value={category} onChange={ev => setCategory(ev.target.value)}>
                    {categories?.length > 0 && categories.map(c =>(
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
                <label className="text-white">Price</label>
                <input
                 type="text"
                 value={basePrice}
                 onChange={ev => setBasePrice(ev.target.value)}
                />
                <MenuItemPriceProps name={'Sizes'} 
                                    addLabel={'Add Item Size'} 
                                    props={sizes} 
                                    setProps={setSizes}/>
                <MenuItemPriceProps name={'Extra Ingredients'} 
                                    addLabel={'Add Ingredients Prices'}
                                    props={extraIngredientPrices}
                                    setProps={setExtraIngredientPrices}/>
                <button type="submit">Save</button>
            </div>
        </div>
    </form>
    );
}