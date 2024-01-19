import toast from "react-hot-toast";
import { api } from "../config";
import "./Cart.css"; 
import CartItem from "./CartItem";
import SubmitButton from "./common/SubmitButton";
import axios from "axios";


function Cart({cartItems, setCartItems}) {

    let total = 0;

    cartItems.forEach((item) => {
        total += item.price * item.qty;
    })

    const handleAdd = (itemId) => {

        const newCartItems = cartItems.map((item) => {
            if (itemId === item.id){
                return {
                    ...item,
                    qty: item.qty + 1
                };
            }

            return item;
        });

        setCartItems(newCartItems);
    };


    const handleReduce = (itemId) => {

        const newCartItems = cartItems.map((item) => {
            if (itemId === item.id && item.qty > 1){
                return {
                    ...item,
                    qty: item.qty - 1
                };
            }

            return item;
        });

        setCartItems(newCartItems);
    };


    const handleRemove = (itemId) => {

        const newCartItems = cartItems.filter((item) => {
            if (itemId === item.id) {
                return false;
            }
            else {
                return true;
            }
        });

        setCartItems(newCartItems);
    };

    const placeOrder = async () => {

        try{
            await axios.post(`${api}/item/place-order`, {items: cartItems});
            toast.success("Ticket booking order placed succesfully");
            setCartItems([]);

        } catch (err) {
            console.log(err);
            
        }
    };


    return(
        <div className="cart-container box-shadow">

            <h2>Your Tickets</h2>

            <div className="cart-item">
                {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} handleAdd = {() => handleAdd(item.id)} 
                    handleReduce = {() => handleReduce(item.id)}
                    handleRemove = {() => handleRemove(item.id)}
                    />
                ))}
            </div>
            
            {cartItems.length > 0 && (
                <>
                    <div className="total"> Total: {total} </div>

                    <SubmitButton text="Place Order" className="place-order-button" onClick={placeOrder}/>
                
                </>
            )}
            
        </div>
    );
}

export default Cart;