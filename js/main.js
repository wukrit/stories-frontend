let selectedColumn = null
let cachedTopics = null

// Check if User is Already Logged In
if (document.cookie !== "") {
    logout.classList.toggle("hidden")
    login.classList.toggle("hidden")
    loggedInNav.classList.toggle("hidden")
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
            loggedInNav.classList.toggle("hidden")
            loggedInNav.innerText = currentUser.username
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
                loggedInNav.classList.toggle("hidden")
                loggedInNav.innerText = userObject.username
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


const fetchArticleLikes = (article) => {
    const likeArr = article.likes
    let likeObjArr = likeArr.select(like => like.user_id === turnCookieToObject(document.cookie).id)
    let selectedLikeArr = []
    likeArr.forEach(like => {
        if (like.user_id === turnCookieToObject(document.cookie).id) {
            selectedLikeArr.push(dislike)
        }
    })
}

const fetchArticleDislikes = (article) => {
    const dislikeArr = article.dislikes
    let selectedDislikeArr = []
    dislikeArr.forEach(dislike => {
        if (dislike.user_id === turnCookieToObject(document.cookie).id) {
            selectedDislikeArr.push(dislike)
        }
    })

}

// To Do List - 

// See User Profile
    // View users liked articles
// Add comments
    // Add replies
