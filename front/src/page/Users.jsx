import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";

import Container from "../layout/Container";
import ModActions from "../components/ModActions";
import Button from "../components/Button";

import '../scss/page/users.scss';

function Users(){
    const [users, setUsers] = useState([]);
    const [page, setPage]   = useState(1)
    const [isLastPage, setIsLastPage] = useState(false);


    const { auth } = useAuth();

    async function getUsers(){
        const args = {
            token: auth.token,
            url: 'user/all/' + page
        };
        const res = await apiRequest(args);
        if (res.status === 200){
            setUsers(res.data.rows);
            if ( (page * 9 ) > res.data.count ){
                setIsLastPage(true);
            } 
        }
    } 

    useEffect(() => {   
        getUsers(page);
    }, [ auth.token, page]);

    return (
        <Container>
            <table className="table">
                <thead className="table__head">
                    <tr className="table__line table__line--head">
                        <th className="table__cell table__cell--head">Rôle</th>
                        <th className="table__cell table__cell--head">Id</th>
                        <th className="table__cell table__cell--head">Prénom</th>
                        <th className="table__cell table__cell--head">Nom</th>
                        <th className="table__cell table__cell--head">Email</th>
                        <th className="table__cell table__cell--head">Créé le</th>
                        <th className="table__cell table__cell--head">Supprimé le</th>
                        <th className="table__cell table__cell--head">profil</th>
                        <th className="table__cell table__cell--head">actions</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                {users.map((user) => (
                    <tr key={user.id} className="table__line">
                        <td className="table__cell" data-label="role">{user.role}</td>
                        <td className="table__cell" data-label="id">{user.id}</td>
                        <td className="table__cell" data-label="firstName">{user.firstName}</td>
                        <td className="table__cell" data-label="lastName">{user.lastName}</td>
                        <td className="table__cell" data-label="email">{user.email}</td>
                        <td className="table__cell" data-label="créé le">{user.createdAt.split('T')[0].split('-').reverse().join('/')}</td>
                        <td className="table__cell" data-label="supprimé le">{user.deletedAt && user.deletedAt.split('T')[0].split('-').reverse().join('/')}</td>
                        <td className="table__cell" data-label="profil"><Link to={`/user/${user.id}`}>voir</Link></td>
                        <td className="table__cell table__cell--actions"><ModActions isMod list={users} setList={setUsers} id={user.id} deletedAt={user.deletedAt} path='user' /></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {!isLastPage && <Button type="button" classStyle="next" onclick={() => setPage(page + 1)}>Page suivante</Button>}
        </Container>
    ) 

}

export default Users;