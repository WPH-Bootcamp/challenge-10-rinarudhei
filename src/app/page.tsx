import HomeContent from "@/app/(home)/partials/home";
import Footer from "@/shared/components/containers/footer";
import { Navbar } from "@/shared/components/containers/navbar";

type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function Home(queries: HomeProps) {
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <Navbar />
      <HomeContent searchParams={queries.searchParams} />
      <Footer />
    </div>
  );
}
