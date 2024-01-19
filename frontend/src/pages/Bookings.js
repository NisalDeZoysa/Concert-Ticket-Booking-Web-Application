import { useEffect, useState } from "react";
import "./Bookings.css";
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
    Badge,
  } from '@chakra-ui/react';

// import { AddIcon } from "@chakra-ui/icons";
// import { Link } from "react-router-dom";



function Bookings() {

    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        const result = await axios.get(`${api}/item/orders`);
        setBookings(result.data);
    };

    useEffect(() => {
        
        fetchBookings();

    }, []);


    const handleProgress = async (bookingId) => {
        await axios.post(`${api}/item/order-complete/${bookingId}`, {});
        fetchBookings();
    }

    // console.log(items);

    return (
        <div className="items-container"> 
            <h2 className="subtitle">Ticket Bookings</h2>

            
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Ticket Code</Th>
                            <Th>Items</Th>
                            <Th isNumeric>Total Price</Th>
                            <Th>Actions</Th>
                            </Tr>
                    </Thead>
                    <Tbody>

                        {bookings.map((booking) => (
                            <Tr key={booking.id}>
                                <Td>{booking.code}</Td>
                                <Td>
                                    {booking.items.map((item) => (
                                        <div key={item.name}>
                                            {item.name} ({item.qty})
                                        </div>
                                    ))}
                                </Td>
                                <Td isNumeric>{booking.total} </Td>
                                
                                <Td>
                                    {/*<Link to={`/admin/item-form/${booking.id}`}>
                                        <Button colorScheme="red" variant="outline" >
                                            Edit
                                        </Button>
                                    </Link>
                                    */}
                                    {booking.complete ? (
                                        <Badge colorScheme="green" > Picked Up</Badge>
                                    ): (
                                        <Button colorScheme="red" onClick = {() => handleProgress(booking.id)}>
                                            On Progress
                                        </Button>
                                    )}
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

export default Bookings;