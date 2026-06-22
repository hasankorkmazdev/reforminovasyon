import type { Metadata } from "next";
import ProjectPage from "@/components/ProjectPage";

export const metadata: Metadata = {
  title: "RefGreen Projesi",
  description: "Kendi enerjisini üreten, yağmur suyu toplama sistemli ekolojik villalar.",
};

export default function RefGreenPage() {
  return <ProjectPage badge="Ekolojik & Sürdürülebilir" title="Ref" span="Green" color="#28A745" desc="Kendi enerjisini üreten, yağmur suyu toplama sistemli ekolojik villalar. Dikey peyzajı ve yeşil çatı teknolojileriyle doğaya karbon ayak izi bırakmayan inovatif mimari." />;
}
