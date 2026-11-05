// Everything you'd want to edit by hand lives here: your intro, links,
// folder names and the words shown for each project.
// Images and videos come from js/data-media.js (generated from ~/Desktop/website).

window.SITE = {
  name: 'Uditi Bokolia',
  site: 'Behind The Scenes',
  email: 'uditi20bokolia@gmail.com',
  instagram: 'https://www.instagram.com/uditi.designs/',
  linkedin: 'https://www.linkedin.com/in/uditibokolia/',
  whatsapp: 'https://wa.me/918826303393', // set to '' to hide WhatsApp
  phone: '+91 88263 03393',
  roles: ['Social Media Manager', 'Designer'],
  education: 'NIFT New Delhi',
  status: 'Available for work',
  intro: [
    'I am a creative professional with a growing practice in social media, content creation, PR, marketing, and creative direction. A graduate from NIFT New Delhi, I combine a strong visual design background with an interest in building engaging, brand-focused digital communication.',
    'I enjoy working across content ideation, social media strategy, creative campaigns, visual storytelling, and video production, from concept to execution. I am particularly interested in developing cohesive brand identities, creating impactful content, and translating ideas into meaningful digital experiences.'
  ],
  skills: [
    'Social media management',
    'Content creation',
    'Creative direction',
    'AI image & video generation',
    'Performance marketing',
    'Graphic design',
    'Illustration',
    'Digital art',
    'Textile design',
    'Print design',
    'Video editing: reels & YouTube'
  ],
  workingWith: ['Fashion brands', 'Real estate', 'Tech brands', 'Agencies', 'Music artists', 'Other creatives'],
  pinterest: 'https://pin.it/5c1J8Nh9k',
  portrait: 'media/home/portrait.jpg',
  resume: ['media/home/resume-1.jpg'] // pages of ~/Desktop/website/resume.pdf; [] hides the Résumé icon
};

// Desktop folders, in order. `folder` = a top-level folder name in ~/Desktop/website.
// `projects` = a "smart folder" that collects projects from other folders
// (with `folder` too, it replaces that folder's own list).
// `tile` = the homepage photo (from ~/Desktop/website/thumbnails); without it,
// `cover` = [project id, optional file name] picks one from the work.
// `asFolder` = show as a blue folder on the homepage instead of a photo.
// Any folder in ~/Desktop/website not listed here still shows up, at the end.
window.CATEGORIES = [
  { id: 'social-media', tile: 'media/home/tiles/social-media.jpg', name: 'Social Media Management', folder: 'SOCIAL MEDIA', cover: ['mayin'] },
  { id: 'ai', name: 'AI', folder: 'AI', cover: ['pilates'] },
  { id: 'creative-direction', tile: 'media/home/tiles/creative-direction.jpg', name: 'Creative Direction', projects: ['kj', 'jaypore', 'dm'], cover: ['kj'] },
  { id: 'content-creation', tile: 'media/home/tiles/content-creation.jpg', name: 'Content Creation', folder: 'CONTENT CREATION', cover: ['perfume'] },
  { id: 'graphics', tile: 'media/home/tiles/graphics.jpg', name: 'Graphics', folder: 'GRAPHICS', cover: ['layrd'] },
  { id: 'design', tile: 'media/home/tiles/design.jpg', name: 'Design', folder: 'DESIGNINGG', projects: ['kj', 'jaypore', 'dm', 'print'], cover: ['jaypore'] },
  { id: 'video-editing', tile: 'media/home/tiles/video-editing.jpg', name: 'Video Editing', folder: 'video editing', projects: ['video-editing'], cover: ['video-editing', 'AV.mp4'] },
  { id: 'performance-marketing', tile: 'media/home/tiles/performance-marketing.jpg', name: 'Performance Marketing', projects: ['vnest', 'kj'], cover: ['vnest', 'Video-52867.mp4'] },
  { id: 'illustrations', name: 'Illustrations', folder: 'illustrations', asFolder: true }
];

