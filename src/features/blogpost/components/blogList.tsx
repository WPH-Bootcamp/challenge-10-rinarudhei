"use client";
import { useGetMe } from "@/features/user/hooks/useGetMe";

export default function BlogList() {
  const { isError, data, isPending, error } = useGetMe();
  return (
    <div className="min-h-screen min-w-80 max-w-360 mx-auto">
      <main className="mx-auto px-4 py-8 min-w-72 sm:w-150 md:w-175 lg:w-231 xl:w-305">
        <h1 className="text-3xl font-bold mb-8">Blog App Challenge</h1>

        {/* TODO: Implement blog posts list here */}
        <div className="flex space-y-4 overflow-hidden">
          <p className="text-gray-600 text-wrap">{JSON.stringify(data)}</p>
        </div>
      </main>
    </div>
  );
}
