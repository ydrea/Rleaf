import { useEffect, useRef, useState } from 'react'
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three-stdlib'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import { useCanvasSizing } from '../../services/use-canvas-sizing/use-canvas-sizing'
import { Loader } from '../Loader/Loader'
import './SceneGLTF.sass'

type Props = {
  width?: number
  height?: number
  filePath: string
  initialPolarAngle?: number
  initialCameraPosition?: [number, number, number]
}

export const SceneGLTF = ({
  filePath,
  width = 1496,
  height = 767,
  initialPolarAngle = 0,
  initialCameraPosition = [0, 0, 0]
}: Props) => {
  const animationIdRef = useRef<number | undefined>(undefined)
  const rendererRef = useRef<WebGLRenderer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<PerspectiveCamera | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const { containerWidth, blockRef, canvasLeft } = useCanvasSizing({
    width
  })

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const scene = new Scene()
    const loader = new GLTFLoader()
    const camera = new PerspectiveCamera()
    const renderer = new WebGLRenderer({ antialias: false, alpha: true })
    const controls = new OrbitControls(camera, renderer.domElement)

    container.appendChild(renderer.domElement)

    rendererRef.current = renderer
    cameraRef.current = camera

    scene.background = null
    camera.position.set(...initialCameraPosition)
    controls.setPolarAngle(initialPolarAngle)

    loader.load(
      filePath,
      (obj) => {
        scene.add(obj.scene)
        setLoading(false)
      },
      (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100))
      }
    )

    const animate = () => {
      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()
  }, [filePath, initialCameraPosition, initialPolarAngle])

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.domElement.style.left = `${canvasLeft}px`
    }
  }, [canvasLeft])

  useEffect(() => {
    const renderer = rendererRef.current
    const container = containerRef.current
    const camera = cameraRef.current

    const handleResize = () => {
      if (!camera || !renderer) {
        return
      }

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      if (animationIdRef.current !== undefined) {
        cancelAnimationFrame(animationIdRef.current)
      }

      window.removeEventListener('resize', handleResize)

      if (container && renderer?.domElement) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [width, height])

  return (
    <div ref={blockRef} className='canvas-block scene-gltf'>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: containerWidth,
          height,
          display: loading ? 'block' : 'none'
        }}
      >
        <Loader progress={progress} />
      </div>
      <div
        ref={containerRef}
        className={`canvas-container ${loading ? 'loading' : ''}`}
        style={{ width: containerWidth, height }}
      />
    </div>
  )
}
