// Static DOM Elements
const articleContainer = document.querySelector("#article-container")
const articleListContainer = document.querySelector("#article-list-container")
const topicContainer = document.querySelector("#topic-container")
const topicList = document.querySelector("#topic-list")
const articleList = document.querySelector("#article-list")
const articleView = document.querySelector("#article-view")
let selectedColumn = null
let cachedTopics = null

// Element Creation Helpers
const createTileList = topicArr => {
    selectedColumn = createTileColumn("topics", topicList)
    let tiles = 0
    topicArr.map(topic => {
        if (tiles < 4) {
            checkTopicCol(topic)
            tiles++
        } else {
            checkTopicCol(topic, true)
            tiles = 0
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
    newTile.classList.add("tile", "is-child", "box")
    newTile.dataset.id = topic.id

    const topicTitle = document.createElement("p")
    topicTitle.classList.add("title")
    topicTitle.innerText = topic.title
    topicTitle.dataset.id = topic.id

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
            tiles = 0
        }
    })
    articleList.scrollIntoView(true)
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

    const selectedArticleTile = document.createElement("div")
    selectedArticleTile.classList.add("tile", "is-child", "is-12", "box")

    const articleTitle = document.createElement("p")
    articleTitle.classList.add("title")
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
    
    const articleDesc = document.createElement("p")
    articleDesc.dataset.id = article.id
    articleDesc.innerText = article.description
    
    const articleDate = document.createElement("p")
    articleDate.dataset.id = article.id
    articleDate.innerText = article.published_at

    selectedArticleTile.append(articleTitle, articleAuthor, articleSource, articleImage, articleDesc, articleDate)
    articleLink.append(selectedArticleTile)
    articleView.append(articleLink)
    articleView.scrollIntoView(true)
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
    clearChildren(articleView)
    createArticleView(selectedArticle)
}

// Fetches

// Initial Fetch
fetch("http://localhost:3000/topics")
    .then(response => response.json())
    .then(topicArr => {
        cachedTopics = topicArr
        createTileList(cachedTopics)
    })
