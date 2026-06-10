import { ServiceQuotePage } from '../../../components/ServiceQuotePage';

export function DireccionCapacitacionNuclearPage() {
  return (
    <ServiceQuotePage
      title="DIRECCION DE CAPACITACION NUCLEAR"
      serviceValue="DIRECCION DE CAPACITACION NUCLEAR"
      imageSrc="/services/direccion-capacitacion-nuclear.jpg"
      imageAlt="Direccion de capacitacion nuclear"
    >
      <p className="font-semibold text-[#2f466d]">Direccion de Capacitacion Nuclear</p>
      <p className="font-semibold text-[#2f466d]">Director: PhD Daniel Francisco Palacios</p>
      <p>
        La Direccion de Capacitacion Nuclear imparte Cursos presenciales, Cursos
        elearning (en linea), Cursos semi-presenciales y Sesiones Formativas en
        Proteccion Radiologica, Control de calidad en Radiodiagnostico y Nuevas
        Tecnologias Radiologicas.
      </p>
      <p>La oferta formativa se puede agrupar en los siguientes bloques:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Cursos normados por el instituto peruano de energia nuclear</li>
        <li>Cursos de formacion continua1</li>
      </ul>
    </ServiceQuotePage>
  );
}
