/* ============================================================================
   CINEMACITY · SOCIAL MEDIA STRATEGY 2026–27
   content.js — EDITABLE CONTENT
   ----------------------------------------------------------------------------
   Client-facing document. Everything here is written to be read by Cinemacity,
   not by us. No internal notes, no open questions to the team, no comparisons
   to earlier drafts.

   VIDEOS      → edit the `videos` array on any pillar in PILLARS[]
   DESIGN      → edit VISUAL_SYSTEM_EXAMPLES[] and set `assetUrl`
   Drive links → any share format works, they're normalised automatically
   ========================================================================= */

const DECK = {
  client: 'Cinemacity',
  title: 'The Room Makes The Movie',
  subtitle: 'Social Media Strategy 2026–27',
  agency: 'INHAUS Digital',
  date: 'August 2026'
};

/* ---------------------------------------------------------------------------
   1 · REELS + FRAMES — drives navigation. `id` matches a <section> in index.html
   ------------------------------------------------------------------------ */
const REELS = [
  {
    n: '01', title: 'Where We Are',
    frames: [
      { id: 'cold-open', n: '00', label: 'Cold open' },
      { id: 'summary',   n: '01', label: 'In one page' },
      { id: 'learned',   n: '02', label: 'What we have learned' },
      { id: 'context',   n: '03', label: 'The market around us' }
    ]
  },
  {
    n: '02', title: 'The Direction',
    frames: [
      { id: 'insight',     n: '04', label: 'The insight' },
      { id: 'positioning', n: '05', label: 'Positioning' },
      { id: 'objectives',  n: '06', label: 'Objectives' },
      { id: 'occasions',   n: '07', label: 'Who we are talking to' },
      { id: 'platforms',   n: '08', label: 'Platform strategy' },
      { id: 'snapchat',    n: '09', label: 'Snapchat direction' }
    ]
  },
  {
    n: '03', title: 'The Work',
    frames: [
      { id: 'pillars',   n: '10', label: 'Content pillars' },
      { id: 'formats',   n: '11', label: 'Recurring formats' },
      { id: 'campaigns', n: '12', label: 'Campaigns and moments' },
      { id: 'paid',      n: '13', label: 'Paid and organic' }
    ]
  },
  {
    n: '04', title: 'The Look',
    frames: [
      { id: 'visual',        n: '14', label: 'Visual system' },
      { id: 'visual-action', n: '15', label: 'The system in action' }
    ]
  },
  {
    n: '05', title: 'From Views to Tickets',
    frames: [
      { id: 'journey', n: '16', label: 'The path to purchase' },
      { id: 'booking', n: '17', label: 'What would help' }
    ]
  },
  {
    n: '06', title: 'Making It Work',
    frames: [
      { id: 'rhythm',      n: '18', label: 'The year ahead' },
      { id: 'measurement', n: '19', label: 'How we measure' },
      { id: 'ninety',      n: '20', label: 'Where we start' },
      { id: 'close',       n: '21', label: 'Close' }
    ]
  }
];

/* ---------------------------------------------------------------------------
   2 · WHAT WE HAVE LEARNED — performance, framed forward
   ------------------------------------------------------------------------ */
const LEARNED = [
  {
    stat: '7.0M',
    label: 'views in seven months',
    detail: 'Reach is not the problem. The account can put Cinemacity in front of large audiences, repeatedly, and July was its strongest month yet at 2.5 million views.'
  },
  {
    stat: '92%',
    label: 'of reach comes from non-followers',
    detail: 'This is a discovery channel, not a community noticeboard. Most people meeting Cinemacity on social have never seen it before — so every post has to work as a first impression.'
  },
  {
    stat: '60.8%',
    label: 'of TikTok traffic now comes from search',
    detail: 'Up from 11.7% in February. People are actively typing formats, locations and film titles. Demand is intent-led, and it is growing fast.'
  },
  {
    stat: '1,665',
    label: 'taps toward booking in July',
    detail: 'From 2.5 million views. Attention is being created at scale and very little of it is being carried forward. Closing that gap is the single biggest opportunity in the year ahead.'
  }
];

const LEARNED_SOURCE = 'Cinemacity monthly social reports, December 2025 – July 2026.';

const KPI_TREND = {
  months: [
    { m: 'Dec 25', views: 166745,  interactions: 1392 },
    { m: 'Jan 26', views: 1690081, interactions: 172659 },
    { m: 'Feb 26', views: 637733,  interactions: 48137 },
    { m: 'Mar 26', views: 266424,  interactions: 15470 },
    { m: 'Apr 26', views: 365019,  interactions: 12071 },
    { m: 'May 26', views: 321654,  interactions: 55030 },
    { m: 'Jun 26', views: 533133,  interactions: 25463 },
    { m: 'Jul 26', views: 2501103, interactions: 106478 }
  ]
};

const SEARCH_TREND = {
  points: [
    { m: 'Feb 26', v: 11.7 }, { m: 'Mar 26', v: 25.2 }, { m: 'Apr 26', v: 30.4 },
    { m: 'May 26', v: 38.9 }, { m: 'Jun 26', v: 39.8 }, { m: 'Jul 26', v: 60.8 }
  ],
  note: 'TikTok traffic from search, February to July 2026.'
};

/* What the content itself is telling us */
const CONTENT_PROOF = {
  headline: 'Original content outperforms everything else, by a wide margin.',
  rows: [
    { type: 'Original pop culture', views: '392,800', likes: '50,100', rate: '12.8%', good: true },
    { type: 'Original venue content', views: '247,900', likes: '17,400', rate: '7.0%', good: true },
    { type: 'Distributor asset, organic', views: '66,100', likes: '527', rate: '0.8%' },
    { type: 'Distributor asset, boosted', views: '646,900', likes: '41', rate: '0.006%', bad: true }
  ],
  reading: 'A boosted distributor asset reached 646,900 people and earned 41 likes. The same audience gave an original Cinemacity post 50,100. Distributor assets still have a job to do — they announce what is showing. But they cannot carry the brand, and paying to push them further does not make them work harder.'
};

/* ---------------------------------------------------------------------------
   3 · MARKET CONTEXT — short, and only what shapes the content
   ------------------------------------------------------------------------ */
const MARKET = [
  {
    stat: '−8.3%',
    label: 'UAE box office value, 2024 to 2025',
    detail: 'Admissions held steady while revenue fell. The category is competing hard on price — which is exactly why this strategy is built on what Cinemacity uniquely offers rather than on discounts.',
    source: 'UAE Media Council; National Media Authority via Gulf News, 2026.'
  },
  {
    stat: '79%',
    label: 'of UAE e-commerce happens on a phone',
    detail: 'Everything here is designed vertical-first, for one hand, in the evening. That is not a style choice — it is where the audience is.',
    source: 'Grand View Research / University of Sharjah, 2026.'
  },
  {
    stat: '72%',
    label: 'of cinema visits are group occasions',
    detail: 'People rarely go alone. Cinema is a plan made with someone else, which means the content has to give them something to send, not just something to see.',
    source: 'TikTok Marketing Science theatrical study, 2023.'
  },
  {
    stat: '90.7%',
    label: 'of viewers see a film in its first 30 days',
    detail: 'Distributors spend almost everything on opening weekend. The weeks after are quiet, and they are still selling seats. One of our pillars lives there.',
    source: 'EntTelligence, 2025.'
  }
];

