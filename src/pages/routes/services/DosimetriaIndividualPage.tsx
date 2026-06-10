import { ServiceQuotePage } from '../../../components/ServiceQuotePage';

export function DosimetriaIndividualPage() {
  return (
    <ServiceQuotePage
      title="DOSIMETRIA INDIVIDUAL EXTERNA"
      serviceValue="DOSIMETRIA INDIVIDUAL EXTERNA"
      imageSrc="/services/dosimetria-individual-externa.jpg"
      imageAlt="Dosimetria individual externa"
    >
      <p className="font-semibold text-[#2f466d]">Dosimetria Individual TLD</p>
      <p>
        El Grupo ALEPH es especialista en brindar servicio de Dosimetria de
        Radiaciones, con un personal altamente calificado y preparado para
        garantizar calidad y precision en cada servicio realizado.
      </p>
      <p>
        El servicio de evaluacion Dosimetrica de Radiaciones se realiza en
        cumplimiento de la ley Regulacion de uso de fuentes de Radiacion ionizante,
        ley N.º 28028, publicada y regulada mediante su Reglamento de Autorizacion,
        Fiscalizacion, Control, Infracciones y Sanciones del uso de fuentes de
        Radiacion Ionizante relativos a seguridad Radiologica y nuclear, proteccion
        fisica y salvaguardias de los materiales nucleares en el territorio nacional
        por el instituto de Energia Nuclear (IPEN).
      </p>
      <p>
        Asimismo la empresa especializada que brinda el servicio de dosimetria segun
        las Normas de seguridad Radiologica PR.002.2011, debera cumplir con los
        siguientes requisitos:
      </p>
      <p className="font-semibold text-[#2f466d]">Requisitos Generales</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>El Servicio de dosimetria de radiacion externa debe poseer una autorizacion emitida por la OTAN.</li>
        <li>Disponer del certificado de Pruebas de Desempeno dosimetrica de un Laboratorio Secundario de aprobacion para casos de Fotones y de Accidentes.</li>
        <li>Nuestro Dosimetro es TLD Panasonic y tiene Relectura de la informacion dosimetrica y su Re analisis y reevaluacion correspondiente.</li>
      </ul>
      <p className="font-semibold text-[#2f466d]">Requisitos Tecnicos</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Estara disenado para la medida de las dosis equivalentes personales profunda Hp(10) y superficial Hp(0,07)</li>
        <li>Discriminara el tipo de energia de la radiacion incidente (Alfa–Rayos x, Beta, Gamma).</li>
        <li>Disponer el codigo de identificacion para la lectura automatica.</li>
        <li>Precision 1 rem.</li>
        <li>Sistema de medicion de Dosimetria automatica.</li>
        <li>Nuestro Porta dosimetro, cumple con Estanqueidad para evitar manipulacion por personal no autorizado.</li>
      </ul>
    </ServiceQuotePage>
  );
}
