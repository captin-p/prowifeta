const ALL_EVENTS_FILTER = "All events";

const EDWENASE_GALLERY = Array.from({ length: 23 }, (_, index) => ({
  src: `/img/events/edwenase-edit/edwenase-edit-${String(index + 1).padStart(2, "0")}.jpg`,
  alt: `Edwenase event photo ${index + 1}`,
}));

const buildSlideGallery = (numbers, altPrefix) =>
  numbers.map((number, index) => ({
    src: `/img/slides/d${number}.jpg`,
    alt: `${altPrefix} ${index + 1}`,
  }));

const buildEventGallery = (folder, alts) =>
  alts.map((alt, index) => ({
    src: `/img/events/${folder}/${folder}-${String(index + 1).padStart(2, "0")}.jpeg`,
    alt,
  }));

const AGENDA_WEAR_MEDIA_LAUNCH_GALLERY = buildEventGallery("agenda-wear-media-launch", [
  "Steering committee members at the Agenda Wear Ghana media launch.",
  "A speaking moment during the Agenda Wear Ghana media launch.",
  "ProWIFETA representation during the Agenda Wear Ghana media launch.",
  "Stakeholders gathered for the Agenda Wear Ghana media launch.",
  "A campaign platform moment during the Agenda Wear Ghana media launch.",
  "A speaking moment for ProWIFETA during the Agenda Wear Ghana media launch.",
]);

const AGENDA_WEAR_OFFICIAL_LAUNCH_GALLERY = buildEventGallery("agenda-wear-official-launch", [
  "A speaking moment during the official launch of the Agenda Wear Ghana Campaign.",
  "A podium moment during the official launch of the Agenda Wear Ghana Campaign.",
  "A close-up speaking moment during the official launch of the Agenda Wear Ghana Campaign.",
]);

const KUMASI_ART_EXPERIENCE_GALLERY = buildEventGallery("kumasi-art-experience-2026", [
  "A discussion moment during the Kumasi Art Experience programme at KNUST.",
  "Participants engaged during the Kumasi Art Experience programme at KNUST.",
  "Audience interaction during the Kumasi Art Experience programme at KNUST.",
  "Guests gathered for the Kumasi Art Experience programme at KNUST.",
  "A session moment during the British Council-supported programme at KNUST.",
  "Audience members attending the Kumasi Art Experience programme at KNUST.",
]);

