import {flatize} from './glUtil';
import {vec2, glMatrix} from 'gl-matrix';

export default class Circle {
    static create(gl, radius, detail) {
        let vertex=[];
        let index=[];
        const diffAngle = glMatrix.toRadian(360 / detail);
        vertex.push(vec2.create());
        for(let i = 0; i <= detail; i++) {
            const curAngle = diffAngle * i;
            vertex.push(vec2.fromValues(radius * Math.cos(curAngle), radius * Math.sin(curAngle)));
            index[i*3] = i+1;
            index[i*3+1] = i+2;
            index[i*3+2] = 0;
        }
        const VAO = gl.createVertexArray();
        gl.bindVertexArray(VAO);
        
        const VBO = gl.createBuffer();
        const EBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EBO);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flatize(vertex)), gl.STATIC_DRAW);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);
        
        return VAO;
    }   
}