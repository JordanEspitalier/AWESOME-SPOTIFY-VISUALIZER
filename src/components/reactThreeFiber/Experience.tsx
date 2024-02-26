import { OrbitControls } from '@react-three/drei'
import './experience.css'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'

export default function Experience () 
{

    return (
        <Canvas className="experience">
            <Perf position="top-right"/>
            <OrbitControls makeDefault/>
            <mesh>
                <boxGeometry args={[1, 1, 1]}/>
                <meshBasicMaterial color={'red'} />
            </mesh>
        </Canvas>
    )
}