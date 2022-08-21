const sidenav = document.getElementById('mySidenav');

function openNav() {
    sidenav.style.width = "100%"
}

function closeNav() {
    sidenav.style.width = "0%"
}

// var slideIndex = 1;
// showDivs(slideIndex);

// function plusDivs(n) {
//     showDivs(slideIndex += n);
//     console.log(slideIndex);
// }

// function showDivs(n) {
//     var i;
//     var x = document.getElementsByClassName('kitty-image');
//     if (n > x.length) {slideIndex = 1}
//     if (n < 1) {slideIndex = x.length} ;
//     for (i = 0; i < x.length; i++) {
//         x[i].style.display = "none";
//     }
//     x[slideIndex - 1].style.display = "block";
// }

const images = document.getElementsByClassName('kitty-image');

var scrollPos = 0;

function next() {
    if (scrollPos != images.length) {
        scrollPos += 1;
    }

    if (scrollPos >= AMOUNT_IMAGES) {
        scrollPos = 0;
    }

    images[scrollPos].scrollIntoView({inline: 'center'});
}

function prev() {
    if (scrollPos != 0) {
        scrollPos -= 1;
    } 
    images[scrollPos].scrollIntoView({inline: 'center'});
}

document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowRight") {
        next();
    } else if (event.key == "ArrowLeft") {
        prev();
    }
});

