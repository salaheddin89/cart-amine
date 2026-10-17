// Place port1, port2, port3, ... beside index.html, with no gaps or fixed limit.
// Supported extensions: jpg, jpeg, png, webp (lowercase).
(() => {
    const gallery = document.getElementById('gallery');
    function findPhoto(number) {
        const extensions = ['jpg', 'jpeg', 'png', 'webp'];
        return new Promise(resolve => {
            function attempt(index) {
                if (index === extensions.length) { resolve(null); return; }
                const image = new Image();
                image.onload = () => resolve({src:image.src, alt:'من أعمال AD Doors — ' + number});
                image.onerror = () => attempt(index + 1);
                image.src = 'port' + number + '.' + extensions[index];
            }
            attempt(0);
        });
    }
    let started = false;
    function appendPhoto(photo) {
            if (!started) {
                gallery.replaceChildren();
                document.getElementById('gallery-note').hidden = false;
                started = true;
            }
            const button = document.createElement('button');
            button.type = 'button'; button.className = 'work-tile';
            button.setAttribute('aria-label', 'تكبير ' + photo.alt);
            const image = document.createElement('img');
            image.src = photo.src; image.alt = photo.alt; image.loading = 'lazy';
            button.append(image);
            button.onclick = () => {
                const large = document.getElementById('large-photo');
                large.src = photo.src; large.alt = photo.alt;
                document.getElementById('photo-dialog').showModal();
            };
            gallery.append(button);
    }
    async function loadPhotos() {
        workshop.photos.forEach(appendPhoto);
        for (let number = 1; ; number++) {
            const photo = await findPhoto(number);
            if (!photo) break;
            appendPhoto(photo);
        }
    }
    loadPhotos();
})();
