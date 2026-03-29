import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  Calendar, 
  User, 
  Tag, 
  ChevronLeft, 
  Share2, 
  MessageCircle,
  Clock,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { apiGet } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";
import NotFound from "./NotFound";

interface BlogPostData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  metadata?: {
    title?: string;
    description?: string;
  };
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Fetch current post
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      const json = await apiGet(`/blog/${slug}`);
      if (!json.success) throw new Error("Post not found");
      return json.data as BlogPostData;
    },
    enabled: !!slug,
    retry: false
  });

  // Fetch recent posts for sidebar
  const { data: recentPosts } = useQuery({
    queryKey: ["recentBlogPosts"],
    queryFn: async () => {
      const json = await apiGet("/blog");
      return (json.data as BlogPostData[]).filter(p => p.slug !== slug).slice(0, 4);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="font-heading text-xl animate-pulse">Loading Story...</p>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return <NotFound />;
  }

  // Structured Data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": [{
      "@type": "Person",
      "name": post.author,
      "url": SITE_URL
    }],
    "description": post.excerpt,
    "publisher": {
      "@type": "Organization",
      "name": "Star Banquet Pepsicola",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.png`
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title={post.metadata?.title || `${post.title} | Star Banquet Blog`}
        description={post.metadata?.description || post.excerpt}
        canonical={`${SITE_URL}/blog/${post.slug}`}
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <Navbar />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        initial={{ scaleX: 0 }}
        style={{ scaleX: 0 }} // In a real app, bind this to scroll progress
      />

      <main className="py-12 lg:py-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs / Back Link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-10 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Planning Tips
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
            {/* Article Column */}
            <article>
              {/* Header */}
              <header className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-primary/10 text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5" /> 5 Min Read
                    </span>
                  </div>
                  <h1 className="font-heading text-4xl lg:text-6xl italic leading-tight mb-8">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">{post.author}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="p-2.5 rounded-full border border-border hover:bg-gray-50 transition-colors text-muted-foreground hover:text-primary">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 rounded-full border border-border hover:bg-gray-50 transition-colors text-muted-foreground hover:text-primary">
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 rounded-full border border-border hover:bg-gray-50 transition-colors text-muted-foreground hover:text-primary">
                        <Twitter className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </header>

              {/* Featured Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-[21/9] overflow-hidden rounded-[2rem] mb-12 shadow-2xl"
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Content */}
              <div className="font-body text-charcoal/80 text-lg leading-relaxed max-w-none prose prose-lg prose-primary mb-20 whitespace-pre-wrap">
                {post.content}
              </div>

              {/* Footer / Sharing */}
              <div className="p-10 bg-secondary/30 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/10">
                <div>
                  <h3 className="font-heading text-2xl mb-2">Think your friends would love this?</h3>
                  <p className="font-body text-muted-foreground">Share this planning guide with your community.</p>
                </div>
                <div className="flex items-center gap-4">
                   <button className="flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-full font-ui text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors">
                     <Facebook className="w-4 h-4" /> Share on FB
                   </button>
                   <button className="flex items-center gap-2 border-2 border-charcoal text-charcoal px-6 py-3 rounded-full font-ui text-sm font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors">
                     <Link to="/contact">Discuss with us</Link>
                   </button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-12">
              {/* Recent Posts */}
              <div className="bg-white p-8 border border-border rounded-[2rem] shadow-sm">
                 <h3 className="font-heading text-xl mb-8 border-b border-border pb-4">Recent Stories</h3>
                 <div className="space-y-8">
                   {recentPosts?.map((rp) => (
                     <Link key={rp.slug} to={`/blog/${rp.slug}`} className="flex gap-4 group">
                       <div className="w-20 h-20 shrink-0 overflow-hidden rounded-xl">
                         <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       </div>
                       <div className="flex flex-col justify-center">
                         <h4 className="text-sm font-bold text-charcoal group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                           {rp.title}
                         </h4>
                         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 flex items-center gap-1">
                           <Calendar className="w-3 h-3" /> {new Date(rp.publishedAt).toLocaleDateString()}
                         </p>
                       </div>
                     </Link>
                   ))}
                 </div>
              </div>

              {/* Categories */}
              <div className="bg-charcoal text-white p-8 rounded-[2rem] relative overflow-hidden group">
                 <div className="relative z-10">
                   <h3 className="font-heading text-xl mb-6">Explore Topics</h3>
                   <div className="flex flex-wrap gap-2">
                     {['Wedding', 'Corporate', 'Parties', 'Planning', 'Catering'].map(cat => (
                       <span key={cat} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors backdrop-blur-sm">
                         {cat}
                       </span>
                     ))}
                   </div>
                 </div>
                 <Tag className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              </div>

              {/* Mini CTA */}
              <div className="bg-primary p-8 rounded-[2rem] text-center text-primary-foreground">
                 <h3 className="font-heading text-2xl mb-4">Ready to start planning?</h3>
                 <p className="font-body text-sm mb-8 opacity-90">Book your discovery call today and let's create memories that last a lifetime.</p>
                 <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full font-ui text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg">
                   Get a Quote <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
