import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";

export const metadata: Metadata = {
  title: "RefBlue Projesi",
  description: "Gökyüzü tonlarının yüksek teknoloji cam cephelerle buluştuğu lüks rezidans konsepti.",
};

export default function RefBluePage() {
  return <ProjectPage badge="Rezidans & Akıllı Ev" title="Ref" span="Blue" color="#0F52BA" desc="Gökyüzü tonlarının yüksek teknoloji cam cephelerle buluştuğu lüks rezidans konsepti. Akıllı bina altyapısı ve panoramik şehir manzarasıyla geleceği bugünden yaşatıyor." />;
}
