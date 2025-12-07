'use client'
import { SectionHeader } from "@/ui/components/SectionHeader";
import { ArticleCard } from "@/features/Article/components/ArticleCard";

export default function DetailPage() {
    return (
        <main>
            {/* Article Header */}
            <article className="space-y-8">
                <header className="space-y-4">
                    <div className="inline-block bg-black text-white px-3 py-1 font-mono text-xs font-bold border-[2px] border-black uppercase">
                        Design Theory
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black font-heading uppercase tracking-tighter leading-tight">
                        The Death of User Interface Design
                    </h1>

                    <div className="flex flex-wrap gap-4 font-mono text-sm border-l-[3px] border-black pl-4">
                        <div>
                            <span className="font-bold">Author:</span> @GLITCH_BOY
                        </div>
                        <div>
                            <span className="font-bold">Date:</span> 12.04.2024
                        </div>
                        <div>
                            <span className="font-bold">Read Time:</span> 8 min
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none space-y-6">
                    <p className="text-lg leading-relaxed">
                        We've reached peak optimization. Every pixel perfectly aligned, every corner
                        mathematically rounded, every shadow calculated to mimic reality. The problem? Reality
                        isn't optimized. Reality is messy, chaotic, and brutally honest about its
                        imperfections.
                    </p>

                    <p className="text-lg leading-relaxed">
                        Modern UI design has become a religion of sameness. Rounded corners are the new
                        gospel. Soft shadows the holy scripture. Whitespace the promised land. But what if the
                        promised land is actually a wasteland of creativity?
                    </p>

                    <blockquote className="border-l-[4px] border-primary bg-muted p-6 my-8">
                        <p className="text-2xl font-black font-heading uppercase italic">
                            "Efficiency is the enemy of creativity"
                        </p>
                    </blockquote>

                    <p className="text-lg leading-relaxed">
                        The brutalist web movement isn't about being deliberately ugly. It's about stripping
                        away the veneer of false perfection and exposing the raw structure beneath. HTML in
                        its purest form. CSS as a weapon, not a makeup kit.
                    </p>

                    <p className="text-lg leading-relaxed">
                        Consider the humble checkbox. In modern design, it's a perfect circle that transforms
                        into a checkmark with a 300ms ease-in-out transition. Beautiful? Sure. Necessary?
                        Absolutely not.
                    </p>

                    <p className="text-lg leading-relaxed">
                        A checkbox from 1995 did the same job with a fraction of the code and none of the
                        pretense. It was a box. You checked it. Done. No animation. No gradient. No shadow DOM
                        manipulation. Just brutal, honest functionality.
                    </p>

                    <p className="text-lg leading-relaxed">
                        The death of UI design isn't about destroying good design. It's about killing the
                        obsession with perfection. It's about embracing the glitch, the misalignment, the
                        unexpected. Because that's where innovation lives - in the uncomfortable spaces
                        between the grid lines.
                    </p>

                    <blockquote className="border-l-[4px] border-black bg-white p-6 my-8 border-[3px]">
                        <p className="text-xl font-bold font-heading">
                            "Stop optimizing. Start breaking things."
                        </p>
                        <p className="font-mono text-sm mt-2 opacity-70">— Anonymous Designer, 2024</p>
                    </blockquote>

                    <p className="text-lg leading-relaxed">
                        So here's the manifesto: Design with intention, not convention. Break grids. Rotate
                        elements. Use colors that clash. Make users slightly uncomfortable. Because discomfort
                        breeds attention, and attention is the currency of the digital age. The death of UI
                        design is actually its rebirth - raw, unpolished, and brutally honest.
                    </p>
                </div>

                {/* Share Section */}
                <div className="border-t-[3px] border-black pt-8">
                    <p className="font-mono text-sm font-bold uppercase mb-4">Share this article:</p>
                    <div className="flex gap-4">
                        <button className="bg-black text-white px-6 py-3 border-[2px] border-black font-mono text-sm font-bold uppercase hover:bg-primary transition-colors">
                            Twitter
                        </button>
                        <button className="bg-black text-white px-6 py-3 border-[2px] border-black font-mono text-sm font-bold uppercase hover:bg-primary transition-colors">
                            Facebook
                        </button>
                        <button className="bg-black text-white px-6 py-3 border-[2px] border-black font-mono text-sm font-bold uppercase hover:bg-primary transition-colors">
                            LinkedIn
                        </button>
                    </div>
                </div>
            </article>

            {/* Related Articles */}
            <section className="mt-16 space-y-8">
                <SectionHeader title="RELATED_ARTICLES" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ArticleCard
                        category="CODE"
                        date="12.03.24"
                        title="CSS Grid is a Lie"
                        author={{
                            name: "@CODE_MASTER",
                            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
                        }}
                    />
                    <ArticleCard
                        category="OPINION"
                        date="12.02.24"
                        title="Typography as Weapon"
                        author={{
                            name: "@TYPE_REBEL",
                            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
                        }}
                    />
                </div>
            </section>
        </main>
    );
}
