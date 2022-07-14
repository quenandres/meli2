export const getData = async () => {
    const url = `http://localhost:6060`;
    const resp = await fetch( url );
    const { data } = await resp.json();
    const articles = data.map(({ title, url, imageUrl }) => {
        return {
            title,
            url,
            imageUrl
        };
    });
    return articles;
}