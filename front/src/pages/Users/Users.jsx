import { useState } from 'react';

import { Archive, Container, Pagination } from "features/ui";
import { UserRow } from "features/users";

import './users.scss';

function Users(){
    const [count, setCount] = useState(0);
    const [page, setPage]   = useState(1);

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
                <Archive path='user/all/' page={page} setCount={setCount}>
                    <UserRow/>    
                </Archive>
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} count={count}/>
        </Container>
    ) 
}

export default Users;