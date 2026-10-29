/* Spiritwind Fellowship Church — site behaviour (rendering, motion, forms).
   All church content lives in content/*.json and is edited through the admin
   page at /admin (Sveltia CMS). You normally don't need to edit this file. */
/* ---------- helpers ---------- */
const $ = (s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const ICON = {
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  out:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
  flame:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4 0 7-2.7 7-6.8 0-3.3-2-5.6-3.6-7.4-.4 2-1.6 3.2-2.9 3.6.4-3.4-1-6.7-3.9-9.4C8.8 5.5 5 8.4 5 14.6 5 19 8.1 22 12 22Z"/></svg>',
  compass:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>',
  fb:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.6-4h-3.6V8.9c0-.6.3-.9.9-.9Z"/></svg>',
  ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  tt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.3 2.2 1.7 3.8 3.9 4v3.1a7.4 7.4 0 0 1-3.9-1.2v6.6A5.6 5.6 0 1 1 11 9.9v3.2a2.5 2.5 0 1 0 2.4 2.5V3h3.2Z"/></svg>',
  yt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.4-.4-5a2.6 2.6 0 0 0-1.8-1.8C18.2 4.8 12 4.8 12 4.8s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7C2 8.6 2 12 2 12s0 3.4.4 5a2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-5 .4-5ZM10 15.2V8.8l5.2 3.2L10 15.2Z"/></svg>'
};
const DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const todo = (t="Coming soon", cls="") => `<span class="todo ${cls}">${esc(t)}</span>`;
function toast(msg){const t=$("#toast"); t.textContent=msg; t.classList.add("on"); clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove("on"),2200);}
async function copy(text){try{await navigator.clipboard.writeText(text); toast("Copied: "+text);}catch(e){toast("Select the text and copy it manually");}}

/* Manila "today" (the church's time zone) */
function manilaNow(){const p=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Manila",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date()); const g=k=>+p.find(x=>x.type===k).value; return {y:g("year"),m:g("month"),d:g("day"),h:g("hour")%24,min:g("minute")};}
function nextService(svc){
  const n=manilaNow(); const base=new Date(Date.UTC(n.y,n.m-1,n.d)); const dow=base.getUTCDay();
  let [hh,mm]=svc.time.split(":").map(Number); if(svc.ampm==="PM"&&hh<12)hh+=12;
  let add=(svc.day-dow+7)%7; if(add===0 && (n.h*60+n.min) > hh*60+mm+120) add=7; // service over (+2h) → next week
  const dt=new Date(base); dt.setUTCDate(base.getUTCDate()+add); return {date:dt, today:add===0};
}

/* ---------- content ---------- */
const CONTENT_FILES=["settings","home","bereans","events","ministries","sermons","gallery"];
let SITE=null;
async function loadContent(){
  const parts=await Promise.all(CONTENT_FILES.map(f=>fetch(`content/${f}.json`,{cache:"no-cache"}).then(r=>{ if(!r.ok) throw new Error(f); return r.json(); })));
  const [settings,home,bereans,ev,min,ser,gal]=parts;
  SITE={...settings, home, bereans, events:ev.events||[], ministries:min.ministries||[], sermons:ser.sermons||[], gallery:gal.photos||[]};
  // services: the admin picks a day name; the page works with 0–6
  SITE.services=(SITE.services||[]).map(x=>({...x, day:Math.max(0,DAYS.indexOf(x.day))}));
  if(!SITE.services.length) SITE.services=[{day:0,time:"9:00",ampm:"AM",name:"Sunday Celebration",note:""}];
}
/* image paths from the admin are relative to the site root ("assets/…") */
const src = p => p ? String(p).trim().replace(/^\/+/,"") : "";
const paras = t => String(t||"").split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean).map(x=>`<p>${esc(x).replace(/\n/g,"<br>")}</p>`).join("");
const has = v => v!=null && String(v).trim()!=="";
function setImg(el,path,alt){ if(!el||!has(path)) return; el.src=src(path); if(alt!=null) el.alt=alt; }
function setBg(el,path){ if(el&&has(path)) el.style.backgroundImage=`url("${src(path)}")`; }

