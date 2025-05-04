import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        style={{
          display: 'block',
          fontSize: '2em',
          marginBlockStart: '0.67em',
          marginBlockEnd: '0.67em',
          marginInlineStart: '0px',
          marginInlineEnd: '0px',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          display: 'block',
          fontSize: '1.5em',
          marginBlockStart: '0.83em',
          marginBlockEnd: '0.83em',
          marginInlineStart: '0px',
          marginInlineEnd: '0px',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          display: 'block',
          fontSize: '1.17em',
          marginBlockStart: '1em',
          marginBlockEnd: '1em',
          marginInlineStart: '0px',
          marginInlineEnd: '0px',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        style={{
          display: 'block',
          marginBlockStart: '1.33em',
          marginBlockEnd: '1.33em',
          marginInlineStart: '0px',
          marginInlineEnd: '0px',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5
        style={{
          display: 'block',
          fontSize: '.83em',
          marginBlockStart: '1.67em',
          marginBlockEnd: '1.67em',
          marginInlineStart: '0px',
          marginInlineEnd: '0px',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6
        style={{
          display: 'block',
          fontSize: '.67em',
          marginBlockStart: '2.33em',
          marginBlockEnd: '2.33em',
          marginInlineStart: '0px',
          marginInlineEnd: '0px',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h6>
    ),
    p: ({ children }) => (
      <p
        style={{
          display: 'block',
          marginBlockStart: '1em',
          marginBlockEnd: '1em',
          marginInlineStart: '0px',
          marginInlineEnd: '0px',
        }}
      >
        {children}
      </p>
    ),
    a: ({ children, ...props }) => (
      <a
        style={{
          color: 'oklch(62.3% 0.214 259.815)',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul
        style={{
          display: 'block',
          listStyleType: 'disc',
          marginBlockStart: '1em',
          marginBlockEnd: '1em',
          marginInlineStart: '40px',
          marginInlineEnd: '0px',
          paddingInlineStart: '40px',
        }}
      >
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li
        style={{
          display: 'list-item',
          textAlign: 'match-parent',
        }}
      >
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          display: 'block',
          marginBlockStart: '1em',
          marginBlockEnd: '1em',
          marginInlineStart: '40px',
          marginInlineEnd: '40px',
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

    img: (props) => (
      <img
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          width: '50vh',
          height: '100%',
        }}
        {...props}
      />
    ),
    pre: ({ children }) => (
      <pre
        style={{
          backgroundColor: '#1e1e1e', // Dark background
          color: '#d4d4d4', // Light text
          padding: '16px',
          borderRadius: '8px',
          overflowX: 'auto',
        }}
      >
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code
        style={{
          backgroundColor: '#1e1e1e',
          padding: '0.2em 0.4em',
          borderRadius: '4px',
          fontFamily: 'Arial',
        }}
      >
        {children}
      </code>
    ),
    ...components,
  }
}