// `cover` = the file shown first and on the folder.
// Words for each project, keyed by project id (the folder name in lowercase,
// spaces turned into dashes). Missing ones fall back to the folder name.
window.PROJECTS = {
  'mayin': {
    cover: 'IMG_0137.jpg',
    title: 'Mayin', client: 'Mayin', type: 'Social Media > Content Design',
    summary: 'Instagram rollout for the Gingham Chiffon saree drop: outfit-styling posts, the fabric story, and customer-review carousels.'
  },
  'kj': {
    cover: 'Image-11711.jpg',
    title: 'Journey of Flowers', client: 'Kshitij Jalori', year: 'Sep–Dec 2025', type: 'Social Media > Creative Direction',
    role: 'Social Media Design',
    summary: 'Ran Kshitij Jalori’s social media end to end, from grid planning and scheduling to launch and BTS stories. I managed the photoshoots and post-production, handled client approvals, and kept the website in line with the brand.'
  },
  'vnest': {
    title: 'Veda Nest', client: 'Veda Nest Real Estate Brokers', year: '2026', type: 'Social Media > Video > Performance',
    role: 'Social Media Manager',
    summary: 'Real-estate reels and social content for the company and its founder, created, filmed and edited end to end. I also ran the account and Meta Ads campaigns that brought in qualified leads.'
  },
  'dm': {
    cover: 'Image-87766.jpg',
    title: 'Autumn Winter', client: 'Divyam Mehta', year: 'May–Jul 2024', type: 'Design > Lookbook',
    role: 'Design Intern',
    summary: 'Lookbooks for prêt and festive collections, design documentation, invitation postcards and Instagram posts, bringing a textile sensibility to print and digital.'
  },
  'jaypore': {
    cover: 'IMG_1590_Original.PNG',
    title: 'Jaypore SS26', client: 'Jaypore · ABFRL', year: 'Jan–Apr 2025', type: 'Design > Creative Direction',
    role: 'Graduation project',
    summary: 'A four-month graduation project: two menswear collections for SS26 exploring traditional block printing, plus the shoot, photo editing and the final showcase.'
  },
  'layrd': {
    intro: 'Social creatives for LAYR’D, a clean-eating bowl brand in Gurugram. Each bowl gets its own headline, set in loud condensed pink type with a hand-lettered script over rich, close-up food photography. Annotated fries posts, a manifesto post and launch coverage complete a feed that feels bold, playful and unmistakably LAYR’D.',
    cover: 'IMG_9880.JPG',
    title: "LAYR'D", client: "LAYR'D", year: 'Dec 2024', type: 'Graphics > Social Media',
    role: 'Social Media Design',
    summary: 'Bold social creatives for a clean-eating bowl brand in Gurugram, with loud typography, vibrant visuals and one consistent voice across platforms.'
  },
  'melabody': {
    cover: 'pack.PNG',
    title: 'Melabody', client: 'Melabody', type: 'AI > Packaging',
    summary: 'Product campaign for a body lotion, generated with AI image and video tools, together with the packaging design.'
  },
  'pilates': {
    cover: 'feed.png',
    title: 'Pilates Studio', client: 'Concept', type: 'AI > Social Media',
    summary: 'An AI-generated Instagram grid for a pilates and wellness brand, all soft pinks and slow mornings.'
  },
  'padel': {
    cover: 'feed.png',
    title: 'Padel Club', client: 'Concept', type: 'AI > Graphics',
    summary: 'Social posters for padel and tennis clubs.'
  },
  'peppa-please': {
    cover: '69C43871-F957-4B72-ACAE-03C89960EE92.PNG',
    title: 'Peppa Please', client: 'Peppa Please', type: 'AI > Branding',
    summary: 'Identity and product visuals for a hot-sauce brand: logo, colourways and bottle shots.'
  },
  'mcaffine': {
    intro: 'Packaging concepts for mCaffeine: mailer boxes shown as 3D mock-ups alongside their flat dielines. Each box has its own mood, from flowing teal and kraft shapes with fine line art, to a soft coral gradient, to a dense burgundy leaf print around the line “More than just a routine”, finished with a “Did you know?” insert.',
    cover: 'ChatGPT Image 5 Nov 2026, 09_27_10.png',
    title: 'mCaffeine', client: 'mCaffeine', type: 'Graphics > Packaging',
    summary: 'Packaging concept for mCaffeine, from moodboard and hand-drawn patterns to the box dielines and 3D mock-ups.'
  },
  'aurelia': {
    intro: 'A brand identity for Aurelia, built around a refined serif wordmark and a single ‘A’ monogram in deep burgundy and ivory. The system carries from swing tags and a care card to the shopping bag, gift box and tissue seal, so every touchpoint feels quiet, considered and recognisably the same brand.',
    cover: 'IMG_4451.PNG',
    title: 'Aurelia', client: 'Aurelia', type: 'Graphics > Branding',
    summary: 'Brand identity for Aurelia: logo, swing tags, shopping bag and stationery.'
  },
  'beyond-you': {
    intro: 'A teaser campaign and packaging for the Beyond You eau de parfum. Moody, low-lit portraits and an elegant serif-and-script type pairing set up the fragrance’s sense of mystery. Below, the carton for Easy Love is shown across seven print-finish versions, from gold foil alone to colour print with foiling, embossing and UV.',
    cover: '2 2.png',
    title: 'Beyond You', client: 'Beyond You', type: 'Graphics > Campaign',
    summary: 'Teaser campaign for a fragrance launch.'
  },
  'liverpool': {
    intro: 'A concept packaging range for a Liverpool Football Club energy drink. Cans and bottles are dressed in the club’s red, white and black and its crest, then lit through red smoke for dramatic, matchday-style product visuals.',
    cover: 'IMG_1383.JPG',
    title: 'Liverpool Can', client: 'Concept', type: 'Graphics > Packaging',
    summary: 'Concept can design and product visuals.'
  },
  'perfume': { title: 'UGC: Perfume', client: 'UGC', type: 'Content Creation > UGC', summary: 'User-generated-style product video for a fragrance.' },
  'make-up': { title: 'UGC: Makeup', client: 'UGC', type: 'Content Creation > UGC', summary: 'User-generated-style makeup video.' },
  'haircare': { title: 'UGC: Haircare', client: 'UGC', type: 'Content Creation > UGC', summary: 'User-generated-style haircare video.' },
  'skin-care': { title: 'UGC: Skincare', client: 'UGC', type: 'Content Creation > UGC', summary: 'User-generated-style skincare video.' },
  'travel': { title: 'Travel Diaries', client: 'Personal', type: 'Content Creation > Video', summary: 'Travel reels shot and edited across Dubai, Qatar and Tunisia.' },
  'illustrations': { title: 'Illustrations', client: 'Personal', type: 'Digital Art', summary: 'Personal illustration and digital art.' },
  'drip': { title: 'Drip Project', client: 'Drip', type: 'AI > Campaign', summary: 'AI-generated campaign visuals and a short film for Drip.' },
  'print': { title: 'Print Designing', client: 'Divyam Mehta', type: 'Design > Print', summary: 'Print design work for Divyam Mehta.' },
  'logos': { title: 'Logos', client: 'Various', type: 'Graphics > Logo Design', summary: 'A selection of logo and identity work.' },
  'prink': {
    intro: 'Branding for PRINK, a cold prebiotic soda that keeps the fizz and flavour of a soft drink and leaves out the sugar. The identity rests on a stacked lowercase wordmark, a warm cream base and a bold soda red. Story formats that ask, compare and explain (a poll, a “what’s left?” ingredient story, a zero-sugar checklist) sit beside close-ups of ice, bubbles and halftone dots, and lifestyle frames that put the can into everyday moments.', title: 'PRINK', client: 'PRINK', type: 'Graphics > Packaging', summary: 'Packaging design for PRINK.' },
  'graphics': {
    intro: 'All artworks featured below were created using Nomad Sculpt, exploring digital sculpting through playful forms, detailed textures, and three-dimensional compositions.', title: '3D Visuals', client: 'Personal', type: 'Graphics > 3D', summary: '3D product visual.' },
  'video-editing': { title: 'Edits & Reels', client: 'Various', type: 'Video Editing', summary: 'Short films and reels, cut and edited by Uditi.' }
};

// The Photo Booth window in the middle of the homepage.
window.BOOTH = {
  shots: ['media/home/booth-3.jpg', 'media/home/booth-4.jpg'],
  video: ['travel', 0], // [project id, item number] played by the "video" button
  note: '“Every post has a story behind it.”'
};

// Folders in the Finder app ("All Work"), in this order. A folder with several
// projects (like UGC) opens into its own view. Empty folders are hidden.
window.FINDER_FOLDERS = [
  { name: 'Kshitij Jalori', projects: ['kj'] },
  { name: 'Jaypore', projects: ['jaypore'] },
  { name: 'Divyam Mehta', projects: ['dm'] },
  { name: 'Veda Nest DXB', projects: ['vnest'] },
  { name: 'Mcaffeine', projects: ['mcaffine'] },
  { name: 'Majnu Ind.', projects: ['majnu'] },
  { name: 'Melabody', projects: ['melabody'] },
  { name: 'Liverpool', projects: ['liverpool'] },
  { name: 'Drip Project', projects: ['drip'] },
  { name: 'Padel', projects: ['padel'] },
  { name: 'Peppa Please', projects: ['peppa-please'] },
  { name: 'Pilates Studio', projects: ['pilates'] },
  { name: 'Layr’d', projects: ['layrd'] },
  { name: 'UGC', projects: ['perfume', 'make-up', 'haircare', 'skin-care', 'travel'] },
  { name: 'Beyond You', projects: ['beyond-you'] },
  { name: 'Aurelia', projects: ['aurelia'] },
  { name: 'Logos', projects: ['logos'] },
  { name: 'Illustrations', projects: ['illustrations'] }
];

