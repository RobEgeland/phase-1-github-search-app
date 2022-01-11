let form = document.querySelector('form')
let userList = document.querySelector('#user-list')
let repoList = document.querySelector('#repos-list')
let card = document.createElement('div');
form.addEventListener('submit', handleEvent)

function handleEvent(e) {
    //e.preventDefault()
    //console.log(e.target.search.value)
    handleSearch(e)
}

function handleSearch(e) {
    fetch(`https://api.github.com/search/users?q=${e.target.search.value}`)
    .then(res => res.json())
    .then(data => createDisplay(data))
}

function createDisplay(data) {
    card.className = 'user'
    card.innerHTML = `
        <h2>${data.items[0].login}</h2>
        <img src=${data.items[0].avatar_url}/>
        <p>User Profile:</p>
        <li>${data.items[0].url}</li>
        <hr></hr>
    `
    userList.appendChild(card);
}

card.addEventListener('click', getRepo);

function getRepo(e) {
    console.log(e.target.textContent)
    e.target.style.color = 'purple'
    fetch(`https://api.github.com/users/${e.target.textContent}/repos`)
    .then(res => res.json())
    .then(data => data.forEach(data => displayRepo(data)))
    .catch(data => console.alert('invalid user', data))
}

function displayRepo(data) {
    let list = document.createElement('li')
    let div = document.createElement('div')
    let hr = document.createElement('hr')
    list.textContent = data.archive_url
    repoList.appendChild(div)
    repoList.appendChild(list);
    repoList.appendChild(hr);
}
