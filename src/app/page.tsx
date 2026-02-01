import HomeContent from "@/features/blogpost/components/home";
import { Navbar } from "@/shared/components/containers/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomeContent />
    </div>
  );
}
