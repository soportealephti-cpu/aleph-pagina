import { PageHero } from '../../../components/PageHero';

export function ProductosPage() {
  return (
    <>
      <PageHero
        content={{
          overline: 'Productos',
          title: 'Productos',
          intro:
            'Linea institucional de productos y equipamiento vinculados a proteccion radiologica e instrumentacion.',
          sections: [],
        }}
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl rounded-sm border border-slate-200 bg-white px-8 py-10 shadow-sm">
          <p className="text-sm leading-7 text-slate-700">
            Seccion reconstruida respetando la estructura del sitio anterior y manteniendo el acceso desde el menu principal.
          </p>
        </div>
      </section>
    </>
  );
}
