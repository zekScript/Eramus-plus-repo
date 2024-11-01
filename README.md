# Rounded SQ NEXT project guide

Barebones template:

```terminal
gh repo clone rounded-square/next-barebones
```

We use [bun](https://bun.sh/) as a package manager/runtime unless specified differently.

This is an opinionated system for building [NEXT](https://nextjs.org/docs) apps.

The folder structure is:

```ts
root
|-  prisma
|-  public
|-  src
|   |-  app
|   |   |-  (auth)
|   |   |-  (front)
|   |   |   |- page.tsx // main page is in front folder
|   |   |-  admin // admin stays hidden and separate
|   |   |-  api // contains route.ts files
|   |   |-  favicon.ico
|   |   |-  globals.css // colors are defined here as css vars + global styles
|   |   |-  layout.tsx // root layout for setup only
|   |   |-  not-found.tsx // general 404 page
|   |-  assets
|   |-  components
|   |   |-  animations // animations library
|   |   |-  layout // layout blocks and general nav
|   |   |-  ui // common ui elements
|   |   |-  icons.tsx // icons provider
|   |   |-  typography.tsx // typography elements
|   |-  config // json configs for site
|   |-  hooks // hooks
|   |-  lib
|   |   |-  utils.ts // utility functions
|   |-  server // server code
|   |-  types // general types
...

```

## Plugins and libs

We use these in our projects and are opinionated towards them:

- [Shadcn ui](https://ui.shadcn.com/) - a design system and a copy/paste library of estensible UI elements
- [Framer motion](https://www.framer.com/motion/) - an easy to use animation library
- [Lucide React](https://lucide.dev/) - icon library
- [Auth.js](https://authjs.dev/) - auth and session management made easy
- [Prisma](https://www.prisma.io/) - ORM for interacting with databases

---

# Rules and conventions

## Using arrow functions and defining props

We prefer using arrow functions everywhere, especially in defining components. Props are always named Props and defined above the component.

```js
type Props = {
  myProp: string
}

const MyComponent: React.FC<Props> = ({ myProp }) => {

  const myFunction = () => {
    // does something
  }

  return (
    <div>{myProp}</div>
    )
}
export default MyComponent
```

## Pages are server components

Every page must be a server component and is usually named Page, using 'use client' for a page.tsx is not allowed. You then put client component inside pages.

> You do not use 'use server' directive unless a function from inside will be called in a client component, which we have in actions.ts

```js
// /somepage/component.tsx
'use client'

const Component: React.FC = () => {

  return (
    <div>Component</div>
    )
}
export default Component
```

```js
// /somepage/page.tsx
// always server component

import Component from './component'

const Page: React.FC = () => {

  return (
    <div>
      <Component />
    </div>
    )
}
export default Page

```

## File naming

Folder names are url route names so they must be kebab-case. To keep readability and conventions, we use kebab-case for all file names.

The naming convention is also parent-action?-component- -> so this comes to examples:

- posts-dialog.tsx
- posts-edit-form.tsx
- dashboard-devices-widget.tsx
- dashboard-select-dropdown.tsx

## Colocation

Files are colocated semantically, everything that fits with some specific page is inside its folder. Inside components folder are ONLY things that are not specific and are used across the project.

For instance:

If we are building a posts page that will fetch posts from db, display them and also contain an edit post form inside a dialog, the file structure would look like this:

```js
...
|   |-  app
|   |   |-  ...
|   |   |-  (front)
|   |   |   |- posts // inside this folder are all components and files that are about posts specifically
|   |   |   |   |- actions.ts // where all functions that interact with api-s or database regarding posts reside
|   |   |   |   |- columns.tsx // a client component that contains posts columns definition (more in react tanstack section)
|   |   |   |   |- page.tsx // a server rendered page on /posts
|   |   |   |   |- posts-carousel.tsx // a client component that displays posts carousel
|   |   |   |   |- posts-add-edit-form.tsx // a client component that contains a form
|   |   |   |   |- posts-dialog.tsx // a client component for dialog
|   |   |   |   |- types.ts // defined types for post
|   |   |   |- page.tsx
|   |-  ...
|   |-  components // inside components are only components that are not specific to something
|   |   |-  ...
|   |   |-  ui
|   |   |   |-  button.tsx // ui button that is used across the page
|   |   |- data-table.ts // data table component that is used across the project
|   |-  ...
...

```

So if a component takes a prop that has something to do with posts, like post.id, it cannot be in components, it is semantically bound to posts folder, even if it is reused elsewhere. For example, if we want to edit posts inside a /dashboard page, we import it from .../posts, we don't put it in components folder just because it is used elsewhere.

## actions.ts

This is always named actions.ts and it's belonging is construed from it's parent folder. Like pages are posts/page.tsx, server functions are posts/actions.tsx.

**The purpose of the actions.ts file is to contain all API or DB interaction**. The actions.ts is usually the only file that gets the 'use server' directive, which means that server functions here can be called from client components.

Naming conventions inside actions.ts are:

- all functions that obtain data start with **get** -> getPosts(), getPost(), getPostCategories()....
- mostly everything else starts with **handle** -> handlePostCreate(), handlePostEdit(), handlePostDelete()

Another convention with functions inside actions is that they usually need error handling, which is why we have return a typed response, usually found in src/types/index.d.ts.

```ts
// Define the base response type
type BaseResponse = {
  ok: boolean
  status: HTTPStatusCode | null
  message?: string
}

// Define the extended response type for successful responses
type SuccessResponse<T> = BaseResponse & {
  ok: true
  data: T
}

// Define the response type for unsuccessful responses
type ErrorResponse = BaseResponse & {
  ok: false
  error: string
}

// Union type for the overall response
export type Response<T> = SuccessResponse<T> | ErrorResponse
// response is now
// if ok:true --> sucess response with data
// if ok:false --> error response with error
```

This means that functions inside actions.ts return Promise with type Response\<T>. For posts example:

```ts
// /posts/actions.ts

'use server'

import { Post } from './types'

export const getPosts = async (): Promise<Response<Post[]>> => {
  try {
    // fetch from api or db
    const posts = fetch('https://example.com/api', {
      method: 'GET',
    })

    if (posts.ok) {
      return {
        ok: true,
        status: 200,
        data: posts,
      }
    } else {
      return { ok: false, status: post.status, error: await post.json() } // Not Found
    }
  } catch (error) {
    return { ok: false, status: 500, error: 'Internal Server Error' } // Internal Server Error
  }
}

export const handlePostDelete = async (id: string): Promise<Response<Post>> => {
  try {
    // delete from api or db
    const deleted = await db.posts.delete({
      where: {
        id,
      },
    })
    if (deleted) {
      return {
        ok: true,
        status: 200,
        data: deleted,
      }
      revalidatePath('/posts')
    } else {
      return { ok: false, status: 404, error: 'Post not found' } // Not Found
    }
  } catch (error) {
    return { ok: false, status: 500, error: 'Internal Server Error' } // Internal Server Error
  }
}
```

## Data fetching, flow and refresh

In most cases, it is advisable for the data to be fetched in a parent server component and then passed to the client components.

Try to avoid fetching data inside client components unless there is no other way. Next does data caching and revalidating extremely well and this is most evident in this flow:

- fetch data on the page component, like posts[] -> this is then cached for subsequent calls
- pass data to a client component that does some front end manipulation, like a data table or form
- on updating data in client components, use functions from action.ts
- note above that functions that update something have [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath), which, refetches data on the page /posts, updating the complete flow

```js
// /somepage/page.tsx

import Component from './component'
import { getPosts } from './actions'
import { Post } from './types'

const Page: React.FC = () => {
  const posts: Post[] = getPosts()
  if(!result.ok) {
    notFound()
  }

  return (
    <div>
      // other non dynamic server elements
      <Component posts={posts}/>
    </div>
    )
}
export default Page
```

```js
// /somepage/component.tsx
'use client'

import { Post } from './types'
import { handlePostDelete } from './actions'

type Props = {
  posts: Post[]
}

const Component: React.FC<Props> = ({posts}) => {

  const deletePost = (id:string) => {
    const deleted = handlePostDelete(id)
    if(deleted.ok) {
      // notify success
    } else {
      // notify error
    }
  }

  return (
    <div>
      // do something with posts
      <div onClick={()=>deletePost(id)}> some post </div>
    </div>
    )
}
export default Component

```
