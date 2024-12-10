import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface VideoTextureProps extends THREE.MeshStandardMaterialParameters {
  videoSrc: string;
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
}

const VideoTexture: React.FC<VideoTextureProps> = ({
  videoSrc,
  position,
  scale,
  rotation,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (videoRef.current) {
      const texture = new THREE.VideoTexture(videoRef.current);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;

      if (meshRef.current) {
        meshRef.current.material.map = texture;
        meshRef.current.material.needsUpdate = true;
      }
    }
  }, [videoSrc]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...position);
      meshRef.current.scale.set(...scale);
      meshRef.current.rotation.set(...rotation);
    }
  });

  return (
    <>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        style={{ display: "none" }}
      />
      <mesh ref={meshRef} {...props}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default VideoTexture;
