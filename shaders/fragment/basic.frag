#version 300 es
precision highp float;

uniform vec2 u_resolution;
out vec4 fragColor;

void main() {
    vec2 pos = gl_FragCoord.xy / u_resolution.xy;
    fragColor = vec4(pos.x, pos.y, 0.5, 1.0);
}
