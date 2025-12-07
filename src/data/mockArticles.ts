

export interface Article {
    id: string;
    category: string;
    date: string;
    title: string;
    author: {
        name: string;
        avatar: string;
    };
    href?: string;
    image?: string; // For FeaturedArticle usage if needed
    description?: string; // For FeaturedArticle usage
}

export const mockArticles: Article[] = [
    {
        id: '1',
        category: 'DESIGN',
        date: '2024.12.06',
        title: 'The Death of Corporate Memphis: A New Era of Web Design',
        author: {
            name: 'Koki Maeda',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        },
        href: '/detail',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        description: 'Why flat, safely offensive art is dying out and what brutalism offers as an alternative.',
    },
    {
        id: '2',
        category: 'ENGINEERING',
        date: '2024.12.05',
        title: 'Rust for JavaScript Developers: A Survival Guide',
        author: {
            name: 'Sarah Jenks',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        },
        href: '/detail',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        description: 'Memory safety without garbage collection? Understanding the borrow checker pattern.',
    },
    {
        id: '3',
        category: 'THOUGHTS',
        date: '2024.12.04',
        title: 'Digital Gardens vs. Blogs: Curating Knowledge',
        author: {
            name: 'Koki Maeda',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        },
        href: '/detail',
    },
    {
        id: '4',
        category: 'ART',
        date: '2024.12.03',
        title: 'Generative Art with p5.js: Chaos and Order',
        author: {
            name: 'Alex Rivera',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        },
        href: '/detail',
    },
    {
        id: '5',
        category: 'DESIGN',
        date: '2024.12.01',
        title: 'Typography as the Primary Interface',
        author: {
            name: 'Koki Maeda',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        },
        href: '/detail',
    },
    {
        id: '6',
        category: 'ENGINEERING',
        date: '2024.11.28',
        title: 'Server Components: The Good, The Bad, and The Ugly',
        author: {
            name: 'Mike Chen',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
        },
        href: '/detail',
    },
    {
        id: '7',
        category: 'CULTURE',
        date: '2024.11.25',
        title: 'Return to Office: The Great Mismatch',
        author: {
            name: 'Sarah Jenks',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        },
        href: '/detail',
    },
    {
        id: '8',
        category: 'DESIGN',
        date: '2024.11.22',
        title: 'Dark Mode is Not Just Inverted Colors',
        author: {
            name: 'Koki Maeda',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        },
        href: '/detail',
    },
    {
        id: '9',
        category: 'THOUGHTS',
        date: '2024.11.20',
        title: 'Why I Still Use Vim in 2025',
        author: {
            name: 'Alex Rivera',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        },
        href: '/detail',
    }
];
