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
    const response = await apiRequest(args);
    if (response.status === 201){
        const auth = response.data;
        const localAuth = {
            id: auth.userId,
            role: auth.userRole,
            token: "Bearer "+ auth.token
        }
        window.localStorage.setItem('auth', JSON.stringify(localAuth));
        /**
         * Test to store the token in a web worker
         */
        // if (!!window.SharedWorker) {
        //     const authWorker = new SharedWorker('../authWorker.js');
        //     authWorker.port.postMessage({userRole: auth.userRole, userId: auth.userId, token: auth.token});
        // }
        window.location.replace('http://localhost:3001/')
    }
}

export default signIn;