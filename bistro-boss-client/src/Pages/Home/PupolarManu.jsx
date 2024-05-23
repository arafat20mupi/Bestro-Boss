import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle";
import ManuItem from "../Shared/ManuItem";
import useManu from "../../Hooks/UseManu";
import { Link } from "react-router-dom";

const PupolarManu = () => {
    const [manu] = useManu()
    const populer = manu.filter((manu) => manu.category === "popular")

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
            <Link className="items-center w-full flex justify-center" to={'/manu'}>
                <button className="btn btn-outline mt-8   border-0 border-b-4">Veiw Full Manu</button>
            </Link>
        </div>
    );
};

export default PupolarManu;