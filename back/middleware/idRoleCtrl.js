

const idRoleCtrl = (userId, userRole, targetId, targetRole) => {
    console.log(userRole);
        console.log(targetRole);
    if (userId == targetId || userRole > targetRole){
        
        return true;
    } else {
        return false;
    }
}

module.exports = idRoleCtrl;