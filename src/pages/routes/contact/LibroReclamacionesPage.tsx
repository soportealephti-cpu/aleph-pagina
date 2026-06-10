import { FormEvent, ReactNode, useState } from 'react';
import { ALEPH_API_BASE } from '../../../config/runtime';
const fieldClassName =
  'w-full rounded-sm border border-slate-400 bg-white px-4 py-3 text-sm text-slate-800 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] outline-none transition-colors focus:border-[#0f5ea8]';
const textareaClassName =
  'w-full resize-none rounded-sm border border-slate-400 bg-white px-4 py-3 text-sm text-slate-800 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] outline-none transition-colors focus:border-[#0f5ea8]';

export function LibroReclamacionesPage() {
  const [form, setForm] = useState({
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    celular: '',
    departamento: '',
    provincia: '',
    distrito: '',
    direccion: '',
    referencia: '',
    correo: '',
    esMenorEdad: 'no',
    tipoReclamo: '',
    tipoConsumo: '',
    numeroPedido: '',
    fechaReclamacion: '',
    proveedor: '',
    montoReclamado: '',
    descripcionProductoServicio: '',
    fechaCompra: '',
    fechaConsumo: '',
    fechaCaducidad: '',
    detalleReclamacion: '',
    pedidoCliente: '',
    aceptaDeclaracion: false,
    aceptaPoliticas: false,
    website: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateField(field: string, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(`${ALEPH_API_BASE}/api/send-complaint-book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'No se pudo enviar el libro de reclamaciones.');
      }

      setMessage('Formulario enviado correctamente.');
      setForm({
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        tipoDocumento: '',
        numeroDocumento: '',
        celular: '',
        departamento: '',
        provincia: '',
        distrito: '',
        direccion: '',
        referencia: '',
        correo: '',
        esMenorEdad: 'no',
        tipoReclamo: '',
        tipoConsumo: '',
        numeroPedido: '',
        fechaReclamacion: '',
        proveedor: '',
        montoReclamado: '',
        descripcionProductoServicio: '',
        fechaCompra: '',
        fechaConsumo: '',
        fechaCaducidad: '',
        detalleReclamacion: '',
        pedidoCliente: '',
        aceptaDeclaracion: false,
        aceptaPoliticas: false,
        website: '',
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'No se pudo enviar el libro de reclamaciones.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-white text-[#222]">
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-semibold text-[#2f466d] md:text-5xl">
              Libro de reclamaciones
            </h1>
          </div>

          <div className="mx-auto mt-5 h-px w-full max-w-3xl bg-slate-300" />

          <form className="mt-10 space-y-10 border border-slate-200 bg-white p-8" onSubmit={handleSubmit}>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="book-website">Sitio web</label>
              <input
                id="book-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => updateField('website', e.target.value)}
              />
            </div>
            <section className="space-y-5">
              <div>
                <h2 className="text-2xl font-semibold text-[#2f466d]">
                  Identificacion del consumidor reclamante
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">* Datos requeridos</p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <Field label="Nombre *">
                  <input value={form.nombre} onChange={(e) => updateField('nombre', e.target.value)} className={fieldClassName} required />
                </Field>
                <Field label="Primer apellido *">
                  <input value={form.primerApellido} onChange={(e) => updateField('primerApellido', e.target.value)} className={fieldClassName} required />
                </Field>
                <Field label="Segundo apellido *">
                  <input value={form.segundoApellido} onChange={(e) => updateField('segundoApellido', e.target.value)} className={fieldClassName} required />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <Field label="Tipo de documentacion *">
                  <select value={form.tipoDocumento} onChange={(e) => updateField('tipoDocumento', e.target.value)} className={fieldClassName} required>
                    <option value="">Seleccione</option>
                    <option value="DNI">DNI</option>
                    <option value="CE">Carnet de extranjeria</option>
                    <option value="PASAPORTE">Pasaporte</option>
                    <option value="RUC">RUC</option>
                  </select>
                </Field>
                <Field label="Numero de documentacion *">
                  <input
                    value={form.numeroDocumento}
                    onChange={(e) =>
                      updateField(
                        'numeroDocumento',
                        form.tipoDocumento === 'CE' || form.tipoDocumento === 'PASAPORTE'
                          ? e.target.value.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 20)
                          : e.target.value.replace(/\D/g, '').slice(0, 11),
                      )}
                    inputMode={form.tipoDocumento === 'CE' || form.tipoDocumento === 'PASAPORTE' ? 'text' : 'numeric'}
                    pattern={form.tipoDocumento === 'RUC' ? '^\\d{11}$' : form.tipoDocumento === 'DNI' ? '^\\d{8}$' : '^[a-zA-Z0-9-]{3,20}$'}
                    maxLength={form.tipoDocumento === 'CE' || form.tipoDocumento === 'PASAPORTE' ? 20 : 11}
                    className={fieldClassName}
                    required
                  />
                </Field>
                <Field label="Celular *">
                  <input
                    value={form.celular}
                    onChange={(e) => updateField('celular', e.target.value.replace(/\D/g, '').slice(0, 15))}
                    inputMode="numeric"
                    pattern="^\d{7,15}$"
                    maxLength={15}
                    className={fieldClassName}
                    required
                  />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <Field label="Departamento *">
                  <input value={form.departamento} onChange={(e) => updateField('departamento', e.target.value)} className={fieldClassName} required />
                </Field>
                <Field label="Provincia *">
                  <input value={form.provincia} onChange={(e) => updateField('provincia', e.target.value)} className={fieldClassName} required />
                </Field>
                <Field label="Distrito *">
                  <input value={form.distrito} onChange={(e) => updateField('distrito', e.target.value)} className={fieldClassName} required />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Direccion *">
                  <input value={form.direccion} onChange={(e) => updateField('direccion', e.target.value)} className={fieldClassName} required />
                </Field>
                <Field label="Referencia">
                  <input value={form.referencia} onChange={(e) => updateField('referencia', e.target.value)} className={fieldClassName} />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Correo electronico *">
                  <input
                    type="email"
                    value={form.correo}
                    onChange={(e) => updateField('correo', e.target.value)}
                    autoComplete="email"
                    className={fieldClassName}
                    required
                  />
                </Field>
                <Field label="¿Eres menor de edad?">
                  <div className="flex gap-6 pt-3 text-sm text-slate-700">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="menor-edad" checked={form.esMenorEdad === 'si'} onChange={() => updateField('esMenorEdad', 'si')} />
                      Si
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="menor-edad" checked={form.esMenorEdad === 'no'} onChange={() => updateField('esMenorEdad', 'no')} />
                      No
                    </label>
                  </div>
                </Field>
              </div>
            </section>

            <section className="space-y-5">
              <div>
                <h2 className="text-2xl font-semibold text-[#2f466d]">
                  Detalle del reclamo y orden del consumidor
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">* Datos requeridos</p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <Field label="Tipo de reclamo *">
                  <select value={form.tipoReclamo} onChange={(e) => updateField('tipoReclamo', e.target.value)} className={fieldClassName} required>
                    <option value="">Seleccione</option>
                    <option value="RECLAMACION">Reclamacion</option>
                    <option value="QUEJA">Queja</option>
                  </select>
                </Field>
                <Field label="Tipo de consumo *">
                  <input value={form.tipoConsumo} onChange={(e) => updateField('tipoConsumo', e.target.value)} className={fieldClassName} required />
                </Field>
                <Field label="N º de pedido. *">
                  <input value={form.numeroPedido} onChange={(e) => updateField('numeroPedido', e.target.value)} className={fieldClassName} required />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <Field label="Fecha de reclamacion / queja">
                  <input type="date" value={form.fechaReclamacion} onChange={(e) => updateField('fechaReclamacion', e.target.value)} className={fieldClassName} />
                </Field>
                <Field label="Proveedor">
                  <input value={form.proveedor} onChange={(e) => updateField('proveedor', e.target.value)} className={fieldClassName} />
                </Field>
                <Field label="Monto reclamado (S/.)">
                  <input value={form.montoReclamado} onChange={(e) => updateField('montoReclamado', e.target.value)} className={fieldClassName} />
                </Field>
              </div>

              <Field label="Descripcion del producto o servicio *">
                <textarea value={form.descripcionProductoServicio} onChange={(e) => updateField('descripcionProductoServicio', e.target.value)} className={textareaClassName} required />
              </Field>

              <div className="grid gap-5 md:grid-cols-3">
                <Field label="Fecha de compra">
                  <input type="date" value={form.fechaCompra} onChange={(e) => updateField('fechaCompra', e.target.value)} className={fieldClassName} />
                </Field>
                <Field label="Fecha de consumo">
                  <input type="date" value={form.fechaConsumo} onChange={(e) => updateField('fechaConsumo', e.target.value)} className={fieldClassName} />
                </Field>
                <Field label="Fecha de caducidad">
                  <input type="date" value={form.fechaCaducidad} onChange={(e) => updateField('fechaCaducidad', e.target.value)} className={fieldClassName} />
                </Field>
              </div>

              <Field label="Detalle de la Reclamacion / Queja, segun lo indicado por el cliente: *">
                <textarea value={form.detalleReclamacion} onChange={(e) => updateField('detalleReclamacion', e.target.value)} className={textareaClassName} required />
              </Field>

              <Field label="Pedido del Cliente: *">
                <textarea value={form.pedidoCliente} onChange={(e) => updateField('pedidoCliente', e.target.value)} className={textareaClassName} required />
              </Field>

              <div className="space-y-2 text-sm leading-7 text-slate-700">
                <p>(1) Reclamacion: Desacuerdo relacionado con productos y / o servicios.</p>
                <p>(2) Queja: Desacuerdo no relacionado con productos y / o servicios; o, malestar o insatisfaccion con la atencion al publico.</p>
              </div>
            </section>

            <section className="space-y-4 text-sm leading-7 text-slate-700">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={form.aceptaDeclaracion}
                  onChange={(e) => updateField('aceptaDeclaracion', e.target.checked)}
                  required
                />
                <span>
                  Declaro que soy el dueño del servicio y acepto el contenido de este formulario al declarar bajo Declaracion Jurada la veracidad de los hechos descritos.
                </span>
              </label>

              <p>
                * La formulacion del reclamo no excluye el recurso a otros medios de resolucion de controversias ni es un requisito previo para presentar una denuncia ante el Indecopi.
              </p>
              <p>
                * El proveedor debe responder a la reclamacion en un plazo no superior a quince (15) dias naturales, pudiendo ampliar el plazo hasta quince dias.
              </p>
              <p>
                * Con la firma de este documento, el cliente autoriza a ser contactado despues de la tramitacion de la reclamacion para evaluar la calidad y satisfaccion del proceso de atencion de reclamaciones.
              </p>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={form.aceptaPoliticas}
                  onChange={(e) => updateField('aceptaPoliticas', e.target.checked)}
                  required
                />
                <span>He leido y acepto la Politica de privacidad y seguridad y la Politica de cookies.</span>
              </label>
            </section>

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
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#2f466d]">{label}</label>
      {children}
    </div>
  );
}
