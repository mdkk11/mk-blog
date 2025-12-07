export const mockStories = [
  {
    id: '1',
    title: 'Workspace Setup',
    thumbnail:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=400&fit=crop',
    stories: [
      {
        id: 's1',
        type: 'image',
        content:
          'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
        duration: 4000,
        createdAt: new Date(),
      },
      {
        id: 's2',
        type: 'markdown',
        content: `# My Current Stack
                
**Hardware**
- MacBook Pro M3 Max
- HHKB Hybrid Type-S
- LG DualUp Monitor

**Software**
- VS Code (Neovim mode)
- Raycast
- Arc Browser

*Minimalism is key.*`,
        backgroundColor: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
        createdAt: new Date(),
      },
    ],
  },
  {
    id: '2',
    title: 'Design Scraps',
    thumbnail:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=400&fit=crop',
    stories: [
      {
        id: 's3',
        type: 'image',
        content:
          'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
        createdAt: new Date(),
      },
      {
        id: 's4',
        type: 'markdown',
        content: `# UI Trends 2025

The era of **Neo-Brutalism** is evolving.

## Key elements:
- High contrast
- Monospace fonts
- Visible grids
- Raw interactive elements

*Make it bold or go home.*`,
        backgroundColor: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        createdAt: new Date(),
      },
    ],
  },
  {
    id: '3',
    title: 'Conference Log',
    thumbnail:
      'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=400&h=400&fit=crop',
    stories: [
      {
        id: 's5',
        type: 'image',
        content:
          'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80',
        createdAt: new Date(),
      },
      {
        id: 's6',
        type: 'markdown',
        content: `# React Conf Recaps

Huge focus on **Server Actions** and **React Compiler**.

"We are blurring the line between client and server."

*Exciting times ahead!*`,
        backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        createdAt: new Date(),
      },
    ],
  },
];
