const User = require('./../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register.ejs');
}

module.exports.registerNewUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.flash('success', 'Welcome to yelp camp');
        res.redirect('/campgrounds');
    } catch(err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login.ejs');
}

module.exports.authorizeUserLogin = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.userLogout = (req, res) => {
    req.logout();
    req.flash('success', 'You have been logged out');
    res.redirect('/campgrounds');
}