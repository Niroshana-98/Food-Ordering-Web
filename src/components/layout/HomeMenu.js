import { useEffect, useState } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items')
            .then(res => res.json())
            .then(menuItems => {
                const shuffledItems = shuffleArray(menuItems);
                setBestSellers(shuffledItems.slice(0, 3)); // Change 3 to the number of random items you want
            });
    }, []);

    return (
        <section className="">
            <div className="absolute left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[170px] text-left -z-10">
                    {/*<Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'}/>*/}
                </div>
                <div className="absolute -top-[200px] right-0 -z-10">
                    {/*<Image src={'/sallad1.png'} width={107} height={195} alt={'sallad'}/>*/}
                </div>
            </div>
            <div className="text-center mb-12">
                <SectionHeaders
                    subHeader={'Check out'}
                    mainHeader={'Our Best Sellers'} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem key={item._id} {...item} />
                ))}
            </div>
        </section>
    );
}

// Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
