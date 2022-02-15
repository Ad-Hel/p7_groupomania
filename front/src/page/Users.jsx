import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";
import Container from "../layout/Container";

function Users(){
    const [users, setUsers] = useState([]);
    const [page, setPage]   = useState(1)
    const { auth } = useAuth();

    useEffect(() => {
        async function getUsers(){
            const args = {
                token: auth.token,
                url: 'auth/users/' + page
            };
            const res = await apiRequest(args);
            if (res.status === 200){
                console.log(res.data.rows)
                setUsers(res.data.rows);
                setPage(res.data.count);
            }
        }   
        getUsers();
    }, [])
    

    return (
        <Container>
            <table>
                <thead>
                    <td>Rôle</td>
                    <td>Id</td>
                    <td>Prénom</td>
                    <td>Nom</td>
                    <td>Email</td>
                </thead>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.role}</td>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td><Link to={`/user/${user.id}`}>voir</Link></td>
                    </tr>
                ))}
            </table>
        </Container>
    ) 

}

export default Users;