import FoodCard from "../../Components/FoodCard";

const OrderTab = ({items}) => {
    return (
        <div className="grid md:grid-cols-3 gap-10 ">
        {
            items.map((manu) => <FoodCard
                key={manu._id}
                item={manu}
            ></FoodCard>)
        }
    </div>
    );
};

export default OrderTab;