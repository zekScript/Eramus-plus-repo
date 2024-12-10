import { Navigation, SiteConfig, BlogSources, CarouselSources } from '@/types'

export const siteConfig: SiteConfig = {
  name: '[rounded]',
  description: 'Dream. Develop. Dominate. Squared.',
  url: 'https://roundedsq.com',
  links: [],
  company: {
    name: 'RoundedSQ d.o.o.',
    adress: {
      street: 'Zg. Hoče 6c',
      zip: 2311,
      city: 'Hoče',
      country: 'Slovenija',
    },
    contact: {
      email: 'info@roundedsq.com',
      phone: '031753780',
    },
  },
}

// Make a blog post card here
// badge: "info", "important", "announcement"
// Currently it mimics like a Database
export const blogPostSources: BlogSources = {
  blogItems: [
    {
      id: 1,
      src: 'https://welearncode.com/beginners-guide-nextjs/twitter-image.jpg',
      badge: 'info',
      title: "Getting Started with Next.js: A Beginner's Guide",
      date: 'March 16, 2024',
      description:
        "If you're venturing into modern web development, you've likely come across Next.js, a popular React-based framework. With its powerful features like server-side rendering, static site generation, and API routes, Next.js is perfect for building performant and scalable web applications. In this guide, we’ll take you through everything you need to get started with Next.js.",
    },
    {
      id: 2,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl57cXzQak8qtXXiqUhBs7TdhUGVqHM2wAWQ&s',
      badge: 'info',
      title: 'The Ultimate Productivity Hack is Saying No',
      date: 'December 12, 2023',
      description:
        'Not doing something will always be faster than doing it. This statement reminds me of the old computer programming saying, “Remember that there is no code faster than no code.\”',
    },
    {
      id: 3,
      src: 'https://i.pinimg.com/originals/16/4e/28/164e2886c739b5cd92dd1b0e14bf05a3.png',
      badge: 'info',
      title: '30 One-Sentence Stories From People Who Have Built Better Habits',
      date: 'December 9, 2024',
      description:
        'None of these stories are mine. They were sent to me by readers of Atomic Habits. My hope is that these examples will illustrate how real people are putting the book into practice. They will show you what people are actually doing to build good habits and break bad ones. And hopefully, they will spark some ideas for how you can do the same.',
    },
    {
      id: 4,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQidX5LmWcusKJ7ftCmHGQlHcWP1PMTjYfaAQ&s',
      badge: 'info',
      title: 'Why Choose Next.js for Your First Web Project?',
      date: 'December 8, 2024',
      description:
        'Starting your web development journey can feel overwhelming, especially with so many frameworks to choose from. Next.js, a powerful React framework, is one of the best options for beginners. Here’s why:',
    },
  ],
}

export const carouselItems: CarouselSources = {
  carouselItems: [
    {
      id: 1,
      src: 'https://g.fp.ps.netease.com/market/file/5cbfc569a7f25262e5e1dbd0p2AlOda702',
      mainTitle: 'Armandas Latanauskas',
      description:
        '"Building the web, one line of code at a time, with passion and skill."',
    },

    {
      id: 2,
      src: 'https://market.fp.ps.netease.com/file/6704da94f083126d846b2729h175EmYB05',
      mainTitle: 'Front-end development',
      description:
        'I make simple front-end design to make user never get lost in the website',
    },
    {
      id: 3,
      src: 'https://market.fp.ps.netease.com/file/65c2f968429118a2c170c123ktIbqFKp05',
      mainTitle: 'Back-end development',
      description:
        "I'm new of being in the back-end But I'm always keen to improve, my back-end skills",
    },
    {
      id: 4,
      src: 'https://g.fp.ps.netease.com/market/file/6247f63543d792abefab0c1cQMtLcCks04',
      mainTitle: 'Tech-Stack',
      description:
        'I specialize in making websites with: Next.js, Tailwind, Shadcn, React',
    },
  ],
}

export const topNav: Navigation = {
  items: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Projects',
      href: '/content/our-work',
    },
    {
      title: 'Media',
      href: '/content/media',
    },

    // I dont know what is the purpose of this
    // {
    //   title: 'Jobs',
    //   href: '/content/jobs',
    // },
  ],
}
