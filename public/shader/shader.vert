attribute vec4 a_position;

uniform mat4 aspect_matrix;
uniform mat4 model_matrix;

void main() {

    gl_Position = aspect_matrix * model_matrix * a_position;
}