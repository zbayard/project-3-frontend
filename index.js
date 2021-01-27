


// getUsers()
// getSongs ()

//////////  ELEMENT DECLARATIONS ///////////////////////
usersContainer = document.querySelector('div#users')
const newSongButton = document.querySelector('button#new-song-button')
const body = document.querySelector('body')
const songsContainer = document.querySelector('div#songs-container')
const newSongForm = document.querySelector('#new-song-form')
const activeSong = document.querySelector('div#active-song')
const actSongTitle = document.querySelector('h1#song-title')
const currentUser = document.querySelector('p#active-user')
const myRecordsBtn = document.querySelector('#my-records')
const myFriends = document.querySelector('#my-friends')
const mainDiv = document.querySelector('div#main-div')

///////////////// FETCH REQUESTS ////////////////

function deleteSong(songId) {
    fetch(`http://localhost:3000/songs/${songId}`, {
        method: 'DELETE'
    })
    
}



function getUsers () {
mainDiv.innerHTML = ""
fetch(`http://localhost:3000/users`)
.then(response => response.json())
.then(users => users.forEach(user => renderUser(user)))
}

function getSongs () {
    mainDiv.innerHTML = ""
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
myFriends.addEventListener('click', function(e) {
    getUsers()
})


// window.addEventListener('DOMContentLoaded', function (e) {
//     promptUser ()
// })

newSongButton.addEventListener('click', function(e) {
    mainDiv.innerHTML = ""
    getNewSongForm ()
})

mainDiv.addEventListener('click', function(e) {
    if (e.target.matches('div.song-div')) {
        getSong(e.target.dataset.id)
    }if(e.target.matches("#leave-note")){
        const parentDiv = e.target.closest('div')
        leaveNote(parentDiv.dataset.id, parentDiv)
    }if(e.target.matches("#delete-button")){
        const deleteDiv = e.target.closest('div')
        deleteSong(deleteDiv.dataset.id)
        mainDiv.innerHTML = "Your Record is gone"
        
        
    }
})

myRecordsBtn.addEventListener("click", ()=>{
    getSongs()
})





//////////////// HELPER METHODS //////////////////

function promptUser () {
    userName = window.prompt('Please enter your username')
    setUser(userName)
    
}


function createUser () {
    
}

function setUser (userName) {


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





function activateSong (songObj) {
const activeSong = document.createElement('div')
activeSong.setAttribute('id', 'active-song')
activeSong.dataset.id = songObj.id
activeSong.innerHTML = `<h1 id="song-title">${songObj.name}</h1>
<br>
<br>
<img id='song-image' src= ${songObj.image}>
<br>
<p>${songObj.bio}</p>
<br>
 <button id='delete-button'>Delete ${songObj.name}</button>`
 mainDiv.innerHTML= ""
mainDiv.append(activeSong)


}
// const deleteBtn = document.createElement("button")
// deleteBtn.innerHTML = "delete song"
// newSong.append(deleteBtn)


function renderUser(user){
    const newUser = document.createElement('div')
    newUser.setAttribute('class', 'user-card')
    newUser.dataset.id = user.id
    newUser.innerHTML = user.name
    mainDiv.append(newUser)

}

function renderSong(song) {
    const newSong = document.createElement('div')
    newSong.innerHTML = song.name
    newSong.setAttribute('class', 'song-div')
    newSong.dataset.id = song.id

    const songImg = document.createElement("img")
    songImg.src = song.image
    newSong.append(songImg)

 
    // songsContainer.append(newSong)

    const editBtn = document.createElement("button")
    editBtn.id = "leave-note"
    editBtn.innerHTML = "leave note"
    newSong.append(editBtn)
    mainDiv.append(newSong)

    // deleteBtn.addEventListener("click", () => {
    //     newSong.remove()
    //     deleteSong(song)
    // })

    

    
    

    

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

    mainDiv.append(newSongForm)

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




// *****RECORD PLAYER*****

// const audio = new Audio("./music.mp3");

// let disc, img;

// document.addEventListener("DOMContentLoaded", initialize);

// function initialize() {
//   disc = document.querySelector(".record-player-disc ");
//   disc.addEventListener("click", togglePlayback);
// }

// function addEventHandlers() {

// }

// function togglePlayback() {
//   if (audio.paused) {
//     disc.classList.add("playing");
//     audio.play();
//   } else {
//     disc.classList.remove("playing");
//     audio.pause();
//   }
// }

