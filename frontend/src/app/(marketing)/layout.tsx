import "../marketing.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="blob-bg">
        <div className="blob blob-black" />
        <div className="blob blob-red" />
        <div className="blob blob-white" />
        <div className="blob blob-blue" />
      </div>
      <div className="marketing-wrapper">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
