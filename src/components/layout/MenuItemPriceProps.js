import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import { useState } from "react";

export default function MenuItemPriceProps({name,addLabel,props,setProps}){

    const [isOpen, setIsOpen] = useState(false);

    function addProp(){
        setProps(oldProps =>{
            return [...oldProps, {name:'',price:0}];
        });
    }

    function editProp(ev, index, prop){
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeProp(indexToRemove){
        setProps(prev => prev.filter((v,index)=> index !== indexToRemove));
    }

    return(
        <div className="bg-white p-2 rounded-md mb-2">
            <button 
                onClick={() => setIsOpen(prev => !prev)}
                className="inline-flex p-1 border-0 justify-start" 
                type="button">
                    {isOpen && (
                        <ChevronUp/>
                    )}
                    {!isOpen && (
                        <ChevronDown/>
                    )}
                    <span>{name}</span>
                    <span className="ml-1">({props?.length})</span>
            </button>
            <div className={isOpen ? 'block' :'hidden'}>
                {props?.length > 0 && props.map((size,index) => (
                    <div className="flex items-end gap-2" key={index}>
                        <div>
                            <label>Name</label>
                            <input type="text"
                                    placeholder="Size Name" 
                                    value={size.name}
                                    onChange={ev => editProp(ev, index, 'name')}/>
                        </div>
                        <div>
                            <label>Extra Price</label>
                            <input type="text"
                                    placeholder="Extra Price" 
                                    value={size.price}
                                    onChange={ev => editProp(ev, index, 'price')}/>
                        </div>
                        <div>
                            <button type="button"
                                    onClick={() => removeProp(index)}
                                    className="bg-white mb-2 px-2">
                                        <Trash/>
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addProp}
                    className="bg-secondary text-white flex items-center justify-center">
                    <Plus className="w-5 h-5"/>
                    <span className="ml-2">{addLabel}</span>
                </button>
            </div>
            
        </div>
    );
}