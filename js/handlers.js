// Event Handlers
const handleTopicClick = event => {
    const selectedTopic = cachedTopics.find(topic => {
        return parseInt(topic.id) === parseInt(event.target.dataset.id)
    })
    clearChildren(articleList)
    createArticleList(selectedTopic)
}

const handleArticleClick = event => {
    const selectedTopic = cachedTopics.find(topic => {
        return parseInt(topic.id) === parseInt(event.target.dataset.topicId)
    })
    const selectedArticle = selectedTopic.articles.find(article => {
        return parseInt(article.id) === parseInt(event.target.dataset.id)
    })
    clearChildren(articleModalHead)
    clearChildren(articleModalBody)
    clearChildren(articleModalFoot)
    createArticleView(selectedArticle, selectedTopic)
}

const toggleLoginModal = event => {
    loginModal.classList.toggle("is-active")
}

const toggleArticleModal = event => {
    articleModal.classList.toggle("is-active")
}

const revealTopButton = event => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)  {
        topButton.classList.remove("hidden")
    } else {
        topButton.classList.add("hidden")
    }
}

const toggleForms = event => {
    signupForm.classList.toggle("hidden")
    loginForm.classList.toggle("hidden")
    toggleSpan.forEach(span => span.classList.toggle("hidden"))
}


const logoutHandler = event => {
    document.cookie = `selectedUser=; expires=${yesterday}`
    alert('You have been logged out!')
    logout.classList.toggle("hidden")
    login.classList.toggle("hidden")
    loggedInNav.classList.toggle("hidden")
}

const signupHandler = event => {
    event.preventDefault()
    const userObj = {username: event.target.querySelector(".input").value}
    userPostFetch(userObj)
    event.target.querySelector(".input").value = ""
}

const loginHandler = event => {
    event.preventDefault()
    const userObject = {username: event.target.querySelector(".input").value}
    userLoginFetch(userObject)
    event.target.querySelector(".input").value = ""
}

const likeHandler = article => {
    let likeArr = article.likes 
    let toggleClass = false
    let increment = true
    
    let likeObj = likeArr.find(like => like.user_id === turnCookieToObject(document.cookie).id)
    if (document.cookie !== "") {
        if (likeObj) {
            fetch(`https://fis-stories-backend.herokuapp.com/likes/${likeObj.id}`, {method: "DELETE"})
            let selLike = article.likes.find(like => like.id === likeObj.id)
            article.likes.splice(article.likes.indexOf(selLike))
            toggleClass = true
            increment = false
        } else {
            fetch("https://fis-stories-backend.herokuapp.com/likes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    user_id: turnCookieToObject(document.cookie).id,
                    article_id: article.id
                })
            })
                .then(res => res.json())
                .then(likeObj => {
                    article.likes.push({id: likeObj.id, user_id: turnCookieToObject(document.cookie).id, article_id: article.id})
                })
            toggleClass = true
        }
    } else {
        alert("You must be logged in to do that")
    }
    const returnObj = {toggle: toggleClass, increment: increment}
    return returnObj
}

const dislikeHandler = article => {
    // Search articles for dislikes
    let dislikeArr = article.dislikes
    let toggleClass = false
    let increment = true
    
    let dislikeObj = dislikeArr.find(dislike => dislike.user_id === turnCookieToObject(document.cookie).id)
    // debugger
     if (document.cookie !== "") {   
        if (dislikeObj) {
            // Delete fetch
            fetch(`https://fis-stories-backend.herokuapp.com/dislikes/${dislikeObj.id}`, {method: "DELETE"})
            let selDislike = article.dislikes.find(dislike => dislike.id === dislikeObj.id)
            article.dislikes.splice(article.dislikes.indexOf(selDislike))
            toggleClass = true
            increment = false
        } else {
            // Post fetch
            fetch(`https://fis-stories-backend.herokuapp.com/dislikes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    user_id: turnCookieToObject(document.cookie).id,
                    article_id: article.id
                })
            })
                .then(res => res.json())
                .then(dislikeObj => {
                    article.dislikes.push({id: dislikeObj.id, user_id: turnCookieToObject(document.cookie).id, article_id: article.id})
                })
            toggleClass = true            
        }
     } else {
         alert("You must be logged in to do that")
     }
     const returnObj = {toggle: toggleClass, increment: increment}
     return returnObj
}
