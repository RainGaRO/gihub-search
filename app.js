const mainEl = document.querySelector('.main');

const formEl = document.createElement('form');
const inputEl = document.createElement('input');
const searchButtonEl = document.createElement('button');
const wrapper = document.createElement('div');

mainEl.appendChild(formEl);
formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);

//форма
formEl.classList.add('search');
formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValues = Object.fromEntries(new FormData(e.target));
    const response= await fetch(`https://api.github.com/users/${inputValues.name}`);
    
    if(response.ok) {
        const data = await response.json();
        wrapper.appendChild(createProfileEl(data));
        mainEl.appendChild(wrapper);
        inputEl.value = '';
    } else {
        alert('Нет данных');
    }
})

//input
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name');
inputEl.setAttribute('placeholder', 'Введите имя профиля');

//кнопка
searchButtonEl.classList.add('search-button');
searchButtonEl.setAttribute('type', 'submit');
searchButtonEl.innerHTML = 'Поиск';

//карточка
function createProfileEl(profileData) {
    const element = document.createElement('div');
    element.classList.add('profile');
    element.innerHTML = `
        <img class="search-img" src=${profileData.avatar_url}></img>
        <p class="search-text"><span> Имя: </span> ${profileData.name} </p>
        <p class="search-text"><span> Город: </span> ${profileData.location} </p>
        <p class="search-text search-text__last"><span> Инфо: </span> ${profileData.bio} </p>
        <p class="search-text search-text__last"><span> Зарегистрирован: </span> ${profileData.created_at} </p>
    `
    element.appendChild(createDeleteBtnEl());
    return element;
}

function createDeleteBtnEl() {
    const element = document.createElement('button');
    element.classList.add('delete-button');
    element.innerText = 'Удалить';
    element.addEventListener('click', (e) => {
        wrapper.innerHTML = '';
    })

    return element;
}