import { Link } from "react-router-dom";
import Cover from "../Shared/Cover/Cover";
import ManuItem from "../Shared/ManuItem";

const ManuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-8">
            {
                title && <Cover img={img} title={title} ></Cover>
            }
            <div className="grid gap-10 md:grid-cols-2 my-16">
                {
                    items.map(manu => <ManuItem key={manu._id}
                        manu={manu}
                    ></ManuItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className="btn btn-outline border-0 border-b-4">Order Now</button>
            </Link>

        </div>
    );
};

export default ManuCategory;