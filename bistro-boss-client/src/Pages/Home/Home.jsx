import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Category from "./Category";
import Featured from "./Featured";
import PupolarManu from "./PupolarManu";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro</title>
            </Helmet>
            <div >
                <Banner></Banner>
            </div>
            <div >
                <Category></Category>
            </div>
            <div >
                <PupolarManu></PupolarManu>
            </div>
            <div >
                <Featured></Featured>
            </div>
            <div >
                <Testimonials></Testimonials>
            </div>
        </div>
    );
};

export default Home;