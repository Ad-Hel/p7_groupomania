

const idRoleCtrl = (userId, userRole, targetId, targetRole) => {
    if (userId == targetId || userRole > targetRole){
        return true;
    } else {
        return false;
    }
}

module.exports = idRoleCtrl;