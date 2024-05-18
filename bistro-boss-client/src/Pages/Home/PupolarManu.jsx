import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle";
import ManuItem from "../Shared/ManuItem";

const PupolarManu = () => {
    const [manu, setManu] = useState([]);
    useEffect(() => {
        fetch('Manu.json')
            .then(res => res.json())
            .then(data => {
                const PopulerItems = data.filter(item => item.category === 'popular')
                setManu(PopulerItems)
            })
    }, [])
    return (
        <div className="mb-12 container mx-auto">
            <SectionTitle heading={"FROM OUR MENU"} subHeading={'Populer Manu'} ></SectionTitle>
            <div className="grid gap-10 md:grid-cols-2 ">
                {
                    manu.map(manu => <ManuItem key={manu._id}
                        manu={manu}
                    ></ManuItem>)
                }
            </div>
            <button className="btn btn-outline border-0 border-b-4">Veiw Full Manu</button>
        </div>
    );
};

export default PupolarManu;