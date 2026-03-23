const canvas = document.getElementById('kaleidoscope');
const sandbox = new GlslCanvas(canvas);

const calcSize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpi = window.devicePixelRatio;

    let s = Math.max(width, height) * dpi;
    canvas.width = s;
    canvas.height = s;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
};
calcSize();
window.addEventListener('resize', calcSize);

sandbox.load(shaderCode);

const images = ['./assets/light.jpg', './assets/flowers.jpg', './assets/download.jpg'];

let currentImage = 0;

window.addEventListener('click', () => {
    currentImage++;
    if (currentImage >= images.length) {
        currentImage = 0;
    }
    sandbox.setUniform('trials', images[currentImage]);
});

sandbox.setUniform('trials', images[currentImage]);
