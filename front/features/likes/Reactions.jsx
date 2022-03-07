import { useState } from "react";
import apiRequest from "../../js/apiRequest";
import LikeButton from "../../src/components/LikeButton";
import '../scss/component/reactions.scss';

function Reactions(props){
    const auth = props.auth;
    const target = props.target;
    const path = props.path;
    const [isLiked, setIsLiked] = useState(target.Likes.find(x => (x.UserId === auth.id)) ? true : false);
    const [likesCount, setLikeCount] = useState(target.Likes.length);
    const [countState, setCountState] = useState('initial');

    /**
     * 
     * This function make an API call to recover the number of like associated to the targeted ressource.
     * 
     * 
     * @name getCount
     * @function
     */
    async function getCount(){
        const args = {
            token: auth.token,
            url: 'like/' + path + '/count/' + target.id
        }
        const res = await apiRequest(args);
        if (res.status === 200){
            setCounter(res.data);
        }
    }
    
    /**
     * 
     * This function set counter and count state to animate it.
     * 
     * @name setCounter
     * @function
     * @param {integer} count 
     */
    function setCounter(count){
        setTimeout(() => setCountState('up'), 0);
        setTimeout(() => setLikeCount(count), 100);
        setTimeout(() => setCountState('down'), 100);
        setTimeout(() => setCountState('initial'), 200);
    };

    /**
     * 
     * This function make an API call to create a new like ressource associated to the target.
     * The end point is determined by the constant 'path' and the 'target.id'.
     * 
     * @name sendLike
     * @function
     */
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

    /**
     * 
     * This function delete permanently a like ressource associated to the target id. 
     * The end point is determined by the contant 'path' and 'target.id'.
     * 
     * @name sendDislike
     * @function
     */
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