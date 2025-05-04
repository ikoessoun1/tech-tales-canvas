
import { useState, useEffect } from "react";
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
import { Calendar, MessageSquare, User, Heart, ThumbsUp, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BlogComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author?: string;
}

interface BlogReaction {
  id: string;
  post_id: string;
  user_id: string;
  reaction_type: string;
}

const Blog = () => {
  const { user } = useAuth();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [reactions, setReactions] = useState<Record<string, BlogReaction[]>>({});
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  const currentPost = selectedPost ? blogPosts.find(post => post.id === selectedPost) : null;

  // Fetch comments for a specific post
  const fetchComments = async (postId: string) => {
    setLoadingComments(true);
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error: any) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
    } finally {
      setLoadingComments(false);
    }
  };

  // Fetch reactions for a post
  const fetchReactions = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_reactions')
        .select('*')
        .eq('post_id', postId);

      if (error) throw error;
      setReactions(prev => ({
        ...prev,
        [postId]: data || []
      }));
    } catch (error) {
      console.error("Error fetching reactions:", error);
    }
  };

  // Handle post selection
  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost);
      fetchReactions(selectedPost);
    }
  }, [selectedPost]);

  // Handle adding a comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedPost || !comment.trim()) return;

    setSubmittingComment(true);
    try {
      const newComment = {
        post_id: selectedPost,
        user_id: user.id,
        content: comment.trim(),
      };

      const { error } = await supabase
        .from('blog_comments')
        .insert(newComment);

      if (error) throw error;

      setComment("");
      fetchComments(selectedPost);
      toast.success("Comment added successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  // Handle reaction click
  const handleReaction = async (postId: string, reactionType: string) => {
    if (!user) {
      toast.error("Please sign in to react to posts");
      return;
    }

    try {
      const existingReaction = reactions[postId]?.find(r => r.user_id === user.id);
      
      if (existingReaction) {
        if (existingReaction.reaction_type === reactionType) {
          // Remove the reaction if clicking the same type
          const { error } = await supabase
            .from('blog_reactions')
            .delete()
            .eq('id', existingReaction.id);

          if (error) throw error;
        } else {
          // Update to the new reaction type
          const { error } = await supabase
            .from('blog_reactions')
            .update({ reaction_type: reactionType })
            .eq('id', existingReaction.id);

          if (error) throw error;
        }
      } else {
        // Add new reaction
        const { error } = await supabase
          .from('blog_reactions')
          .insert({
            post_id: postId,
            user_id: user.id,
            reaction_type: reactionType
          });

        if (error) throw error;
      }

      // Refresh reactions
      fetchReactions(postId);

    } catch (error: any) {
      toast.error(error.message || "Failed to update reaction");
    }
  };

  // Count reactions by type
  const countReactions = (postId: string, type: string) => {
    return reactions[postId]?.filter(r => r.reaction_type === type).length || 0;
  };

  // Check if user has reacted with a specific type
  const hasReacted = (postId: string, type: string) => {
    return reactions[postId]?.some(r => r.user_id === user?.id && r.reaction_type === type) || false;
  };

  // Initialize reactions tracking for visible posts
  useEffect(() => {
    const fetchAllReactions = async () => {
      for (const post of blogPosts) {
        await fetchReactions(post.id);
      }
    };
    
    fetchAllReactions();
  }, []);

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
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>{countReactions(post.id, "comment")}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Heart 
                      className={`h-4 w-4 cursor-pointer ${hasReacted(post.id, "like") ? "fill-red-500 text-red-500" : ""}`} 
                      onClick={() => handleReaction(post.id, "like")}
                    />
                    <span>{countReactions(post.id, "like")}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            View All Posts
          </Button>
          {!user && (
            <p className="mt-4 text-muted-foreground">
              <span className="font-semibold">Note:</span> Sign in to comment and react to blog posts.
            </p>
          )}
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
                
                {/* Post Reactions */}
                <div className="flex gap-2 mt-6">
                  <Button
                    variant={hasReacted(currentPost.id, "like") ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleReaction(currentPost.id, "like")}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${hasReacted(currentPost.id, "like") ? "fill-current" : ""}`} />
                    Like ({countReactions(currentPost.id, "like")})
                  </Button>
                  
                  <Button
                    variant={hasReacted(currentPost.id, "thumbsup") ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleReaction(currentPost.id, "thumbsup")}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-2 ${hasReacted(currentPost.id, "thumbsup") ? "fill-current" : ""}`} />
                    Thumbs Up ({countReactions(currentPost.id, "thumbsup")})
                  </Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <Tabs defaultValue="comments">
                  <TabsList className="mb-4">
                    <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="comments">
                    {user ? (
                      <form onSubmit={handleCommentSubmit} className="mb-6">
                        <div className="flex gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea
                              placeholder="Add a comment..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="min-h-24 mb-2"
                            />
                            <Button 
                              type="submit" 
                              disabled={!comment.trim() || submittingComment}
                            >
                              {submittingComment ? "Submitting..." : "Comment"}
                              <Send className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-muted/50 rounded-lg p-4 mb-6 text-center">
                        <p>Please <Button variant="link" asChild className="p-0 h-auto"><Link to="/auth">sign in</Link></Button> to leave a comment.</p>
                      </div>
                    )}
                    
                    {loadingComments ? (
                      <div className="text-center py-8">Loading comments...</div>
                    ) : comments.length > 0 ? (
                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <div key={comment.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{comment.author?.charAt(0) || 'U'}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{comment.author || "User"}</div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(comment.created_at).toLocaleDateString()}
                              </div>
                            </div>
                            <p className="text-foreground/80">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-4 text-muted-foreground">No comments yet. Be the first to comment!</p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
};

// Need to add the Link import
import { Link } from "react-router-dom";

export default Blog;
