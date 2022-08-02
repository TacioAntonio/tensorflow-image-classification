let net;

const UPLOAD = document.querySelector('#animal');
const IMG =  document.querySelector('.card__image');
const LIST = document.querySelector('.card__list');

UPLOAD.addEventListener('change', async function(event) {
    const { target } = event;
    const blobFile = target?.files[0],
          nameFile = blobFile?.name;

    const reader = new FileReader();

    const readerLoadend =  () => {
        IMG.src = reader.result?.toString();
        IMG.value = nameFile;
        
        reader.removeEventListener('loadend', readerLoadend);
    }

    reader.addEventListener('loadend', readerLoadend);
    reader.readAsDataURL(blobFile);

    net = await mobilenet.load();
    const result = await net.classify(IMG);
    handleList(result)
    IMG.value = '';
});

function handleList(result) {
    LIST.innerHTML = '';
    
    result.forEach(({ className, probability }) => {
        LIST.innerHTML += `<li class="card__item">Classification: ${className} - Probility: ${probability}</li>`;
    });
}