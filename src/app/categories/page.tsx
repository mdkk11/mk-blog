'use client'
import { SectionHeader } from "@/ui/components/SectionHeader";
import { mockArticles } from "@/data/mockArticles";
import { ArticleCardGrid } from "@/features/Article/components/ArticleCardGrid";

export default function CategoriesPage() {
    // Filter articles by category (example: DESIGN)
    const categoryArticles = mockArticles.filter(article => article.category === 'DESIGN');

    return (
        <main className="space-y-12">
            {/* Category Header */}
            <header className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-black font-heading uppercase tracking-tighter">
                    Categories
                </h1>

                <div className="flex items-center gap-4">
                    <div className="h-[3px] w-12 bg-black" />
                    <p className="font-mono text-sm uppercase font-bold">
                        {categoryArticles.length} Articles
                    </p>
                    <div className="h-[3px] flex-1 bg-black" />
                </div>
            </header>

            {/* Filter Buttons */}
            <section>
                <div className="flex flex-wrap gap-3">
                    <button className="bg-primary text-white px-6 py-2 border-[2px] border-black font-mono text-sm font-bold uppercase">
                        Recent
                    </button>
                    <button className="bg-white text-black px-6 py-2 border-[2px] border-black font-mono text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors">
                        Popular
                    </button>
                    <button className="bg-white text-black px-6 py-2 border-[2px] border-black font-mono text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors">
                        Oldest
                    </button>
                </div>
            </section>

            {/* All Categories */}
            <section className="space-y-8">
                <SectionHeader title="ALL_CATEGORIES" />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <button className="bg-white border-[3px] border-black p-6 hover:bg-primary hover:text-white transition-colors group">
                        <h3 className="font-black font-heading text-2xl uppercase tracking-tighter mb-2">
                            Design
                        </h3>
                        <p className="font-mono text-xs">12 articles</p>
                    </button>

                    <button className="bg-white border-[3px] border-black p-6 hover:bg-primary hover:text-white transition-colors group">
                        <h3 className="font-black font-heading text-2xl uppercase tracking-tighter mb-2">
                            Tech
                        </h3>
                        <p className="font-mono text-xs">18 articles</p>
                    </button>

                    <button className="bg-white border-[3px] border-black p-6 hover:bg-primary hover:text-white transition-colors group">
                        <h3 className="font-black font-heading text-2xl uppercase tracking-tighter mb-2">
                            Opinion
                        </h3>
                        <p className="font-mono text-xs">8 articles</p>
                    </button>

                    <button className="bg-white border-[3px] border-black p-6 hover:bg-primary hover:text-white transition-colors group">
                        <h3 className="font-black font-heading text-2xl uppercase tracking-tighter mb-2">
                            Tutorial
                        </h3>
                        <p className="font-mono text-xs">15 articles</p>
                    </button>

                    <button className="bg-white border-[3px] border-black p-6 hover:bg-primary hover:text-white transition-colors group">
                        <h3 className="font-black font-heading text-2xl uppercase tracking-tighter mb-2">
                            News
                        </h3>
                        <p className="font-mono text-xs">22 articles</p>
                    </button>

                    <button className="bg-white border-[3px] border-black p-6 hover:bg-primary hover:text-white transition-colors group">
                        <h3 className="font-black font-heading text-2xl uppercase tracking-tighter mb-2">
                            Review
                        </h3>
                        <p className="font-mono text-xs">6 articles</p>
                    </button>
                </div>
            </section>

            {/* Articles in this category */}
            <section className="space-y-8">
                <SectionHeader title="DESIGN_ARTICLES" />

                <ArticleCardGrid
                    articles={categoryArticles.length > 0 ? categoryArticles : mockArticles}
                    columns={3}
                    maxItems={6}
                />

                <div className="text-center">
                    <button className="bg-black text-white px-8 py-4 border-[3px] border-black font-mono text-sm font-bold uppercase hover:bg-primary hover:border-primary transition-colors">
                        Load More Articles
                    </button>
                </div>
            </section>
        </main>
    );
}
