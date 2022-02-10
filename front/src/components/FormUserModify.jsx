import { useState, useEffect } from "react";
import apiRequest from '../js/apiRequest';
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import useAuth from "./useAuth";


function FormUserModify(props){
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
    });
    const [oldUser, setOldUser] = useState([])
    const [error, setError] = useState(null);
    const auth = useAuth().auth;
    const id = props.id;
            
    useEffect( () => {
        if (id > 0){
        async function getUser(id){
            const args = {
                token: auth.token,
                url: 'auth/' + id
            }
            const res = await apiRequest(args);
            if (res.status === 200){
                const user = {
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    password: "",
                    role: res.data.role
                }
                setUser(user);
                setOldUser(user);
            }
        }
        getUser(id);
    }}, [])
    
    async function sendUser(user){
        const args = {
            token: auth.token,
            head: {
                "Content-Type": "application/json"
            },
            init: {
                method: 'PUT',
                body: user
            },
            url: 'auth/' + id
        }
        const res = await apiRequest(args);
        if (res.status === 200){
            props.setIsModify(false);
       } else if (res.status === 403){
           setError(res.data.message);
       }
    }

    function userModify(form){
        form.preventDefault();
        const newUser = Object.keys(user).reduce((diff, key) => {
            if (oldUser[key] === user[key]) return diff;
            return {
                ...diff,
                [key]: user[key]
            }
        }, {})
        sendUser(JSON.stringify(newUser));
    }
   
    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setUser({
            ...user,
            [name]: value
        });
    }
    return(
        <Form action={userModify}>
            {auth.role > 1 && <Input type="number" name="role" value={user.role} onchange={handleChange}/>}
            <Input type="text" name="firstName" value={user.firstName} onchange={handleChange}/>
            <Input type="text" name="lastName" value={user.lastName} onchange={handleChange}/>
            <Input type="email" name="email" value={user.email} onchange={handleChange}/>
            <Input type="password" name="password" value={user.password} onchange={handleChange}/>
            <Button type="submit">Modifier</Button>
            {error && <p className="error">{error}</p>}
        </Form>
    )
}

export default FormUserModify;