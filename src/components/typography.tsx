/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

// -------------------------- PARAGRAPHS ---------------------------
interface ParagraphProps {
  children: ReactNode
  className?: string // Make className prop optional
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className = '' }) => {
  return <p className={className}>{children}</p>
}

const createParagraphComponent = (
  defaultClassName: string,
  displayName: string
) => {
  const Component: React.FC<{ children: ReactNode; className?: string }> = ({
    children,
    className,
  }) => {
    const combinedClassName = `${className} ${defaultClassName}`.trim()
    return <Paragraph className={combinedClassName}>{children}</Paragraph>
  }

  Component.displayName = `Paragraph.${displayName.toUpperCase()}`
  return Component
}

export const P = createParagraphComponent('leading-7', 'P')
export const PLead = createParagraphComponent(
  'text-xl text-muted-foreground',
  'PLead'
)
export const PLarge = createParagraphComponent(
  'text-lg font-semibold',
  'PLarge'
)
export const PSmall = createParagraphComponent(
  'text-sm font-medium leading-none',
  'PSmall'
)
export const PMuted = createParagraphComponent(
  'text-sm text-muted-foreground',
  'PMuted'
)

// -------------------------- HEADINGS ---------------------------
interface HeadingProps {
  children: ReactNode
  className?: string
  tag: any
}

const Heading: React.FC<HeadingProps> = ({ children, className = '', tag }) => {
  const Tag = tag
  const combinedClassName = cn(className)
  return <Tag className={combinedClassName}>{children}</Tag>
}

const createHeadingComponent = (tag: any, defaultClassName: string) => {
  const Component: React.FC<{ children: ReactNode; className?: string }> = ({
    children,
    className,
  }) => {
    const combinedClassName = cn(defaultClassName, className)
    return (
      <Heading className={combinedClassName} tag={tag}>
        {children}
      </Heading>
    )
  }

  Component.displayName = `Heading.${tag.toUpperCase()}`
  return Component
}

export const H1 = createHeadingComponent(
  'h1',
  'text-5xl font-heading font-extrabold md:text-6xl lg:text-7xl'
)
export const H2 = createHeadingComponent(
  'h2',
  'text-4xl font-heading md:text-5xl lg:text-6xl'
)
export const H3 = createHeadingComponent(
  'h3',
  'text-3xl font-heading md:text-4xl lg:text-5xl'
)
export const H4 = createHeadingComponent(
  'h4',
  'text-xl uppercase font-heading sm:text-2xl md:text-3xl lg:text-4xl'
)
export const H5 = createHeadingComponent(
  'h5',
  'text-xl text-muted-foreground font-heading sm:text-2xl md:text-3xl'
)
export const H6 = createHeadingComponent(
  'h6',
  'text-lg text-muted-foreground sm:text-xl lg:text-2xl leading-normal sm:leading-8 '
)

// -------------------------- BLOCKQUOTE ---------------------------

const Blockquote: React.FC<ParagraphProps> = ({ children, className = '' }) => {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  )
}

export const Bq = Blockquote

// -------------------------- TABLE ---------------------------

type Column = {
  header: string
  align?: 'left' | 'center' | 'right'
}

type Row = {
  columns: string[]
}

type TypographyTableProps = {
  columns: Column[]
  rows: Row[]
}

export function TypographyTable({ columns, rows }: TypographyTableProps) {
  const getAlignmentClass = (align: string | undefined) => {
    switch (align) {
      case 'center':
        return 'text-center'
      case 'right':
        return 'text-right'
      default:
        return 'text-left'
    }
  }

  return (
    <div className='my-6 w-full overflow-y-auto'>
      <table className='w-full'>
        <thead>
          <tr className='m-0 border-t p-0 even:bg-muted'>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`border px-4 py-2 font-bold ${getAlignmentClass(
                  column.align
                )}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className='m-0 border-t p-0 even:bg-muted'>
              {row.columns.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border px-4 py-2 ${getAlignmentClass(
                    columns[cellIndex].align
                  )}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// -------------------------- LIST ---------------------------

// -------------------------- INLINE CODE ---------------------------

const InlineCode: React.FC<ParagraphProps> = ({ children, className = '' }) => {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
    >
      {children}
    </code>
  )
}

export const Code = InlineCode
