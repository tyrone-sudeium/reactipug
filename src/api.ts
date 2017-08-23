namespace Reddit {
  export interface MediaEmbed {
  }

  export interface SecureMediaEmbed {
  }

  export interface PostData {
    contest_mode: boolean
    approved_at_utc?: any
    banned_by?: any
    media_embed: MediaEmbed
    subreddit: string
    selftext_html?: any
    selftext: string
    likes?: any
    suggested_sort?: any
    user_reports: any[]
    secure_media?: any
    link_flair_text?: any
    id: string
    banned_at_utc?: any
    view_count?: any
    secure_media_embed: SecureMediaEmbed
    clicked: boolean
    report_reasons?: any
    author: string
    saved: boolean
    mod_reports: any[]
    can_mod_post: boolean
    name: string
    score: number
    approved_by?: any
    over_18: boolean
    domain: string
    hidden: boolean
    thumbnail: string
    subreddit_id: string
    edited: boolean
    link_flair_css_class?: any
    author_flair_css_class?: any
    gilded: number
    locked: boolean
    downs: number
    brand_safe: boolean
    archived: boolean
    removal_reason?: any
    visited: boolean
    can_gild: boolean
    is_self: boolean
    hide_score: boolean
    spoiler: boolean
    permalink: string
    num_reports?: any
    parent_whitelist_status?: any
    stickied: boolean
    created: number
    url: string
    author_flair_text?: any
    quarantine: boolean
    title: string
    created_utc: number
    subreddit_name_prefixed: string
    distinguished?: any
    media?: any
    num_comments: number
    whitelist_status?: any
    subreddit_type: string
    is_video: boolean
    ups: number
  }

  export interface Post {
    kind: "t3"
    data: PostData
  }

  export interface ListingData {
    modhash: string
    children: Post[]
    after: string
    before?: any
  }

  export interface Listing {
    kind: "Listing"
    data: ListingData
  }
}
export interface PugPost {
  id: string,
  author: string,
  score: number,
  domain: string,
  url: string,
  title: string,
  date: Date
}

function pugPostFromPostData(postData: Reddit.PostData): PugPost | null {
  if (postData.url.match(/\.(jpeg|jpg|gif|png|bmp|heif|heic)$/) == null) {
    return null
  }
  let pugPost = (({ id, author, score, domain, url, title, ...other}) => (
    { id, author, score, domain, url, title, date: new Date(other.created_utc * 1000)}
  ))(postData) as PugPost
  // Force HTTPS for ATS. If the site doesn't support HTTPS, then it sucks
  pugPost.url = pugPost.url.replace("http://", "https://")
  return pugPost
}

const PUGS_URL = "https://www.reddit.com/r/pugs.json"

export async function getPugs(pages: number): Promise<PugPost[]> {
  let posts: PugPost[] = []
  let previous: Reddit.Listing = null
  let count = 0
  for (let i = 0; i < pages; i++) {
    let resp = await _getPugs(previous, count)
    let newPosts: PugPost[] = resp.data.children
      .map(l => pugPostFromPostData(l.data))
      .filter(p => p != null)
    posts = posts.concat(newPosts)
    count = count + resp.data.children.length
    previous = resp
  }

  return posts
}

async function _getPugs(previous?: Reddit.Listing, count?: number): Promise<Reddit.Listing> {
  let url = PUGS_URL
  count = count || 0
  if (previous && previous.data && previous.data.after) {
    url = `${url}?count=${count}&after=${previous.data.after}`
  }
  console.log(`getting: ${url}`)
  let resp = await fetch(url)
  let json: Reddit.Listing = await resp.json()
  return json
}
