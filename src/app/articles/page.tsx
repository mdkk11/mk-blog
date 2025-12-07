'use client'
import { SectionHeader } from "@/ui/components/SectionHeader";
import { mockArticles } from "@/data/mockArticles";
import { ArticleCardGrid } from "@/features/Article/components/ArticleCardGrid";

export default function ArticlesPage() {
    return (
        <main>
            <header className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-black font-heading uppercase tracking-tighter">
                    All Articles
                </h1>

                <div className="flex items-center gap-4">
                    <div className="h-[3px] w-12 bg-black" />
                    <p className="font-mono text-sm uppercase font-bold">
                        {mockArticles.length} Articles
                    </p>
                    <div className="h-[3px] flex-1 bg-black" />
                </div>
            </header>
            <section className="space-y-8">
                <SectionHeader title="ALL_ARTICLES" />

                <ArticleCardGrid
                    articles={mockArticles}
                    columns={3}
                    maxItems={6}
                />
            </section>
        </main>
    );
}
