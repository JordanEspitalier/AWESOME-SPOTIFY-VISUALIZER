
import { useExperienceStore } from "../../store/experience"
import { Mesh } from "three"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import visualizerFragmentShader from './shaders/fragment.glsl'
import visualizerVertexShader from './shaders/vertex.glsl'



const slider = document.getElementsByClassName(' _SliderRSWP __1lztbt5')
function lerp(a:any, b:any, t:any) {
    //return a
    return a + (b - a) * t;
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
                loudness : remapValue(parseInt(segments[i].loudness_start), -60, 0, 0, 1) 
            }

            // Perform linear interpolation for each pitch value
            for (let j = 0; j < segment.pitches.length; j++) {
                //const interpolatedTimbreValue = lerp(segment.timbre[j], nextSegment.timbre[j], segmentTime);
                //data.timbres.push(interpolatedTimbreValue);
                const interpolatedPitchValue = lerp(segment.pitches[j], nextSegment.pitches[j], segmentTime);
                data.pitches.push(interpolatedPitchValue);
            }
            
            return data;
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
        wireframe : true,
        uniforms : 
        {
            uPitches : new THREE.Uniform([0.0, 0.5, 0.6, 0.7, 0.1, 0, 0.7, 0.35, 0, 0.3, 0.1, 1.0]),
            uLoudness : new THREE.Uniform(0)
        }
    },

)


const geometry = new THREE.PlaneGeometry(10, 4, 32, 16)


export default function Cube() {

    const currentTrackDuration = useExperienceStore(state => state.currentTrackDuration)
    const currentTrackSegments = useExperienceStore(state => state.currentTrackSegments)
    console.log(currentTrackSegments)


    useFrame((state, delta)=>
    {
        let currentPercentage
        if(slider[0]) currentPercentage = slider[0].getAttribute('data-position')

        if(typeof(currentPercentage) === 'string' && currentPercentage != null)
        {
            const currentTime = parseFloat(currentPercentage)  * currentTrackDuration / 100
            const data = findDataForTime(currentTime, currentTrackSegments)
            //console.log(data)
            //console.log(currentTime)
            if(data)
            {


                    visualiserMaterial.uniforms.uPitches.value = data.pitches
                    console.log(data)
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

