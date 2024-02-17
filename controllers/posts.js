let express = require('express');
let router = express.Router();

// Post model for CRUD
let Post = require('../models/post');

/* GET: /posts => show main blog page */
router.get('/', async (req, res) => {
    // use model to fetch all Post data from MongoDB
    let posts = await Post.find().sort({ 'date': -1 });
    // console.log(posts[0]);

    // load view and pass all the json data to it for display
    res.render('posts/index', {
        title: 'Our Lastest Random Thoughts',
        posts: posts
    });
});

/* GET: /posts/details/abc123 => display selected post */
router.get('/details/:_id', async (req, res) => {
    //console.log(req.params._id);
    let post = await Post.findById(req.params._id);

    //console.log(post);
    res.render('posts/details', {
        title: 'Blog Post',
        post: post
    });
});

/* GET: /posts/create => display new post form */
router.get('/create', (req, res) => {
    res.render('posts/create', {
        title: 'Create New Post'
    });
});

/* POST: /posts/create => process form submission to save new blog post */
router.post('/create', async (req, res) => {
    // use mongoose model to save new post to db
    await Post.create(req.body);

    // reload the posts/index view to see the updated blog list
    res.redirect('/posts');
});

/* GET: /posts/delete/abc123 => remove selected doc & redirect */
router.get('/delete/:_id', async (req, res) => {
    // delete selected doc based on _id in url param
    await Post.findByIdAndDelete(req.params._id);

    // redirect
    res.redirect('/posts');
});

/* GET: /posts/edit/abc123 => display selected doc in form */
router.get('/edit/:_id', async (req, res) => {
    // get selected doc from db
    let post = await Post.findById(req.params._id);

    // load view & pass data
    res.render('posts/edit', {
        title: 'Edit Post',
        post: post
    });
});

/* POST: /posts/edit/abc123 => updated doc from form submission */
router.post('/edit/:_id', async (req, res) => {
    // update doc
    await Post.findByIdAndUpdate(req.params._id, req.body);

    // redirect
    res.redirect('/posts');
});

// make public
module.exports = router;