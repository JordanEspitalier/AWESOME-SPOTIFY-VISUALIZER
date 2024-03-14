
import { useExperienceStore } from "../../store/experience"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import visualizerFragmentShader from './shaders/water/fragment.glsl'
import visualizerVertexShader from './shaders/water/vertex.glsl'
import { useControls } from 'leva'
import { useState } from "react"


const slider = document.getElementsByClassName(' _SliderRSWP __1lztbt5')

function lerp(a:any, b:any, t:any) {

    return (a + (b - a) * t) ;
}
function remapValue(number:any, originalMin:any, originalMax:any, newMin:any, newMax:any) {
    const percentage = (number - originalMin) / (originalMax - originalMin);
    return newMin + (newMax - newMin) * percentage;
}
function findDataForTime(time:any, segments:any, iterationPassed : number, setIterationPassed : any) {
    // Iterate through each segment, start where the last loop stop to increase perfs
    for (let i = 0 + iterationPassed; i < segments.length - 1; i++) {
        const segment = segments[i];
        const nextSegment = segments[i + 1];
        // Check if the current segment contains the time
        if (segment.start <= time && nextSegment.start >= time) {
            
            const data : any= {
                pitches : [],
                nextPitches : [],
                loudness : remapValue(parseInt(segments[i].loudness_start), -60, 0, 0, 1) 
            }

            data.pitches = segment.pitches
            data.nextPitches = nextSegment.pitches
            setIterationPassed(i)
            return data
        }
    }
    return null; // Return null if no data found for the given time
}


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


const geometry = new THREE.PlaneGeometry(2.5, 2.5, 512, 512)


export default function Cube() {

    const currentTrackDuration = useExperienceStore(state => state.currentTrackDuration)
    const currentTrackSegments = useExperienceStore(state => state.currentTrackSegments)


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
            value : 0.5,
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
            value : 1.5,
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
            value : 3,
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

    const currentTrackTempo = useExperienceStore(state => state.currentTrackTempo)
    // Calculate the timing interval in seconds (60 mean each 4 time per musure * 2 : 2 time and * 4 1 time)
    const timmingInterval = 60 * 2 / currentTrackTempo
    // Track elapsed time
    const [trackElapsedTime, setTrackElapsedTime] = useState(0)

    const updateTrackElapsedTimeAndSendDataToShaders = (deltaTime : any, data : any, shaderMaterial : any) => {
        // Increment elapsed time by the time passed since the last update
        setTrackElapsedTime(trackElapsedTime + deltaTime)

        // Check if a beat has occurred (elapsed time is a multiple of timing interval)

        if(trackElapsedTime >= timmingInterval) {
            // Trigger data sending to shaders
            shaderMaterial.uniforms.uPitches.value = data.pitches
            shaderMaterial.uniforms.uLoudness.value = data.loudness

            // Subtract timing interval from elapsed time to keep it in sync with the next beat
            setTrackElapsedTime(trackElapsedTime - timmingInterval)

        }
    }

    const [iterationPassed, setIterationPassed] = useState(0)

    useFrame((state, delta)=>
    {
        let currentPercentage
        visualiserMaterial.uniforms.uTime.value = state.clock.elapsedTime
        // Get percentage of the track if there is the audioPlayer running
        if(slider[0]) currentPercentage = slider[0].getAttribute('data-position')

        if(typeof(currentPercentage) === 'string' && currentPercentage != null)
        {
            // Get the current time in second
            const currentTime = parseFloat(currentPercentage)  * currentTrackDuration / 100
            // Find data relaite to the actual time of the music
            const data = findDataForTime(currentTime, currentTrackSegments, iterationPassed, setIterationPassed)
            // If there is data trigger the data sending to the shaders according to the tempo
            if(data) updateTrackElapsedTimeAndSendDataToShaders(delta, data, visualiserMaterial)
            
        }

        // Camera rotation
        state.camera.lookAt(new THREE.Vector3(0, -0.6, 0))
        state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.2)
        state.camera.position.z = Math.cos(state.clock.elapsedTime * 0.2)
    })

  return (
    <>
        <mesh position={[0, 0, 0]} geometry={geometry} material={visualiserMaterial} rotation-x={-Math.PI / 2}/>
    </>
  )
}

