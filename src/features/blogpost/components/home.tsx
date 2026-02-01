import BlogList from "./bloglist";
import PopularBlogs from "./popularBlogs";

export default function HomeContent() {
  return (
    <div className="min-h-screen min-w-80 max-w-360 mx-auto">
      <div className="mx-auto px-4 py-6 min-w-72 w-screen sm:max-w-150 md:max-w-175 lg:max-w-231 xl:max-w-305 flex flex-col gap-4 items-center justify-start">
        <main className="flex flex-col gap-4 w-auto">
          <h1 className="text-xl font-bold tracking-tight leading-8.5 text-neutral-900 sm:text-2xl sm:leading-9 lg:text-[28px] lg:leading-9.5 px-4">
            Recommend For You
          </h1>

          <BlogList />
        </main>
        <div className="w-screen h-1.5 bg-neutral-300" />
        <aside className="">
          <h1 className="text-xl font-bold tracking-tight leading-8.5 text-neutral-900 sm:text-2xl sm:leading-9 lg:text-[28px] lg:leading-9.5">
            Most likes
          </h1>
          <PopularBlogs />
        </aside>
      </div>
    </div>
  );
}