/* ---------- render ---------- */
const NAV=[["Home","#home"],["About Us","#about"],["Ministries","#ministries"],["Bereans","#bereans"],["Sermons","#sermons"],["Events","#events"],["Contact","#contact"]];
function render(){
  $("#navLinks").innerHTML=NAV.map(([t,h])=>`<li><a href="${h}">${t}</a></li>`).join("");
  $("#drawerLinks").innerHTML=NAV.map(([t,h])=>`<a href="${h}" data-close>${t}</a>`).join("");
  $("#footLinks").innerHTML=NAV.concat([["Plan Your Visit","#visit"]]).map(([t,h])=>`<li><a href="${h}">${t}</a></li>`).join("");
  const H=SITE.home||{}, hero=H.hero||{}, W=H.welcome||{};
  const s0=SITE.services[0];
  // hero
  setBg($("#heroPhoto"),hero.image);
  if(has(hero.line1)) $("#heroLine1").textContent=hero.line1;
  if(has(hero.line2)) $("#heroLine2").textContent=hero.line2;
  if(has(hero.sub)) $("#heroSub").textContent=hero.sub;
  if(hero.verse&&has(hero.verse.text)) $("#heroVerse").innerHTML=`“${esc(hero.verse.text)}”<b>${esc(hero.verse.ref||"")}</b>`;
  $("#heroSvc").textContent=s0.name; $("#heroTime").textContent=`${s0.time} ${s0.ampm}`;
  if(has(SITE.addressShort)) $("#heroPlace").textContent=SITE.addressShort;
  // welcome
  $("#followers").textContent=SITE.followers||"";
  $(".welcome .badge").hidden=!has(SITE.followers);
  [W.photoMain,W.photoTop,W.photoBottom].forEach((ph,i)=>{ if(ph) setImg($("#welcomePhoto"+(i+1)),ph.image,ph.alt||""); });
  if(has(W.text)) $("#welcomeText").textContent=W.text;
  const CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  if(Array.isArray(W.points)) $("#welcomePoints").innerHTML=W.points.map(x=>`<li>${CHECK}<span><b>${esc(x.title)}</b> ${esc(x.text||"")}</span></li>`).join("");
  if(W.quote&&has(W.quote.text)) $("#welcomeQuote").innerHTML=`“${esc(W.quote.text)}”${has(W.quote.note)?`<small>${esc(W.quote.note)}</small>`:""}`; else $("#welcomeQuote").hidden=true;
  // worship
  if(H.worship){ setBg($("#worshipPhoto"),H.worship.image); if(has(H.worship.text)) $("#worshipText").textContent=H.worship.text; }

  // services
  const nx=nextService(s0);
  $("#services").innerHTML=SITE.services.map(s=>`<div class="row"><div class="time">${esc(s.time)}<small>${esc(s.ampm)}</small></div><div class="what"><b>${esc(DAYS[s.day])} · ${esc(s.name)}</b><span>${esc(s.note)}</span></div></div>`).join("")
   +`<div class="note">${ICON.pin}<span>${esc(SITE.address)}</span></div>`
   +`<div class="note">${ICON.cal}<span>${nx.today?"Today":"Next"}: ${DAYS[nx.date.getUTCDay()]}, ${MON[nx.date.getUTCMonth()]} ${nx.date.getUTCDate()}</span></div>`
   +`<div class="actions"><a class="btn btn-primary" href="#visit">First time? Start here</a><a class="btn btn-ghost" href="${SITE.mapsUrl}" target="_blank" rel="noopener">Get directions</a></div>`;

  // pillars
  SITE.pillars=H.pillars||[];
  $("#pillars").innerHTML=SITE.pillars.map((p,i)=>`<button class="pillar rv" data-pillar="${i}" aria-haspopup="dialog">
     <span class="ico">${ICON[p.icon]||ICON.flame}</span><h3>${esc(p.title)}</h3>
     ${has(p.highlight)?`<span class="big">${esc(p.highlight)}</span>`:todo()}
     <p>${esc(p.summary||"")}</p><span class="more">Read more ${ICON.arrow}</span></button>`).join("");

  // ministries
  const mcard=m=>`<article class="mcard rv"><div class="ph">${has(m.image)?`<img src="${esc(src(m.image))}" alt="${esc(m.name)}" loading="lazy">`:""}</div><div class="body"><h3>${esc(m.name)}</h3><p>${esc(m.text||"")}</p><div class="foot"><a href="${esc(has(m.link)?m.link:"#contact")}"${/^https?:/.test(m.link||"")?' target="_blank" rel="noopener"':''} data-inquiry="ministry">Learn more →</a>${has(m.when)?`<span class="chip">${esc(m.when)}</span>`:""}</div></div></article>`;
  const soon=`<article class="mcard placeholder rv"><div class="ph">${ICON.plus}</div><div class="body">${todo()}<h3>More ministries</h3><p>More ways to serve and grow together will be listed here. Ask us how you can get involved.</p></div></article>`;
  const ms=SITE.ministries.map(mcard); while(ms.length<3) ms.push(soon);
  $("#ministryGrid").innerHTML=ms.join("");

  // school of bereans
  renderBereans();

  // sermons
  $("#moreSermons").href=SITE.social.youtube;
  const fs=SITE.sermons.find(x=>x.featured)||SITE.sermons[0];
  const sdate=d=>/^\d{4}-\d{2}-\d{2}/.test(d||"")?fmtDate(d.slice(0,10)):esc(d);
  const where=u=>/youtu/.test(u||"")?"YouTube":/facebook|fb\.watch/.test(u||"")?"Facebook":"online";
  const meta=s=>{const bits=[has(s.speaker)?`<span>${ICON.user}${esc(s.speaker)}</span>`:"",has(s.scripture)?`<span>${ICON.book}${esc(s.scripture)}</span>`:"",has(s.date)?`<span>${ICON.cal}${sdate(s.date)}</span>`:""].join(""); return bits?`<div class="smeta">${bits}</div>`:"";};
  if(fs){
    $("#featSermon").innerHTML=`<a class="thumb" href="${esc(fs.url)}" target="_blank" rel="noopener" aria-label="Watch on ${where(fs.url)}"><img src="${esc(src(fs.image))}" alt="Sermon graphic: ${esc(fs.title)}"><span class="play">${ICON.play}</span></a>
      <div><span class="label">Featured message</span><h3>“${esc(fs.title)}”</h3>${meta(fs)}<a class="btn btn-primary" href="${esc(fs.url)}" target="_blank" rel="noopener">Watch on ${where(fs.url)} ${ICON.out}</a></div>`;
    $("#sermonList").innerHTML=SITE.sermons.filter(x=>x!==fs).map(s=>`<a class="sitem rv" href="${esc(s.url)}" target="_blank" rel="noopener"><img src="${esc(src(s.image))}" alt=""><span><b>${esc(s.title)}</b><small>${[has(s.speaker)?esc(s.speaker):"",has(s.scripture)?esc(s.scripture):"",has(s.date)?sdate(s.date):""].filter(Boolean).join(" · ")||"Sermon highlight"} · ${where(s.url)}</small></span><span class="arr">${ICON.out}</span></a>`).join("");
  } else $("#sermons").hidden=true;

  // events
  const n=manilaNow(), todayStr=`${n.y}-${String(n.m).padStart(2,"0")}-${String(n.d).padStart(2,"0")}`;
  const upcoming=SITE.events.map(e=>({...e,date:String(e.date||"").slice(0,10)})).filter(e=>/^\d{4}-\d{2}-\d{2}$/.test(e.date)&&e.date>=todayStr).sort((a,b)=>a.date.localeCompare(b.date));
  const d=nx.date;
  const feat = upcoming[0];
  const featHTML = feat ? eventFeat(feat) : `<article class="efeat rv"><div class="when"><div class="cal"><small>${MON[d.getUTCMonth()]}</small><b>${d.getUTCDate()}</b></div><div><div class="tag">${nx.today?"Today":"This coming Sunday"} · weekly</div><h3>${esc(s0.name)}</h3></div></div>
     <p>${esc(SITE.motto)} Join the SFC family for worship, fellowship and the living Word of God.</p>
     <div class="facts"><span>${ICON.clock}${esc(s0.time)} ${esc(s0.ampm)}</span><span>${ICON.pin}${esc(SITE.addressShort||SITE.address)}</span></div>
     <button class="btn" data-event="weekly">Event details ${ICON.arrow}</button></article>`;
  const rest = upcoming.slice(feat?1:0);
  const side = rest.length ? `<div class="slist">${rest.map((e,i)=>`<button class="sitem rv" style="color:inherit;text-align:left;border:0;font:inherit;cursor:pointer;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line)" data-event="${i+(feat?1:0)}"><img src="${esc(src(e.image)||"assets/img/logo.webp")}" alt=""><span><b>${esc(e.title)}</b><small style="color:var(--muted)">${fmtDate(e.date)} · ${esc(e.time||"")}</small></span><span class="arr">${ICON.arrow}</span></button>`).join("")}</div>`
     : `<div class="empty rv">${todo("No special events yet")}<h3>Special events will show up here.</h3><p>Conferences, youth nights, outreach and celebrations are announced here and on our Facebook page.</p><a class="btn btn-ghost" style="align-self:flex-start;color:var(--otext)" href="${esc(SITE.social.facebook)}" target="_blank" rel="noopener">Follow updates on Facebook</a></div>`;
  $("#eventGrid").innerHTML=featHTML+side;
  window._upcoming=upcoming;

  // gallery
  $("#fbPhotos").href=SITE.social.facebook+"/photos";
  SITE.gallery=SITE.gallery.filter(g=>has(g.image));
  $("#galleryGrid").innerHTML=SITE.gallery.map((g,i)=>`<button class="gitem rv ${g.size==="tall"||g.size==="wide"?g.size:""}" data-g="${i}" aria-label="Open photo: ${esc(g.caption||"Church photo")}"><img src="${esc(src(g.image))}" alt="${esc(g.caption||"")}" loading="lazy">${has(g.caption)?`<span>${esc(g.caption)}</span>`:""}</button>`).join("");

  // visit
  const VS=H.visit||{steps:[]}; SITE.visit=VS;
  $("#visitSteps").innerHTML=(VS.steps||[]).map((s,i)=>`<li><span class="n">${i+1}</span><div><b>${esc(s.title)}</b><span>${esc(s.text||"")}</span></div></li>`).join("");
  $("#visitCards").innerHTML=`
   <div class="vcard"><span class="k">${ICON.clock}When</span><span class="v">${DAYS[s0.day]}s, ${esc(s0.time)} ${esc(s0.ampm)}</span><p>${esc(s0.name)}</p></div>
   <div class="vcard"><span class="k">${ICON.pin}Where</span><span class="v">${esc(SITE.addressShort||SITE.address)}</span><p>${esc(SITE.addressLine2||"")}</p><a class="lnk" href="${esc(SITE.mapsUrl)}" target="_blank" rel="noopener">Open in Maps →</a></div>
   <div class="vcard"><span class="k">${ICON.heart}Kids &amp; families</span>${has(VS.kids)?`<p>${esc(VS.kids)}</p>`:`${todo()}<p>Children's arrangements will be listed here. Message us and we'll help you plan.</p>`}</div>
   <div class="vcard"><span class="k">${ICON.compass}Getting there</span>${has(VS.parking)?`<p>${esc(VS.parking)}</p>`:`${todo()}<p>Parking and transport tips coming soon.</p>`}</div>
   <div class="vcard wide"><span class="k">${ICON.mail}Questions before you come?</span><span class="v" style="font-size:17px;overflow-wrap:anywhere">${esc(SITE.email)}</span><p>Or message SFC on Facebook. We're happy to help.</p></div>`;

  // contact
  $("#contactList").innerHTML=`
   <div class="citem"><span class="ic">${ICON.pin}</span><div><small>Address</small><b>${esc(SITE.address)}</b></div><a class="go" href="${esc(SITE.mapsUrl)}" target="_blank" rel="noopener">Map</a></div>
   <div class="citem"><span class="ic">${ICON.mail}</span><div><small>Email</small><b>${esc(SITE.email)}</b></div><button class="cp" data-copy="${esc(SITE.email)}">Copy</button></div>
   <div class="citem"><span class="ic">${ICON.phone}</span><div><small>Phone</small>${has(SITE.phone)?`<b>${esc(SITE.phone)}</b>`:`<b style="font-weight:500;color:var(--muted)">Not published yet</b>`}</div>${has(SITE.phone)?`<button class="cp" data-copy="${esc(SITE.phone)}">Copy</button>`:""}</div>
   <div class="citem"><span class="ic">${ICON.fb}</span><div><small>Facebook</small><b>${esc(String(SITE.social.facebook||"").replace(/^https?:\/\/(www\.)?/,"").replace(/\/$/,""))}</b></div><a class="go" href="${esc(SITE.social.facebook)}" target="_blank" rel="noopener">Open</a></div>`;
  $("#f-topic").innerHTML=["General question","Planning a visit","Prayer request","Joining a ministry","School of Bereans","Something else"].map((t,i)=>`<option value="${["general","visit","prayer","ministry","bereans","other"][i]}">${t}</option>`).join("");

  // footer
  const so=SITE.social;
  $("#socials").innerHTML=[["Facebook",so.facebook,ICON.fb],["Instagram",so.instagram,ICON.ig],["TikTok",so.tiktok,ICON.tt],["YouTube",so.youtube,ICON.yt]].filter(([,u])=>has(u)).map(([n,u,i])=>`<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${n}">${i}</a>`).join("");
  $("#footSvc").innerHTML=SITE.services.map(s=>`<li style="color:var(--stage-muted)">${DAYS[s.day]} · ${esc(s.time)} ${esc(s.ampm)}<br><span style="color:var(--stage-ink)">${esc(s.name)}</span></li>`).join("")+`<li style="color:var(--stage-muted)">${esc(SITE.addressShort||SITE.address)}${has(SITE.addressLine2)?"<br>"+esc(SITE.addressLine2):""}</li>`;
  $("#footContact").innerHTML=`<li style="color:var(--stage-muted);overflow-wrap:anywhere;user-select:all">${esc(SITE.email)}</li><li><a href="${so.facebook}" target="_blank" rel="noopener">Message us on Facebook</a></li><li><a href="#contact">Send a message</a></li>`;
  $("#yr").textContent=new Date().getFullYear();
}
function renderBereans(){
  const B=SITE.bereans; if(!B){ $("#bereans")?.remove(); return; }
  $("#sobIntro").textContent=B.intro;
  $("#sobVerse").innerHTML=`<p>${esc(B.verse?.text||"")}</p><cite>${esc(B.verse?.ref||"")}</cite>`;
  const extra=[has(B.schedule)?`${ICON.clock} ${esc(B.schedule)}`:"", has(B.hashtag)?esc(B.hashtag):""].filter(Boolean).join(" · ");
  $("#sobTag").innerHTML=extra;
  setImg($("#sobPoster"),B.poster);
  const ms=B.milestone||{};
  $("#sobMilestone").innerHTML=has(ms.title)?`<span class="cap-ic">${ICON.cal}</span><span><b>${esc(ms.title)}</b>${esc(ms.date||"")}${has(ms.note)?" · "+esc(ms.note):""}</span>`:"";
  $("#sobMilestone").hidden=!has(ms.title);
  const enrollLink=$('#bereans [data-inquiry="bereans"]'); if(enrollLink&&/^https?:/.test(B.enroll||"")){ enrollLink.href=B.enroll; enrollLink.target="_blank"; enrollLink.rel="noopener"; enrollLink.removeAttribute("data-inquiry"); }
  const n=B.levels.length;
  $("#sobLevels").innerHTML=B.levels.map((l,i)=>{const fin=i===n-1, logo=src(l.logo);
    return `<li class="lvl rv${fin?" final":""}">
      <span class="medal">${logo?`<img src="${esc(logo)}" alt="${esc(l.name)} level logo" width="72" height="72">`:""}<b aria-hidden="true">${i+1}</b></span>
      <small>Level ${i+1} of ${n}</small>
      <h4>${esc(l.name)}</h4>
      ${has(l.text)?`<p>${esc(l.text)}</p>`:`<span class="soon">Level details coming soon</span>`}
      ${fin?`<span class="badge-final">Final level</span>`:""}
    </li>`}).join("");
  $("#sobLatest").innerHTML=has(B.latest?.title)?`${ICON.cal}<span>Latest: <b>${esc(B.latest.title)}</b> · ${esc(B.latest.date||"")}</span>`:"";
}
function fmtDate(s){const [y,m,d]=s.split("-").map(Number); return `${MON[m-1]} ${d}, ${y}`;}
function eventFeat(e){const [y,m,d]=e.date.split("-").map(Number);
  return `<article class="efeat rv"><div class="when"><div class="cal"><small>${MON[m-1]}</small><b>${d}</b></div><div><div class="tag">Featured event</div><h3>${esc(e.title)}</h3></div></div><p>${esc(e.text||"")}</p><div class="facts"><span>${ICON.clock}${esc(e.time||"")}</span><span>${ICON.pin}${esc(e.location||"")}</span></div><button class="btn" data-event="0">Event details ${ICON.arrow}</button></article>`;}

