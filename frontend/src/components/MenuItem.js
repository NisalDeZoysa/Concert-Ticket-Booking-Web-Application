import { api } from "../config";

function MenuItem({item, onClick}) {

    return(
        <div className="menu-item-container" onClick={onClick}>
            <img src={`${api}${item.image}`} alt="" />
            <h3 className="menu-item-title">{item.name}</h3>
            <h5 className="menu-item-price">Rs. {item.price} </h5>
            <h5 className="menu-item-price">VIP - Rs. {item.price + 1000} </h5>
        </div>

    );
}

export default MenuItem;