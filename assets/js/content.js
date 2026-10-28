/* ============================================================
   SPIRITWIND FELLOWSHIP CHURCH — SITE CONTENT
   This is the only file most editors need to touch.
   SITE CONTENT — edit here; the page renders from this object.
   status: "verified" = taken from the church's Facebook page.
           null / "todo" = placeholder awaiting the church admin.
   ============================================================ */
const SITE = {
  name: "Spiritwind Fellowship Church",
  short: "SFC",
  tagline: "Loving God. Loving People.",            // verified (Facebook intro)
  motto: "One faith. One family. All for Jesus.",   // verified (Facebook post)
  followers: "3.3K",                                // Facebook, Oct 2026
  address: "4th Floor CMS Building, National Highway, 8100", // verified
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=CMS+Building+National+Highway+8100",
  email: "spiritwindfellowshipchurch@gmail.com",    // verified
  phone: null,                                      // TODO: not published
  social: {
    facebook: "https://www.facebook.com/spiritwindfellowshipchurch",
    instagram: "https://www.instagram.com/spiritwindfc",
    tiktok: "https://www.tiktok.com/@spiritwindfc",
    youtube: "https://www.youtube.com/@SpiritwindFellowshipChurch"   // name verified; confirm exact URL
  },
  services: [
    { day: 0, time: "9:00", ampm: "AM", name: "Sunday Celebration", note: "SFC Worship Hub · worship, Word and fellowship", status: "verified" }
    // add more: { day: 3, time: "7:00", ampm: "PM", name: "Midweek Bible Study", note: "...", status: "verified" }
  ],
  pillars: [
    { key:"vision", title:"Our Vision", big:"Loving God. Loving People.", text:"The heart of SFC in four words, as the church describes itself.", status:"verified",
      full:["<p>“Loving God. Loving People.” is how Spiritwind Fellowship Church introduces itself. Everything we do flows from these two great commandments.</p>","<p><em>Thou shalt love the Lord thy God with all thy heart… Thou shalt love thy neighbour as thyself.</em> (Matthew 22:37, 39, KJV)</p>"] },
    { key:"mission", title:"Our Mission", big:null, text:"The church's mission statement will appear here once it is provided.", status:"todo",
      full:["<p>Spiritwind Fellowship Church has not published a mission statement on its Facebook page yet.</p><p><b>For the church admin:</b> add your approved mission statement in the <code>SITE.pillars</code> entry for “mission”.</p>"] },
    { key:"beliefs", title:"What We Believe", big:null, text:"A statement of faith will appear here once the church shares it.", status:"todo",
      full:["<p>We're a Christian church centered on Jesus Christ. The church's full statement of faith hasn't been published online yet.</p><p><b>For the church admin:</b> list your core beliefs (Scripture, God, Jesus, the Holy Spirit, salvation, the church) in the “beliefs” entry.</p>"] }
  ],
  // School of Bereans (SOB) — the church's discipleship school, named after Acts 17:11.
  // Verified from the church's "SOB Graduation" Facebook album (April 2026).
  bereans: {
    intro: "The School of Bereans is SFC's school for growing deep in God's Word. Like the believers in Berea, students receive the Word with eagerness and search the Scriptures daily, growing level by level into mature, discerning followers of Jesus.",
    verse: { t: "These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so.", r: "Acts 17:11 · KJV" },
    theme: "Bereans Anchored in the Word, Crowned with Wisdom, Called to Impact Generations",
    milestone: { title: "1st Graduation Rites & Awards Ceremony", date: "April 26, 2026" },
    latest: { title: "3rd Recognition & Moving-Up Ceremony", date: "September 6, 2026" },   // verified: "SOB Moving Up Ceremony" album
    hashtag: "#BastaBereanKugihan",
    // The five levels, in order. Logos are in assets/img/sob-level-*.webp.
    // Add a short description to each when ready (text: "...").
    levels: [
      { name: "Lamb",  logo: "sobLamb", text: null },
      { name: "Sheep", logo: "sobSheep", text: null },
      { name: "Dove",  logo: "sobDove", text: null },
      { name: "Eagle", logo: "sobEagle", text: null },
      { name: "Lion",  logo: "sobLion", text: null }
    ],
    schedule: null,   // TODO: class day/time, e.g. "Saturdays, 2:00 PM"
    enroll: null      // TODO: how to enroll or a sign-up link
  },
  ministries: [
    { name:"Sunday Worship", img:"teamPraise", text:"The worship team leads the church in praise every Sunday Celebration.", link:"#worship", status:"verified" },
    { name:"Add a ministry", img:null, text:"Youth, children, small groups, outreach… add the ministries SFC runs, with a photo and a contact.", status:"todo" },
    { name:"Add a ministry", img:null, text:"Each card needs a name, a two-line description, a photo and a way to join.", status:"todo" }
  ],
  sermons: [
    { title:"Come broken, but be willing to be rebuilt.", img:"p0", speaker:null, scripture:null, date:null, url:"https://www.facebook.com/spiritwindfellowshipchurch/videos", featured:true },
    { title:"Worship has little meaning if it requires no effort, no sacrifice, no surrender.", img:"p5", url:"https://www.facebook.com/spiritwindfellowshipchurch/videos" },
    { title:"Your worship can change you, your situation, and the lives of those around you.", img:"p6", url:"https://www.facebook.com/spiritwindfellowshipchurch/videos" },
    { title:"When pride comes, then comes disgrace, but with humility comes wisdom.", img:"p4", scripture:"Proverbs 11:2", url:"https://www.facebook.com/spiritwindfellowshipchurch/videos" },
    { title:"Dili jud i-reject ni Lord ang mga magpadayon og duol Kaniya.", img:"p3", url:"https://www.facebook.com/spiritwindfellowshipchurch/videos" }
  ],
  // Dated events only. Past dates are hidden automatically. Format: "YYYY-MM-DD".
  events: [
    // { title:"Youth Night", date:"2026-11-14", time:"6:00 PM", location:"CMS Building, 4th Floor", text:"...", img:"p7", url:"https://..." }
  ],
  verses: [
    { t:"Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind… Thou shalt love thy neighbour as thyself.", r:"Matthew 22:37, 39" },
    { t:"The wind bloweth where it listeth, and thou hearest the sound thereof… so is every one that is born of the Spirit.", r:"John 3:8" },
    { t:"And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting.", r:"Acts 2:2" },
    { t:"Draw nigh to God, and he will draw nigh to you.", r:"James 4:8" }
  ],
  gallery: [
    { img:"g_prayer",   cap:"Praying together", size:"tall" },
    { img:"g_singer",   cap:"Worship team" },
    { img:"g_cross",    cap:"Sunday worship", size:"wide" },
    { img:"g_stage",    cap:"Sunday Celebration", size:"wide" },
    { img:"g_standing", cap:"Prayer time" },
    { img:"g_worshiper",cap:"In His presence" },
    { img:"g_preach",   cap:"The Word preached" },
    { img:"g_leader",   cap:"Leading in praise" },
    { img:"g_seated",   cap:"Fellowship" }
  ],
  visit: {
    steps: [
      { t:"Head to the CMS Building", d:"We meet on the 4th floor of the CMS Building along National Highway." },
      { t:"Arrive a little before 9:00 AM", d:"Sunday Celebration starts at 9:00. Coming early gives you time to find a seat." },
      { t:"Worship, Word and fellowship", d:"Praise and worship, a message from the Bible, then time to meet the family." },
      { t:"Say hello", d:"Let us know you're new. We'd love to pray with you and answer any questions." }
    ],
    kids: null,     // TODO: children's arrangements
    parking: null   // TODO: parking or transport notes
  },
  form: {
    // How the contact form sends messages. See README.md → "Contact form".
    //   "none"      → form validates, then tells visitors to email instead (nothing is faked)
    //   "formspree" → set endpoint to your Formspree URL, e.g. "https://formspree.io/f/abcdwxyz"
    //   "netlify"   → works automatically when the site is hosted on Netlify
    //   "custom"    → POSTs JSON {name,email,topic,message} to endpoint
    provider: "none",
    endpoint: null
  }
};