const COMPETITIVE = {
  intro: 'Cinemacity will not win this category on scale, and does not need to.',
  rows: [
    { name: 'VOX',        owner: 'Majid Al Futtaim',      scale: '~23 UAE sites',     angle: 'Ubiquity and group loyalty' },
    { name: 'Reel',       owner: 'Emaar Entertainment',   scale: '5 Dubai sites',     angle: 'Dubai luxury' },
    { name: 'Roxy',       owner: 'Meraas / Dubai Holding',scale: '6+ Dubai sites',    angle: 'Design-led lifestyle' },
    { name: 'Novo',       owner: 'ELAN / Gulf Film',      scale: '6 sites',           angle: 'Value' },
    { name: 'Cinemacity', owner: 'Atassi family',                     scale: '6 sites',           angle: 'Rooms and experiences nobody else has', us: true }
  ],
  read: 'Every competitor sells a version of the same thing: a comfortable seat, close to home. Cinemacity has something none of them can copy — Sharjah’s only IMAX, Abu Dhabi’s largest screen, the country’s only licensed auditorium, a 500-seat live theatre, private cinemas, real kitchens and real bars. That is the story worth telling all year.'
};

const ADVANTAGE = {
  title: 'A leverage worth maximising',
  body: 'Cinemacity sits closer to film content than any comparable cinema brand in this market. Its distribution relationships mean material — stills, clips, talent, early assets — can reach the brand ahead of the market rather than alongside it.',
  action: 'That is an advantage most exhibitors simply do not have, and there is real room to push it further. Being the first account in the UAE to post a piece of film content rather than the fifth is repeatable, costs nothing extra, and compounds every time it happens. The next step is mapping exactly what the access allows so we can build formats around it.'
};

/* ---------------------------------------------------------------------------
   4 · OBJECTIVES
   ------------------------------------------------------------------------ */
const OBJECTIVES = [
  {
    n: '01',
    title: 'Make the experience the story',
    body: 'Shift the balance of original content toward Cinemacity’s own rooms, food and venues — the things that cannot be seen anywhere else.',
    kpi: 'Share of original output tied to a named venue or experience · saves per post · traffic to location pages'
  },
  {
    n: '02',
    title: 'Turn attention into intent',
    body: 'Improve the rate at which views become taps toward booking. Reach is already strong; this is the number that matters next.',
    kpi: 'Link taps as a share of views · Story link-sticker taps · profile visits'
  },
  {
    n: '03',
    title: 'Own the moments that matter',
    body: 'Be first and be loudest on the handful of dates each year where the whole market is watching — and be genuinely useful in the weeks in between.',
    kpi: 'Reach and engagement during tentpole windows · share of voice against competitors'
  },
  {
    n: '04',
    title: 'Give the account a reason to exist every week',
    body: 'Two of the five pillars are built to run at full strength when there is no major release. The feed should never go quiet because the slate does.',
    kpi: 'Share of monthly reach from non-release content · returning viewers'
  },
  {
    n: '05',
    title: 'Build a recognisable brand',
    body: 'One visual system, five distinct pillars, formats the audience learns to expect. Recognition is what turns reach into preference.',
    kpi: 'Brand recall in comments and shares · follower quality · branded search volume'
  }
];

/* ---------------------------------------------------------------------------
   5 · AUDIENCES BY OCCASION
   ------------------------------------------------------------------------ */
const OCCASIONS = [
  {
    name: 'The Night Out',
    who: 'Couples and friend groups, 25–40, Dubai and Abu Dhabi. The film is one part of an evening.',
    motivation: 'A good night. Somewhere that feels like a choice, not a default.',
    barrier: 'Does not know Cinemacity is licensed, or that the food is a reason to come.',
    pillar: 'The Late Show',
    moment: 'Thursday and Friday'
  },
  {
    name: 'The Format Lover',
    who: 'Skews male, 25–44. Will cross emirates for the right screen. Small in number, loud in influence.',
    motivation: 'Seeing the film properly. Screen size, sound, presentation.',
    barrier: 'Cannot easily find out which Cinemacity screen is which.',
    pillar: 'The Room',
    moment: 'Tentpole weekends'
  },
  {
    name: 'The Family Plan',
    who: 'Parents with school-age children. Sharjah, Arabian Center, Rahmania. Decided days ahead.',
    motivation: 'A reliable few hours everyone enjoys. Logistics matter as much as the film.',
    barrier: 'Total cost and what is included are unclear until late.',
    pillar: 'The Room · House Rules',
    moment: 'Weekends and school holidays'
  },
  {
    name: 'The Film Crowd',
    who: 'Genuine film fans, 18–34. Opening weekend, awards season, re-releases, the Arthouse theatre.',
    motivation: 'Being there first, and having somewhere to talk about it after.',
    barrier: 'Sees Cinemacity as a venue, not as a voice worth following.',
    pillar: 'First Look · Second Weekend',
    moment: 'Release Thursdays'
  },
  {
    name: 'The Late Decider',
    who: 'The largest group and the least served. Decides within two hours, on a phone, often already out.',
    motivation: 'Something good to do, tonight, nearby.',
    barrier: 'Everything between seeing a post and holding a ticket.',
    pillar: 'All pillars',
    moment: 'Every evening'
  }
];

const AUDIENCE_NOTE = 'A note on the wider market: the UAE is 88% expatriate, and after Arabic the largest language communities are South Asian. They are the second largest cinema audience in the country and Cinemacity already programmes for them. We are not proposing to change the brand’s voice — Cinemacity is a premium proposition and should stay one. It is simply worth knowing that a significant share of every audience above sits within that community.';

/* ---------------------------------------------------------------------------
   6 · PLATFORMS
   ------------------------------------------------------------------------ */
