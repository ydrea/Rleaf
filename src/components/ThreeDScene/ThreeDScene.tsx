import { useEffect, useRef } from 'react'
import type { MouseEvent, TouchEvent } from 'react'
import type { Object3D } from 'three'
import { Group, WebGLRenderer, Mesh, Scene, PerspectiveCamera, Color, EdgesGeometry } from 'three'
import { Line2, LineMaterial, LineGeometry } from 'three-stdlib'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import { useCanvasSizing } from '../../services/use-canvas-sizing/use-canvas-sizing'

export const ThreeDScene = () => {
  const animationIdRef = useRef<number | undefined>(undefined)
  const rotationYRef = useRef<number>(-7.5)
  const groupRef = useRef<Group | null>(null)
  const rendererRef = useRef<WebGLRenderer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { containerWidth, blockRef } = useCanvasSizing()

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

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const scene = new Scene()
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new WebGLRenderer({ antialias: false })
    const group = new Group()
    const loader = new GLTFLoader()

    scene.background = new Color(0xffffff)
    camera.position.set(0, 50, 300)
    renderer.setSize(container.clientWidth, 600)
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

    const handleResize = () => {
      camera.aspect = container.clientWidth / 600
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, 600)
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
  }, [])

  return (
    <div ref={blockRef} className='canvas-block'>
      <h1>3d scene</h1>

      <div
        ref={containerRef}
        className='canvas-container'
        style={{ width: containerWidth, minWidth: '100%', height: 600 }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      />
    </div>
  )
}