// The Social Media page (cover-flow). Names are shown exactly as written here.
// `cover` = optional file name from that project to use on its card.
// Numbers on the Performance Marketing page, from Meta Ads Manager, "vnest" ad account,
// every campaign 15 May – 5 Nov 2026 (read 5 Nov 2026). Reach counts Meta accounts.
window.PERF_STATS = [
  { n: 59158, label: 'Reach (Meta accounts)' },
  { n: 145, label: 'Messaging conversations started' },
  { n: 35, label: 'Leads' }
];
// The short summary beside those numbers, and the five best-performing reels below them.
// Reels are ranked by Meta "Results": the outcome each campaign was optimised for (messaging
// conversations started, or instant-form leads), since 25 of the 26 campaigns ran on the Leads objective.
window.PM_SUMMARY = 'Meta Ads for Veda Nest, 15 May – 5 Nov 2026. 25 of 26 campaigns ran on the Leads objective, inviting buyers to start a WhatsApp conversation or fill in an instant form; one ran on Awareness. Offer-led reels worked best: the Arjan distress deal started 25 conversations, and Ghaf Woods reached 13,673 accounts at a 10.29% CTR (all).';
window.PM_TOP = {
  note: 'Ranked by Meta Results (conversations started or leads, the campaign objective), 15 May – 5 Nov 2026.',
  // Same order as the vnest project's items in data-media.js.
  reels: [
    { t: 'Distress deal, Arjan', r: '25 conversations' },
    { t: 'Jebel Ali Village townhouse', r: '16 conversations' },
    { t: 'For sale, 1-bed walkthrough', r: '14 conversations' },
    { t: 'District One, furnished 1-bed', r: '12 conversations' },
    { t: 'Ghaf Woods', r: '9 leads' }
  ]
};

// The bar at the top of every opened folder, in this order.
window.NAV = ['social-media', 'ai', 'graphics', 'illustrations', 'creative-direction', 'content-creation', 'design', 'video-editing', 'performance-marketing'];
window.NAV_LABELS = { 'social-media': 'Social Media Management', 'performance-marketing': 'Performance Marketing' };

// Subsections inside a folder's page (name shown -> project).
window.SUBSECTIONS = {
  'creative-direction': [{ name: 'KSHITIJ JALORI', project: 'kj' }, { name: 'JAYPORE', project: 'jaypore' }, { name: 'DIVYAM MEHTA', project: 'dm' }],
  design: [{ name: 'DIVYAM MEHTA', deck: 'dm', project: 'dm' }, { name: 'JAYPORE', deck: 'jaypore', project: 'jaypore' }, { name: 'KSHITIJ JALORI', deck: 'kj', project: 'kj' }, { name: 'PRINT DESIGNING', deck: 'print', project: 'print' }],
  graphics: [{ name: '3D VISUALS', project: 'graphics' }, { name: 'LAYR’D', project: 'layrd' }, { name: 'PRINK', project: 'prink' }, { name: 'AURELIA', project: 'aurelia' }, { name: 'BEYOND YOU', project: 'beyond-you' }, { name: 'LIVERPOOL', project: 'liverpool' }, { name: 'MCAFFEINE', project: 'mcaffine' }]
};

// Creative Direction: each project's full page (from ~/Desktop/website/creative direction), shown edge to edge.
window.CD_LONG = {
  kj: { src: 'media/home/cd/kj.jpg', w: 1366, h: 4608,
    intro: 'A festive bridal-wear campaign, conceived with the PR team to move beyond product photography towards a more immersive, authentic portrait of the collection.' },
  jaypore: { src: 'media/home/cd/jaypore.jpg', w: 1366, h: 9216,
    intro: 'Creative direction for the shoots of my two SS26 menswear collections, shaping one cohesive visual narrative around traditional block printing.' },
  dm: { src: 'media/home/cd/dm.jpg', w: 1366, h: 6912,
    intro: 'Supporting the creative direction of the Autumn/Winter shoot during my internship, helping translate the brand’s identity and seasonal mood into one shoot concept.' }
};

// Graphics sub-folders with their own layout (the rest use the numbered scatter).
// carousel: a swipeable strip at the bottom; caption = a pattern whose (group) is taken from each file name.
window.GX_LAYOUT = {
  graphics: { layout: 'wide' },
  layrd: { layout: 'grid' },
  mcaffine: { layout: 'mc' },
  // Every page of the seven Easy Love packaging PDFs, in order (media/home/ds2/by-pk.js, tools/build_packaging.py).
  'beyond-you': { carousel: { bundle: 'by-pk', label: 'Packaging', title: 'Beyond You · Easy Love packaging', slides: [{"caption": "Gold Foil · Base Print File", "w": 1600, "h": 1512}, {"caption": "Gold Foil · Matt Gold Foil Print File", "w": 1600, "h": 1512}, {"caption": "Gold Foil + Emboss · Base Print File", "w": 1600, "h": 1512}, {"caption": "Gold Foil + Emboss · Matt Gold Foil Print File", "w": 1600, "h": 1512}, {"caption": "Gold Foil + Emboss · Emboss File", "w": 1600, "h": 1512}, {"caption": "Embossed Gold Foil · Base Print File", "w": 1600, "h": 1512}, {"caption": "Embossed Gold Foil · Matt Gold Foil + Emboss File", "w": 1600, "h": 1512}, {"caption": "Gold Foil + UV Print · Base Print File", "w": 1600, "h": 1512}, {"caption": "Gold Foil + UV Print · Matt Gold Foil Print File", "w": 1600, "h": 1512}, {"caption": "Gold Foil + UV Print · UV Print File", "w": 1600, "h": 1512}, {"caption": "Embossed UV Print · Base Print File", "w": 1600, "h": 1512}, {"caption": "Embossed UV Print · UV Print + Emboss File", "w": 1600, "h": 1512}, {"caption": "Colour Print + Emboss + UV Print · Base Print File", "w": 1600, "h": 1512}, {"caption": "Colour Print + Emboss + UV Print · UV Print + Emboss File", "w": 1600, "h": 1512}, {"caption": "Colour Print + Foiling + Emboss + UV Print · Base Print File", "w": 1600, "h": 1512}, {"caption": "Colour Print + Foiling + Emboss + UV Print · Matt Gold Foil Print File", "w": 1600, "h": 1512}, {"caption": "Colour Print + Foiling + Emboss + UV Print · UV Print + Emboss File", "w": 1600, "h": 1512}] } }
};

