import { useEffect, useState } from "react";
import apiRequest from "../js/apiRequest";

function LikeButton(props){
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const [likesCount, setLikeCount] = useState(props.likesCount);
    const auth = props.auth;
    const pictureId = props.picture;

    async function getCount(){
        const args = {
            url: 'like/count/' + pictureId
        }
        const res = await apiRequest(args);
        setLikeCount(res.data);
    }

    async function sendLike(){
        const args = {
            url: 'like/' + pictureId,
            token: auth.token,
            init: {
                method: 'POST'
            }
        }
        const res = await apiRequest(args)
        console.log(res.status)
        if (res.status === 200){
            setIsLiked(!isLiked);
            getCount();
        }        
    }

    async function sendDislike(){
        const args = {
            url: 'like/' + pictureId,
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
    
    return isLiked ? (
        <button onClick={sendDislike}>{likesCount} 👍</button>
    ) : (
        <button onClick={sendLike}>{likesCount} 👍</button>
    )
}

export default LikeButton