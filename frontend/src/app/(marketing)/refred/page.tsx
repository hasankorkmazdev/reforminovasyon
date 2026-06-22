import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";

export const metadata: Metadata = {
  title: "RefRed Projesi",
  description: "Şehrin merkezinde dinamizmi simgeleyen cesur kırmızı çelik strüktürler. Modern karma yaşam merkezi.",
};

export default function RefRedPage() {
  return <ProjectPage badge="Ticari & Karma Yaşam" title="Ref" span="Red" color="#DC3545" desc="Şehrin merkezinde dinamizmi simgeleyen cesur kırmızı çelik strüktürler. Alışveriş, ofis ve sosyal alanları entegre eden modern karma yaşam merkezi projesi." />;
}