window.SOCIAL = [
  { name: 'KSHITIJ JALORI', project: 'kj' },
  { name: 'DIVYAM MEHTA', project: 'dm' },
  { name: 'MAYIN INDIA', project: 'mayin' },
  { name: 'VNEST DUBAI', project: 'vnest', img: 'media/home/social-vnest.jpg' }
];

// The song shown when someone clicks Spotify in the dock.
window.SPOTIFY = {
  title: 'Pink Plastic Kiss',
  artists: 'Abhinsane, Arpit Bala, Sihie, Bhappa',
  cover: 'media/home/spotify-cover.jpg',
  url: 'https://open.spotify.com/track/7kkH9nf5X5tqglUJClUIgd?si=310ff1d78ae6465c'
};

// Little jokes. Keep it light.
window.JOKES = {
  trash: { title: 'Bin', body: 'It’s empty. Every idea gets used eventually, even the ones that started as “just a thought”.', button: 'Fair enough' },
  claude: { title: 'Claude', body: 'This desktop was put together with Claude. The ideas, the edits and the 2am decisions are all Uditi’s.', button: 'Nice' },
  spotify: { title: 'Now playing', body: 'The playlist that got every edit on this desktop done. Ask me for it.', button: 'Turn it up' },
  focus: { title: 'Focus: Creative', body: 'Notifications silenced. Moodboard open. Playlist on repeat. Do not disturb (unless it’s a brief).', button: 'Shh, okay' },
  battery: { title: 'Battery', body: 'Running on coffee. 100% and climbing.', button: 'Nice' },
  help: { title: 'Why “Behind The Scenes”?', body: 'Because what makes a post great is everything that happened before it went live: the brief, the moodboard, the 14 drafts. This desktop is where that lives.', button: 'Got it' }
};

// Case-study text for the brands on the Performance Marketing page, laid out like a social media manager portfolio
// (numbered chapters: overview, objectives, role, strategy, content, results).
// Only facts from the resume, uditi.framer.website/kj and the project notes above.
// null = not supplied yet: the page shows a "to supply" note in its place.
window.SOCIAL_CASE = {
  kj: {
    client: 'Kshitij Jalori, Ajmer', role: 'Social Media Design', period: 'Sept – Dec 2025', platforms: 'Instagram, website',
    overview: 'I managed Kshitij Jalori’s social media presence, including the Journey of Flowers campaign: posts, a cohesive feed grid and Instagram stories aligned with the brand’s identity.',
    overviewTodo: 'One line about the brand itself (what it makes and who it is for).',
    objectives: ['Keep visuals consistent across digital and physical brand touchpoints.'],
    objectivesTodo: 'The campaign goals you were working towards (for example launch, awareness or sales).',
    tasks: [
      'Handled end-to-end social media operations, including grid planning and scheduling',
      'Managed photoshoots and post-production image editing',
      'Created Instagram stories for launches, campaigns and BTS content',
      'Managed client communication, approvals and coordination',
      'Updated and maintained website content in line with the brand identity',
      'Redesigned the brand’s logo and developed packaging bag designs'
    ],
    strategy: [
      'Designed cohesive feed grid layouts so the profile reads as one story',
      'Planned stories around three moments: launches, campaigns and behind the scenes'
    ],
    strategyTodo: null,
    results: null,
    resultsTodo: 'Results you can share: reach, followers gained, engagement, or the client’s feedback.'
  },
  dm: {
    client: 'Divyam Mehta', role: 'Design Intern', period: 'May – Jul 2024', platforms: 'Instagram, print',
    overview: 'Lookbooks, invitation postcards and Instagram posts for Divyam Mehta’s prêt and festive collections.',
    overviewTodo: 'One line about the brand itself (what it makes and who it is for).',
    objectives: null,
    objectivesTodo: 'What the brand needed from social media during your internship.',
    tasks: [
      'Designed Instagram posts',
      'Contributed to lookbooks for prêt and festive collections',
      'Designed invitation postcards aligned with the brand identity',
      'Worked on industry-focused design documentation',
      'Applied textile sensibility across print and digital assets'
    ],
    strategy: null,
    strategyTodo: 'How you approached the posts (themes, formats, posting rhythm).',
    results: null,
    resultsTodo: 'Results you can share: reach, engagement, or the brand’s feedback.'
  },
  mayin: {
    client: 'Mayin India', role: null, period: null, platforms: 'Instagram',
    roleTodo: 'Your title and the dates you worked with Mayin.',
    overview: 'The Instagram rollout for Mayin’s Gingham Chiffon saree drop.',
    overviewTodo: 'One line about the brand itself (what it makes and who it is for).',
    objectives: null,
    objectivesTodo: 'What the saree drop needed to achieve.',
    tasks: null,
    tasksTodo: 'What you were responsible for (for example content design, captions, scheduling, shoots).',
    strategy: [
      'Outfit-styling posts showing how to wear the saree',
      'A fabric story introducing the gingham chiffon',
      'Customer-review carousels for social proof'
    ],
    strategyTodo: null,
    results: null,
    resultsTodo: 'Results you can share: reach, engagement, sales from the drop, or feedback.'
  },
  vnest: {
    client: 'Veda Nest Real Estate Brokers, Dubai', role: 'Social Media Manager', period: 'From March 2026', platforms: 'Instagram, Facebook, Meta Ads',
    overview: 'Real-estate reels and social media content for Veda Nest and its founder, created, filmed and edited end to end, alongside the company’s paid campaigns.',
    overviewTodo: null,
    objectives: ['Generate buyer and tenant enquiries through paid social: 25 of 26 Meta campaigns ran on the Leads objective, optimised for WhatsApp conversations or instant-form leads; one Elora campaign ran on Awareness.'],
    objectivesTodo: 'Any other goals (for example building the founder’s profile or growing followers).',
    tasks: [
      'Created, filmed and edited real-estate reels and social content for the company and its founder',
      'Managed end-to-end social media operations, including content planning, posting and account management',
      'Executed paid advertising campaigns on Meta Ads'
    ],
    strategy: [
      'Reels led by the founder alongside property and project content',
      'One campaign per project or offer, among them Ghaf Woods, Orania, Sobha, Elora, District One and a distress deal',
      'Lead forms and messaging campaigns, so interested buyers could enquire without leaving Instagram or Facebook'
    ],
    strategyTodo: 'Anything else about the plan (content pillars, posting rhythm, audiences targeted).',
    // From Meta Ads Manager, "vnest" ad account, every campaign 15 May – 5 Nov 2026 (read 5 Nov 2026).
    stats: [
      { n: '59,158', l: 'Reach (Meta accounts)' },
      { n: '111,400', l: 'Impressions' },
      { n: '145', l: 'Messaging conversations started' },
      { n: '35', l: 'Leads' },
      { n: '663', l: 'Link clicks' },
      { n: '3.76%', l: 'CTR (all)' }
    ],
    statsNote: 'Meta Ads Manager, all 26 campaigns, 15 May – 5 November 2026. Reach counts Meta accounts; CTR (all) is clicks of any kind divided by impressions.',
    results: [
      'Sobha Sanctuary’s launch offer started the most conversations: 30, from 9,104 accounts reached',
      'Orania Price Drop started 27 conversations',
      'The Arjan distress-deal reel started 25 conversations at an 8.45% CTR (all), the highest of any conversation campaign',
      'Ghaf Woods had the widest reach, 13,673 accounts, and brought in 9 leads at a 10.29% CTR (all)',
      'Offer-led creative (launch offers, price drops, a distress deal) started the most conversations'
    ],
    resultsTodo: 'Whether to show ad spend and cost per lead. They are left out for now to keep the client’s budget private.'
  }
};

