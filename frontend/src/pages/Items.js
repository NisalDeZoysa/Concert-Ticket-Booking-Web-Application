import { useEffect, useState } from "react";
import "./Items.css";
import { api } from "../config";
import axios from "axios";

import {
    Table,
    Thead,
    Tbody,   
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
  } from '@chakra-ui/react';

import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";



function Items() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios.get(`${api}/item/all`);
            setItems(result.data);
        };

        fetchItems();

    }, []);

    console.log(items);

    return (
        <div className="items-container"> 
            <h2 className="subtitle">Concert Deatails</h2>

            <Link to="/admin/item-form">
                <Button colorScheme="red" variant="outline" leftIcon={<AddIcon w={4} h={4} />}>
                    Add Concert
                </Button>
            </Link>
            
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Concert</Th>
                            <Th isNumeric>Ticket Price</Th>
                            <Th>Image</Th>
                            <Th>Actions</Th>
                            </Tr>
                    </Thead>
                    <Tbody>

                        {items.map((item) => (
                            <Tr key={item.id}>
                                <Td>{item.name}</Td>
                                <Td isNumeric>{item.price} </Td>
                                <Td >
                                    <img src={`${api}${item.image}`} alt="" />
                                </Td>
                                <Td>
                                    <Link to={`/admin/item-form/${item.id}`}>
                                        <Button colorScheme="red" variant="outline" >
                                            Edit
                                        </Button>
                                    </Link>
                                    
                                </Td>
                            </Tr>
                        ))}

                        
                        <Tr>
                            
                        </Tr>
                        <Tr>
                            
                        </Tr>
                    </Tbody>

                </Table>
            </TableContainer>

        </div>
    
    );
}

export default Items;