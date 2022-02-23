import { useState } from "react";
import apiRequest from "../js/apiRequest";
import LikeButton from "./LikeButton";
import '../scss/component/reactions.scss';

function Reactions(props){
    const auth = props.auth;
    const target = props.target;
    const path = props.path;
    const [isLiked, setIsLiked] = useState(target.Likes.find(x => (x.UserId === auth.id)) ? true : false);
    const [likesCount, setLikeCount] = useState(target.Likes.length);
    const [countState, setCountState] = useState('initial');

    async function getCount(){
        const args = {
            token: auth.token,
            url: 'like/' + path + '/count/' + target.id
        }
        const res = await apiRequest(args);
        if (res.status === 200){
            setTimeout(() => setCountState('up'), 0);
            setTimeout(() => setLikeCount(res.data), 100);
            setTimeout(() => setCountState('down'), 100);
            setTimeout(() => setCountState('initial'), 200);
        }
    }

    async function sendLike(){
        const args = {
            url: 'like/' + path + '/' + target.id,
            token: auth.token,
            init: {
                method: 'POST'
            }
        }
        const res = await apiRequest(args)
        if (res.status === 200){
            setIsLiked(!isLiked);
            getCount();
        }        
    }

    async function sendDislike(){
        const args = {
            url: 'like/' + path + '/' + target.id,
            token: auth.token,
            init: {
                method: 'DELETE'
            }
        }
        const res = await apiRequest(args);
        if (res.status === 200){
            setIsLiked(!isLiked);
            getCount()
        }        
    }
    
    return (
        <div className="reactions">
            <p className={`reactions__counter reactions__counter--${countState}`}>{likesCount}</p>
            <LikeButton isLiked={isLiked} handleLike={isLiked ? sendDislike : sendLike} />
        </div>
    )
}

export default Reactions