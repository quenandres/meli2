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
 
app.use('/api/v1', router);

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