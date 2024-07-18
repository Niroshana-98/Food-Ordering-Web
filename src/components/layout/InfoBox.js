export default function InfoBox({children}){

    return(
        <div className="text-center text-black bg-blue-100 p-4 rounded-lg text-black border-2 border-blue-400 text-bold">
            {children}
        </div>
    );
}