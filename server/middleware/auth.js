module.exports = {
    // ensureAuth is  to verify if the user is already authenticated and should have or not access to the route.
    ensureAuth(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },
    ensureGuest(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/dashboard');
    },
};
