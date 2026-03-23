var canvas = document.createElement('canvas');
var sandbox = new GlslCanvas(canvas);
document.body.appendChild(canvas);

/*const sizer = () => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const dpi = window.devicePixelRatio;

    const s = Math.min(ww, wh);
    canvas.width = s * dpi;
    canvas.height = s * dpi;
    canvas.style.width = s + 'px';
    canvas.style.height = s + 'px';
};

window.addEventListener('resize', sizer);
sizer();*/

const frag = `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float seed;


varying vec2 v_texcoord;

${includes}

void main(void)
{
    vec2 uv = v_texcoord;
    
    
    // find the distance between the mouse and points

    vec2 mouse = u_mouse / u_resolution;
    float dist = distance(uv, mouse);
    float strengh = smoothstep(0.5, 0.0, dist);  

    float hue = u_time * -0.2 + seed;
    
    vec3 hsv1 = vec3(hue, 0.9, 0.85);
    vec3 hsv2 = vec3(hue + 0.07, 0.85, 0.75);
    
    vec3 rgb1 =  hsv2rgb(hsv1);
    vec3 rgb2 =  hsv2rgb(hsv2);
    
    vec4 color1 = vec4(rgb1, 1.0);
    vec4 color2 = vec4(rgb2, 1.0);
    
    float grain = rand(100.0 * uv) * mix(1.0, 0.01, strengh);
    
  
    //float f = smoothstep(0.0 * strengh, 2.0 * strengh, uv.x + noise(uv + time + rand(uv)));
    
    // make movement for fbm
    
    vec2 movement = vec2(u_time * 0.002, u_time * -0.001);
    
    movement *= rotation2d(u_time * 0.005);
    
    float f = fbm(uv + movement + seed);
    f *= 10.0;
    f += grain;
    f += u_time * 0.2;
    f = fract(f);
    
    float gap = mix(0.5, 0.1, strengh);
    float mixer = smoothstep(0.0, gap, f) - smoothstep(1.0 - gap, 1.0, f);
    
    vec4 color = mix(color1, color2, mixer);
    
    gl_FragColor  = color;
}
`;

sandbox.load(frag);
sandbox.setUniform('seed', Math.random() * 100.0);
