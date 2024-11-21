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
      route: '/getting-started-with-next-js-a-beginner-guide',
      description:
        "If you're venturing into modern web development, you've likely come across Next.js, a popular React-based framework. With its powerful features like server-side rendering, static site generation, and API routes, Next.js is perfect for building performant and scalable web applications. In this guide, we’ll take you through everything you need to get started with Next.js.",
    },
    {
      id: 2,
      src: 'https://www.timeforkids.com/wp-content/uploads/2018/08/Storms-Images.jpg',
      badge: 'important',
      title: 'today a storm happened in maribor',
      date: 'December 12, 2023',
      route: '/today-a-storm-happened-in-maribor',
      description: '',
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
