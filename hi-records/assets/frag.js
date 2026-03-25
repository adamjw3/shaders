const frag = `#ifdef GL_ES
precision highp float;
#endif

#define MAX 3

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform float scroll;

varying vec2 v_texcoord;

${includes}

vec4 sampleColor(vec4 colors[MAX], int index) {
    for (int i = 0; i < MAX; i++) {
    
        if(i == index) {
            return colors[i];
        }
    }
}


void main(void)
{
    vec2 uv = -1.0 + 2.0 * v_texcoord;
    
    vec4 background = vec4(0.0, 0.0, 0.0, 1.0);
    
    vec4 innerColors[3];
    vec4 midColors[3];
    vec4 outerColors[3];
    
    innerColors[0] = vec4(0.977, 0.989, 0.641, 1.0);
    midColors[0] = vec4(1.000, 0.713, 0.216, 1.0);
    outerColors[0] = vec4(1.000, 0.245, 0.226, 1.0);
    
    innerColors[1] = vec4(1.000, 0.713, 0.216, 1.0);
    midColors[1] = vec4(0.730, 0.901, 0.201, 1.0);
    outerColors[1] = vec4(0.533, 0.941, 1.000, 1.0);
    
    innerColors[2] = vec4(1.000, 0.245, 0.226, 1.0);
    midColors[2] = vec4(0.071, 0.557, 0.300, 1.0);
    outerColors[2] = vec4(0.000, 0.206, 0.758, 1.0);
    
    int lowerIndex = int(floor(scroll));
    int upperIndex = int(ceil(scroll));
    float mixer = fract(scroll);
    mixer = smoothstep(0.1, 0.9, mixer);
     
    vec4 innerColor = mix(
        sampleColor(innerColors, lowerIndex), 
        sampleColor(innerColors, upperIndex), 
        mixer);
    vec4 midColor =  mix(
        sampleColor(midColors, lowerIndex), 
        sampleColor(midColors, upperIndex), 
        mixer);
    vec4 outerColor = mix(
        sampleColor(outerColors, lowerIndex), 
        sampleColor(outerColors, upperIndex), 
        mixer);
    
    vec2 innerPoint = vec2(0.0, 0.0) + 0.25;
    vec2 midPoint = innerPoint + 0.2 * vec2(cos(u_time), sin(u_time));
    vec2 outerPoint = vec2(0.0, 0.0);
    
    float innerDist = distance(uv, innerPoint);
    float midDist = distance(uv, midPoint);
    float outerDist = distance(uv, outerPoint);
    
    
    float grain = mix(0.1, 1.1, rand(uv));
    
    float innerStep = smoothstep(0.0, 1.0, innerDist);
    float midStep = smoothstep(0.0, 1.5, midDist * grain);
    float outerStep = step(1.0, outerDist);
    
    vec4 color = mix(innerColor, midColor, innerStep + grain);
    color = mix(color, outerColor, midStep);
    color = mix(color, background, outerStep);
    
    float disc = fract(outerDist * 50.0) * (2.0 + sin(grain));;
    float mixDisc = smoothstep(0.0, 0.2, disc) - smoothstep(0.7, 0.8, disc);
    
    color = mix(background, color, mixDisc);
    
    gl_FragColor = color;
}
`;