const PLATFORMS = [
  {
    name: 'Instagram',
    role: 'Where the brand is built',
    priority: 'Lead',
    owner: 'INHAUS',
    cadence: '15 posts a month + 4 creator posts · Stories daily',
    mix: '6 Reels · static, animated and carousel · photography · 1 creator post a week',
    audience: '92% of reach comes from people who do not follow the account. It works as a discovery platform, so every post has to earn attention on its own.',
    brand: 'The most considered surface. Rooms, food, venues and films, shot properly and framed consistently.',
    formats: 'Reels carry the reach · carousels carry the saveable ones · Stories carry the daily presence and the booking links',
    posting: 'Roughly four a week, Reels-led. Release-week posts always point at the most specific booking page available, never the homepage.',
    paid: 'Amplify what already works organically. Never boost an unmodified distributor asset.',
    kpis: 'Link taps · saves · reach from non-followers'
  },
  {
    name: 'TikTok',
    role: 'Where people search for us',
    priority: 'Lead',
    owner: 'INHAUS',
    cadence: '6 brand Reels + 4 creator posts a month, plus in-venue natives',
    mix: 'The same six Reels as Instagram · weekly UGC · quick native videos shot in venue',
    audience: '60.8% of traffic came from search in July, up from 11.7% in February. People are typing formats, locations and film titles.',
    brand: 'Faster, looser, more spoken. Say the location out loud, name the format, repeat it on screen — this is a search channel as much as a video one.',
    formats: 'Room walkthroughs · format explainers · staff on camera · cinema etiquette · creator content',
    posting: 'Two to three a week. Shot quickly, edited lightly — polish performs worse here than personality.',
    paid: 'Spark Ads behind organic winners. Test targeting film-specific fan audiences.',
    kpis: 'Search share · new viewers · completion rate'
  },
  {
    name: 'Snapchat',
    role: 'The in-house channel',
    priority: 'In-house',
    owner: 'Cinemacity marketing, directed by INHAUS',
    cadence: '4–5 Stories a week · 3–6 snaps each',
    mix: 'In-venue phone content, plus experience and location Reels repurposed from Instagram',
    audience: 'Skews younger and more local than Instagram. It rewards being there over being polished.',
    brand: 'The unfiltered version of Cinemacity — what the lobby looks like at 8pm on a Thursday, what the bar is making, who is queueing for what.',
    formats: 'Daily Stories · repurposed experience and location Reels · Snap Map at all six venues · geofilters for openings and tentpoles',
    posting: 'Same day, every time. Nothing planned more than 24 hours ahead — immediacy is the whole value of the channel.',
    paid: 'A defined test budget across three months, measured against Meta and TikTok on cost per landing-page view.',
    kpis: 'Story completion · screenshots · link swipes · Snap Map views',
    flag: 'Full direction on the next frame — this one is being run in-house, so it needs a brief that can be followed without us in the room.'
  },
  {
    name: 'Facebook',
    role: 'Reach, families and events',
    priority: 'Maintain',
    owner: 'INHAUS',
    cadence: 'Cross-posted · events as needed',
    mix: 'Reels and stills reformatted from Instagram · an Event for every Starlight programme',
    audience: 'The largest advertising reach of any platform in the UAE, skewing older and more family-led — which suits Sharjah and Arabian Center.',
    brand: 'Events, family occasions and offers. Cross-posted rather than originated.',
    formats: 'Events · offers · cross-posted Reels',
    posting: 'No original production. Everything here comes from Instagram, reformatted.',
    paid: 'The main workhorse for reach and retargeting.',
    kpis: 'Event responses · cost per landing-page view',
    flag: 'Three separate Cinemacity pages currently exist alongside the main one. Bringing them together would consolidate the audience and simplify everything that runs on the platform.'
  },
  {
    name: 'YouTube',
    role: 'The long-term search asset',
    priority: 'Support',
    owner: 'INHAUS',
    cadence: '2 Shorts a week',
    mix: 'One Short cut from that week’s Reel · one Short from distributor content',
    audience: 'The second largest reach in the UAE, and currently not linked from the Cinemacity website at all.',
    brand: 'Two Shorts a week at no extra production cost. They keep ranking for years after they are posted.',
    formats: 'Shorts from our Reels · Shorts from distributor material',
    posting: 'No original production. Every Short is a cut of something already made.',
    paid: 'Not recommended in year one.',
    kpis: 'Impressions from search · average view duration'
  }
];

/* Monthly production plan — what actually gets made */
const MONTHLY_PRODUCTION = {
  note: 'Everything below is built around six brand Reels a month. Those six travel across Instagram, TikTok, YouTube Shorts and Snapchat, which is what makes the volume achievable without thinning the quality. Creators add a fifth weekly touchpoint on top.',
  rows: [
    { what: 'Brand Reels',        volume: '6 a month',            where: 'Instagram + TikTok',       owner: 'INHAUS' },
    { what: 'Instagram posts',    volume: '15 a month',           where: 'Instagram',                owner: 'INHAUS', detail: 'The six Reels plus static, animated, carousel and photography' },
    { what: 'Creator posts',      volume: '4 a month · one a week', where: 'Instagram + TikTok',     owner: 'INHAUS + creators', detail: 'UGC, native to the creator' },
    { what: 'YouTube Shorts',     volume: '8 a month · two a week', where: 'YouTube',                owner: 'INHAUS', detail: 'One cut from our Reel, one from distributor content' },
    { what: 'Snapchat Stories',   volume: '4–5 a week',           where: 'Snapchat',                 owner: 'Cinemacity', detail: 'Shot in venue on a phone, plus repurposed experience Reels' },
    { what: 'Facebook',           volume: 'Cross-posted',         where: 'Facebook',                 owner: 'INHAUS', detail: 'Plus an Event for every Starlight programme' }
  ]
};

/* ---------------------------------------------------------------------------
   6b · SNAPCHAT — the direction for the in-house owner.
   Written to be handed over and followed without further explanation.
   ------------------------------------------------------------------------ */
const SNAPCHAT = {
  intro: 'Snapchat will be run by Cinemacity’s own marketing team rather than by us, and that is the right call. This is the one platform where being in the building beats being in an edit suite. Everything below is the direction — what to post, when, and the rules that keep it on brand.',
  why: [
    { t: 'Why this platform', d: 'Snapchat’s UAE audience skews younger and more local than Instagram. It is also the only platform where content disappearing is an advantage — it lowers the bar for polish and raises the value of simply being present.' },
    { t: 'Why in-house', d: 'What works here is same-day and unplanned: the queue, the bar, the room filling up. Nobody can shoot that on an agency schedule. Someone already in the venue can shoot it in four minutes.' },
    { t: 'Why it is low risk', d: 'Nothing here needs to be perfect and nothing lives longer than twenty-four hours. It is the safest place in the mix to build confidence on camera.' }
  ],
  week: [
    { day: 'Monday',    what: 'What’s opening this week',       how: 'Poster wall or lobby screens. Say the titles out loud, and say which venue you are in.' },
    { day: 'Wednesday', what: 'Behind the counter',             how: 'Food coming out of the kitchen, a cocktail being made, the popcorn going in. Close, loud, unedited.' },
    { day: 'Thursday',  what: 'Tonight at Cinemacity',          how: 'The busiest hour. The queue, the lounge, the room filling. The most important Story of the week.' },
    { day: 'Weekend',   what: 'Whatever is actually happening', how: 'Events, matches, a full house, a birthday group. React to the day rather than plan it.' },
    { day: 'Ad hoc',    what: 'Opening nights and events',      how: 'Any major first showing or Starlight event. Post it as it happens — no approval needed.' }
  ],
  rules: [
    'Shoot vertically, on a phone. Never upload a finished polished asset here — it looks out of place and performs worse.',
    'Name the venue in every Story, out loud or on screen. Six locations means the audience always needs to know which one they are seeing.',
    'Add the location sticker every time. It is free reach and it feeds Snap Map.',
    'Faces are welcome. Talking to camera works better here than anywhere else in the mix.',
    'Keep each snap under ten seconds. If it needs longer, it belongs on TikTok.',
    'Finish every Story with a link to book. That is what the channel is for.',
    'Never post a distributor trailer. It will be skipped, and it makes the account look like an ad.',
    'Post the same day you shoot. A Thursday night Story posted on Friday is worth nothing.'
  ],
  setup: [
    { t: 'Public Profile', d: 'So Stories can be found and saved, not only seen by existing followers.' },
    { t: 'Snap Map',       d: 'A Place for all six venues, so anyone browsing the map nearby finds Cinemacity.' },
    { t: 'Geofilters',     d: 'One per venue as an always-on, plus title-specific filters for December and Eid.' },
    { t: 'Spotlight',      d: 'Repost the best TikToks here. No extra production, and it is where new audiences come from.' }
  ],
  workflow: 'We share the month’s themes in advance and review the coming week every Monday. Anything reactive can go up immediately within the rules above — waiting for approval defeats the point of the channel. Performance is reviewed monthly alongside the rest of the mix.',
  measure: 'Story completion rate · screenshots · link swipes · new followers · Snap Map views. Judged separately from Instagram and TikTok, because the job is different.'
};

