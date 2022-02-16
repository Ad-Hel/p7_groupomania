import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";

import Container from "../layout/Container";
import ModActions from "../components/ModActions";
import Button from "../components/Button";

function Users(){
    const [users, setUsers] = useState([]);
    const [page, setPage]   = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)

    const { auth } = useAuth();

    useEffect(() => {
        async function getUsers(){
            const args = {
                token: auth.token,
                url: 'user/all/' + page
            };
            const res = await apiRequest(args);
            if (res.status === 200){
                setUsers(res.data.rows);
                setPage(res.data.count);
                if ( (page * 9 ) > res.data.count ){
                    setIsLastPage(true);
                } 
                console.log(auth.role)
            }
        }   
        getUsers();
    }, []);

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <td>Rôle</td>
                        <td>Id</td>
                        <td>Prénom</td>
                        <td>Nom</td>
                        <td>Email</td>
                        <td>Créé le</td>
                        <td>Supprimé le</td>
                        <td>profil</td>
                    </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.role}</td>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.createdAt.split('T')[0].split('-').reverse().join('/')}</td>
                        <td>{user.deletedAt && user.deletedAt.split('T')[0].split('-').reverse().join('/')}</td>
                        <td><Link to={`/user/${user.id}`}>voir</Link></td>
                        <td><ModActions deletedAt={user.deletedAt} id={user.id} path='user' /></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {!isLastPage && <Button type="button" classStyle="next" onclick={() => setPage(page + 1)}>Page suivante</Button>}
        </Container>
    ) 

}

export default Users;