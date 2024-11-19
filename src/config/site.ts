import { Navigation, SiteConfig } from '@/types'

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
    // Placehodler
    {
      title: 'Contact',
      href: '#',
    },

    // I dont know what is the purpose of this
    // {
    //   title: 'Jobs',
    //   href: '/content/jobs',
    // },
  ],
}