/* ---------------------------------------------------------------------------
   7 · CONTENT PILLARS
   ------------------------------------------------------------------------ */
const PILLARS = [
  {
    id: 'movies-first',
    n: '01',
    name: 'Movies First',
    line: 'What are we showing?',
    role: 'The backbone. Carries the release calendar — and carries it for the whole run, not just opening weekend.',
    insight: 'Every cinema in the UAE posts the same distributor assets on the same morning, which is why they perform the way they do: a boosted trailer reached 646,900 people and earned 41 likes. What nobody publishes is a point of view — which films are worth the trip, what is coming, what is still on. That is the difference between a cinema brand and a listings account. It is also where the real gap sits: distributors spend everything on opening weekend and go quiet, while 90.7% of people see a film within thirty days.',
    territory: 'Informed and genuinely enthusiastic. A programmer with taste, not a critic with a scorecard. Confident enough to recommend, never sneering.',
    includes: 'The monthly line-up. Release-week content. Early material wherever access allows. Recommendations. Weeks two, three and four, when nobody else is talking. Endings and post-credits in clearly flagged spoiler space. Re-releases, repertory and the Arthouse programme. Awards season.',
    formats: [
      { name: 'The Line-Up', desc: 'What is coming this month, with dates and rooms. Pure utility, highly saveable, and nobody else publishes it properly.' },
      { name: 'Worth The Trip', desc: 'One release a week, and the honest case for seeing it on a big screen rather than waiting. The pillar’s point of view in a single post.' },
      { name: 'Still Showing', desc: 'A weekly reminder of what is still on and in which room, in the weeks after the marketing noise stops. Unglamorous, and it will sell tickets.' }
    ],
    executions: [
      'Carousel: December’s line-up, one slide per title, dates and formats — designed to be saved and returned to.',
      'Reel: sixty seconds on why a particular release belongs on the largest screen available.',
      'TikTok: reacting to a trailer the morning it drops, with a real opinion rather than a repost.',
      'Story: a three-frame countdown to a release, ending on a booking link.'
    ],
    production: 'Distributor material always enters the Cinemacity frame, gains a venue name and carries our call to action rather than theirs. Never a plain repost.',
    platforms: 'Instagram leads. TikTok for search and the faster, more opinionated version. Facebook for the family titles.',
    measurement: 'Saves on The Line-Up · reach in release weeks · link taps during opening windows · reach in weeks two and three.',
    note: 'Cinemacity sits closer to film content than any comparable exhibitor in this market, and social has never used that. Being the first account in the UAE to post a piece of film material rather than the fifth is a real and repeatable advantage. Worth mapping exactly what that access allows before we build formats on it.',
    videos: [
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'Reel · 9:16', platform: 'Instagram Reels', credit: '', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' },
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'TikTok · 9:16', platform: 'TikTok', credit: '', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' }
    ]
  },
  {
    id: 'location-experience',
    n: '02',
    name: 'Location & Experience',
    line: 'Where can you experience it?',
    role: 'The pillar that separates Cinemacity from every other cinema in the country. Two halves: the rooms, and the table.',
    insight: 'Cinemacity’s strongest original content has consistently been about its own venues — the Sharjah IMAX video has led TikTok for months, and with 60.8% of TikTok traffic now arriving from search, people are already typing formats and locations. The food is the half nobody knows about: proper kitchens, real cocktails, table service to the seat, licensed venues. On a Thursday night Cinemacity is not really competing with another cinema. It is competing with a restaurant, and it can win that comparison.',
    territory: 'Two temperatures under one system. The rooms are precise and cool — specifications rather than adjectives, shot dark and wide. The table is warm and shallow-focus — food shot the way a restaurant would shoot it, not the way a cinema shoots snacks.',
    includes: 'THE ROOMS — Sharjah’s only IMAX, the 26-metre XXL at Al Qana, the Presidential, VIP and Club Class, the Arthouse theatre, Starlight’s 500 seats, Theatre FIVE. Format explainers, seat guidance, which room suits which film. THE TABLE — the menus and the kitchen, cocktails and the bar, Azul, 1927, Graffiti, Backlot, table service, licensed screenings, live sport, private hire.',
    formats: [
      { name: 'Room Spec', desc: 'One room, shot like a product. Screen size, sound, seat, scale — stated plainly, ending on the room’s name.' },
      { name: 'Best Seat In The House', desc: 'Where to actually sit in each room. Useful, saveable, and the kind of thing only the people who run the place can tell you.' },
      { name: 'Double Feature', desc: 'A film paired with what to eat and drink around it, at a named venue. Two halves of one night, every week.' },
      { name: 'The Pour', desc: 'One cocktail, or one dish, made properly and in close-up. Short, beautiful, endlessly repeatable — and it says more about the brand than any caption could.' }
    ],
    executions: [
      'Reel: a slow move across the Al Qana XXL screen, specification appearing as clean type, no music until the last seconds.',
      'Reel: a cocktail built end to end, forty seconds, no voiceover, sound design only.',
      'TikTok: “Sharjah has one IMAX. This is it.” Handheld, spoken to camera, location named twice.',
      'Carousel: the Thursday night plan at Fountain Views — arrival, table, film, last drink.'
    ],
    production: 'Rooms: wide cinematic framing, shot empty and dark, lit by the screen itself, specifications set in the mono typeface so they read as fact. Food: available light, deep shadow, warm highlights, shallow focus on glassware and plates, steam and texture. One frame system holding both.',
    platforms: 'Instagram leads for the food. TikTok leads for the rooms, because that is what people search. YouTube for the long-form venue films.',
    measurement: 'Saves per post · TikTok search share · traffic to location and menu pages · shares on food content.',
    videos: [
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'Reel · 9:16', platform: 'Instagram Reels', credit: '', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' },
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'Reel · 9:16', platform: 'Instagram Reels', credit: '', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' },
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'TikTok · 9:16', platform: 'TikTok', credit: '', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' },
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'Long form · 16:9', platform: 'YouTube', credit: '', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' }
    ]
  },
  {
    id: 'entertainment-culture',
    n: '03',
    name: 'Entertainment & Culture',
    line: 'Why follow us, even off-season?',
    role: 'Always-on personality. Keeps the account alive in the weeks when there is nothing to announce.',
    insight: 'The account’s single best-performing post ever was an original pop-culture piece that reached two million views — far beyond any distributor asset. Entertainment content already works here. What it has been missing is a point of view. The shared etiquette of the cinema — phones, latecomers, talkers, seat-kickers, the person who explains the plot — is the one reference every audience in this country holds in common, and it belongs to a cinema brand more than to anyone else.',
    territory: 'Dry, warm, deadpan. Cinemacity as the house that has been doing this a long time and has opinions. Always on the side of the people who came to watch the film, never punching at the audience.',
    includes: 'The numbered House Rules series. Cinema etiquette. Film and pop culture with a Cinemacity angle. The case for the big screen over the sofa. Reactive cultural moments, filtered through the same voice. Trends, but only where the brand has something to say.',
    formats: [
      { name: 'House Rules', desc: 'A numbered, growing series — one rule per post, delivered straight. Instantly recognisable, endlessly extendable, and it builds a body of work rather than a stream of posts.' },
      { name: 'Sofa vs Screen', desc: 'The honest case for the room over the living room, made without begging. This pillar’s commercial job.' },
      { name: 'Reactive', desc: 'Cultural and film moments answered in the house voice, within the day. The format that keeps the account feeling alive.' }
    ],
    executions: [
      'Static: House Rule No. 14, set in the display face on black, no image — designed to be screenshotted.',
      'TikTok: reacting to a trending sound in the voice of the house, without naming a title.',
      'Carousel: the rulebook so far — a recurring artefact people come back to.',
      'Reel: the five stages of the person who arrives during the opening scene.'
    ],
    production: 'The most typographic pillar, often with no photography at all. When there is, it is real and unlit. Proof that the system holds attention with nothing but type and black.',
    platforms: 'Instagram for the rulebook and the stills. TikTok for the performed version. The most shareable pillar in the system.',
    measurement: 'Shares and saves · reach from non-followers · comments · share of monthly reach in weeks with no major release.',
    videos: [
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'Reel · 9:16', platform: 'Instagram Reels', credit: '', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' },
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'TikTok · 9:16', platform: 'TikTok', credit: '', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' }
    ]
  },
  {
    id: 'people-moments',
    n: '04',
    name: 'People & Moments',
    line: 'Why does going to the movies matter?',
    role: 'The human pillar. Turns Cinemacity from a venue into somewhere people recognise themselves.',
    insight: 'Nearly three quarters of cinema visits are group occasions — cinema is something people do with someone else, and the memory is usually of the evening rather than the film. Meanwhile the people who work in these rooms see more of that than anyone, and they have never been on camera. Between the audience and the staff, Cinemacity has an enormous amount of genuine material that no competitor can copy and no distributor can supply.',
    territory: 'Warm, real, unstaged. Faces and voices rather than production. This is the pillar that should feel like it was filmed on the night, because it was.',
    includes: 'Audience reactions captured on opening night. Staff and usher perspectives. First dates, birthdays, groups, families. Opening nights and full houses. Starlight events and live sport crowds. The moments people would film themselves.',
    formats: [
      { name: 'Verdict', desc: 'Real reactions captured in the lobby on opening night, cut and published mid-week as proof for anyone still deciding.' },
      { name: 'Ask The Usher', desc: 'The people who work in the rooms, telling real stories from them. Warmth, personality, and the most likeable content Cinemacity can make.' },
      { name: 'Full House', desc: 'The room at its best — an opening night, a match, a Starlight event. The atmosphere is the product, and almost nobody films it.' }
    ],
    executions: [
      'TikTok: “We asked forty people leaving the 9pm show to rate it out of ten.” Fast, real, published Tuesday.',
      'Reel: an usher describing the strangest thing ever found in a screen, straight to camera.',
      'Story: the room filling up before a first showing, posted live.',
      'Carousel: a night at Starlight, told in nine frames.'
    ],
    production: 'Handheld, real light, real sound, minimal grade. This pillar must never look art-directed. The only brand device is the frame edge and the venue name.',
    platforms: 'TikTok and Instagram Reels equally. Stories for the live moments. Snapchat carries the same energy in its own way.',
    measurement: 'Comments and sentiment · shares · saves · participation in reactive formats · reach from non-followers.',
    videos: [
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'Reel · 9:16', platform: 'Instagram Reels', credit: '', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' },
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'TikTok · 9:16', platform: 'TikTok', credit: '', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' }
    ]
  },
  {
    id: 'creator-seeding',
    n: '05',
    name: 'Creator Seeding',
    line: 'Borrowed reach, on TikTok.',
    role: 'A TikTok-first layer that puts Cinemacity in front of audiences the account cannot reach on its own.',
    insight: 'No cinema brand in the UAE runs a proper creator programme, which is unusual and is an opening. Cinemacity does not need the biggest names — it needs the right people coming back regularly, so their audiences start associating them with the brand. Consistency beats scale, and a creator who visits four times is worth more than four creators who visit once.',
    territory: 'Native to whoever is making it. The brief is the venue and the experience, not the script. Creator content that looks like brand content defeats the point.',
    includes: 'Monthly creator visits across all six venues. Tentpole and event collaborations. Food and family creators as well as film ones. Reposting and amplifying the good ones.',
    formats: [
      { name: 'The Regulars', desc: 'Four creators rotating monthly across film, food, family and comedy, each attached to a venue so coverage spreads across the whole estate.' },
      { name: 'The Guests', desc: 'One-off collaborations around tentpoles, Starlight events and live sport. Paid, per activation, for scale at the moments that matter.' },
      { name: 'Seeded Reposts', desc: 'The strongest creator content amplified through the brand account and behind paid. Free production, proven performance.' }
    ],
    executions: [
      'A food creator eating their way through the Azul menu before a screening.',
      'A film creator reviewing the Sharjah IMAX as a room rather than reviewing the film.',
      'A family creator doing a school-holiday visit end to end.',
      'A comedy creator on cinema etiquette, filmed in an empty screen.'
    ],
    production: 'Theirs, not ours. We provide the access, the venue and the angle. Light-touch guidelines only — the frame device is optional here, because the credibility comes from it not looking like an ad.',
    platforms: 'TikTok first, with Instagram as secondary usage where rights allow. Spotlight on Snapchat for the best of it.',
    measurement: 'Cost per landing-page view against paid benchmarks · creator-attributed link taps · content longevity · repeat-collaboration rate.',
    videos: [
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'TikTok · 9:16', platform: 'TikTok', credit: 'OPTIONAL_CREATOR_NAME', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' },
      { title: 'VIDEO_TITLE', description: 'VIDEO_DESCRIPTION', format: 'TikTok · 9:16', platform: 'TikTok', credit: 'OPTIONAL_CREATOR_NAME', thumbnail: 'VIDEO_THUMBNAIL_URL', driveUrl: 'GOOGLE_DRIVE_VIDEO_URL', externalUrl: '' }
    ]
  }
];

