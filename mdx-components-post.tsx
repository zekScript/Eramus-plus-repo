import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const customLoader = ({ src }: { src: string }) => {
  return src // Return the source URL directly
}

export function useMDXComponentsPost(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1
        style={{
          fontFamily: 'sans-serif',
          fontSize: '29px',
          fontWeight: 'bold',
          marginTop: '12px'
        }}
      >
        {children}
      </h1>
    ),
    a: ({ children, ...props }) => (
      <a
        style={{
          fontFamily: 'sans-serif',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
        {...props}
      >
        {children}
      </a>
    ),
    p: ({ children }) => (
      <p style={{ fontFamily: 'sans-serif', marginTop: '12px' }}>
        {children}
      </p>
    ),
    li: ({ children }) => (
      <li style={{ fontFamily: 'sans-serif' }}>{children}</li>
    ),
    h2: ({ children }) => (
      <h2
        style={{ fontFamily: 'sans-serif',  marginTop: '12px' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{ fontFamily: 'sans-serif',  marginTop: '12px' }}
      >
        {children}
      </h3>
    ),
    ul: ({ children }) => (
      <ul style={{  listStyle: 'initial', marginLeft: '1rem', marginTop: '12px' }}>
        {children}
      </ul>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          width: '50%',
          listStyle: 'initial',
          marginLeft: '46px',
          borderLeft: '4px solid gray',
          paddingLeft: '35px'
        }}
      >
        {children}
      </blockquote>
    ),
    details: ({ children }) => (
      <details style={{ cursor: 'pointer', marginLeft: '32px' }}>
        {children}
      </details>
    ),
    pre: ({ children }) => (
      <pre
        style={{
          backgroundColor: '#16161e',
          borderRadius: '1rem',
          width: 'auto',
          margin: '1.5rem 0',
          padding: '1rem',
          lineHeight: '1',
          overflowX: 'auto',
        }}
      >
        {children}
      </pre>
    ),

    img: (props) => (
      <img
      sizes="100vw"
      width={150} // Default width
      height={150} // Default height
      style={{ width: '100%', height: 'auto' }}
      {...props}
  />
    ),
    ...components,
  }
}
