import { ServiceQuotePage } from '../../../components/ServiceQuotePage';

export function MonitoreoAmbientalPage() {
  return (
    <ServiceQuotePage
      title="MONITOREO AMBIENTAL"
      serviceValue="MONITOREO AMBIENTAL"
      imageSrc="/services/monitoreo-ambiental.jpg"
      imageAlt="Monitoreo ambiental"
    >
      <p>
        Para el sector medioambiental trabajamos bajo un sistema de gestion de
        calidad donde demostramos nuestra capacidad y competencia tecnica, creamos
        confianza y credibilidad a nuestros clientes basados en nuestra maxima
        premisa: la satisfaccion a traves de servicios de calidad, para ello,
        contamos con la acreditacion de la norma de calidad (NTP-ISO/IEC 17025).
        Brindamos servicios especializados en:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Analisis de los parametros radiactivos Alfa Total y Beta Total en aguas de
          consumo humano.
        </li>
        <li>
          Analisis de concentracion de Radon (Rn-222) en espacios y ambientes
          cerrados.
        </li>
      </ul>
    </ServiceQuotePage>
  );
}
