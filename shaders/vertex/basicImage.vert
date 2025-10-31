#version 300 es
in vec4 a_position;
// Add an attribute for texture coordinates
in vec2 a_texcoord; 
uniform vec2 u_resolution;
// Pass texture coordinates to the fragment shader
out vec2 v_texcoord; 

void main() {
    // We keep the position logic as before, assuming a -1 to 1 quad
    gl_Position = a_position;
    // Pass the texture coordinate to the fragment shader
    v_texcoord = a_texcoord;
}
