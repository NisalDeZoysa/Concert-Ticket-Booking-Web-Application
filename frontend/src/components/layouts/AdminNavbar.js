import { Avatar, Button } from "@chakra-ui/react";
import { useGlobal } from "../../GlobalContext";
import { api } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AdminNavbar() {

    const {user, setUser} = useGlobal();
    const navigate = useNavigate();

    const handleLogout = async() => {
        await axios.post(`${api}/auth/logout`, {}, {withCredentials : true});
        setUser(null);
        navigate("/")
    };


    return(
        <div className="admin-navbar">
            <h2>Admin Dashboard</h2>

            <div className="admin-navbar-buttons">
                {user && (
                    <div className="admin-navbar-avatar">
                        <Avatar size="sm" name={user.email} />
                        {user.email}
                    </div>
                )}
                <Button colorScheme="red" varient="outline" onClick={handleLogout} >
                    Logout
                </Button>
            </div>
        </div>

    );

}

export default AdminNavbar;