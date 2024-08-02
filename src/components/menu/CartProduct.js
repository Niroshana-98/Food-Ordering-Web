import { useContext } from "react";
import {CartContext,cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import LeftA from "@/components/icons/increment";
import RightA from "@/components/icons/decrement";
import Image from "next/image";

export default function CartProduct({product,index,onRemove,disableButtons = false}) {
  const { incrementQuantity, decrementQuantity } = useContext(CartContext);

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt={''} />
      </div>
      <div className="grow">
        <h3 className="font-semibold">
          {product.name}
        </h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map(extra => (
              <div key={extra.name}>{extra.name} LKR{extra.price}</div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button 
            onClick={() => decrementQuantity(index)} 
            className="bg-gray-200 p-1 rounded-md"
            disabled={disableButtons || product.quantity <= 1}
        >
            <RightA />
        </button>
        <input 
            type="number" 
            value={product.quantity} 
            readOnly 
            className="w-12 text-center border rounded-md text-black" 
            min="1"
            max="10"
        />
        <button 
            onClick={() => incrementQuantity(index)} 
            className="bg-gray-200 p-1 rounded-md"
            disabled={disableButtons || product.quantity >= 10}
        >
            <LeftA />
        </button>
      </div>
      <div className="text-lg font-semibold">
        LKR {cartProductPrice(product).toFixed(2)}
      </div>
      {!!onRemove && (
        <div className="ml-2 ">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-2 text-white hover:text-red-700 border-none rounded-lg"
            disabled={disableButtons}>
            <Trash/>
          </button>
        </div>
      )}
    </div>
  );
}