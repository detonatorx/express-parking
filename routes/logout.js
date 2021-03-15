const router = require('express').Router();

router.route('/')
    .get(async(req, res) => {
        await req.session.destroy();
        res.clearCookie("user_sid");
        res.render('main', {goodbye: 'До скорых встреч!'});
    })
    
module.exports = router;
