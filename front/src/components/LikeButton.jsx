import { useEffect, useState } from "react";

function LikeButton(props){
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikeCount] = useState();
    const auth = props.auth;
    const pictureId = props.picture;
    useEffect( ()=>{
        async function getIsLiked(){
            const headers = new Headers({
                "Authorization": auth.token
            })
            const init = {
                headers: headers
            }
            const res = await fetch('http://localhost:3000/api/like/isLiked/' + pictureId, init);
            const like = await res.json();
            setIsLiked(like);
        }
        getIsLiked()
        getCount()
    }, [pictureId, auth])
    async function getCount(){
        const res = await fetch('http://localhost:3000/api/like/count/' + pictureId);
        const count = await res.json();
        setLikeCount(count);
    }
    async function sendLike(){
        const headers = new Headers({
            "Authorization": auth.token
        })
        const init = {
            method: 'POST',
            headers: headers
        }
        await fetch('http://localhost:3000/api/like/' + pictureId, init);
        setIsLiked(!isLiked);
        getCount();
    }
    async function sendDislike(){
        const headers = new Headers({
            "Authorization": auth.token
        })
        const init = {
            method: 'DELETE',
            headers: headers
        }
        await fetch('http://localhost:3000/api/like/' + pictureId, init);
        setIsLiked(!isLiked);
        getCount()
    }
    return isLiked ? (
        <button onClick={sendDislike}>{likesCount} 👍</button>
    ) : (
        <button onClick={sendLike}>{likesCount} 👍</button>
    )
}

export default LikeButton