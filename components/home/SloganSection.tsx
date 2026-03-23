import { FadeInUp } from "@/components/ui/FadeInUp";

export function SloganSection() {
  return (
    <section className="bg-[#f3efe6] px-4 py-28 md:px-8 md:py-40 lg:py-48">
      <div className="mx-auto max-w-3xl text-center">
        <FadeInUp>
          <p className="font-serif text-2xl font-normal leading-relaxed text-[#1a3329] md:text-3xl lg:text-[2rem] lg:leading-[1.55]">
            도시의 중심에서,
            <br />
            가장 조용한 숲의 리듬을 살아가다.
          </p>
        </FadeInUp>
        <FadeInUp delay={0.15} className="mt-10">
          <p className="text-sm leading-loose text-neutral-600 md:text-base">
            프라이빗 가든과 세련된 볼륨감, 그리고 여유로운 동선.
            <br className="hidden md:block" />
            하이엔드 라이프스타일을 완성하는 타운하우스의 철학을 담았습니다.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}
