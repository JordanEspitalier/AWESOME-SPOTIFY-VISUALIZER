uniform float uPitches[12];
uniform float uLoudness;
varying vec3 vPosition;
void main ()
{

    vec3 newPosition = position;
    float pitchValue = uPitches[int(uv.x * 12.0)];
    newPosition.z += sin(uv.y * 3.14) * pitchValue * uLoudness * 10.0;



    // Final Position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    vPosition = newPosition;
/*     #include <tonemapping_fragment>
    #include <colorspace_fragment> */
}