import { Skeleton } from "./ui/skeleton";

const ProductSkeleton = () => {
  const skeletonCount = 12;
  const skeletonArray = Array.from({ length: skeletonCount }, (_, i) => (
    <Skeleton key={i} className="aspect-square bg-muted rounded-lg h-56 w-56" />
  ));
  return <>{skeletonArray}</>;
};

export default ProductSkeleton;
