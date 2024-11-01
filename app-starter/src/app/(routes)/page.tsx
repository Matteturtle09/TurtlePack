import Hero from "@/components/landing/Hero";
import FeatureSection from "@/components/landing/FeatureSection";
import { TracingBeam } from "@/components/ui/tracing-beam";


export default async function Home() {
  return (
    <div className="">
      <Hero/>
      <TracingBeam className="w-full">
      <FeatureSection side={"left"} title={"Intuitive editor"} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, maxime repellendus id totam, voluptatum debitis perspiciatis ducimus, illum sed blanditiis nam commodi. Ullam atque, deserunt non voluptatibus ipsum dolor animi?"} src={"/image.png"}/>
      <FeatureSection side={"right"} title={"Intuitive editor"} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, maxime repellendus id totam, voluptatum debitis perspiciatis ducimus, illum sed blanditiis nam commodi. Ullam atque, deserunt non voluptatibus ipsum dolor animi?"} src={"/image.png"}/>
      </TracingBeam>
    </div>
  );
}
