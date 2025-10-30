#version 300 es

// Set the precision for floating-point numbers.
precision mediump float;

// The interpolated UV coordinate from the vertex shader.
in vec2 v_uv;

// The output variable for the fragment's final color.
out vec4 outColor;

void main() {
  // Use the u (x) value for red and the v (y) value for green.
  outColor = vec4(v_uv.x, v_uv.y, 0.0, 1.0);
}
