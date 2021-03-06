




//////////  ELEMENT DECLARATIONS ///////////////////////
usersContainer = document.querySelector('div#users')
const newSongButton = document.querySelector('button#new-song-button')
const body = document.querySelector('body')
const songsContainer = document.querySelector('div#songs-container')
const newSongForm = document.querySelector('#new-song-form')
const activeSong = document.querySelector('div#active-song')
const actSongTitle = document.querySelector('h1#song-title')
const currentUser = document.querySelector('p#active-user')
const recordsBtn = document.querySelector('#records')
const favesButton = document.querySelector('#favorites-button')
const myFriends = document.querySelector('#my-friends')
const mainDiv = document.querySelector('div#main-div')
const recordPlayer = document.querySelector('.record-player-disc')


///////////////// FETCH REQUESTS ////////////////





function deleteSong(songId) {
    fetch(`https://floating-cliffs-68685.herokuapp.com/songs/${songId}`, {
        method: 'DELETE'
    })
    
}


function postOwnership (ownershipObj) {
    fetch('https://floating-cliffs-68685.herokuapp.com/ownerships', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
    }, 
    body: JSON.stringify(ownershipObj)})
.then (res => res.json())
.then (ownership => console.log(ownership))
}

function postUser (userObj) {
    fetch('https://floating-cliffs-68685.herokuapp.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
    },
    body: JSON.stringify(userObj)}).then
    (res => res.json()).then
    (user => console.log(user))
}

function getUserSongs (userId) {
    return fetch (`https://floating-cliffs-68685.herokuapp.com/users/${userId}/songs`)
    .then (res => res.json())
}

function getUser (userId) {
    return fetch(`https://floating-cliffs-68685.herokuapp.com/users/${userId}`)
    .then(res => res.json())
    
    
}


function getUsers () {
mainDiv.innerHTML = ""
const usersDiv = document.createElement('div')
usersDiv.setAttribute('id', 'users-div')
function renderUser(user){
    const newUser = document.createElement('div')
    const faveCount = document.createElement('p')
    faveCount.id = 'fave-count'
    faveCount.innerHTML = `${user.songs.length} favorite records`
    
    newUser.setAttribute('class', 'user-card')
    newUser.dataset.id = user.id
    newUser.innerHTML = user.name
    newUser.append(faveCount)
    usersDiv.append(newUser)
    newUser.addEventListener('click', function (e) {
        renderUserView(`${newUser.dataset.id}`)
        })

}
fetch(`https://floating-cliffs-68685.herokuapp.com/users`)
.then(response => response.json())
.then(users => users.forEach(user => renderUser(user)))
mainDiv.append(usersDiv)
}

function getSongs () {
    mainDiv.innerHTML = '<h1 id="library-header">Record Library</h1>'
    fetch('https://floating-cliffs-68685.herokuapp.com/songs')
    .then(res => res.json())
    .then(songs => songs.forEach( song => renderSong(song)))
}

function getSong (songId) {
    fetch(`https://floating-cliffs-68685.herokuapp.com/songs/${songId}`)
    .then(res => res.json())
    .then(song => activateSong(song))
}

