import { useState, useEffect, useRef } from "react";

/* CWH SITE v3 — Exact Crossbar Match */

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
        {attendance.games.map(function(game, gi) {
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
export default function CWHSite() {
  var pg = useState("home"); var page = pg[0]; var setPage = pg[1];
  var nav = function(p) { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); };
  var aboutPages = ["about","news","leadership","sponsors","become-sponsor","contributor"];
  var aboutItems = [{l:"About Us",p:"about"},{l:"News",p:"news"},{l:"Leadership",p:"leadership"},{l:"Sponsors",p:"sponsors"},{l:"Sponsor",p:"become-sponsor"},{l:"Contribute",p:"contributor"}];
  var isAbout = aboutPages.indexOf(page) >= 0;

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
    case "team-c": content = <TeamPage team="team-c" />; break;
    case "team-d": content = <TeamPage team="team-d" />; break;
    case "mental-health": content = <ResourcePage page="mental-health" />; break;
    case "reg-guides": content = <ResourcePage page="reg-guides" />; break;
    case "players-corner": content = <ResourcePage page="players-corner" />; break;
    case "coaching": content = <ResourcePage page="coaching" />; break;
    default: content = <HomePage nav={nav} />;
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