/* ---------------------------------------------------------------------------
   8 · RECURRING FORMATS
   ------------------------------------------------------------------------ */
const FORMATS_GRID = [
  { name: 'The Line-Up',            pillar: 'Movies First',    cadence: 'Monthly',       platform: 'IG carousel',  job: 'Utility + saves' },
  { name: 'Worth The Trip',         pillar: 'Movies First',    cadence: 'Weekly',        platform: 'IG + TikTok',  job: 'Point of view' },
  { name: 'Still Showing',          pillar: 'Movies First',    cadence: 'Weekly',        platform: 'IG + Stories', job: 'Weeks 2–4' },
  { name: 'Room Spec',              pillar: 'Location & Exp.', cadence: 'Monthly',       platform: 'TikTok + YT',  job: 'Search' },
  { name: 'Best Seat In The House', pillar: 'Location & Exp.', cadence: 'Quarterly',     platform: 'IG carousel',  job: 'Saves' },
  { name: 'Double Feature',         pillar: 'Location & Exp.', cadence: 'Weekly',        platform: 'Instagram',    job: 'Film + food' },
  { name: 'The Pour',               pillar: 'Location & Exp.', cadence: 'Fortnightly',   platform: 'IG Reels',     job: 'Bar and kitchen' },
  { name: 'House Rules',            pillar: 'Ent. & Culture',  cadence: 'Twice weekly',  platform: 'IG + TikTok',  job: 'Reach + brand' },
  { name: 'Sofa vs Screen',         pillar: 'Ent. & Culture',  cadence: 'Monthly',       platform: 'IG + TikTok',  job: 'The big screen' },
  { name: 'Reactive',               pillar: 'Ent. & Culture',  cadence: 'As it happens', platform: 'TikTok + IG',  job: 'Relevance' },
  { name: 'Verdict',                pillar: 'People & Moments',cadence: 'Weekly',        platform: 'TikTok + IG',  job: 'Social proof' },
  { name: 'Ask The Usher',          pillar: 'People & Moments',cadence: 'Fortnightly',   platform: 'TikTok',       job: 'Warmth' },
  { name: 'Full House',             pillar: 'People & Moments',cadence: 'Per event',     platform: 'Stories + IG', job: 'Atmosphere' },
  { name: 'The Regulars',           pillar: 'Creator Seeding', cadence: 'Monthly',       platform: 'TikTok',       job: 'Borrowed reach' },
  { name: 'The Guests',             pillar: 'Creator Seeding', cadence: 'Per tentpole',  platform: 'TikTok',       job: 'Scale' }
];

