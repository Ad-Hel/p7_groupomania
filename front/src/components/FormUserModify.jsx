import { useState, useEffect } from "react";
import apiRequest from '../js/apiRequest';
import Form from "./Form";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";


function FormUserModify(props){
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const auth = JSON.parse(window.localStorage.getItem('auth'));
    const id = props.id;
            
    useEffect( () => {
        if (id > 0){
        async function getUser(id){
            const args = {
                token: auth.token,
                url: 'auth/' + id
            }
            const res = await apiRequest(args);
            console.log(res)
            setUser({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email
            })
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
       } 
    }

    function userModify(form){
        form.preventDefault();
        console.log("userModify : " + JSON.stringify(user));
        const userArray = Object.entries(user);
        const filteredUserArray = userArray.filter( ([key, value]) => value !== '');
        const newUser = Object.fromEntries(filteredUserArray);
        console.log(newUser);
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
            <Input type="text" name="firstName" value={user.firstName} onchange={handleChange}/>
            <Input type="text" name="lastName" value={user.lastName} onchange={handleChange}/>
            <Input type="email" name="email" value={user.email} onchange={handleChange}/>
            <Input type="password" name="password" value={user.password} onchange={handleChange}/>
            <ButtonSubmit label="Modifier"/>
        </Form>
    )
}

export default FormUserModify;