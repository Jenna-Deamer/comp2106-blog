let express = require('express');
let router = express.Router();
let axios = require('axios');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index',
    {
      title: 'COM2106 Blog',
      message: 'This is the home page'
    });
});

/*GET about page*/
//next is optional. can be left out
router.get('/about', (req, res) => {
  res.render('about',
    {
      title: 'COM2106 About'
    });
});
/*GET register  page*/
router.get('/register', (req, res) => {
  res.render('register',
    {
      title: 'COM2106 register'
    });
});
/*GET login page*/
router.get('/login', (req, res) => {
  res.render('login',
    {
      title: 'COM2106 login'
    });
});

/*GET /fake-blog => load dummy API data */
router.get('/fake-blog', async (req, res) => {
  let apiData = await axios.get('https://jsonplaceholder.typicode.com/posts');
  res.render('fake-blog', {
    title: 'Fake Blog API Data',
    apiData: JSON.stringify(apiData.data)
  });
});

module.exports = router;
