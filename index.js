


getUsers()
// getSongs ()

//////////  ELEMENT DECLARATIONS ///////////////////////
usersContainer = document.querySelector('div#users')
const newSongButton = document.querySelector('button#new-song-button')
const body = document.querySelector('body')
const songsContainer = document.querySelector('div#songs-container')
const newSongForm = document.querySelector('#new-song-form')
const activeSong = document.querySelector('div#active-song')
const actSongTitle = document.querySelector('h1#song-title')
const actSongImg = activeSong.querySelector('img')
<<<<<<< HEAD
const userInfo = document.querySelector('h1#user-info')
const currentUser = document.querySelector('p#active-user')
=======
const myRecordsBtn = document.querySelector('#my-records')
>>>>>>> edbc234da8e8a00f2039775d5be8a76acb789ad9

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

  function patchNote(songId, newNoteObj){
      fetch(`http://localhost:3000/songs/${songId}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(newNoteObj)
      })
      .then(res => res.json())
      .then(songObj => {
          console.log("success")
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
    }if(e.target.matches("#leave-note")){
        const parentDiv = e.target.closest('div')
        leaveNote(parentDiv.dataset.id, parentDiv)
    }
})

myRecordsBtn.addEventListener("click", ()=>{
    getSongs()
})





//////////////// HELPER METHODS //////////////////

<<<<<<< HEAD
function promptUser () {
    userName = window.prompt('Please enter your username')
    setUser(userName)
    
}


function createUser () {
    
}

function setUser (userName) {
userInfo.innerHTML = `${userName}'s page`

function setActiveUser (userArr) {

    let activeUser = userArr.filter ( user => user.name === userName)
   if (activeUser[0]) {
        currentUser.innerHTML = activeUser[0].name
   }
   else {
       createUser ()
   }
}

function searchUsers () {
    fetch(`http://localhost:3000/users`)
.then(response => response.json())
.then(users => setActiveUser(users))

}
searchUsers() 
}




=======
function leaveNote(songObj, songDiv){
    const noteForm = document.createElement("form")
    const noteInput = document.createElement("input")
    const noteSubmit = document.createElement("input")
    noteInput.name = "note"
    noteSubmit.type = "submit"
    noteForm.append(noteInput, noteSubmit)
    songDiv.append(noteForm)
    console.log(songDiv)
    console.log(songObj)
    
    

    noteForm.addEventListener("submit", e => {
        e.preventDefault()
        console.log(e)
        

        const newNoteObj = {
            bio: e.target.note.value
        }
        

        patchNote(songObj, newNoteObj)
        noteForm.remove()
    })
}

// function addNoteToDom(songObj){
//     // ****DOM LOGIC FOR NEW NOTE****

//     const

//     addNoteTo
// }
>>>>>>> edbc234da8e8a00f2039775d5be8a76acb789ad9

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

    const songImg = document.createElement("img")
    songImg.src = song.image
    newSong.append(songImg)

    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = "delete song"
    newSong.append(deleteBtn)
    // songsContainer.append(newSong)

    const editBtn = document.createElement("button")
    editBtn.id = "leave-note"
    editBtn.innerHTML = "leave note"
    newSong.append(editBtn)
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

