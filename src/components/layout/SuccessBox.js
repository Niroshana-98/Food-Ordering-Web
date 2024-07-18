export default function SuccessBox({children}){
    return(
        <div className="text-center text-black bg-gray-100 p-4 rounded-lg text-black border-2 border-green-400 text-bold">
            {children}
        </div>
    );
}