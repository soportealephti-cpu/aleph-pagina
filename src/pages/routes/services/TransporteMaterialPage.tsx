import { ServiceQuotePage } from '../../../components/ServiceQuotePage';

export function TransporteMaterialPage() {
  return (
    <ServiceQuotePage
      title="TRANSPORTE DE MATERIAL RADIACTIVO"
      serviceValue="TRANSPORTE DE MATERIAL RADIACTIVO"
      imageSrc="/services/transporte-material-radiactivo.jpg"
      imageAlt="Transporte de material radiactivo"
    >
      <p>
        Estamos autorizados por el Instituto Peruano de Energia Nuclear, hemos
        realizado el transporte nacional de fuentes de radiacion intensa y de mineral
        radiactivo. Experiencia en planes de emergencia y seguridad fisica.
      </p>
      <p className="font-semibold text-[#2f466d]">Licencia IPEN-0TAN – Nº 4280.E4</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Separacion, inmovilizacion y disposicion final de residuos radiactivos solidos y liquidos.</li>
        <li>Transporte de residuos radiactivos</li>
      </ul>
    </ServiceQuotePage>
  );
}
