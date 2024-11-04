import "./Text.css";
export default function Text() {
	return (
		<>
			{/* Contenedor del título y texto */}
			<div className="container">
				<div className="absolute top-[110px] left-[60px] w-[30%] p-2 bg-green-600 text-white text-sm font-sans rounded-md shadow-lg">
					La Tierra enfrenta graves problemas ambientales como la deforestación,
					la erosión del suelo y la pérdida de biodiversidad, afectando
					ecosistemas y nuestra calidad de vida. Esta página busca sensibilizar
					sobre estos desafíos y fomentar acciones que protejan el planeta,
					promoviendo un futuro más sostenible para todos.
				</div>
			</div>
		</>
	);
}
