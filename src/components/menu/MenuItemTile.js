import AddToCartButton from "@/components/menu/AddToCartButton";

export default function MenuItemTile({onAddToCart, ...item}){
    const {image, description,name, basePrice,sizes, extraIngredientPrice} = item;
    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrice?.length >0;
    return(
        <div className="bg-secondary p-4 rounded-lg text-center text-gray-200 group
       hover:bg-primary hover:shadow-md hover-shadow-black/25 transition-all hover:text-black
         flex flex-col justify-between">
            <div className="text-center">
                <img src={image} className="max-h-auto max-h-24 block mx-auto transition-transform duration-300 ease-in-out transform group-hover:scale-125" alt="pizza"/>
            </div>    
            <h4 className="font-semibold text-xl my-3 group-hover:font-bold">
                {name}
            </h4>
            <p className="text-white text-sm line-clamp-3 group-hover:text-secondary group-hover:font-semibold">
                {description}
            </p>
            <AddToCartButton
                image={image}
                hasSizesOrExtras={hasSizesOrExtras}
                onClick={onAddToCart}
                basePrice={basePrice}
            />
        </div>
    );
}