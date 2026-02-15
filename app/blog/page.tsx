import { blogPosts } from '@/data/blog-posts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Blog | Melnar Ancit Cordova',
  description: 'Technical articles and insights from my development journey',
};

export default function BlogPage() {
  const allPosts = blogPosts.sort((a, b) => 
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <Button 
              variant="ghost" 
              size="sm"
              className="mb-6 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Blog & Writing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Technical articles, tutorials, and insights from my development journey.
            Exploring topics in web development, software engineering, and best practices.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {allPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post) => {
              const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <Link 
                  key={post.slug}
                  href={`/blog/${post.slug}`} 
                  className="block h-full"
                  aria-label={`Read article: ${post.title}`}
                >
                  <Card className="group h-full flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-2" role="list" aria-label="Article tags">
                        {post.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary"
                            className="text-xs"
                            role="listitem"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        <time dateTime={post.publishedDate}>{formattedDate}</time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No blog posts available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
