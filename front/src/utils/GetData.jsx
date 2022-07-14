export const getData = async ( category ) => {
    const url = `https://api.giphy.com/v1/gifs/search?q=${category}&limit=10&api_key=xJw4xi7Ze2WIz1WMAEkpY9Ppnc7NUkKF`;
    const resp = await fetch( url );
    const { data } = await resp.json();
    let data_list = [];
    let cont = 1;
    let contPage = 1;
    const articles = data.map( img => {
        if( cont === 10 ) {
            contPage++;
        }
        const obj = {
            id: img.id,
            title: img.title,
            url: img.images?.downsized_medium.url
        }
        const newObj = {'page': contPage, 'article': obj}
        data_list.push({newObj});
        cont++;
        return obj;
    });
    return articles;
}