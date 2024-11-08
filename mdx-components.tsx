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
      <p style={{ color: 'black', fontFamily: 'sans-serif', margin: '32px', width: '70%' }}>{children}</p>
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
      <ul style={{ width: '50%', listStyle: 'initial', marginLeft: '1rem'}}>{children}</ul>
    ),
    blockquote: ({ children }) => (
      <blockquote  style={{ width: '50%', listStyle: 'initial', marginLeft: '46px', borderLeft: '4px solid gray', paddingLeft: '12px'}}>{children}</blockquote>
    ),
    details: ({ children }) => (
      <details  style={{ cursor:'pointer', marginLeft: '32px'}}>{children}</details>
    ),
    pre: ({ children }) => (
      <pre  style={{ color: 'white', backgroundColor: '#16161e', borderRadius: '1rem', width: 'auto', margin: '1.5rem 0', padding: '1rem', lineHeight: '1', overflowX: 'auto'}}>{children}</pre>
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