import { motion } from 'framer-motion';
import Link from 'next/link';

import { ThreeDGardenIcon, MessageIcon, VercelIcon } from './icons';


// **
// import useStore from '~/stores/store'
// **
import { 
  Canvas,
  useFrame 
} from '@react-three/fiber'
// **
import { useRef, useState } from 'react'

const BoxComponent = () => {

  // const router = useStore((s) => s.router)
  const route = '/'

  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef(null)

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current
      // @ts-expect-error
      ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.005)
      : null
  )

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <mesh
        ref={mesh}
        // onClick={() => router.push(route)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial 
          color={route === '/' ? 'darkgreen' : 'orange'}
        />
      </mesh>
      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </>
  )
}

export default BoxComponent


export const Overview = () => {
  return (
    <>
      <motion.div
        key="overview"
        className="max-w-3xl mx-auto md:mt-20"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ delay: 0.5 }}
      >
        <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
          <p className="flex flex-row justify-center gap-4 items-center">
            <ThreeDGardenIcon size={96} />
            <span>+</span>
            <VercelIcon size={64} />
            <span>+</span>
            <MessageIcon size={64} />
          </p>
          <p>
            This is an{' '}
            <Link
              className="font-medium underline underline-offset-4"
              href="https://github.com/vercel/ai-chatbot"
              target="_blank"
            >
              open source
            </Link>{' '}
            chatbot template built with Next.js and the AI SDK by Vercel,{' '}
            which is tailored for use with ThreeD apps.{' '}
            It uses the{' '}
            <code className="rounded-md bg-muted px-1 py-0.5">streamText</code>{' '}
            function in the server and the{' '}
            <code className="rounded-md bg-muted px-1 py-0.5">useChat</code> hook
            on the client to create a seamless chat experience.
          </p>
          <p>
            You can learn more about the Vercel AI SDK by visiting the{' '}
            <Link
              className="font-medium underline underline-offset-4"
              href="https://sdk.vercel.ai/docs"
              target="_blank"
            >
              docs
            </Link>
            .
          </p>
        </div>
      </motion.div>

      <Canvas>
        <BoxComponent />
      </Canvas>
    </>
  );
};
