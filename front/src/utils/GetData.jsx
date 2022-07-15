export const getData = async () => {
    const url = `http://localhost:6060`;
    const resp = await fetch( url );
    const { data } = await resp.json();
    let page = 1;
    let rows = 0;
    const articles = data.map(({ title, url, imageUrl }) => {
        rows++;
        const obj = {
            page,
            title,
            url,
            imageUrl
        };
        
        if( rows === 10 ) {
            page++;
            rows = 0;
        }

        return obj;
    });
    return articles;
}