import { Container } from '../../components/Container/Container'
import { SceneGLTF } from '../../components/SceneGLTF/SceneGLTF'

export const ThreeDScenes = () => {
  return (
    <Container className='three-d-scenes container'>
      <h1 style={{ marginTop: 80 }}>3D Scene</h1>
      <SceneGLTF
        filePath='/wd.gltf'
        initialPolarAngle={Math.PI / -2}
        initialCameraPosition={[0, 0, 5]}
      />
    </Container>
  )
}
