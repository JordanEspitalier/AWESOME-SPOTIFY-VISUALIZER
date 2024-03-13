import { OrbitControls } from '@react-three/drei'
import './experience.css'
import { Canvas} from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import Cube from './Cube'

export default function Experience () 
{


    return (
        <Canvas 
            className="experience"
            camera={
                {
                    fov : 75,
                    near: 0.1,
                    far : 20,
                    position : [1, 1, 1]
                }}
        >
            <Perf position="bottom-left"/>
            <OrbitControls makeDefault/>
            <Cube />
        </Canvas>
    )
}