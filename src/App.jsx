import { useState, useEffect, useRef } from "react";

/* CWH SITE v3 — Exact Crossbar Match */

var NS_FH = "'Oswald',sans-serif";
var C = { navy:"#00294D", olive:"#525441", red:"#B7232C", w:"#fff", g1:"#F2F5F7", g2:"#e2e8f0", g4:"#94a3b8", g6:"#475569", g8:"#1e293b", bl:"#3b82f6", gr:"#22c55e" };
var F = { h:"'Bebas Neue',sans-serif", b:"'Source Sans 3',sans-serif" };
var FORMS = { reg:"https://wkf.ms/4fDnOqL", uni:"https://wkf.ms/43cPPyl", comp:"https://wkf.ms/4nMZ7KM", exp:"https://wkf.ms/4x2zl9E", don:"https://www.zeffy.com/donation-form/columbus-warrior-hockey", store:"https://teamlocker.squadlocker.com/#/lockers/2888135" };

var IMG = {
  logo:"/images/logo.png", hero:"/images/hero.jpg", sponsorAll:"/images/sponsors-all.jpg",
  usah:"/images/usahockey.png", midam:"/images/midam.png",
  kroger:"/images/kroger.jpg", moomoo:"/images/moomoo.png", chiller:"/images/chiller.png",
  guardiansCup:"/images/news-guardians-cup.jpg",
  newsCahl:"/images/news-cahl-fall.jpg", newsMooPlatinum:"/images/news-moomoo-platinum.jpg",
  newsMooGold:"/images/news-moomoo-gold.jpg", newsFirst:"/images/news-first-session.jpg",
  taylor:"/images/taylor.webp", tj:"/images/tj.webp", matt:"/images/matt.webp",
  steven:"/images/steven.webp", brent:"/images/brent.webp",
};

var BOARD_MEMBERS = [
  { name:"Taylor DeCicco", role:"President", branch:"U.S. Marine Corps", years:"2010-2015", img:IMG.taylor },
  { name:"Robert Carpenter", role:"Bad Dude", branch:"U.S. Army Ranger", img:IMG.robb },
  { name:"Matt Chamblin", role:"Secretary", branch:"U.S. Air Force / Ohio ANG", years:"2002-2015", img:IMG.matt },
  { name:"Steven Bowman", role:"Treasurer", branch:"U.S. Army", years:"2012-2020", img:IMG.steven },
];
var OPS_STAFF = [
  { name:"William Teater", role:"Content Manager", branch:"U.S. Navy", years:"2016-2023", img:IMG.taylor },
  { name:"Brent McCreedy", role:"Player Representative", branch:"U.S. Marine Corps", years:"2008-2013", img:IMG.brent },
  { name:"Vacant", role:"Social Media Specialist" },
  { name:"Vacant", role:"Volunteer Coordinator" },
];
var COACHING = [
  { name:"Vacant", role:"Head Coach" },
  { name:"Vacant", role:"Assistant Coach" },
  { name:"Vacant", role:"Player Development" },
  { name:"Vacant", role:"Conditioning Coach" },
];

var NEWS = [
  { date:"March 12, 2026", title:"Columbus Warriors Debut at the Guardian's Cup in Rochester", img:IMG.guardiansCup, style:2, url:"https://www.columbuswarriorhockey.org/news/columbus-warriors-debut-at-the-guardians-cup-in-rochester/26965" },
  { date:"December 16, 2025", title:"Columbus Warriors Close Out Strong Fall Session in CAHL's C South League", img:IMG.newsCahl, style:1, url:"https://www.columbuswarriorhockey.org/news/columbus-warriors-close-out-strong-fall-session-in-cahl-s-c-south-c-league/25006" },
  { date:"November 24, 2025", title:"Grand Opening, Greater Commitment: Moo Moo Express Car Wash Elevates to Platinum Sponsor", img:IMG.newsMooPlatinum, style:2, url:"https://www.columbuswarriorhockey.org/news/grand-opening-greater-commitment-moo-moo-express-car-wash-elevates-to-platinum-sponsor/24522" },
  { date:"July 29, 2025", title:"Columbus Warrior Hockey Announces Moo Moo Express Car Wash as Gold Sponsor", img:IMG.newsMooGold, style:1, url:"https://www.columbuswarriorhockey.org/news/columbus-warrior-hockey-announces-moo-moo-express-car-wash-as-gold-sponsor/22044" },
  { date:"July 29, 2025", title:"Columbus Warrior Hockey Holds First Official Stick and Puck Session After Formation of 501(c)(3)", img:IMG.newsFirst, style:2, url:"https://www.columbuswarriorhockey.org/news/columbus-warrior-hockey-holds-first-official-stick-and-puck-session-after-formation-of-501-c-3/22058" },
];

var TEAMS = [
  { id:"team-dv", name:"DV - Columbus Warriors", league:"Disabled Veterans", color:"#c8a84e", desc:"Adaptive hockey for disabled veterans with 10%+ VA rating or Purple Heart." },
  { id:"team-c", name:"CAHL C - Warriors", league:"CAHL C League", color:C.bl, desc:"Intermediate competitive play in the CAHL C South division." },
  { id:"team-d", name:"CAHL D - Warriors", league:"CAHL D League", color:C.gr, desc:"Recreational division for veterans and beneficiaries of all skill levels." },
];

var STATS = [{p:"Player 1",gp:12,g:8,a:6,pts:14},{p:"Player 2",gp:12,g:5,a:9,pts:14},{p:"Player 3",gp:11,g:6,a:5,pts:11},{p:"Player 4",gp:12,g:4,a:6,pts:10},{p:"Player 5",gp:10,g:3,a:7,pts:10}];

var NAV_ITEMS = [
  { label:"About", ch:[{l:"About Us",p:"about"},{l:"News",p:"news"},{l:"Photo Gallery",p:"gallery"},{l:"Leadership",p:"leadership"},{l:"Sponsors",p:"sponsors"},{l:"Become a Sponsor",p:"become-sponsor"},{l:"Become a Contributor",p:"contributor"}]},
  { label:"Programs", ch:[{l:"Chiller Adult Hockey League",p:"cahl"},{l:"Disabled Hockey",p:"disabled-hockey"},{l:"Stick & Puck / Drop-In",p:"stick-puck"}]},
  { label:"Schedule", ch:[{l:"Game Schedule",p:"schedule"},{l:"Game Lineup",p:"lineup"},{l:"Game Recaps",p:"recaps"},{l:"Season Leaderboard",p:"leaderboard"}]},
  { label:"Teams", ch:[{l:"DV - Columbus Warriors",p:"team-dv"},{l:"CAHL C - Warriors",p:"team-c"},{l:"CAHL D - Warriors",p:"team-d"}]},
  { label:"Resources", ch:[{l:"Ice Schedules",p:"ice-schedules"},{l:"Mental Health",p:"mental-health"},{l:"Registration Guides",p:"reg-guides"},{l:"Players Corner",p:"players-corner"},{l:"Coaching for CWH",p:"coaching"}]},
  { label:"NEW SITE", p:"new-site" },
];

function Btn({children, href, v, s:sx}) {
  v = v || "navy";
  var base = {display:"inline-block",padding:"12px 24px",fontFamily:F.h,fontSize:16,fontWeight:400,textTransform:"uppercase",letterSpacing:2,textDecoration:"none",borderRadius:4,cursor:"pointer",transition:"all .3s",border:"none",textAlign:"center"};
  var vs = {navy:{background:C.navy,color:C.w},olive:{background:C.olive,color:C.w},red:{background:C.red,color:C.w},outline:{background:"transparent",color:C.w,border:"2px solid "+C.w}};
  return <a href={href} target="_blank" rel="noopener noreferrer" style={Object.assign({},base,vs[v],sx)}>{children}</a>;
}

