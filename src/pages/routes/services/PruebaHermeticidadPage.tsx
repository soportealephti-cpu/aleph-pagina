import { ServiceQuotePage } from '../../../components/ServiceQuotePage';

export function PruebaHermeticidadPage() {
  return (
    <ServiceQuotePage
      title="PRUEBA DE HERMETICIDAD"
      serviceValue="PRUEBA DE HERMETICIDAD"
      imageSrc="/services/prueba-de-hermeticidad.jpg"
      imageAlt="Prueba de hermeticidad"
    >
      <p>
        Contamos con licencia del Instituto Peruano de Energia Nuclear(IPEN)-(OTAN)
        para realizar pruebas de fuga para fuentes selladas de radiacion ionizante
        mediante la toma de frotis y su posterior analisis en laboratorio, nuestra
        gestion de calidad esta respaldada por la acreditacion de la norma de
        calidad (NTP-ISO/IEC 17025).
      </p>
    </ServiceQuotePage>
  );
}
