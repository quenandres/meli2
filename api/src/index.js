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