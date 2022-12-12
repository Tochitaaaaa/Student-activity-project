var toggleAsideEl = document.querySelector("#toggle-aside");
var bookmarkMenuEl = document.querySelector("#bookmark-menu");
var bookMarkMenuVisible = false;

toggleAsideEl.addEventListener("click", function() {
    if (bookMarkMenuVisible === false){
        bookMarkMenuVisible = true;
        bookmarkMenuEl.classList.add('show');
    }
    else {
        bookmarkMenuEl.classList.remove('show');
        bookMarkMenuVisible = false;
    }
})
