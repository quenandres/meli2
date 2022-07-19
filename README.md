![Logo](https://http2.mlstatic.com/D_NQ_NP974268-MLA41149104135_032020-F.jpg)

# Digital Accounts IT CHALLENGE
Prueba realizada con nodejs y reactjs, ambos proyectos realizados con javascript.
La idea original era dockerizar las 3 app en contenedores aparte, unicamente use redis en docker, el resto de la instalación se realizo localmente.
```bash
node -v
```
>
```
v14.17.0
```

```bash
npm -v
```
>
```
6.14.13
```

## Ejecución
- Instalación paquetes npm
    ```
    cd api/    
    npm install
    ```
    >
    ```
    cd front/    
    npm install
    ```
    >
    Instalación redis via docker
    
    ```
    docker run -p 6379:6379 --name some-redis -d redis 
    ```
- Ejecución de los proyectos
    - api
    ```
    npm run dev
    ```
    El proyecto se activara en el puerto 6060. http://localhost:6060
    >
    - front
    ```
    npm run start
    ```
    El proyecto se activara en el puerto 3000. http://localhost:3000
    >
    - redis

    Comprobar que el contenedor se este ejecutando exitosamente.

## Testing
- Nodejs:
    - Jest
    - Supertest
- Reactjs
    - testing-library/react

Para ejecutar en ambos proyectos
```
npm run test
```

    


## API

#### Get 
```http
  GET /
```
Nos devuelte un array de objetos con los campos de longitud de 100.
```
[{title, url, imageUrl}]
```

