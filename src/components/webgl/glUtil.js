import axios from 'axios';

/* interal functions */
async function readFile(path) {
    try{
        const res = await axios.get(path);
        return res.data;
    }
    catch{
        return null;
    }
}

/* external functions */
export async function createShader(gl, type, path) {
    let shader = gl.createShader(type);
    let source = await readFile(path);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

export async function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

export async function loadProgram(gl, fragPath, vertPath) {
    const vertexShader = await createShader(gl, gl.VERTEX_SHADER, vertPath);
    const fragmentShader = await createShader(gl, gl.FRAGMENT_SHADER, fragPath);
    const program = await createProgram(gl, vertexShader, fragmentShader);
    return program;
}

export function flatize(arr) {
    let ret = [];
    let idx = 0;
    for (const subarr of arr) {
        for(const elem of subarr)
            ret[idx++] = elem;
    }
    return ret;
}

export function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;

    if (needResize) {
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }

    return needResize;
}