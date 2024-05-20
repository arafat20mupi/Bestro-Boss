import { Helmet } from "react-helmet-async";
import desertImg from "../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../assets/menu/pizza-bg.jpg"
import saladImg from "../../assets/menu/salad-bg.jpg"
import soupImg from "../../assets/menu/soup-bg.jpg"
import SectionTitle from "../../Components/SectionTitle";
import ManuCategory from "./ManuCategory";
import useManu from "../../Hooks/UseManu";

const Manu = () => {
    const [manu] = useManu()
    const dessert = manu.filter((manu) => manu.category === "dessert")
    const offered = manu.filter((manu) => manu.category === "offered")
    const salad = manu.filter((manu) => manu.category === "salad")
    const pizza = manu.filter((manu) => manu.category === "pizza")
    const soup = manu.filter((manu) => manu.category === "soup")


    return (
        <div>
            <Helmet>
                <title>
                    Bistro | Manu
                </title>
            </Helmet>
            {/* manu cover */}
            <SectionTitle subHeading={"Don't Miss"} heading={" Today's Offer"}></SectionTitle>
            {/* offer manu */}
            <ManuCategory items={offered}></ManuCategory>
            {/* dessert manu */}
            <ManuCategory items={dessert} title={'dessert'} img={desertImg} ></ManuCategory>
            {/* pizza manu */}
            <ManuCategory items={pizza} title={'pizza'} img={pizzaImg} ></ManuCategory>
            {/* soup manu */}
            <ManuCategory items={soup} title={'soup'} img={soupImg} ></ManuCategory>
            {/* salad manu */}
            <ManuCategory items={salad} title={'salad'} img={saladImg} ></ManuCategory>
        </div>
    );
};

export default Manu;