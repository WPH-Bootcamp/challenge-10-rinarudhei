import DetailBlogContent from "@/app/detail/[id]/partials/detailBlog";
import Footer from "@/shared/components/containers/footer";
import { Navbar } from "@/shared/components/containers/navbar";

export default function DetailPage() {
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <Navbar />
      <DetailBlogContent />
      <Footer />
    </div>
  );
}
