
import { useExperienceStore } from "../../store/experience"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import visualizerFragmentShader from './shaders/water/fragment.glsl'
import visualizerVertexShader from './shaders/water/vertex.glsl'
import { useControls } from 'leva'


const slider = document.getElementsByClassName(' _SliderRSWP __1lztbt5')
function lerp(a:any, b:any, t:any, elapsedTime : any) {
    //return a
    return (a + (b - a) * t) ;
}
function remapValue(number:any, originalMin:any, originalMax:any, newMin:any, newMax:any) {
    const percentage = (number - originalMin) / (originalMax - originalMin);
    return newMin + (newMax - newMin) * percentage;
}
function findDataForTime(time:any, segments:any) {
    // Iterate through each segment
    for (let i = 0; i < segments.length - 1; i++) {
        const segment = segments[i];
        const nextSegment = segments[i + 1];
        
        // Check if the current segment contains the time
        if (segment.start <= time && nextSegment.start >= time) {
            // Interpolate the timbre values
            const segmentTime = (time - segment.start) / segment.duration; // Interpolation factor for current segment
            //console.log(segmentTime)
            //const nextSegmentTime = (time - nextSegment.start) / nextSegment.duration; // Interpolation factor for next segment
            
            const data : any= {
                pitches : [],
                nextPitches : [],
                loudness : remapValue(parseInt(segments[i].loudness_start), -60, 0, 0, 1) 
            }

            data.pitches = segment.pitches
            data.nextPitches = nextSegment.pitches
            return data
        }
    }
    return null; // Return null if no timbre data found for the given time
}



//             uPitches : new THREE.Uniform([0.2, 1, 0.4, 0, 0, 0, 0, 0, 0, 0, 0, 0])

const visualiserMaterial = new THREE.ShaderMaterial(
    {
        fragmentShader : visualizerFragmentShader,
        vertexShader : visualizerVertexShader,
        side : THREE.DoubleSide,
        wireframe : false,
        uniforms : 
        {
            uTime : new THREE.Uniform(0),
            uPitches : new THREE.Uniform([0.0, 0.5, 0.6, 0.7, 0.1, 0, 0.7, 0.35, 0, 0.3, 0.1, 1.0]),
            uLoudness : new THREE.Uniform(0),
            uBigWavesElevation: { value: 0.2 },
            uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
            uBigWavesSpeed: { value: 0.75 },
    
            uSmallWavesElevation: { value: 0.15 },
            uSmallWavesFrequency: { value: 3 },
            uSmallWavesSpeed: { value: 0.2 },
            uSmallIterations: { value: 2 },
    
            uDepthColor: { value: new THREE.Color('#ff4000') },
            uSurfaceColor: { value: new THREE.Color('#151c37') },
            uColorOffset: { value: 0.925 },
            uColorMultiplier: { value: 1 }
        }
    },

)


const geometry = new THREE.PlaneGeometry(2, 2, 512, 512)


export default function Cube() {

    const currentTrackDuration = useExperienceStore(state => state.currentTrackDuration)
    const currentTrackSegments = useExperienceStore(state => state.currentTrackSegments)
    //console.log(currentTrackSegments)
    const controls = useControls({
        uBigWavesElevation : 
        {
            value : 0.2,
            min : 0,
            max : 1,
            step : 0.01
        },
        uBigWavesFrequencyX : 
        {
            value : 4,
            min : 0,
            max : 10,
            step : 0.01
        },
        uBigWavesFrequencyY : 
        {
            value : 1.5,
            min : 0,
            max : 10,
            step : 0.01
        },
        uBigWavesSpeed : 
        {
            value : 0.75,
            min : 0,
            max : 4,
            step : 0.01
        },
        uSmallWavesElevation : 
        {
            value : 0.15,
            min : 0,
            max : 1,
            step : 0.01
        },
        uSmallWavesFrequency : 
        {
            value : 3,
            min : 0,
            max : 30,
            step : 0.01
        },
        uSmallWavesSpeed : 
        {
            value : 0.2,
            min : 0,
            max : 4,
            step : 0.01
        },
        uSmallIterations : 
        {
            value : 2,
            min : 0,
            max : 4,
            step : 1
        },
    })
    visualiserMaterial.uniforms.uBigWavesElevation.value = controls.uBigWavesElevation
    visualiserMaterial.uniforms.uBigWavesFrequency.value = new THREE.Vector2(controls.uBigWavesFrequencyX, controls.uBigWavesFrequencyY)
    visualiserMaterial.uniforms.uBigWavesSpeed.value = controls.uBigWavesSpeed
    visualiserMaterial.uniforms.uSmallWavesElevation.value = controls.uSmallWavesElevation
    visualiserMaterial.uniforms.uSmallWavesFrequency.value = controls.uSmallWavesFrequency
    visualiserMaterial.uniforms.uSmallWavesSpeed.value = controls.uSmallWavesSpeed
    visualiserMaterial.uniforms.uSmallIterations.value = controls.uSmallIterations

    useFrame((state, delta)=>
    {
        let currentPercentage
        visualiserMaterial.uniforms.uTime.value = state.clock.elapsedTime
        if(slider[0]) currentPercentage = slider[0].getAttribute('data-position')

        if(typeof(currentPercentage) === 'string' && currentPercentage != null)
        {
            const currentTime = parseFloat(currentPercentage)  * currentTrackDuration / 100
            const data = findDataForTime(currentTime, currentTrackSegments)
            //console.log(data)
            //console.log(currentTime)
            if(data)
            {
                    const pitches = []
                    for (let j = 0; j < data.pitches.length; j++) {
                        const interpolatedPitchValue = lerp(data.pitches[j], data.nextPitches[j], 0.5, state.clock.elapsedTime);
                        pitches.push(interpolatedPitchValue);
                    }

                    visualiserMaterial.uniforms.uPitches.value = pitches
                    visualiserMaterial.uniforms.uLoudness.value = data.loudness
                    
            }
        }

        
    })




  return (
    <>
        <mesh position={[0, 0, 0]} geometry={geometry} material={visualiserMaterial} rotation-x={-Math.PI / 2}/>
    </>
  )
}

