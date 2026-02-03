import { Separator } from "@/shared/components/ui/separator";
import BlogList from "../../../features/blogpost/components/bloglist";
import PopularBlogs from "../../../features/blogpost/components/popularBlogs";

type HomeContentProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function HomeContent({ searchParams }: HomeContentProps) {
  const params = await searchParams;
  const query = params.query;

  return (
    <div className="min-h-screen min-w-80 max-w-360 mx-auto mt-16">
      <div className="mx-auto px-4 py-6 min-w-72 w-screen sm:max-w-150 md:max-w-175 lg:max-w-231 xl:max-w-300 flex flex-col gap-4 items-center justify-start lg:flex-row lg:justify-between lg:items-start">
        {query ? (
          <main className="flex flex-col gap-4 w-auto lg:w-160 xl:w-201.75">
            <h1 className="text-cs-xl font-bold text-neutral-900 sm:text-2xl lg:text-display-sm h-8.5 lg:h-9">
              Result for <q>{query}</q>
            </h1>

            <BlogList query={query} />
          </main>
        ) : (
          <>
            <main className="flex flex-col gap-4 w-full lg:w-160 xl:w-201.75">
              <h1 className="text-cs-xl font-bold text-neutral-900 sm:text-2xl lg:text-display-sm h-8.5 lg:h-9">
                Recommend For You
              </h1>

              <BlogList />
            </main>
            <div className="w-screen h-1.5 bg-neutral-300 lg:hidden" />
            <div className="hidden lg:inline h-418.25">
              <Separator orientation="vertical" />
            </div>
            <aside className="w-full flex flex-col gap-4 lg:gap-5 lg:w-74.25">
              <h1 className="text-cs-xl font-bold text-neutral-900 sm:text-2xl lg:text-display-sm h-8.5 lg:h-9">
                Most liked
              </h1>
              <PopularBlogs />
            </aside>
          </>
        )}
      </div>
    </div>
  );
}
