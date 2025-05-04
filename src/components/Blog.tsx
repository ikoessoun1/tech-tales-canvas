
import { blogPosts } from "@/utils/demoData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  
  const currentPost = selectedPost ? blogPosts.find(post => post.id === selectedPost) : null;

  return (
    <section id="blog" className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="section-title">Recent Blog Posts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={post.id} className={`overflow-hidden card-hover animate-fade-in`} style={{animationDelay: `${index * 100}ms`}}>
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader className="p-6 pb-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </div>
                <CardDescription className="flex items-center gap-1 mt-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-4">
                <p className="text-muted-foreground line-clamp-3">
                  {post.summary}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <Button onClick={() => setSelectedPost(post.id)}>Read More</Button>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments.length}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            View All Posts
          </Button>
          <p className="mt-4 text-muted-foreground">
            <span className="font-semibold">Note:</span> Sign in to comment on blog posts.
          </p>
        </div>

        {/* Blog Post Dialog */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          {currentPost && (
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{currentPost.title}</DialogTitle>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{currentPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{currentPost.author}</span>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-4 mb-6">
                <div className="rounded-lg overflow-hidden h-64 mb-6">
                  <img
                    src={currentPost.image}
                    alt={currentPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none" 
                     dangerouslySetInnerHTML={{ __html: currentPost.content }} />

                <div className="flex flex-wrap gap-2 mt-6">
                  {currentPost.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Comments ({currentPost.comments.length})</h3>
                
                {currentPost.comments.length > 0 ? (
                  <div className="space-y-4">
                    {currentPost.comments.map((comment) => (
                      <div key={comment.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{comment.author}</div>
                          <div className="text-sm text-muted-foreground">{comment.date}</div>
                        </div>
                        <p className="text-foreground/80">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No comments yet.</p>
                )}

                <div className="mt-6 pt-4 border-t">
                  <p className="text-center text-muted-foreground">
                    <span className="font-semibold">Note:</span> Sign in to leave a comment.
                  </p>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
};

export default Blog;
