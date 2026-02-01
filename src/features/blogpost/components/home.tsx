import { Separator } from "@/shared/components/ui/separator";
import BlogList from "./bloglist";
import PopularBlogs from "./popularBlogs";

export default function HomeContent() {
  return (
    <div className="min-h-screen min-w-80 max-w-360 mx-auto">
      <div className="mx-auto px-4 py-6 min-w-72 w-screen sm:max-w-150 md:max-w-175 lg:max-w-231 xl:max-w-305 flex flex-col gap-4 items-center justify-start lg:grid lg:auto-cols-max lg:grid-flow-col lg:items-start">
        <main className="flex flex-col gap-4 w-auto lg:w-160 xl:w-201.75">
          <h1 className="text-xl font-bold tracking-tight leading-8.5 text-neutral-900 sm:text-2xl sm:leading-9 lg:text-[28px] lg:leading-9.5 px-4">
            Recommend For You
          </h1>

          <BlogList />
        </main>
        <div className="w-screen h-1.5 bg-neutral-300 lg:hidden" />
        <div className="hidden lg:inline h-418.25">
          <Separator orientation="vertical" />
        </div>
        <aside className="lg:w-56 xl:w-86.25">
          <h1 className="text-xl font-bold tracking-tight leading-8.5 text-neutral-900 sm:text-2xl sm:leading-9 lg:text-[28px] lg:leading-9.5 px-4">
            Most likes
          </h1>
          <PopularBlogs />
        </aside>
      </div>
    </div>
  );
}
