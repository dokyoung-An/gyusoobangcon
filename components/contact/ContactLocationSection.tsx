import {
  CONTACT_LOCATION,
  googleMapsEmbedSrc,
} from "@/lib/contact-location";

export function ContactLocationSection() {
  const loc = CONTACT_LOCATION;

  return (
    <section className="border-b border-neutral-200/90 bg-white pb-12 pt-2 md:pb-16">
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#1a1a1a] md:text-3xl">
        위치안내
      </h2>

      <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-inner">
        <iframe
          title={loc.mapIframeTitle}
          src={googleMapsEmbedSrc(loc.mapEmbedQuery)}
          className="aspect-[21/9] min-h-[220px] w-full sm:min-h-[280px] md:aspect-[2.2/1]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h3 className="text-base font-bold text-[#1a1a1a] md:text-lg">
            {loc.company.title}
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700 md:text-[15px]">
            <li className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
              <span>
                <span className="font-medium text-[#1a3329]">대표번호</span>
                <br />
                TEL: {loc.company.tel}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
              <span>
                <span className="font-medium text-[#1a3329]">주소</span>
                <br />
                {loc.company.address}
              </span>
            </li>
          </ul>
          <a
            href={loc.company.naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-[#1a1a1a] transition hover:border-[#1a3329]/40 hover:bg-neutral-50"
          >
            네이버 지도 보기
          </a>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#1a1a1a] md:text-lg">
            {loc.transport.title}
          </h3>
          <ul className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700 md:text-[15px]">
            <li className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
              <span>
                <span className="font-medium text-[#1a3329]">자가용</span>
                <br />
                {loc.transport.byCar}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
              <span>
                <span className="font-medium text-[#1a3329]">버스</span>
                <br />
                {loc.transport.bus}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
              <span className="font-medium text-[#1a3329]">지하철</span>
              <ul className="mt-2 space-y-2">
                {loc.transport.subway.map((s) => (
                  <li key={`${s.badge}-${s.detail.slice(0, 12)}`} className="flex gap-2">
                    <span
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1a3329] text-[10px] font-bold text-white"
                      aria-hidden
                    >
                      {s.badge}
                    </span>
                    <span>{s.detail}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
