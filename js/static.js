// Static DOM Elements
const articleContainer = document.querySelector("#article-container")
const articleListContainer = document.querySelector("#article-list-container")
const topicContainer = document.querySelector("#topic-container")
const topicList = document.querySelector("#topic-list")
const articleList = document.querySelector("#article-list")
const articleView = document.querySelector("#article-view")
const leftNav = document.querySelector("#left-nav")
const rightNav = document.querySelector("#right-nav")
const login = document.querySelector("#login")
const loginModal = document.querySelector("#login-modal")
const loginModalCloseButton = document.querySelector(".modal-close")
const loginModalBg = document.querySelector(".login-modal-bg")
const loginForm = document.querySelector("#login-form")
const signupForm = document.querySelector("#signup-form")
const toggleSpan = document.querySelectorAll(".toggle-sign-in")
const topButton = document.querySelector(".top")
const bgColorArr = ["has-background-primary", "has-background-info", "has-background-link", "has-background-success", "has-background-warning", "has-background-danger", "has-background-white"]
const logout = document.querySelector("#logout")
const articleModal = document.querySelector(".article-modal")
const articleModalBg = document.querySelector(".article-modal-bg")
const articleModalHead = document.querySelector(".modal-card-head")
const articleModalBody = document.querySelector(".modal-card-body")
const articleModalFoot = document.querySelector(".modal-card-foot")
const loggedInNav = Document.querySelector("#logged-in-nav")

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)