/* ---------- dialogs ---------- */
const dlg=$("#dlg");
function openModal(html){ $("#dlgBody").innerHTML=`<button class="x" data-dclose aria-label="Close">×</button>`+html; dlg.showModal?dlg.showModal():dlg.setAttribute("open",""); lockScroll(true); }
dlg.addEventListener("close",()=>lockScroll(false));
dlg.addEventListener("click",e=>{ if(e.target===dlg||e.target.closest("[data-dclose]")) dlg.close(); });
document.addEventListener("click",e=>{
  const p=e.target.closest("[data-pillar]"); if(p){const x=SITE.pillars[+p.dataset.pillar]; openModal(`<span class="eyebrow">About SFC</span><h3>${esc(x.title)}</h3>${paras(x.body)||`<p>${esc(x.summary||"")}</p>`}`); return;}
  const ev=e.target.closest("[data-event]"); if(ev){
    if(ev.dataset.event==="weekly"){const s=SITE.services[0], nx=nextService(s);
      openModal(`<span class="eyebrow">Every ${DAYS[s.day]}</span><h3>${esc(s.name)}</h3><p>${esc(SITE.motto)} A day filled with worship, fellowship and the living Word of God.</p><ul><li><b>Time:</b> ${esc(s.time)} ${esc(s.ampm)}</li><li><b>Next:</b> ${DAYS[nx.date.getUTCDay()]}, ${MON[nx.date.getUTCMonth()]} ${nx.date.getUTCDate()}, ${nx.date.getUTCFullYear()}</li><li><b>Where:</b> ${esc(SITE.address)}</li></ul><p><a class="btn btn-primary" href="${esc(SITE.mapsUrl)}" target="_blank" rel="noopener">Get directions</a></p>`);}
    else {const x=window._upcoming[+ev.dataset.event]; openModal(`<span class="eyebrow">${fmtDate(x.date)}</span>${has(x.image)?`<img src="${esc(src(x.image))}" alt="" style="width:100%;border-radius:16px;margin:14px 0 4px;max-height:260px;object-fit:cover">`:""}<h3>${esc(x.title)}</h3>${paras(x.text)}<ul><li><b>Time:</b> ${esc(x.time||"")}</li><li><b>Where:</b> ${esc(x.location||"")}</li></ul>${x.url?`<p><a class="btn btn-primary" href="${esc(x.url)}" target="_blank" rel="noopener">More info</a></p>`:""}`);}
    return;}
  const c=e.target.closest("[data-copy]"); if(c){copy(c.dataset.copy); return;}
  const q=e.target.closest("[data-inquiry]"); if(q){$("#f-topic").value=q.dataset.inquiry;}
});
/* ---------- lightbox ---------- */
const lbx=$("#lbx"); let gi=0;
function showG(i){gi=(i+SITE.gallery.length)%SITE.gallery.length; const g=SITE.gallery[gi]; $("#lbImg").src=src(g.image); $("#lbImg").alt=g.caption||""; $("#lbCap").textContent=g.caption||""; $("#lbCount").textContent=`${gi+1} / ${SITE.gallery.length}`;}
$("#galleryGrid").addEventListener("click",e=>{const b=e.target.closest("[data-g]"); if(!b)return; showG(+b.dataset.g); lbx.showModal?lbx.showModal():lbx.setAttribute("open",""); lockScroll(true);});
lbx.addEventListener("close",()=>lockScroll(false));
$("#lbPrev").onclick=()=>showG(gi-1); $("#lbNext").onclick=()=>showG(gi+1); $("#lbClose").onclick=()=>lbx.close();
lbx.addEventListener("click",e=>{if(e.target===lbx)lbx.close();});
lbx.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")showG(gi-1); if(e.key==="ArrowRight")showG(gi+1);});
let tx=null; lbx.addEventListener("touchstart",e=>{tx=e.touches[0].clientX},{passive:true});
lbx.addEventListener("touchend",e=>{if(tx==null)return; const dx=e.changedTouches[0].clientX-tx; if(Math.abs(dx)>40) showG(gi+(dx<0?1:-1)); tx=null;});