// Social Media > KSHITIJ JALORI, rebuilt from uditi.framer.website/kj (without its packaging section).
// Pictures and phone recordings are copies of the matching files in SOCIAL MEDIA/KJ.
window.KJ_PAGE = {
  text: ['While working at Kshitij Jalori, I managed the brand\u2019s social media presence,', 'including creating and executing content for posts, designing cohesive feed grid layouts,', 'and developing engaging Instagram stories aligned with brands identity'],
  logo: 'media/home/kjpage/logo.png',
  grid1: [{"src": "media/home/kjpage/kj-97623.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-79261.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-69625.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-55429.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-27122.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-74671.jpg", "w": 1272, "h": 1600}, {"src": "media/home/kjpage/kj-11703.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-1524.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-18163.jpg", "w": 1280, "h": 1600}],
  grid2: [{"src": "media/home/kjpage/kj-65809.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-42126.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-23007.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-82166.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-69229.jpg", "w": 1282, "h": 1600}, {"src": "media/home/kjpage/kj-11711.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-80297.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-34297.jpg", "w": 1280, "h": 1600}, {"src": "media/home/kjpage/kj-28594.jpg", "w": 1280, "h": 1600}],
  phones: [{"type": "video", "src": "media/home/kjpage/phone-1.mp4", "poster": "media/home/kjpage/phone-1.jpg", "w": 588, "h": 1280}, {"type": "video", "src": "media/home/kjpage/phone-2.mp4", "poster": "media/home/kjpage/phone-2.jpg", "w": 588, "h": 1280}]
};

// Social Media > DIVYAM MEHTA, laid out from Uditi's wireframe: carousel 1 + feed grid, the shoot slider,
// then videos 1 & 2 + carousel 2. Web copies of SOCIAL MEDIA/divyam mehta/{carousel 1, feed 1, shoot, carousel 2, vid 1, vid 2}.
window.DM_PAGE = {"carousel1":[{"type":"image","src":"media/home/dm/carousel1-1.jpg","thumb":"media/home/dm/carousel1-1.jpg","w":1080,"h":1080},{"type":"image","src":"media/home/dm/carousel1-2.jpg","thumb":"media/home/dm/carousel1-2.jpg","w":1080,"h":1080},{"type":"image","src":"media/home/dm/carousel1-3.jpg","thumb":"media/home/dm/carousel1-3.jpg","w":1080,"h":1080},{"type":"image","src":"media/home/dm/carousel1-4.jpg","thumb":"media/home/dm/carousel1-4.jpg","w":1080,"h":1080},{"type":"image","src":"media/home/dm/carousel1-5.jpg","thumb":"media/home/dm/carousel1-5.jpg","w":1080,"h":1080},{"type":"image","src":"media/home/dm/carousel1-6.jpg","thumb":"media/home/dm/carousel1-6.jpg","w":1080,"h":1080},{"type":"image","src":"media/home/dm/carousel1-7.jpg","thumb":"media/home/dm/carousel1-7.jpg","w":1080,"h":1080}],"feed":[{"type":"image","src":"media/home/dm/feed-1.jpg","thumb":"media/home/dm/feed-1.jpg","w":1260,"h":1575},{"type":"image","src":"media/home/dm/feed-2.jpg","thumb":"media/home/dm/feed-2.jpg","w":1080,"h":1080},{"type":"image","src":"media/home/dm/feed-3.jpg","thumb":"media/home/dm/feed-3.jpg","w":1080,"h":1080},{"type":"image","src":"media/home/dm/feed-4.jpg","thumb":"media/home/dm/feed-4.jpg","w":1440,"h":1800},{"type":"image","src":"media/home/dm/feed-5.jpg","thumb":"media/home/dm/feed-5.jpg","w":1260,"h":1575},{"type":"image","src":"media/home/dm/feed-6.jpg","thumb":"media/home/dm/feed-6.jpg","w":1440,"h":1800},{"type":"image","src":"media/home/dm/feed-7.jpg","thumb":"media/home/dm/feed-7.jpg","w":1080,"h":1080},{"type":"image","src":"media/home/dm/feed-8.jpg","thumb":"media/home/dm/feed-8.jpg","w":1080,"h":1080},{"type":"image","src":"media/home/dm/feed-9.jpg","thumb":"media/home/dm/feed-9.jpg","w":1440,"h":1017}],"shoot":[{"type":"image","src":"media/home/dm/shoot-1.jpg","thumb":"media/home/dm/shoot-1.jpg","w":3512,"h":6240},{"type":"image","src":"media/home/dm/shoot-2.jpg","thumb":"media/home/dm/shoot-2.jpg","w":1199,"h":1500},{"type":"image","src":"media/home/dm/shoot-3.jpg","thumb":"media/home/dm/shoot-3.jpg","w":1199,"h":1500},{"type":"image","src":"media/home/dm/shoot-4.jpg","thumb":"media/home/dm/shoot-4.jpg","w":1199,"h":1500},{"type":"image","src":"media/home/dm/shoot-5.jpg","thumb":"media/home/dm/shoot-5.jpg","w":1199,"h":1500},{"type":"image","src":"media/home/dm/shoot-6.jpg","thumb":"media/home/dm/shoot-6.jpg","w":1199,"h":1500},{"type":"image","src":"media/home/dm/shoot-7.jpg","thumb":"media/home/dm/shoot-7.jpg","w":1199,"h":1500},{"type":"image","src":"media/home/dm/shoot-8.jpg","thumb":"media/home/dm/shoot-8.jpg","w":1199,"h":1500},{"type":"image","src":"media/home/dm/shoot-9.jpg","thumb":"media/home/dm/shoot-9.jpg","w":1199,"h":1500},{"type":"image","src":"media/home/dm/shoot-10.jpg","thumb":"media/home/dm/shoot-10.jpg","w":1199,"h":1500},{"type":"image","src":"media/home/dm/shoot-11.jpg","thumb":"media/home/dm/shoot-11.jpg","w":1199,"h":1500},{"type":"image","src":"media/home/dm/shoot-12.jpg","thumb":"media/home/dm/shoot-12.jpg","w":1199,"h":1500},{"type":"image","src":"media/home/dm/shoot-13.jpg","thumb":"media/home/dm/shoot-13.jpg","w":1199,"h":1500}],"carousel2":[{"type":"video","src":"media/home/dm/carousel2-1.mp4","poster":"media/home/dm/carousel2-1.jpg","thumb":"media/home/dm/carousel2-1.jpg","w":716,"h":718},{"type":"image","src":"media/home/dm/carousel2-2.jpg","thumb":"media/home/dm/carousel2-2.jpg","w":1085,"h":1091},{"type":"image","src":"media/home/dm/carousel2-3.jpg","thumb":"media/home/dm/carousel2-3.jpg","w":1085,"h":1091},{"type":"image","src":"media/home/dm/carousel2-4.jpg","thumb":"media/home/dm/carousel2-4.jpg","w":1085,"h":1091},{"type":"image","src":"media/home/dm/carousel2-5.jpg","thumb":"media/home/dm/carousel2-5.jpg","w":1085,"h":1091},{"type":"image","src":"media/home/dm/carousel2-6.jpg","thumb":"media/home/dm/carousel2-6.jpg","w":1085,"h":1091},{"type":"image","src":"media/home/dm/carousel2-7.jpg","thumb":"media/home/dm/carousel2-7.jpg","w":1085,"h":1091}],"videos":[{"type":"video","src":"media/home/dm/vid-1.mp4","poster":"media/home/dm/vid-1.jpg","thumb":"media/home/dm/vid-1.jpg","w":716,"h":896},{"type":"video","src":"media/home/dm/vid-2.mp4","poster":"media/home/dm/vid-2.jpg","thumb":"media/home/dm/vid-2.jpg","w":720,"h":1280}]};

