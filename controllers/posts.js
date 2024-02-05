let express = require('express');
let router = express.Router();

// Post model for CRUD
let Post = require('../models/post');

/* GET: /posts => show main blog page */
router.get('/', async (req, res) => {
    // use model to fetch all Post data from MongoDB
    let posts = await Post.find();
    console.log(posts[0]);

    // load view and pass all the json data to it for display
    res.render('posts/index', {
        title: 'Our Lastest Random Thoughts',
        posts: posts
    });
});
router.get('/:_id', async (req, res) => {
    let post = await Post.findById(req.params._id);
    res.render('posts/details', {
        post: post
    });
});
// make public
module.exports = router;