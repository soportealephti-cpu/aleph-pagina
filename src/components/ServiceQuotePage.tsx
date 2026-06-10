import { FormEvent, ReactNode, useState } from 'react';
import { ALEPH_API_BASE } from '../config/runtime';

const SERVICE_OPTIONS = [
  'CALIBRACIONES DOSIMETRICAS',
  'DOSIMETRIA INDIVIDUAL EXTERNA',
  'PRUEBA DE HERMETICIDAD',
  'MAPEO DE TASA DE DOSIS',
  'MANTENIMIENTO DE MEDIDORES NUCLEARES',
  'ALMACENAMIENTO Y GESTION DE DESECHOS RADIACTIVOS',
  'MONITOREO AMBIENTAL',
  'DIRECCION DE CAPACITACION NUCLEAR',
  'ASESORIA EN PROTECCION RADIOLOGICA',
  'CONTROL DE CALIDAD EN RX',
  'TRANSPORTE DE MATERIAL RADIACTIVO',
];

type ServiceQuotePageProps = {
  title: string;
  serviceValue: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
};

export function ServiceQuotePage({
  title,
  serviceValue,
  imageSrc = '/legacy/banner5-scaled.jpg',
  imageAlt = 'Servicio Aleph',
  children,
}: ServiceQuotePageProps) {
  const [clientName, setClientName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [services, setServices] = useState(serviceValue);
  const [description, setDescription] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [equipment, setEquipment] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [hasProbe, setHasProbe] = useState('');
  const [probeBrand, setProbeBrand] = useState('');
  const [probeModel, setProbeModel] = useState('');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(`${ALEPH_API_BASE}/api/send-quote-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName,
          documentNumber,
          email,
          phone,
          services,
          description,
          manufacturer,
          equipment,
          brand,
          model,
          hasProbe,
          probeBrand,
          probeModel,
          website,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'No se pudo enviar la cotizacion.');
      }

      setMessage('Solicitud de cotizacion enviada correctamente.');
      setClientName('');
      setDocumentNumber('');
      setEmail('');
      setPhone('');
      setServices(serviceValue);
      setDescription('');
      setManufacturer('');
      setEquipment('');
      setBrand('');
      setModel('');
      setHasProbe('');
      setProbeBrand('');
      setProbeModel('');
      setWebsite('');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'No se pudo enviar la cotizacion.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-white text-[#222]">
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-center text-4xl font-bold uppercase tracking-[0.04em] text-[#2f466d] md:text-5xl">
            {title}
          </h1>
          <div className="mx-auto mt-5 h-px w-full max-w-3xl bg-slate-300" />

          <div className="mt-8 text-center">
            <a
              href="#service-quote-form"
              className="inline-flex bg-[#0f5ea8] px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#0b4d89]"
            >
              Cotiza ahora
            </a>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5 text-base leading-8 text-slate-700">
              {children ?? (
                <>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    venenatis, risus id pretium semper, justo orci suscipit nunc, sed
                    bibendum massa mauris et nibh.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                    cursus, ligula sed volutpat feugiat, nulla lectus faucibus est,
                    vitae commodo lacus mauris sed lorem.
                  </p>
                </>
              )}
            </div>

            <div className="overflow-hidden border border-slate-200 bg-white">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>
          </div>

          <section
            id="service-quote-form"
            className="scroll-mt-24 bg-white py-16 md:py-20"
          >
            <div className="border border-slate-200 bg-white p-8 md:p-10">
              <h2 className="text-3xl font-semibold text-[#2f466d]">
                Solicite Cotizacion
              </h2>
              <p className="mt-3 text-sm font-semibold text-slate-500">
                Los campos marcados con * son obligatorios
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="quote-website">Sitio web</label>
                  <input
                    id="quote-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quote-client"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      Empresa/Cliente *
                    </label>
                    <input
                      id="quote-client"
                      type="text"
                      value={clientName}
                      onChange={(event) => setClientName(event.target.value)}
                      className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-document"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      RUC/DNI *
                    </label>
                    <input
                      id="quote-document"
                      type="text"
                      value={documentNumber}
                      onChange={(event) => setDocumentNumber(event.target.value.replace(/\D/g, '').slice(0, 11))}
                      inputMode="numeric"
                      pattern="^\d{8}(\d{3})?$"
                      maxLength={11}
                      className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quote-email"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      Correo electronico *
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      Numero Celular *
                    </label>
                    <input
                      id="quote-phone"
                      type="text"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 15))}
                      inputMode="numeric"
                      pattern="^\d{7,15}$"
                      maxLength={15}
                      className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quote-services"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      Servicios *
                    </label>
                    <select
                      id="quote-services"
                      value={services}
                      disabled
                      className="w-full cursor-not-allowed border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-description"
                    className="mb-2 block text-sm font-semibold text-[#2f466d]"
                  >
                    Descripcion
                  </label>
                  <textarea
                    id="quote-description"
                    rows={5}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="w-full resize-none border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                  />
                </div>

                <div className="rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Datos tecnicos del equipo
                </div>

                <div className="text-sm text-slate-600">
                  Si conoces esta informacion, puedes completarla a continuacion.
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="quote-equipment"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      Equipo
                    </label>
                    <input
                      id="quote-equipment"
                      type="text"
                      value={equipment}
                      onChange={(event) => setEquipment(event.target.value)}
                      className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-manufacturer"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      Fabricante
                    </label>
                    <input
                      id="quote-manufacturer"
                      type="text"
                      value={manufacturer}
                      onChange={(event) => setManufacturer(event.target.value)}
                      className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-brand"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      Marca del equipo
                    </label>
                    <input
                      id="quote-brand"
                      type="text"
                      value={brand}
                      onChange={(event) => setBrand(event.target.value)}
                      className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-model"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      Modelo del equipo
                    </label>
                    <input
                      id="quote-model"
                      type="text"
                      value={model}
                      onChange={(event) => setModel(event.target.value)}
                      className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="quote-probe"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      El equipo cuenta con sonda
                    </label>
                    <select
                      id="quote-probe"
                      value={hasProbe}
                      onChange={(event) => setHasProbe(event.target.value)}
                      className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                    >
                      <option value="">No especifica</option>
                      <option value="no">No</option>
                      <option value="si">Si</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-probe-brand"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      Marca sonda
                    </label>
                    <input
                      id="quote-probe-brand"
                      type="text"
                      value={probeBrand}
                      onChange={(event) => setProbeBrand(event.target.value)}
                      className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-probe-model"
                      className="mb-2 block text-sm font-semibold text-[#2f466d]"
                    >
                      Modelo sonda
                    </label>
                    <input
                      id="quote-probe-model"
                      type="text"
                      value={probeModel}
                      onChange={(event) => setProbeModel(event.target.value)}
                      className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                    />
                  </div>
                </div>

                {message ? <p className="text-sm font-semibold text-green-700">{message}</p> : null}
                {error ? <p className="text-sm font-semibold text-red-700">{error}</p> : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex bg-[#0f5ea8] px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#0b4d89] disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {submitting ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
