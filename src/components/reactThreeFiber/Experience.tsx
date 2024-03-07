import { OrbitControls } from '@react-three/drei'
import './experience.css'
import { Canvas} from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import Cube from './Cube'

export default function Experience () 
{


    return (
        <Canvas className="experience">
            <Perf position="top-right"/>
            <OrbitControls makeDefault/>
            <Cube />
        </Canvas>
    )
}