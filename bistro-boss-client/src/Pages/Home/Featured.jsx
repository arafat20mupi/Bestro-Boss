import SectionTitle from "../../Components/SectionTitle";
import featuredImage from "../../assets/home/featured.jpg"
const Featured = () => {
    return (
        <div className="bg-opacity-5  bg-fixed  bg-[url('https://i.postimg.cc/wvR2Z4gZ/featured.jpg')] my-20 pt-8 bg-cover bg-no-repeat container mx-auto text-white">
            <SectionTitle heading={'Featured Items'} subHeading={'Check it out'}></SectionTitle>
            <div className="md:flex  justify-center items-center px-36 pb-20 pt-12">
                <div>
                    <img src={featuredImage} alt="" />
                </div>
                <div className="md:ml-10 space-y-4 ">
                    <p className="text-2xl ">March 20, 2023</p>
                    <h2 className="text-xl">WHERE CAN I GET SOME?</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. In illo placeat perferendis! Nisi quasi ipsam consequatur quia odit earum minus odio expedita repellat sed eaque, molestias deleniti quos molestiae sint tempore ad veritatis eum! Sint, esse. Quidem TESTIMONIALS quibusdam illum ullam!</p>
                    <button className="btn btn-outline border-0 border-b-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;