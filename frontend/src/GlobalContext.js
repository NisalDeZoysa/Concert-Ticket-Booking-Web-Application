import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./config";

const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${api}/auth/me`, {withCredentials: true});
                setUser(result.data);
            } catch(err) {

            }
        };

        fetchUser();
    }, []);

    return ( <GlobalContext.Provider value={{user, setUser}}>
                {children}
            </GlobalContext.Provider> 
           );
};

export default GlobalProvider;

export function useGlobal() {
    return useContext(GlobalContext);
}

