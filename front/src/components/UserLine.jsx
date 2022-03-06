import { Link } from 'react-router-dom';

import ModActions from './ModActions';

function UserLine(props){
    const user = props.item;
    const users = props.items;
    const setUsers = props.setItems

    return(
        <tr className="table__line">
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
    )
}

export default UserLine;