import { useEffect, useRef } from 'react'
import type { MouseEvent, TouchEvent } from 'react'
import type { Object3D } from 'three'
import {
  Group,
  WebGLRenderer,
  Mesh,
  Scene,
  PerspectiveCamera,
  EdgesGeometry,
  DoubleSide
} from 'three'
import { Line2, LineMaterial, LineGeometry, OrbitControls } from 'three-stdlib'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { degToRad } from 'three/src/math/MathUtils.js'

import { useCanvasSizing } from '../../services/use-canvas-sizing/use-canvas-sizing'

const BLOCK_SIZE = 34

type Props = {
  width?: number
  height?: number
}

export const ThreeDScene = ({ width = 1499, height = 749 }: Props) => {
  const animationIdRef = useRef<number | undefined>(undefined)
  const rotationYRef = useRef<number>(0)
  const groupRef = useRef<Group | null>(null)
  const rendererRef = useRef<WebGLRenderer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvas2dRef = useRef<HTMLCanvasElement>(null)
  const cameraRef = useRef<PerspectiveCamera | null>(null)
  const { containerWidth, blockRef, blockWidth, canvasLeft } = useCanvasSizing({
    width,
    blockSize: BLOCK_SIZE
  })

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const rect = container.getBoundingClientRect()
    const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX
    const centerX = rect.width / 2
    const deltaX = clientX - rect.left - centerX

    rotationYRef.current = (deltaX / centerX) * Math.PI
  }

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const scene = new Scene()
    const group = new Group()
    const loader = new GLTFLoader()
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new WebGLRenderer({ antialias: false, alpha: true })
    const controls = new OrbitControls(camera, renderer.domElement)

    container.appendChild(renderer.domElement)

    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.minDistance = 350
    controls.maxDistance = 500
    controls.enableZoom = true
    controls.enablePan = false
    controls.enableRotate = false

    rendererRef.current = renderer
    groupRef.current = group
    cameraRef.current = camera

    scene.background = null
    camera.position.set(0, 0, 550)

    loader.load('/landscape.gltf', (obj) => {
      group.add(obj.scene)
      group.position.set(0, -100, 0)
      scene.add(group)

      obj.scene.traverse((child: Object3D) => {
        if (child instanceof Mesh) {
          child.material.side = DoubleSide

          child.scale.set(2.5, 1, 1.5)

          const lineGeometry = new LineGeometry()
          const edgesGeometry = new EdgesGeometry(child.geometry)
          const edgeMaterial = new LineMaterial({ color: 0xffffff, linewidth: 2 })

          const positions = edgesGeometry.attributes.position.array
          lineGeometry.setPositions(positions as Float32Array)

          const edges = new Line2(lineGeometry, edgeMaterial)
          edges.position.copy(child.position)
          edges.rotation.copy(child.rotation)
          edges.scale.copy(child.scale)
          group.add(edges)
        }
      })
    })

    const animate = () => {
      group.rotation.y = rotationYRef.current
      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()
  }, [])

  useEffect(() => {
    const renderer = rendererRef.current

    if (!renderer) {
      return
    }

    renderer.domElement.style.left = `${canvasLeft}px`
  }, [canvasLeft])

  useEffect(() => {
    const renderer = rendererRef.current
    const container = containerRef.current
    const camera = cameraRef.current

    const handleResize = () => {
      const ctx = canvas2dRef.current?.getContext('2d')

      if (!ctx) {
        return
      }

      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 0.5
      ctx.strokeStyle = '#000000'

      ctx.translate(0.5, 0.5)

      // grid lines
      for (let x = 0; x < width; x += BLOCK_SIZE) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = 0; y < height; y += BLOCK_SIZE) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      ctx.translate(-0.5, -0.5)

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

      if (container && renderer) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [width, height])

  return (
    <div ref={blockRef} className='canvas-block three-d-scene'>
      <h1 style={{ left: BLOCK_SIZE * 3 + (blockWidth - containerWidth) / 2 - 3 }}>3d scene</h1>

      <div
        ref={containerRef}
        className='canvas-container'
        style={{ width: containerWidth, height }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      >
        <canvas
          ref={canvas2dRef}
          width={width}
          height={height}
          style={{ left: canvasLeft, width, height }}
        />
      </div>
    </div>
  )
}