/* ---------- verses ---------- */
let vi=0, vtimer;
function showV(i,instant){ if(!SITE.verses.length) return; vi=(i+SITE.verses.length)%SITE.verses.length; const t=$("#vText"), r=$("#vRef");
  const set=()=>{t.textContent="“"+SITE.verses[vi].text+"”"; r.textContent=SITE.verses[vi].ref||""; t.classList.remove("out"); r.classList.remove("out"); $$("#vDots i").forEach((d,k)=>d.classList.toggle("on",k===vi));};
  if(instant) return set(); t.classList.add("out"); r.classList.add("out"); setTimeout(set,450);}
function vAuto(){clearInterval(vtimer); if(!matchMedia("(prefers-reduced-motion: reduce)").matches) vtimer=setInterval(()=>showV(vi+1),9000);}
$("#vPrev").onclick=()=>{showV(vi-1); vAuto();}; $("#vNext").onclick=()=>{showV(vi+1); vAuto();};

/* ---------- nav + drawer ---------- */
const nav=$("#nav"), drawer=$("#drawer"), burger=$("#burger");
function setDrawer(open){lockScroll(open); drawer.classList.toggle("open",open); drawer.setAttribute("aria-hidden",String(!open)); burger.setAttribute("aria-expanded",String(open)); if(open) $(".drawer .close").focus(); else burger.focus({preventScroll:true});}
burger.onclick=()=>setDrawer(true);
drawer.addEventListener("click",e=>{if(e.target.closest("[data-close]")) setDrawer(false);});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&drawer.classList.contains("open")) setDrawer(false);});

