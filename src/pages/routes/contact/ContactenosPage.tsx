import { FormEvent, useState } from 'react';
import { ALEPH_API_BASE } from '../../../config/runtime';

export function ContactenosPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
      const response = await fetch(`${ALEPH_API_BASE}/api/send-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          description,
          website,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'No se pudo enviar el mensaje.');
      }

      setMessage('Mensaje enviado correctamente.');
      setName('');
      setEmail('');
      setPhone('');
      setDescription('');
      setWebsite('');
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'No se pudo enviar el mensaje.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-white text-[#222]">
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-center text-4xl font-medium text-[#2f466d] md:text-5xl">
            Contactenos
          </h1>
          <div className="mx-auto mt-5 h-px w-full max-w-3xl bg-slate-300" />

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden border border-slate-200 bg-white">
              <iframe
                title="Mapa Aleph"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.3590710332325!2d-77.09617637078325!3d-12.082256499465199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c97be44e839b%3A0x2a93b50c6df7df5e!2sAv.%20Rafael%20Escardo%20154%2C%20San%20Miguel%2015087%2C%20Peru!5e0!3m2!1ses!2spe!4v1495034685956"
                className="h-[520px] w-full"
                loading="lazy"
              />
            </div>

            <div className="border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold text-slate-500">
                Los campos marcados con * son obligatorios
              </p>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Sitio web</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-semibold text-[#2f466d]"
                  >
                    Nombres y Apellidos *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-semibold text-[#2f466d]"
                  >
                    Email *
                  </label>
                  <input
                    id="contact-email"
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
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm font-semibold text-[#2f466d]"
                  >
                    Numero
                  </label>
                  <input
                    id="contact-phone"
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 15))}
                    inputMode="numeric"
                    pattern="^\d{7,15}$"
                    maxLength={15}
                    className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-description"
                    className="mb-2 block text-sm font-semibold text-[#2f466d]"
                  >
                    Descripción *
                  </label>
                  <textarea
                    id="contact-description"
                    rows={8}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="w-full resize-none border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-[#0f5ea8]"
                    required
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
