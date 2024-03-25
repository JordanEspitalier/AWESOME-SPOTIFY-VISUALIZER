import { OrbitControls } from '@react-three/drei'
import './experience.css'
import { Canvas} from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import AudioVisualizer from './AudioVisualizer'

export default function Experience () 
{


    return (
        <Canvas 
            className="experience"
            camera={
                {
                    fov : 90,
                    near: 0.1,
                    far : 15,
                    position : [1, 0.5, 1],
                }}
        >
{/*             <Perf position="bottom-left"/> */}
            <OrbitControls makeDefault/>
            <AudioVisualizer />
        </Canvas>
    )
}