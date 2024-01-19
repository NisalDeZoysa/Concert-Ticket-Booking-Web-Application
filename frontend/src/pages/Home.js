import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import "./Home.css";
import {Button} from '@chakra-ui/react'
import MainMenu from "../components/MainMenu";
import Cart from "../components/Cart";
import { useState } from "react";
import { useGlobal } from "../GlobalContext";



function Home() {

    const [cartItems, setCartItems] = useState([]);
    const {user} = useGlobal();


    return ( 
    <div className="home-container">
        <div className="home-nav">
            <Logo />
            <div>
                {user ? (
                    <Link to="/admin">
                        <Button colorScheme="blue" >Go To Dashboard</Button>
                    </Link>
                ): (
                    <>
                        <Link to="/login">
                            <Button colorScheme="blue" variant="outline">Login</Button>
                        </Link>

                        <Link to="/Register">
                            <Button colorScheme="yellow" variant="outline">Register</Button>
                        </Link>

                    </>

                )}
                
            </div>
        </div>

        <div className="about-section">
                <h2>About Our Company</h2>
                <div className="about-content">
                    <p>
                        Welcome to TicketMinistry.LK, your one-stop destination for concert tickets. We are dedicated to providing you with the best concert experiences, featuring your favorite artists and bands.
                    </p>
                    <p>
                        Whether you're a music enthusiast or just looking for a fun night out, we've got you covered.
                    </p>
                    
                    <button className="about-button">Learn More</button>

                    <p>
                        Join us in the world of live music, and let us be your gateway to unforgettable experiences.
                    </p>
                </div>
                {/* You can add more content, images, and details about your company here. */}
        </div>

        <div className="home-inner-container">
            <MainMenu cartItems={cartItems} setCartItems={setCartItems}/>
            <Cart cartItems={cartItems} setCartItems={setCartItems}/>
        </div>

        
        
    </div> 
    );
}

export default Home;