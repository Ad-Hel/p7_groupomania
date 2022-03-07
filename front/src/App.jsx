import { createContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Auth, ProtectedRoute } from 'features/users';

import { Footer, Header, LogoAlt } from 'features/ui';
import { DeletedPictures, DeletedTexts, Home, NewPicture, Picture, Signin, Signup, Text, User, Users } from 'pages';


import './scss/global.scss';

const AuthContext = createContext(null);

function App(){
    const location = useLocation();
    return(
        <Auth>
            {(location.pathname !== "/signup" && location.pathname !== "/signin") ? <Header/> : <LogoAlt/>}
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route index element={<Home/>} />
                    <Route path="/user/:id" element={<User/>}/>
                    <Route path="/new" element={<NewPicture/>}/>
                    <Route path="/picture/:id" element={<Picture/>}/>
                    <Route path="/text" element={<Text/>}/>
                </Route>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route element={<ProtectedRoute role="2"/>}>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/deleted-pictures" element={<DeletedPictures/>}/>
                    <Route path="/deleted-texts" element={<DeletedTexts/>}/>
                </Route>
            </Routes>
            <Footer/>
        </Auth>
    )
}
export { AuthContext };
export default App