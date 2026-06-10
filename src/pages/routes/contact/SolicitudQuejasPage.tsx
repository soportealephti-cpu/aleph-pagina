import { FormEvent, useState } from 'react';
import { ALEPH_API_BASE } from '../../../config/runtime';

export function SolicitudQuejasPage() {
  const [company, setCompany] = useState('');
  const [ruc, setRuc] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [laboratoryRelated, setLaboratoryRelated] = useState('');
  const [serviceReason, setServiceReason] = useState('');
  const [description, setDescription] = useState('');
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
      const response = await fetch(`${ALEPH_API_BASE}/api/send-complaint-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company,
          ruc,
          contact,
          email,
          phone,
          laboratoryRelated,
          serviceReason,
          description,
          website,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'No se pudo enviar la solicitud.');
      }

      setMessage('Solicitud enviada correctamente.');
      setCompany('');
      setRuc('');
      setContact('');
      setEmail('');
      setPhone('');
      setLaboratoryRelated('');
      setServiceReason('');
      setDescription('');
      setWebsite('');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'No se pudo enviar la solicitud.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-white text-[#222]">
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-medium text-[#2f466d] md:text-5xl">
              Solicitud de quejas (F-SGI-043)
            </h1>
            <p className="text-lg font-semibold text-[#2f466d]">F-SGI-043</p>
          </div>

          <div className="mx-auto mt-5 h-px w-full max-w-3xl bg-slate-300" />

          <div className="mt-10 border border-slate-200 bg-white p-8">
            <p className="text-sm font-semibold text-slate-500">
              Los campos marcados con * son obligatorios
            </p>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="complaint-website">Sitio web</label>
                <input
                  id="complaint-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f466d]" htmlFor="complaint-company">
                  Empresa *
                </label>
                <input
                  id="complaint-company"
                  type="text"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f466d]" htmlFor="complaint-ruc">
                  RUC *
                </label>
                <input
                  id="complaint-ruc"
                  type="text"
                  value={ruc}
                  onChange={(event) => setRuc(event.target.value.replace(/\D/g, '').slice(0, 11))}
                  inputMode="numeric"
                  pattern="^\d{8}(\d{3})?$"
                  maxLength={11}
                  className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f466d]" htmlFor="complaint-contact">
                  Contacto(Nombre y apellidos) *
                </label>
                <input
                  id="complaint-contact"
                  type="text"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f466d]" htmlFor="complaint-email">
                  Correo electrónico *
                </label>
                <input
                  id="complaint-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f466d]" htmlFor="complaint-phone">
                  Numero celular *
                </label>
                <input
                  id="complaint-phone"
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

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f466d]" htmlFor="complaint-related">
                  La queja esta relacionada con las actividades de laboratorio *
                </label>
                <input
                  id="complaint-related"
                  type="text"
                  value={laboratoryRelated}
                  onChange={(event) => setLaboratoryRelated(event.target.value)}
                  className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f466d]" htmlFor="complaint-reason">
                  Motivo del Servicio: *
                </label>
                <input
                  id="complaint-reason"
                  type="text"
                  value={serviceReason}
                  onChange={(event) => setServiceReason(event.target.value)}
                  className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2f466d]" htmlFor="complaint-description">
                  Descripcion
                </label>
                <textarea
                  id="complaint-description"
                  rows={8}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="w-full resize-none border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                />
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

              <p className="text-sm text-slate-600">
                De ser necesario enviar archivos adjuntos, enviarlos al e-mail{' '}
                <a href="mailto:g.calidad@alephsac.com" className="font-semibold text-[#0f5ea8]">
                  g.calidad@alephsac.com
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
