import {
	EffectComposer,
	HueSaturation,
	DepthOfField,
	Bloom,
	Noise,
	Vignette,
} from "@react-three/postprocessing";

const PostProcessing = () => {
	return (
		<EffectComposer>
			{/* <HueSaturation hue={0.2} saturation={0.2} /> */}
			{/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
			{/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
			{/* <Noise opacity={0.02} /> */}
			<Vignette eskil={false} offset={0.1} darkness={1.1} />
		</EffectComposer>
	);
};

export default PostProcessing;
