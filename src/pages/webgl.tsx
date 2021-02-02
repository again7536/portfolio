import React, {useRef, useEffect} from 'react';
import {loadProgram, resizeCanvasToDisplaySize, flatize} from '../components/webgl/glUtil';
import {mat4, vec2, vec3} from 'gl-matrix';
import Circle from '../components/webgl/circle';

export default function WebGLtest() {
    const canvasRef = useRef<HTMLCanvasElement>();

    const fragPath = '/shader/shader.frag';
    const vertPath = '/shader/shader.vert';

    const detail = 36;

    useEffect(()=>{
        const gl = canvasRef.current.getContext("webgl2");
        const circle = Circle.create(gl, 0.3, detail);
        loadProgram(gl, fragPath, vertPath).then(program => draw(gl, circle, program));
    }, []);

    return(
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

async function draw(gl, circle, program) {
    const positionAttrLoc = gl.getAttribLocation(program, "a_position");
    const uniformLoc = gl.getUniformLocation(program, "aspect_matrix");
    const modelLoc = gl.getUniformLocation(program, "model_matrix");

    resizeCanvasToDisplaySize(gl.canvas);
    const aspect = gl.canvas.height/gl.canvas.width;
    const aspectMatrix = mat4.fromValues(
        Math.min(1.0, aspect),0,0,0, 
        0,Math.min(1.0, 1/aspect),0,0, 
        0,0,1,0, 
        0,0,0,1
    );
    let modelMatrix = mat4.create();
    mat4.fromTranslation(modelMatrix, vec3.fromValues(0.5, 0, 0));

    /* initialize */
    gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /* draw circle */
    gl.bindVertexArray(circle);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttrLoc);
    gl.vertexAttribPointer(positionAttrLoc, 2, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(uniformLoc, false, aspectMatrix);
    gl.uniformMatrix4fv(modelLoc, false, modelMatrix);
    gl.drawElements(gl.TRIANGLES, 108, gl.UNSIGNED_SHORT, 0);

    /* loop */
    window.requestAnimationFrame(()=>draw(gl, circle, program));
} 






