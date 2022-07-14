function fetchCountries(name) {
    const query = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages` //ссылка запроса
    //fetch сам запрос а в then - делаем парс запроса 
    return fetch(query).then(response => {
        if (!response.ok) {
            throw new Error("Статус ошибки = " + response.status)
        }
        return response.json();
    })
    
}
export default fetchCountries