/* Image files (assets/img). Replace a file or point a key at a new one. */
const IMG = {
  cover: "assets/img/hero-worship.webp",
  logo: "assets/img/logo.webp",
  p0: "assets/img/sermon-come-broken.webp",
  p1: "assets/img/sermon-holiness.webp",
  p3: "assets/img/sermon-bisaya.webp",
  p4: "assets/img/sermon-humility.webp",
  p5: "assets/img/sermon-worship-effort.webp",
  p6: "assets/img/sermon-worship-change.webp",
  p7: "assets/img/worship-leader.webp",
  p8: "assets/img/worship-team.webp",
  // Church photos (from the church's Facebook albums, Sunday Celebration Moments)
  hero:        "assets/img/photo-worship-stage-wide.webp",
  welcome1:    "assets/img/photo-worship-congregation.webp",
  welcome2:    "assets/img/photo-fellowship-friends.webp",
  welcome3:    "assets/img/photo-fellowship-family.webp",
  worshipBg:   "assets/img/photo-worship-band.webp",
  teamPraise:  "assets/img/photo-worship-team-praise.webp",
  g_prayer:    "assets/img/photo-prayer-together.webp",
  g_singer:    "assets/img/photo-worship-singer.webp",
  g_cross:     "assets/img/photo-worship-cross.webp",
  g_stage:     "assets/img/photo-worship-band-lead.webp",
  g_standing:  "assets/img/photo-congregation-prayer.webp",
  g_worshiper: "assets/img/photo-worshiper.webp",
  g_preach:    "assets/img/photo-preaching.webp",
  g_leader:    "assets/img/photo-worship-leader-stage.webp",
  g_seated:    "assets/img/photo-congregation-seated.webp",
  sobPoster: "assets/img/sob-graduation-poster.webp",
  sobLamb:  "assets/img/sob-level-lamb.webp",
  sobSheep: "assets/img/sob-level-sheep.webp",
  sobDove:  "assets/img/sob-level-dove.webp",
  sobEagle: "assets/img/sob-level-eagle.webp",
  sobLion:  "assets/img/sob-level-lion.webp"
};
