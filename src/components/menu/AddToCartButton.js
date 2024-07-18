import FlyingButton from 'react-flying-item'

export default function AddToCartButton({
    hasSizesOrExtras, onClick,basePrice,image
}){
    if(!hasSizesOrExtras){
        return(
            <div className="flying-button-parent mt-4">
                <FlyingButton
                    targetTop={'5%'}
                    targetLeft={'95%'}
                    src={image}>
                    <div onClick={onClick}>
                        Add to cart LKR {basePrice}
                    </div>
                </FlyingButton>
            </div>
        );
    }
    return(
        <button
             type="button"
             onClick={onClick}
             className="text-white mt-auto bg-primary  rounded-full px-8 py-2
           border-primary group-hover:bg-secondary group-hover:text-primary">
                <span>Add to Cart LKR {basePrice}</span>
        </button>
    );
}