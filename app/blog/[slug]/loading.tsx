export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-background py-16">
      <article className="container mx-auto px-4 max-w-3xl">
        {/* Back button skeleton */}
        <div className="mb-8">
          <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="mb-6 space-y-4">
          <div className="h-12 w-3/4 bg-muted rounded animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
        
        {/* Tags skeleton */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-20 bg-muted rounded-full animate-pulse"></div>
          ))}
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-11/12 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-10/12 bg-muted rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
