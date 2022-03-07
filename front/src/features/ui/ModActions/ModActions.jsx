import { useAuth } from "features/users";
import apiRequest from "apiRequest";

import { Button } from "features/ui"
import { useEffect, useState } from "react";

function ModActions(props){
    const { auth } = useAuth();
    const [ isDeleted, setIsDeleted ] = useState(false);
    const path = props.path;
    const list = props.list;
    const setList = props.setList;

    useEffect(() => {
        /**
         * The state "is deleted" is initialize by a props.
         */
        if (props.deletedAt){
            setIsDeleted(true);
        } else {
            setIsDeleted(false);
        }
    }, [props.deletedAt, setIsDeleted])
    
    /**
     * 
     * This function make an api call to the specified end point to soft delete a ressource.
     * The end point targeted is determined by the constante 'path' and the 'id' parameter.
     * 
     * @name handleDelete
     * @function
     * @param {integer} id 
     */
    async function handleDelete(id){
        const args = {
            token: auth.token,
            url: path + '/' + id,
            init: {
                method: 'DELETE'
            }
        };
        const res = await apiRequest(args);
        if (res.status === 200 ){
            if (props.isMod){
                const date = new Date().toISOString();
                const newList = list.map( (item) => {
                    if (item.id === id) {
                        const newItem = {
                            ...item,
                            deletedAt: date
                        };
    
                        return newItem;
                    }
                    return item;
                } );
                setList(newList);
            } else {
                setList(list.filter( item => item.id !== id));
            }
           
        }
    }
    
    /**
     * 
     * This function makes an API call to restore a soft deleted ressource. 
     * The end point targeted is determined by the constant 'path' and the 'id'.
     * 
     * @name handleRestore
     * @function
     * @param {integer} id 
     */
    async function handleRestore(id){
        const args = {
            token: auth.token,
            url: path + '/restore/' + id,
            init: {
                method: 'PUT'
            }
        };
        const res = await apiRequest(args);
        if (res.status === 200){
            const newList = list.map( (item) => {
                if (item.id === id) {
                    const newItem = {
                        ...item,
                        deletedAt: null
                    };

                    return newItem;
                }
                return item;
            } );
            setList(newList);
        };
    }

    /**
     * 
     * This function makes an API call to hard delete a ressource.
     * The endpoint is determined by the 'path' and 'id'.
     * 
     * @name handleHardDelete
     * @function
     * @param {integer} id 
     */
    async function handleHardDelete(id){
        const args = {
            token: auth.token,
            url: path + '/destroy/' + id,
            init: {
                method: 'DELETE'
            }
        };
        const res = await apiRequest(args);
        if (res.status === 200){
            setList(list.filter( item => item.id !== id));
        };
    }

    return !isDeleted ? (
             props.isMod ? <Button type="button" onclick={() => handleDelete(props.id)} classStyle="icon"><span><svg fill='currentColor' height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362 149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1 362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448 256V256z"/></svg></span></Button> : <Button type='button' onclick={() => handleDelete(props.id)} classStyle='icon button--delete'><span><svg fill='currentColor' height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg></span></Button>
        ) : (
        <>
            <Button type="button" onclick={() => handleHardDelete(props.id)} classStyle="icon button--delete"><span><svg fill='currentColor' height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg></span></Button> 
            <Button type="button" onclick={() => handleRestore(props.id)} classStyle="icon"><span><svg fill='currentColor' height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.84 0-95.17-15.58-134.2-44.86c-14.12-10.59-16.97-30.66-6.375-44.81c10.59-14.12 30.62-16.94 44.81-6.375c27.84 20.91 61 31.94 95.88 31.94C344.3 415.8 416 344.1 416 256s-71.69-159.8-159.8-159.8c-37.46 0-73.09 13.49-101.3 36.64l45.12 45.14c17.01 17.02 4.955 46.1-19.1 46.1H35.17C24.58 224.1 16 215.5 16 204.9V59.04c0-24.04 29.07-36.08 46.07-19.07l47.6 47.63C149.9 52.71 201.5 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z"/></svg></span></Button>
        </>  )

}

export default ModActions;