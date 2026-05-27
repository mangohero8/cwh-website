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
  { name:"TJ Nocar", role:"Vice President", branch:"U.S. Marine Corps", years:"2008-2012", img:IMG.tj },
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
  { date:"March 12, 2026", title:"Columbus Warriors Debut at the Guardian's Cup in Rochester", img:IMG.guardiansCup, style:2 },
  { date:"December 16, 2025", title:"Columbus Warriors Close Out Strong Fall Session in CAHL's C South League", img:IMG.newsCahl, style:1 },
  { date:"November 24, 2025", title:"Grand Opening, Greater Commitment: Moo Moo Express Car Wash Elevates to Platinum Sponsor", img:IMG.newsMooPlatinum, style:2 },
  { date:"July 29, 2025", title:"Columbus Warrior Hockey Announces Moo Moo Express Car Wash as Gold Sponsor", img:IMG.newsMooGold, style:1 },
  { date:"July 29, 2025", title:"Columbus Warrior Hockey Holds First Official Stick and Puck Session After Formation of 501(c)(3)", img:IMG.newsFirst, style:2 },
];

var TEAMS = [
  { id:"team-dv", name:"DV - Columbus Warriors", league:"Disabled Veterans", color:"#c8a84e", desc:"Adaptive hockey for disabled veterans with 10%+ VA rating or Purple Heart." },
  { id:"team-c", name:"CAHL C - Warriors", league:"CAHL C League", color:C.bl, desc:"Intermediate competitive play in the CAHL C South division." },
  { id:"team-d", name:"CAHL D - Warriors", league:"CAHL D League", color:C.gr, desc:"Recreational division for veterans and beneficiaries of all skill levels." },
];

var STATS = [{p:"Player 1",gp:12,g:8,a:6,pts:14},{p:"Player 2",gp:12,g:5,a:9,pts:14},{p:"Player 3",gp:11,g:6,a:5,pts:11},{p:"Player 4",gp:12,g:4,a:6,pts:10},{p:"Player 5",gp:10,g:3,a:7,pts:10}];

