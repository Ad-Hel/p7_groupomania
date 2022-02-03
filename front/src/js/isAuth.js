function isAuth(){
    const auth = window.localStorage.getItem('user');
    if (auth){
      return true;
    } else {
      return false;
    }
}

export default isAuth