// Social Media > MAYIN INDIA: phone screens (posts from SOCIAL MEDIA/mayin/phone img, their solid backgrounds extended
// from 4:5 to 9:16), carousel 1 and 2, and the shoot. Image-58421.jpg is left out of the
// phones (patterned background) and IMG_0133.jpg is the same post as Image-18278.jpg.
window.MY_PAGE = {"phones":[{"type":"image","src":"media/home/my/phone-1.jpg","thumb":"media/home/my/phone-1.jpg","w":1080,"h":1920,"align":"centre"},{"type":"image","src":"media/home/my/phone-2.jpg","thumb":"media/home/my/phone-2.jpg","w":1080,"h":1920,"align":"centre"},{"type":"image","src":"media/home/my/phone-3.jpg","thumb":"media/home/my/phone-3.jpg","w":1206,"h":2144,"align":"centre"},{"type":"image","src":"media/home/my/phone-4.jpg","thumb":"media/home/my/phone-4.jpg","w":1206,"h":2144,"align":"centre"},{"type":"image","src":"media/home/my/phone-5.jpg","thumb":"media/home/my/phone-5.jpg","w":1080,"h":1920,"align":"centre"},{"type":"image","src":"media/home/my/phone-6.jpg","thumb":"media/home/my/phone-6.jpg","w":1080,"h":1920,"align":"centre"},{"type":"image","src":"media/home/my/phone-7.jpg","thumb":"media/home/my/phone-7.jpg","w":1080,"h":1920,"align":"centre"},{"type":"image","src":"media/home/my/phone-8.jpg","thumb":"media/home/my/phone-8.jpg","w":1080,"h":1920,"align":"centre"}],"carousel1":[{"type":"image","src":"media/home/my/carousel1-1.jpg","thumb":"media/home/my/carousel1-1.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/carousel1-2.jpg","thumb":"media/home/my/carousel1-2.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/carousel1-3.jpg","thumb":"media/home/my/carousel1-3.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/carousel1-4.jpg","thumb":"media/home/my/carousel1-4.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/carousel1-5.jpg","thumb":"media/home/my/carousel1-5.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/carousel1-6.jpg","thumb":"media/home/my/carousel1-6.jpg","w":1080,"h":1350}],"carousel2":[{"type":"image","src":"media/home/my/carousel2-1.jpg","thumb":"media/home/my/carousel2-1.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/carousel2-2.jpg","thumb":"media/home/my/carousel2-2.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/carousel2-3.jpg","thumb":"media/home/my/carousel2-3.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/carousel2-4.jpg","thumb":"media/home/my/carousel2-4.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/carousel2-5.jpg","thumb":"media/home/my/carousel2-5.jpg","w":1080,"h":1350}],"shoot":[{"type":"image","src":"media/home/my/shoot-1.jpg","thumb":"media/home/my/shoot-1.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/shoot-2.jpg","thumb":"media/home/my/shoot-2.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/shoot-3.jpg","thumb":"media/home/my/shoot-3.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/shoot-4.jpg","thumb":"media/home/my/shoot-4.jpg","w":1080,"h":1350},{"type":"image","src":"media/home/my/shoot-5.jpg","thumb":"media/home/my/shoot-5.jpg","w":1080,"h":1350}]};

// Social Media > VNEST DUBAI: the logo (lifted from a Vnest post, background removed) over six placards, one per
// category folder in SOCIAL MEDIA/vnest/SUB COVER/reels. Motion after SOCIAL MEDIA/vnest/COVER/COVER REFERENCE.mp4.
window.VN_PAGE = { logo: 'data:image/png;base64,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',
  cards: [{"title": "Educational", "project": "vn-educational", "src": "media/home/vn/educational.jpg", "from": "educational thumbnail.png", "pos": "50% 50%"}, {"title": "Events", "project": "vn-events", "src": "media/home/vn/events.jpg", "from": "reels/events/Video-84261.mp4", "pos": "50% 50%"}, {"title": "Fillers", "project": "vn-fillers", "src": "media/home/vn/fillers.jpg", "from": "reels/filler/Video-86789.mp4", "pos": "50% 50%"}, {"title": "Tours", "project": "vn-tours", "src": "media/home/vn/tours.jpg", "from": "tours thumbnail.png", "pos": "50% 50%"}, {"title": "Creatives", "bundle": "vn-cr", "src": "media/home/vn/creatives.jpg", "from": "reels/carousel 2/Image-81711.jpg", "pos": "0% 50%"}, {"title": "Campaign", "project": "vn-campaign", "bundle": "vn-cp", "src": "media/home/vn/campaign.jpg", "from": "campaign thumbnail.jpg", "pos": "50% 50%"}] };

