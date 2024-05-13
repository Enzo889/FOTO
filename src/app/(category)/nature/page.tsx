import CategoryFeed from "@/components/category-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nature",
};
function page() {
  return (
    <div className="pt-20">
      <CategoryFeed query="Nature" />
    </div>
  );
}

export default page;
