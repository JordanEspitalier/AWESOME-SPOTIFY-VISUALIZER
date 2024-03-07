import { useRef } from "react"
import { useExperienceStore } from "../../store/experience"
import { Mesh } from "three"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'


const slider = document.getElementsByClassName(' _SliderRSWP __1lztbt5')
function lerp(a:any, b:any, t:any) {
    return a + (b - a) * t;
}
function findTimbreForTime(time:any, segments:any) {
    // Iterate through each segment
    for (let i = 0; i < segments.length - 1; i++) {
        const segment = segments[i];
        const nextSegment = segments[i + 1];
        
        // Check if the current segment contains the time
        if (segment.start <= time && nextSegment.start >= time) {
            // Interpolate the timbre values
            const segmentTime = (time - segment.start) / segment.duration; // Interpolation factor for current segment
            //const nextSegmentTime = (time - nextSegment.start) / nextSegment.duration; // Interpolation factor for next segment
            
            const data : any= {
                pitches : [],
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

export default function Cube() {

    const currentTrackDuration = useExperienceStore(state => state.currentTrackDuration)
    const currentTrackSegments = useExperienceStore(state => state.currentTrackSegments)
    console.log(currentTrackSegments)
    const cube = useRef<Mesh>(null!)
    const cube1 = useRef<Mesh>(null!)
    const cube2 = useRef<Mesh>(null!)
    const cube3 = useRef<Mesh>(null!)
    const cube4 = useRef<Mesh>(null!)
    const cube5 = useRef<Mesh>(null!)
    const cube6 = useRef<Mesh>(null!)
    const cube7 = useRef<Mesh>(null!)
    const cube8 = useRef<Mesh>(null!)
    const cube9 = useRef<Mesh>(null!)
    const cube10 = useRef<Mesh>(null!)
    const cube11 = useRef<Mesh>(null!)
    const cube12 = useRef<Mesh>(null!)


    useFrame((state, delta)=>
    {
        let currentPercentage
        if(slider[0]) currentPercentage = slider[0].getAttribute('data-position')

        if(typeof(currentPercentage) === 'string' && currentPercentage != null)
        {
            const currentTime = parseFloat(currentPercentage)  * currentTrackDuration / 100
            const data = findTimbreForTime(currentTime, currentTrackSegments)
            //console.log(data)
            //console.log(currentTime)
            if(data)
            {


                    cube.current.position.y = data.pitches[0] * 5
                    cube1.current.position.y = data.pitches[1] * 5
                    cube2.current.position.y = data.pitches[2] * 5
                    cube3.current.position.y = data.pitches[3] * 5
                    cube4.current.position.y = data.pitches[4] * 5
                    cube5.current.position.y = data.pitches[5] * 5
                    cube6.current.position.y = data.pitches[6] * 5
                    cube7.current.position.y = data.pitches[7] * 5
                    cube8.current.position.y = data.pitches[8] * 5
                    cube9.current.position.y = data.pitches[9] * 5
                    cube10.current.position.y = data.pitches[10] * 5
                    cube11.current.position.y = data.pitches[11] * 5

                
            }
        }

        //FPS => 
        
    })
    const material = new THREE.MeshBasicMaterial({color : 'red'})
    const geometry = new THREE.BoxGeometry(1, 1, 1)

  return (
  <>
    <mesh ref={cube} position={[-6, 0, 0]} material={material} geometry={geometry} />
    <mesh ref={cube1} position={[-5, 0, 0]} material={material} geometry={geometry} />
    <mesh ref={cube2} position={[-4, 0, 0]} material={material} geometry={geometry} />
    <mesh ref={cube3} position={[-3, 0, 0]} material={material} geometry={geometry} />
    <mesh ref={cube4} position={[-2, 0, 0]} material={material} geometry={geometry} />
    <mesh ref={cube5} position={[-1, 0, 0]} material={material} geometry={geometry} />
    <mesh ref={cube6} position={[0, 0, 0]} material={material} geometry={geometry} />
    <mesh ref={cube7} position={[1, 0, 0]} material={material} geometry={geometry} />
    <mesh ref={cube8} position={[2, 0, 0]} material={material} geometry={geometry} />
    <mesh ref={cube9} position={[3, 0, 0]} material={material} geometry={geometry} />
    <mesh ref={cube10} position={[4, 0, 0]} material={material} geometry={geometry} />
    <mesh ref={cube11} position={[5, 0, 0]} material={material} geometry={geometry} />


</>
  )
}

