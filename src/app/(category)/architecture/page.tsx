import CategoryFeed from "@/components/category-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture",
};
function page() {
  return (
    <div className="pt-20">
      <CategoryFeed query="Architecture" />
    </div>
  );
}

export default page;
