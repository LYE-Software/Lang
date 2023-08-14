var header = document.getElementById("header");
var headerHeight = 0;
if (header != null) {
    var functionRow = document.getElementsByClassName("functionRow")[0];
    var headerHeight = header.getBoundingClientRect().height + functionRow.getBoundingClientRect().height;
}

var rightSidebars = document.getElementsByClassName("rightSidebarContainer");
var leftSidebars = document.getElementsByClassName("leftSidebarContainer");
var fixedElements = document.getElementsByClassName("fixedSidebar")

var sidebars = [];
for (var i = 0; i < rightSidebars.length; i++) {
    sidebars.push(rightSidebars[i]);
}
for (var i = 0; i < leftSidebars.length; i++) {
    sidebars.push(leftSidebars[i]);
}
for (var i = 0; i < fixedElements.length; i++) {
    sidebars.push(fixedElements[i]);
}


function update() {
    var userScrolled = window.scrollY;

    var visibleHeader = headerHeight - userScrolled;
    if (visibleHeader < 0) {
        visibleHeader = 0;
    }

    var pageBodyCenter = (window.innerHeight - visibleHeader) / 2 + visibleHeader;

    for (var i = 0; i < sidebars.length; i++) {
        var sidebar = sidebars[i];

        var sidebarHeight = sidebar.getBoundingClientRect().height;
        var position = pageBodyCenter - sidebarHeight / 2;

        sidebar.style.top = (position) + "px";
    }
}

window.addEventListener("scroll", update);

update()