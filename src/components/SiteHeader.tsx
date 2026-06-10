import { useState } from 'react';
import { AULA_PUBLIC_URL } from '../config/runtime';
import { menuItems, topEmail, topPhones } from '../data/siteContent';

function DesktopMenu() {
  return (
    <nav className="hidden xl:block">
      <ul className="flex items-center justify-end gap-1 text-[13px] font-bold uppercase tracking-[0.08em] text-[#2e3d55]">
        {menuItems.map((item) => (
          <li key={item.label} className="group relative">
            <a
              href={item.href}
              className="flex items-center gap-2 px-4 py-4 transition-colors hover:text-[#0f5ea8]"
            >
              <span>{item.label}</span>
              {item.children ? <span className="text-[10px]">▼</span> : null}
            </a>

            {item.children ? (
              <ul className="invisible absolute left-0 top-full z-50 min-w-[300px] border border-slate-200 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {item.children.map((child) => (
                  <li key={child.label} className="group/child relative border-b border-slate-100 last:border-b-0">
                    {child.children ? (
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left text-[12px] font-semibold uppercase tracking-[0.05em] text-slate-700 hover:bg-[#f4f8fc] hover:text-[#0f5ea8]"
                      >
                        <span>{child.label}</span>
                        <span className="text-[10px]">▶</span>
                      </button>
                    ) : (
                      <a
                        href={child.href}
                        className="flex items-center justify-between gap-3 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-slate-700 hover:bg-[#f4f8fc] hover:text-[#0f5ea8]"
                      >
                        <span>{child.label}</span>
                      </a>
                    )}

                    {child.children ? (
                      <ul className="invisible absolute left-full top-0 z-50 min-w-[320px] border border-slate-200 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover/child:visible group-hover/child:opacity-100">
                        {child.children.map((grandchild) => (
                          <li
                            key={grandchild.label}
                            className="border-b border-slate-100 last:border-b-0"
                          >
                            <a
                              href={grandchild.href}
                              className="block px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-slate-700 hover:bg-[#f4f8fc] hover:text-[#0f5ea8]"
                            >
                              {grandchild.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}

        <li>
          <a
            href={AULA_PUBLIC_URL}
            target="_blank"
            rel="noreferrer"
            className="ml-2 inline-flex border border-[#0f5ea8] px-4 py-3 text-[12px] font-bold uppercase tracking-[0.08em] text-[#0f5ea8] transition-colors hover:bg-[#0f5ea8] hover:text-white"
          >
            Aula Virtual
          </a>
        </li>
      </ul>
    </nav>
  );
}

function MobileMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [openChild, setOpenChild] = useState<string | null>(null);

  const toggleItem = (label: string) => {
    setOpenItem((current) => (current === label ? null : label));
    setOpenChild(null);
  };

  const toggleChild = (label: string) => {
    setOpenChild((current) => (current === label ? null : label));
  };

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex h-11 w-11 items-center justify-center border border-slate-300 text-[#2e3d55]"
        aria-label="Abrir menu"
      >
        <span className="text-xl">{open ? '×' : '☰'}</span>
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-screen border-y border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm text-slate-700">
            <p className="font-semibold text-[#25364f]">{topPhones[0]}</p>
            <p className="mt-1 break-all text-xs text-slate-600">{topEmail}</p>
          </div>

          <div className="max-h-[70vh] overflow-y-auto px-4 py-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const itemOpen = openItem === item.label;
                return (
                  <li key={item.label} className="border border-slate-200 bg-white">
                    <div className="flex items-stretch">
                      {item.children ? (
                        <button
                          type="button"
                          onClick={() => toggleItem(item.label)}
                          className="min-w-0 flex-1 px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.06em] text-[#25364f]"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <a
                          href={item.href}
                          className="min-w-0 flex-1 px-4 py-3 text-sm font-bold uppercase tracking-[0.06em] text-[#25364f]"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </a>
                      )}
                      {item.children ? (
                        <button
                          type="button"
                          onClick={() => toggleItem(item.label)}
                          className="w-12 border-l border-slate-200 text-[#0f5ea8]"
                          aria-label={`Desplegar ${item.label}`}
                        >
                          {itemOpen ? '−' : '+'}
                        </button>
                      ) : null}
                    </div>

                    {item.children && itemOpen ? (
                      <div className="border-t border-slate-200 bg-[#fbfdff] px-3 py-2">
                        <ul className="space-y-2">
                          {item.children.map((child) => {
                            const childKey = `${item.label}:${child.label}`;
                            const childOpen = openChild === childKey;
                            return (
                              <li key={child.label} className="border border-slate-200 bg-white">
                                <div className="flex items-stretch">
                                  {child.children ? (
                                    <button
                                      type="button"
                                      onClick={() => toggleChild(childKey)}
                                      className="min-w-0 flex-1 px-3 py-3 text-left text-xs font-bold uppercase tracking-[0.05em] text-slate-700"
                                    >
                                      {child.label}
                                    </button>
                                  ) : (
                                    <a
                                      href={child.href}
                                      className="min-w-0 flex-1 px-3 py-3 text-xs font-bold uppercase tracking-[0.05em] text-slate-700"
                                      onClick={() => setOpen(false)}
                                    >
                                      {child.label}
                                    </a>
                                  )}
                                  {child.children ? (
                                    <button
                                      type="button"
                                      onClick={() => toggleChild(childKey)}
                                      className="w-11 border-l border-slate-200 text-[#0f5ea8]"
                                      aria-label={`Desplegar ${child.label}`}
                                    >
                                      {childOpen ? '−' : '+'}
                                    </button>
                                  ) : null}
                                </div>

                                {child.children && childOpen ? (
                                  <div className="border-t border-slate-200 bg-[#f8fbff] px-3 py-2">
                                    <ul className="space-y-1">
                                      {child.children.map((grandchild) => (
                                        <li key={grandchild.label}>
                                          <a
                                            href={grandchild.href}
                                            className="block px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-slate-600"
                                            onClick={() => setOpen(false)}
                                          >
                                            {grandchild.label}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : null}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-slate-200 px-4 py-4">
            <a
              href={AULA_PUBLIC_URL}
              target="_blank"
              rel="noreferrer"
              className="block border border-[#0f5ea8] bg-[#0f5ea8] px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-white"
              onClick={() => setOpen(false)}
            >
              Aula Virtual
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="bg-[#0f5ea8] text-white">
        <div className="mx-auto hidden max-w-7xl items-center justify-between gap-6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em] md:flex">
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {topPhones.map((phone) => (
              <span key={phone}>{phone}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>{topEmail}</span>
            <a href="https://www.facebook.com" className="hover:opacity-80">
              Facebook
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] md:hidden">
          <span className="truncate">{topPhones[0]}</span>
          <span className="truncate text-right">{topEmail}</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 xl:gap-6 xl:py-4">
          <a href="/" className="flex min-w-0 items-center">
            <img src="/legacy/azul-1.png" alt="Aleph Group" className="site-logo-primary max-w-[190px] sm:max-w-[220px]" />
          </a>

          <DesktopMenu />
          <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
        </div>
      </header>
    </>
  );
}
