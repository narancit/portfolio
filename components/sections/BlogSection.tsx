import { blogPosts } from '@/data/blog-posts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export function BlogSection() {
  const recentPosts = blogPosts
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 3);

  return (
    <SectionWrapper
      id="blog"
      heading="Blog & Writing"
      description="Technical articles and insights from my development journey"
    >
      {/* Blog Posts Grid */}
      {recentPosts.length > 0 ? (
        <>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            role="list"
            aria-label="Recent blog posts"
          >
            {recentPosts.map((post) => {
              const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <div key={post.slug} role="listitem">
                  <Link 
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
                </div>
              );
            })}
          </div>

          {/* View All Posts Link */}
          <div className="text-center">
            <Link href="/blog">
              <Button 
                variant="outline" 
                size="lg"
                className="group"
                aria-label="View all blog posts"
              >
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No blog posts available at the moment.
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
