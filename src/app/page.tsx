/**
 * Home Page
 *
 * TODO: Implement homepage sesuai dengan design Figma
 * - Tampilkan daftar artikel blog
 * - Implement search/filter jika diperlukan
 * - Handle loading dan error states
 */

import BlogList from "@/features/blogpost/components/blogList";
import { Navbar } from "@/shared/components/containers/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <BlogList />
    </div>
  );
}
