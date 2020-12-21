export default (permission) => {
    if (canAccess(permission)) {
        return true
    } else {
        return false
    }

    function canAccess(permission) {
        var permissionSet = JSON.parse(localStorage.getItem("userPermissions"));
        if(!permission) {
            return true;
        }
        if(!permissionSet[permission]) {
            return false
        } else {
            return true
        }
    }
};