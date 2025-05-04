import createMDX from '@next/mdx'
import rehypePrism from 'rehype-prism' // Use import instead of require

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['via.placeholder.com'], // Add the external domain here
  },

  // Optionally, add any other Next.js config below
}

const withMDX = createMDX()

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