/* ---------- contact form ---------- */
const form=$("#cform");
function fieldErr(id,msg){const f=$("#"+id).closest(".field"); f.classList.toggle("bad",!!msg); $("#e-"+id.slice(2)).textContent=msg||""; $("#"+id).setAttribute("aria-invalid",msg?"true":"false");}
function status(kind,html){$("#fstatus").innerHTML=`<div class="fstatus ${kind}">${ICON.info}<div>${html}</div></div>`;}
form.addEventListener("submit",async e=>{
  e.preventDefault();
  const name=$("#f-name").value.trim(), email=$("#f-email").value.trim(), msg=$("#f-msg").value.trim();
  let ok=true;
  fieldErr("f-name", name.length<2?"Enter your name.":""); if(name.length<2) ok=false;
  const em=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email); fieldErr("f-email", em?"":"Enter an email address like name@example.com."); if(!em) ok=false;
  fieldErr("f-msg", msg.length<10?"Write a message of at least 10 characters.":""); if(msg.length<10) ok=false;
  if(!ok){ $(".field.bad input, .field.bad textarea")?.focus(); $("#fstatus").innerHTML=""; return; }
  if($("#f-web").value){ return; } // honeypot: silently drop bots
  const topic=$("#f-topic").value, prov=(SITE.form.provider||"none");
  const btn=form.querySelector('[type="submit"]');
  if(prov==="none" || ((prov==="formspree"||prov==="custom") && !SITE.form.endpoint)){
    status("warn",`<b>This form isn't connected yet, so your message was not sent.</b><br>Please email <b style="user-select:all;overflow-wrap:anywhere">${esc(SITE.email)}</b> or message SFC on Facebook. <button type="button" class="cp" data-copy="${esc(SITE.email)}" style="margin-left:4px;border:0;background:var(--surface);color:var(--otext);font:700 13px var(--f-body);padding:6px 10px;border-radius:999px;cursor:pointer">Copy email</button>`);
    return;
  }
  btn.disabled=true; btn.textContent="Sending…";
  try{
    let res;
    if(prov==="netlify"){
      const body=new URLSearchParams({"form-name":"contact",name,email,topic,message:msg});
      res=await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body});
    } else {
      res=await fetch(SITE.form.endpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({name,email,topic,message:msg,_subject:"New message from the SFC website"})});
    }
    if(!res.ok) throw new Error(res.status);
    status("ok","<b>Message sent.</b> Thank you! Someone from SFC will reply by email."); form.reset();
  }catch(err){ status("bad",`<b>We couldn't send your message.</b> Check your connection and try again, or email ${esc(SITE.email)}.`); }
  finally{ btn.disabled=false; btn.textContent="Send message"; }
});

