const router = require('express').Router();
const passport = require('passport');
require('../config/googleAuthConfig');

// google auth router
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))

router.get('/google/callback',passport.authenticate('google',{ session: false }), (req,res)=>{
    res.redirect(`https://radio-widget-bd.netlify.app/google-oauth/${req?.user}`); 
})

module.exports = router;