// Design folders, each opened as a deck of spreads in the style of madelineweeden_ssspin.io (Downloads).
// Images only from ~/Desktop/website/DESIGNING; ones already published elsewhere point at those files.
// kind: 'photo' fills its frame, 'art' is shown whole. cover: which image sits on the cover (default 0).
window.DS_PAGE = {"kj": {"title": "Kshitij Jalori", "label": "Prints", "sub": "(print & pattern design)", "meta": [["[client]", "Kshitij Jalori, Ajmer"], ["[work]", "Prints and pattern", "with garment flats"], ["[format]", "8 design boards"]], "about": "Print and pattern designs for Kshitij Jalori, each shown with the garment silhouettes it was developed for.", "images": [{"src": "media/home/ds/kj-32.jpg", "w": 1600, "h": 900, "kind": "art"}, {"src": "media/home/ds/kj-33.jpg", "w": 1600, "h": 900, "kind": "art"}, {"src": "media/home/ds/kj-34.jpg", "w": 1600, "h": 900, "kind": "art"}, {"src": "media/home/ds/kj-35.jpg", "w": 1600, "h": 900, "kind": "art"}, {"src": "media/home/ds/kj-36.jpg", "w": 1600, "h": 900, "kind": "art"}, {"src": "media/home/ds/kj-37.jpg", "w": 1600, "h": 900, "kind": "art"}, {"src": "media/home/ds/kj-38.jpg", "w": 1600, "h": 900, "kind": "art"}, {"src": "media/home/ds/kj-39.jpg", "w": 1600, "h": 900, "kind": "art"}]}, "jaypore": {"title": "Jaypore", "label": "SS26", "sub": "(graduation project, Jaypore — ABFRL)", "meta": [["[client]", "Jaypore — ABFRL"], ["[project]", "Two menswear", "collections for SS26"], ["[when]", "Jan – Apr 2025"]], "about": "A four-month graduation project at Jaypore ABFRL: two menswear collections for SS26 exploring traditional block printing. I also worked on the shoot and the photo editing.", "cover": 1, "images": [{"src": "media/jaypore/7ba2292c8a.jpg", "w": 853, "h": 1280, "kind": "photo"}, {"src": "media/home/ds/jp-1.jpg", "w": 1131, "h": 1600, "kind": "art"}, {"src": "media/home/ds/jp-2.jpg", "w": 1131, "h": 1600, "kind": "art"}, {"src": "media/home/ds/jp-3.jpg", "w": 1131, "h": 1600, "kind": "art"}, {"src": "media/home/ds/jp-4.jpg", "w": 1131, "h": 1600, "kind": "art"}, {"src": "media/home/ds/jp-5.jpg", "w": 1131, "h": 1600, "kind": "art"}, {"src": "media/home/ds/jp-photo-2.jpg", "w": 824, "h": 1183, "kind": "photo"}, {"src": "media/home/ds/jp-photo-3.jpg", "w": 1280, "h": 853, "kind": "photo"}, {"src": "media/home/ds/jp-6.jpg", "w": 1131, "h": 1600, "kind": "art"}, {"src": "media/home/ds/jp-7.jpg", "w": 1131, "h": 1600, "kind": "art"}, {"src": "media/home/ds/jp-8.jpg", "w": 1131, "h": 1600, "kind": "art"}, {"src": "media/home/ds/jp-9.jpg", "w": 1131, "h": 1600, "kind": "art"}, {"src": "media/jaypore/545e6fb89d.jpg", "w": 1067, "h": 1600, "kind": "photo"}, {"src": "media/home/ds/jp-photo-5.jpg", "w": 1067, "h": 1600, "kind": "photo"}]}, "dm": {"title": "Divyam Mehta", "label": "Lookbook", "sub": "(design internship)", "meta": [["[client]", "Divyam Mehta"], ["[role]", "Design intern"], ["[when]", "May – Jul 2024"]], "about": "Lookbooks for the prêt and festive collections, design documentation, invitation postcards and Instagram posts, bringing a textile sensibility to print and digital.", "cover": 5, "images": [{"src": "media/print/d5ff8b4a73.jpg", "w": 1600, "h": 1131, "kind": "art"}, {"src": "media/print/018b46b38f.jpg", "w": 1080, "h": 1350, "kind": "photo"}, {"src": "media/print/ed1cd43866.jpg", "w": 1080, "h": 1350, "kind": "photo"}, {"src": "media/print/a1bc8c37eb.jpg", "w": 1080, "h": 1350, "kind": "photo"}, {"src": "media/print/6562c015f2.jpg", "w": 1600, "h": 1131, "kind": "art"}, {"src": "media/print/3edf10b496.jpg", "w": 1600, "h": 1131, "kind": "art"}, {"src": "media/print/f122a21d8f.jpg", "w": 1080, "h": 1350, "kind": "photo"}, {"src": "media/dm/ab6516619e.jpg", "w": 1080, "h": 1350, "kind": "photo"}, {"src": "media/print/dcaebb661b.jpg", "w": 1080, "h": 1350, "kind": "photo"}, {"src": "media/print/9538fd5f24.jpg", "w": 1600, "h": 1131, "kind": "art"}, {"src": "media/dm/ee094f9bdf.jpg", "w": 1600, "h": 1131, "kind": "art"}, {"src": "media/print/d410ed0bc9.jpg", "w": 1080, "h": 1350, "kind": "photo"}, {"src": "media/dm/04bdd33a7d.jpg", "w": 1080, "h": 1349, "kind": "photo"}, {"src": "media/print/f1edc5f662.jpg", "w": 1080, "h": 1349, "kind": "photo"}]}, "print": {"title": "Print Designing", "label": "Prints", "sub": "(print & surface pattern design)", "meta": [["[work]", "Prints for home", "& apparel products"], ["[themes]", "Chintz, abstract, florals,", "Japanese textiles"], ["[format]", "10 design boards"]], "about": "Surface prints for home and apparel products: chintz, abstract, cozy living, florals, climate change and Japanese textiles, each shown with its colour palette and the product it was developed for.", "images": [{"src": "media/home/ds/pr-cover.jpg", "w": 1100, "h": 619, "kind": "art"}, {"c": "pr-a", "i": 1, "w": 1920, "h": 1080, "kind": "art"}, {"c": "pr-a", "i": 2, "w": 1920, "h": 1080, "kind": "art"}, {"c": "pr-a", "i": 3, "w": 1920, "h": 1080, "kind": "art"}, {"c": "pr-a", "i": 4, "w": 1920, "h": 1080, "kind": "art"}, {"c": "pr-a", "i": 5, "w": 1920, "h": 1080, "kind": "art"}, {"c": "pr-a", "i": 6, "w": 1920, "h": 1080, "kind": "art"}, {"c": "pr-a", "i": 7, "w": 1920, "h": 1080, "kind": "art"}, {"c": "pr-a", "i": 8, "w": 1920, "h": 1080, "kind": "art"}, {"c": "pr-a", "i": 9, "w": 1920, "h": 1080, "kind": "art"}]}};

