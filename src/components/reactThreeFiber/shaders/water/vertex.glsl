uniform float uTime;
uniform float uPitches[12];
uniform float uLoudness;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallIterations;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/perlinClassic3D.glsl

float waveElevation(vec3 position)
{
    float elevation = sin(position.x * uBigWavesFrequency.x * (uPitches[3] + uPitches[4] + uPitches[5]) + uTime * uBigWavesSpeed) *
                    sin(position.z * uBigWavesFrequency.y * (uPitches[0] + uPitches[1] + uPitches[2]) + uTime * uBigWavesSpeed) *
                    uBigWavesElevation;

    for(float i = 1.0; i <= uSmallIterations; i++)
    {
               elevation -= abs(perlinClassic3D(vec3(position.xz * uSmallWavesFrequency * (max(0.4, uPitches[9] + uPitches[10] + uPitches[11])) * i, uTime * uSmallWavesSpeed * (uPitches[6] + uPitches[7] + uPitches[8]))) * uSmallWavesElevation / i);
    }
    //elevation *= uLoudness * abs((sin(uTime + uLoudness)) - 0.5) + 0.5 * abs((sin((uTime * uLoudness) + uTime)) - 0.5) + 0.5;
    return elevation;
}

void main()
{

    // Base position
    float shift = 0.01;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec3 modelPositionA = modelPosition.xyz + vec3(shift, 0.0, 0.0);
    vec3 modelPositionB = modelPosition.xyz + vec3(0.0, 0.0, - shift);

    // Elevation
    float elevation = waveElevation(modelPosition.xyz);
    modelPosition.y += elevation;
    modelPositionA.y += waveElevation(modelPositionA);
    modelPositionB.y += waveElevation(modelPositionB);

    // Compute normal
    vec3 toA = normalize(modelPositionA - modelPosition.xyz);
    vec3 toB = normalize(modelPositionB - modelPosition.xyz);
    vec3 computeNormal = cross(toA, toB);

    // Final position
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Varyings
    vElevation = elevation;
    vNormal = computeNormal;
    vPosition = modelPosition.xyz;
}