/* ---------------------------------------------------------------------------
   9 · CAMPAIGNS
   ------------------------------------------------------------------------ */
const CAMPAIGNS = [
  {
    title: 'The Rooms',
    when: 'Across the year',
    body: 'Cinemacity’s own campaign rather than a borrowed one. Six films, one per venue, released through the year as the backbone of The Room — Sharjah’s only IMAX, the 26-metre XXL, the Presidential, the Arthouse, Starlight’s 500 seats, Theatre FIVE. The one campaign no distributor calendar can move.'
  },
  {
    title: 'December',
    when: '18 December 2026',
    body: 'Avengers: Doomsday and Dune: Part Three release on the same day, four days into the UAE winter break. Both are built for the largest screens available — which is exactly the Zero6 IMAX and the Al Qana XXL. The strongest argument for Cinemacity all year, handed to us. Plan it as one two-week event.'
  },
  {
    title: 'Ramadan into Eid',
    when: 'February – March 2027',
    body: 'Ramadan begins around 8 February and Eid Al Fitr falls 10–12 March, followed immediately by two major releases. One continuous arc, not three campaigns: quieter late-night and family occasions through Ramadan, then the biggest local peak of the year, then the tentpoles that follow it.'
  },
  {
    title: 'Matchday',
    when: 'Live sport, year round',
    body: 'Cinemacity has already proved this format. Big screens, licensed venues and proper food make it one of the few cinemas in the country that can host a match properly. It sits inside The Late Show and it works every time a major fixture lands.'
  }
];

/* ---------------------------------------------------------------------------
   11 · PAID
   ------------------------------------------------------------------------ */
const PAID_MODEL = [
  { layer: 'Never',  body: 'Boosting an unmodified distributor asset. 646,900 views and 41 likes is the clearest evidence we have. The distributor is already running that asset with a bigger budget.', tone: 'bad' },
  { layer: 'Always', body: 'Amplifying what already works. Any post that clears an agreed threshold organically becomes a paid candidate — the audience picks the media plan.', tone: 'good' },
  { layer: 'Always', body: 'Conversion campaigns behind The Room and The Late Show, optimised to the strongest signal available on the booking journey.', tone: 'good' },
  { layer: 'Test',   body: 'Film-specific fan targeting on TikTok, which converts significantly better than broad audiences in published theatrical studies. Three titles, defined budget.', tone: 'test' },
  { layer: 'Test',   body: 'Snapchat as a paid and geofilter layer only, capped at three months and measured against Meta and TikTok.', tone: 'test' },
  { layer: 'Build',  body: 'Retargeting audiences from people who reached the booking journey but did not finish. Currently the biggest untapped paid asset Cinemacity has.', tone: 'build' }
];

/* ---------------------------------------------------------------------------
   12 · PATH TO PURCHASE — deliberately short
   ------------------------------------------------------------------------ */
const JOURNEY_STEPS = [
  { label: '2,501,103 views',       note: 'Instagram, July 2026', tone: 'strong' },
  { label: '~9,100 profile visits', note: 'People wanting to know more', tone: 'strong' },
  { label: '1,665 taps to book',    note: 'Where our work hands over', tone: 'strong' },
  { label: 'The booking journey',   note: 'Where the decision is won or lost', tone: 'weak' },
  { label: 'A ticket',              note: '', tone: 'end' }
];

const BOOKING_MESSAGE = 'We can keep growing reach. We are good at it, and July proved it. But every post ends at the same handover, and how smooth that handover feels decides how much of the attention becomes a ticket. We looked at the journey from a phone, the way an audience arrives from Instagram. Five things stood out.';

