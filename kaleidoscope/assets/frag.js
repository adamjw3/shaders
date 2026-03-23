const shaderCode = `
precision mediump float;
#define SEGMENTS 12.0
#define PI 3.14159265358979323846



uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;


uniform sampler2D trials;


varying vec2 v_texcoord;

void main(void)
{
    vec2 uv = v_texcoord;
    
    uv *= 2.0;
    uv -= 1.0;

    vec2 mouse = u_mouse / u_resolution;
    mouse *= 2.0;
    mouse -= 1.0;
    
    // get the angle radius
    float radius = length(uv) * mix(mouse.x, 1.0, 2.0);
    float angle = atan(uv.y, uv.x);
    
    // get a segment
    angle /= PI * 2.0 ;
    angle *= SEGMENTS;
    
    
    // repeat.segments
    
    if(mod(angle, 2.0) >= 1.0) {
        angle = fract(angle);
    } else  {
        angle = 1.0 - fract(angle);
    }
    angle += u_time;
    angle = mouse.y * 0.5 + angle * 0.5;
    
    // unsquash segment
    angle /= SEGMENTS;
    angle *= PI * 2.0;
    
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    point = fract(point);
    
    
    vec4 color = texture2D(trials, point);
    
    gl_FragColor = color;
}
`;
