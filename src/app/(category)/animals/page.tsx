import CategoryFeed from "@/components/category-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animals",
};
function page() {
  return (
    <div className="pt-20">
      <CategoryFeed query="Animals" />
    </div>
  );
}

export default page;
