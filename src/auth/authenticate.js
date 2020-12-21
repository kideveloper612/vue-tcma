export default (to, from, next) => {
    if (localStorage.getItem("userInfo") != null && localStorage.getItem("userInfo").length > 0 && localStorage.getItem("token") != null && !expired(localStorage.getItem("token"))) {
        next();
    } else {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        next({name: 'sessions.signin'});
    }

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

    function expired(token) {
        var exp = parseJwt(token).exp * 1000;
        if (Date.now() >= exp) {
            return true;
        }
    }
};