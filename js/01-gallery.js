import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector('.gallery');
// const lbxVisible = basicLightbox.visible()

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


function onImageClick(event) {
    event.preventDefault();
    console.log(event.target.nodeName);
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const instance = basicLightbox.create(`
        <img src="${event.target.dataset.source}" width="800" height="600">
    `, {
        onShow: (instance) => {
            console.log('Open'); onModalOpen(instance);
        },
        onClose: () => {
            console.log('Close'); window.removeEventListener('keydown', closeWithEsc);
        }
    });

    instance.show();    
}

function onModalOpen(instance) {
    window.addEventListener('keydown', (event) => {
        console.log(event.code);
        if (event.code === 'Escape') {
            instance.close();
        }
    });
}

function removeEscClose() {
    window.removeEventListener('keydown', onEscPress);
}

function onModalClose(event) {
    console.log(event);
    removeEscClose();
}
