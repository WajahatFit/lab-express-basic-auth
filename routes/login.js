
const router = require("express").Router();
const User = require('../models/User.model');
const isLoggedIn = require('../middlewares/index')

router.get('/login', async (req, res, next) => {
    res.render('auth/login');
  })

  router.get('/login', async (req, res, next) => {
    res.render('auth/login');
  })

  router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    // Check if user introduced all values
    if (!email || !password) {
      res.render('auth/login', { error: 'All fields are mandatory. Please fill them before submitting.' })
      return;
    }
    try {
      // Check if user exists on our DB
      const user = await User.findOne({ email: email });
      // If they don't, send them error message
      if (!user) {
        res.render('auth/login', { error: 'Email is not registered. Try with another one.' })
        return;
      } else {
        // If they do, check if the password matches and then redirect OR send the error message
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (passwordMatch) {
          // I store the user on the session cookie to access it from anywhere in my app
          req.session.currentUser = user;
          res.render('index', user)
        } else {
          res.render('auth/login', { error: 'Unable to authenticate user.' })
          return;
        }
      }
    } catch (error) {
      next(error);
    }
  })



module.exports = router;