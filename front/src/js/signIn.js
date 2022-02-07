import apiRequest from './apiRequest';
async function signIn(user){
    const args = {
        head: {
            "Content-Type": "application/json"
        },
        init: {
            method: 'POST',
            body: user
        },
        url: "auth/signin"
    }
    const res = await apiRequest(args);
    if (res.status === 201){
        const auth = res.data;
        const localAuth = {
            ...auth,
            token: "Bearer "+ auth.token
        }
        return localAuth;
        /**
         * Test to store the token in a web worker
         */
        // if (!!window.SharedWorker) {
        //     const authWorker = new SharedWorker('../authWorker.js');
        //     authWorker.port.postMessage({userRole: auth.userRole, userId: auth.userId, token: auth.token});
        // }
        // window.location.replace('http://localhost:3000/')
    } else {
        return res;
    };
}

export default signIn;