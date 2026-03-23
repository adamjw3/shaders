const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D image;

uniform float seed;


varying vec2 v_texcoord;

vec2 aspects(vec2 uv, float texture_ratio, float canvas_ratio) {
    
    
    // if canvas is too portrait for texture stretch across x
    // else strect down y
    
    if(texture_ratio > canvas_ratio) {
        float diff = canvas_ratio / texture_ratio;
        uv.x *= diff;
        uv.x += (1.0 - diff) / 2.0;
    } else {
        float diff = texture_ratio / canvas_ratio;
        uv.y *= diff;
        uv.y += (1.0 - diff) / 2.0;
    }
    return uv;
}

void main(void)
{
    vec2 uv = v_texcoord;
    
    // flips the image round
    //uv.y = 1.0 - uv.y;
    
    // find out the aspect ratio
    
    float texture_ratio = 1200.0 / 1800.0;
    float canvas_ratio = u_resolution.x / u_resolution.y;
    
    // Copy the original coordinates system
    vec2 coords = aspects(uv, texture_ratio, canvas_ratio);
    
    
    // make safae area
    coords = mix(vec2(0.1, 0.1),vec2(0.9, 0.9), coords);
    
    // make normalize mouse
    vec2 mouse = u_mouse / u_resolution;
    
    float blocks = 12.0;
    float x = floor(uv.x * blocks) / blocks;
    float y = floor(uv.y * blocks) / blocks;
    
    vec2 distortion = 0.1 * vec2(
        sin(u_time * 0.5 + x * 1.0 + x * 1.5 + mouse.x * 2.0 + mouse.y + seed),
        cos(u_time * 0.2 + x * 1.1 + y * 2.0 + mouse.x * 2.0 + mouse.y + seed / 2.0)
    );
    
   
   //
    //float dist = distance(vec2(0.5, 0.5), uv);
    //float stregteh = smoothstep(0.6, 0.0, dist);
    
    //vec2 distortion2 = 0.1 * vec2(
      //  sin(time + stregteh * uv.y), 
        //cos(time + stregteh * uv.x)
    //);
  
    
    vec4 rgba = texture2D(image, coords + distortion);
    
    gl_FragColor = vec4(rgba);
}
`;
