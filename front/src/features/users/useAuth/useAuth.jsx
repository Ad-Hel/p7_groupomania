import { useContext } from 'react';

import { AuthContext } from 'App';

function useAuth(){
    return useContext(AuthContext);
}

export default useAuth;