// Design > DIVYAM MEHTA and JAYPORE as long scrolling pages (openLong). {c, i} images live in the bundles under
// media/home/ds2 (built from ~/Desktop/website/DESIGNING), loaded when the page opens.
window.DS_LONG = {"print": {"title": "Print Designing", "stack": {"c": "pr-a", "i": 0, "n": 10, "w": 1920, "h": 1080}}, "dm": {"title": "Divyam Mehta", "stack": {"c": "dm-a", "i": 0, "n": 5, "w": 2000, "h": 1414}, "gallery": [{"src": "media/print/ed1cd43866.jpg", "w": 880, "h": 1100}, {"src": "media/print/a1bc8c37eb.jpg", "w": 880, "h": 1100}, {"src": "media/print/f122a21d8f.jpg", "w": 880, "h": 1100}, {"src": "media/print/ab6516619e.jpg", "w": 880, "h": 1100}, {"src": "media/print/018b46b38f.jpg", "w": 880, "h": 1100}, {"src": "media/print/dcaebb661b.jpg", "w": 880, "h": 1100}, {"src": "media/print/d410ed0bc9.jpg", "w": 880, "h": 1100}, {"src": "media/print/04bdd33a7d.jpg", "w": 881, "h": 1100}, {"src": "media/print/f1edc5f662.jpg", "w": 881, "h": 1100}], "nav": true, "book": {"chunks": [["dm-f", 51]], "w": 1400, "h": 991, "split": true}}, "jaypore": {"title": "Jaypore", "stack": {"c": "jp-a", "i": 0, "n": 13, "w": 2000, "h": 1414}, "gallery": [{"src": "media/jaypore/7ba2292c8a.jpg", "w": 733, "h": 1100}, {"src": "media/home/ds/jp-photo-3.jpg", "w": 1280, "h": 853}, {"src": "media/home/ds/jp-photo-2.jpg", "w": 824, "h": 1183}, {"c": "jp-a", "i": 13, "w": 1600, "h": 1067}, {"c": "jp-a", "i": 14, "w": 1600, "h": 1067}, {"c": "jp-a", "i": 15, "w": 1600, "h": 1067}, {"src": "media/home/ds/jp-photo-5.jpg", "w": 1067, "h": 1600}], "brochure": {"c": "jp-a", "w": 2400, "h": 1697, "sheets": [["Shilprekh", 16, 17], ["Rangnama", 18, 19]]}, "prints": [{"src": "media/home/ds/jp-1.jpg", "w": 1131, "h": 1600}, {"src": "media/home/ds/jp-2.jpg", "w": 1131, "h": 1600}, {"src": "media/home/ds/jp-3.jpg", "w": 1131, "h": 1600}, {"src": "media/home/ds/jp-4.jpg", "w": 1131, "h": 1600}, {"src": "media/home/ds/jp-5.jpg", "w": 1131, "h": 1600}, {"src": "media/home/ds/jp-6.jpg", "w": 1131, "h": 1600}, {"src": "media/home/ds/jp-7.jpg", "w": 1131, "h": 1600}, {"src": "media/home/ds/jp-8.jpg", "w": 1131, "h": 1600}, {"src": "media/home/ds/jp-9.jpg", "w": 1131, "h": 1600}], "book": {"chunks": [["jp-f1", 74], ["jp-f2", 74], ["jp-f3", 73]], "w": 900, "h": 1275}}};

// Design > KSHITIJ JALORI as a run of full-width slides after the Behance "IN BLOOM" project (openBloom). Boards are the
// published kj-32..39 files; the print crops and mood board come from the kj-b bundle (~/Desktop/website/DESIGNING/kj).
window.DS_BLOOM = {"kj": {"title": "Kshitij Jalori", "kicker": "A print & pattern collection", "about": "Print and pattern designs for Kshitij Jalori, each shown with the garment silhouettes it was developed for.", "mood": [{"c": "kj-b", "i": 8, "w": 600, "h": 692}, {"c": "kj-b", "i": 9, "w": 600, "h": 722}, {"c": "kj-b", "i": 10, "w": 600, "h": 749}, {"c": "kj-b", "i": 11, "w": 600, "h": 1065}, {"c": "kj-b", "i": 12, "w": 600, "h": 600}, {"c": "kj-b", "i": 13, "w": 500, "h": 667}, {"c": "kj-b", "i": 14, "w": 600, "h": 750}, {"c": "kj-b", "i": 15, "w": 600, "h": 600}], "moodNote": "Mood board · paintings by Natashia Bevilacqua", "boards": [{"src": "media/home/ds/kj-32.jpg", "w": 1600, "h": 900, "crop": {"c": "kj-b", "i": 0, "w": 720, "h": 900}}, {"src": "media/home/ds/kj-33.jpg", "w": 1600, "h": 900, "crop": {"c": "kj-b", "i": 1, "w": 720, "h": 900}}, {"src": "media/home/ds/kj-34.jpg", "w": 1600, "h": 900, "crop": {"c": "kj-b", "i": 2, "w": 720, "h": 900}}, {"src": "media/home/ds/kj-35.jpg", "w": 1600, "h": 900, "crop": {"c": "kj-b", "i": 3, "w": 720, "h": 900}}, {"src": "media/home/ds/kj-36.jpg", "w": 1600, "h": 900, "crop": {"c": "kj-b", "i": 4, "w": 720, "h": 900}}, {"src": "media/home/ds/kj-37.jpg", "w": 1600, "h": 900, "crop": {"c": "kj-b", "i": 5, "w": 720, "h": 900}}, {"src": "media/home/ds/kj-38.jpg", "w": 1600, "h": 900, "crop": {"c": "kj-b", "i": 6, "w": 720, "h": 900}}, {"src": "media/home/ds/kj-39.jpg", "w": 1600, "h": 900, "crop": {"c": "kj-b", "i": 7, "w": 720, "h": 900}}]}};