const BOOKING_FINDINGS = [
  {
    title: 'Posts cannot link to a specific film at a specific cinema',
    body: 'Social sends people to a general page, so they have to find the film again themselves. Being able to link straight to the session would lift the performance of every post and every campaign.',
    gain: 'The single highest-value change on this list.'
  },
  {
    title: 'The first screen asks a question before it gives anything',
    body: 'Arriving from a post, the first thing shown is an empty location selector. Remembering the cinema, or carrying it through from the link, would remove a decision at the moment people are least patient.',
    gain: 'Affects everyone arriving from social.'
  },
  {
    title: 'Payment is card-entry only',
    body: 'No Apple Pay or Google Pay, in a market where nearly four in five online purchases happen on a phone. Typing card details one-handed is where late-evening bookings are lost.',
    gain: 'Most relevant to the audience deciding an hour before the film.'
  },
  {
    title: 'Food cannot be added while booking',
    body: 'Given how good the food is, and that The Late Show is built around it, not being able to add it at the moment of booking leaves the best part of the offer out of the conversation.',
    gain: 'Directly supports the food pillar.'
  },
  {
    title: 'Showtimes do not appear in search results',
    body: 'When someone searches a film and a cinema together, Cinemacity’s pages are not what they find. With search now driving 60.8% of TikTok traffic, this is demand the brand is already creating and not capturing.',
    gain: 'Free, compounding traffic.'
  }
];

const BOOKING_CLOSE = 'None of this changes what we make. It changes how much of it counts. We are happy to work through the detail with whoever looks after the platform — and in the meantime we will point every link at the most specific page that exists and tag everything properly so the impact is visible.';

/* ---------------------------------------------------------------------------
   13 · THE YEAR
   ------------------------------------------------------------------------ */
const CALENDAR = [
  { month: 'Sep 2026', tier: 'build', title: 'Launch', notes: 'Schools return. The Room and House Rules go live, the visual system rolls out, measurement baseline set.', films: '' },
  { month: 'Oct 2026', tier: 'mid',   title: 'Horror season', notes: 'The genre that travels furthest on social. First paid tests behind Second Weekend.', films: 'Terrifier 4 · Street Fighter' },
  { month: 'Nov 2026', tier: 'high',  title: 'The run-up', notes: 'Hunger Games on the 20th. Narnia arrives as an IMAX engagement on the 26th — a direct argument for Zero6.', films: 'Sunrise on the Reaping · Narnia' },
  { month: 'Dec 2026', tier: 'peak',  title: 'The biggest date of the year', notes: 'Avengers: Doomsday and Dune: Part Three on 18 December, four days into winter break. National Day on the 2nd.', films: '18 Dec — Doomsday + Dune: Part Three' },
  { month: 'Jan 2027', tier: 'mid',   title: 'Awards and arthouse', notes: 'Awards sustain through Second Weekend. The Arthouse theatre comes forward.', films: 'Children of Blood and Bone' },
  { month: 'Feb 2027', tier: 'low',   title: 'Ramadan begins', notes: 'Quieter days, busy nights. Late sessions, family occasions and House Rules hold the account without selling hard.', films: 'Ice Age: Boiling Point' },
  { month: 'Mar 2027', tier: 'peak',  title: 'Eid Al Fitr, 10–12 March', notes: 'The biggest local peak of the year on a three-day weekend, then two tentpoles straight after. One continuous fourteen-day plan.', films: 'Sonic 4 · Godzilla x Kong' },
  { month: 'Apr 2027', tier: 'mid',   title: 'Spring break', notes: 'Family occasions. The Star Wars 50th re-release is pure The Room territory.', films: 'A New Hope 50th' },
  { month: 'May 2027', tier: 'high',  title: 'Eid Al Adha, 16–18 May', notes: 'Second Eid peak, with Zelda releasing into the run-up.', films: 'The Legend of Zelda · Starfighter' },
  { month: 'Jun 2027', tier: 'mid',   title: 'Pre-summer', notes: 'Spider-Verse in IMAX. Summer messaging begins as schools finish.', films: 'Beyond the Spider-Verse · Shrek 5' },
  { month: 'Jul 2027', tier: 'high',  title: 'Summer', notes: 'Escape the heat. Cinema as the default indoor plan — families and groups lead.', films: 'A Minecraft Movie 2 · A Quiet Place III' },
  { month: 'Aug 2027', tier: 'high',  title: 'Summer peak', notes: 'Bluey lands on the 6th and is a significant family moment.', films: 'Bluey: The Movie' },
  { month: 'Sep–Nov 2027', tier: 'peak', title: 'Sport and Batman', notes: 'A major cricket tournament runs through October and November in a workable time zone — Matchday’s biggest opportunity — alongside The Batman Part II on 1 October.', films: 'The Batman Part II' }
];

/* ---------------------------------------------------------------------------
   14 · MEASUREMENT
   ------------------------------------------------------------------------ */
const METRICS = [
  {
    tier: 'Every week',
    lens: 'What we act on',
    items: [
      { k: 'Link taps as a share of views', note: 'The number this strategy is built to move. July baseline: 0.067%.' },
      { k: 'Saves per post', note: 'The best available signal of real intent on Instagram.' },
      { k: 'TikTok search share', note: 'Already strong at 60.8% and worth protecting.' },
      { k: 'Completion and watch time', note: 'How we optimise creative, week to week.' }
    ]
  },
  {
    tier: 'Every month',
    lens: 'What we report',
    items: [
      { k: 'Reach and views by pillar', note: 'Which pillars are carrying the account, and which need work.' },
      { k: 'Share of reach from non-release content', note: 'Whether the account stands up when the slate is quiet.' },
      { k: 'Traffic to location and venue pages', note: 'Whether the rooms and the food are landing.' },
      { k: 'Community health', note: 'Comments, sentiment, replies and the questions people ask.' }
    ]
  },
  {
    tier: 'Every quarter',
    lens: 'What we review together',
    items: [
      { k: 'Bookings from social-tagged links', note: 'We will tag every link from day one so this becomes visible as soon as the data can be connected.' },
      { k: 'Cost per landing-page view by platform', note: 'The honest paid efficiency measure, comparable across channels.' },
      { k: 'Format performance', note: 'Which recurring formats have earned their place and which should be replaced.' },
      { k: 'Competitive share of voice', note: 'Reviewed manually each quarter, with dated evidence.' }
    ]
  }
];

const METRICS_NOTE = 'Measured on what this channel can genuinely influence — and reported the same way every month, so progress is easy to see.';

const METRICS_FOOTNOTE = 'One change to how we report: engagement rate should be calculated against reach rather than followers. With 92% of reach coming from non-followers, the follower base is the wrong denominator and it makes month-to-month comparison unreliable.';

/* ---------------------------------------------------------------------------
   15 · FIRST 90 DAYS
   ------------------------------------------------------------------------ */
const NINETY_DAYS = [
  { phase: 'Month 1', title: 'Launch and set the baseline', items: ['The Room and House Rules go live', 'Visual system applied across every post', 'Consistent link tagging from day one', 'Facebook pages consolidated', 'Measurement baseline agreed'] },
  { phase: 'Month 2', title: 'Build out the calendar', items: ['First Look launches with the monthly line-up', 'The Late Show begins with food and bar production', 'First four creators onboarded', 'Second Weekend runs against a live release', 'First paid tests behind proven organic posts'] },
  { phase: 'Month 3', title: 'Prove it before December', items: ['All five pillars running at full cadence', 'The Rooms campaign films in production', 'December plan locked by mid-November', 'First quarterly review against the framework'] }
];

