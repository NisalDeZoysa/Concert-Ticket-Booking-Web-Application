import { useEffect, useState } from "react";
import FormInput from "../components/common/FormInput";
import "./ItemForm.css";
import axios from "axios";
import { api } from "../config";
import SubmitButton from "../components/common/SubmitButton";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


function ItemForm() {

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [image,setImage] = useState("");

    const navigate = useNavigate();
    const params = useParams();


    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios.get(`${api}/item/${params.id}`);
            const item = result.data;

            setName(item.name);
            setPrice(item.price);
            setImage(item.image);
        };

        if (params.id){
            fetchItems();
        }
        

    }, [params.id]);


    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image",file);

        const result = await axios.post(`${api}/upload`, formData);

        setImage(result.data.path);
    }


    const handleSubmit = async () => {

        if (params.id) {

            await axios.put(`${api}/item/edit/${params.id}`, {
                name,
                price,
                image
            });
    
            toast.success("Conert Deatais Updated Succecfully");

        } else {

            await axios.post(`${api}/item/add`, {
                name,
                price,
                image
            });
    
            toast.success("New Concert Added Succecfully");
        }

        
        navigate("/admin/items");
    }


    return( 
        <div className="item-form-container">
            <h2 className="subtitle">{params.id ? "Edit " : "Add "} Concert </h2>
            <form>
                <FormInput label="Concert Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <FormInput label="Ticket Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                <FormInput label="Flyer/Image" type="file" onChange={handleUpload}/>
                {image && (
                    <img src={`${api}${image}`} width="100px" height="100px" alt="" />
                )}


                <SubmitButton text={params.id ? "Update " : "Add "} className="submit-button" onClick={handleSubmit} />
            </form>
        </div>

    );

}

export default ItemForm;