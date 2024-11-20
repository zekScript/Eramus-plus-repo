import { Navigation, SiteConfig, BlogSources } from '@/types'

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
    src: 'https://www.lokalec.si/wp-content/uploads/2024/09/453217698_1046313393734868_4956412633326257407_n.jpg',
    badge: 'important',
    title: 'Today a storm happened in Maribor',
    date: 'March 16, 2024',
    route: '/today-a-storm-happened-in-maribor',
    description: 'Maribor recently experienced severe storms characterized by heavy rainfall, hail, and strong winds. These conditions caused significant damage, including the destruction of parts of the roof at Edvard Rusjan Airport. The hail, measuring 5-7 cm, damaged the terminal, flooded areas, and affected insulation and electronic equipment, leading to estimates of millions of euros in damage. The airport remains temporarily closed for repairs but is expected to resume operations soon'
  },
  {
    id: 2,
    src: 'https://www.lokalec.si/wp-content/uploads/2024/09/453217698_1046313393734868_4956412633326257407_n.jpg',
    badge: 'info',
    title: 'Today a storm happened in Ljubljana',
    date: 'March 16, 2024',
    route: '/today-a-storm-happened-in-maribor',
    description: 'Maribor recently experienced severe storms characterized by heavy rainfall, hail, and strong winds. These conditions caused significant damage, including the destruction of parts of the roof at Edvard Rusjan Airport. The hail, measuring 5-7 cm, damaged the terminal, flooded areas, and affected insulation and electronic equipment, leading to estimates of millions of euros in damage. The airport remains temporarily closed for repairs but is expected to resume operations soon'
  },
  {
    id: 3,
    src: 'https://www.lokalec.si/wp-content/uploads/2024/09/453217698_1046313393734868_4956412633326257407_n.jpg',
    badge: 'info',
    title: 'Today a storm happened in Ljubljana',
    date: 'March 16, 2024',
    route: '/today-a-storm-happened-in-maribor',
    description: 'Maribor recently experienced severe storms characterized by heavy rainfall, hail, and strong winds. These conditions caused significant damage, including the destruction of parts of the roof at Edvard Rusjan Airport. The hail, measuring 5-7 cm, damaged the terminal, flooded areas, and affected insulation and electronic equipment, leading to estimates of millions of euros in damage. The airport remains temporarily closed for repairs but is expected to resume operations soon'
  },
  {
    id: 4,
    src: 'https://www.lokalec.si/wp-content/uploads/2024/09/453217698_1046313393734868_4956412633326257407_n.jpg',
    badge: 'info',
    title: 'Today a storm happened in Ljubljana',
    date: 'March 16, 2024',
    route: '/today-a-storm-happened-in-maribor',
    description: 'Maribor recently experienced severe storms characterized by heavy rainfall, hail, and strong winds. These conditions caused significant damage, including the destruction of parts of the roof at Edvard Rusjan Airport. The hail, measuring 5-7 cm, damaged the terminal, flooded areas, and affected insulation and electronic equipment, leading to estimates of millions of euros in damage. The airport remains temporarily closed for repairs but is expected to resume operations soon'
  },


  
]
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
