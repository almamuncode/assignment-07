export default function ProductSkeleton() {
  return <div className="page-container py-10" role="status" aria-label="পণ্যের দাম লোড হচ্ছে">
    <span className="sr-only">পণ্যের দাম লোড হচ্ছে…</span>
    <div className="skeleton mb-4 h-8 w-48" />
    <div className="skeleton mb-8 h-4 w-64 max-w-full" />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }, (_, index) => <div key={index} className="product-card space-y-5" aria-hidden="true">
        <div className="flex gap-3"><div className="skeleton h-12 w-12" /><div className="space-y-2"><div className="skeleton h-5 w-28" /><div className="skeleton h-3 w-20" /></div></div>
        <div className="skeleton h-7 w-24" />
      </div>)}
    </div>
  </div>;
}
