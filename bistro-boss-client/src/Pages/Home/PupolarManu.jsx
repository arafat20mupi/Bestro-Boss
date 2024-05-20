import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle";
import ManuItem from "../Shared/ManuItem";
import useManu from "../../Hooks/UseManu";

const PupolarManu = () => {
    const [manu] = useManu()
    const populer = manu.filter( (manu) => manu.category === "popular")
  
    return (
        <div className="mb-12 container mx-auto">
            <SectionTitle heading={"FROM OUR MENU"} subHeading={'Populer Manu'} ></SectionTitle>
            <div className="grid gap-10 md:grid-cols-2 ">
                {
                    populer.map(manu => <ManuItem key={manu._id}
                        manu={manu}
                    ></ManuItem>)
                }
            </div>
            <button className="btn btn-outline border-0 border-b-4">Veiw Full Manu</button>
        </div>
    );
};

export default PupolarManu;