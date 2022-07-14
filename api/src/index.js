const express = require('express');
const app = express();
const morgan=require('morgan');
const router = express.Router();
const axios = require('axios');

//Configuraciones
app.set('port', process.env.PORT || 6060);
app.set('json spaces', 2)
 
//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const cors      = require('cors');

app.use('/api/v1', router);


const whitelist = ['http://localhost:5500', 'http://localhost:3000', 'http://127.0.0.1:5500','http://127.0.0.1:5500/nodejs/backend-api-rest/index.html'];
const optionsCors = {
  origin: (origin, callback) => {
    if( whitelist.includes(origin) || !origin ) { // !origin para especifica el origen asi mismo
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

app.use(cors(optionsCors));


//Nuestro primer WS Get
const __API__ = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=10';

// middleware de nivel de aplicación
app.use((req, res, next) => {
  const cacheTime = 60*5; // 60 seconds * 5 minutes = 5 minutes
  
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${cacheTime}`)
  } else {
    // for the other requests set strict no caching parameters
    res.set('Cache-control', `no-store`)
  }

  next();
});

// title, url, imageUrl
app.get('/', async (req, res) => {
    try {
        const { data } = await axios.get(__API__);
        //return data;
        let response = data.map(({title, url, imageUrl}) => {
            return {title, url, imageUrl};
        });

        return res.json({data: response});

      } catch (error) {
        console.log(error);
      }
})
 
//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});