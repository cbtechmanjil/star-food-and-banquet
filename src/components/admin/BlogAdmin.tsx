import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { 
  Loader2, Trash2, Image as ImageIcon, 
  Plus, X, Edit, Eye, Save, Globe, 
  FileEdit, CheckCircle, Clock, Search
} from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete, apiCall } from "@/lib/api";
import { getMinioUrl } from "@/lib/minioUrl";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  status: 'Draft' | 'Published';
  publishedAt: string;
  metadata?: {
    title?: string;
    description?: string;
  };
}

export default function BlogAdmin() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts, refetch, isLoading } = useQuery({
    queryKey: ['adminBlogPosts'],
    queryFn: async () => {
      const json = await apiGet("/blog/admin/list");
      return json.data as BlogPost[];
    }
  });

  const handleCreateNew = () => {
    setSelectedPost(null);
    setIsEditing(true);
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;
    try {
      const json = await apiDelete(`/blog/admin/${id}`);
      if (json.success) {
        toast.success("Post deleted successfully");
        refetch();
      }
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const filteredPosts = posts?.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Blog Management</h1>
          <p className="text-gray-500 text-sm">Create and manage your wedding & event planning tips.</p>
        </div>
        <button 
          onClick={handleCreateNew}
          className="bg-gold text-charcoal px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-gold/20 transition-all border border-gold"
        >
          <Plus className="w-5 h-5" /> Write New Post
        </button>
      </div>

      {!isEditing ? (
        <>
          {/* Search & Stats */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by title or category..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-gold/30 outline-none"
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest px-4 border-l border-gray-100">
               <span>Total: {posts?.length || 0}</span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts?.map((post) => (
              <div key={post._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={getMinioUrl(post.image)} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      post.status === 'Published' ? 'bg-green-500 text-white' : 'bg-amber-400 text-white'
                    }`}>
                      {post.status}
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm text-charcoal px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-charcoal mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mb-6 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                  
                  <div className="flex gap-2 pt-4 border-t border-gray-50">
                    <button 
                      onClick={() => handleEdit(post)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-charcoal rounded-lg text-xs font-bold hover:bg-gold hover:shadow-sm transition-all"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <a 
                      href={`/blog/${post.slug}`} 
                      target="_blank" 
                      className="flex items-center justify-center p-2 bg-gray-50 text-gray-400 hover:text-primary rounded-lg transition-colors border border-transparent hover:border-primary/20"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <button 
                      onClick={() => handleDelete(post._id)}
                      className="flex items-center justify-center p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPosts?.length === 0 && (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                 <FileEdit className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No stories found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <BlogForm 
          post={selectedPost} 
          onClose={() => setIsEditing(false)} 
          onSave={() => { setIsEditing(false); refetch(); }} 
        />
      )}
    </div>
  );
}

// ================= FORM COMPONENT =================
const BlogForm = ({ post, onClose, onSave }: { post: BlogPost | null, onClose: () => void, onSave: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    category: post?.category || "Planning",
    status: post?.status || "Published",
    image: post?.image || "",
    metadata: {
      title: post?.metadata?.title || "",
      description: post?.metadata?.description || ""
    }
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const update: any = { title: val };
    // Only auto-update slug if it's a new post or slug is empty
    if (!post || !formData.slug) {
      update.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    setFormData(prev => ({ ...prev, ...update }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);

    try {
      const json = await apiPost("/blog/admin/upload", fd);
      if (json.success) {
        setFormData(prev => ({ ...prev, image: json.url }));
        toast.success("Cover image uploaded");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = post ? `/blog/admin/${post._id}` : "/blog/admin";
      const method = post ? apiPut : apiPost;
      
      const json = await method(url, formData);
      if (json.success) {
        toast.success(post ? "Post updated!" : "New story published!");
        onSave();
      }
    } catch {
      toast.error("Process failed. Please check fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between p-8 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gold/10 text-gold rounded-2xl">
            <FileEdit className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-charcoal">{post ? "Edit Story" : "Compose New Story"}</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Article Editor</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Post Content</label>
              
              <div className="space-y-6">
                <input 
                  required
                  placeholder="Enter a compelling title..." 
                  className="w-full text-3xl font-heading font-bold border-none placeholder:text-gray-200 outline-none p-0 focus:ring-0"
                  value={formData.title}
                  onChange={handleTitleChange}
                />
                
                <div className="flex items-center gap-2 py-2 px-3 bg-gray-50 rounded-lg border border-gray-100 group">
                  <Globe className="w-3.5 h-3.5 text-gray-300 group-focus-within:text-gold" />
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">starfoodbanquet.com/blog/</span>
                  <input 
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="flex-1 bg-transparent border-none p-0 text-xs font-bold text-charcoal focus:ring-0"
                    placeholder="post-slug-here"
                  />
                </div>

                <textarea 
                  required
                  placeholder="Write an engaging excerpt (shown in list items)..."
                  className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm italic text-gray-500 focus:border-gold outline-none min-h-[100px]"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                />

                <textarea 
                  required
                  placeholder="Tell your story here..."
                  className="w-full p-6 border border-gray-100 rounded-[2rem] text-sm leading-relaxed min-h-[400px] focus:ring-2 focus:ring-gold/10 focus:border-gold outline-none"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-8">
             {/* Cover Image */}
             <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Featured Image</label>
                <div 
                  className="aspect-[16/10] relative rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 group cursor-pointer hover:border-gold/50 transition-colors"
                  onClick={() => document.getElementById('cover-up')?.click()}
                >
                  {formData.image ? (
                    <>
                      <img src={getMinioUrl(formData.image)} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <UploadCloud className="w-10 h-10 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                       < ImageIcon className="h-10 w-10 text-gray-200 group-hover:text-gold transition-colors" />
                       <span className="text-[10px] font-bold text-gray-400">Click to Upload</span>
                    </div>
                  )}
                  {uploading && <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>}
                </div>
                <input id="cover-up" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
             </div>

             {/* Classification */}
             <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 space-y-6">
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Category</label>
                   <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold shadow-sm outline-none"
                   >
                     {['Wedding', 'Corporate', 'Parties', 'Planning', 'Catering'].map(c => (
                       <option key={c} value={c}>{c}</option>
                     ))}
                   </select>
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Publish Status</label>
                   <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, status: 'Draft'})}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                          formData.status === 'Draft' ? 'bg-charcoal text-white' : 'bg-white text-gray-400 border border-gray-100'
                        }`}
                      >
                        Draft
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, status: 'Published'})}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                          formData.status === 'Published' ? 'bg-green-500 text-white shadow-sm' : 'bg-white text-gray-400 border border-gray-100'
                        }`}
                      >
                        Publish
                      </button>
                   </div>
                </div>
             </div>

             {/* SEO Metadata */}
             <div className="bg-secondary/50 p-6 rounded-[2rem] border border-primary/5 space-y-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                   <Globe className="w-4 h-4 text-primary" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">SEO Metadata</h4>
                </div>
                <div>
                   <label className="text-[9px] font-bold text-muted-foreground uppercase mb-1 block">Meta Title</label>
                   <input 
                    value={formData.metadata.title}
                    onChange={(e) => setFormData({...formData, metadata: { ...formData.metadata, title: e.target.value }})}
                    className="w-full p-2 bg-white rounded-lg text-[11px] border-none shadow-sm focus:ring-1 focus:ring-primary"
                    placeholder="Search engine title..."
                   />
                </div>
                <div>
                   <label className="text-[9px] font-bold text-muted-foreground uppercase mb-1 block">Meta Description</label>
                   <textarea 
                    rows={3}
                    value={formData.metadata.description}
                    onChange={(e) => setFormData({...formData, metadata: { ...formData.metadata, description: e.target.value }})}
                    className="w-full p-2 bg-white rounded-lg text-[11px] border-none shadow-sm focus:ring-1 focus:ring-primary"
                    placeholder="Describe content for Google..."
                   />
                </div>
             </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-4 pt-10 border-t border-gray-50">
           <button 
            type="button"
            onClick={onClose}
            className="px-8 py-3 rounded-xl font-bold text-sm text-gray-400 hover:text-charcoal transition-colors"
           >
             Discard
           </button>
           <button 
            type="submit"
            disabled={loading || uploading}
            className="px-10 py-3 bg-charcoal text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-black hover:shadow-2xl transition-all shadow-xl"
           >
             {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
             {post ? "Update Article" : "Save Story"}
           </button>
        </div>
      </form>
    </div>
  );
};

// Simple UploadCloud fallback
const UploadCloud = (props: any) => (
  <svg 
    {...props} 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/>
  </svg>
);
