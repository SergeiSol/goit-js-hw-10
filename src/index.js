// импорт файлов библиотек стилей
import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// обьявляем переменние
const makeList = document.querySelector(".country-list")
const markupSingle = document.querySelector("#search-box")
const makeInfo = document.querySelector(".country-info")

// добавляем слушателя на инпут
markupSingle.addEventListener('input', debounce(onInputCheck, 300))

// функция вызиваеться при событии инпут
function onInputCheck(input) {
    
    const nameCountry = input.target.value.trim(); //=>  то что ввел пользователь в форму и обрезаем пробелы
// очищаем разметку
    makeList.innerHTML = "";
    makeInfo.innerHTML = "";
    // проверка если пользователь ввел какое то значение то делаем запрос по этому значению 
    if (nameCountry) {
        // 25 строка сам запрос 26 строка обработка запроса
        fetchCountries(nameCountry)  
            .then(handleData).catch(err => {
                console.log(err)
                Notify.failure("Oops, there is no country with that name")
            })
    }

}
//  обработка запроса если он вернулся без ошибок
// дата это масив обьектов
function handleData(data) {
    if (data.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
        
        return
    }
    if (data.length > 1) {
        createList(data) // если длинна масива больше 1 но меньше 10 то составляем список стран 
    } else {
        createInfo(data)// если длинна масива ровна одному - выводим информацию о стране
    }
        
}
// создает шаблонную строку для списка стран и помещаем её в нашу разметку строка 55
function createList(data) {
    const list = data.map(({name, flags}) => `<li class="country">
                <img alt = "${name.common} flag" src = "${flags.svg}" width="50"> 
                <span>${name.common}</span>
            </li>`)
    
    makeList.innerHTML = list.join("")
}
// создаем шаблонную строку для информации о стране 
function createInfo(data) {
    const { flags, name, capital, population, languages } = data[0]; //создаем переменные при помощи деструктуризации
    const langs = Object.values(languages).join(", "); //забираем все значения из обьекта languages
    const info = `<img src = '${flags.svg}' width = "100"><p>${name.official}</p>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${langs}`
    makeInfo.innerHTML = info; // вставляем в разметку
}














// const DEBOUNCE_DELAY = 300;