/* ---------- motion: parallax, reveal, nav, wind ---------- */
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
/* ---------- smooth scrolling (Lenis) ----------
   Gives the whole page a soft, momentum-style scroll on mouse wheels and trackpads.
   Touch screens keep their native scrolling. Turned off for "reduce motion" users. */
let lenis=null;
function lockScroll(on){ if(lenis) on?lenis.stop():lenis.start(); }
function initSmooth(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches || typeof Lenis!=="function") return;
  lenis=new Lenis({ lerp:.085, wheelMultiplier:.95, smoothWheel:true, autoRaf:true, allowNestedScroll:true });
  window.lenis=lenis;
  lenis.on("scroll",()=>{ onScroll(); reqP(); });
  // in-page links glide to their section, just below the sticky header
  document.addEventListener("click",e=>{
    const a=e.target.closest('a[href^="#"]'); if(!a) return;
    const id=a.getAttribute("href"); if(id.length<2) return;
    const t=document.getElementById(id.slice(1)); if(!t) return;
    e.preventDefault();
    if(drawer.classList.contains("open")) setDrawer(false);
    lenis.start();
    lenis.scrollTo(id==="#home"?0:t,{ duration:1.25, easing:x=>1-Math.pow(1-x,4) });   // header gap comes from CSS scroll-padding-top
    history.replaceState(null,"",id);
  });
}