function PersonCard({person:p}) {
  var vacant = p.name === "Vacant";
  return (
    <div style={{textAlign:"center",padding:16}}>
      {p.img ? <img src={p.img} alt={p.name} style={{width:100,height:100,borderRadius:"50%",objectFit:"cover",border:"3px solid "+C.red}} />
        : <div style={{width:100,height:100,borderRadius:"50%",background:vacant?C.g2:C.navy,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",border:"3px solid "+(vacant?C.g2:C.red),fontFamily:F.h,fontSize:28,fontWeight:400,color:vacant?C.g4:C.w}}>{vacant ? "?" : p.name.split(" ").map(function(n){return n[0]}).join("")}</div>}
      <div style={{fontFamily:F.h,fontSize:20,fontWeight:400,color:vacant?C.g4:C.navy,textTransform:"uppercase",marginTop:12,letterSpacing:1}}>{p.name}</div>
      <div style={{fontFamily:F.b,fontSize:12,color:C.red,textTransform:"uppercase",letterSpacing:1,marginTop:2,fontWeight:600}}>{p.role}</div>
      {p.branch && <div style={{fontFamily:F.b,fontSize:13,color:C.g6,marginTop:4}}>{p.branch}</div>}
      {p.years && <div style={{fontFamily:F.b,fontSize:12,color:C.g4}}>{p.years}</div>}
    </div>
  );
}

/* ─── RESPONSIVE CSS ─── */
function GlobalStyles() {
  return <style>{"\
    @media (max-width: 900px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } .top-bar { display: none !important; } .footer-grid { grid-template-columns: 1fr !important; } .cta-grid { grid-template-columns: 1fr 1fr !important; } .news-top { grid-template-columns: 1fr !important; } .news-bottom { grid-template-columns: 1fr !important; } }\
    @media (min-width: 901px) { .mobile-menu-btn { display: none !important; } .mobile-menu { display: none !important; } }\
    .nav-dropdown-item:hover { background: rgba(255,255,255,0.05) !important; color: #fff !important; }\
  "}</style>;
}

/* ─── NAVBAR — Matches Crossbar 3-tier structure ─── */
function Navbar({nav, curPage}) {
  var m = useState(false); var menuOpen = m[0]; var setMenuOpen = m[1];
  var d = useState(null); var openDrop = d[0]; var setOpenDrop = d[1];

  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000}}>
      {/* Tier 1: Top bar — Account links + Crossbar */}
      <div className="top-bar" style={{background:C.navy,padding:"6px 0"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:16,alignItems:"center"}}>
            <span style={{fontFamily:F.b,fontSize:12,color:C.w,textTransform:"uppercase",letterSpacing:1}}>Columbus Warrior Hockey</span>
            <a href="https://www.facebook.com/ColumbusWarriorHockey/" target="_blank" rel="noopener noreferrer" style={{color:C.w,fontSize:14}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/columbuswarriorhockey" target="_blank" rel="noopener noreferrer" style={{color:C.w,fontSize:14}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <img src={IMG.usah} alt="USA Hockey" style={{height:22}} />
            <img src={IMG.midam} alt="Mid-Am" style={{height:22}} />
          </div>
        </div>
      </div>

      {/* Tier 2: Main nav — Logo + Links + Registration (olive like Crossbar) */}
      <div style={{background:C.olive,borderTop:"2px solid "+C.red}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{cursor:"pointer",padding:"12px 0",borderRight:"1px solid rgba(255,255,255,0.1)",paddingRight:20}} onClick={function(){nav("home");setMenuOpen(false)}}>
            <img src={IMG.logo} alt="CWH" style={{height:60}} />
          </div>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{display:"flex",gap:0,alignItems:"center"}}>
            {NAV_ITEMS.map(function(item, i) {
              return (
                <div key={i} style={{position:"relative"}}
                  onMouseEnter={function(){if(item.ch) setOpenDrop(i)}}
                  onMouseLeave={function(){setOpenDrop(null)}}>
                  <button onClick={function(){if(item.p){nav(item.p)}else{setOpenDrop(openDrop===i?null:i)}}}
                    style={{background:"none",border:"none",cursor:"pointer",padding:"18px 14px",fontFamily:F.h,fontSize:18,fontWeight:400,color:C.w,textTransform:"uppercase",letterSpacing:2}}>
                    {item.label}
                  </button>
                  {item.ch && openDrop===i && (
                    <div onMouseEnter={function(){setOpenDrop(i)}} onMouseLeave={function(){setOpenDrop(null)}}
                      style={{position:"absolute",top:"100%",left:0,background:C.olive,border:"none",borderTop:"2px solid "+C.red,minWidth:260,padding:"8px 0",zIndex:100,boxShadow:"0 8px 24px rgba(0,0,0,0.3)"}}>
                      {item.ch.map(function(c, j) {
                        return (
                          <button key={j} className="nav-dropdown-item" onClick={function(){nav(c.p);setOpenDrop(null)}}
                            style={{display:"block",width:"100%",textAlign:"left",background:"none",border:"none",cursor:"pointer",padding:"10px 20px",fontFamily:F.b,fontSize:14,color:C.w}}>
                            {c.l}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <a href={FORMS.reg} target="_blank" rel="noopener noreferrer" style={{marginLeft:12,padding:"12px 24px",background:C.navy,color:C.w,fontFamily:F.h,fontSize:16,fontWeight:400,textTransform:"uppercase",letterSpacing:2,textDecoration:"none",border:"none",borderRadius:24,display:"flex",alignItems:"center",gap:8}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              Registration
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="mobile-menu-btn" onClick={function(){setMenuOpen(!menuOpen)}} style={{background:"none",border:"none",cursor:"pointer",padding:8,flexDirection:"column",gap:5}}>
            <div style={{width:24,height:2,background:C.w,transition:"all .3s",transform:menuOpen?"rotate(45deg) translateY(7px)":"none"}} />
            <div style={{width:24,height:2,background:C.w,transition:"all .3s",opacity:menuOpen?0:1}} />
            <div style={{width:24,height:2,background:C.w,transition:"all .3s",transform:menuOpen?"rotate(-45deg) translateY(-7px)":"none"}} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{background:C.navy,borderTop:"2px solid "+C.red,maxHeight:"80vh",overflowY:"auto",padding:"8px 0"}}>
          <a href={FORMS.reg} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"14px 20px",fontFamily:F.h,fontSize:18,color:C.w,textDecoration:"none",letterSpacing:2,borderBottom:"1px solid rgba(255,255,255,0.1)"}}>Registration</a>
          {NAV_ITEMS.map(function(item, i) {
            return (
              <div key={i}>
                <button onClick={function(){if(item.p){nav(item.p);setMenuOpen(false)}else{setOpenDrop(openDrop===i?null:i)}}}
                  style={{display:"block",width:"100%",textAlign:"left",background:"none",border:"none",borderBottom:"1px solid rgba(255,255,255,0.05)",cursor:"pointer",padding:"14px 20px",fontFamily:F.h,fontSize:18,color:C.w,textTransform:"uppercase",letterSpacing:2}}>
                  {item.label} {item.ch && (openDrop===i ? " \u25B4" : " \u25BE")}
                </button>
                {item.ch && openDrop===i && item.ch.map(function(c, j) {
                  return (
                    <button key={j} onClick={function(){nav(c.p);setMenuOpen(false);setOpenDrop(null)}}
                      style={{display:"block",width:"100%",textAlign:"left",background:"none",border:"none",cursor:"pointer",padding:"12px 20px 12px 40px",fontFamily:F.b,fontSize:14,color:C.g4,borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
                      {c.l}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
}

function PageWrap({children, title, sub}) {
  return (
    <div style={{padding:"120px 16px 60px"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        {title && <div>
          <h1 style={{fontFamily:F.h,fontSize:36,fontWeight:400,color:C.navy,textTransform:"uppercase",letterSpacing:3,margin:0}}>{title}</h1>
          {sub && <p style={{fontFamily:F.b,fontSize:15,color:C.g6,marginTop:8,lineHeight:1.7}}>{sub}</p>}
          <div style={{width:50,height:3,background:C.red,margin:"16px 0 28px",borderRadius:0}} />
        </div>}
        {children}
      </div>
    </div>
  );
}

/* ═══ HOMEPAGE ═══ */
function HomePage({nav:n}) {
  var mn = useState([]); var mondayNews = mn[0]; var setMondayNews = mn[1];
  var me = useState([]); var mondayEvents = me[0]; var setMondayEvents = me[1];
  var lb = useState(null); var leaderboard = lb[0]; var setLeaderboard = lb[1];
  useEffect(function() {
    fetch("/data/news.json").then(function(r){return r.json()}).then(function(d){
      if (d.articles) setMondayNews(d.articles);
    }).catch(function(){});
    fetch("/data/events.json").then(function(r){return r.json()}).then(function(d){
      if (d.events) setMondayEvents(d.events);
    }).catch(function(){});
    fetch("/data/leaderboard.json").then(function(r){return r.json()}).then(function(d){
      setLeaderboard(d);
    }).catch(function(){});
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{position:"relative",marginTop:110,height:450,overflow:"hidden"}}>
        <img src={IMG.hero} alt="Columbus Warriors" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center bottom",display:"block"}} />
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.25)"}} />
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.6))",padding:"40px 20px 24px",textAlign:"center"}}>
          <img src={IMG.logo} alt="CWH" style={{width:220,marginBottom:8}} />
          <div style={{fontFamily:F.h,fontSize:22,fontWeight:400,color:C.w,textTransform:"uppercase",letterSpacing:6}}>"From the Rink to Resilience"</div>
        </div>
      </section>

      {/* CTA GRID — 4-column, alternating navy/olive like Crossbar */}
      <section style={{padding:"50px 0",background:C.g1}}>
        <div className="cta-grid" style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:24}}>
          {[
            {label:"Become a Player", href:FORMS.reg, style:1},
            {label:"Become a Sponsor", href:"#", style:2, action:function(){n("become-sponsor")}},
            {label:"Make a Donation", href:FORMS.don, style:1},
            {label:"Fundraising Store", href:FORMS.store, style:2},
          ].map(function(cta, i) {
            var overlay = cta.style === 1 ? "rgba(0,41,77,.75)" : "rgba(82,84,65,.75)";
            return (
              <a key={i} href={cta.href} target={cta.action ? undefined : "_blank"} rel="noopener noreferrer"
                onClick={cta.action ? function(e){e.preventDefault();cta.action()} : undefined}
                style={{display:"block",position:"relative",borderRadius:8,overflow:"hidden",paddingBottom:"75%",backgroundImage:"url("+IMG.logo+")",backgroundSize:"65%",backgroundPosition:"center 55%",backgroundRepeat:"no-repeat",backgroundColor:cta.style===1?C.navy:C.olive,textDecoration:"none"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:overlay,display:"flex",alignItems:"flex-start",padding:24}}>
                  <div style={{fontFamily:F.h,fontSize:30,fontWeight:400,color:C.w,textTransform:"uppercase",letterSpacing:2,lineHeight:1.1}}>{cta.label}</div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* SPONSORS */}
      <section style={{padding:"60px 0",background:C.w}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",gap:0,alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
          <div style={{flex:1,textAlign:"center"}}><a href="https://www.moomoocarwash.com/" target="_blank" rel="noopener noreferrer"><img src={IMG.moomoo} alt="Moo Moo" style={{maxWidth:"80%",maxHeight:140}} /></a></div>
          <div style={{flex:1,textAlign:"center"}}><a href="https://www.thechiller.com/" target="_blank" rel="noopener noreferrer"><img src={IMG.chiller} alt="Chiller" style={{maxWidth:"80%",maxHeight:140}} /></a></div>
          <div style={{flex:1,textAlign:"center"}}><a href="https://www.kroger.com/account/communityrewards" target="_blank" rel="noopener noreferrer"><img src={IMG.kroger} alt="Kroger" style={{maxWidth:"80%",maxHeight:140}} /></a></div>
        </div>
      </section>

      {/* PLAYER OF THE WEEK */}
      {leaderboard && leaderboard.playerOfTheWeek && (
        <section style={{padding:"40px 0",background:C.navy}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",gap:24,flexWrap:"wrap",justifyContent:"center"}}>
            <div style={{width:80,height:80,borderRadius:"50%",background:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.h,fontSize:40,color:C.w,flexShrink:0}}>★</div>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:F.h,fontSize:14,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:3}}>Player of the Week</div>
              <div style={{fontFamily:F.h,fontSize:32,color:C.w,textTransform:"uppercase",letterSpacing:2}}>{leaderboard.playerOfTheWeek.name}</div>
              <div style={{fontFamily:F.b,fontSize:16,color:"rgba(255,255,255,0.7)",marginTop:4}}>{leaderboard.playerOfTheWeek.g} Goals • {leaderboard.playerOfTheWeek.a} Assists • {leaderboard.playerOfTheWeek.pts} Points</div>
            </div>
            <a onClick={function(e){e.preventDefault();n("leaderboard")}} href="#" style={{fontFamily:F.h,fontSize:14,color:C.w,textDecoration:"none",textTransform:"uppercase",letterSpacing:2,padding:"10px 20px",border:"1px solid rgba(255,255,255,0.3)",borderRadius:4,cursor:"pointer"}}>View Leaderboard →</a>
          </div>
        </section>
      )}

      {/* NEWS — Grid 3+2 with alternating overlays */}
      <section style={{padding:"80px 0"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <h2 style={{fontFamily:F.h,fontSize:28,fontWeight:400,color:C.g8,textTransform:"uppercase",letterSpacing:2,margin:"0 0 24px"}}>
            Columbus Warrior Hockey News
          </h2>
          <div className="news-top" style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:16}}>
            {NEWS.slice(0,3).map(function(n, i) {
              var ov = n.style===1 ? "rgba(0,41,77,.75)" : "rgba(82,84,65,.75)";
              return (
                <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" style={{position:"relative",borderRadius:8,overflow:"hidden",aspectRatio:"1",cursor:"pointer",display:"block",textDecoration:"none"}}>
                  <img src={n.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",top:0,left:0}} />
                  <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:ov}} />
                  <div style={{position:"relative",zIndex:1,padding:20}}>
                    <div style={{fontFamily:F.b,fontSize:12,color:C.w,textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>
                      {n.date}
                    </div>
                    <h3 style={{fontFamily:F.h,fontSize:26,fontWeight:400,color:C.w,textTransform:"uppercase",lineHeight:1.1,margin:0,letterSpacing:1}}>{n.title}</h3>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="news-bottom" style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:16,marginTop:16}}>
            {NEWS.slice(3).map(function(n, i) {
              var ov = n.style===1 ? "rgba(0,41,77,.75)" : "rgba(82,84,65,.75)";
              return (
                <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" style={{position:"relative",borderRadius:8,overflow:"hidden",aspectRatio:"1",cursor:"pointer",display:"block",textDecoration:"none"}}>
                  <img src={n.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",top:0,left:0}} />
                  <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:ov}} />
                  <div style={{position:"relative",zIndex:1,padding:20}}>
                    <div style={{fontFamily:F.b,fontSize:12,color:C.w,textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>
                      {n.date}
                    </div>
                    <h3 style={{fontFamily:F.h,fontSize:26,fontWeight:400,color:C.w,textTransform:"uppercase",lineHeight:1.1,margin:0,letterSpacing:1}}>{n.title}</h3>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* MONDAY.COM NEWS — Dynamic articles from Monday board */}
      {mondayNews.length > 0 && (
        <section style={{padding:"40px 0",background:C.w}}>
          <div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px"}}>
            <h2 style={{fontFamily:F.h,fontSize:24,fontWeight:400,color:C.navy,textTransform:"uppercase",letterSpacing:2,margin:"0 0 20px"}}>Latest Updates</h2>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {mondayNews.map(function(article, i) {
                return (
                  <div key={i} style={{background:C.g1,borderRadius:8,padding:24,borderLeft:"4px solid "+C.red}}>
                    <div style={{fontFamily:F.b,fontSize:12,color:C.g4,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{article.date || ""}</div>
                    <h3 style={{fontFamily:F.h,fontSize:22,color:C.navy,textTransform:"uppercase",letterSpacing:1,margin:"0 0 8px"}}>{article.title}</h3>
                    {article.excerpt && <p style={{fontFamily:F.b,fontSize:14,color:C.g6,lineHeight:1.7,margin:0}}>{article.excerpt}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* MONDAY.COM EVENTS — Dynamic events from Monday board */}
      {mondayEvents.length > 0 && (
        <section style={{padding:"40px 0",background:C.g1}}>
          <div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px"}}>
            <h2 style={{fontFamily:F.h,fontSize:24,fontWeight:400,color:C.navy,textTransform:"uppercase",letterSpacing:2,margin:"0 0 20px"}}>Upcoming Events</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:16}}>
              {mondayEvents.map(function(evt, i) {
                var isNavy = i % 2 === 0;
                return (
                  <div key={i} style={{background:isNavy ? C.navy : C.olive,borderRadius:8,padding:24,color:C.w}}>
                    <div style={{fontFamily:F.b,fontSize:12,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{evt.date || ""}</div>
                    {evt.status && <div style={{display:"inline-block",padding:"2px 10px",borderRadius:12,background:evt.status==="Upcoming"?"#4ade80":C.g4,color:C.navy,fontFamily:F.b,fontSize:11,fontWeight:600,textTransform:"uppercase",marginBottom:8}}>{evt.status}</div>}
                    <h3 style={{fontFamily:F.h,fontSize:20,color:C.w,textTransform:"uppercase",letterSpacing:1,margin:"8px 0"}}>{evt.name}</h3>
                    {evt.location && <div style={{fontFamily:F.b,fontSize:13,color:"rgba(255,255,255,0.7)",marginBottom:4}}>📍 {evt.location}</div>}
                    {evt.description && <p style={{fontFamily:F.b,fontSize:13,color:"rgba(255,255,255,0.6)",lineHeight:1.6,margin:"8px 0 0"}}>{evt.description}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SOCIAL */}
      <section style={{padding:"40px 16px",background:C.navy,textAlign:"center"}}>
        <h2 style={{fontFamily:F.h,fontSize:22,fontWeight:400,color:C.w,textTransform:"uppercase",letterSpacing:4,margin:"0 0 20px"}}>Follow Columbus Warrior Hockey</h2>
        <div style={{display:"flex",gap:24,justifyContent:"center",alignItems:"center"}}>
          <a href="https://www.facebook.com/ColumbusWarriorHockey/" target="_blank" rel="noopener noreferrer">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/columbuswarriorhockey" target="_blank" rel="noopener noreferrer">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </div>
      </section>
    </div>
  );
}

/* ═══ SUBPAGES ═══ */
function AboutPage() { return <PageWrap title="About Us">
  <h2 style={{fontFamily:F.h,fontSize:24,color:C.navy,letterSpacing:2,margin:"0 0 12px"}}>Mission</h2>
  <p style={{fontFamily:F.b,fontSize:15,color:C.g6,lineHeight:1.8}}>Our mission is to provide honorably discharged service members with service-connected disabilities a therapeutic experience grounded in peer-based support, the cultivation of mental and physical healing, and promotion of physical activity through the sport of hockey.</p>
  <h2 style={{fontFamily:F.h,fontSize:24,color:C.navy,letterSpacing:2,margin:"32px 0 12px"}}>Vision</h2>
  <p style={{fontFamily:F.b,fontSize:15,color:C.g6,lineHeight:1.8}}>Columbus Warrior Hockey envisions a community where veterans rediscover resilience, camaraderie, and purpose through hockey.</p>
  <h2 style={{fontFamily:F.h,fontSize:24,color:C.navy,letterSpacing:2,margin:"32px 0 12px"}}>The Columbus Warrior Way</h2>
  <p style={{fontFamily:F.b,fontSize:15,color:C.g6,lineHeight:1.8}}>We extend beyond traditional disabled hockey programs by incorporating community-based activities for military-connected individuals. We welcome current service members and Gold Star family members in our CAHL teams, stick and puck sessions, and drop-in hockey.</p>
  <div style={{display:"flex",gap:12,marginTop:28,flexWrap:"wrap"}}><Btn href={FORMS.reg}>Join CWH</Btn><Btn href={FORMS.reg} v="olive">Volunteer</Btn></div>
</PageWrap>; }

function LeadershipPage() {
  var ld = useState(null); var leadership = ld[0]; var setLeadership = ld[1];
  useEffect(function() {
    fetch("/data/leadership.json").then(function(r){return r.json()}).then(function(d){
      if (d.sections && d.sections.length > 0) setLeadership(d);
    }).catch(function(){});
  }, []);

  function LeaderCard(props) {
    var m = props.member;
    var vacant = m.name === "Vacant";
    return (
      <div style={{textAlign:"center",padding:16}}>
        {m.photo ? <img src={m.photo} alt={m.name} style={{width:120,height:120,borderRadius:"50%",objectFit:"cover",border:"3px solid "+C.red}} />
          : <div style={{width:120,height:120,borderRadius:"50%",background:vacant?C.g2:C.navy,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",border:"3px solid "+(vacant?C.g2:C.red),fontFamily:F.h,fontSize:32,fontWeight:400,color:vacant?C.g4:C.w}}>{vacant ? "?" : m.name.split(" ").map(function(n){return n[0]}).join("")}</div>}
        <div style={{fontFamily:F.h,fontSize:20,fontWeight:400,color:vacant?C.g4:C.navy,textTransform:"uppercase",marginTop:12,letterSpacing:1}}>{m.name}</div>
        <div style={{fontFamily:F.b,fontSize:12,color:C.red,textTransform:"uppercase",letterSpacing:1,marginTop:2,fontWeight:600}}>{m.title || ""}</div>
        {m.branch && <div style={{fontFamily:F.b,fontSize:13,color:C.g6,marginTop:4}}>{m.branch}</div>}
        {m.serviceYears && <div style={{fontFamily:F.b,fontSize:12,color:C.g4}}>{m.serviceYears}</div>}
        {m.bio && m.name !== "Vacant" && <div style={{fontFamily:F.b,fontSize:12,color:C.g4,marginTop:4,fontStyle:"italic"}}>{m.bio}</div>}
        {m.militaryPhoto && (
          <div style={{marginTop:8}}>
            <img src={m.militaryPhoto} alt={m.name + " service photo"} style={{width:80,height:80,borderRadius:4,objectFit:"cover",opacity:0.8}} />
          </div>
        )}
      </div>
    );
  }

  if (leadership && leadership.sections.length > 0) {
    return <PageWrap title="Leadership">
      {leadership.sections.map(function(section, si) {
        return (
          <div key={si}>
            <h2 style={{fontFamily:F.h,fontSize:24,color:C.navy,letterSpacing:2,margin:(si > 0 ? "36px" : "0") + " 0 20px",textAlign:"center"}}>{section.section}</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
              {section.members.map(function(m, mi) {
                return <LeaderCard key={mi} member={m} />;
              })}
            </div>
          </div>
        );
      })}
    </PageWrap>;
  }

  /* Fallback to hardcoded data if JSON not available */
  return <PageWrap title="Leadership">
    <h2 style={{fontFamily:F.h,fontSize:24,color:C.navy,letterSpacing:2,margin:"0 0 20px"}}>Board of Directors</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
      {BOARD_MEMBERS.map(function(p,i){return <PersonCard key={i} person={p} />})}
    </div>
    <h2 style={{fontFamily:F.h,fontSize:24,color:C.navy,letterSpacing:2,margin:"36px 0 20px"}}>Operations Staff</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
      {OPS_STAFF.map(function(p,i){return <PersonCard key={i} person={p} />})}
    </div>
    <h2 style={{fontFamily:F.h,fontSize:24,color:C.navy,letterSpacing:2,margin:"36px 0 20px"}}>Coaching Staff</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
      {COACHING.map(function(p,i){return <PersonCard key={i} person={p} />})}
    </div>
  </PageWrap>;
}

function SponsorsPage() { return <PageWrap title="Sponsors" sub="Their generous support makes our mission possible.">
  <img src={IMG.sponsorAll} alt="Sponsors" style={{width:"100%",borderRadius:8}} />
  <div style={{marginTop:28}}><Btn href={FORMS.don}>Become a Sponsor</Btn></div>
</PageWrap>; }

function NewsPage() {
  var mn = useState([]); var mondayNews = mn[0]; var setMondayNews = mn[1];
  useEffect(function() {
    fetch("/data/news.json").then(function(r){return r.json()}).then(function(d){
      if (d.articles) setMondayNews(d.articles);
    }).catch(function(){});
  }, []);

  return <PageWrap title="News">
  {/* Monday.com articles first */}
  {mondayNews.length > 0 && mondayNews.map(function(article, i) {
    return (
      <div key={"m"+i} style={{background:C.g1,borderRadius:8,padding:24,marginBottom:16,borderLeft:"4px solid "+C.red}}>
        <div style={{fontFamily:F.b,fontSize:12,color:C.g4,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{article.date || ""}</div>
        <h3 style={{fontFamily:F.h,fontSize:22,color:C.navy,textTransform:"uppercase",letterSpacing:1,margin:"0 0 8px"}}>{article.title}</h3>
        {article.excerpt && <p style={{fontFamily:F.b,fontSize:14,color:C.g6,lineHeight:1.7,margin:0}}>{article.excerpt}</p>}
      </div>
    );
  })}
  {/* Crossbar articles */}
  {NEWS.map(function(n,i) {
    var ov = n.style===1 ? "rgba(0,41,77,.75)" : "rgba(82,84,65,.75)";
    return (
      <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" style={{position:"relative",borderRadius:8,overflow:"hidden",minHeight:200,marginBottom:16,display:"block",textDecoration:"none"}}>
        <img src={n.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",top:0,left:0}} />
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:ov}} />
        <div style={{position:"relative",zIndex:1,padding:24,minHeight:200,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div style={{fontFamily:F.b,fontSize:12,color:C.w,textTransform:"uppercase",letterSpacing:1.5,marginBottom:6}}>{n.date}</div>
          <h3 style={{fontFamily:F.h,fontSize:24,fontWeight:400,color:C.w,textTransform:"uppercase",lineHeight:1.1,margin:0,letterSpacing:1}}>{n.title}</h3>
        </div>
      </a>
    );
  })}
</PageWrap>; }

function TeamPage({team}) {
  var t = TEAMS.find(function(x){return x.id===team}) || TEAMS[0];
  var st = useState(null); var stats = st[0]; var setStats = st[1];
  var rs = useState(null); var roster = rs[0]; var setRoster = rs[1];
  var rv = useState("photo"); var rosterView = rv[0]; var setRosterView = rv[1];
  var dataFile = team === "team-c" ? "/data/stats-cahl-c.json" : team === "team-d" ? "/data/stats-cahl-d.json" : null;
  var rosterFile = team === "team-c" ? "/data/roster-cahl-c.json" : team === "team-d" ? "/data/roster-cahl-d.json" : null;
  
  useEffect(function() {
    if (dataFile) {
      fetch(dataFile).then(function(r){return r.json()}).then(function(d){setStats(d)}).catch(function(){setStats(null)});
    }
    if (rosterFile) {
      fetch(rosterFile).then(function(r){return r.json()}).then(function(d){setRoster(d)}).catch(function(){setRoster(null)});
    }
  }, [dataFile, rosterFile]);

  /* Placeholder SVG for players without photos */
  function PlayerPlaceholder() {
    return (
      <svg viewBox="0 0 200 200" style={{width:"100%",height:"100%",background:"#e5e7eb",borderRadius:"50%"}}>
        <circle cx="100" cy="75" r="35" fill="#9ca3af" />
        <ellipse cx="100" cy="170" rx="55" ry="45" fill="#9ca3af" />
      </svg>
    );
  }

  function RosterSection() {
    if (!roster || !roster.players || roster.players.length === 0) return null;
    return (
      <div style={{marginBottom:40}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h2 style={{fontFamily:F.h,fontSize:22,color:C.navy,letterSpacing:2,margin:0}}>Roster</h2>
          <div style={{display:"flex",borderRadius:20,overflow:"hidden",border:"2px solid "+C.navy}}>
            <button onClick={function(){setRosterView("photo")}} style={{padding:"6px 14px",background:rosterView==="photo"?C.navy:"transparent",color:rosterView==="photo"?C.w:C.navy,border:"none",cursor:"pointer",fontFamily:F.b,fontSize:13,fontWeight:600}}>Photos</button>
            <button onClick={function(){setRosterView("table")}} style={{padding:"6px 14px",background:rosterView==="table"?C.navy:"transparent",color:rosterView==="table"?C.w:C.navy,border:"none",cursor:"pointer",fontFamily:F.b,fontSize:13,fontWeight:600}}>List</button>
          </div>
        </div>
        {rosterView === "photo" ? (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))",gap:20}}>
            {roster.players.map(function(p, i) {
              return (
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{position:"relative",width:140,height:140,margin:"0 auto"}}>
                    {p.photo ? (
                      <img src={p.photo} alt={p.first+" "+p.last} style={{width:140,height:140,borderRadius:"50%",objectFit:"cover"}} />
                    ) : (
                      <PlayerPlaceholder />
                    )}
                    <div style={{position:"absolute",bottom:0,right:8,width:36,height:36,borderRadius:"50%",background:C.navy,color:C.w,fontFamily:F.h,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>{p.jersey || "#"}</div>
                  </div>
                  <div style={{fontFamily:F.h,fontSize:14,color:C.g8,textTransform:"uppercase",letterSpacing:1,marginTop:8}}>{p.first}</div>
                  <div style={{fontFamily:F.h,fontSize:20,color:C.navy,textTransform:"uppercase",letterSpacing:1,lineHeight:1}}>{p.last}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{borderRadius:8,overflow:"hidden"}}>
            <table style={{width:"100%",borderCollapse:"collapse",background:C.w}}>
              <thead><tr style={{background:C.g1,borderBottom:"2px solid "+C.g2}}>
                <th style={{padding:"10px 14px",fontFamily:F.h,fontSize:14,letterSpacing:2,color:C.navy,textAlign:"left",width:50}}>#</th>
                <th style={{padding:"10px 14px",fontFamily:F.h,fontSize:14,letterSpacing:2,color:C.navy,textAlign:"left"}}>First</th>
                <th style={{padding:"10px 14px",fontFamily:F.h,fontSize:14,letterSpacing:2,color:C.navy,textAlign:"left"}}>Last</th>
              </tr></thead>
              <tbody>{roster.players.map(function(p, i) {
                return (
                  <tr key={i} style={{borderBottom:"1px solid "+C.g2}}>
                    <td style={{padding:"10px 14px",fontFamily:F.b,fontSize:14,color:C.g8,fontWeight:600}}>{p.jersey}</td>
                    <td style={{padding:"10px 14px",fontFamily:F.b,fontSize:14,color:C.g8}}>{p.first}</td>
                    <td style={{padding:"10px 14px",fontFamily:F.b,fontSize:14,color:C.g8,fontWeight:600}}>{p.last}</td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  function StatsTable({title, players, isGoalie}) {
    if (!players || players.length === 0) return null;
    var skaterCols = ["#","Name","Pos","GP","G","A","PTS","PIM"];
    var goalieCols = ["#","Name","Pos","GP","W","L","OTL","GA","GAA"];
    var cols = isGoalie ? goalieCols : skaterCols;
    return (
      <div style={{marginBottom:32}}>
        <h2 style={{fontFamily:F.h,fontSize:22,color:C.navy,letterSpacing:2,margin:"0 0 12px"}}>{title}</h2>
        <div style={{borderRadius:8,overflow:"hidden",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:500,background:C.navy}}>
            <thead><tr style={{background:"rgba(183,35,44,0.25)"}}>
              {cols.map(function(h,i){return <th key={i} style={{padding:"10px 12px",fontFamily:F.h,fontSize:14,fontWeight:400,textTransform:"uppercase",letterSpacing:2,color:C.w,textAlign:i<3?"left":"center",whiteSpace:"nowrap"}}>{h}</th>})}
            </tr></thead>
            <tbody>{players.map(function(p,i) {
              return (
                <tr key={i} style={{borderTop:"1px solid rgba(255,255,255,0.08)",background:i%2===0?"transparent":"rgba(255,255,255,0.03)"}}>
                  <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:13,color:C.g4,textAlign:"left"}}>{p.jersey}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.w,fontWeight:600}}>{p.name}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:12,color:C.g4}}>{p.pos}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g4,textAlign:"center"}}>{p.gp}</td>
                  {isGoalie ? (
                    <>
                      <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g4,textAlign:"center"}}>{p.w}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g4,textAlign:"center"}}>{p.l}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g4,textAlign:"center"}}>{p.otl}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g4,textAlign:"center"}}>{p.ga}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.h,fontSize:16,color:C.w,textAlign:"center"}}>{p.gaa}</td>
                    </>
                  ) : (
                    <>
                      <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g4,textAlign:"center"}}>{p.g}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g4,textAlign:"center"}}>{p.a}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.h,fontSize:16,color:C.w,textAlign:"center"}}>{p.pts}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g4,textAlign:"center"}}>{p.pim}</td>
                    </>
                  )}
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      </div>
    );
  }

  /* DV Warriors — dedicated page with no ChillerStats */
  if (team === "team-dv") {
    return <PageWrap title="DV - Columbus Warriors" sub="USA Hockey Warrior Discipline — Adaptive hockey for disabled veterans">
      {/* Hero banner */}
      <div style={{background:C.navy,borderRadius:12,padding:"40px 32px",marginBottom:32,position:"relative",overflow:"hidden"}}>
        <img src={IMG.logo} alt="" style={{position:"absolute",right:-30,bottom:-30,width:200,opacity:0.1}} />
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"inline-block",background:"#c8a84e",color:C.navy,fontFamily:F.h,fontSize:13,letterSpacing:2,padding:"4px 16px",borderRadius:4,textTransform:"uppercase",marginBottom:16}}>USA Hockey Warrior Hockey</div>
          <h2 style={{fontFamily:F.h,fontSize:36,color:C.w,textTransform:"uppercase",letterSpacing:2,margin:"0 0 16px",lineHeight:1.1}}>From the Rink to Resilience</h2>
          <p style={{fontFamily:F.b,fontSize:16,color:"rgba(255,255,255,0.8)",lineHeight:1.8,maxWidth:700,margin:0}}>USA Hockey's Warrior Hockey Discipline is dedicated to injured and disabled U.S. military veterans who have served our country and play the sport of ice hockey. The Columbus Warriors represent Ohio on the national stage.</p>
        </div>
      </div>

      {/* Eligibility & Info cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:20,marginBottom:32}}>
        <div style={{background:C.w,borderRadius:8,padding:24,border:"1px solid "+C.g2,borderTop:"4px solid #c8a84e"}}>
          <h3 style={{fontFamily:F.h,fontSize:20,color:C.navy,textTransform:"uppercase",letterSpacing:1,margin:"0 0 12px"}}>Eligibility</h3>
          <p style={{fontFamily:F.b,fontSize:14,color:C.g6,lineHeight:1.7,margin:0}}>Open to U.S. military veterans with a 10% or higher VA disability rating, or recipients of the Purple Heart. All skill levels welcome — from first-timers to experienced players.</p>
        </div>
        <div style={{background:C.w,borderRadius:8,padding:24,border:"1px solid "+C.g2,borderTop:"4px solid "+C.navy}}>
          <h3 style={{fontFamily:F.h,fontSize:20,color:C.navy,textTransform:"uppercase",letterSpacing:1,margin:"0 0 12px"}}>National Events</h3>
          <p style={{fontFamily:F.b,fontSize:14,color:C.g6,lineHeight:1.7,margin:0}}>USA Hockey hosts two national Warrior Hockey events each season. The Columbus Warriors compete against teams from across the country, building camaraderie and competitive spirit.</p>
        </div>
        <div style={{background:C.w,borderRadius:8,padding:24,border:"1px solid "+C.g2,borderTop:"4px solid "+C.red}}>
          <h3 style={{fontFamily:F.h,fontSize:20,color:C.navy,textTransform:"uppercase",letterSpacing:1,margin:"0 0 12px"}}>Our Mission</h3>
          <p style={{fontFamily:F.b,fontSize:14,color:C.g6,lineHeight:1.7,margin:0}}>Provide veterans with meaningful peer-based support networks, encourage a healthier lifestyle through physical activity, and offer a therapeutic experience that contributes to both mental and physical healing.</p>
        </div>
      </div>

      {/* Recent highlights */}
      <div style={{marginBottom:32}}>
        <h2 style={{fontFamily:F.h,fontSize:22,color:C.navy,letterSpacing:2,margin:"0 0 16px"}}>Recent Highlights</h2>
        <a href="https://www.columbuswarriorhockey.org/news/columbus-warriors-debut-at-the-guardians-cup-in-rochester/26965" target="_blank" rel="noopener noreferrer" style={{display:"block",background:C.g1,borderRadius:8,padding:24,borderLeft:"4px solid #c8a84e",textDecoration:"none",marginBottom:12}}>
          <div style={{fontFamily:F.b,fontSize:12,color:C.g4,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>March 2026</div>
          <h3 style={{fontFamily:F.h,fontSize:20,color:C.navy,textTransform:"uppercase",letterSpacing:1,margin:"0 0 8px"}}>Columbus Warriors Debut at the Guardian's Cup in Rochester</h3>
          <p style={{fontFamily:F.b,fontSize:14,color:C.g6,margin:0}}>The Columbus Warriors competed in their first national tournament, representing Ohio at the Guardian's Cup in Rochester, NY.</p>
        </a>
      </div>

      {/* How to join */}
      <div style={{background:C.olive,borderRadius:12,padding:"32px 28px",marginBottom:32}}>
        <h2 style={{fontFamily:F.h,fontSize:24,color:C.w,textTransform:"uppercase",letterSpacing:2,margin:"0 0 16px"}}>How to Join</h2>
        <div style={{fontFamily:F.b,fontSize:15,color:"rgba(255,255,255,0.85)",lineHeight:1.8}}>
          <p style={{margin:"0 0 16px"}}>Ready to hit the ice? Here's how to get started:</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:16}}>
            {[
              {step:"1", title:"Register", desc:"Complete our online registration form to express your interest."},
              {step:"2", title:"Verify", desc:"Submit your service verification document (DD-214 or VA rating letter)."},
              {step:"3", title:"Gear Up", desc:"We'll help you get equipment. Loaner gear is available for new players."},
              {step:"4", title:"Play", desc:"Join practices, games, and national events with your fellow warriors."},
            ].map(function(s, i) {
              return (
                <div key={i} style={{background:"rgba(255,255,255,0.1)",borderRadius:8,padding:16,textAlign:"center"}}>
                  <div style={{fontFamily:F.h,fontSize:32,color:"#c8a84e",marginBottom:4}}>{s.step}</div>
                  <div style={{fontFamily:F.h,fontSize:16,color:C.w,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{s.title}</div>
                  <div style={{fontFamily:F.b,fontSize:13,color:"rgba(255,255,255,0.7)"}}>{s.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{marginBottom:32}}>
        <h2 style={{fontFamily:F.h,fontSize:22,color:C.navy,letterSpacing:2,margin:"0 0 16px"}}>Frequently Asked Questions</h2>
        {[
          {q:"Can I play on both the DV team and a CAHL team?", a:"Yes! You can participate in both the Warrior Hockey team and a C or D league team."},
          {q:"What if I can't commit to a full season?", a:"Check out our Drop-In or Stick & Puck sessions if you want to hit the ice on a more casual basis."},
          {q:"I've never played hockey before. Can I still join?", a:"Absolutely! All skill levels are welcome. Sign up for our D League team or attend a skills development session to get started."},
          {q:"Do I need my own equipment?", a:"We have loaner gear available for new players. As you get more involved, we can help you find affordable equipment."},
          {q:"What if I don't have a disability rating?", a:"You can still participate in our C or D league teams even without a disability rating. If you have a Purple Heart, you may sign up for the Warrior Hockey team regardless of rating."},
        ].map(function(faq, i) {
          return (
            <div key={i} style={{background:C.w,borderRadius:8,padding:20,marginBottom:8,border:"1px solid "+C.g2}}>
              <div style={{fontFamily:F.h,fontSize:16,color:C.navy,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{faq.q}</div>
              <div style={{fontFamily:F.b,fontSize:14,color:C.g6,lineHeight:1.7}}>{faq.a}</div>
            </div>
          );
        })}
      </div>

      {/* CTA buttons */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <Btn href={FORMS.reg}>Register Now</Btn>
        <Btn href="https://www.usahockey.com/warriorhockey" v="olive">USA Hockey Warriors</Btn>
        <Btn href="mailto:info@columbuswarriorhockey.org" v="red">Contact Us</Btn>
      </div>
    </PageWrap>;
  }

  return <PageWrap title={t.name} sub={t.desc}>
    <div style={{display:"flex",gap:12,marginBottom:28,flexWrap:"wrap"}}>
      <Btn href={"https://chillerstats.com/team/stats.cfm?TeamID=" + (stats ? stats.teamId : "")}>View on ChillerStats</Btn>
      <Btn href={"https://chillerstats.com/team/schedule.cfm?TeamID=" + (stats ? stats.teamId : "")} v="olive">Schedule</Btn>
      <Btn href={"https://chillerstats.com/team/standings.cfm?TeamID=" + (stats ? stats.teamId : "")} v="olive">Standings</Btn>
    </div>
    {stats && stats.season && <p style={{fontFamily:F.b,fontSize:14,color:C.g4,marginBottom:20}}>Season: {stats.season} | Last updated: {new Date(stats.updated).toLocaleDateString()}</p>}
    <RosterSection />
    {stats ? (
      <div>
        <StatsTable title="Forwards" players={stats.forwards} />
        <StatsTable title="Defense" players={stats.defense} />
        <StatsTable title="Goalies" players={stats.goalies} isGoalie={true} />
        {stats.stickAndPuck && stats.stickAndPuck.length > 0 && (
          <div style={{marginTop:40}}>
            <h2 style={{fontFamily:F.h,fontSize:22,color:C.navy,letterSpacing:2,margin:"0 0 12px"}}>Stick & Puck Schedule</h2>
            <div style={{background:C.g1,borderRadius:8,padding:16}}>
              {stats.stickAndPuck.map(function(s,i){return <div key={i} style={{fontFamily:F.b,fontSize:14,color:C.g6,padding:"6px 0",borderBottom:i<stats.stickAndPuck.length-1?"1px solid "+C.g2:"none"}}>{s.rink} — {s.date} at {s.time}</div>})}
            </div>
          </div>
        )}
        {stats.dropIn && stats.dropIn.length > 0 && (
          <div style={{marginTop:24}}>
            <h2 style={{fontFamily:F.h,fontSize:22,color:C.navy,letterSpacing:2,margin:"0 0 12px"}}>Drop-In Schedule</h2>
            <div style={{background:C.g1,borderRadius:8,padding:16}}>
              {stats.dropIn.map(function(s,i){return <div key={i} style={{fontFamily:F.b,fontSize:14,color:C.g6,padding:"6px 0",borderBottom:i<stats.dropIn.length-1?"1px solid "+C.g2:"none"}}>{s.rink} — {s.date} at {s.time}</div>})}
            </div>
          </div>
        )}
      </div>
    ) : (
      <p style={{fontFamily:F.b,fontSize:14,color:C.g4,fontStyle:"italic"}}>Stats data loading... Run the ChillerStats scraper to populate.</p>
    )}
  </PageWrap>;
}

function ProgramPage({page}) {
  var data = {
    "cahl":{t:"Chiller Adult Hockey League",d:"CWH fields teams in C and D divisions, competing year-round with playoffs.",items:["CAHL C South - Intermediate competitive","CAHL D - Recreational level","Year-round seasons with playoffs","Games at Chiller North, Easton, Dublin"]},
    "disabled-hockey":{t:"Disabled Hockey",d:"Adaptive hockey for disabled veterans with 10%+ VA rating or Purple Heart.",items:["Adaptive equipment available","Trained volunteer coaches","Monthly practices","Peer-based support","No experience required"]},
    "stick-puck":{t:"Stick & Puck / Drop-In Hockey",d:"Open ice sessions and casual pickup games. All levels welcome.",items:["Stick & Puck - skill sessions","Drop-In - casual games","No commitment required","Check schedule for times"]},
  };
  var d = data[page] || data["cahl"];
  return <PageWrap title={d.t} sub={d.d}>
    <ul style={{fontFamily:F.b,fontSize:15,color:C.g6,lineHeight:2.2,paddingLeft:20}}>{d.items.map(function(it,i){return <li key={i}>{it}</li>})}</ul>
    <div style={{marginTop:24}}><Btn href={FORMS.reg}>Register Now</Btn></div>
  </PageWrap>;
}

function SchedulePage() {
  var sc = useState(null); var schedule = sc[0]; var setSchedule = sc[1];
  useEffect(function() {
    fetch("/data/schedule.json").then(function(r){return r.json()}).then(function(d){setSchedule(d)}).catch(function(){setSchedule(null)});
  }, []);

  return <PageWrap title="Schedule" sub="Upcoming games, practices, and events">
    {schedule && schedule.games && schedule.games.length > 0 ? (
      <div>
        <p style={{fontFamily:F.b,fontSize:13,color:C.g4,marginBottom:16}}>Last updated: {new Date(schedule.updated).toLocaleString()}</p>
        <div style={{borderRadius:8,overflow:"hidden",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:700,background:C.navy}}>
            <thead><tr style={{background:"rgba(183,35,44,0.25)"}}>
              {["Date","Time","H/A","Opponent","Location","Score","W/L"].map(function(h,i){return <th key={i} style={{padding:"10px 14px",fontFamily:F.h,fontSize:14,fontWeight:400,textTransform:"uppercase",letterSpacing:2,color:C.w,textAlign:"left",whiteSpace:"nowrap"}}>{h}</th>})}
            </tr></thead>
            <tbody>{schedule.games.map(function(g,i) {
              var isWin = g.result === "W";
              var isLoss = g.result === "L";
              return (
                <tr key={i} style={{borderTop:"1px solid rgba(255,255,255,0.08)",background:i%2===0?"transparent":"rgba(255,255,255,0.03)"}}>
                  <td style={{padding:"10px 14px",fontFamily:F.b,fontSize:14,color:C.w,fontWeight:600,whiteSpace:"nowrap"}}>{g.date}</td>
                  <td style={{padding:"10px 14px",fontFamily:F.b,fontSize:14,color:C.g4,whiteSpace:"nowrap"}}>{g.time}</td>
                  <td style={{padding:"10px 14px",fontFamily:F.h,fontSize:14,color:g.homeAway==="Home"?"#4ade80":C.g4,textAlign:"center"}}>{g.homeAway==="Home"?"H":"A"}</td>
                  <td style={{padding:"10px 14px",fontFamily:F.b,fontSize:14,color:C.w}}>{g.opponent}</td>
                  <td style={{padding:"10px 14px",fontFamily:F.b,fontSize:13,color:C.g4}}>{g.location}</td>
                  <td style={{padding:"10px 14px",fontFamily:F.b,fontSize:14,color:C.w,textAlign:"center"}}>{g.score || "—"}</td>
                  <td style={{padding:"10px 14px",fontFamily:F.h,fontSize:16,textAlign:"center",color:isWin?"#4ade80":isLoss?"#f87171":C.g4}}>{g.result || "—"}</td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      </div>
    ) : (
      <div style={{padding:32,background:C.g1,borderRadius:8,textAlign:"center"}}>
        <p style={{fontFamily:F.b,fontSize:15,color:C.g6}}>Loading schedule data...</p>
      </div>
    )}
  </PageWrap>;
}

function ResourcePage({page}) {
  var pages = {
    "mental-health":{t:"Mental Health Resources",c:"CWH is committed to supporting the mental health of all members.",links:[{l:"Veterans Crisis Line",u:"https://www.veteranscrisisline.net/"},{l:"SAMHSA Helpline",u:"https://www.samhsa.gov/find-help/national-helpline"},{l:"VA Mental Health",u:"https://www.mentalhealth.va.gov/"}]},
    "reg-guides":{t:"Registration Process Guides",c:"Step-by-step guides for registering with CWH, USA Hockey, and CAHL."},
    "players-corner":{t:"Players Corner",c:"Resources, tips, and community content for CWH players."},
    "coaching":{t:"Coaching for CWH",c:"Interested in coaching? CWH needs volunteer coaches. Contact us to get involved."},
    "become-sponsor":{t:"Become a Sponsor",c:"Partner with CWH and directly impact veterans' lives. Contact info@columbuswarriorhockey.org."},
    "contributor":{t:"Become a Community Contributor",c:"Support CWH beyond financial sponsorship. Volunteer time, donate equipment, or help spread the word."},
  };
  var d = pages[page] || {t:page,c:"Coming soon."};
  return <PageWrap title={d.t}>
    <p style={{fontFamily:F.b,fontSize:15,color:C.g6,lineHeight:1.8}}>{d.c}</p>
    {d.links && <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:10}}>
      {d.links.map(function(l,i){return <a key={i} href={l.u} target="_blank" rel="noopener noreferrer" style={{fontFamily:F.b,fontSize:15,color:C.navy,textDecoration:"none",fontWeight:600}}>{"-> "+l.l}</a>})}
    </div>}
  </PageWrap>;
}

/* ─── PHOTO GALLERY PAGE ─── */
function GalleryPage() {
  var ph = useState([]); var photos = ph[0]; var setPhotos = ph[1];
  var ld = useState(true); var loading = ld[0]; var setLoading = ld[1];
  var sel = useState(null); var selected = sel[0]; var setSelected = sel[1];

  useEffect(function() {
    fetch("/data/gallery.json").then(function(r){return r.json()}).then(function(d){
      setPhotos(d.photos || []);
      setLoading(false);
    }).catch(function(){setLoading(false)});
  }, []);

  return <PageWrap title="Photo Gallery" sub="Game day photos, team events, and community moments.">
    {loading ? (
      <div style={{textAlign:"center",padding:60}}>
        <div style={{fontFamily:F.b,fontSize:16,color:C.g4}}>Loading photos...</div>
      </div>
    ) : photos.length === 0 ? (
      <div style={{textAlign:"center",padding:60}}>
        <div style={{fontFamily:F.b,fontSize:16,color:C.g4}}>Gallery coming soon.</div>
      </div>
    ) : (
      <div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:8}}>
          {photos.map(function(p, i) {
            return (
              <div key={i} onClick={function(){setSelected(i)}} style={{cursor:"pointer",aspectRatio:"1",overflow:"hidden",borderRadius:4,background:C.g1}}>
                <img src={p.url} alt={p.name||""} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .3s"}} onMouseOver={function(e){e.target.style.transform="scale(1.05)"}} onMouseOut={function(e){e.target.style.transform="scale(1)"}} />
              </div>
            );
          })}
        </div>

        {/* Lightbox */}
        {selected !== null && (
          <div onClick={function(){setSelected(null)}} style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.9)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <button onClick={function(e){e.stopPropagation();setSelected(selected > 0 ? selected - 1 : photos.length - 1)}} style={{position:"absolute",left:20,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.2)",border:"none",color:C.w,fontSize:36,padding:"8px 16px",borderRadius:8,cursor:"pointer"}}>‹</button>
            <img src={photos[selected].url} alt="" style={{maxWidth:"90vw",maxHeight:"90vh",objectFit:"contain",borderRadius:8}} onClick={function(e){e.stopPropagation()}} />
            <button onClick={function(e){e.stopPropagation();setSelected(selected < photos.length - 1 ? selected + 1 : 0)}} style={{position:"absolute",right:20,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.2)",border:"none",color:C.w,fontSize:36,padding:"8px 16px",borderRadius:8,cursor:"pointer"}}>›</button>
            <button onClick={function(){setSelected(null)}} style={{position:"absolute",top:20,right:20,background:"none",border:"none",color:C.w,fontSize:32,cursor:"pointer"}}>✕</button>
            <div style={{position:"absolute",bottom:20,color:"rgba(255,255,255,0.5)",fontFamily:F.b,fontSize:14}}>{(selected+1) + " / " + photos.length}</div>
          </div>
        )}
      </div>
    )}
  </PageWrap>;
}

/* ─── LINEUP / ATTENDANCE PAGE ─── */
function LineupPage() {
  var at = useState(null); var attendance = at[0]; var setAttendance = at[1];
  useEffect(function() {
    fetch("/data/attendance.json").then(function(r){return r.json()}).then(function(d){setAttendance(d)}).catch(function(){setAttendance(null)});
  }, []);

  function PlayerBadge(props) {
    var p = props.player;
    var bg = props.bg || C.navy;
    return (
      <div style={{display:"inline-flex",alignItems:"center",gap:8,background:bg,borderRadius:20,padding:"6px 14px 6px 8px",margin:4}}>
        <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.h,fontSize:13,color:C.w}}>{p.jersey || "#"}</div>
        <span style={{fontFamily:F.b,fontSize:13,color:C.w,fontWeight:600}}>{p.name}</span>
      </div>
    );
  }

  return <PageWrap title="Game Lineup" sub="Auto-generated lineups based on player RSVP from Monday.com">
    {!attendance || !attendance.games || attendance.games.length === 0 ? (
      <div style={{padding:40,background:C.g1,borderRadius:8,textAlign:"center"}}>
        <p style={{fontFamily:F.b,fontSize:15,color:C.g6}}>No attendance data yet. Go to the <a href="https://columbuswarriorhockey.monday.com/boards/18415594839" target="_blank" rel="noopener noreferrer" style={{color:C.navy,fontWeight:600}}>Game Attendance board</a> in Monday.com and set RSVPs for upcoming games.</p>
      </div>
    ) : (
      <div style={{display:"flex",flexDirection:"column",gap:32}}>
        {attendance.games.filter(function(game) {
          // Only show games with RSVPs and in the future
          var hasRsvp = game.yes > 0 || game.maybe > 0 || game.no > 0;
          // Parse date from game title like "Jun 14 — CAHL C vs ..."
          var dateMatch = game.game.match(/^([A-Za-z]{3})\s+(\d{1,2})/);
          if (dateMatch) {
            var months = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
            var m = months[dateMatch[1]];
            var d = parseInt(dateMatch[2]);
            if (m !== undefined) {
              var gameDate = new Date(new Date().getFullYear(), m, d);
              var today = new Date(); today.setHours(0,0,0,0);
              if (gameDate < today) return false;
            }
          }
          return hasRsvp;
        }).slice(0, 2).map(function(game, gi) {
          return (
            <div key={gi} style={{background:C.w,borderRadius:12,overflow:"hidden",border:"1px solid "+C.g2}}>
              {/* Game header */}
              <div style={{background:C.navy,padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                <h3 style={{fontFamily:F.h,fontSize:22,color:C.w,textTransform:"uppercase",letterSpacing:1,margin:0}}>{game.game}</h3>
                <div style={{display:"flex",gap:12}}>
                  <span style={{background:"#4ade80",color:C.navy,padding:"4px 12px",borderRadius:12,fontFamily:F.b,fontSize:12,fontWeight:700}}>YES {game.yes}</span>
                  <span style={{background:"#fbbf24",color:C.navy,padding:"4px 12px",borderRadius:12,fontFamily:F.b,fontSize:12,fontWeight:700}}>MAYBE {game.maybe}</span>
                  <span style={{background:"#f87171",color:C.w,padding:"4px 12px",borderRadius:12,fontFamily:F.b,fontSize:12,fontWeight:700}}>NO {game.no}</span>
                  {game.noResponse > 0 && <span style={{background:C.g4,color:C.w,padding:"4px 12px",borderRadius:12,fontFamily:F.b,fontSize:12,fontWeight:700}}>PENDING {game.noResponse}</span>}
                </div>
              </div>

              <div style={{padding:24}}>
                {/* Forward Lines */}
                {game.lineup.forwards.length > 0 && (
                  <div style={{marginBottom:20}}>
                    <h4 style={{fontFamily:F.h,fontSize:16,color:C.navy,textTransform:"uppercase",letterSpacing:2,margin:"0 0 8px"}}>Forward Lines</h4>
                    {game.lineup.forwards.map(function(line, li) {
                      return (
                        <div key={li} style={{marginBottom:8}}>
                          <span style={{fontFamily:F.h,fontSize:13,color:C.g4,marginRight:8}}>LINE {line.line}</span>
                          {line.players.map(function(p, pi) { return <PlayerBadge key={pi} player={p} bg={C.navy} />; })}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Defense Pairs */}
                {game.lineup.defense.length > 0 && (
                  <div style={{marginBottom:20}}>
                    <h4 style={{fontFamily:F.h,fontSize:16,color:C.navy,textTransform:"uppercase",letterSpacing:2,margin:"0 0 8px"}}>Defense Pairs</h4>
                    {game.lineup.defense.map(function(pair, di) {
                      return (
                        <div key={di} style={{marginBottom:8}}>
                          <span style={{fontFamily:F.h,fontSize:13,color:C.g4,marginRight:8}}>PAIR {pair.pair}</span>
                          {pair.players.map(function(p, pi) { return <PlayerBadge key={pi} player={p} bg={C.olive} />; })}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Goalies */}
                {game.lineup.goalies.length > 0 && (
                  <div style={{marginBottom:20}}>
                    <h4 style={{fontFamily:F.h,fontSize:16,color:C.navy,textTransform:"uppercase",letterSpacing:2,margin:"0 0 8px"}}>Goalies</h4>
                    {game.lineup.goalies.map(function(p, pi) { return <PlayerBadge key={pi} player={p} bg={C.red} />; })}
                  </div>
                )}

                {/* Bench (Maybe) */}
                {game.bench.length > 0 && (
                  <div style={{marginBottom:20}}>
                    <h4 style={{fontFamily:F.h,fontSize:16,color:"#b45309",textTransform:"uppercase",letterSpacing:2,margin:"0 0 8px"}}>Bench (Maybe)</h4>
                    {game.bench.map(function(p, pi) { return <PlayerBadge key={pi} player={p} bg="#b45309" />; })}
                  </div>
                )}

                {/* Pending */}
                {game.pending.length > 0 && (
                  <div style={{marginBottom:8}}>
                    <h4 style={{fontFamily:F.h,fontSize:16,color:C.g4,textTransform:"uppercase",letterSpacing:2,margin:"0 0 8px"}}>Awaiting Response</h4>
                    {game.pending.map(function(p, pi) { return <PlayerBadge key={pi} player={p} bg={C.g4} />; })}
                  </div>
                )}

                {game.yes === 0 && game.maybe === 0 && game.noResponse === game.totalPlayers && (
                  <p style={{fontFamily:F.b,fontSize:14,color:C.g4,textAlign:"center",padding:20}}>No RSVPs yet — update attendance in Monday.com</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </PageWrap>;
}

/* ─── SEASON LEADERBOARD ─── */
function LeaderboardPage() {
  var lb = useState(null); var board = lb[0]; var setBoard = lb[1];
  useEffect(function() {
    fetch("/data/leaderboard.json").then(function(r){return r.json()}).then(function(d){setBoard(d)}).catch(function(){});
  }, []);

  function LeaderTable(props) {
    var title = props.title; var players = props.players; var stat = props.stat; var label = props.label;
    if (!players || players.length === 0) return null;
    return (
      <div style={{marginBottom:32}}>
        <h3 style={{fontFamily:F.h,fontSize:20,color:C.navy,textTransform:"uppercase",letterSpacing:2,margin:"0 0 12px"}}>{title}</h3>
        <div style={{borderRadius:8,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse",background:C.w}}>
            <thead><tr style={{background:C.navy}}>
              <th style={{padding:"8px 12px",fontFamily:F.h,fontSize:13,color:C.w,textAlign:"center",width:40}}>#</th>
              <th style={{padding:"8px 12px",fontFamily:F.h,fontSize:13,color:C.w,textAlign:"left"}}>Player</th>
              <th style={{padding:"8px 12px",fontFamily:F.h,fontSize:13,color:C.w,textAlign:"left"}}>Team</th>
              <th style={{padding:"8px 12px",fontFamily:F.h,fontSize:13,color:C.w,textAlign:"center"}}>GP</th>
              <th style={{padding:"8px 12px",fontFamily:F.h,fontSize:13,color:C.w,textAlign:"center"}}>{label}</th>
            </tr></thead>
            <tbody>{players.map(function(p, i) {
              return (
                <tr key={i} style={{borderBottom:"1px solid "+C.g2,background:i===0?"rgba(183,35,44,0.05)":"transparent"}}>
                  <td style={{padding:"8px 12px",fontFamily:F.h,fontSize:16,color:i===0?C.red:C.g4,textAlign:"center",fontWeight:i===0?700:400}}>{i+1}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g8,fontWeight:600}}>{p.name}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:12,color:C.g4}}>{(p.team||"").replace("Columbus Warriors ","").replace("CAHL ","")}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g6,textAlign:"center"}}>{p.gp}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.h,fontSize:18,color:i===0?C.red:C.navy,textAlign:"center"}}>{p[stat]}</td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      </div>
    );
  }

  return <PageWrap title="Season Leaderboard" sub="Top performers across all CWH teams — auto-updated from ChillerStats.">
    {!board ? (
      <div style={{padding:40,textAlign:"center"}}><p style={{fontFamily:F.b,color:C.g4}}>Loading leaderboard...</p></div>
    ) : (
      <div>
        {/* Player of the Week */}
        {board.playerOfTheWeek && (
          <div style={{background:C.navy,borderRadius:12,padding:24,marginBottom:32,display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.h,fontSize:28,color:C.w}}>★</div>
            <div>
              <div style={{fontFamily:F.h,fontSize:14,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:2}}>Player of the Week</div>
              <div style={{fontFamily:F.h,fontSize:28,color:C.w,textTransform:"uppercase",letterSpacing:1}}>{board.playerOfTheWeek.name}</div>
              <div style={{fontFamily:F.b,fontSize:14,color:"rgba(255,255,255,0.7)"}}>{board.playerOfTheWeek.g}G • {board.playerOfTheWeek.a}A • {board.playerOfTheWeek.pts} PTS</div>
            </div>
          </div>
        )}

        {/* Goalie Leaders */}
        {board.goalies && board.goalies.length > 0 && (
          <div style={{marginBottom:32}}>
            <h3 style={{fontFamily:F.h,fontSize:20,color:C.navy,textTransform:"uppercase",letterSpacing:2,margin:"0 0 12px"}}>Goalie Leaders</h3>
            <div style={{borderRadius:8,overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse",background:C.w}}>
                <thead><tr style={{background:C.navy}}>
                  <th style={{padding:"8px 12px",fontFamily:F.h,fontSize:13,color:C.w,textAlign:"center",width:40}}>#</th>
                  <th style={{padding:"8px 12px",fontFamily:F.h,fontSize:13,color:C.w,textAlign:"left"}}>Goalie</th>
                  <th style={{padding:"8px 12px",fontFamily:F.h,fontSize:13,color:C.w,textAlign:"center"}}>GP</th>
                  <th style={{padding:"8px 12px",fontFamily:F.h,fontSize:13,color:C.w,textAlign:"center"}}>W</th>
                  <th style={{padding:"8px 12px",fontFamily:F.h,fontSize:13,color:C.w,textAlign:"center"}}>L</th>
                  <th style={{padding:"8px 12px",fontFamily:F.h,fontSize:13,color:C.w,textAlign:"center"}}>GAA</th>
                </tr></thead>
                <tbody>{board.goalies.map(function(g, i) {
                  return (
                    <tr key={i} style={{borderBottom:"1px solid "+C.g2}}>
                      <td style={{padding:"8px 12px",fontFamily:F.h,fontSize:16,color:C.g4,textAlign:"center"}}>{i+1}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g8,fontWeight:600}}>{g.name}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:C.g6,textAlign:"center"}}>{g.gp}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:"#4ade80",textAlign:"center",fontWeight:600}}>{g.w}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.b,fontSize:14,color:"#f87171",textAlign:"center"}}>{g.l}</td>
                      <td style={{padding:"8px 12px",fontFamily:F.h,fontSize:18,color:C.navy,textAlign:"center"}}>{g.gaa}</td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:24}}>
          <LeaderTable title="Points Leaders" players={board.topPoints} stat="pts" label="PTS" />
          <LeaderTable title="Goal Leaders" players={board.topGoals} stat="g" label="G" />
          <LeaderTable title="Assist Leaders" players={board.topAssists} stat="a" label="A" />
          <LeaderTable title="Penalty Minutes" players={board.topPIM} stat="pim" label="PIM" />
        </div>
      </div>
    )}
  </PageWrap>;
}

/* ─── GAME RECAPS ─── */
function RecapsPage() {
  var rc = useState(null); var recaps = rc[0]; var setRecaps = rc[1];
  useEffect(function() {
    fetch("/data/recaps.json").then(function(r){return r.json()}).then(function(d){setRecaps(d)}).catch(function(){});
  }, []);

  return <PageWrap title="Game Recaps" sub="Auto-generated summaries from completed games.">
    {!recaps || !recaps.recaps || recaps.recaps.length === 0 ? (
      <div style={{padding:40,textAlign:"center"}}><p style={{fontFamily:F.b,color:C.g4}}>No completed games yet this season.</p></div>
    ) : (
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {recaps.recaps.slice().reverse().map(function(r, i) {
          var isWin = r.result === "W";
          var isLoss = r.result === "L";
          return (
            <div key={i} style={{background:C.w,borderRadius:8,overflow:"hidden",border:"1px solid "+C.g2,display:"flex"}}>
              <div style={{width:6,background:isWin?"#4ade80":isLoss?"#f87171":"#fbbf24",flexShrink:0}} />
              <div style={{padding:"16px 20px",flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                  <div>
                    <div style={{fontFamily:F.h,fontSize:18,color:C.navy,textTransform:"uppercase",letterSpacing:1}}>{r.headline}</div>
                    <div style={{fontFamily:F.b,fontSize:13,color:C.g4,marginTop:4}}>{r.date} • {r.location}</div>
                  </div>
                  <div style={{fontFamily:F.h,fontSize:28,color:isWin?"#4ade80":isLoss?"#f87171":C.navy}}>{r.score}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </PageWrap>;
}

/* ─── ICE SCHEDULES PAGE ─── */
function IceSchedulesPage() {
  var schedules = [
    {name:"OSU Ice Rink", desc:"Open skating sessions at The Ohio State University Ice Rink.", url:"https://ohiostatebuckeyes.com/sports/2023/5/24/the-ohio-state-university-ice-rink-open-skating-sessions"},
    {name:"Adult Drop-In Hockey", desc:"Open drop-in sessions for adult players at Chiller locations.", url:"https://www.thechiller.com/hockey/ice_time.cfm?EventTypeID=ADI"},
    {name:"40+ Hockey (TGIF)", desc:"Thursday/Friday drop-in hockey for players 40 and over.", url:"https://www.thechiller.com/hockey/ice_time.cfm?EventTypeID=TGIF"},
    {name:"50+ Hockey", desc:"Drop-in hockey sessions for players 50 and over.", url:"https://www.thechiller.com/hockey/ice_time.cfm?EventTypeID=50DI"},
    {name:"Adult Learn to Play", desc:"Beginner classes for adults learning to play hockey.", url:"https://www.thechiller.com/classes/"},
    {name:"Mastodon Ice Arena", desc:"Full schedule for Mastodon Ice Arena.", url:"https://mastodonicearena.com/schedule/"},
    {name:"Saturday Night Hockey", desc:"Weekly Saturday night drop-in hockey sessions.", url:"https://www.thechiller.com/news.cfm?PostID=141"},
  ];
  return <PageWrap title="Ice Schedules" sub="Community ice schedules around Central Ohio — click any card to view the full schedule.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:16}}>
      {schedules.map(function(s, i) {
        var isNavy = i % 2 === 0;
        return (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{display:"block",position:"relative",background:isNavy ? C.navy : C.olive,borderRadius:8,padding:24,textDecoration:"none",overflow:"hidden",minHeight:160}}>
            <img src={IMG.logo} alt="" style={{position:"absolute",bottom:-20,right:-20,width:120,opacity:0.1}} />
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontFamily:F.h,fontSize:20,color:C.w,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{s.name}</div>
              <div style={{fontFamily:F.b,fontSize:14,color:"rgba(255,255,255,0.7)",lineHeight:1.6}}>{s.desc}</div>
              <div style={{fontFamily:F.h,fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:16,textTransform:"uppercase",letterSpacing:2}}>View Schedule →</div>
            </div>
          </a>
        );
      })}
    </div>
  </PageWrap>;
}

/* ─── FOOTER — 4-column like Crossbar ─── */
function Footer() {
  return (
    <div>
      <footer style={{background:"#2a2a2a",padding:"48px 16px 24px",color:"#ccc"}}>
        <div className="footer-grid" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"180px 1.5fr 1fr 1fr",gap:32,alignItems:"start"}}>
          <div style={{textAlign:"center"}}>
            <img src={IMG.logo} alt="CWH" style={{width:140}} />
          </div>
          <div>
            <h4 style={{fontFamily:F.h,fontSize:16,color:C.w,textTransform:"uppercase",letterSpacing:2,margin:"0 0 12px"}}>About Us</h4>
            <p style={{fontFamily:F.b,fontSize:13,color:"#ccc",lineHeight:1.7,margin:0}}>Columbus Warrior Hockey is a 501(c)(3) non-profit organization that provides veterans with meaningful peer-based support networks, encourages a healthier lifestyle through physical activity, and offers a therapeutic experience that contributes to both mental and physical healing through the sport of hockey.</p>
          </div>
          <div>
            <h4 style={{fontFamily:F.h,fontSize:16,color:C.w,textTransform:"uppercase",letterSpacing:2,margin:"0 0 12px"}}>Contact</h4>
            <p style={{fontFamily:F.b,fontSize:13,color:"#ccc",lineHeight:1.8,margin:0}}>info@columbuswarriorhockey.org<br/>Columbus Warrior Hockey<br/>Powell, OH 43065</p>
          </div>
          <div>
            <h4 style={{fontFamily:F.h,fontSize:16,color:C.w,textTransform:"uppercase",letterSpacing:2,margin:"0 0 12px"}}>Links</h4>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {[{l:"Facebook",u:"https://www.facebook.com/ColumbusWarriorHockey/"},{l:"Instagram",u:"https://www.instagram.com/columbuswarriorhockey"},{l:"USA Hockey",u:"https://www.usahockey.com"},{l:"The Chiller",u:"https://www.thechiller.com"}].map(function(lk,i) {
                return <a key={i} href={lk.u} target="_blank" rel="noopener noreferrer" style={{fontFamily:F.b,fontSize:13,color:"#ccc",textDecoration:"none"}}>{lk.l}</a>;
              })}
            </div>
          </div>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",borderTop:"1px solid rgba(255,255,255,0.1)",marginTop:32,paddingTop:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{fontFamily:F.b,fontSize:12,color:"#999"}}>{"© "+new Date().getFullYear()+" Columbus Warrior Hockey. All Rights Reserved."}</div>
          <div style={{display:"flex",gap:20}}>
            {["Refund Policies","Privacy Policy","Terms & Conditions"].map(function(l,i) {
              return <span key={i} style={{fontFamily:F.b,fontSize:12,color:"#999",cursor:"pointer"}}>{l}</span>;
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══ APP ═══ */
var NS_SCORES = [
  { id:"c", label:"C League Warriors", standing:"C South Division", record:"8-4-1", color:C.bl,
    games:[
      {date:"Jun 5",  time:"7:30 PM", loc:"Chiller North",  opp:"Eagles",       away:false, upcoming:true},
      {date:"Jun 12", time:"6:00 PM", loc:"Chiller Dublin", opp:"Predators",    away:true,  upcoming:true},
      {date:"Jun 19", time:"8:00 PM", loc:"Chiller Easton", opp:"Blue Jackets", away:false, upcoming:true},
      {date:"May 22", opp:"Predators",    gf:4, ga:2, r:"W"},
      {date:"May 15", opp:"Blue Jackets", gf:3, ga:3, r:"T"},
      {date:"May 8",  opp:"Rangers",      gf:2, ga:5, r:"L"},
      {date:"May 1",  opp:"Knights",      gf:4, ga:1, r:"W"},
      {date:"Apr 24", opp:"Storm",        gf:3, ga:2, r:"W"},
      {date:"Apr 17", opp:"Wolves",       gf:1, ga:3, r:"L"},
      {date:"Apr 10", opp:"Eagles",       gf:5, ga:0, r:"W"},
      {date:"Apr 3",  opp:"Predators",    gf:2, ga:4, r:"L"},
      {date:"Mar 27", opp:"Blue Jackets", gf:4, ga:3, r:"W"},
      {date:"Mar 20", opp:"Rangers",      gf:3, ga:1, r:"W"},
      {date:"Mar 13", opp:"Knights",      gf:2, ga:3, r:"L"},
      {date:"Mar 6",  opp:"Storm",        gf:4, ga:2, r:"W"},
      {date:"Feb 27", opp:"Wolves",       gf:3, ga:1, r:"W"},
    ]
  },
  { id:"d", label:"D League Warriors", standing:"D Division", record:"6-5-2", color:C.gr,
    games:[
      {date:"Jun 4",  time:"6:30 PM", loc:"Chiller North",  opp:"Thunder", away:false, upcoming:true},
      {date:"Jun 11", time:"7:00 PM", loc:"Chiller Easton", opp:"Knights", away:true,  upcoming:true},
      {date:"Jun 18", time:"8:30 PM", loc:"Chiller Dublin", opp:"Wolves",  away:false, upcoming:true},
      {date:"May 21", opp:"Knights",      gf:5, ga:1, r:"W"},
      {date:"May 14", opp:"Storm",        gf:2, ga:4, r:"L"},
      {date:"May 7",  opp:"Wolves",       gf:3, ga:3, r:"T"},
      {date:"Apr 30", opp:"Thunder",      gf:4, ga:2, r:"W"},
      {date:"Apr 23", opp:"Knights",      gf:1, ga:3, r:"L"},
      {date:"Apr 16", opp:"Storm",        gf:3, ga:3, r:"T"},
      {date:"Apr 9",  opp:"Wolves",       gf:2, ga:4, r:"L"},
      {date:"Apr 2",  opp:"Thunder",      gf:4, ga:1, r:"W"},
      {date:"Mar 26", opp:"Knights",      gf:1, ga:2, r:"L"},
      {date:"Mar 19", opp:"Storm",        gf:3, ga:1, r:"W"},
      {date:"Mar 12", opp:"Wolves",       gf:2, ga:3, r:"L"},
      {date:"Mar 5",  opp:"Thunder",      gf:5, ga:2, r:"W"},
      {date:"Feb 26", opp:"Knights",      gf:4, ga:2, r:"W"},
    ]
  },
];
var NS_SPONSORS = [
  {name:"Moo Moo Car Wash",img:IMG.moomoo,url:"https://www.moomoocarwash.com/",tier:"platinum"},
  {name:"The Chiller",img:IMG.chiller,url:"https://www.thechiller.com/",tier:"gold"},
  {name:"Kroger Community Rewards",img:IMG.kroger,url:"https://www.kroger.com/account/communityrewards",tier:"silver"},
];
var NS_TIERS = [
  {id:"platinum", label:"Platinum", color:"#6b7280", bg:"#f1f5f9", accent:"#94a3b8"},
  {id:"gold",     label:"Gold",     color:"#b45309", bg:"#fffbeb", accent:"#f59e0b"},
  {id:"silver",   label:"Silver",   color:"#475569", bg:"#f8fafc", accent:"#94a3b8"},
  {id:"bronze",   label:"Bronze",   color:"#92400e", bg:"#fdf8f6", accent:"#b97c4a"},
];
var NS_RC = {W:"#16a34a",L:"#dc2626",T:"#d97706"};
var NS_RBG = {W:"#dcfce7",L:"#fee2e2",T:"#fef3c7"};
var NS_RL = {W:"Win",L:"Loss",T:"OTL"};
function NS_DOW(s){var d=new Date(s+" 2025");return["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];}

function NSHeader({nav, curPage, isLoggedIn}) {
  var linkStyle = {background:"none",border:"none",cursor:"pointer",fontFamily:F.b,fontSize:13,color:"#64748b",padding:"8px 12px",fontWeight:500,textDecoration:"none",display:"inline-block"};
  var activeStyle = Object.assign({},linkStyle,{color:C.navy,fontWeight:700});
  return (
    <header style={{background:"#fff",borderBottom:"1px solid #e2e8f0",position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 6px rgba(0,0,0,0.06)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={function(){nav("new-site");}} style={{display:"flex",alignItems:"center",gap:12,background:"none",border:"none",cursor:"pointer",padding:0}}>
          <img src={IMG.logo} alt="CWH" style={{height:46}} />
          <div style={{fontFamily:NS_FH,fontSize:22,fontWeight:700,color:C.navy,letterSpacing:2}}>COLUMBUS WARRIOR HOCKEY</div>
        </button>
        <nav style={{display:"flex",alignItems:"center",gap:4}}>
          <button onClick={function(){nav("ns-about");}} style={curPage==="ns-about"?activeStyle:linkStyle} onMouseEnter={function(e){e.currentTarget.style.color=C.navy;}} onMouseLeave={function(e){e.currentTarget.style.color=curPage==="ns-about"?C.navy:"#64748b";}}>About</button>
          <a href={FORMS.don} target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={function(e){e.currentTarget.style.color=C.navy;}} onMouseLeave={function(e){e.currentTarget.style.color="#64748b";}}>Donate</a>
          <a href={FORMS.store} target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={function(e){e.currentTarget.style.color=C.navy;}} onMouseLeave={function(e){e.currentTarget.style.color="#64748b";}}>Store</a>
          <div style={{width:1,height:20,background:"#e2e8f0",margin:"0 6px"}} />
          {isLoggedIn
            ? <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button onClick={function(){nav("ns-profile");}} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 14px",background:"none",border:"1px solid #e2e8f0",borderRadius:6,cursor:"pointer",fontFamily:F.b,fontSize:13,color:"#475569",fontWeight:600}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:C.navy,overflow:"hidden",flexShrink:0}}>
                    <svg viewBox="0 0 200 200" style={{width:"100%",height:"100%"}}><circle cx="100" cy="75" r="35" fill="rgba(255,255,255,0.6)"/><ellipse cx="100" cy="170" rx="55" ry="45" fill="rgba(255,255,255,0.6)"/></svg>
                  </div>
                  My profile
                </button>
                <button style={{padding:"8px 18px",background:"none",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#64748b",cursor:"pointer",letterSpacing:1,fontWeight:600}}>Sign out</button>
              </div>
            : <>
                <button onClick={function(){nav("ns-join");}} style={{padding:"8px 18px",background:C.red,border:"none",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#fff",letterSpacing:1,fontWeight:600,cursor:"pointer"}}>Join</button>
                <button onClick={function(){nav("ns-portal");}} style={{padding:"8px 18px",background:C.navy,border:"none",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#fff",cursor:"pointer",letterSpacing:1,fontWeight:600}}>Sign in</button>
              </>
          }
        </nav>
      </div>
      <div style={{height:3,background:C.red}} />
    </header>
  );
}

function NewSitePage({nav}) {
  return (
    <div style={{background:"#fff",minHeight:"100vh",fontFamily:F.b}}>

      <NSHeader nav={nav} curPage="home" />

      {/* MAIN */}
      <main style={{maxWidth:1100,margin:"0 auto",padding:"32px 24px 48px"}}>

        {/* SCHEDULE */}
        <div style={{marginBottom:40}}>
          <div style={{fontFamily:NS_FH,fontSize:22,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",marginBottom:16,borderLeft:"3px solid "+C.red,paddingLeft:12}}>Season Schedule</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
            {NS_SCORES.map(function(team,i) {
              return (
                <div key={i} style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
                  <div style={{background:C.navy,padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontFamily:NS_FH,fontSize:19,fontWeight:700,color:"#fff",letterSpacing:2}}>{team.label}</div>
                      <div style={{fontFamily:F.b,fontSize:11,color:"rgba(255,255,255,0.55)",letterSpacing:1,textTransform:"uppercase",marginTop:2}}>Summer League</div>
                    </div>
                    <div style={{fontFamily:NS_FH,fontSize:26,fontWeight:700,color:"#fff",letterSpacing:1}}>{(function(){var p=team.games.filter(function(g){return !g.upcoming;});return p.filter(function(g){return g.r==="W";}).length+"-"+p.filter(function(g){return g.r==="L";}).length+"-"+p.filter(function(g){return g.r==="T";}).length;})()}</div>
                  </div>
                  <div style={{maxHeight:165,overflowY:"auto"}}>
                    <div style={{display:"grid",gridTemplateColumns:"80px 1fr 130px 44px",padding:"6px 16px",borderBottom:"1px solid #e2e8f0",background:"#fff",position:"sticky",top:0,zIndex:1}}>
                      <div style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>Date</div>
                      <div style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>Opponent</div>
                      <div style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",textTransform:"uppercase"}}>Result</div>
                      <div />
                    </div>
                    {team.games.map(function(g,j){
                      return (
                        <div key={j} style={{display:"grid",gridTemplateColumns:"80px 1fr 130px 44px",padding:"6px 16px",borderBottom:j<team.games.length-1?"1px solid #f1f5f9":"none",alignItems:"center",background:g.upcoming?"#f0f9ff":"transparent"}}>
                          <div><div style={{fontFamily:F.b,fontSize:10,color:g.upcoming?"#2563eb":"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>{NS_DOW(g.date)}</div><div style={{fontFamily:F.b,fontSize:12,color:g.upcoming?"#2563eb":"#94a3b8",fontWeight:g.upcoming?600:400}}>{g.date}</div></div>
                          <div style={{fontFamily:F.b,fontSize:13,color:"#334155"}}>{g.upcoming && g.away ? "@ " : ""}{g.opp}</div>
                          <div>
                            {g.upcoming
                              ? <div><div style={{fontFamily:F.b,fontSize:12,color:"#2563eb",fontWeight:600}}>{g.time}</div><div style={{fontFamily:F.b,fontSize:11,color:"#64748b",marginTop:1}}>{g.loc}</div></div>
                              : <div style={{fontFamily:F.b,fontSize:13,color:"#334155",fontWeight:600}}>{g.gf+"–"+g.ga}</div>
                            }
                          </div>
                          <div>
                            {!g.upcoming && <div style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:NS_RC[g.r],background:NS_RBG[g.r],padding:"2px 6px",borderRadius:4,textAlign:"center"}}>{NS_RL[g.r]}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NEWS */}
        <div style={{marginBottom:40}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{fontFamily:NS_FH,fontSize:22,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",borderLeft:"3px solid "+C.red,paddingLeft:12}}>Latest News</div>
            <button onClick={function(){nav("news")}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:F.b,fontSize:13,color:C.navy,fontWeight:600,padding:0}}>All News →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
            {NEWS.slice(0,3).map(function(item,i){
              return (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden",display:"flex",flexDirection:"column"}}>
                  <div style={{height:150,overflow:"hidden",flexShrink:0}}>
                    <img src={item.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} />
                  </div>
                  <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",flex:1}}>
                    <div style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{item.date}</div>
                    <div style={{fontFamily:NS_FH,fontSize:18,fontWeight:600,color:"#1e293b",letterSpacing:1,lineHeight:1.25,flex:1}}>{item.title}</div>
                    <div style={{fontFamily:F.b,fontSize:11,color:C.navy,fontWeight:700,marginTop:12,letterSpacing:1}}>READ MORE →</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* SPONSORS */}
        <div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{fontFamily:NS_FH,fontSize:22,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",borderLeft:"3px solid "+C.red,paddingLeft:12}}>Our Sponsors</div>
            <button onClick={function(){nav("ns-sponsors");setTimeout(function(){var el=document.getElementById("ns-become-sponsor");if(el)el.scrollIntoView({behavior:"smooth"});},100);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:F.b,fontSize:13,color:C.navy,fontWeight:600,padding:0}}>Become a Sponsor →</button>
          </div>
          <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,padding:"28px 32px",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",gap:48}}>
            {NS_SPONSORS.map(function(s,i){
              return (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",opacity:0.75,transition:"opacity 0.2s"}}
                  onMouseEnter={function(e){e.currentTarget.style.opacity="1"}}
                  onMouseLeave={function(e){e.currentTarget.style.opacity="0.75"}}>
                  <img src={s.img} alt={s.name} style={{maxHeight:65,maxWidth:150,objectFit:"contain"}} />
                </a>
              );
            })}
          </div>
        </div>
      </main>

      {NS_FOOTER(nav)}
    </div>
  );
}

var NS_ABOUT_TABS = [{l:"About",p:"ns-about"},{l:"Leadership",p:"ns-leadership"},{l:"Sponsors",p:"ns-sponsors"}];
var NS_FOOTER = function(nav, devMode, setDevMode) {
  return (
    <>
    <div style={{background:C.navy,padding:"40px 24px",textAlign:"center"}}>
      <div style={{fontFamily:NS_FH,fontSize:16,fontWeight:700,color:"#fff",letterSpacing:3,textTransform:"uppercase",marginBottom:20}}>Follow Columbus Warrior Hockey</div>
      <div style={{display:"flex",gap:24,justifyContent:"center",alignItems:"center"}}>
        <a href="https://www.facebook.com/ColumbusWarriorHockey/" target="_blank" rel="noopener noreferrer" style={{opacity:0.8,transition:"opacity .15s"}} onMouseEnter={function(e){e.currentTarget.style.opacity="1";}} onMouseLeave={function(e){e.currentTarget.style.opacity="0.8";}}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="https://www.instagram.com/columbuswarriorhockey" target="_blank" rel="noopener noreferrer" style={{opacity:0.8,transition:"opacity .15s"}} onMouseEnter={function(e){e.currentTarget.style.opacity="1";}} onMouseLeave={function(e){e.currentTarget.style.opacity="0.8";}}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
      </div>
    </div>
    <footer style={{background:"#fff",borderTop:"1px solid #e2e8f0"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px 28px",display:"grid",gridTemplateColumns:"auto 2fr 1fr",gap:48,alignItems:"start"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",alignSelf:"center"}}>
          <img src={IMG.logo} alt="Columbus Warrior Hockey" style={{height:64}} />
        </div>
        <div>
          <div style={{fontFamily:NS_FH,fontSize:14,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:10,color:C.navy}}>About Us</div>
          <p style={{fontFamily:F.b,fontSize:13,color:"#64748b",lineHeight:1.8,margin:0,maxWidth:480}}>Columbus Warrior Hockey is a 501(c)(3) non-profit organization that provides veterans with meaningful peer-based support networks, encourages a healthier lifestyle through physical activity, and offers a therapeutic experience that contributes to both mental and physical healing through the sport of hockey.</p>
        </div>
        <div>
          <div style={{fontFamily:NS_FH,fontSize:14,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:10,color:C.navy}}>Contact</div>
          <div style={{display:"flex",flexDirection:"column",gap:4,fontFamily:F.b,fontSize:13,color:"#64748b",lineHeight:1.8}}>
            <a href="mailto:info@columbuswarriorhockey.org" style={{color:C.red,textDecoration:"none",fontWeight:600}}>info@columbuswarriorhockey.org</a>
            <span>Columbus Warrior Hockey</span>
            <span>Powell, OH 43065</span>
          </div>
        </div>
      </div>
      <div style={{borderTop:"1px solid #e2e8f0",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",maxWidth:1100,margin:"0 auto"}}>
        <div style={{fontFamily:F.b,fontSize:11,color:"#94a3b8"}}>© 2026 Columbus Warrior Hockey. All rights reserved.</div>
        {setDevMode && (
          <button onClick={function(){setDevMode(function(v){return !v;});}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:F.b,fontSize:11,color:devMode?"#a78bfa":"#94a3b8",letterSpacing:1,padding:0}}>
            {devMode ? "Disable dev mode" : "Enable dev mode"}
          </button>
        )}
        <button onClick={function(){nav("home");}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:F.b,fontSize:11,color:"#94a3b8",letterSpacing:1,padding:0}}>← Return to classic site</button>
      </div>
    </footer>
    </>
  );
};
var NS_CARD = {background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,padding:"28px"};

function NSAboutLayout({nav, curPage, eyebrow, title, subtitle, children}) {
  return (
    <div style={{background:"#fff",minHeight:"100vh",fontFamily:F.b}}>
      <NSHeader nav={nav} curPage="ns-about" />
      <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 24px 64px",display:"flex",gap:28,alignItems:"flex-start"}}>

        {/* SIDEBAR */}
        <div style={{width:190,flexShrink:0,position:"sticky",top:80}}>
          <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
            <div style={{background:C.navy,padding:"12px 16px"}}>
              <div style={{fontFamily:NS_FH,fontSize:14,fontWeight:700,color:"#fff",letterSpacing:2,textTransform:"uppercase"}}>About</div>
            </div>
            {NS_ABOUT_TABS.map(function(t,i){
              var active = curPage===t.p;
              return (
                <button key={i} onClick={function(){nav(t.p);}} style={{display:"block",width:"100%",textAlign:"left",background:active?"#eef2ff":"none",border:"none",borderLeft:active?"3px solid "+C.red:"3px solid transparent",cursor:"pointer",padding:"11px 14px",fontFamily:F.b,fontSize:13,color:active?C.navy:"#475569",fontWeight:active?700:400,borderBottom:i<NS_ABOUT_TABS.length-1?"1px solid #e2e8f0":"none"}}
                  onMouseEnter={function(e){if(!active){e.currentTarget.style.background="#f1f5f9";}}}
                  onMouseLeave={function(e){if(!active){e.currentTarget.style.background="none";}}}>
                  {t.l}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENT */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{marginBottom:28,paddingBottom:20,borderBottom:"1px solid #e2e8f0"}}>
            {eyebrow && <div style={{fontFamily:F.b,fontSize:11,color:C.red,letterSpacing:3,textTransform:"uppercase",marginBottom:8}}>{eyebrow}</div>}
            <h1 style={{fontFamily:NS_FH,fontSize:36,fontWeight:700,color:C.navy,letterSpacing:2,margin:"0 0 10px",textTransform:"uppercase"}}>{title}</h1>
            {subtitle && <p style={{fontFamily:F.b,fontSize:14,color:"#475569",lineHeight:1.7,margin:0}}>{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
      {NS_FOOTER(nav)}
    </div>
  );
}

function NSAboutPage({nav}) {
  return (
    <NSAboutLayout nav={nav} curPage="ns-about" title="About Columbus Warrior Hockey" subtitle="A veteran-led hockey organization dedicated to healing, camaraderie, and purpose through sport.">

      {/* MISSION / VISION */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20,marginBottom:28}}>
        <div style={{...NS_CARD,borderTop:"4px solid "+C.navy}}>
          <div style={{fontFamily:NS_FH,fontSize:16,fontWeight:700,color:C.red,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Mission</div>
          <p style={{fontFamily:F.b,fontSize:14,color:"#475569",lineHeight:1.8,margin:0}}>Our mission is to provide honorably discharged service members with service-connected disabilities a therapeutic experience grounded in peer-based support, the cultivation of mental and physical healing, and promotion of physical activity through the sport of hockey.</p>
        </div>
        <div style={{...NS_CARD,borderTop:"4px solid "+C.navy}}>
          <div style={{fontFamily:NS_FH,fontSize:16,fontWeight:700,color:C.red,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Vision</div>
          <p style={{fontFamily:F.b,fontSize:14,color:"#475569",lineHeight:1.8,margin:0}}>Columbus Warrior Hockey envisions a community where veterans rediscover resilience, camaraderie, and purpose through the sport of hockey. By fostering peer support, mental well-being, and physical rehabilitation, we empower those who have served to heal and grow—strengthening both themselves and the community they call home.</p>
        </div>
      </div>

      {/* COLUMBUS WARRIOR WAY */}
      <div style={{marginBottom:32}}>
        <div style={{fontFamily:NS_FH,fontSize:20,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",marginBottom:12,borderLeft:"3px solid "+C.red,paddingLeft:12}}>The Columbus Warrior Way</div>
        <div style={{...NS_CARD,borderTop:"4px solid "+C.navy}}>
          <p style={{fontFamily:F.b,fontSize:14,color:"#475569",lineHeight:1.8,margin:0}}>Building on this mission, Columbus Warrior Hockey takes a unique approach that extends beyond traditional disabled hockey programs. We supplement our core offerings with community-based activities that incorporate other military-connected individuals, creating a broader network of support. In addition to serving veterans, we welcome participation from current service members and Gold Star family members in our Chiller Adult Hockey League teams, "stick & puck" sessions, and drop-in hockey opportunities. By blending veterans, active service members, and families, we create a continuum of camaraderie and shared experience that strengthens bonds and fosters lasting positive impact within our community.</p>
        </div>
      </div>

      {/* PROGRAMS */}
      <div style={{marginBottom:32}}>
        <div style={{fontFamily:NS_FH,fontSize:20,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",marginBottom:12,borderLeft:"3px solid "+C.red,paddingLeft:12}}>Our Programs</div>
        <p style={{fontFamily:F.b,fontSize:13,color:"#64748b",lineHeight:1.6,margin:"0 0 14px",fontStyle:"italic"}}>Programs are eligibility-based. If your status changes, update your profile to make sure you have access to the right programs.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
          <div style={{...NS_CARD,borderTop:"4px solid "+C.navy}}>
            <div style={{fontFamily:NS_FH,fontSize:17,fontWeight:700,color:C.navy,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Disabled Hockey</div>
            <p style={{fontFamily:F.b,fontSize:13,color:"#475569",lineHeight:1.7,margin:"0 0 14px"}}>The disabled hockey pillar focuses on disabled veterans and activities pertaining to USA Hockey's Warrior Hockey which is a discipline of disabled hockey. This includes participation in USA Hockey sanctioned events such as the Warrior Classic and Warrior Nationals. In addition to this, the Warrior Hockey team will have opportunities to participate in and host events with other Warrior organizations such as tournaments and exhibition games.</p>
            <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:700,color:C.navy,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Eligibility</div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {["Purple Heart recipient","VA disability rating of 10% or greater","Medically discharged from active duty, reserve, or National Guard"].map(function(req,i){
                return (
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:C.red,flexShrink:0,marginTop:5}} />
                    <span style={{fontFamily:F.b,fontSize:12,color:"#475569",lineHeight:1.5}}>{req}</span>
                  </div>
                );
              })}
            </div>
            <div style={{fontFamily:F.b,fontSize:11,color:"#94a3b8",marginTop:10,fontStyle:"italic"}}>Supporting documentation required.</div>
          </div>
          <div style={{...NS_CARD,borderTop:"4px solid "+C.navy}}>
            <div style={{fontFamily:NS_FH,fontSize:17,fontWeight:700,color:C.navy,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Veterans Hockey</div>
            <p style={{fontFamily:F.b,fontSize:13,color:"#475569",lineHeight:1.7,margin:"0 0 14px"}}>The veterans hockey pillar focuses on improving the lives of veterans, service members, and gold star families in the greater Columbus area. CWH leverages the existing adult recreational hockey program hosted by The OhioHealth Chiller rinks to create opportunities to establish meaningful peer-based support networks, develop a healthier lifestyle through physical activity, and heal from trauma through hockey.</p>
            <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:700,color:C.navy,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Eligibility</div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {[
                {req:"Honorable discharge", note:"verified by VA Service Verification Letter"},
                {req:"Current active or reserve service member", note:"verified by SCRA certificate"},
                {req:"Gold Star Family member", note:"spouse, child, parent or sibling"},
                {req:"Immediate family of a current participant", note:"spouse, child, parent or sibling"},
              ].map(function(item,i){
                return (
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:C.red,flexShrink:0,marginTop:5}} />
                    <span style={{fontFamily:F.b,fontSize:12,color:"#475569",lineHeight:1.5}}>{item.req} <span style={{color:"#94a3b8"}}>({item.note})</span></span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{...NS_CARD,borderTop:"4px solid "+C.navy}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,alignItems:"start"}}>
            <div>
              <div style={{fontFamily:NS_FH,fontSize:17,fontWeight:700,color:C.navy,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Volunteer</div>
              <p style={{fontFamily:F.b,fontSize:13,color:"#475569",lineHeight:1.7,margin:0}}>You don't have to be a player to be part of Columbus Warrior Hockey. We welcome anyone who wants to give their time, whether as part of our coaching staff, by contributing a skill set that supports our programs, or by participating in our community volunteer events.</p>
            </div>
            <div>
              <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:700,color:C.navy,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Opportunities</div>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {["Coaching and on-ice instruction","Administrative and operational support","Community outreach and volunteer events","Skills-based volunteering"].map(function(req,i){
                  return (
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:C.red,flexShrink:0,marginTop:5}} />
                      <span style={{fontFamily:F.b,fontSize:12,color:"#475569",lineHeight:1.5}}>{req}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{fontFamily:F.b,fontSize:11,color:"#94a3b8",fontStyle:"italic",marginTop:10}}>Open to everyone regardless of player eligibility.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{textAlign:"center"}}>
        <button onClick={function(){nav("ns-join");}} style={{padding:"10px 32px",background:C.red,border:"none",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#fff",fontWeight:700,letterSpacing:1,cursor:"pointer"}}>Join</button>
      </div>

    </NSAboutLayout>
  );
}

function NSLeadershipPage({nav}) {
  var sectionTitle = {fontFamily:NS_FH,fontSize:20,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",marginBottom:14,borderLeft:"3px solid "+C.red,paddingLeft:12};
  var grid = {display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:16,marginBottom:32};
  var personCard = function(p,i) {
    var vacant = p.name==="Vacant";
    return (
      <div key={i} style={{...NS_CARD,borderTop:"4px solid "+C.navy,padding:"20px"}}>
        <div style={{width:52,height:52,borderRadius:"50%",overflow:"hidden",marginBottom:12,background:"#e2e8f0"}}>
          <svg viewBox="0 0 200 200" style={{width:"100%",height:"100%"}}><circle cx="100" cy="75" r="35" fill="#9ca3af"/><ellipse cx="100" cy="170" rx="55" ry="45" fill="#9ca3af"/></svg>
        </div>
        <div style={{fontFamily:NS_FH,fontSize:16,fontWeight:700,color:vacant?"#94a3b8":C.navy,letterSpacing:1}}>{p.name}</div>
        <div style={{fontFamily:F.b,fontSize:12,color:C.red,fontWeight:600,marginTop:2}}>{p.role}</div>
        {p.branch && <div style={{fontFamily:F.b,fontSize:11,color:"#64748b",marginTop:6}}>{p.branch}</div>}
        {p.years && <div style={{fontFamily:F.b,fontSize:11,color:"#94a3b8",marginTop:2}}>{p.years}</div>}
      </div>
    );
  };
  return (
    <NSAboutLayout nav={nav} curPage="ns-leadership" title="Leadership" subtitle="The board, staff, and coaches who keep Columbus Warrior Hockey running.">
      <div style={sectionTitle}>Board of Directors</div><div style={grid}>{BOARD_MEMBERS.map(personCard)}</div>
      <div style={sectionTitle}>Operations Staff</div><div style={grid}>{OPS_STAFF.map(personCard)}</div>
      <div style={sectionTitle}>Coaching Staff</div><div style={grid}>{COACHING.map(personCard)}</div>
    </NSAboutLayout>
  );
}

function NSSponsorsPage({nav}) {
  return (
    <NSAboutLayout nav={nav} curPage="ns-sponsors" title="Sponsors" subtitle="Every goal we score on and off the ice begins with your support. Donations and sponsorships fuel our programs by keeping veterans on the ice and connected to the community. Together, we can ensure that those who served our country continue to heal, grow, and give back.">

      {NS_TIERS.map(function(tier) {
        var members = NS_SPONSORS.filter(function(s){return s.tier===tier.id;});
        return (
          <div key={tier.id} style={{marginBottom:32}}>
            {/* Tier header */}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:12,height:12,borderRadius:"50%",background:tier.accent,flexShrink:0}} />
              <div style={{fontFamily:NS_FH,fontSize:18,fontWeight:700,color:tier.color,letterSpacing:3,textTransform:"uppercase"}}>{tier.label}</div>
              <div style={{flex:1,height:1,background:"#e2e8f0"}} />
            </div>

            {members.length > 0 ? (
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
                {members.map(function(s,i){
                  return (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                      style={{background:tier.bg,border:"1px solid #e2e8f0",borderTop:"4px solid "+tier.accent,borderRadius:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 20px",textDecoration:"none",gap:12,transition:"box-shadow .15s"}}
                      onMouseEnter={function(e){e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.08)";}}
                      onMouseLeave={function(e){e.currentTarget.style.boxShadow="none";}}>
                      <img src={s.img} alt={s.name} style={{maxHeight:72,maxWidth:160,objectFit:"contain"}} />
                      <div style={{fontFamily:F.b,fontSize:13,color:"#475569",fontWeight:600,textAlign:"center"}}>{s.name}</div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <div style={{background:"#fafafa",border:"1px dashed #e2e8f0",borderRadius:10,padding:"24px",textAlign:"center"}}>
                <div style={{fontFamily:F.b,fontSize:13,color:tier.accent,fontWeight:700,cursor:"pointer"}}>Become a {tier.label} Tier Sponsor</div>
              </div>
            )}
          </div>
        );
      })}

      {/* ADDITIONAL PARTNERS */}
      <div style={{marginBottom:32}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:12,height:12,borderRadius:"50%",background:"#cbd5e1",flexShrink:0}} />
          <div style={{fontFamily:NS_FH,fontSize:18,fontWeight:700,color:"#64748b",letterSpacing:3,textTransform:"uppercase"}}>Additional Partners</div>
          <div style={{flex:1,height:1,background:"#e2e8f0"}} />
        </div>
        <div style={{background:"#fafafa",border:"1px dashed #e2e8f0",borderRadius:10,padding:"24px",textAlign:"center"}}>
          <div style={{fontFamily:F.b,fontSize:13,color:"#64748b",fontWeight:700,cursor:"pointer"}}>Become a Partner</div>
        </div>
      </div>

      {/* BECOME A SPONSOR */}
      <div id="ns-become-sponsor" style={{marginBottom:32}}>
        <div style={{fontFamily:NS_FH,fontSize:20,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",marginBottom:12,borderLeft:"3px solid "+C.red,paddingLeft:12}}>Become a Sponsor</div>
        <p style={{fontFamily:F.b,fontSize:14,color:"#475569",lineHeight:1.7,margin:"0 0 16px"}}>Interested in supporting veteran hockey in Columbus? Partner with us and make a difference in the lives of those who served.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
          <div style={{...NS_CARD,borderTop:"4px solid "+C.navy}}>
            <div style={{fontFamily:NS_FH,fontSize:16,fontWeight:700,color:C.navy,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Non-Profit Information</div>
            <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:"4px 12px",fontFamily:F.b,fontSize:13,color:"#475569",marginBottom:16}}>
              <span style={{color:"#94a3b8",fontWeight:600}}>IRS Status</span><span>501(c)(3)</span>
              <span style={{color:"#94a3b8",fontWeight:600}}>EIN</span><span>33-3565860</span>
              <span style={{color:"#94a3b8",fontWeight:600}}>Publication 78</span><span>Yes</span>
              <span style={{color:"#94a3b8",fontWeight:600}}>Deductibility</span><span>PC – 50% (60% for cash contributions)</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <a href="https://charitableregistration.ohioago.gov/Charities/OrganizationDetails?Id=12242206" target="_blank" rel="noopener noreferrer" style={{fontFamily:F.b,fontSize:12,color:C.red,fontWeight:700,textDecoration:"none"}}>Ohio Attorney General's Office →</a>
              <a href="https://businesssearch.ohiosos.gov/?=businessDetails/5360945" target="_blank" rel="noopener noreferrer" style={{fontFamily:F.b,fontSize:12,color:C.red,fontWeight:700,textDecoration:"none"}}>Ohio Secretary of State →</a>
              <a href="https://apps.irs.gov/app/eos/" target="_blank" rel="noopener noreferrer" style={{fontFamily:F.b,fontSize:12,color:C.red,fontWeight:700,textDecoration:"none"}}>IRS →</a>
            </div>
          </div>
          <div style={{...NS_CARD,borderTop:"4px solid "+C.navy}}>
            <div style={{fontFamily:NS_FH,fontSize:16,fontWeight:700,color:C.navy,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Sponsor Deck</div>
            <p style={{fontFamily:F.b,fontSize:13,color:"#475569",lineHeight:1.7,margin:"0 0 16px"}}>For more information please see the below sponsor deck pdf. This document contains information on sponsorship packages, how funding is spent, and other information relevant to prospective partners.</p>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <a href="/Sponsor Deck 3.0.pdf" target="_blank" rel="noopener noreferrer" style={{fontFamily:F.b,fontSize:13,color:C.red,fontWeight:700,textDecoration:"none"}}>Download Sponsor Deck →</a>
              <a href="https://nonprofit.yourcause.com/nonprofits/nonprofit-public-profile/16109035" target="_blank" rel="noopener noreferrer" style={{fontFamily:F.b,fontSize:13,color:C.red,fontWeight:700,textDecoration:"none"}}>Blackbaud Verified Network →</a>
            </div>
          </div>
        </div>
      </div>

    </NSAboutLayout>
  );
}

function NSJoinPage({nav}) {
  var s = useState([]); var sel = s[0]; var setSel = s[1];
  var ih = useState(false); var infoHover = ih[0]; var setInfoHover = ih[1];
  var ih2 = useState(false); var infoHover2 = ih2[0]; var setInfoHover2 = ih2[1];
  var pp = useState(1); var step = pp[0]; var setStep = pp[1];
  var sentRef = useRef(null);
  var sk = useState(true); var isSticky = sk[0]; var setIsSticky = sk[1];

  useEffect(function() {
    setIsSticky(true);
    var el = sentRef.current;
    if (!el) return;
    var obs = new IntersectionObserver(function(entries) { setIsSticky(!entries[0].isIntersecting); }, {threshold:0});
    obs.observe(el);
    return function() { obs.disconnect(); };
  }, [step]);

  var CRITERIA = [
    {id:"purple-heart",   label:"Purple Heart recipient",                                           group:"disabled"},
    {id:"va-rating",      label:"VA disability rating of 10% or greater",                           group:"disabled"},
    {id:"med-discharge",  label:"Medically discharged from active duty, reserve, or National Guard", group:"disabled"},
    {id:"honorable",      label:"Honorable discharge",                                                               group:"veterans"},
    {id:"active",         label:"Current active or reserve service member",                                          group:"veterans"},
    {id:"gold-star",      label:"Gold Star Family member",                      note:"spouse, child, parent or sibling",            group:"veterans"},
    {id:"family",         label:"Immediate family of a current participant",    note:"spouse, child, parent or sibling",            group:"veterans"},
  ];

  var toggle = function(id) {
    if (id === "none") { setSel(["none"]); return; }
    var next = sel.filter(function(x){return x !== "none";});
    var idx = next.indexOf(id);
    setSel(idx >= 0 ? next.filter(function(x){return x!==id;}) : next.concat([id]));
  };

  var hasDisabled = CRITERIA.some(function(c){return c.group==="disabled" && sel.indexOf(c.id)>=0;});
  var hasVeterans = CRITERIA.some(function(c){return c.group==="veterans" && sel.indexOf(c.id)>=0;});
  var isNone      = sel.indexOf("none") >= 0;
  var hasSel      = sel.length > 0;

  var QUAL_PROGRAMS = hasDisabled
    ? [{label:"Disabled Hockey", desc:"Adaptive hockey for disabled veterans and service members."},
       {label:"Veterans Hockey",  desc:"Competitive and recreational play for veterans and their families."},
       {label:"Volunteer",        desc:"Support the team on and off the ice."}]
    : hasVeterans
    ? [{label:"Veterans Hockey",  desc:"Competitive and recreational play for veterans and their families."},
       {label:"Volunteer",        desc:"Support the team on and off the ice."}]
    : isNone
    ? [{label:"Volunteer",        desc:"Support the team on and off the ice. Open to everyone."}]
    : [];

  var showBranch = ["purple-heart","va-rating","med-discharge","honorable","active"].some(function(id){return sel.indexOf(id)>=0;});
  var ph = useState(""); var phone = ph[0]; var setPhone = ph[1];
  var formatPhone = function(v) {
    var d = v.replace(/\D/g,"").slice(0,10);
    if (d.length <= 3) return d.length ? "("+d : "";
    if (d.length <= 6) return "("+d.slice(0,3)+") "+d.slice(3);
    return "("+d.slice(0,3)+") "+d.slice(3,6)+"-"+d.slice(6);
  };

  var fv = useState({firstName:"",lastName:"",email:"",branch:"",howHeard:"",password:"",confirmPassword:""});
  var formVals = fv[0]; var setFormVals = fv[1];
  var ev = useState({}); var errors = ev[0]; var setErrors = ev[1];

  var setField = function(key) {
    return function(e) {
      setFormVals(Object.assign({},formVals,{[key]:e.target.value}));
      if (errors[key]) setErrors(Object.assign({},errors,{[key]:undefined}));
    };
  };

  var validate = function() {
    var e = {};
    if (!formVals.firstName.trim()) e.firstName = "Required";
    if (!formVals.lastName.trim()) e.lastName = "Required";
    if (!formVals.email.trim()) { e.email = "Required"; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formVals.email)) { e.email = "Enter a valid email address"; }
    if (!phone) { e.phone = "Required"; }
    else if (phone.replace(/\D/g,"").length < 10) { e.phone = "Enter a valid phone number"; }
    if (showBranch && !formVals.branch) e.branch = "Choose one";
    if (!formVals.howHeard) e.howHeard = "Choose one";
    if (!formVals.password) { e.password = "Required"; }
    else if (formVals.password.length < 8 || !/[A-Z]/.test(formVals.password) || !/[0-9]/.test(formVals.password) || !/[^A-Za-z0-9]/.test(formVals.password)) { e.password = "Password does not meet the requirements listed above"; }
    if (!formVals.confirmPassword) { e.confirmPassword = "Required"; }
    else if (formVals.password && formVals.confirmPassword !== formVals.password) { e.confirmPassword = "Passwords do not match"; }
    return e;
  };

  var handleSubmit = function(e) {
    e.preventDefault();
    var errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) { window.open(FORMS.reg,"_blank"); }
  };

  var errBorder = function(key) { return errors[key] ? {borderColor:C.red} : {}; };
  var ErrMsg = function(key) { return errors[key] ? <div style={{fontFamily:F.b,fontSize:11,color:C.red,marginTop:4}}>{errors[key]}</div> : null; };

  var fBase = {width:"100%",padding:"10px 14px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,boxSizing:"border-box",outline:"none"};
  var fOn   = Object.assign({},fBase,{color:"#1e293b",background:"#fff"});
  var lbl   = {display:"block",fontFamily:F.b,fontSize:11,fontWeight:700,color:"#475569",letterSpacing:1,textTransform:"uppercase",marginBottom:6};

  var Checkbox = function(checked) {
    return (
      <div style={{width:18,height:18,borderRadius:4,border:"2px solid "+(checked?C.red:"#cbd5e1"),background:checked?C.red:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,transition:"all .15s"}}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
    );
  };

  var goNext = function() { setStep(2); window.scrollTo({top:0,behavior:"smooth"}); };
  var goBack = function() { setStep(1); window.scrollTo({top:0,behavior:"smooth"}); };

  return (
    <div style={{background:"#f8fafc",minHeight:"100vh",fontFamily:F.b}}>
      <NSHeader nav={nav} curPage="ns-join" />

      <div style={{maxWidth:680,margin:"0 auto",padding:"48px 24px 80px"}}>

        {/* Title */}
        <div style={{textAlign:"center",marginBottom:44}}>
          <div style={{fontFamily:NS_FH,fontSize:34,fontWeight:700,color:C.navy,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Join Columbus Warrior Hockey</div>
        </div>

        {/* PAGE 1 */}
        {step===1 && (
          <>
            {/* Step 1 — About You */}
            <div style={{marginBottom:32}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.b,fontSize:13,color:"#fff",fontWeight:700,flexShrink:0}}>1</div>
                <div style={{fontFamily:NS_FH,fontSize:18,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.navy}}>About You</div>
                <div style={{position:"relative",display:"inline-flex",alignItems:"center"}}
                  onMouseEnter={function(){setInfoHover(true);}} onMouseLeave={function(){setInfoHover(false);}}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{cursor:"default",flexShrink:0}}>
                    <circle cx="8" cy="8" r="7.5" stroke="#94a3b8" strokeWidth="1.5"/>
                    <rect x="7.25" y="7" width="1.5" height="5" rx=".75" fill="#94a3b8"/>
                    <rect x="7.25" y="4" width="1.5" height="1.5" rx=".75" fill="#94a3b8"/>
                  </svg>
                  {infoHover && (
                    <div style={{position:"absolute",bottom:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",background:"#1e293b",color:"#fff",fontFamily:F.b,fontSize:12,fontWeight:400,lineHeight:1.6,padding:"8px 12px",borderRadius:6,width:240,zIndex:10,boxShadow:"0 4px 12px rgba(0,0,0,0.15)",letterSpacing:0,textTransform:"none",whiteSpace:"normal"}}>
                      Your eligibility can be updated in your profile at any time.
                      <div style={{position:"absolute",bottom:-4,left:"50%",marginLeft:-4,width:8,height:8,background:"#1e293b",transform:"rotate(45deg)"}} />
                    </div>
                  )}
                </div>
              </div>
              <p style={{fontFamily:F.b,fontSize:13,color:"#64748b",margin:"0 0 14px",lineHeight:1.6}}>Check all that apply to you. This will help us identify which programs are available to you.</p>
              <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
                {CRITERIA.map(function(c,i){
                  var checked = sel.indexOf(c.id) >= 0;
                  return (
                    <button key={c.id} onClick={function(){toggle(c.id);}}
                      style={{display:"flex",alignItems:"flex-start",gap:14,width:"100%",padding:"14px 20px",background:checked?"#fafbff":"#fff",border:"none",borderBottom:i<CRITERIA.length-1?"1px solid #f1f5f9":"none",cursor:"pointer",textAlign:"left",transition:"background .1s"}}>
                      {Checkbox(checked)}
                      <div>
                        <div style={{fontFamily:F.b,fontSize:14,color:checked?"#1e293b":"#334155",fontWeight:checked?600:400,lineHeight:1.5}}>{c.label}</div>
                        {c.note && <div style={{fontFamily:F.b,fontSize:12,color:"#94a3b8",marginTop:2}}>{c.note}</div>}
                      </div>
                    </button>
                  );
                })}
                <div style={{borderTop:"2px solid #e2e8f0"}} />
                <button onClick={function(){toggle("none");}}
                  style={{display:"flex",alignItems:"center",gap:14,width:"100%",padding:"14px 20px",background:isNone?"#fafbff":"#fff",border:"none",cursor:"pointer",textAlign:"left",transition:"background .1s"}}>
                  {Checkbox(isNone)}
                  <div style={{fontFamily:F.b,fontSize:14,color:isNone?"#1e293b":"#64748b",fontWeight:isNone?600:400,fontStyle:"italic"}}>None of the above</div>
                </button>
              </div>
            </div>

            {/* Natural position — sentinel for IntersectionObserver */}
            <div ref={sentRef} style={{display:"flex",justifyContent:"flex-end"}}>
              <button onClick={goNext} disabled={!hasSel}
                style={{padding:"12px 32px",background:hasSel?C.red:"#e2e8f0",color:hasSel?"#fff":"#94a3b8",border:"none",borderRadius:6,fontFamily:F.b,fontSize:14,fontWeight:700,letterSpacing:1,cursor:hasSel?"pointer":"default",transition:"all .2s"}}>
                Next →
              </button>
            </div>
          </>
        )}

        {/* PAGE 2 */}
        {step===2 && (
          <>
            {/* Programs recap */}
            {QUAL_PROGRAMS.length > 0 && (
              <div style={{marginBottom:32}}>
                <div style={{fontFamily:NS_FH,fontSize:14,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.navy,marginBottom:12,borderLeft:"3px solid "+C.red,paddingLeft:10,display:"flex",alignItems:"center",gap:8}}>
                  Programs Available to You
                  <div style={{position:"relative",display:"inline-flex",alignItems:"center"}}
                    onMouseEnter={function(){setInfoHover2(true);}} onMouseLeave={function(){setInfoHover2(false);}}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{cursor:"default",flexShrink:0}}>
                      <circle cx="8" cy="8" r="7.5" stroke="#94a3b8" strokeWidth="1.5"/>
                      <rect x="7.25" y="7" width="1.5" height="5" rx=".75" fill="#94a3b8"/>
                      <rect x="7.25" y="4" width="1.5" height="1.5" rx=".75" fill="#94a3b8"/>
                    </svg>
                    {infoHover2 && (
                      <div style={{position:"absolute",bottom:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",background:"#1e293b",color:"#fff",fontFamily:F.b,fontSize:12,fontWeight:400,lineHeight:1.6,padding:"8px 12px",borderRadius:6,width:260,zIndex:10,boxShadow:"0 4px 12px rgba(0,0,0,0.15)",letterSpacing:0,textTransform:"none",whiteSpace:"normal"}}>
                        These are the programs you'll be able to sign up for. Open registrations will appear in your player portal.
                        <div style={{position:"absolute",bottom:-4,left:"50%",marginLeft:-4,width:8,height:8,background:"#1e293b",transform:"rotate(45deg)"}} />
                      </div>
                    )}
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12}}>
                  {QUAL_PROGRAMS.map(function(p,i){
                    return (
                      <div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderTop:"4px solid "+C.navy,borderRadius:10,padding:"14px 16px"}}>
                        <div style={{fontFamily:NS_FH,fontSize:15,fontWeight:700,color:C.navy,letterSpacing:1,marginBottom:4}}>{p.label}</div>
                        <div style={{fontFamily:F.b,fontSize:12,color:"#64748b",lineHeight:1.5}}>{p.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Your Information */}
            <div style={{marginBottom:32}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.b,fontSize:13,color:"#fff",fontWeight:700,flexShrink:0}}>2</div>
                <div style={{fontFamily:NS_FH,fontSize:18,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.navy}}>Your Information</div>
              </div>
              <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"24px"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                  <div>
                    <label style={lbl}>First Name</label>
                    <input type="text" value={formVals.firstName} onChange={setField("firstName")} style={Object.assign({},fOn,errBorder("firstName"))} />
                    {ErrMsg("firstName")}
                  </div>
                  <div>
                    <label style={lbl}>Last Name</label>
                    <input type="text" value={formVals.lastName} onChange={setField("lastName")} style={Object.assign({},fOn,errBorder("lastName"))} />
                    {ErrMsg("lastName")}
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                  <div>
                    <label style={lbl}>Email</label>
                    <input type="email" value={formVals.email} onChange={setField("email")} style={Object.assign({},fOn,errBorder("email"))} />
                    {ErrMsg("email")}
                  </div>
                  <div>
                    <label style={lbl}>Phone</label>
                    <input type="tel" value={phone} onChange={function(e){setPhone(formatPhone(e.target.value));if(errors.phone)setErrors(Object.assign({},errors,{phone:undefined}));}} style={Object.assign({},fOn,errBorder("phone"))} />
                    {ErrMsg("phone")}
                  </div>
                </div>
                {showBranch && (
                  <div style={{marginBottom:16}}>
                    <label style={lbl}>Branch of Service</label>
                    <select value={formVals.branch} onChange={setField("branch")} style={Object.assign({},fOn,errBorder("branch"),{appearance:"none"})}>
                      <option value="">Select branch...</option>
                      <option>Army</option>
                      <option>Navy</option>
                      <option>Marine Corps</option>
                      <option>Air Force</option>
                      <option>Space Force</option>
                      <option>Coast Guard</option>
                      <option>National Guard</option>
                    </select>
                    {ErrMsg("branch")}
                  </div>
                )}
                <div style={{marginBottom:16}}>
                  <label style={lbl}>How did you hear about us?</label>
                  <select value={formVals.howHeard} onChange={setField("howHeard")} style={Object.assign({},fOn,errBorder("howHeard"),{appearance:"none"})}>
                    <option value="">Select one...</option>
                    <option>Social media</option>
                    <option>Friend or family</option>
                    <option>VA or military organization</option>
                    <option>Event or game</option>
                    <option>Other</option>
                  </select>
                  {ErrMsg("howHeard")}
                </div>
                <div style={{borderTop:"1px solid #f1f5f9",paddingTop:20}}>
                  <div style={{fontFamily:NS_FH,fontSize:13,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.navy,marginBottom:14}}>Create a Password</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                    <div>
                      <label style={lbl}>Password</label>
                      <input type="password" value={formVals.password} onChange={setField("password")} style={Object.assign({},fOn,errBorder("password"))} />
                      <div style={{fontFamily:F.b,fontSize:11,color:errors.password?C.red:"#94a3b8",marginTop:6,lineHeight:1.6}}>8+ characters &middot; 1 uppercase &middot; 1 number &middot; 1 special character</div>
                    </div>
                    <div>
                      <label style={lbl}>Confirm Password</label>
                      <input type="password" value={formVals.confirmPassword} onChange={setField("confirmPassword")} style={Object.assign({},fOn,errBorder("confirmPassword"),(formVals.confirmPassword&&formVals.password&&formVals.confirmPassword!==formVals.password?{borderColor:C.red}:{}))} />
                      {(errors.confirmPassword||(formVals.confirmPassword&&formVals.password&&formVals.confirmPassword!==formVals.password))
                        ? <div style={{fontFamily:F.b,fontSize:11,color:C.red,marginTop:6,lineHeight:1.6}}>Passwords do not match</div>
                        : <div style={{fontFamily:F.b,fontSize:11,color:"#94a3b8",marginTop:6,lineHeight:1.6}}>Re-enter your password to confirm.</div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Natural position — Back + Submit */}
            <div ref={sentRef} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <button onClick={goBack} style={{background:"none",border:"none",cursor:"pointer",fontFamily:F.b,fontSize:13,color:"#64748b",padding:0,display:"flex",alignItems:"center",gap:6}}>← Back</button>
              <button onClick={handleSubmit} style={{padding:"12px 32px",background:C.red,color:"#fff",border:"none",borderRadius:6,fontFamily:F.b,fontSize:14,fontWeight:700,letterSpacing:1,cursor:"pointer"}}>Submit</button>
            </div>
          </>
        )}

      </div>
      {isSticky && (
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid #e2e8f0",boxShadow:"0 -2px 12px rgba(0,0,0,0.06)",zIndex:50,padding:"14px 24px"}}>
          <div style={{maxWidth:680,margin:"0 auto",padding:"0 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            {step===2
              ? <button onClick={goBack} style={{background:"none",border:"none",cursor:"pointer",fontFamily:F.b,fontSize:13,color:"#64748b",padding:0,display:"flex",alignItems:"center",gap:6}}>← Back</button>
              : <div />
            }
            {step===1
              ? <button onClick={goNext} disabled={!hasSel} style={{padding:"12px 32px",background:hasSel?C.red:"#e2e8f0",color:hasSel?"#fff":"#94a3b8",border:"none",borderRadius:6,fontFamily:F.b,fontSize:14,fontWeight:700,letterSpacing:1,cursor:hasSel?"pointer":"default",transition:"all .2s"}}>Next →</button>
              : <button onClick={handleSubmit} style={{padding:"12px 32px",background:C.red,color:"#fff",border:"none",borderRadius:6,fontFamily:F.b,fontSize:14,fontWeight:700,letterSpacing:1,cursor:"pointer"}}>Submit</button>
            }
          </div>
        </div>
      )}
      {NS_FOOTER(nav)}
    </div>
  );
}

function NSPlayerPortal({nav}) {
  var dm = useState(false); var devMode = dm[0]; var setDevMode = dm[1];
  var tr = useState("vet"); var tier = tr[0]; var setTier = tr[1];
  var pr = useState("yes"); var programs = pr[0]; var setPrograms = pr[1];
  var tc = useState(2); var teamCount = tc[0]; var setTeamCount = tc[1];

  var DISPLAY_NAME = "Player 1";
  var ALL_TEAMS = [
    {
      id:"c",
      label:"CAHL C League",
      tag:"East",
      nextGame:{dow:"Sunday",date:"Jun 7, 2026",time:"7:30 PM",opp:"Team A",loc:"Chiller North",home:true},
      record:{w:8,l:3,t:1,gp:12},
      myStats:{gp:12,g:8,a:6,pts:14,pim:4},
      games:[
        {date:"Jun 21",time:"8:00 PM", loc:"Chiller Easton",opp:"Storm",   away:false,upcoming:true},
        {date:"Jun 14",time:"6:00 PM", loc:"Chiller Dublin",opp:"Rangers", away:true, upcoming:true},
        {date:"Jun 7", time:"7:30 PM", loc:"Chiller North", opp:"Team A",  away:false,upcoming:true},
        {date:"May 22",opp:"Predators",    gf:4,ga:2,r:"W"},
        {date:"May 15",opp:"Blue Jackets", gf:3,ga:3,r:"T"},
        {date:"May 8", opp:"Rangers",      gf:2,ga:5,r:"L"},
        {date:"May 1", opp:"Knights",      gf:4,ga:1,r:"W"},
        {date:"Apr 24",opp:"Storm",        gf:3,ga:2,r:"W"},
        {date:"Apr 17",opp:"Wolves",       gf:1,ga:3,r:"L"},
        {date:"Apr 10",opp:"Eagles",       gf:5,ga:0,r:"W"},
        {date:"Apr 3", opp:"Predators",    gf:2,ga:4,r:"L"},
        {date:"Mar 27",opp:"Blue Jackets", gf:4,ga:3,r:"W"},
        {date:"Mar 20",opp:"Rangers",      gf:3,ga:1,r:"W"},
        {date:"Mar 13",opp:"Knights",      gf:2,ga:3,r:"L"},
        {date:"Mar 6", opp:"Storm",        gf:4,ga:2,r:"W"},
        {date:"Feb 27",opp:"Wolves",       gf:3,ga:1,r:"W"},
      ],
      lines:{
        set:true,
        setBy:"Coach Name",
        offense:[
          {lw:"Player 2",c:"Player 1",rw:"Player 3"},
          {lw:"Player 4",c:"Player 5",rw:"Player 6"},
          {lw:"Player 7",c:"Player 8",rw:"Player 9"},
        ],
        defense:[
          {ld:"Player 10",rd:"Player 11"},
          {ld:"Player 12",rd:"Player 13"},
        ],
        goalie:"Player 14",
      },
    },
    {
      id:"d",
      label:"CAHL D League",
      tag:"West A",
      nextGame:{dow:"Saturday",date:"Jun 6, 2026",time:"9:15 PM",opp:"Team B",loc:"Chiller Easton",home:false},
      record:{w:5,l:5,t:2,gp:12},
      myStats:{gp:10,g:3,a:5,pts:8,pim:2},
      games:[
        {date:"Jun 20",time:"8:30 PM", loc:"Chiller Dublin",opp:"Wolves",  away:false,upcoming:true},
        {date:"Jun 13",time:"7:00 PM", loc:"Chiller Easton",opp:"Knights", away:true, upcoming:true},
        {date:"Jun 6", time:"6:30 PM", loc:"Chiller North", opp:"Team B",  away:false,upcoming:true},
        {date:"May 21",opp:"Knights", gf:5,ga:1,r:"W"},
        {date:"May 14",opp:"Storm",   gf:2,ga:4,r:"L"},
        {date:"May 7", opp:"Wolves",  gf:3,ga:3,r:"T"},
        {date:"Apr 30",opp:"Thunder", gf:4,ga:2,r:"W"},
        {date:"Apr 23",opp:"Knights", gf:1,ga:3,r:"L"},
        {date:"Apr 16",opp:"Storm",   gf:3,ga:3,r:"T"},
        {date:"Apr 9", opp:"Wolves",  gf:2,ga:4,r:"L"},
        {date:"Apr 2", opp:"Thunder", gf:4,ga:1,r:"W"},
        {date:"Mar 26",opp:"Knights", gf:1,ga:2,r:"L"},
        {date:"Mar 19",opp:"Storm",   gf:3,ga:1,r:"W"},
        {date:"Mar 12",opp:"Wolves",  gf:2,ga:3,r:"L"},
        {date:"Mar 5", opp:"Thunder", gf:5,ga:2,r:"W"},
      ],
      lines:{set:false},
    },
    {
      id:"gc",
      label:"Guardians Cup Tournament",
      tag:"Tournament",
      nextGame:{dow:"Monday",date:"Jun 8, 2026",time:"11:00 AM",opp:"Team C",loc:"Nationwide Ice",home:true},
      record:{w:1,l:0,t:0,gp:1},
      myStats:{gp:1,g:2,a:0,pts:2,pim:0},
      games:[
        {date:"Jun 8",time:"2:00 PM",  loc:"Nationwide Ice",opp:"Team E",away:false,upcoming:true},
        {date:"Jun 8",time:"11:00 AM", loc:"Nationwide Ice",opp:"Team C",away:false,upcoming:true},
        {date:"Jun 1",opp:"Team D",gf:4,ga:2,r:"W"},
      ],
      lines:{set:false},
    },
  ];
  var TEAMS = ALL_TEAMS.slice(0, teamCount).sort(function(a,b){ return new Date(a.nextGame.date) - new Date(b.nextGame.date); });
  var ALL_PROGRAMS = [
    {label:"Guardians Cup Tournament",season:"Winter 2026",date:"Aug 15–17, 2026",registerBy:"Jul 15, 2026",desc:"Registration is open for the Guardians Cup Tournament. Sign up now to compete.",tiers:["disabled"]},
    {label:"Winter C League",season:"Winter 2026",date:"Sep 6 – Dec 20, 2026",registerBy:"Aug 1, 2026",desc:"Winter season registration is now open for the C League.",tiers:["disabled","vet"]},
    {label:"Winter D League",season:"Winter 2026",date:"Sep 6 – Dec 20, 2026",registerBy:"Aug 1, 2026",desc:"Winter season registration is now open for the D League.",tiers:["disabled","vet"]},
    {label:"Car Wash",season:"Winter 2026",date:"Jun 21, 2026",registerBy:"Jun 10, 2026",closingSoon:true,desc:"Help raise funds for the program by volunteering at our upcoming car wash event.",tiers:["disabled","vet","volunteer"]},
  ];
  var AVAIL_PROGRAMS = programs === "no" ? [] : ALL_PROGRAMS.filter(function(p){ return p.tiers.indexOf(tier) >= 0; });
  var ORD = ["1st","2nd","3rd"];
  var nameCell = function(name) {
    var me = name === DISPLAY_NAME;
    return <span style={{fontFamily:F.b,fontSize:13,color:me?C.red:"#334155",fontWeight:me?700:400}}>{name}</span>;
  };
  var thStyle = function(align) { return {fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase",textAlign:align||"left"}; };
  var devSelect = function(label, value, setter, opts) {
    return (
      <label style={{display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontFamily:F.b,fontSize:11,color:"rgba(255,255,255,0.4)"}}>{label}</span>
        <select value={value} onChange={function(e){setter(e.target.value);}} style={{background:"rgba(167,139,250,0.12)",border:"1px solid rgba(167,139,250,0.3)",borderRadius:4,fontFamily:F.b,fontSize:11,color:"#a78bfa",padding:"3px 8px",cursor:"pointer",outline:"none"}}>
          {opts.map(function(o){ return <option key={o.value} value={o.value} style={{background:"#1e1b4b",color:"#a78bfa"}}>{o.label}</option>; })}
        </select>
      </label>
    );
  };

  var carouselRef = useRef(null);
  var cso = useState(false); var carouselOverflows = cso[0]; var setCarouselOverflows = cso[1];
  useEffect(function() {
    var el = carouselRef.current;
    if (el) setCarouselOverflows(el.scrollWidth > el.clientWidth);
  }, [AVAIL_PROGRAMS.length]);
  var scrollCarousel = function(dir) {
    if (carouselRef.current) carouselRef.current.scrollBy({left: dir * 296, behavior:"smooth"});
  };

  return (
    <div style={{background:"#f1f5f9",minHeight:"100vh"}}>
      <NSHeader nav={nav} curPage="ns-portal" isLoggedIn={true} />

      {devMode && (
        <div style={{background:"#1e1b4b",padding:"8px 24px",display:"flex",alignItems:"center",gap:20,position:"sticky",top:64,zIndex:90}}>
          <span style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:"#a78bfa",background:"rgba(167,139,250,0.15)",padding:"2px 8px",borderRadius:4,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>Dev</span>
          {devSelect("Player Tier:", tier, setTier, [
            {value:"vet",label:"Veteran"},
            {value:"disabled",label:"Disabled"},
            {value:"volunteer",label:"Volunteer"},
          ])}
          {devSelect("Programs:", programs, setPrograms, [
            {value:"yes",label:"Available"},
            {value:"no",label:"None"},
          ])}
          {devSelect("Teams:", String(teamCount), function(v){setTeamCount(Number(v));}, [
            {value:"0",label:"0 Teams"},
            {value:"1",label:"1 Team"},
            {value:"2",label:"2 Teams"},
            {value:"3",label:"3 Teams"},
          ])}
        </div>
      )}

      <main style={{maxWidth:1100,margin:"0 auto",padding:"32px 24px 60px"}}>

        {/* Open Sign-Ups — only shown when programs are available */}
        {AVAIL_PROGRAMS.length > 0 && (
          <div style={{marginBottom:40}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div style={{fontFamily:NS_FH,fontSize:22,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",borderLeft:"3px solid "+C.red,paddingLeft:12,lineHeight:1}}>Open Sign-Ups</div>
              {carouselOverflows && (
                <div style={{display:"flex",gap:8}}>
                  <button onClick={function(){scrollCarousel(-1);}} style={{width:34,height:34,borderRadius:"50%",background:C.navy,border:"none",color:"#fff",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,flexShrink:0}}>‹</button>
                  <button onClick={function(){scrollCarousel(1);}} style={{width:34,height:34,borderRadius:"50%",background:C.navy,border:"none",color:"#fff",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,flexShrink:0}}>›</button>
                </div>
              )}
            </div>
            <div ref={carouselRef} style={{display:"flex",gap:16,overflowX:"hidden",scrollBehavior:"smooth"}}>
              {AVAIL_PROGRAMS.map(function(prog,i){return (
                <div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"20px 24px",display:"flex",flexDirection:"column",gap:10,minWidth:280,maxWidth:280,flexShrink:0}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
                    <div>
                      <div style={{fontFamily:NS_FH,fontSize:18,fontWeight:700,color:"#1e293b",letterSpacing:1}}>{prog.label}</div>
                      {prog.date && <div style={{fontFamily:F.b,fontSize:12,color:"#94a3b8",marginTop:2}}>{prog.date}</div>}
                    </div>
                    {prog.closingSoon
                      ? <div style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:"#b45309",background:"#fef3c7",padding:"3px 10px",borderRadius:20,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap",flexShrink:0}}>Closing Soon</div>
                      : <div style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:"#16a34a",background:"#dcfce7",padding:"3px 10px",borderRadius:20,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap",flexShrink:0}}>Open</div>
                    }
                  </div>
                  <div style={{fontFamily:F.b,fontSize:13,color:"#64748b"}}>{prog.desc}</div>
                  <div style={{marginTop:"auto"}}>
                    {prog.registerBy && <div style={{fontFamily:F.b,fontSize:11,color:"#94a3b8",marginBottom:6}}>Register by <span style={{color:"#475569",fontWeight:700}}>{prog.registerBy}</span></div>}
                    <button style={{width:"100%",padding:"9px 0",background:C.navy,color:"#fff",border:"none",borderRadius:6,fontFamily:F.b,fontSize:13,fontWeight:700,letterSpacing:1,cursor:"pointer"}}>Register</button>
                  </div>
                </div>
              );})}
            </div>
          </div>
        )}

        {/* One section per team */}
        {TEAMS.map(function(team) {
          var lg = team.lines;
          return (
            <div key={team.id} style={{marginBottom:40}}>

              {/* Section header */}
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,borderLeft:"3px solid "+C.red,paddingLeft:12}}>
                <div style={{fontFamily:NS_FH,fontSize:22,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",lineHeight:1}}>{team.label}</div>
                <span style={{fontFamily:F.b,fontSize:11,fontWeight:700,color:C.navy,background:"rgba(0,41,77,0.09)",padding:"3px 10px",borderRadius:20,letterSpacing:0.5,alignSelf:"center"}}>{team.tag}</span>
              </div>

              {/* Next Game */}
              <div style={{marginBottom:16}}>
                <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
                  <div style={{background:C.navy,padding:"12px 20px"}}>
                    <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.55)",letterSpacing:2,textTransform:"uppercase"}}>Next Game</div>
                  </div>
                  <div style={{padding:"14px 20px",display:"flex",alignItems:"center",gap:24}}>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:NS_FH,fontSize:28,fontWeight:700,color:"#1e293b",letterSpacing:1}}>vs {team.nextGame.opp}</div>
                      <div style={{fontFamily:F.b,fontSize:13,color:"#64748b",marginTop:6}}>{team.nextGame.dow}, {team.nextGame.date} · {team.nextGame.time}</div>
                      <div style={{fontFamily:F.b,fontSize:13,color:"#64748b",marginTop:2}}>{team.nextGame.loc}</div>
                    </div>
                    <span style={{fontFamily:F.b,fontSize:11,fontWeight:700,color:team.nextGame.home?"#fff":"#8c7046",background:team.nextGame.home?C.olive:"#f5e9d6",padding:"4px 12px",borderRadius:20,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap"}}>
                      {team.nextGame.home?"Home":"Away"}
                    </span>
                  </div>
                  <div style={{borderTop:"1px solid #e2e8f0"}}>
                    <div style={{padding:"10px 20px",background:"#f8fafc",borderBottom:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:700,color:C.navy,letterSpacing:2,textTransform:"uppercase"}}>Game Lines</div>
                      {lg.set && <div style={{fontFamily:F.b,fontSize:11,color:"#94a3b8"}}>Set by {lg.setBy}</div>}
                    </div>
                    {lg.set ? (
                      <div style={{padding:"16px 24px"}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
                          <div>
                            <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:700,color:"#94a3b8",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Offense</div>
                            <div style={{border:"1px solid #e2e8f0",borderRadius:8,overflow:"hidden"}}>
                              <div style={{display:"grid",gridTemplateColumns:"44px 1fr 1fr 1fr",background:"#f8fafc",borderBottom:"1px solid #e2e8f0",padding:"6px 14px"}}>
                                <div style={thStyle()}>Line</div><div style={thStyle()}>LW</div><div style={thStyle("center")}>C</div><div style={thStyle("right")}>RW</div>
                              </div>
                              {lg.offense.map(function(ln,i){return (
                                <div key={i} style={{display:"grid",gridTemplateColumns:"44px 1fr 1fr 1fr",padding:"8px 14px",borderBottom:i<lg.offense.length-1?"1px solid #f1f5f9":"none",alignItems:"center"}}>
                                  <div style={{fontFamily:F.b,fontSize:11,fontWeight:700,color:"#cbd5e1"}}>{ORD[i]}</div>
                                  <div>{nameCell(ln.lw)}</div>
                                  <div style={{textAlign:"center"}}>{nameCell(ln.c)}</div>
                                  <div style={{textAlign:"right"}}>{nameCell(ln.rw)}</div>
                                </div>
                              );})}
                            </div>
                          </div>
                          <div>
                            <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:700,color:"#94a3b8",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Defense</div>
                            <div style={{border:"1px solid #e2e8f0",borderRadius:8,overflow:"hidden"}}>
                              <div style={{display:"grid",gridTemplateColumns:"44px 1fr 1fr",background:"#f8fafc",borderBottom:"1px solid #e2e8f0",padding:"6px 14px"}}>
                                <div style={thStyle()}>Pair</div><div style={thStyle()}>LD</div><div style={thStyle("right")}>RD</div>
                              </div>
                              {lg.defense.map(function(pr,i){return (
                                <div key={i} style={{display:"grid",gridTemplateColumns:"44px 1fr 1fr",padding:"8px 14px",borderBottom:i<lg.defense.length-1?"1px solid #f1f5f9":"none",alignItems:"center"}}>
                                  <div style={{fontFamily:F.b,fontSize:11,fontWeight:700,color:"#cbd5e1"}}>{ORD[i]}</div>
                                  <div>{nameCell(pr.ld)}</div>
                                  <div style={{textAlign:"right"}}>{nameCell(pr.rd)}</div>
                                </div>
                              );})}
                            </div>
                            <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8}}>
                              <div style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1}}>Goalie</div>
                              <div>{nameCell(lg.goalie)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{padding:"16px 24px",textAlign:"center"}}>
                        <div style={{fontFamily:F.b,fontSize:13,color:"#94a3b8"}}>Lines have not been set for this game yet.</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Season Schedule */}
              {(team.games && team.games.length > 0) && (
                <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden",marginBottom:16}}>
                  <div style={{background:C.navy,padding:"12px 20px"}}>
                    <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.55)",letterSpacing:2,textTransform:"uppercase"}}>Season Schedule</div>
                  </div>
                  <div style={{maxHeight:190,overflowY:"auto"}}>
                    <div style={{display:"grid",gridTemplateColumns:"80px 1fr 130px 44px",padding:"6px 16px",borderBottom:"1px solid #e2e8f0",background:"#fff",position:"sticky",top:0,zIndex:1}}>
                      <div style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>Date</div>
                      <div style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>Opponent</div>
                      <div style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",textTransform:"uppercase"}}>Result</div>
                      <div />
                    </div>
                    {team.games.map(function(g,j){return (
                      <div key={j} style={{display:"grid",gridTemplateColumns:"80px 1fr 130px 44px",padding:"6px 16px",borderBottom:j<team.games.length-1?"1px solid #f1f5f9":"none",alignItems:"center",background:g.upcoming?"#f0f9ff":"transparent"}}>
                        <div style={{fontFamily:F.b,fontSize:12,color:g.upcoming?"#2563eb":"#94a3b8",fontWeight:g.upcoming?600:400}}>{g.date}</div>
                        <div style={{fontFamily:F.b,fontSize:13,color:"#334155"}}>{g.upcoming&&g.away?"@ ":""}{g.opp}</div>
                        <div>
                          {g.upcoming
                            ? <div><div style={{fontFamily:F.b,fontSize:12,color:"#2563eb",fontWeight:600}}>{g.time}</div><div style={{fontFamily:F.b,fontSize:11,color:"#64748b",marginTop:1}}>{g.loc}</div></div>
                            : <div style={{fontFamily:F.b,fontSize:13,color:"#334155",fontWeight:600}}>{g.gf}–{g.ga}</div>
                          }
                        </div>
                        <div>
                          {!g.upcoming&&<div style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:NS_RC[g.r],background:NS_RBG[g.r],padding:"2px 6px",borderRadius:4,textAlign:"center"}}>{NS_RL[g.r]}</div>}
                        </div>
                      </div>
                    );})}
                  </div>
                </div>
              )}

              {/* Season Record + My Stats */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                <div style={{background:C.navy,borderRadius:10,padding:"16px 20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
                  <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.55)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Season Record</div>
                  <div style={{fontFamily:NS_FH,fontSize:44,fontWeight:700,color:"#fff",letterSpacing:2,lineHeight:1}}>{team.record.w}–{team.record.l}–{team.record.t}</div>
                  <div style={{fontFamily:F.b,fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:6,letterSpacing:1}}>W–L–T · {team.record.gp} GP</div>
                </div>
                <div style={{background:C.navy,borderRadius:10,padding:"16px 20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
                  <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.55)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>My Stats</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,width:"100%",marginTop:4}}>
                    {[
                      {label:"GP",  val:team.myStats.gp},
                      {label:"G",   val:team.myStats.g},
                      {label:"A",   val:team.myStats.a},
                      {label:"PTS", val:team.myStats.pts},
                      {label:"PIM", val:team.myStats.pim},
                    ].map(function(s,i){return (
                      <div key={i} style={{textAlign:"center"}}>
                        <div style={{fontFamily:NS_FH,fontSize:28,fontWeight:700,color:"rgba(255,255,255,0.85)",letterSpacing:1,lineHeight:1}}>{s.val}</div>
                        <div style={{fontFamily:F.b,fontSize:10,color:"rgba(255,255,255,0.4)",marginTop:5,letterSpacing:1,textTransform:"uppercase"}}>{s.label}</div>
                      </div>
                    );})}
                  </div>
                </div>
              </div>

            </div>
          );
        })}


      </main>
      {NS_FOOTER(nav, devMode, setDevMode)}
    </div>
  );
}

function NSProfilePage({nav}) {
  var PLAYER_NUMBER = 4;
  var fv = useState({firstName:"Player",lastName:"One",email:"player@example.com",phone:"(614) 555-0100",branch:"Navy"});
  var formVals = fv[0]; var setFormVals = fv[1];
  var ph = useState(null); var photoURL = ph[0]; var setPhotoURL = ph[1];
  var sv = useState(false); var saved = sv[0]; var setSaved = sv[1];
  var ev = useState({}); var errors = ev[0]; var setErrors = ev[1];
  var pv = useState({current:"",newPw:"",confirm:""}); var pwVals = pv[0]; var setPwVals = pv[1];
  var pe = useState({}); var pwErrors = pe[0]; var setPwErrors = pe[1];
  var ps = useState(false); var pwSaved = ps[0]; var setPwSaved = ps[1];
  var fileRef = useRef(null);

  var setField = function(key) {
    return function(e) {
      setFormVals(Object.assign({},formVals,{[key]:e.target.value}));
      if (errors[key]) setErrors(Object.assign({},errors,{[key]:undefined}));
      setSaved(false);
    };
  };
  var handlePhotoChange = function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) { setPhotoURL(ev.target.result); };
    reader.readAsDataURL(file);
    setSaved(false);
  };
  var formatPhone = function(v) {
    var d = v.replace(/\D/g,"").slice(0,10);
    if (d.length <= 3) return d.length ? "("+d : "";
    if (d.length <= 6) return "("+d.slice(0,3)+") "+d.slice(3);
    return "("+d.slice(0,3)+") "+d.slice(3,6)+"-"+d.slice(6);
  };
  var validate = function() {
    var e = {};
    if (!formVals.firstName.trim()) e.firstName = "Required";
    if (!formVals.lastName.trim()) e.lastName = "Required";
    if (!formVals.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formVals.email)) e.email = "Enter a valid email";
    if (!formVals.phone || formVals.phone.replace(/\D/g,"").length < 10) e.phone = "Enter a valid phone number";
    return e;
  };
  var handleSave = function(e) {
    e.preventDefault();
    var errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSaved(true);
  };
  var setPwField = function(key) {
    return function(e) {
      setPwVals(Object.assign({},pwVals,{[key]:e.target.value}));
      if (pwErrors[key]) setPwErrors(Object.assign({},pwErrors,{[key]:undefined}));
      setPwSaved(false);
    };
  };
  var validatePw = function() {
    var e = {};
    if (!pwVals.current) e.current = "Required";
    if (!pwVals.newPw) e.newPw = "Required";
    else if (pwVals.newPw.length < 8 || !/[A-Z]/.test(pwVals.newPw) || !/[0-9]/.test(pwVals.newPw) || !/[^A-Za-z0-9]/.test(pwVals.newPw)) e.newPw = true;
    if (!pwVals.confirm) e.confirm = "Required";
    else if (pwVals.newPw && pwVals.confirm !== pwVals.newPw) e.confirm = "Passwords do not match";
    return e;
  };
  var handlePwSave = function(e) {
    e.preventDefault();
    var errs = validatePw();
    setPwErrors(errs);
    if (Object.keys(errs).length === 0) { setPwSaved(true); setPwVals({current:"",newPw:"",confirm:""}); }
  };
  var fBase = {width:"100%",padding:"10px 14px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,boxSizing:"border-box",outline:"none",color:"#1e293b",background:"#fff"};
  var errBorder = function(key) { return errors[key] ? {borderColor:C.red} : {}; };
  var ErrMsg = function(key) { return errors[key] ? <div style={{fontFamily:F.b,fontSize:11,color:C.red,marginTop:4}}>{errors[key]}</div> : null; };
  var pwErrBorder = function(key) { return pwErrors[key] ? {borderColor:C.red} : {}; };
  var PwErrMsg = function(key) { return pwErrors[key] ? <div style={{fontFamily:F.b,fontSize:11,color:C.red,marginTop:4}}>{pwErrors[key]}</div> : null; };
  var lbl = {display:"block",fontFamily:F.b,fontSize:11,fontWeight:700,color:"#475569",letterSpacing:1,textTransform:"uppercase",marginBottom:6};
  var cardHeader = {background:C.navy,padding:"12px 20px"};
  var cardHeaderLabel = {fontFamily:NS_FH,fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.55)",letterSpacing:2,textTransform:"uppercase"};

  return (
    <div style={{background:"#f1f5f9",minHeight:"100vh"}}>
      <NSHeader nav={nav} curPage="ns-portal" isLoggedIn={true} />
      <div style={{maxWidth:720,margin:"0 auto",padding:"40px 24px 80px"}}>

        <div style={{marginBottom:28}}>
          <button onClick={function(){nav("ns-portal");}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:F.b,fontSize:13,color:"#64748b",padding:0,marginBottom:14,display:"flex",alignItems:"center",gap:6}}>← Back to portal</button>
          <div style={{fontFamily:NS_FH,fontSize:32,fontWeight:700,color:C.navy,letterSpacing:2,textTransform:"uppercase"}}>{PLAYER_NUMBER ? "#"+PLAYER_NUMBER+" " : ""}{formVals.firstName} {formVals.lastName}</div>
        </div>

        {/* Profile Photo */}
        <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden",marginBottom:20}}>
          <div style={cardHeader}><div style={cardHeaderLabel}>Profile Photo</div></div>
          <div style={{padding:"24px 28px",display:"flex",alignItems:"center",gap:24}}>
            <div style={{width:88,height:88,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:"3px solid #e2e8f0",background:"#f1f5f9"}}>
              {photoURL
                ? <img src={photoURL} alt="Profile" style={{width:"100%",height:"100%",objectFit:"cover"}} />
                : <svg viewBox="0 0 200 200" style={{width:"100%",height:"100%"}}><circle cx="100" cy="75" r="35" fill="#9ca3af"/><ellipse cx="100" cy="170" rx="55" ry="45" fill="#9ca3af"/></svg>
              }
            </div>
            <div>
              <div style={{fontFamily:F.b,fontSize:13,color:"#64748b",marginBottom:12}}>Upload a photo to personalize your profile. JPG or PNG accepted.</div>
              <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png" style={{display:"none"}} onChange={handlePhotoChange} />
              <div style={{display:"flex",gap:10}}>
                <button onClick={function(){fileRef.current&&fileRef.current.click();}} style={{padding:"8px 18px",background:C.navy,color:"#fff",border:"none",borderRadius:6,fontFamily:F.b,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                  {photoURL ? "Change photo" : "Upload photo"}
                </button>
                {photoURL && (
                  <button onClick={function(){setPhotoURL(null);setSaved(false);}} style={{padding:"8px 18px",background:"none",color:"#64748b",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,fontWeight:600,cursor:"pointer"}}>Remove</button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
          <div style={cardHeader}><div style={cardHeaderLabel}>Personal Information</div></div>
          <form onSubmit={handleSave} style={{padding:"24px 28px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <div>
                <label style={lbl}>First Name</label>
                <input type="text" value={formVals.firstName} onChange={setField("firstName")} style={Object.assign({},fBase,errBorder("firstName"))} />
                {ErrMsg("firstName")}
              </div>
              <div>
                <label style={lbl}>Last Name</label>
                <input type="text" value={formVals.lastName} onChange={setField("lastName")} style={Object.assign({},fBase,errBorder("lastName"))} />
                {ErrMsg("lastName")}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <div>
                <label style={lbl}>Email</label>
                <input type="email" value={formVals.email} onChange={setField("email")} style={Object.assign({},fBase,errBorder("email"))} />
                {ErrMsg("email")}
              </div>
              <div>
                <label style={lbl}>Phone</label>
                <input type="tel" value={formVals.phone} onChange={function(e){var v=formatPhone(e.target.value);setFormVals(Object.assign({},formVals,{phone:v}));if(errors.phone)setErrors(Object.assign({},errors,{phone:undefined}));setSaved(false);}} style={Object.assign({},fBase,errBorder("phone"))} />
                {ErrMsg("phone")}
              </div>
            </div>
            <div style={{marginBottom:24}}>
              <label style={lbl}>Branch of Service</label>
              <select value={formVals.branch} onChange={setField("branch")} style={Object.assign({},fBase,{appearance:"none"})}>
                <option value="">Select branch...</option>
                {["Army","Navy","Marine Corps","Air Force","Space Force","Coast Guard","National Guard","N/A"].map(function(b){return <option key={b}>{b}</option>;})}
              </select>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:14,paddingTop:4}}>
              {saved && <div style={{fontFamily:F.b,fontSize:13,color:"#16a34a",fontWeight:600}}>Changes saved.</div>}
              <button type="submit" style={{padding:"10px 28px",background:C.red,color:"#fff",border:"none",borderRadius:6,fontFamily:F.b,fontSize:13,fontWeight:700,letterSpacing:1,cursor:"pointer"}}>Save changes</button>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden",marginTop:20}}>
          <div style={cardHeader}><div style={cardHeaderLabel}>Change Password</div></div>
          <form onSubmit={handlePwSave} style={{padding:"24px 28px"}}>
            <div style={{marginBottom:16}}>
              <label style={lbl}>Current password</label>
              <input type="password" value={pwVals.current} onChange={setPwField("current")} style={Object.assign({},fBase,pwErrBorder("current"))} />
              {PwErrMsg("current")}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
              <div>
                <label style={lbl}>New password</label>
                <input type="password" value={pwVals.newPw} onChange={setPwField("newPw")} style={Object.assign({},fBase,pwErrBorder("newPw"))} />
                <div style={{fontFamily:F.b,fontSize:11,color:pwErrors.newPw?C.red:"#94a3b8",marginTop:6,lineHeight:1.6}}>8+ characters &middot; 1 uppercase &middot; 1 number &middot; 1 special character</div>
              </div>
              <div>
                <label style={lbl}>Confirm new password</label>
                <input type="password" value={pwVals.confirm} onChange={setPwField("confirm")} style={Object.assign({},fBase,pwErrBorder("confirm"),(pwVals.confirm&&pwVals.newPw&&pwVals.confirm!==pwVals.newPw?{borderColor:C.red}:{}))} />
                {(pwErrors.confirm||(pwVals.confirm&&pwVals.newPw&&pwVals.confirm!==pwVals.newPw))
                  ? <div style={{fontFamily:F.b,fontSize:11,color:C.red,marginTop:6,lineHeight:1.6}}>Passwords do not match</div>
                  : <div style={{fontFamily:F.b,fontSize:11,color:"#94a3b8",marginTop:6,lineHeight:1.6}}>Re-enter your password to confirm.</div>
                }
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:14,paddingTop:4}}>
              {pwSaved && <div style={{fontFamily:F.b,fontSize:13,color:"#16a34a",fontWeight:600}}>Password updated.</div>}
              <button type="submit" style={{padding:"10px 28px",background:C.red,color:"#fff",border:"none",borderRadius:6,fontFamily:F.b,fontSize:13,fontWeight:700,letterSpacing:1,cursor:"pointer"}}>Update password</button>
            </div>
          </form>
        </div>

      </div>
      {NS_FOOTER(nav)}
    </div>
  );
}
export default function CWHSite() {
  var pg = useState("home"); var page = pg[0]; var setPage = pg[1];
  var nav = function(p) { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); };
  var aboutPages = ["about","news","leadership","sponsors","become-sponsor","contributor"];
  var aboutItems = [{l:"About Us",p:"about"},{l:"News",p:"news"},{l:"Leadership",p:"leadership"},{l:"Sponsors",p:"sponsors"},{l:"Sponsor",p:"become-sponsor"},{l:"Contribute",p:"contributor"}];
  var isAbout = aboutPages.indexOf(page) >= 0;
  var isNewSite = page === "new-site" || page === "ns-about" || page === "ns-leadership" || page === "ns-sponsors" || page === "ns-portal" || page === "ns-profile" || page === "ns-join";

  var content;
  switch (page) {
    case "home": content = <HomePage nav={nav} />; break;
    case "about": content = <AboutPage />; break;
    case "leadership": content = <LeadershipPage />; break;
    case "sponsors": content = <SponsorsPage />; break;
    case "news": content = <NewsPage />; break;
    case "become-sponsor": content = <ResourcePage page="become-sponsor" />; break;
    case "contributor": content = <ResourcePage page="contributor" />; break;
    case "cahl": content = <ProgramPage page="cahl" />; break;
    case "disabled-hockey": content = <ProgramPage page="disabled-hockey" />; break;
    case "stick-puck": content = <ProgramPage page="stick-puck" />; break;
    case "schedule": content = <SchedulePage />; break;
    case "lineup": content = <LineupPage />; break;
    case "leaderboard": content = <LeaderboardPage />; break;
    case "recaps": content = <RecapsPage />; break;
    case "ice-schedules": content = <IceSchedulesPage />; break;
    case "gallery": content = <GalleryPage />; break;
    case "team-dv": content = <TeamPage team="team-dv" />; break;
    case "new-site": content = <NewSitePage nav={nav} />; break;
    case "ns-about": content = <NSAboutPage nav={nav} />; break;
    case "ns-leadership": content = <NSLeadershipPage nav={nav} />; break;
    case "ns-sponsors": content = <NSSponsorsPage nav={nav} />; break;
    case "ns-join": content = <NSJoinPage nav={nav} />; break;
    case "ns-portal": content = <NSPlayerPortal nav={nav} />; break;
    case "ns-profile": content = <NSProfilePage nav={nav} />; break;
    case "team-c": content = <TeamPage team="team-c" />; break;
    case "team-d": content = <TeamPage team="team-d" />; break;
    case "mental-health": content = <ResourcePage page="mental-health" />; break;
    case "reg-guides": content = <ResourcePage page="reg-guides" />; break;
    case "players-corner": content = <ResourcePage page="players-corner" />; break;
    case "coaching": content = <ResourcePage page="coaching" />; break;
    default: content = <HomePage nav={nav} />;
  }

  if (isNewSite) {
    return <div><link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+3:wght@400;600;700&family=Oswald:wght@400;600;700&display=swap" rel="stylesheet" /><GlobalStyles />{content}</div>;
  }

  return (
    <div style={{background:C.w,minHeight:"100vh"}}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
      <GlobalStyles />
      <Navbar nav={nav} curPage={page} />
      {isAbout && (
        <div style={{paddingTop:110,background:C.olive,borderBottom:"2px solid "+C.red,overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          <div style={{display:"flex",gap:0,padding:"0 16px",minWidth:"max-content",maxWidth:1200,margin:"0 auto"}}>
            {aboutItems.map(function(it,i) {
              return <button key={i} onClick={function(){nav(it.p)}} style={{background:"none",border:"none",cursor:"pointer",padding:"12px 16px",fontFamily:F.h,fontSize:16,fontWeight:400,color:it.p===page?"#fff":"rgba(255,255,255,0.6)",borderBottom:it.p===page?"2px solid "+C.w:"2px solid transparent",textTransform:"uppercase",letterSpacing:2,whiteSpace:"nowrap"}}>{it.l}</button>;
            })}
          </div>
        </div>
      )}
      {content}
      <Footer />
    </div>
  );
}