export const EVENT_POSTS = [
  {
    id: "agenda-wear-ghana-campaign-official-launch",
    category: "Campaign & Advocacy",
    title: "Official Launch of the Agenda Wear Ghana Campaign",
    dateTime: "2026-03-23",
    displayDate: "March 23, 2026",
    location: "Agenda Wear Ghana Campaign launch",
    coverImage: AGENDA_WEAR_OFFICIAL_LAUNCH_GALLERY[0].src,
    excerpt:
      "ProWIFETA joined the official launch as a steering committee member helping shape stronger fashion education, enterprise growth, and industry visibility in Ghana.",
    lead:
      "The official launch of the Agenda Wear Ghana Campaign marked a major step toward coordinated action across Ghana's fashion ecosystem, with ProWIFETA contributing to both the campaign vision and its public momentum.",
    details: [
      "The campaign was launched in collaboration with the Asante Fashion Industry Network and brought together stakeholders committed to innovation, sustainability, and strategic industry partnerships.",
      "As part of the steering committee, ProWIFETA contributed to the development of key objectives and implementation strategies designed to strengthen fashion education, enterprise growth, and industry visibility.",
      "During the launch event, the CEO of ProWIFETA delivered a supporting address that emphasized collaborative action, professional development, and stronger alignment between education and industry as essential to positioning Ghanaian fashion on wider platforms.",
    ],
    highlights: [
      "Steering committee leadership within the Agenda Wear Ghana Campaign.",
      "A supporting address from the CEO of ProWIFETA during the official launch.",
      "Clear focus on innovation, sustainability, and stronger industry partnerships.",
    ],
    gallery: AGENDA_WEAR_OFFICIAL_LAUNCH_GALLERY,
  },
  {
    id: "agenda-wear-ghana-media-launch",
    category: "Campaign & Advocacy",
    title: "Media Launch of the Agenda Wear Ghana Campaign",
    dateTime: "2026-03-19",
    displayDate: "March 19, 2026",
    location: "Collaboration with the Asante Fashion Industry Network",
    coverImage: AGENDA_WEAR_MEDIA_LAUNCH_GALLERY[0].src,
    excerpt:
      "ProWIFETA joined the media launch of the Agenda Wear Ghana Campaign as part of the steering committee advocating for locally made fashion and industry visibility.",
    lead:
      "At the media launch of the Agenda Wear Ghana Campaign, ProWIFETA joined key fashion and creative industry stakeholders to amplify advocacy for locally made fashion and support the next phase of policy and industry dialogue.",
    details: [
      "The launch created a platform for stakeholders to speak with a more unified voice about promoting Ghana-made fashion and strengthening public awareness around the sector.",
      "ProWIFETA's presence on the steering committee reflected its active role in shaping campaign direction and contributing to collaborative industry planning.",
      "The engagement reinforced the association's commitment to sustainable fashion development, sector visibility, and stronger advocacy partnerships within Ghana's creative economy.",
    ],
    highlights: [
      "Advocacy for locally made fashion through a national campaign platform.",
      "Steering committee representation from ProWIFETA.",
      "Stronger policy dialogue and industry visibility for Ghana's fashion sector.",
    ],
    gallery: AGENDA_WEAR_MEDIA_LAUNCH_GALLERY,
  },
  {
    id: "kumasi-art-experience-panel",
    category: "Thought Leadership",
    title: "Kumasi Art Experience Panel Representation",
    dateTime: "2026-03-19",
    displayDate: "March 19, 2026",
    location: "Kwame Nkrumah University of Science and Technology",
    coverImage: KUMASI_ART_EXPERIENCE_GALLERY[5].src,
    excerpt:
      "The Founder of ProWIFETA represented the association at the Kumasi Art Experience as a panelist discussing creative industry development, fashion, and education.",
    lead:
      "ProWIFETA's participation in the Kumasi Art Experience placed the association inside an important creative industry conversation linking artistic expression, fashion education, and Ghana's wider cultural economy.",
    details: [
      "Held at KNUST under a creative industry initiative supported by the British Council, the programme created space for artists, educators, and industry voices to exchange ideas.",
      "The Founder of ProWIFETA joined a panel discussion that explored creative industry development, artistic expression, and the role of fashion and education in shaping Ghana's creative future.",
      "The engagement strengthened ProWIFETA's position in thought leadership and showed its continued willingness to contribute to national and international creative arts dialogue.",
    ],
    highlights: [
      "Panel participation at a British Council-supported creative industry programme.",
      "Discussion on fashion, education, and Ghana's creative economy.",
      "Visible thought leadership from ProWIFETA within the arts and culture space.",
    ],
    gallery: KUMASI_ART_EXPERIENCE_GALLERY,
  },
  {
    id: "pqi-apprenticeship-graduation-programme",
    category: "Skills & Graduation",
    title: "PQI Apprenticeship Graduation Programme",
    dateTime: "2026-02-11",
    displayDate: "February 11, 2026",
    location: "PQI apprenticeship graduation programme",
    coverImage: "/img/slides/d213.jpg",
    excerpt:
      "ProWIFETA took part in the PQI apprenticeship graduation programme celebrating dedication, technical competence, and creative growth among vocational trainees.",
    lead:
      "The PQI apprenticeship graduation programme highlighted the value of structured skills development and the role of partnership-driven training in building stronger futures for young people.",
    details: [
      "On February 11, 2026, ProWIFETA joined the programme sponsored by the Mastercard Foundation in collaboration with partner organisations including GTI and Accents Art.",
      "The event recognised apprentices across several vocational areas, including fashion design, with awards that acknowledged dedication, technical competence, and creative growth.",
      "The programme also reinforced the importance of industry partnerships in supporting youth empowerment, practical learning, and sustainable pathways into work and enterprise.",
    ],
    highlights: [
      "Participation in a Mastercard Foundation-supported graduation programme.",
      "Recognition of apprentices' technical competence and creative growth.",
      "Strong emphasis on partnership-led youth empowerment and skills development.",
    ],
    gallery: buildSlideGallery([213, 214, 215], "PQI apprenticeship graduation moment"),
  },
  {
    id: "edwenase-rehabilitation-center-outreach",
    category: "Outreach & Mentorship",
    title: "Edwenase Rehabilitation Center Empowerment Outreach",
    dateTime: "2025-11-26",
    displayDate: "November 26, 2025",
    location: "Edwenase Rehabilitation Center",
    coverImage: EDWENASE_GALLERY[0].src,
    excerpt:
      "ProWIFETA visited the Edwenase Rehabilitation Center with practical sessions in fashion and cosmetology aimed at building confidence, vocational ability, and reintegration support.",
    lead:
      "On November 26, 2025, ProWIFETA carried its empowerment outreach programme to the Edwenase Rehabilitation Center, using hands-on vocational engagement to encourage confidence, skills growth, and social reintegration.",
    details: [
      "The team worked with students through practical sessions in fashion and cosmetology, creating a supportive setting for learning by doing.",
      "These sessions were designed not only to build technical ability, but also to strengthen confidence and help participants see new possibilities for personal and professional development.",
      "The outreach reflected ProWIFETA's belief that creative and technical training can be a powerful tool for empowerment, transition, and long-term reintegration.",
    ],
    highlights: [
      "Practical skill development in fashion and cosmetology.",
      "Focus on confidence building and vocational growth.",
      "Support for social reintegration through creative and technical training.",
    ],
    gallery: EDWENASE_GALLERY,
  },
  {
    id: "st-louis-college-keynote-engagement",
    category: "Thought Leadership",
    title: "Keynote Engagement at St. Louis College of Education",
    dateTime: "2025-08",
    displayDate: "August 2025",
    location: "St. Louis College of Education",
    coverImage: "/img/slides/d150.jpg",
    excerpt:
      "The CEO of ProWIFETA delivered a keynote under the Vocational Education and Training programme, inspiring students around fashion education, skills growth, and career progression.",
    lead:
      "An invitation to deliver a keynote address at St. Louis College of Education reflected ProWIFETA's growing influence in empowering young talents through fashion education and knowledge-sharing.",
    details: [
      "The engagement took place under the institution's Vocational Education and Training programme and created an opportunity to mentor students at an important stage of their development.",
      "The keynote focused on pathways in fashion education, practical skills development, and career progression, helping students connect their present studies to future opportunities.",
      "The invitation itself signaled ProWIFETA's expanding impact and the value that partners place on the association's voice in education, empowerment, and professional guidance.",
    ],
    highlights: [
      "Keynote delivery under a Vocational Education and Training programme.",
      "Mentorship on fashion education, skills development, and career growth.",
      "Recognition of ProWIFETA's growing impact through strategic partnerships.",
    ],
    gallery: buildSlideGallery([150, 151, 152], "St. Louis College of Education keynote moment"),
  },
  {
    id: "kstu-alumni-homecoming-fashion-expression-2025",
    category: "Industry Engagement",
    title: "KsTU Alumni Homecoming - Fashion Expression 2025",
    dateTime: "2025-08",
    displayDate: "August 2025",
    location: "Kumasi Technical University",
    coverImage: "/img/slides/d153.jpg",
    excerpt:
      "ProWIFETA members joined KsTU Alumni Homecoming - Fashion Expression 2025 to share professional journeys, industry insight, and practical guidance with students and emerging designers.",
    lead:
      "Participation in KsTU Alumni Homecoming - Fashion Expression 2025 allowed ProWIFETA members to connect classroom preparation with industry realities through direct engagement with students and young designers.",
    details: [
      "The team contributed to a panel discussion on 'Alumni Journey in the Fashion Industry,' bringing real professional experiences into the conversation.",
      "Students and emerging designers benefited from practical guidance, reflections on industry pathways, and advice shaped by working experience in the fashion sector.",
      "The engagement reinforced ProWIFETA's commitment to mentorship, industry collaboration, and bridging the gap between fashion education and professional practice.",
    ],
    highlights: [
      "Panel contribution on alumni journeys in the fashion industry.",
      "Professional guidance for students and emerging designers.",
      "Stronger links between education, mentorship, and industry practice.",
    ],
    gallery: buildSlideGallery([153, 154, 155], "KsTU Fashion Expression event moment"),
  },
  {
    id: "usted-food-bazaar-and-fashion-show",
    category: "Skills & Graduation",
    title: "USTED Food Bazaar and Fashion Show",
    dateTime: "2025-08",
    displayDate: "August 2025",
    location: "University of Skill Development and Training (USTED)",
    coverImage: "/img/slides/d156.jpg",
    excerpt:
      "Under the leadership of its Founder, ProWIFETA organised a Food Bazaar and Fashion Show that gave diploma students a practical platform to present creativity, entrepreneurship, and applied fashion skills.",
    lead:
      "The Food Bazaar and Fashion Show organised at USTED turned student assessment into a public-facing learning experience that celebrated creativity, entrepreneurship, and applied design practice.",
    details: [
      "The event formed part of the end-of-programme project for diploma students and created a practical setting for them to demonstrate what they had developed through their training.",
      "The Food Bazaar offered an interactive cultural and economic experience, while the Fashion Show highlighted innovative student collections created during the programme.",
      "By linking academic assessment with real audience engagement, the initiative strengthened ProWIFETA's commitment to experiential learning and better industry exposure for emerging fashion professionals.",
    ],
    highlights: [
      "End-of-programme platform for diploma students at USTED.",
      "A combined cultural, entrepreneurial, and fashion presentation experience.",
      "Experiential learning that connected classroom work with public engagement.",
    ],
    gallery: buildSlideGallery([156, 157, 158], "USTED Food Bazaar and Fashion Show moment"),
  },
  {
    id: "fashion-show-awards-support-across-ghana",
    category: "Recognition & Awards",
    title: "Awards Support for Tertiary Fashion Shows",
    displayDate: "2025 academic year",
    location: "Technical and traditional universities across Ghana",
    coverImage: "/img/slides/d159.jpg",
    excerpt:
      "Throughout the 2025 academic year, ProWIFETA presented awards at tertiary fashion shows to recognise creativity, technical skill, innovation, and craftsmanship.",
    lead:
      "Across the 2025 academic year, ProWIFETA used awards presentation as a way to encourage excellence, motivate emerging designers, and strengthen connections between academia and industry.",
    details: [
      "The association supported fashion shows organised by both technical and traditional universities, making its presence felt across a wider education landscape.",
      "Awards were presented to outstanding fashion design students in recognition of creativity, technical skills, innovation, and craftsmanship.",
      "The initiative encouraged higher standards of professionalism within tertiary fashion education while also reinforcing meaningful collaboration between educators, institutions, and the industry.",
    ],
    highlights: [
      "Awards presented across university fashion shows in Ghana.",
      "Recognition for creativity, technical skill, innovation, and craftsmanship.",
      "Encouragement for stronger industry-academia collaboration and professionalism.",
    ],
    gallery: buildSlideGallery([159, 160, 161], "Tertiary fashion awards presentation moment"),
  },
  {
    id: "school-empowerment-outreach-waec-preparation",
    category: "Outreach & Mentorship",
    title: "School Empowerment Outreach for WAEC Preparation",
    displayDate: "2025 outreach programme",
    location: "Yaa Asantewaa Girls' Senior High School and J.A. Kufuor Senior High School",
    coverImage: "/img/slides/d162.jpg",
    excerpt:
      "Clothing and Textiles students received targeted guidance on WAEC preparation, performance improvement, career awareness, and selecting suitable tertiary pathways.",
    lead:
      "During visits to Yaa Asantewaa Girls' Senior High School and J.A. Kufuor Senior High School, ProWIFETA supported Clothing and Textiles students with academic direction and practical career guidance.",
    details: [
      "Students received targeted support on effective WAEC examination preparation together with practical tips to strengthen performance in Clothing and Textiles.",
      "The sessions also focused on career awareness, helping students understand fashion and textiles-related opportunities beyond secondary school.",
      "Guidance on choosing suitable tertiary institutions and academic pathways gave students clearer direction for their future progression.",
    ],
    highlights: [
      "Targeted WAEC preparation guidance for Clothing and Textiles students.",
      "Career awareness around fashion and textiles-related opportunities.",
      "Support for choosing suitable tertiary institutions and academic pathways.",
    ],
    gallery: buildSlideGallery([162, 163, 164], "School empowerment outreach moment"),
  },
];

export const ARCHIVE_FILTERS = [
  ALL_EVENTS_FILTER,
  ...new Set(EVENT_POSTS.map((post) => post.category)),
];

export { ALL_EVENTS_FILTER };

export const getEventPostPath = (postOrId) =>
  `/blog/${typeof postOrId === "string" ? postOrId : postOrId.id}`;

export const getEventPostById = (postId) =>
  EVENT_POSTS.find((post) => post.id === postId);
