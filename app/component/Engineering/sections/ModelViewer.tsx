import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

interface Props {
  url: string
  position?: [number, number, number]
  scale?: number
}

export default function ModelViewer({ url, position = [0, 0, 0], scale = 1 }: Props) {
  const ref = useRef<Group>(null)
  const { scene } = useGLTF(url)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003
    }
  })

  return (
    <primitive
      object={scene}
      ref={ref}
      position={position}
      scale={[scale, scale, scale]}
    />
  )
}
