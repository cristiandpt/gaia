import { Suspense, useRef, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import download from "./Smoke15Frames.png";
import * as THREE from "three";
import { useMemo } from "react";
import { noise } from "./noise.js";
import texture from "./test-3.3.png";

export function Points() {
  const tex = useLoader(THREE.TextureLoader, texture);
  tex.encoding = THREE.LinearEncoding;
  const orb = useLoader(THREE.TextureLoader, download);
  const pointsRef = useRef();

  const shader = {
    uniforms: {
      positions: {
        value: tex,
      },
      orb: {
        value: orb,
      },
    },
    vertexShader: `
    uniform sampler2D positions;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vDepth;
    attribute float index;

    vec4 Value3D_Deriv( vec3 P )
    {
        //  https://github.com/BrianSharpe/Wombat/blob/master/Value3D_Deriv.glsl
    
        // establish our grid cell and unit position
        vec3 Pi = floor(P);
        vec3 Pf = P - Pi;
        vec3 Pf_min1 = Pf - 1.0;
    
        // clamp the domain
        Pi.xyz = Pi.xyz - floor(Pi.xyz * ( 1.0 / 69.0 )) * 69.0;
        vec3 Pi_inc1 = step( Pi, vec3( 69.0 - 1.5 ) ) * ( Pi + 1.0 );
    
        // calculate the hash
        vec4 Pt = vec4( Pi.xy, Pi_inc1.xy ) + vec2( 50.0, 161.0 ).xyxy;
        Pt *= Pt;
        Pt = Pt.xzxz * Pt.yyww;
        vec2 hash_mod = vec2( 1.0 / ( 635.298681 + vec2( Pi.z, Pi_inc1.z ) * 48.500388 ) );
        vec4 hash_lowz = fract( Pt * hash_mod.xxxx );
        vec4 hash_highz = fract( Pt * hash_mod.yyyy );
    
        //	blend the results and return
        vec3 blend = Pf * Pf * Pf * (Pf * (Pf * 6.0 - 15.0) + 10.0);
        vec3 blendDeriv = Pf * Pf * (Pf * (Pf * 30.0 - 60.0) + 30.0);
        vec4 res0 = mix( hash_lowz, hash_highz, blend.z );
        vec4 res1 = mix( res0.xyxz, res0.zwyw, blend.yyxx );
        vec4 res3 = mix( vec4( hash_lowz.xy, hash_highz.xy ), vec4( hash_lowz.zw, hash_highz.zw ), blend.y );
        vec2 res4 = mix( res3.xz, res3.yw, blend.x );
        return vec4( res1.x, 0.0, 0.0, 0.0 ) + ( vec4( res1.yyw, res4.y ) - vec4( res1.xxz, res4.x ) ) * vec4( blend.x, blendDeriv );
    }

      void main () {
        vec2 myIndex = vec2((index + 0.5)/1024.,1.0);

        vec4 pos = texture2D( positions, myIndex);

        float x = (pos.x - 0.5) * 10.0;
        float y = (pos.y - 0.5) * 10.0;
        float z = (pos.z - 0.5) * 10.0;
       
        gl_PointSize =  150.0 * Value3D_Deriv(vec3(x,y,z)).r;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(x,y,z, 1.0) ;
        vNormal = normal;
        vDepth = gl_Position.z / gl_Position.w;

      }
    `,
    fragmentShader: `
    uniform sampler2D orb;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vDepth;


    ${noise}

      float rand(vec2 co, float seed) {
        float a = 12.9898;
        float b = 78.233;
        float c = 43758.5453;
        float dt= dot(co.xy ,vec2(a,b));
        float sn= mod(dt, 3.14);
        return fract(sin(sn + seed) * c);
      }

      vec2 rotateUV(vec2 uv, float rotation, vec2 mid) {
        return vec2(
          cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
          cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
        );
      }

      void main () {
        vec2 spriteSheetSize = vec2(1280.0, 768.0);   // In px
        vec2 spriteSize = vec2(256, 256.0);        // In px
        float index = 1.0;            // Sprite index in sprite sheet (0-...)
        float w = spriteSheetSize.x;
        float h = spriteSheetSize.y;

        // Normalize sprite size (0.0-1.0)
        float dx = spriteSize.x / w;
        float dy = spriteSize.y / h;

        // Figure out number of tile cols of sprite sheet
        float cols = w / spriteSize.x;

        // From linear index to row/col pair
        float col = mod(index, cols);
        float row = floor(index / cols);

        // Finally to UV texture coordinates
        vec2 uv = vec2(dx * gl_PointCoord.x + col * dx, 1.0 - dy - row * dy + dy * gl_PointCoord.y);

        float alpha = texture2D(orb, uv).a;

        //If transparent, don't draw
        if (alpha < 0.01) discard;


        vec2 tile = floor(uv);

        vec2 center = tile + vec2(0.5, 0.5);
      
        vec2 randomRotatedTileUV = rotateUV(uv ,  rand(tile, 2.0) * 20.0, center);

        vec4 color = texture2D(orb, uv);

        vec3 directionalLightDirection = vec3(1.0,0.0,0.1);
        vec3 directionalLightColor = vec3(0.2,0.2,0.2);
        vec3 ambientLightColor = vec3(0.3,0.4,0.4);
        // Calculate the direction from the point to the directional light.
        vec3 lightDirection = normalize(directionalLightDirection);

        // Calculate the diffuse lighting from the directional light.
        float diffuse = max(dot(vNormal, lightDirection), 0.0);
        vec3 diffuseColor = color.rgb * directionalLightColor;

        // Add the diffuse and ambient lighting to the output color.
        vec3 outputColor = diffuseColor + ambientLightColor;
        float noise = Perlin3D(color.rgb);

        float edgeWidth = 2.0;
        float softness = 15.0;
        // float dist = length(gl_PointCoord.xy - vec2(0.5));
        // float alphaVal = smoothstep(0.5 - edgeWidth, 0.5, dist);
        // alphaVal = pow(alpha, 1.0 / softness);

        // Calculate the distance from the particle to the geometry's surface
        float depthDiff = length(vec3(dFdx(vDepth), dFdy(vDepth), edgeWidth));
        
        // Calculate the fade factor based on the distance
        float fadeFactor = smoothstep(0.0, softness, depthDiff);

        gl_FragColor = vec4(outputColor, 1.0 * fadeFactor * gl_FragCoord.z);
      }
    `,
  };

  let [positions, indexs] = useMemo(() => {
    let positions = [...Array(3072).fill(0)];
    let index = [...Array(1024).keys()];

    return [new Float32Array(positions), new Float32Array(index)]; //merupakan array yang sesuai dengan buffer
  }, []);

  useEffect(() => {
    if (pointsRef.current) {
      console.log({ pointsRef });
    }
  }, []);

  function fogBlendFunction(
    srcColor,
    dstColor,
    distance,
    fogStart,
    fogEnd,
    fogColor,
  ) {
    let fogFactor = THREE.MathUtils.smoothstep(fogStart, fogEnd, distance);

    let noiseFactor = 120.9;
    let noise =
      0.1 + (1.0 + THREE.MathUtils.noise(distance * noiseFactor)) * 0.5;
    fogFactor *= noise;

    let blendedColor = new THREE.Color();
    blendedColor.r = THREE.MathUtils.lerp(srcColor.r, fogColor.r, fogFactor);
    blendedColor.g = THREE.MathUtils.lerp(srcColor.g, fogColor.g, fogFactor);
    blendedColor.b = THREE.MathUtils.lerp(srcColor.b, fogColor.b, fogFactor);

    let blendedAlpha = THREE.MathUtils.lerp(srcColor.a, dstColor.a, fogFactor);

    return new THREE.Color(
      blendedColor.r,
      blendedColor.g,
      blendedColor.b,
      blendedAlpha,
    );
  }

  return (
    <points ref={pointsRef} scale={[30, 30, 30]} position={[-70, 80, -150]}>
      <bufferGeometry attach="geometry" rotateX={Math.PI / 2}>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-index"
          array={indexs}
          count={indexs.length}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        attach="material"
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        uniforms={shader.uniforms}
        transparent
        sizeAttenuation={true}
        depthTest={true}
        depthFunc={THREE.Lequal}
        depthWrite={false}
        blending={THREE.CustomBlending}
        blendEquation={THREE.MultiplyOperation}
        blendSrc={THREE.SrcAlphaFactor}
        blendDst={THREE.OneMinusSrcAlphaFactor}
        blendFunc={fogBlendFunction}
        fog={true}
      />
    </points>
  );
}

function AnimationCanvas() {
  return (
    <Canvas camera={{ position: [10, 10, 0], fov: 75, near: 0.01 }}>
      <OrbitControls />
      <gridHelper />
      <Suspense fallback={"hello"}>
        <Points />
        <mesh>
          <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
        </mesh>
      </Suspense>
    </Canvas>
  );
}
