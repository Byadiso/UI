// eslint-disable-next-line prettier/prettier

//import dependencie

import express from 'express';
import router from './routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';




//set up dependencies

const app = express()

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use(router);

// set header

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.static(__dirname));


// for outputting error details 

app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
  })

// set static pages

app.use(express.static('public/pages'))
// app.set('view engine', 'html');

// set up route

app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/public/index.html')
        .status(200)
        .json({
            status: 200,
            message: 'Welcome to PropertyPro-Lite you can sale or rent your needs!',
        })
})



app.use('*', (req, res) => {
    res.status(400).json({
        status: 400,
        message: "Sorry this router doesn't exist !",
    })
})



//-----------------For Front-End---------------------//

//for render index

app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('/index.html');
})

// for render sign-up



// for render login
  app.get('/api/v1/login', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('/login.html');
})
//for index page
app.get('/index', (_req, res) => {
    res.sendFile(__dirname + '/public/index.html')
        .status(200)
        .json({
            status: 200,
            message: 'Welcome to PropertyPro-Lite you can sale or rent your needs!',
        })
})

// app.get('/login',(req,res) =>{
//     res.redirect(__dirname + '/public/pages/index.html')
//         .status(200)
//         .json({
//             status:200, 
//             message: 'welcome beautiful user'})
// })

const port = process.env.PORT || 3000

app.listen(port, () =>
    console.log('Welcome to MY Property Pro Lite Land Server!!....')
)

export default app