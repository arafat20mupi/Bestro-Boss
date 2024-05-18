
const ManuItem = ({manu}) => {
    const {name ,recipe ,image ,category ,price} = manu

    return (
        <div className="flex space-x-2">
            <img src={image} alt="" className="w-[120px] " style={{borderRadius:'0 200px 200px 200px' }}/>
            <div>
                <h3>{name}----------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default ManuItem;