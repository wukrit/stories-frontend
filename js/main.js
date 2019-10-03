let selectedColumn = null
let cachedTopics = null

// Check if User is Already Logged In
if (document.cookie !== "") {
    logout.classList.toggle("hidden")
    login.classList.toggle("hidden")
}

// Remove all Children of Element
const clearChildren = element => {
    let first = element.firstElementChild; 
        while (first) { 
            first.remove(); 
            first = element.firstElementChild; 
        } 
}

// Fetches
// Logging In
const userLoginFetch = givenUserObject => {
    fetch("https://fis-stories-backend.herokuapp.com/users")
    .then(res => res.json())
    .then(userObject => {
        
        const currentUser = userObject.find(user => {
            return user.username === givenUserObject.username
        })
        if(currentUser) {
            turnObjectToCookie(currentUser)
            logout.classList.toggle("hidden")
            login.classList.toggle("hidden")
            alert(`Welcome back ${givenUserObject.username}!`)
            toggleLoginModal()
        } else {
            alert("Username does not exist")
        }
    })
}

// Post New User
const userPostFetch = userObj => {
    fetch("https://fis-stories-backend.herokuapp.com/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(userObj)
    })
        .then(res => res.json())
        .then(userObject => {
            // debugger
            if (userObject.error){
                alert("Username already exists")
            } else {
                // document.cookie = `username=${userObject.username}; expires=${tomorrow}`
                turnObjectToCookie(userObject)
                logout.classList.toggle("hidden")
                login.classList.toggle("hidden")
                toggleLoginModal()
            }
        })
}

// Initial Fetch
fetch("https://fis-stories-backend.herokuapp.com/topics")
    .then(response => response.json())
    .then(topicArr => {
        cachedTopics = topicArr
        createTileList(cachedTopics)
    })


// Cookie Helper
const turnObjectToCookie = obj => {
    const stringy = JSON.stringify(obj)
    document.cookie = `selectedUser=${stringy}; expires=${tomorrow}`
}

const turnCookieToObject = string => {
    const arrayOfStrings = string.split("=")
    const userObj = JSON.parse(arrayOfStrings[1])
    return userObj
}

// Add user_id into user cookie X

// Render number of likes  
// Make the like/dislike clickable X 
// Make post fetch happen when user clicks like X
    // Check to see if user is logged in X 
// Show that a user already liked this (toggle class liked)
// Make a delete fetch when user clicks like again X
