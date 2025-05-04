
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, UserCheck, Users, Search } from "lucide-react";

const Admin = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [reactions, setReactions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState({
    users: false,
    comments: false,
    reactions: false
  });

  // Redirect non-admin users
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      toast.error("You don't have permission to access this page");
      navigate("/");
    }
  }, [user, isAdmin, navigate]);

  // Check for auth state loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth");
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [navigate]);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(prev => ({ ...prev, users: true }));
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast.error(error.message || "Failed to load users");
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    setLoading(prev => ({ ...prev, comments: true }));
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setComments(data || []);
    } catch (error: any) {
      console.error("Error fetching comments:", error);
      toast.error(error.message || "Failed to load comments");
    } finally {
      setLoading(prev => ({ ...prev, comments: false }));
    }
  };

  // Fetch reactions
  const fetchReactions = async () => {
    setLoading(prev => ({ ...prev, reactions: true }));
    try {
      const { data, error } = await supabase
        .from('blog_reactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setReactions(data || []);
    } catch (error: any) {
      console.error("Error fetching reactions:", error);
      toast.error(error.message || "Failed to load reactions");
    } finally {
      setLoading(prev => ({ ...prev, reactions: false }));
    }
  };

  // Load data when tab changes
  const handleTabChange = (value: string) => {
    switch (value) {
      case "users":
        fetchUsers();
        break;
      case "comments":
        fetchComments();
        break;
      case "reactions":
        fetchReactions();
        break;
      default:
        break;
    }
  };

  // Update user role
  const updateUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Update local state
      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ));
      
      toast.success(`User role updated to ${newRole}`);
    } catch (error: any) {
      console.error("Error updating user role:", error);
      toast.error(error.message || "Failed to update user role");
    }
  };

  // Delete a comment
  const deleteComment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setComments(comments.filter(c => c.id !== id));
      toast.success("Comment deleted successfully");
    } catch (error: any) {
      console.error("Error deleting comment:", error);
      toast.error(error.message || "Failed to delete comment");
    }
  };

  // Filter data based on search query
  const filterData = (data: any[]) => {
    if (!searchQuery) return data;
    
    return data.filter(item => 
      Object.values(item).some(value => 
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={signOut} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Portfolio Content</CardTitle>
            <CardDescription>
              View and manage users, comments, and reactions.
            </CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="users" onValueChange={handleTabChange}>
              <TabsList className="mb-6">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="reactions">Reactions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users">
                {loading.users ? (
                  <div className="text-center py-8">Loading users...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User ID</TableHead>
                          <TableHead>Username</TableHead>
                          <TableHead>Full Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterData(users).length > 0 ? (
                          filterData(users).map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-mono text-xs">{user.id}</TableCell>
                              <TableCell>{user.username || '—'}</TableCell>
                              <TableCell>{user.full_name || '—'}</TableCell>
                              <TableCell>
                                <Badge variant={user.role === 'admin' ? "default" : "outline"}>
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => updateUserRole(user.id, user.role)}
                                >
                                  <UserCheck className="h-4 w-4 mr-1" />
                                  {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center">No users found</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="comments">
                {loading.comments ? (
                  <div className="text-center py-8">Loading comments...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Comment ID</TableHead>
                          <TableHead>Post ID</TableHead>
                          <TableHead>User ID</TableHead>
                          <TableHead>Content</TableHead>
                          <TableHead>Created At</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterData(comments).length > 0 ? (
                          filterData(comments).map((comment) => (
                            <TableRow key={comment.id}>
                              <TableCell className="font-mono text-xs">{comment.id}</TableCell>
                              <TableCell className="font-mono text-xs">{comment.post_id}</TableCell>
                              <TableCell className="font-mono text-xs">{comment.user_id}</TableCell>
                              <TableCell className="max-w-xs truncate">{comment.content}</TableCell>
                              <TableCell>{new Date(comment.created_at).toLocaleString()}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => deleteComment(comment.id)}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center">No comments found</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reactions">
                {loading.reactions ? (
                  <div className="text-center py-8">Loading reactions...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reaction ID</TableHead>
                          <TableHead>Post ID</TableHead>
                          <TableHead>User ID</TableHead>
                          <TableHead>Reaction Type</TableHead>
                          <TableHead>Created At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterData(reactions).length > 0 ? (
                          filterData(reactions).map((reaction) => (
                            <TableRow key={reaction.id}>
                              <TableCell className="font-mono text-xs">{reaction.id}</TableCell>
                              <TableCell className="font-mono text-xs">{reaction.post_id}</TableCell>
                              <TableCell className="font-mono text-xs">{reaction.user_id}</TableCell>
                              <TableCell>{reaction.reaction_type}</TableCell>
                              <TableCell>{new Date(reaction.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center">No reactions found</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Total: {
                searchQuery ? filterData(
                  {
                    users: users,
                    comments: comments,
                    reactions: reactions
                  }[document.querySelector('[data-state="active"]')?.getAttribute('value') as 'users' | 'comments' | 'reactions'] || []
                ).length : 
                {
                  users: users.length,
                  comments: comments.length,
                  reactions: reactions.length
                }[document.querySelector('[data-state="active"]')?.getAttribute('value') as 'users' | 'comments' | 'reactions'] || 0
              } items
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

import { Badge } from "@/components/ui/badge";

export default Admin;
