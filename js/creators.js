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
    newTile.classList.add("tile", "is-child", "box", "topic")
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
        if (tiles < 5) {
            checkArticleCols(article, topic)
            tiles++
        } else {
            checkArticleCols(article, topic, true)
            tiles = 1
        }
    })
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
    newTile.classList.add("tile", "is-child", "box", "article-tile")
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

const createArticleView = (article, topic) => {
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
    articleImageLink.href = article.url
    articleImageLink.append(articleImage)

    const articleDesc = document.createElement("p")
    articleDesc.dataset.id = article.id
    articleDesc.innerText = article.description
    
    const articleDate = document.createElement("p")
    articleDate.dataset.id = article.id
    articleDate.innerText = article.published_at

    const divider1 = document.createElement("span")
    divider1.classList.add("divider")
    divider1.innerText = " | "

    const divider2 = document.createElement("span")
    divider2.classList.add("divider")
    divider2.innerText = " | "

    const thumbUp = document.createElement("span")
    thumbUp.classList.add("oi")
    thumbUp.dataset.glyph = "thumb-up"

    const thumbDown = document.createElement("span")
    thumbDown.classList.add("oi")
    thumbDown.dataset.glyph = "thumb-down"

    const discuss = document.createElement("span")
    discuss.classList.add("oi")
    discuss.dataset.glyph = "comment-square"

    const numThumbUp = document.createElement("span")
    numThumbUp.classList.add("num-thumbs")
    numThumbUp.id = "num-thumb-up"
    numThumbUp.innerText = fetchArticleLikes(article).length

    const numThumbDown = document.createElement("span")
    numThumbDown.classList.add("num-thumbs")
    numThumbDown.id = "num-thumb-down"
    numThumbDown.innerText = fetchArticleDislikes(article).length

    articleModalHead.append(articleTitle)
    articleModalBody.append(articleAuthor, articleSource, articleImageLink, articleDesc, articleDate)
    articleModalFoot.append(thumbUp, numThumbUp, divider1, thumbDown, numThumbDown, divider2, discuss)
    articleModal.classList.toggle("is-active")

    if (fetchArticleLikes(article).find(like => like.user_id === turnCookieToObject(document.cookie).id)) {
        thumbUp.classList.add("liked")
    }

    if (fetchArticleDislikes(article).find(dislike => dislike.user_id === turnCookieToObject(document.cookie).id)) {
        thumbDown.classList.add("liked")
    }

    thumbUp.addEventListener("click", event => {
        const handleObj = likeHandler(article)
        // debugger
        if (handleObj.toggle === true) {
            const numUp = event.target.parentElement.querySelector("#num-thumb-up")
            let num = parseInt(numUp.innerText)
            // debugger
            if (handleObj.increment === true) {
                // debugger
                num++
                numUp.innerText = num
            } else {
                num--
                numUp.innerText = num
            }
            event.target.classList.toggle("liked")
        }
    })

    thumbDown.addEventListener("click", event => {
        const handleObj = dislikeHandler(article)
        if (handleObj.toggle === true) {
            const numDown = event.target.parentElement.querySelector("#num-thumb-down")
            let num = parseInt(numDown.innerText)
            if (handleObj.increment === true) {
                num++
                numDown.innerText = num
            } else {
                num--
                numDown.innerText = num
            }
            event.target.classList.toggle("liked")
        }
    })
    
}

const makeLikeList = user => {
    const listLikedArticles = document.createElement("ul")
    listLikedArticles.classList.add("like-list")
    articleModalBody.append(listLikedArticles)
    debugger
    user.likes.forEach(like => {
        fetch(`https://fis-stories-backend.herokuapp.com/articles/${like.article_id}`)
        .then(response => response.json())
        .then(article => {
                const newLi = document.createElement("li")
                newLi.id = article.id
                newLi.innerText = `${article.title} | ${article.source}`
                
                const artLink = document.createElement("a")
                artLink.target = "_blank"
                artLink.href = article.url
                
                artLink.append(newLi)
                listLikedArticles.append(artLink)
            })    
    })
}