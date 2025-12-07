'use client'
import { useTheme } from 'next-themes';
import Link from 'next/link';

const _defaultMenuItems = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export const Header = () => {
    const { setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur-sm">
            <div className="flex items-center justify-between px-6 py-6">
                <div>
                    <h1 className="font-medium text-2xl">
                        <Link href="/">Title</Link>
                    </h1>
                </div>
                <div className="flex items-center gap-5">
                    <Link href="/detail" className="text-sm">
                        Detail
                    </Link>
                    <Link href="/categories" className="text-sm">
                        Categories
                    </Link>
                    <Link href="/articles" className="text-sm">
                        Articles
                    </Link>
                    <Link href="/stories" className="text-sm">
                        Stories
                    </Link>
                </div>
            </div>
        </header>
    );
};
