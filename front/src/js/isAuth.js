function isAuth(){
    const auth = window.localStorage.getItem('auth');
    if (auth){
      return true;
    } else {
      return false;
    }
}

export default isAuth