function postSong(songData) {
    fetch('https://floating-cliffs-68685.herokuapp.com/songs', {
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
      fetch(`https://floating-cliffs-68685.herokuapp.com/songs/${songId}`, {
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

    favesButton.addEventListener('click', function (e) {
        mainDiv.innerHTML = `<h1 id='fave-header'>${currentUser.textContent}'s Collection</h1>`

        getUserSongs(currentUser.dataset.id)
        .then (data => data.forEach (song => renderSong(song)))
    })


myFriends.addEventListener('click', function(e) {
    getUsers()
})


window.addEventListener('DOMContentLoaded', function (e) {
    promptUser ()
})

newSongButton.addEventListener('click', function(e) {
    mainDiv.innerHTML = ""
    getNewSongForm ()
})

mainDiv.addEventListener('click', function(e) {
    if (e.target.matches('div.flip-card-back')) {
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

recordsBtn.addEventListener("click", ()=>{
    getSongs()
})






//////////////// HELPER METHODS //////////////////





function promptUser () {
    userName = window.prompt('Please enter your username')
    setUser(userName)
    
}




function renderNewUserForm (newUser) {
    mainDiv.innerHTML = 'Looks like we have a new collector! Please enter your information so we can get you started.'
   
    
    const newUserForm = document.createElement('form')
    newUserForm.setAttribute('id', 'new-user-form')
    const nameLabel = document.createElement('label')
    nameLabel.setAttribute('for', 'name')
    nameLabel.textContent = 'Name:'
    const nameInput = document.createElement('input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('name', 'name')
    nameInput.setAttribute('id', 'name')
    const ageLabel = document.createElement('label')
    ageLabel.setAttribute('for', 'age')
    ageLabel.textContent = 'Age:'
    const ageInput = document.createElement('input')
    ageInput.setAttribute('id', 'age')
    ageInput.setAttribute('name', 'age')
    ageInput.setAttribute('type', 'number')
    const bioLabel = document.createElement('label')
    bioLabel.setAttribute('for', 'bio')
    bioLabel.textContent = 'Bio:'
    const bioInput = document.createElement('input')
    bioInput.setAttribute('id', 'bio')
    bioInput.setAttribute('name', 'bio')
    bioInput.setAttribute('type', 'text')
    const userSubmit = document.createElement('input')
    userSubmit.setAttribute('type', 'submit')
    newUserForm.append( nameLabel, nameInput, ageLabel, ageInput, bioLabel, bioInput, userSubmit)
    mainDiv.append(newUserForm)
  
    newUserForm.addEventListener('submit', function (e) {
        e.preventDefault ()
        newUserObj = {
            name: e.target.name.value,
            age: e.target.age.value,
            bio: e.target.bio.value
        }
        postUser(newUserObj)
        currentUser.textContent = newUserObj.name
        getSongs()
    })}
    

    function renderUserFaves (songArr) {
        console.log(songArr.forEach (song => (song.name)))
        
        return songArr.forEach (song => (console.log(song.name)))
        
    }
      

function renderUserView (userId) {
    mainDiv.innerHTML = ""
    const userShowDiv = document.createElement('div')
    userShowDiv.setAttribute('class', 'user-show-list')
    getUser(userId)
    .then(user => userShowDiv.innerHTML = `Name:${user.name}
    <br>
    Age:${user.age}
    <br>
    Bio: ${user.bio}
    <br>
    Favorites: `
    )
    // const imgDiv = con
    getUser(userId).then
        (user => user.songs.forEach (song => {
        console.log(song)
        renderFaves(song)
        // const songImg = document.createElement('img')
        // songImg.setAttribute('class', 'fave-image')
        // songImg.setAttribute('src', song.image)
        // userShowDiv.append(songImg)
    
        function renderFaves(song) {
            const newSong = document.createElement('div')
            // newSong.innerHTML = song.name
            newSong.setAttribute('class', 'song-div')
            newSong.dataset.id = song.id
        
        
            // ****FLIP CARD DIVS****
            const newSongInner = document.createElement('div')
            newSongInner.setAttribute('class', 'flip-card-inner')
            const newSongFront = document.createElement('div')
            newSongFront.setAttribute('class', 'flip-card-front')
            const newSongBack = document.createElement('div')
         
            newSongBack.setAttribute('class', 'flip-card-back')
            newSongBack.dataset.id = song.id
        
            // ****OTHER SHIT FOR FLIP CARDS*****
            const trackName = document.createElement('h1')
            trackName.innerHTML = song.name
            const trackArtist = document.createElement('p')
            trackArtist.innerHTML = song.artist
            const songImg = document.createElement("img")
            songImg.setAttribute('class', 'record-image')
            songImg.src = song.image
            
        
            // ***APPENDS TO DIVS***
            
            newSongBack.append(trackName, trackArtist)
            newSongFront.append(songImg)
            newSongInner.append(newSongFront, newSongBack)
            newSong.append(newSongInner)
        
            userShowDiv.append(newSong)
            
        
            
            
         
        
            // deleteBtn.addEventListener("click", () => {
            //     newSong.remove()
            //     deleteSong(song)
            // })
        }
    
     mainDiv.append(userShowDiv)}))
        }


function setUser (userName) {


function setActiveUser (userArr) {

    let activeUser = userArr.filter ( user => user.name === userName)
   if (activeUser[0]) {
        currentUser.innerHTML = activeUser[0].name
        currentUser.setAttribute('data-id', activeUser[0].id)
        getSongs()

   }
   else {
       renderNewUserForm (userName)
   }
}

function searchUsers () {
    fetch(`https://floating-cliffs-68685.herokuapp.com/users`)
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

        const noteArea = document.querySelector('p#bio')
        const newNoteInput = e.target.note.value
        
        noteArea.innerHTML = newNoteInput
        
        
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
<p id='bio'>${songObj.bio}</p>
<br>
 <button id='delete-button'>Delete ${songObj.name}</button>`
 mainDiv.innerHTML= ""
mainDiv.append(activeSong)
const addRecordBtn = document.createElement('button')
addRecordBtn.innerHTML= 'Add this record to your collection'
addRecordBtn.dataset.id = songObj.id
activeSong.append(addRecordBtn)
const playRecordBtn = document.createElement('button')
playRecordBtn.innerHTML = 'Load Record'
playRecordBtn.dataset.id = songObj.id
activeSong.append(playRecordBtn)
const editBtn = document.createElement("button")
editBtn.id = "leave-note"
editBtn.innerHTML = "Leave Note"
activeSong.append(editBtn)


playRecordBtn.addEventListener('click', ()=> {
    // PLAYER BUG SOMETHING NEEDS TO GO HERE TO CLEAR OLD AUDIO
    // recordPlayer.innerHTML = ""

    console.log(document.querySelector('audio'))
    // const musicPlayer = document.createElement('audio')
    // musicPlayer.id = 'music-player'
    // musicPlayer.src = songObj.mp3
    // musicPlayer.autoplay = true
    // recordPlayer.append(musicPlayer)
    playTheRecord(songObj.mp3, songObj.image)
})

addRecordBtn.addEventListener('click', function(e){
    const ownershipObj = {
        song_id: songObj.id,
        user_id: currentUser.dataset.id
    }
    postOwnership(ownershipObj)
})

}
// const deleteBtn = document.createElement("button")
// deleteBtn.innerHTML = "delete song"
// newSong.append(deleteBtn)




function renderSong(song) {
    const newSong = document.createElement('div')
    // newSong.innerHTML = song.name
    newSong.setAttribute('class', 'song-div')
    newSong.dataset.id = song.id


    // ****FLIP CARD DIVS****
    const newSongInner = document.createElement('div')
    newSongInner.setAttribute('class', 'flip-card-inner')
    const newSongFront = document.createElement('div')
    newSongFront.setAttribute('class', 'flip-card-front')
    const newSongBack = document.createElement('div')
 
    newSongBack.setAttribute('class', 'flip-card-back')
    newSongBack.dataset.id = song.id

    // ****OTHER SHIT FOR FLIP CARDS*****
    const trackName = document.createElement('h1')
    trackName.innerHTML = song.name
    const trackArtist = document.createElement('p')
    trackArtist.innerHTML = song.artist
    const songImg = document.createElement("img")
    songImg.setAttribute('class', 'record-image')
    songImg.src = song.image

    // ***APPENDS TO DIVS***
    newSongBack.append(trackName, trackArtist)
    newSongFront.append(songImg)
    newSongInner.append(newSongFront, newSongBack)
    newSong.append(newSongInner)

 
    

    // const editBtn = document.createElement("button")
    // editBtn.id = "leave-note"
    // editBtn.innerHTML = "leave note"
    // newSong.append(editBtn)

    mainDiv.append(newSong)

    // deleteBtn.addEventListener("click", () => {
    //     newSong.remove()
    //     deleteSong(song)
    // })
}




function getNewSongForm(){
    mainDiv.innerHTML = `<h1 id="new-song-form">Enter Song Info</h1>`
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
                            <input style='background-color: background-color: #666145;' type="submit" value='Add New Record'>`

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
function playTheRecord(song, recordImage){
    console.log(song)
    // let audio = new Audio(song);
    const oldAudio = document.querySelectorAll('audio')
    if (oldAudio){
    oldAudio.forEach(tag =>{
        tag.src = ""
    })
    }
    const audio = document.createElement('audio')
    audio.src = song
 
    const recordBox = document.querySelector('div#record-player-box')
    recordBox.append(audio)


 
    
   

    let disc

    // document.addEventListener("DOMContentLoaded", initialize);

    function initialize() {
    disc = document.querySelector(".record-player-disc ");
    disc.addEventListener("click", togglePlayback);
    // const recImage = document.createElement('div')
    // recImage.id = 'rec-image'
    // recImage.setAttribute('style',`background-image: url(${recordImage})`) 
    // disc.append(recordImage)
    disc.setAttribute('style', `background-image: url(${recordImage})`)
    }
    initialize()

    // function addEventHandlers() {

    // }

    function togglePlayback() {
    if (audio.paused) {
        disc.classList.add("playing");
        audio.play();
    } else {
        disc.classList.remove("playing");
        audio.pause();
    }
    }
}
