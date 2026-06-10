import { ServiceQuotePage } from '../../../components/ServiceQuotePage';

export function CalibracionesDosimetricasPage() {
  return (
    <ServiceQuotePage
      title="CALIBRACIONES DOSIMETRICAS"
      serviceValue="CALIBRACIONES DOSIMETRICAS"
      imageSrc="/services/calibraciones-dosimetricas.jpg"
      imageAlt="Calibraciones dosimetricas"
    >
      <p className="font-semibold text-[#2f466d]">
        Calibracion dosimetrica de monitores de radiacion portatiles
      </p>
      <p>
        Consiste en determinar el factor de calibracion de los monitores de
        radiacion, empleados en proteccion radiologica con la finalidad de tener
        mediciones mas exactas en campos de radiacion gamma y contaminacion
        radiactiva. El servicio se realiza en cumplimiento de la Ley 28028 y su
        Reglamento vigente en el pais.
      </p>

      <p className="font-semibold text-[#2f466d]">
        Calibracion dosimetrica de monitores de radiacion de area
      </p>
      <p>
        Consiste en determinar el correcto funcionamiento y factor de calibracion
        de los monitores de radiacion de area utilizados para la vigilancia y
        control radiologico en instalaciones que emplean fuentes de radiacion
        ionizante. Esto permite garantizar mediciones confiables para la proteccion
        del personal ocupacionalmente expuesto, el publico y el medio ambiente,
        cumpliendo con la normativa nacional vigente.
      </p>

      <p className="font-semibold text-[#2f466d]">
        Calibracion de monitores de contaminacion
      </p>
      <p>
        Consiste en verificar y calibrar equipos destinados a detectar contaminacion
        radiactiva en superficies, areas de trabajo, materiales y personal. Este
        servicio permite asegurar resultados precisos para la identificacion oportuna
        de contaminacion y el cumplimiento de los estandares de seguridad radiologica
        establecidos por la normativa vigente.
      </p>
    </ServiceQuotePage>
  );
}
