uniform float uTime;
uniform float uPitches[12];
uniform float uLoudness;
varying float vElevation;
void main ()
{

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);



    float pitchValue = uPitches[int(uv.x * 12.0)];
    pitchValue *= smoothstep(4.0, 0.0, abs(sin(uTime * 10.0))) * abs(sin(modelPosition.x * 6.0 + uTime * 0.5));
    float elevation = pitchValue * uLoudness * 12.0;
    
    for(float i = 1.0; i<= 4.0; i++)
    {
        //elevation += - abs(cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
        elevation += abs(sin(modelPosition.z * 10.0 * i + uTime * 1.0));
    }


    modelPosition.y += elevation ;

    // Final Position
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;


    gl_Position = projectedPosition;
    
    //varying
    vElevation = elevation;

/*     #include <tonemapping_fragment>
    #include <colorspace_fragment> */
}