import { useEffect, useState, cloneElement } from "react";

import { useAuth } from "features/users";
import apiRequest from "apiRequest";

import { Pagination } from "features/ui";

function Archive(props) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const { auth } = useAuth();

  const path = props.path;

    

  useEffect(() => {
    /**
     * 
     * This function make an API call to get the items specified by the path props. 
     * 
     * @name getItems
     * @function
     * @param {integer} pageNumber 
     */
    async function getItems(pageNumber){
        const args = {
            token: auth.token,
            url: path + pageNumber,
        }
        const res = await apiRequest(args);
        if (res.status === 200){
            if (!props.list && props.setList){
                props.setList(res.data.rows)
            } else {
                setItems(res.data.rows);
            }
            setCount(res.data.count);
        }
    }
    getItems(page);
    if (props.list){
        setItems(props.list)
    }
  }, [page, path, auth.token, props])

  return (
        <>
            {items.map((item)=>(
                    cloneElement(props.children, {setItems: setItems, items: items, item: item, key: item.id}, null)
                ))}
            <Pagination page={page} setPage={setPage} count={count}/>
        </>
  );
}

export default Archive;
