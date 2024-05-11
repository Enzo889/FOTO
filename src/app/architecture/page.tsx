import CategoryFeed from "@/components/category-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture | FOTO",
};
function page() {
  return (
    <div className="pt-20">
      <CategoryFeed />
    </div>
  );
}

export default page;
