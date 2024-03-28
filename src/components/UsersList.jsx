import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from 'axios';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      getUsers(28); // Fetch 28 products initially
  }, []);
    const getUsers = async (limit) => {
      setLoading(true);
      const response = await fetch(`https://api.escuelajs.co/api/v1/users?limit=${limit}`);
      const responseData = await response.json();
      setData(responseData);
      setFilteredData(responseData.slice(0, 32)); // Ensure that filteredData holds only up to 32 products
      setLoading(false);
  };

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Avatar</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><img src={user.avatar} alt={user.name} style={{ width: '50px', height: '50px' }} /></td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center">No users available</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default UsersList;