var NAV_ITEMS = [
  { label:"About", ch:[{l:"About Us",p:"about"},{l:"News",p:"news"},{l:"Leadership",p:"leadership"},{l:"Sponsors",p:"sponsors"},{l:"Become a Sponsor",p:"become-sponsor"},{l:"Become a Contributor",p:"contributor"}]},
  { label:"Programs", ch:[{l:"Chiller Adult Hockey League",p:"cahl"},{l:"Disabled Hockey",p:"disabled-hockey"},{l:"Stick & Puck / Drop-In",p:"stick-puck"}]},
  { label:"Schedule", p:"schedule" },
  { label:"Teams", ch:[{l:"DV - Columbus Warriors",p:"team-dv"},{l:"CAHL C - Warriors",p:"team-c"},{l:"CAHL D - Warriors",p:"team-d"}]},
  { label:"Resources", ch:[{l:"Mental Health",p:"mental-health"},{l:"Registration Guides",p:"reg-guides"},{l:"Players Corner",p:"players-corner"},{l:"Coaching for CWH",p:"coaching"}]},
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
            <a href={FORMS.reg} target="_blank" rel="noopener noreferrer" style={{marginLeft:12,padding:"12px 24px",background:C.navy,color:C.w,fontFamily:F.h,fontSize:16,fontWeight:400,textTransform:"uppercase",letterSpacing:2,textDecoration:"none",border:"2px solid rgba(255,255,255,0.4)",borderRadius:24}}>
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
  return (
    <div>
      {/* HERO */}
      <section style={{position:"relative",marginTop:110,height:380,overflow:"hidden"}}>
        <img src={IMG.hero} alt="Columbus Warriors" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center bottom",display:"block"}} />
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.25)"}} />
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.6))",padding:"40px 20px 24px",textAlign:"center"}}>
          <img src={IMG.logo} alt="CWH" style={{width:160,marginBottom:8}} />
          <div style={{fontFamily:F.h,fontSize:22,fontWeight:400,color:C.w,textTransform:"uppercase",letterSpacing:6}}>"From the Rink to Resilience"</div>
        </div>
      </section>

      {/* CTA GRID — 4-column, alternating navy/olive like Crossbar */}
      <section style={{padding:"40px 0",background:C.g1}}>
        <div className="cta-grid" style={{maxWidth:1100,margin:"0 auto",padding:"0 16px",display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:16}}>
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
                style={{display:"block",position:"relative",borderRadius:8,overflow:"hidden",aspectRatio:"1",backgroundImage:"url("+IMG.logo+")",backgroundSize:"70%",backgroundPosition:"center 60%",backgroundRepeat:"no-repeat",backgroundColor:cta.style===1?C.navy:C.olive,textDecoration:"none"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:overlay,display:"flex",alignItems:"flex-start",padding:20}}>
                  <div style={{fontFamily:F.h,fontSize:28,fontWeight:400,color:C.w,textTransform:"uppercase",letterSpacing:2,lineHeight:1.1}}>{cta.label}</div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* SPONSORS */}
      <section style={{padding:"50px 0",background:C.w}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"flex",gap:0,alignItems:"center",justifyContent:"center"}}>
          <div style={{flex:1,textAlign:"center"}}><a href="https://www.moomoocarwash.com/" target="_blank" rel="noopener noreferrer"><img src={IMG.moomoo} alt="Moo Moo" style={{maxWidth:"100%",maxHeight:100}} /></a></div>
          <div style={{flex:1,textAlign:"center"}}><a href="https://www.thechiller.com/" target="_blank" rel="noopener noreferrer"><img src={IMG.chiller} alt="Chiller" style={{maxWidth:"100%",maxHeight:100}} /></a></div>
          <div style={{flex:1,textAlign:"center"}}><a href="https://www.kroger.com/account/communityrewards" target="_blank" rel="noopener noreferrer"><img src={IMG.kroger} alt="Kroger" style={{maxWidth:"100%",maxHeight:100}} /></a></div>
        </div>
      </section>

      {/* NEWS — Grid 3+2 with alternating overlays */}
      <section style={{padding:"80px 0"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px"}}>
          <h2 style={{fontFamily:F.h,fontSize:28,fontWeight:400,color:C.g8,textTransform:"uppercase",letterSpacing:2,margin:"0 0 24px"}}>
            Columbus Warrior Hockey News
          </h2>
          <div className="news-top" style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:16}}>
            {NEWS.slice(0,3).map(function(n, i) {
              var ov = n.style===1 ? "rgba(0,41,77,.75)" : "rgba(82,84,65,.75)";
              return (
                <div key={i} style={{position:"relative",borderRadius:8,overflow:"hidden",aspectRatio:"1",cursor:"pointer"}}>
                  <img src={n.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",top:0,left:0}} />
                  <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:ov}} />
                  <div style={{position:"relative",zIndex:1,padding:20}}>
                    <div style={{fontFamily:F.b,fontSize:12,color:C.w,textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>
                      {n.date}
                    </div>
                    <h3 style={{fontFamily:F.h,fontSize:26,fontWeight:400,color:C.w,textTransform:"uppercase",lineHeight:1.1,margin:0,letterSpacing:1}}>{n.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="news-bottom" style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:16,marginTop:16}}>
            {NEWS.slice(3).map(function(n, i) {
              var ov = n.style===1 ? "rgba(0,41,77,.75)" : "rgba(82,84,65,.75)";
              return (
                <div key={i} style={{position:"relative",borderRadius:8,overflow:"hidden",aspectRatio:"1",cursor:"pointer"}}>
                  <img src={n.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",top:0,left:0}} />
                  <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:ov}} />
                  <div style={{position:"relative",zIndex:1,padding:20}}>
                    <div style={{fontFamily:F.b,fontSize:12,color:C.w,textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>
                      {n.date}
                    </div>
                    <h3 style={{fontFamily:F.h,fontSize:26,fontWeight:400,color:C.w,textTransform:"uppercase",lineHeight:1.1,margin:0,letterSpacing:1}}>{n.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section style={{padding:"50px 16px",background:C.navy,textAlign:"center"}}>
        <h2 style={{fontFamily:F.h,fontSize:24,fontWeight:400,color:C.w,textTransform:"uppercase",letterSpacing:4,margin:"0 0 24px"}}>Follow Columbus Warrior Hockey</h2>
        <div style={{display:"flex",gap:40,justifyContent:"center",alignItems:"center"}}>
          <a href="https://www.facebook.com/ColumbusWarriorHockey/" target="_blank" rel="noopener noreferrer">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/columbuswarriorhockey" target="_blank" rel="noopener noreferrer">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
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

function LeadershipPage() { return <PageWrap title="Leadership">
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
</PageWrap>; }

function SponsorsPage() { return <PageWrap title="Sponsors" sub="Their generous support makes our mission possible.">
  <img src={IMG.sponsorAll} alt="Sponsors" style={{width:"100%",borderRadius:8}} />
  <div style={{marginTop:28}}><Btn href={FORMS.don}>Become a Sponsor</Btn></div>
</PageWrap>; }

function NewsPage() { return <PageWrap title="News">
  {NEWS.map(function(n,i) {
    var ov = n.style===1 ? "rgba(0,41,77,.75)" : "rgba(82,84,65,.75)";
    return (
      <div key={i} style={{position:"relative",borderRadius:8,overflow:"hidden",minHeight:200,marginBottom:16}}>
        <img src={n.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",top:0,left:0}} />
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:ov}} />
        <div style={{position:"relative",zIndex:1,padding:24,minHeight:200,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div style={{fontFamily:F.b,fontSize:12,color:C.w,textTransform:"uppercase",letterSpacing:1.5,marginBottom:6}}>{n.date}</div>
          <h3 style={{fontFamily:F.h,fontSize:24,fontWeight:400,color:C.w,textTransform:"uppercase",lineHeight:1.1,margin:0,letterSpacing:1}}>{n.title}</h3>
        </div>
      </div>
    );
  })}
</PageWrap>; }

function TeamPage({team}) {
  var t = TEAMS.find(function(x){return x.id===team}) || TEAMS[0];
  var st = useState(null); var stats = st[0]; var setStats = st[1];
  var dataFile = team === "team-c" ? "/data/stats-cahl-c.json" : team === "team-d" ? "/data/stats-cahl-d.json" : null;
  
  useEffect(function() {
    if (dataFile) {
      fetch(dataFile).then(function(r){return r.json()}).then(function(d){setStats(d)}).catch(function(){setStats(null)});
    }
  }, [dataFile]);

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

function SchedulePage() { return <PageWrap title="Schedule" sub="Upcoming games, practices, and events">
  <div style={{padding:32,background:C.g1,borderRadius:8,textAlign:"center"}}>
    <p style={{fontFamily:F.b,fontSize:15,color:C.g6}}>Schedule integration coming soon. Check <a href="https://chillerstats.com" target="_blank" rel="noopener noreferrer" style={{color:C.navy}}>ChillerStats</a> for current game times.</p>
  </div>
</PageWrap>; }

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

/* ─── FOOTER — 4-column like Crossbar ─── */
function Footer() {
  return (
    <div>
      <footer style={{background:"#1a1a1a",padding:"48px 16px 24px",color:C.g4}}>
        <div className="footer-grid" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1.5fr 1fr 1fr",gap:32}}>
          <div style={{textAlign:"center"}}>
            <img src={IMG.logo} alt="CWH" style={{width:120}} />
          </div>
          <div>
            <h4 style={{fontFamily:F.h,fontSize:18,color:C.w,textTransform:"uppercase",letterSpacing:2,margin:"0 0 12px"}}>About Us</h4>
            <p style={{fontFamily:F.b,fontSize:13,color:C.g4,lineHeight:1.7}}>Columbus Warrior Hockey is a 501(c)(3) non-profit organization that provides veterans with meaningful peer-based support networks, encourages a healthier lifestyle through physical activity, and offers a therapeutic experience that contributes to both mental and physical healing through the sport of hockey.</p>
          </div>
          <div>
            <h4 style={{fontFamily:F.h,fontSize:18,color:C.w,textTransform:"uppercase",letterSpacing:2,margin:"0 0 12px"}}>Contact</h4>
            <p style={{fontFamily:F.b,fontSize:13,color:C.g4,lineHeight:1.8}}>info@columbuswarriorhockey.org<br/>Columbus Warrior Hockey<br/>Powell, OH 43065</p>
          </div>
          <div>
            <h4 style={{fontFamily:F.h,fontSize:18,color:C.w,textTransform:"uppercase",letterSpacing:2,margin:"0 0 12px"}}>Links</h4>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {[{l:"Facebook",u:"https://www.facebook.com/ColumbusWarriorHockey/"},{l:"Instagram",u:"https://www.instagram.com/columbuswarriorhockey"},{l:"USA Hockey",u:"https://www.usahockey.com"},{l:"The Chiller",u:"https://www.thechiller.com"}].map(function(lk,i) {
                return <a key={i} href={lk.u} target="_blank" rel="noopener noreferrer" style={{fontFamily:F.b,fontSize:13,color:C.g4,textDecoration:"none"}}>{lk.l}</a>;
              })}
            </div>
          </div>
        </div>
        <div style={{maxWidth:1100,margin:"0 auto",borderTop:"1px solid rgba(255,255,255,0.1)",marginTop:32,paddingTop:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{fontFamily:F.b,fontSize:12,color:C.g4}}>{"(c) "+new Date().getFullYear()+" Columbus Warrior Hockey. All Rights Reserved."}</div>
          <div style={{display:"flex",gap:20}}>
            {["Refund Policies","Privacy Policy","Terms & Conditions"].map(function(l,i) {
              return <span key={i} style={{fontFamily:F.b,fontSize:12,color:C.g4,cursor:"pointer"}}>{l}</span>;
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
