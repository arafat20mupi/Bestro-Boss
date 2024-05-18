import SectionTitle from "../../Components/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

const Testimonials = () => {
    const [reveiws, setReveiws] = useState([]);
    useEffect(() => {
        fetch('Reveiws.json')
            .then(res => res.json())
            .then(data => setReveiws(data))
    }, [])
    return (
        <div >
            <SectionTitle
                subHeading={'What Our Clients Say'}
                heading={'Testimonials'}
            ></SectionTitle>
            <div className=" my-10">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reveiws.map(reveiw => <SwiperSlide key={reveiw._id}>
                            <div className="m-24 flex flex-col items-center space-y-4">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={reveiw.rating}
                                    readOnly
                                />
                                <h3 className="text-xl py-6">{reveiw.details}</h3>
                                <p className="text-3xl font-medium text-orange-500">{reveiw.name}</p>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;