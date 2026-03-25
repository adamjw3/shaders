const canvas = document.querySelector('canvas');
const sandbox = new GlslCanvas(canvas);

const Sizer = () => {
    let s = window.innerWidth * 0.4;
    let dpi = window.devicePixelRatio;

    canvas.width = s * dpi;
    canvas.height = s * dpi;
    canvas.style.width = s + 'px';
    canvas.style.height = s + 'px';
};

window.addEventListener('resize', Sizer);
Sizer();
sandbox.load(frag);

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset;
    let docHeight = window.innerHeight;
    let scrollPercent = scrollTop / docHeight;

    sandbox.setUniform('scroll', scrollPercent);
});
