const notices = [
  "본 홈페이지 내 지역도, 배치도, 평면, 내용 등은 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있으며, 표현된 개발계획 및 예정사항은 관계기관의 사정에 따라 취소, 변경, 지연될 수 있으며,\n이는 사업주체 및 시공사와는 무관합니다.",
  "본 홈페이지에 표현한 현황 및 개발 계획은 관계 기관의 홈페이지 등을 참조하여 작성된 것으로 사업계획 및 일정은 추후 변경될 수 있으며, 이는 사업주체 및 시공사와는 무관합니다.",
  "본 홈페이지에 표현한 지도상의 도로 및 거리, 지하철역, 건물의 위치 등은 개략적인 내용이므로 실제와 차이가 있을 수 있습니다.",
  "본 홈페이지 내 설계 관련 내용은 추후 인·허가과정이나 건축 허가 변경 여부, 본 공사 시 현장여건 등에 따라 변경될 수 있습니다.",
  "본 홈페이지 내 사이버모델하우스에 표현된 마감재, 가구 및 가전은 반드시 현장방문하여 확인하시기 바랍니다.",
  "본 홈페이지는 제작과정상 오류가 있을 수 있으니 자세한 사항은 문의해 주시기 바랍니다.",
  "본 홈페이지는 민·형사상 소송의 자료로 사용할 수 없습니다.",
];

export function FooterNoticeSection() {
  return (
    <section className="border-t border-white/10 bg-[#1a3329]">
      <div className="mx-auto max-w-7xl px-8 pt-6 pb-12 md:px-8 md:pt-7 md:pb-14 lg:px-10">
        <div className="space-y-2 text-sm leading-relaxed text-[#f3efe6] break-keep whitespace-pre-line">
          {notices.map((text) => (
            <p key={text} className="flex gap-1.5">
              <span className="shrink-0">※</span>
              <span>{text}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
