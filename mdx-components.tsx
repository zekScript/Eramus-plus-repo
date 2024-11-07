import { P } from '@/components/typography'
import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import { Children } from 'react'
 
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 style={{ color: 'black', fontFamily: 'sans-serif', fontSize: '29px', fontWeight: 'bold', margin: '32px' }}>{children}</h1>
    ),
    a: ({ children, ...props }) => (
      <a style={{ color: 'blue', fontFamily: 'sans-serif', cursor: 'pointer' }} {...props}>{children}</a>
    ),
    p: ({ children }) => (
      <p style={{ color: 'black', fontFamily: 'sans-serif', margin: '32px' }}>{children}</p>
    ),
    li: ({ children }) => (
      <li style={{ color: 'black', fontFamily: 'sans-serif', margin: '32px' }}>{children}</li>
    ),
    h2: ({ children }) => (
      <h2 style={{ color: 'black', fontFamily: 'sans-serif', fontWeight: 'bold', margin: '32px' }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ color: 'black', fontFamily: 'sans-serif', margin: '32px', fontSize: '22px'}}>{children}</h3>
    ),
    ul: ({ children }) => (
      <ul style={{ width: '50%'}}>{children}</ul>
    ),

    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  }
}