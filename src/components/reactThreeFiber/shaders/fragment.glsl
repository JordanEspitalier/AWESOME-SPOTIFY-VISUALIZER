uniform float uPitches[12];
uniform float uLoudness;
varying float vElevation;
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
void main()
{
    float mixStrength = (vElevation + uColorOffset ) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength );
    gl_FragColor = vec4(color, 1.0);

    float fogFactor = smoothstep( 1.0, 5.0, 3.0 );

    // final color
	gl_FragColor.rgb = mix( color, vec3(0.2), fogFactor );

}