function onScroll(){ nav.classList.toggle("solid", scrollY>60); }
addEventListener("scroll",onScroll,{passive:true});

let pEls=[], ticking=false;
function parallax(){ticking=false; const vh=innerHeight;
  for(const el of pEls){const r=el.parentElement.getBoundingClientRect(); if(r.bottom<-200||r.top>vh+200) continue;
    const c=(r.top+r.height/2)-vh/2; const s=+el.dataset.speed;
    el.style.transform = el.dataset.x ? `translate3d(${-c*s}px,0,0)` : `translate3d(0,${c*s*-1}px,0)`;}}
function reqP(){if(!ticking){ticking=true; requestAnimationFrame(parallax);}}

function initMotion(){
  if(reduce) return;
  pEls=$$("[data-speed]"); addEventListener("scroll",reqP,{passive:true}); addEventListener("resize",reqP); parallax();
  if("IntersectionObserver" in window){
    document.documentElement.classList.add("anim");
    const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in"); io.unobserve(en.target);}}),{rootMargin:"0px 0px -8% 0px"});
    const trk=$("#sobLevels"); if(trk){ const io2=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ trk.classList.add("in"); io2.disconnect(); } },{threshold:.35}); io2.observe(trk); }
    $$(".rv").forEach((el,i)=>{ const r=el.getBoundingClientRect(); if(r.top<innerHeight) {el.style.transitionDelay=(Math.min(i,6)*70)+"ms"; requestAnimationFrame(()=>el.classList.add("in"));} else io.observe(el); });
  }
  wind();
}

