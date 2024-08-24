import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Import and use useNavigate for redirection

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        navigate("/login"); // Redirect if token is not present
        return;
      }
      
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.log(error.message);
        // Optionally handle errors here, e.g., redirect to login
        navigate("/login");
      }
    };

    fetchUsers(); // Call fetchUsers function
  }, [token, navigate]);

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      {users.length > 0 ? (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default Dashboard;
