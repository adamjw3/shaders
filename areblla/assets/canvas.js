document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelectorAll('canvas');

    canvas.forEach((c) => {
        const sandbox = new GlslCanvas(c);
        const image = c.getAttribute('data-image');

        sandbox.load(frag);

        sandbox.setUniform('image', `assets/${image}`);
        sandbox.setUniform('seed ', Math.random());

        const calcSize = () => {
            let width = c.parentElement.clientWidth;
            let height = c.parentElement.clientHeight;
            let dpi = window.devicePixelRatio;

            c.width = width * dpi;
            c.height = height * dpi;
            c.style.width = width + 'px';
            c.style.height = height + 'px';
        };

        window.addEventListener('resize', calcSize);
        calcSize();
    });
});
