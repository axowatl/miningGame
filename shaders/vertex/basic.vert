#version 300 es

// An attribute for vertex positions (e.g., of a quad).
in vec2 a_position;

// An attribute for UV coordinates (often called texture coordinates).
in vec2 a_uv;

// A varying variable to pass the UV coordinate to the fragment shader.
out vec2 v_uv;

void main() {
  // Pass the vertex position directly to gl_Position.
  // We assume the position is already in clip space (-1 to +1).
  gl_Position = vec4(a_position, 0.0, 1.0);
  
  // Pass the UV coordinate along.
  v_uv = a_uv;
}
