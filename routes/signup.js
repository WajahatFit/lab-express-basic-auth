const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.get('/signup', async (req, res, next)=> {
    res.render('signup')
});

router.post('/signup', async (req, res, next)=>{
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
        res.render('signup', { error: 'All fields are mandatory. Please fill them before submitting.' })
        return;
      }
      const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.render('/signup', { error: 'Password must have lowercase letters, uppercase letters and at least one number.' })
    return;
  }
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({username, hashedPassword});
        res.redirect('/auth/login'); 
    } catch (error) {
        next(error)
    }
})




module.exports = router;