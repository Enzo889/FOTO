import CategoryFeed from "@/components/category-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel",
};
function page() {
  return (
    <div className="pt-20">
      <CategoryFeed query="Travel" />
    </div>
  );
}

export default page;
