export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header skeleton */}
        <div className="mb-12 space-y-4">
          <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
          <div className="h-12 w-3/4 bg-muted rounded animate-pulse"></div>
        </div>
        
        {/* Blog cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-muted rounded-lg p-6 space-y-4">
              <div className="h-6 w-3/4 bg-muted rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse"></div>
              </div>
              <div className="flex gap-4">
                <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
