import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, User, Tag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { PAGE_META } from "@/lib/seo";
import { apiGet } from "@/lib/api";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
}

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      const json = await apiGet("/blog");
      return json.data as BlogPost[];
    },
  });

  const featuredPost = posts?.[0];
  const regularPosts = posts?.slice(1);

  return (
    <div className="min-h-screen">
      <PageSEO
        title={PAGE_META.blog.title}
        description={PAGE_META.blog.description}
        canonical={PAGE_META.blog.canonical}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-secondary/10 to-transparent overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle mb-4">Expert Advice & Inspiration</p>
            <h1 className="font-heading text-5xl md:text-7xl italic mb-6">
              Wedding & Event <span className="text-primary not-italic">Planning Tips</span>
            </h1>
            <p className="max-w-2xl mx-auto font-body text-muted-foreground leading-relaxed">
              Your comprehensive guide to hosting unforgettable celebrations in Kathmandu. 
              From venue selection to decor trends, we share professional insights to make your planning seamless.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Blog Content */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-[16/10] rounded-2xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-20"
                >
                  <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white border border-border overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-none md:rounded-[2rem]">
                    <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="bg-primary text-primary-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                          Featured Post
                        </span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-primary" /> {featuredPost.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary" /> {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <h2 className="font-heading text-3xl lg:text-4xl mb-6 hover:text-primary transition-colors leading-tight">
                        <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                      </h2>
                      <p className="font-body text-muted-foreground leading-relaxed mb-10 text-lg line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div>
                        <Link
                          to={`/blog/${featuredPost.slug}`}
                          className="inline-flex items-center gap-2 font-ui text-sm font-bold uppercase tracking-widest text-primary group/link"
                        >
                          Continue Reading
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                {regularPosts?.map((post, i) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col group"
                  >
                    <Link to={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden mb-6 block rounded-2xl shadow-sm group-hover:shadow-xl transition-all duration-300">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-charcoal px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-border">
                          {post.category}
                        </span>
                      </div>
                    </Link>
                    <div className="flex items-center gap-4 mb-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-primary" /> {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-primary" /> By {post.author}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-widest text-primary border-b border-transparent hover:border-primary transition-all pb-1 w-fit"
                    >
                      Read Post <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto p-12 lg:p-16 border-2 border-primary/20 bg-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="font-heading text-4xl mb-6">Need a professional venue for your next event?</h2>
                    <p className="font-body text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                        Whether it’s a grand wedding or a strategic corporate meeting, our team at Star Banquet Pepsicola is here to bring your vision to life.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="btn-primary px-10 py-4 rounded-none !bg-charcoal text-white hover:!bg-black transition-colors w-full sm:w-auto">
                            Book a Consultation
                        </Link>
                        <Link to="/events" className="font-ui text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors w-full sm:w-auto">
                            Explore Our Services
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
