export function SectionTitle({
  overline,
  title,
  description,
}: {
  overline: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0f5ea8]">{overline}</p>
      <h2 className="mt-4 text-3xl font-bold uppercase tracking-[0.04em] text-[#25364f] md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
