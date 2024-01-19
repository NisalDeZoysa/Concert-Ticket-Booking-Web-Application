import { useState } from "react";
import FormInput from "../components/common/FormInput";
import "./Login.css";
import SubmitButton from "../components/common/SubmitButton";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../config";
import { useGlobal } from "../GlobalContext";
import { useNavigate } from "react-router-dom";     



function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {user, setUser} = useGlobal();


    const handleSubmit = async () => {
        try {
            
            const result = await axios.post(`${api}/auth/login`, {
                email: email,
                password: password
            }, {withCredentials: true });

            console.log(result.data); //pppp


            setUser(result.data);
            toast.success("Login successful");

            //setEmail("");
            //setPassword("");
            navigate("/admin");

        } catch (err) {
            console.log(err);
            toast.err("Invalid Credentials");
        }
    };


    return (
    
        <div className="center-div">
            <form className="login-container">
                <h2>Login</h2>
                <FormInput label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <SubmitButton text="submit" onClick={handleSubmit} />
            </form>

            
        </div>
       
    );
}

export default Login;