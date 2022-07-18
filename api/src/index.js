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
const DEL_ASYNC = promisify(client.del).bind(client);

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
const cors = require('cors');



const whitelist = ['http://localhost:3000'];
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

const __API__ = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=100';

/**
 * Metodo para obtener el listado y filtrarlo por los 3 campos requeridos
 */
app.get('/', async (req, res) => {
    try {
      const reply = await GET_ASYNC('articles');
      if(reply) {
        //console.log('Trae datos del REDIS');
        return res.json(JSON.parse(reply));
      }
      
      const { data } = await axios.get(__API__);
      
      let response = data.map(({title, url, imageUrl}) => {
        return {title, url, imageUrl};
      });
      //console.log('Trae datos del api');      
      await SET_ASYNC('articles', JSON.stringify({ data: response }));
      
      // Genero metodo para que elimine datos cada 5min
      setInterval(async () => {
        const exist = await GET_ASYNC('articles');
        if( exist ) {
          //console.log('-----------------Elimina datos de REDIS a los 5min');
          await DEL_ASYNC('articles');
        }
      }, 10000);

      return res.status(200).json({data: response});
    } catch (error) {
      console.log(error);
    }
});

/* app.get('*', function(req, res){
  res.status(404).json({message: 'Not found'});
}); */

app.use(function(req, res){
  res.send(404);
});

//Iniciando el servidor
const server = app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});


module.exports = server;
