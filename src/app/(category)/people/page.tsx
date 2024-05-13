import CategoryFeed from "@/components/category-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "People",
};
function page() {
  return (
    <div className="pt-20">
      <CategoryFeed query="People" />
    </div>
  );
}

export default page;