/* Spirit wind: slow ribbons of amber light drifting across the hero */
function wind(){
  const cv=$("#wind"), ctx=cv.getContext("2d"); if(!ctx) return;
  let W,H,dpr, ribbons=[], t=0, visible=true;
  function size(){dpr=Math.min(devicePixelRatio||1,2); W=cv.clientWidth; H=cv.clientHeight; cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);}
  function mk(i){return {y:H*(.25+Math.random()*.6), amp:30+Math.random()*70, f:.0016+Math.random()*.0022, sp:.25+Math.random()*.45, ph:Math.random()*6.28, w:.6+Math.random()*1.6, a:.10+Math.random()*.22, hue:22+Math.random()*16};}
  size(); ribbons=Array.from({length: W<700?7:13}, mk);
  addEventListener("resize",()=>{size();});
  new IntersectionObserver(es=>{visible=es[0].isIntersecting;}).observe(cv);
  (function frame(){ requestAnimationFrame(frame); if(!visible||document.hidden) return; t+=1;
    ctx.clearRect(0,0,W,H);
    for(const r of ribbons){ ctx.beginPath();
      for(let x=-20;x<=W+20;x+=14){ const y=r.y + Math.sin(x*r.f + t*.006*r.sp + r.ph)*r.amp + Math.sin(x*r.f*2.3 - t*.004)*r.amp*.25; x===-20?ctx.moveTo(x,y):ctx.lineTo(x,y); }
      const g=ctx.createLinearGradient(0,0,W,0); const off=((t*r.sp*.9)%(W*2))/(W*2);
      g.addColorStop(0,`hsla(${r.hue},95%,62%,0)`); g.addColorStop(Math.max(0,off-.18),`hsla(${r.hue},95%,62%,0)`);
      g.addColorStop(off,`hsla(${r.hue},98%,68%,${r.a})`); g.addColorStop(Math.min(1,off+.22),`hsla(${r.hue},95%,62%,0)`); g.addColorStop(1,`hsla(${r.hue},95%,62%,0)`);
      ctx.strokeStyle=g; ctx.lineWidth=r.w; ctx.stroke(); }
  })();
}

/* ---------- boot ---------- */
(async function boot(){
  onScroll(); initSmooth();
  try{ await loadContent(); }
  catch(err){ console.error("Could not load content/*.json", err); $("#loadError").hidden=false; initMotion(); return; }
  SITE.verses=(SITE.home&&SITE.home.verses)||[];
  $("#vDots").innerHTML=SITE.verses.map(()=>"<i></i>").join("");
  if(!SITE.verses.length) $("#scripture").hidden=true;
  render(); showV(0,true); vAuto(); initMotion();
  if(lenis) lenis.resize();
  // shared links like …/#bereans: jump once the content is on the page
  if(location.hash.length>1){ const t=document.getElementById(location.hash.slice(1)); if(t) requestAnimationFrame(()=> lenis ? lenis.scrollTo(t,{immediate:true,force:true}) : t.scrollIntoView()); }
})();
