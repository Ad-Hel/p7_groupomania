import { createContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Auth  from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './layout/Header';
import Footer from './layout/Footer';

import Home from './page/Home';
import Signup from './page/Signup';
import Signin from './page/Signin';
import NewPicture from './page/NewPicture';
import User from './page/User';
import Picture from './page/Picture';
import Users from './page/Users';
import DeletedPictures from './page/DeletedPictures';
import Text from './page/Text';
import DeletedTexts from './page/DeletedTexts';

import LogoAlt from './components/LogoAlt';

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