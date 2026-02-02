import HomeContent from "@/features/blogpost/components/home";
import Footer from "@/shared/components/containers/footer";
import { Navbar } from "@/shared/components/containers/navbar";

type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function Home(queries: HomeProps) {
  return (
    <div>
      <Navbar />
      <HomeContent searchParams={queries.searchParams} />
      <Footer />
    </div>
  );
}
