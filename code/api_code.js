const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=10";
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";
const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";

const saveButtons = document.getElementsByClassName('post-favorite');
const downloadButtons = document.getElementsByClassName('download-button');
const shareButtons = document.getElementsByClassName('share-button');

const AMOUNT_IMAGES = 10;

function createImg(section, urlImage) {
    const imageContainer = document.createElement('DIV');
    imageContainer.className = "kitty-image-container";
    const img = document.createElement('IMG');
    img.className = "kitty-image";
    img.src = urlImage;
    const buttonsContainer = document.createElement('DIV');
    buttonsContainer.className = "image-buttons";
    const dowloadBTN = document.createElement('BUTTON');
    dowloadBTN.classList.add("download-button", "image-buttons__button", "image-buttons__button--download");
    const favoriteBTN = document.createElement('BUTTON');
    favoriteBTN.classList.add("post-favorite", "image-buttons__button", "image-buttons__button--favorite");
    const shareBTN = document.createElement('BUTTON');
    shareBTN.classList.add("share-button", "image-buttons__button", "image-buttons__button--share");

    imageContainer.appendChild(img);
    buttonsContainer.appendChild(dowloadBTN);
    buttonsContainer.appendChild(favoriteBTN);
    buttonsContainer.appendChild(shareBTN);
    imageContainer.appendChild(buttonsContainer);
    section.appendChild(imageContainer);
}

async function loadRandomKitties() {

    const response = await fetch(API_URL_RANDOM, {
        page: 1
    });
    const data = await response.json();

    if (response.status != 200) {
        console.log("Was an error");
    } else {
        
        for (let index = 1; index < AMOUNT_IMAGES; index++) {
            createImg(document.getElementById('random-images-container'));
        }

        const kitty_class = document.getElementsByClassName('kitty-image');
        const kitty_images = [...kitty_class];

        kitty_images.forEach((image, index) => {
            image.src = data[index].url;

            // saveButtons[index].addEventListener("click", function() {
            //     saveFavoriteKitty(data[index].id);
            //     alert("Available soon");
            // });

            // downloadButtons[index].addEventListener("click", function() {
            //     alert("Available soon");
            // });

            // shareButtons[index].addEventListener("click", function() {
            //     alert("Available soon");
            // });
        });
    }
}

async function loadFavoriteKitties() {

    const response = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'x-api-key': 'de83ee71-3a5c-4941-82f2-1b3f81ee7db5'
        }
    });
    const data = await response.json();
    
    if (response.status != 200) {
        console.log("Was an error");
    } else {
        
        const favoriteKitties = document.getElementById('favorite-images-container');
        favoriteKitties.innerHTML = "";

        data.forEach((kitty, index) => {
            createImg(favoriteKitties, kitty.image.url);

            // img.src = kitty.image.url;

            // deleteFavoriteKitty(kitty.id);
        });
    }
}

async function saveFavoriteKitty(id) {

    const response = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'de83ee71-3a5c-4941-82f2-1b3f81ee7db5'
        },
        body: JSON.stringify({
            image_id: id
        })
    });

    const data = await response.json();

    if (response.status != 200) {
        console.log("Was an error" + response.status + data.message);
    } else {
        loadFavoriteKitties();
    }
}

async function deleteFavoriteKitty(id) {
    const API_URL_FAVORITES_FOR_DELETE = `https://api.thecatapi.com/v1/favourites/${id}`;

    const response = await fetch(API_URL_FAVORITES_FOR_DELETE, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'de83ee71-3a5c-4941-82f2-1b3f81ee7db5'
        }
    });

    const data = await response.json();

    if (response.status != 200) {
        console.log("Was an error" + response.status + data.message);
    } else {
        loadFavoriteKitties();
    }
}

async function uploadKittyPhoto() {
    const form = document.getElementById('upload-form');
    const formData = new FormData(form);
    
    const response = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            'X-API-KEY':  'de83ee71-3a5c-4941-82f2-1b3f81ee7db5'
        },
        body: formData
    });

    const data = await response.json();

    if (response.status != 201) {
        console.log("Was an error when you tried upload the image " + response.status + data.message);
    } else {
        console.log("The image was upload");
        saveFavoriteKitty(data.id);
    }
}

loadRandomKitties();
loadFavoriteKitties();