/* ---------------------------------------------------------------------------
   16 · VISUAL SYSTEM
   ------------------------------------------------------------------------ */
const VISUAL_PRINCIPLES = [
  { n: '01', title: 'The frame is the brand', body: 'A consistent frame — edge, ratio, corner mark, venue name — that turns any asset into a Cinemacity asset. This is how the brand owns material it did not shoot.' },
  { n: '02', title: 'Always name the room', body: 'Every post says where it is. It makes the positioning real, it feeds search, and it is the one rule that never bends.' },
  { n: '03', title: 'Type carries the voice', body: 'A display face for statements, a mono face for detail. The mono is what makes a screen size read as fact rather than a claim. Some posts need no image at all.' },
  { n: '04', title: 'Black is the default', body: 'Cinema is a dark room. Light comes from the screen and from the food, not from the design. Bright saturated layouts belong to the competition.' },
  { n: '05', title: 'Five pillars, five temperaments', body: 'The Room is precise and cool. First Look is bright and current. The Late Show is warm and shallow-focus. Second Weekend is fast and editorial. House Rules is pure type. Consistency lives in the frame, not in sameness.' },
  { n: '06', title: 'Adapt, never repost', body: 'Every distributor asset enters the Cinemacity frame, gains a venue name and carries our call to action. This is the highest-volume application of the system.' }
];

const VISUAL_SYSTEM_EXAMPLES = [
  { id: 'hero-campaign',  title: 'HERO_DESIGN_EXAMPLE',      type: 'image', platform: 'Instagram', format: '4:5 feed post', aspectRatio: '4 / 5',  pillar: 'The Room',       assetUrl: '', description: 'DESIGN_DESCRIPTION', rationale: 'The system at full strength — room named, frame applied, type doing the work.' },
  { id: 'feed-preview',   title: 'INSTAGRAM_FEED_PREVIEW',   type: 'image', platform: 'Instagram', format: '3×3 grid',      aspectRatio: '1 / 1',  pillar: 'All pillars',    assetUrl: '', description: 'DESIGN_DESCRIPTION', rationale: 'Nine posts reading as one brand across five different pillars.' },
  { id: 'food',           title: 'FOOD_DESIGN_EXAMPLE',      type: 'image', platform: 'Instagram', format: '4:5 feed post', aspectRatio: '4 / 5',  pillar: 'The Late Show',  assetUrl: '', description: 'DESIGN_DESCRIPTION', rationale: 'Food shot like a restaurant would shoot it.' },
  { id: 'carousel',       title: 'CAROUSEL_DESIGN_EXAMPLE',  type: 'image', platform: 'Instagram', format: '4:5 carousel',  aspectRatio: '4 / 5',  pillar: 'First Look',     assetUrl: '', description: 'DESIGN_DESCRIPTION', rationale: 'The Line-Up — the saveable utility format.' },
  { id: 'story',          title: 'STORY_DESIGN_EXAMPLE',     type: 'image', platform: 'Stories',   format: '9:16 story',    aspectRatio: '9 / 16', pillar: 'Second Weekend', assetUrl: '', description: 'DESIGN_DESCRIPTION', rationale: 'Link sticker treatment — the booking surface.' },
  { id: 'reel-cover',     title: 'REEL_COVER_EXAMPLE',       type: 'image', platform: 'Instagram', format: '9:16 cover',    aspectRatio: '9 / 16', pillar: 'The Late Show',  assetUrl: '', description: 'DESIGN_DESCRIPTION', rationale: 'Covers designed as a grid system, not an afterthought.' },
  { id: 'tiktok-frame',   title: 'TIKTOK_FRAME_EXAMPLE',     type: 'image', platform: 'TikTok',    format: '9:16 frame',    aspectRatio: '9 / 16', pillar: 'The Room',       assetUrl: '', description: 'DESIGN_DESCRIPTION', rationale: 'On-screen text built for search as well as for reading.' },
  { id: 'house-rules',    title: 'CONTENT_PILLAR_DESIGN',    type: 'image', platform: 'Instagram', format: '1:1 static',    aspectRatio: '1 / 1',  pillar: 'House Rules',    assetUrl: '', description: 'DESIGN_DESCRIPTION', rationale: 'Type only, no image. Proof the system holds with nothing else.' },
  { id: 'motion',         title: 'MOTION_DESIGN_VIDEO',      type: 'video', platform: 'Instagram Reels', format: '9:16 motion', aspectRatio: '9 / 16', pillar: 'The Room', assetUrl: '', thumbnailUrl: '', description: 'MOTION_DESCRIPTION', rationale: 'Frame-edge motion language and the venue-name reveal.' },
  { id: 'adaptation',     title: 'PAID_MEDIA_ADAPTATION',    type: 'image', platform: 'Meta / TikTok', format: '1:1 + 9:16', aspectRatio: '1 / 1', pillar: 'First Look',     assetUrl: '', description: 'DESIGN_DESCRIPTION', rationale: 'One idea across feed, story and paid without redrawing it.' }
];


/* ---------------------------------------------------------------------------
   17 · IMAGERY
   Backgrounds sit behind hero frames under a scrim; photography runs as bands
   and strips. Swap a path here and it changes everywhere it is used.
   ------------------------------------------------------------------------ */
const IMAGES = {
  bg: {
    projector: 'assets/img/bg-projector.webp',
    night:     'assets/img/bg-night.webp',
    sunset:    'assets/img/bg-sunset.webp'
  },
  photo: {
    corridor: { src: 'assets/img/ph-corridor.webp', alt: 'Cinemacity corridor lined with lit theatre entrances', pos: 'center 46%' },
    armchair: { src: 'assets/img/ph-armchair.webp', alt: 'A guest seated in a Cinemacity lounge armchair',        pos: 'center 40%' },
    audience: { src: 'assets/img/ph-audience.webp', alt: 'An audience reacting during a Cinemacity screening',    pos: 'center 36%' },
    icee:     { src: 'assets/img/ph-icee.webp',     alt: 'Cold drinks shared in a Cinemacity auditorium',         pos: 'center 46%' },
    food:     { src: 'assets/img/ph-food.webp',     alt: 'Hot food served to the seat at Cinemacity',             pos: 'center 52%' },
    popcorn:  { src: 'assets/img/ph-popcorn.webp',  alt: 'A branded Cinemacity popcorn box in dramatic light',    pos: 'center 42%' }
  }
};

/* The experience strip — a visual breather between chapters */
const EXPERIENCE_STRIP = ['corridor', 'audience', 'popcorn', 'armchair', 'food', 'icee'];

/* Each pillar gets a hero band so scrolling the section has rhythm */
const PILLAR_IMAGES = {
  'movies-first':          'corridor',   /* a corridor lined with posters — literally what we are showing */
  'location-experience':   'food',
  'entertainment-culture': 'popcorn',
  'people-moments':        'audience',
  'creator-seeding':       'icee'
};
