
const FoodCard = ({item}) => {
    const {name ,image, price ,recipe} = item;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="">
                    <img src={image} alt="Shoes" className="rounded-xl" />
                </figure>
                <p className="absolute right-0 mr-4 mt-4 bg-slate-900 rounded-lg py-1 text-white px-4">${price}</p>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions">
                        <button className="btn  bg-slate-100 btn-outline border-0 border-orange-400 border-b-4">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;