import { ServiceQuotePage } from '../../../components/ServiceQuotePage';

export function AlmacenamientoDesechosPage() {
  return (
    <ServiceQuotePage
      title="ALMACENAMIENTO Y GESTION DE DESECHOS RADIACTIVOS"
      serviceValue="ALMACENAMIENTO Y GESTION DE DESECHOS RADIACTIVOS"
      imageSrc="/services/almacenamiento-desechos-radiactivos.jpg"
      imageAlt="Almacenamiento y gestion de desechos radiactivos"
    >
      <p>
        El Almacenamiento de Materiales Radiactivo comprende el almacenamiento por
        un periodo de tiempo determinado de dichas fuentes, materiales o bultos
        radiactivos de usuarios externos, en los almacenes especiales con que cuenta
        ALEPH.
      </p>
      <p>
        Los almacenes cumplen con las exigencias de seguridad radiologica y
        seguridad fisica, establecidas en la reglamentacion nacional y
        recomendaciones internacionales.
      </p>
      <p>
        El servicio de gestion de residuos radiactivos consiste en el almacenamiento
        de fuentes radiactivas selladas en desuso y comprende la recoleccion,
        transporte, acondicionamiento y almacenamiento de los materiales
        radiactivos hasta su internamiento de dichos residuos en el instituto
        peruano de energia nuclear (IPEN).
      </p>
    </ServiceQuotePage>
  );
}
