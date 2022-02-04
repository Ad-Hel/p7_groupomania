async function apiRequest(args){
    const head = new Headers({
        ...args.head,
        "Authorization": args.token
    });
    const init = {
        ...args.init,
        headers: head
    }
    try{
        const res = await fetch('http://localhost:3000/api/' + args.url, init);
        const status = res.status;
        const data = await res.json();
        return({data, status});
    } catch(error){
        return (error)
    }
}

export default apiRequest;