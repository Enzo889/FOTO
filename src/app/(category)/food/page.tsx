import CategoryFeed from "@/components/category-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food",
};
function page() {
  return (
    <div className="pt-20">
      <CategoryFeed query="Food" />
    </div>
  );
}

export default page;
