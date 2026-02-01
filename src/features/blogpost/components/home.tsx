import { Separator } from "@/shared/components/ui/separator";
import BlogList from "./bloglist";
import PopularBlogs from "./popularBlogs";

export default function HomeContent() {
  return (
    <div className="min-h-screen min-w-80 max-w-360 mx-auto">
      <div className="mx-auto px-4 py-6 min-w-72 sm:w-150 md:w-175 lg:w-231 xl:w-305 flex flex-col gap-4 items-center justify-start">
        <main>
          <h1 className="text-xl font-bold tracking-tight leading-8.5 text-neutral-900 sm:text-2xl sm:leading-9 lg:text-[28px] lg:leading-9.5">
            Recommend For You
          </h1>

          <BlogList />
        </main>
        <Separator />
        <aside>
          <h1 className="text-xl font-bold tracking-tight leading-8.5 text-neutral-900 sm:text-2xl sm:leading-9 lg:text-[28px] lg:leading-9.5">
            Most likes
          </h1>
          <PopularBlogs />
        </aside>
      </div>
    </div>
  );
}
