let selectedColumn = null
let cachedTopics = null


// Element Creation Helpers
const createNavElement = (linkText, linkTarget, id) => {
    if (document.querySelector(`#${id}`)){
        document.querySelector(`#${id}`).remove()
    }
    const newNavElement = document.createElement("a")
    newNavElement.classList.add("navbar-item")
    newNavElement.id = id
    newNavElement.innerText = linkText

    newNavElement.addEventListener("click", event => {
        linkTarget.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    leftNav.append(newNavElement)
}

const createTileList = topicArr => {
    selectedColumn = createTileColumn("topics", topicList)
    let tiles = 0
    topicArr.map(topic => {
        if (tiles < 4) {
            checkTopicCol(topic)
            tiles++
        } else {
            checkTopicCol(topic, true)
            tiles = 1
        }
    })
}

const checkTopicCol = (topic, newCol = false) => {
    if (newCol){
        selectedColumn = createTileColumn("topics", topicList)
    }
    createTopicTile(topic)
}

const createTopicTile = topic => {
    const newTile = document.createElement("div")
    newTile.classList.add("tile", "is-child", "box",  "topic")
    newTile.dataset.id = topic.id

    const topicTitle = document.createElement("p")
    topicTitle.classList.add("title")
    topicTitle.innerText = topic.title
    topicTitle.dataset.id = topic.id

    // debugger
    // newTile.setAttribute("style", `background-image: url(${topic.articles[0].img_url})`)
    newTile.classList.add(bgColorArr[Math.floor(Math.random()*bgColorArr.length)])

    newTile.append(topicTitle)
    selectedColumn.append(newTile)
    newTile.addEventListener("click", handleTopicClick)
}

const createTileColumn = (className, elementToAppendTo) => {
    const newColumn = document.createElement("div")
    newColumn.classList.add("tile", "is-parent", "is-vertical", className)
    elementToAppendTo.append(newColumn)
    return newColumn
}

const createArticleList = topic => {
    selectedColumn = createTileColumn("articles", articleList)
    let tiles = 0

    topic.articles.map(article => {
        if (tiles < 20) {
            checkArticleCols(article, topic)
            tiles++
        } else {
            checkArticleCols(article, topic, true)
            tiles = 1
        }
    })
    createNavElement("Back to Articles", articleList, "back-to-articles")
    articleList.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const checkArticleCols = (article, topic, newCol = false) => {
    if (newCol) {
        selectedColumn = createTileColumn("articles", articleList)   
    }
    createArticleTile(article, topic)
}

const createArticleTile = (article, topic) => {
    const newTile = document.createElement("div")
    newTile.classList.add("tile", "is-child", "box")
    newTile.classList.add(bgColorArr[Math.floor(Math.random()*bgColorArr.length)])
    newTile.dataset.id = article.id
    newTile.dataset.topicId = topic.id

    const articleTitle = document.createElement("p")
    articleTitle.classList.add("title")
    articleTitle.dataset.id = article.id
    articleTitle.dataset.topicId = topic.id
    articleTitle.innerText = article.title

    const articleSource = document.createElement("p")
    articleSource.classList.add("subtitle")
    articleSource.dataset.id = article.id
    articleSource.dataset.topicId = topic.id
    articleSource.innerText = article.source
    
    const articleDesc = document.createElement("p")
    articleDesc.dataset.id = article.id
    articleDesc.dataset.topicId = topic.id
    articleDesc.innerText = article.description
    
    const articleDate = document.createElement("p")
    articleDate.dataset.id = article.id
    articleDate.dataset.topicId = topic.id
    articleDate.innerText = article.published_at

    newTile.append(articleTitle, articleSource, articleDesc, articleDate)
    selectedColumn.append(newTile)
    
    newTile.addEventListener("click", handleArticleClick)
} 

const createArticleView = article => {
    const articleLink = document.createElement("a")
    articleLink.href = article.url
    articleLink.target = "_blank"
    articleLink.dataset.id = article.id

    const articleTitle = document.createElement("a")
    articleTitle.classList.add("title")
    articleTitle.href = article.url
    articleTitle.dataset.id = article.id
    articleTitle.innerText = article.title

    const articleAuthor = document.createElement("p")
    articleAuthor.classList.add("subtitle")
    articleAuthor.dataset.id = article.id
    articleAuthor.innerText = article.author

    const articleSource = document.createElement("p")
    articleSource.classList.add("subtitle")
    articleSource.dataset.id = article.id
    articleSource.innerText = article.source

    const articleImage = document.createElement("img")
    articleImage.src = article.img_url

    const articleImageLink = document.createElement("a")
    articleImageLink.href = article.img_url
    articleImageLink.append(articleImage)

    const articleDesc = document.createElement("p")
    articleDesc.dataset.id = article.id
    articleDesc.innerText = article.description
    
    const articleDate = document.createElement("p")
    articleDate.dataset.id = article.id
    articleDate.innerText = article.published_at

    const thumbUp = document.createElement("span")
    thumbUp.classList.add("oi")
    thumbUp.dataset.glyph = "thumb-up"

    const divider1 = document.createElement("span")
    divider1.classList.add("divider")
    divider1.innerText = " | "

    const divider2 = document.createElement("span")
    divider2.classList.add("divider")
    divider2.innerText = " | "

    const thumbDown = document.createElement("span")
    thumbDown.classList.add("oi")
    thumbDown.dataset.glyph = "thumb-down"

    const discuss = document.createElement("span")
    discuss.classList.add("oi")
    discuss.dataset.glyph = "comment-square"

    articleModalHead.append(articleTitle)
    articleModalBody.append(articleAuthor, articleSource, articleImageLink, articleDesc, articleDate)
    articleModalFoot.append(thumbUp, divider1, thumbDown, divider2, discuss)
    articleModal.classList.toggle("is-active")
    
}

// Remove all Children of Element
const clearChildren = element => {
    let first = element.firstElementChild; 
        while (first) { 
            first.remove(); 
            first = element.firstElementChild; 
        } 
}

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
    createArticleView(selectedArticle)
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
    document.cookie = `username=; expires=${yesterday}`
    alert('You have been logged out!')
    logout.classList.toggle("hidden")
    login.classList.toggle("hidden")
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


// Fetches

// Logging In
const userLoginFetch = userObject => {
    fetch("https://fis-stories-backend.herokuapp.com/users")
    .then(res => res.json())
    .then(userObj => {
        
        const currentUser = userObj.find(user => {
            return user.username === userObject.username
        })
        if(currentUser) {
            document.cookie = `username=${currentUser.username}; expires=${tomorrow}`
            logout.classList.toggle("hidden")
            login.classList.toggle("hidden")
            alert(`Welcome back ${userObject.username}!`)
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
                document.cookie = `username=${userObject.username}; expires=${tomorrow}`
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