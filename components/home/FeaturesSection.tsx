import { FeatureBlock } from "./FeatureBlock";
import { featureImages } from "@/lib/images";

const features = [
  {
    title: "도심 속 프라이빗 포레스트",
    description:
      "단지 전면에 조성된 녹지와 산책로가 일상에 자연의 온도를 더합니다.\n 출퇴근의 효율과 주말의 여유를 동시에 누리는 입지를 완성했습니다.",
    imageAlt: "녹지와 주거 단지가 어우러진 입지",
  },
  {
    title: "공간의 가치를 높이는 \n 프리미엄 시그니처 하우스",
    description:
      "수평 텍스처의 그레이 마감과 화이트 외벽의 조화, 조형적인 디자인 월로 프라이버시를 높이고, 유리와 금속 자재의 디테일을 살려 도시적이고 품격있는 건축 미학을 완성했습니다.",
    imageAlt: "세련된 타운하우스 외관",
  },
  {
    title: "가족의 건강을 설계한 \n프라이빗 타운하우스",
    description:
      "당신의 삶을 바꾸는 공간, 스크린 골프와 수영장, 홈바와 핀란드식 사우나가 엘리베이터로 각 층으로 이어지는 하나의 공간에 창조됩니다.",
    imageAlt: "커뮤니티 및 실내 공간",
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="bg-white px-8 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl space-y-20 md:space-y-28 whitespace-pre-line leading-normal break-keep">
        {features.map((f, i) => (
          <FeatureBlock
            key={f.title}
            title={f.title}
            description={f.description}
            imageSrc={featureImages[i]}
            imageAlt={f.imageAlt}
            reverse={i % 2 === 1}
            priority={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
