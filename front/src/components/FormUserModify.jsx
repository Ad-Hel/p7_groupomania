import { useState, useEffect } from "react";


function FormUserModify(props){
    const [user, setUser] = useState({});
    const auth = JSON.parse(window.localStorage.getItem('user'))
    const token = "Bearer " + auth.token;
    const id = props.id;
            
    useEffect( () => {
        if (id > 0){
        async function getUser(id){
            try{
                const headers = new Headers({
                    "Authorization": token
                })
                const init = {
                    headers: headers
                }
                const res = await fetch('http://localhost:3000/api/auth/' + id, init);
                const user = await res.json();
                setUser({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                });
            } catch(error){
                console.log(error)
            }
        }
        getUser(id);
    }}, [])
    
    async function sendUser(user){
        const initHead = new Headers({
            "Authorization": token,
            "Content-Type": "application/json"
        })
        const init = {
            method: 'PUT',
            headers: initHead,
            mode: 'cors',
            body: user
        }
        try{
            const res = await fetch('http://localhost:3000/api/auth/' + id, init);
            user = await res.json();
            console.log("sendUser : " + user);
        }
        catch(error){
            console.log(error);
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
        <form onSubmit={userModify}>
            <input onChange={handleChange} type="text" name="firstName" className="input input--text" value={user.firstName}/>
            <input onChange={handleChange} type="text" name="lastName" className="input input--text" value={user.lastName}/>
            <input onChange={handleChange} type="email" name="email" className="input input--email" value={user.email}/>
            <input onChange={handleChange} type="password" name="password" className="input input--password" value={user.password}/>
            <button type="submit">Modifier</button>
        </form>
    )
}

export default FormUserModify;