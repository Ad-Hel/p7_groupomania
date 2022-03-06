import Container from "../layout/Container";
import UserLine from "../components/UserLine";

import '../scss/page/users.scss';
import Archive from "../components/Archive";

function Users(){

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
                <Archive path='user/all/'>
                    <UserLine/>    
                </Archive>
                </tbody>
            </table>
        </Container>
    ) 
}

export default Users;