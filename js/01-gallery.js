import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector('.gallery');
const galleryMarkup = galleryItems.map(({preview, original, description}) => 
    `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>`
).join('');

galleryEl.innerHTML = galleryMarkup;
galleryEl.addEventListener('click', onImageClick);

let instance


function onImageClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    instance = basicLightbox.create(`
        <img src="${event.target.dataset.source}" width="800" height="600">
    `, {
        onShow: () => {
            escapeListener();
        },
        onClose: () => {
            removeEscClose();
        }
    });

    instance.show();    
}


function escapeListener() {
    window.addEventListener('keydown', closeWithEsc)
}


function closeWithEsc() {
        /* console.log(event.code); */ // Event listener check
        if (event.code === 'Escape') {
            instance.close();
    };
}


function removeEscClose() {
    window.removeEventListener('keydown', closeWithEsc);
}
