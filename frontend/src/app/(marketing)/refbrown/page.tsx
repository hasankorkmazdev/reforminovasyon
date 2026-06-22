import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";

export const metadata: Metadata = {
  title: "RefBrown Projesi",
  description: "Ahşap ve taş detayların zarafetle harmanlandığı, doğa ile iç içe sürdürülebilir konut projesi.",
};

export default function RefBrownPage() {
  return <ProjectPage badge="Konsept Proje" title="Ref" span="Brown" color="#8B4513" desc="Ahşap ve taş detayların zarafetle harmanlandığı, doğa ile iç içe, sürdürülebilir konut projesi. Doğal tekstürleri modern yaşamın gereklilikleriyle birleştiriyor." />;
}
