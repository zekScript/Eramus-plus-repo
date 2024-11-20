export type SiteConfig = {
  name: string
  description: string
  url: string
  links: string[]
  company?: {
    name: string
    adress: {
      street: string
      zip: number
      city: string
      country: string
    }
    contact: {
      email: string
      phone: string
    }
  }
}

export type BlogSources = {
  blogItems: BlogSourcesItem[]
}

export type BlogSourcesItem = {
  id: number
  src: string
  badge: string
  title: string
  date: string
  route: string
  description: string
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  submenu?: NavItem[]
}

export type Navigation = {
  items: NavItem[]
}

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

export type HTTPStatusCode =
  | 100
  | 101
  | 102
  | 103
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511

export type Response = {
  ok: boolean
  status: HTTPStatusCode | null
  message: string
}
