import ReactMarkdown from 'react-markdown'
import { useMDXComponents } from '../../../../../../mdx-components'

const MdxDocsPage: React.FC = () => {
  const MDXcomponents = useMDXComponents({})

  const markdownCheatSheet = `
# Markdown Cheat Sheet

## Headings

# H1
## H2
### H3
#### H4
##### H5
###### H6

## Emphasis

*Italic*  
_Italic_  
**Bold**  
__Bold__  
***Bold and Italic***  
~~Strikethrough~~

## Lists

### Unordered List
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

### Ordered List
1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2

## Links

[Example link](https://www.example.com)  
<https://www.example.com>

## Images

![Alt text](https://placehold.co/600x400)

## Blockquotes

> This is a blockquote.  
>> Nested blockquote.

## Code

### Inline code
Use \`code\` inside text.

### Code block
\`\`\`js
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`
`

  function escapeHTML(str: string) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  return (
    <div className='h-full w-full text-white'>
      {/* Docs window */}
      <div className='m-auto h-full w-[75%] bg-gray-900'>
        <div className='flex w-full flex-col justify-between p-6 md:flex md:flex-row'>
          {/* MDX content */}
          <div className='flex h-full w-full'>
            <pre>
              <code
                dangerouslySetInnerHTML={{
                  __html: escapeHTML(markdownCheatSheet),
                }}
              />
            </pre>
          </div>

          {/* mdx output */}
          <div className='h-full w-full p-6'>
            <ReactMarkdown components={MDXcomponents}>
              {markdownCheatSheet}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MdxDocsPage
