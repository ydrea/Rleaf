import { useCallback, useEffect, useRef } from 'react'
import type { MouseEvent, TouchEvent } from 'react'
import type { Object3D } from 'three'
import { Group, WebGLRenderer, Mesh, Scene, PerspectiveCamera, Color, EdgesGeometry } from 'three'
import { Line2, LineMaterial, LineGeometry } from 'three-stdlib'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import { useCanvasSizing } from '../../services/use-canvas-sizing/use-canvas-sizing'

const BLOCK_SIZE = 34

type Props = {
  width?: number
  height?: number
}

export const ThreeDScene = ({ width = 1259, height = 762 }: Props) => {
  const animationIdRef = useRef<number | undefined>(undefined)
  const rotationYRef = useRef<number>(-7.5)
  const groupRef = useRef<Group | null>(null)
  const rendererRef = useRef<WebGLRenderer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvas2dRef = useRef<HTMLCanvasElement>(null)
  const { windowWidth, containerWidth, blockRef, blockWidth, canvasLeft } = useCanvasSizing({
    width,
    blockSize: BLOCK_SIZE
  })

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const rect = container.getBoundingClientRect()
    const mouseX =
      'clientX' in event ? event.clientX - rect.left : event.touches[0].clientX - rect.left
    const centerX = rect.width / 2
    const deltaX = mouseX - centerX
    const rotationAmount = (deltaX / centerX) * Math.PI

    rotationYRef.current = rotationAmount
  }

  const drawGrid = useCallback(() => {
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
  }, [width, height])

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const scene = new Scene()
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new WebGLRenderer({ antialias: false, alpha: true })
    const group = new Group()
    const loader = new GLTFLoader()

    scene.background = null
    camera.position.set(0, 50, 300)
    renderer.setSize(width, height)
    group.position.set(0, -1, 0)
    scene.add(group)

    rendererRef.current = renderer
    groupRef.current = group

    container.appendChild(renderer.domElement)

    loader.load('/landscape.gltf', ({ scene: gltfScene }) => {
      group.add(gltfScene)

      gltfScene.traverse((child: Object3D) => {
        if (child instanceof Mesh) {
          const edgesGeometry = new EdgesGeometry(child.geometry)
          const lineGeometry = new LineGeometry()
          const edgeMaterial = new LineMaterial({
            color: 0xffffff,
            linewidth: 2
          })

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

    // Animation loop
    const animate = () => {
      group.rotation.y = rotationYRef.current
      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    drawGrid()

    const handleResize = () => {
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationIdRef.current !== undefined) {
        cancelAnimationFrame(animationIdRef.current)
      }

      window.removeEventListener('resize', handleResize)

      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement)
      }
    }
  }, [width, height, windowWidth, drawGrid])

  return (
    <div ref={blockRef} className='canvas-block three-d-scene'>
      <h1 style={{ left: BLOCK_SIZE + (blockWidth - containerWidth) / 2 - 3 }}>3d scene</h1>

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
