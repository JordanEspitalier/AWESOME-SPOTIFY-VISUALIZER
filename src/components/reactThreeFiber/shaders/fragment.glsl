uniform float uPitches[12];
uniform float uLoudness;
varying vec3 vPosition;
void main()
{

    // Final Color
    gl_FragColor = vec4(vPosition.z / 2.0, 0.4, 0.0, 1.0);

}