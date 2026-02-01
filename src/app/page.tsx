import HomeContent from "@/features/blogpost/components/home";
import Footer from "@/shared/components/containers/footer";
import { Navbar } from "@/shared/components/containers/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomeContent />
      <Footer />
    </div>
  );
}
