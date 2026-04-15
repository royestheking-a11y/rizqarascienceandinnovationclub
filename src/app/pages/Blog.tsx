import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Tag, ArrowRight, Search } from 'lucide-react';
import { fetchBlog } from '../data/api';
import { Link } from 'react-router';

const CATEGORIES = ['All', 'Technology', 'Education', 'Success Story', 'Career', 'Design', 'Research'];

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchBlog().then(setBlogs).catch(console.error);
  }, []);

  const featured = blogs.find(p => p.featured);
  const filtered = blogs.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch && !p.featured;
  });

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: '#3A0000' }}>
        <div className="absolute inset-0 opacity-25 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1766297247924-6638d54e7c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920')` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,0,5,0.7) 0%, rgba(10,0,5,0.97) 100%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#800020' }}>Knowledge Center</span>
            <h1 className="text-white mt-4 mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
              RSIC Blog
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              Insights, tutorials, success stories, and perspectives from the RSIC community on technology, innovation, and career growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-12 px-4" style={{ background: '#F5F5F5' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="rounded-3xl overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300"
              style={{ background: '#fff', boxShadow: '0 10px 50px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative overflow-hidden" style={{ minHeight: '400px' }}>
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ minHeight: '400px' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(255,255,255,0.1) 100%)' }} />
                  <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: '#800020', color: '#fff' }}>
                    ⭐ Featured
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(128,0,32,0.1)', color: '#800020' }}>
                      {featured.category}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center gap-1.5">
                      <Clock size={12} /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontFamily: 'Playfair Display, serif', color: '#1a0005', fontWeight: 800, lineHeight: 1.3 }}>
                    {featured.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 mb-6">
                    <img src={featured.authorImage} alt={featured.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{featured.author}</div>
                      <div className="text-gray-500 text-xs">{featured.authorRole}</div>
                    </div>
                    <span className="ml-auto text-gray-500 text-xs flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(featured.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: '#F5F5F5', color: '#374151' }}>
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-2 font-bold" style={{ color: '#800020' }}>
                    Read Full Article <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Search + Filter */}
      <section className="py-6 px-4" style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] text-sm text-gray-900"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all"
                style={{ background: activeCategory === cat ? '#800020' : '#F5F5F5', color: activeCategory === cat ? '#fff' : '#374151' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post._id || post.customId || post.id}
                  className="rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
                  style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#800020' }}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={12} />{new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: '#F5F5F5', color: '#374151' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <img src={post.authorImage} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                        <span className="text-xs font-medium text-gray-700">{post.author}</span>
                      </div>
                      <span className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: '#800020' }}>
                        Read <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4" style={{ background: '#800020' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontSize: '2.2rem', fontFamily: 'Playfair Display, serif' }}>
            Stay in the Loop
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Get the latest tech insights, innovation stories, and RSIC news delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl text-gray-900 focus:outline-none"
            />
            <button className="px-6 py-4 rounded-xl font-bold text-sm transition-all hover:scale-105" style={{ background: '#4A0000', color: '#fff' }}>
              Subscribe
            </button>
          </div>
          <p className="text-white/50 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}