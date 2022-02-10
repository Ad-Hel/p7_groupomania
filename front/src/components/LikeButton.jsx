import { useState } from "react";
import apiRequest from "../js/apiRequest";

function LikeButton(props){
    const auth = props.auth;
    const picture = props.picture;
    const [isLiked, setIsLiked] = useState(picture.Likes.find(x => (x.UserId === auth.id)) ? true : false);
    const [likesCount, setLikeCount] = useState(picture.Likes.length);

    async function getCount(){
        const args = {
            url: 'like/count/' + picture.id
        }
        const res = await apiRequest(args);
        setLikeCount(res.data);
    }

    async function sendLike(){
        const args = {
            url: 'like/' + picture.id,
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
            url: 'like/' + picture.id,
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