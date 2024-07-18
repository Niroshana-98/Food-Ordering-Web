import { useState } from "react";

export default function DeleteButton({label, onDelete}){
    const[showConfirm, setShowConfirm] = useState(false);

    if(showConfirm){
        return(
            <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
                <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-white mb-2">
                        Are You Sure You Want To Delete This ?
                    </div>
                    <div className="flex gap-2">
                        <button
                         type="button" 
                         className="bg-white" 
                         onClick={() => setShowConfirm(false)}>
                            Cancel
                        </button>
                        <button
                         type="button"
                         onClick={() => {
                            onDelete();
                            setShowConfirm(false);
                         }} 
                         className="primary border-redB hover:text-white">
                            Yes, Delete!
                        </button>
                    </div>
                </div>
            </div>
            
           
        );
    }
    return(
        <button type="button" className="bg-redB text-white border-redB"
         onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    );
}