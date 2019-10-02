// Static DOM Elements
const articleContainer = document.querySelector("#article-container")
const articleListContainer = document.querySelector("#article-list-container")
const topicContainer = document.querySelector("#topic-container")
const topicList = document.querySelector("#topic-list")
const articleList = document.querySelector("#article-list")
let selectedColumn = null
let cachedTopics = null

// Element Creation Helpers
const createTileList = topicArr => {
    selectedColumn = createTileColumn("topics", topicList)
    let tiles = 0
    // Iterate
    topicArr.map(topic => {
        if (tiles < 4) {
            createTopicTile(topic)
            tiles++
        } else {
            createTopicTile(topic, true)
            tiles = 0
        }
    })
}

const createTopicTile = (topic, newCol = false) => {
    if (newCol){
        selectedColumn = createTileColumn("topics", topicList)

        const newTile = document.createElement("div")
        newTile.classList.add("tile", "is-child", "box")
        newTile.dataset.id = topic.id

        const topicTitle = document.createElement("p")
        topicTitle.classList.add("title")
        topicTitle.dataset.id = topic.id
        topicTitle.innerText = topic.title

        newTile.append(topicTitle)
        selectedColumn.append(newTile)
        newTile.addEventListener("click", handleTopicClick)
    } else {
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
}

const createArticleView = article => {

}

const createTileColumn = (className, elementToAppendTo) => {
    const newColumn = document.createElement("div")
    newColumn.classList.add("tile", "is-parent", "is-vertical", className)
    elementToAppendTo.append(newColumn)
    return newColumn
}

// Initial Fetch
fetch("http://localhost:3000/topics")
    .then(response => response.json())
    .then(topicArr => {
        cachedTopics = topicArr
        createTileList(cachedTopics)
    })

// Event Handlers
const handleTopicClick = (event) => {
    const selectedTopic = cachedTopics.find(topic => {
        return parseInt(topic.id) === parseInt(event.target.dataset.id)
    })
    clearChildren(articleList)
    createArticleList(selectedTopic)
}

const createArticleList = topic => {
    selectedColumn = createTileColumn("articles", articleList)
    let tiles = 0

    topic.articles.map(article => {
        if (tiles < 20) {
            checkArticleCols(article)
            tiles++
        } else {
            checkArticleCols(article, true)
            tiles = 0
        }
    })
}

const checkArticleCols = (article, newCol = false) => {
    if (newCol) {
        selectedColumn = createTileColumn("articles", articleList)   
    }
    createArticleTile(article)
}

// Remove all Children of Element
const clearChildren = element => {
    let first = element.firstElementChild; 
        while (first) { 
            first.remove(); 
            first = element.firstElementChild; 
        } 
}

const createArticleTile = article => {
    const newTile = document.createElement("div")
    newTile.classList.add("tile", "is-child", "box")
    newTile.dataset.id = article.id

    const articleTitle = document.createElement("p")
    articleTitle.classList.add("title")
    articleTitle.dataset.id = article.id
    articleTitle.innerText = article.title

    const articleSource = document.createElement("p")
    articleSource.classList.add("subtitle")
    articleSource.dataset.id = article.id
    articleSource.innerText = article.source
    
    const articleDesc = document.createElement("p")
    articleDesc.dataset.id = article.id
    articleDesc.innerText = article.description
    
    const articleDate = document.createElement("p")
    articleDate.dataset.id = article.id
    articleDate.innerText = article.published_at

    newTile.append(articleTitle, articleSource, articleDesc, articleDate)
    selectedColumn.append(newTile)
} 