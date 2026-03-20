import { FeatureBlock } from "./FeatureBlock";
import { featureImages } from "@/lib/images";

const features = [
  {
    title: "도심 속 프라이빗 포레스트",
    description:
      "단지 전면에 조성된 녹지와 산책로가 일상에 자연의 온도를 더합니다. 출퇴근의 효율과 주말의 여유를 동시에 누리는 입지를 완성했습니다.",
    imageAlt: "녹지와 주거 단지가 어우러진 입지",
  },
  {
    title: "럭셔리 볼륨 & 품격 있는 외관",
    description:
      "점토 톤과 금속 라인이 조화를 이루는 외관 디자인. 세대별 프라이빗 테라스와 넉넉한 채광으로 하이엔드 주거의 격을 드러냅니다.",
    imageAlt: "세련된 타운하우스 외관",
  },
  {
    title: "최적화된 동선과 커뮤니티",
    description:
      "가족의 라이프스타일을 고려한 실내 동선과 커뮤니티 시설. 입주민만을 위한 프라이빗 라운지와 피트니스로 일상의 품격을 높입니다.",
    imageAlt: "커뮤니티 및 실내 공간",
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="bg-white px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl space-y-20 md:space-y-28">
        {features.map((f, i) => (
          <FeatureBlock
            key={f.title}
            title={f.title}
            description={f.description}
            imageSrc={featureImages[i]}
            imageAlt={f.imageAlt}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
