


getUsers()
getSongs ()

//////////  ELEMENT DECLARATIONS ///////////////////////
usersContainer = document.querySelector('div#users')
const newSongButton = document.querySelector('button#new-song-button')
const body = document.querySelector('body')
const songsContainer = document.querySelector('div#songs-container')
const newSongForm = document.querySelector('#new-song-form')
const activeSong = document.querySelector('div#active-song')
const actSongTitle = document.querySelector('h1#song-title')
const actSongImg = activeSong.querySelector('img')
const userInfo = document.querySelector('h1#user-info')

///////////////// FETCH REQUESTS ////////////////

function deleteSong(song) {
    fetch(`http://localhost:3000/songs/${song.id}`, {
        method: 'DELETE'
    })
}


function getUsers () {
fetch(`http://localhost:3000/users`)
.then(response => response.json())
.then(users => users.forEach(user => renderUser(user)))
}

function getSongs () {
    fetch('http://localhost:3000/songs')
    .then(res => res.json())
    .then(songs => songs.forEach( song => renderSong(song)))
}

function getSong (songId) {
    fetch(`http://localhost:3000/songs/${songId}`)
    .then(res => res.json())
    .then(song => activateSong(song))
}

function postSong(songData) {
    fetch('http://localhost:3000/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': "application/json"
        },
        body: JSON.stringify(songData)
      })
      .then(res => res.json())
      .then((songObj) => {
        renderSong(songObj)
      })
  }

/////////////// EVENT LISTENERS /////////////////////
window.addEventListener('DOMContentLoaded', function (e) {
    promptUser ()
})

newSongButton.addEventListener('click', function(e) {
    getNewSongForm ()
})

songsContainer.addEventListener('click', function(e) {
    if (e.target.matches('div.song-div')) {
        getSong(e.target.dataset.id)
    }
})



//////////////// HELPER METHODS //////////////////

function promptUser () {
    userName = window.prompt('Please enter your username')
    setUser(userName)
    console.log(userName)
}

function setUser (name) {
userInfo.innerHTML = `${name}'s page`

}

function activateSong (songObj) {
console.log(songObj)
actSongTitle.innerHTML = songObj.name
actSongImg.setAttribute('src', songObj.image)
actSongImg.setAttribute('alt', songObj.name)

}

function renderUser(user){
    const newUser = document.createElement('li')
    newUser.innerHTML = user.name
    usersContainer.append(newUser)

}

function renderSong(song) {
    const newSong = document.createElement('div')
    newSong.innerHTML = song.name
    newSong.setAttribute('class', 'song-div')
    newSong.dataset.id = song.id

    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = "delete song"
    newSong.append(deleteBtn)
    songsContainer.append(newSong)

    deleteBtn.addEventListener("click", () => {
        newSong.remove()
        deleteSong(song)
    })

}

function getNewSongForm(){
    const newSongForm = document.createElement("form")
    newSongForm.setAttribute('id', 'new-song-form')
    newSongForm.innerHTML = `<label for="name">Name:</label><br>
                            <input type="text" id="name" name="name"><br>
                            <label for="artist">Artist:</label><br>
                            <input type="text" id="artist" name="artist"><br>
                            <label for="genre">Genre:</label><br>
                            <input type="text" id="genre" name="genre"><br>
                            <label for="image_url">Record Artwork:</label><br>
                            <input type="text" id="image_url" name="image_url"><br>
                            <label for="mp3">Mp3 File:</label><br>
                            <input type="text" id="mp3" name="mp3"><br>
                            <label for="bio">Bio:</label><br>
                            <input type="text" id="bio" name="bio"><br>
                            <input type="submit">Add New Record`

    body.append(newSongForm)

    newSongForm.addEventListener('submit', e => {
        console.log(e)
        e.preventDefault()
    
            const newSongObj = {
        name: e.target.name.value,
        artist: e.target.artist.value,
        genre: e.target.genre.value,
        image: e.target.image_url.value,
        mp3: e.target.mp3.value,
        bio: e.target.bio.value
            }
            console.log(newSongObj)
            postSong(newSongObj)
            newSongForm.remove()
    
    })

}

