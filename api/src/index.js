const express = require('express');
const app = express();
const morgan=require('morgan');
const responseTime = require("response-time");
const redis = require("redis");
const { promisify } = require("util");
const axios = require('axios');

const client = redis.createClient({  
  host: '127.0.0.1',
  port: 6379,
  legacyMode: true
});

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

client.connect();
client.on('error', (err) => console.log('Redis Client Error', err));

//Configuraciones
app.set('port', process.env.PORT || 6060);
app.set('json spaces', 2)
// Añade middleware para ver las cabeceras de tiempo en las solicitudes
app.use(responseTime());
 
//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const cors      = require('cors');



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

const __API__ = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=5';

// middleware de nivel de aplicación
app.use((req, res, next) => {
  const cacheTime = 60*5; // 60 seconds * 5 minutes = 5 minutes  
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${cacheTime}`)
  } else {
    res.set('Cache-control', `no-store`)
  }
  next();
});

/**
 * Metodo para obtener el listado y filtrarlo por los 3 campos requeridos
 */
app.get('/', async (req, res) => {
    try {
      const reply = await GET_ASYNC('articles');
      if(reply) {
          return res.json(JSON.parse(reply));
      }
      
      const { data } = await axios.get(__API__);
      
      let response = data.map(({title, url, imageUrl}) => {
        return {title, url, imageUrl};
      });
      
      await SET_ASYNC('articles', JSON.stringify({ data: response }));
      return res.json({data: response});
    } catch (error) {
      console.log(error);
    }
})
 
//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});