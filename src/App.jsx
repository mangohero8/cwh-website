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

var INIT_NEWSLETTERS = [
  {id:1, title:"Columbus Warriors Debut at the Guardian's Cup in Rochester",
   headline:"Columbus Warriors Debut at the Guardian's Cup in Rochester",
   date:"March 12, 2026", status:"sent", publishTarget:"both", recipients:87, imageDataUrl:IMG.guardiansCup,
   body:"The Columbus Warriors traveled to Rochester, New York this past weekend to compete in their first travel tournament, the Guardians Cup.\n\nThe Guardian's Cup is an annual hockey tournament that brings together active and retired first responders and veterans in a competitive environment with the goal of raising funds for the New York Law Enforcement Assistance Program (NYLEAP). NYLEAP is a nonprofit that provides mental health and wellness resources for first responders across New York State (www.nyleap.org).\n\nThe tournament brought together a strong group of warrior hockey programs including the Buffalo Warriors, Long Island Warriors, Saginaw Spirit Warriors, Capital Beltway Warriors, Toledo Warriors, Pittsburgh Warriors, and Flower City Warriors.\n\nColumbus finished 6th out of 10 teams, recording 7 goals for and 16 goals against. While the standings are part of the story, the weekend represented an important milestone as the Columbus Warriors continued building their program, traveling together, and representing the Columbus veteran hockey community on the road.\n\nFollowing elimination from tournament play, Columbus and Pittsburgh stayed on the ice for a pair of exhibition games. Each team earned one win and one loss, leaving both programs with a .500 record against each other. That split result may have quietly sparked the beginning of an interstate rivalry between Columbus and Pittsburgh.\n\nTo be continued.."},
  {id:2, title:"Columbus Warriors Close Out Strong Fall Session in CAHL's C South League",
   headline:"Columbus Warriors Close Out Strong Fall Session in CAHL's C South League",
   date:"December 16, 2025", status:"sent", publishTarget:"both", recipients:82, imageDataUrl:IMG.newsCahl,
   body:"The Columbus Warriors wrapped up their inaugural season in the Chiller Adult Hockey League (CAHL) C South C League with a performance that reflects both competitive excellence and the growing strength of our community-based hockey program.\n\nOver the course of the regular season, the Warriors posted an impressive 9–3–0 record, finishing third overall in the standings. The team demonstrated balance on both sides of the puck, recording 43 goals-for while allowing 33 goals-against, a reflection of disciplined play, depth across the lineup, and strong team chemistry.\n\nThe momentum carried into the postseason, where the Warriors continued to demonstrate resilience, teamwork, and discipline. After advancing through the playoff rounds, the Warriors earned a spot in the league championship game, ultimately finishing in second place overall, a remarkable achievement for a first-year program.\n\nBeyond team success, multiple Warriors stood out among the league's top performers:\n\nSteven Bowman finished 3rd in the league in total points (20), 3rd in goals (13), and 3rd in assists (7)\n\nJohn Hopkinson ranked 5th in league points (16) and 5th in goals (11)\n\nThese individual accomplishments reflect not only skill and effort, but the collective support and chemistry built throughout the season.\n\nThis inaugural CAHL session marked an important milestone for Columbus Warrior Hockey. Through our partnership with the OhioHealth Chiller Ice Rinks, the CAHL program was created to provide consistent, local opportunities for veterans and military-connected individuals to skate, compete, and connect year-round. The success of this first season reinforces the value of community-based hockey as an extension of our broader mission.\n\nAs we close the book on this historic first season, we do so with gratitude for our players, volunteers, league partners, and supporters who made it possible. The foundation has been laid and we look forward to building on this momentum in seasons/sessions to come."},
  {id:3, title:"Grand Opening, Greater Commitment: Moo Moo Express Car Wash Elevates to Platinum Sponsor",
   headline:"Grand Opening, Greater Commitment: Moo Moo Express Car Wash Elevates to Platinum Sponsor",
   date:"November 24, 2025", status:"sent", publishTarget:"both", recipients:79, imageDataUrl:IMG.newsMooPlatinum,
   body:"Columbus Warrior Hockey is honored to share that Moo Moo Express Car Wash has deepened their commitment to our mission, elevating their support from Gold to Platinum Level Sponsor through their Grand Opening Fundraiser at the new Lewis Center location.\n\nThis expanded partnership reflects Moo Moo Express Car Wash's unwavering dedication to strengthening the communities they serve. As a home-grown Columbus company built on service, generosity, and community stewardship, Moo Moo Express continues to set the bar for what impactful local support looks like. Their Moo Cares initiative has long provided critical contributions to nonprofits and youth programs across Central Ohio, and we are proud to stand among the organizations benefiting from their leadership and compassion.\n\nThe Grand Opening Fundraiser at their 8986 Owenfield Dr location in Lewis Center represents more than an event; it represents a bold statement of belief in the power of hockey to bring healing, camaraderie, and purpose to veterans in our community. By choosing Columbus Warrior Hockey as the beneficiary of their opening event, Moo Moo Express Car Wash is helping us expand access to ice-time, reduce financial barriers for players, and strengthen the programs that allow veterans to reconnect with purpose both on and off the ice.\n\nThis extraordinary demonstration of support ensures that more veterans can experience the resilience, teamwork, and community that hockey provides. It moves us closer to our long-term vision: a program where cost is never a barrier to participation, and every veteran has a place to grow, recover, and belong.\n\nWe extend our deepest gratitude to Moo Moo Express Car Wash for their continued generosity, trust, and shared commitment to supporting those who have served our nation. Their enhanced sponsorship strengthens our ability to carry out our mission and ensures that veterans across Central Ohio feel the impact of their community standing behind them.\n\nPlease join us in celebrating Moo Moo Express Car Wash as our new Platinum Level Sponsor!\n\nWe are proud to continue this journey together."},
];

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
  { label:"Resources", ch:[{l:"Ice Schedules",p:"ice-schedules"},{l:"Mental Health",p:"mental-health"},{l:"Registration Guides",p:"reg-guides"},{l:"Players Corner",p:"players-corner"},{l:"Coaching for CWH",p:"coaching"},{l:"Social Media Graphics",p:"social-graphics"}]},
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
function Navbar({nav, curPage, user, setUser}) {
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
            <button onClick={function(){nav("login")}} style={{marginLeft:8,padding:"12px 24px",background:"transparent",color:C.w,fontFamily:F.h,fontSize:16,fontWeight:400,textTransform:"uppercase",letterSpacing:2,border:"1px solid rgba(255,255,255,0.3)",borderRadius:24,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              Login
            </button>
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
var ADMIN_MEMBERS = [
  /* admins / staff / coach */
  {id:1, name:"Taylor DeCicco", email:"taylor@cwh.org",  tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"admin", joined:"Jan 2024", jersey:4,  pos:"C",  stats:{gp:12,g:5,a:9, pts:14,pim:2},  avail:"yes"},
  {id:2, name:"Matt Chamblin",  email:"matt@cwh.org",    tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"admin", joined:"Jan 2024", jersey:17, pos:"LD", stats:{gp:10,g:1,a:4, pts:5, pim:10}, avail:"yes"},
  {id:3, name:"William Teater", email:"will@cwh.org",    tier:"volunteer",docs:{submitted:true, reviewed:true, approved:true}, role:"staff", joined:"Mar 2024"},
  {id:7, name:"Player C",       email:"pc@cwh.org",      tier:"volunteer",docs:{submitted:true, reviewed:false,approved:false},role:"coach", joined:"Jun 2024"},
  /* vet players – C League + D League */
  {id:4, name:"Brent McCreedy", email:"brent@cwh.org",   tier:"vet",      docs:{submitted:true, reviewed:true, approved:false},role:"player",joined:"Feb 2024", jersey:21, pos:"LW", stats:{gp:11,g:4,a:5, pts:9, pim:8},  avail:"maybe"},
  {id:8, name:"Player D",       email:"pd@cwh.org",      tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Jul 2024", jersey:22, pos:"RD", stats:{gp:8, g:2,a:3, pts:5, pim:4},  avail:"yes"},
  {id:9, name:"Marcus Webb",    email:"mwebb@cwh.org",   tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Jan 2024", jersey:7,  pos:"LW", stats:{gp:12,g:5,a:9, pts:14,pim:2},  avail:"yes"},
  {id:10,name:"Chris Holt",     email:"cholt@cwh.org",   tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Feb 2024", jersey:11, pos:"RW", stats:{gp:10,g:6,a:4, pts:10,pim:6},  avail:"yes"},
  {id:11,name:"Jake Torres",    email:"jtorres@cwh.org", tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Feb 2024", jersey:14, pos:"C",  stats:{gp:12,g:3,a:7, pts:10,pim:0},  avail:"yes"},
  {id:12,name:"Derek Neal",     email:"dneal@cwh.org",   tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Mar 2024", jersey:6,  pos:"LD", stats:{gp:12,g:1,a:4, pts:5, pim:10}, avail:"yes"},
  {id:13,name:"Aaron Liu",      email:"aliu@cwh.org",    tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Mar 2024", jersey:13, pos:"RD", stats:{gp:12,g:0,a:4, pts:4, pim:2},  avail:"yes"},
  {id:14,name:"Sam Roper",      email:"sroper@cwh.org",  tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Apr 2024", jersey:30, pos:"G",  stats:{gp:10,g:0,a:1, pts:1, pim:0},  avail:"yes"},
  {id:15,name:"Travis Ford",    email:"tford@cwh.org",   tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Apr 2024", jersey:18, pos:"LD", stats:{gp:7, g:1,a:2, pts:3, pim:6},  avail:"maybe"},
  {id:16,name:"Kevin Shaw",     email:"kshaw@cwh.org",   tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"May 2024", jersey:5,  pos:"RW", stats:{gp:9, g:2,a:6, pts:8, pim:0},  avail:"yes"},
  {id:17,name:"Ryan Cole",      email:"rcole@cwh.org",   tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"May 2024", jersey:1,  pos:"G",  stats:{gp:2, g:0,a:0, pts:0, pim:2},  avail:"none"},
  {id:18,name:"Pete Ochoa",     email:"pochoa@cwh.org",  tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Jun 2024", jersey:19, pos:"C",  stats:{gp:11,g:4,a:5, pts:9, pim:8},  avail:"yes"},
  {id:19,name:"Dom Russo",      email:"drussso@cwh.org", tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Jun 2024", jersey:23, pos:"LW", stats:{gp:9, g:2,a:6, pts:8, pim:0},  avail:"yes"},
  {id:20,name:"Ty Benson",      email:"tbenson@cwh.org", tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Jul 2024", jersey:16, pos:"LW", stats:{gp:12,g:7,a:1, pts:8, pim:2},  avail:"yes"},
  {id:27,name:"Brian Fox",      email:"bfox@cwh.org",    tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Aug 2024", jersey:24, pos:"RW", stats:{gp:12,g:3,a:7, pts:10,pim:0},  avail:"yes"},
  {id:28,name:"Scott Lenz",     email:"slenz@cwh.org",   tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Aug 2024", jersey:2,  pos:"RD", stats:{gp:10,g:0,a:3, pts:3, pim:0},  avail:"yes"},
  {id:29,name:"Chad Monroe",    email:"cmonroe@cwh.org", tier:"vet",      docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Sep 2024", jersey:28, pos:"C",  stats:{gp:8, g:1,a:4, pts:5, pim:14}, avail:"yes"},
  {id:6, name:"Player B",       email:"pb@cwh.org",      tier:"vet",      docs:{submitted:false,reviewed:false,approved:false},role:"player",joined:"May 2024", jersey:3,  pos:"C",  stats:{gp:8, g:1,a:4, pts:5, pim:14}, avail:"none"},
  /* volunteer-tier player */
  {id:30,name:"Alex Morgan",    email:"amorgan@cwh.org", tier:"volunteer",docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Oct 2024"},
  /* disabled players – C League */
  {id:5, name:"Player A",       email:"pa@cwh.org",      tier:"disabled", docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Apr 2024", jersey:9,  pos:"RW", stats:{gp:12,g:7,a:1, pts:8, pim:2},  avail:"yes"},
  {id:21,name:"James Ortiz",    email:"jortiz@cwh.org",  tier:"disabled", docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Feb 2024", jersey:8,  pos:"C",  stats:{gp:12,g:4,a:6, pts:10,pim:4},  avail:"yes"},
  {id:22,name:"Mike Tran",      email:"mtran@cwh.org",   tier:"disabled", docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Mar 2024", jersey:15, pos:"LW", stats:{gp:11,g:3,a:5, pts:8, pim:2},  avail:"yes"},
  {id:23,name:"Carlos Diaz",    email:"cdiaz@cwh.org",   tier:"disabled", docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Mar 2024", jersey:26, pos:"RD", stats:{gp:10,g:0,a:3, pts:3, pim:6},  avail:"yes"},
  {id:24,name:"Ethan Hill",     email:"ehill@cwh.org",   tier:"disabled", docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Apr 2024", jersey:12, pos:"LD", stats:{gp:9, g:1,a:2, pts:3, pim:4},  avail:"maybe"},
  {id:25,name:"Noah Bauer",     email:"nbauer@cwh.org",  tier:"disabled", docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"May 2024", jersey:33, pos:"LW", stats:{gp:8, g:2,a:3, pts:5, pim:0},  avail:"yes"},
  {id:26,name:"Liam Grant",     email:"lgrant@cwh.org",  tier:"disabled", docs:{submitted:true, reviewed:true, approved:true}, role:"player",joined:"Jun 2024", jersey:10, pos:"RW", stats:{gp:7, g:2,a:2, pts:4, pim:2},  avail:"yes"},
];

var ADMIN_TEAMS_INIT = [
  {id:1,pid:"c",name:"CAHL C League – Warriors",         startDate:"2026-01-15",endDate:"2026-06-30",rosterSize:18,players:14,status:"active",tiers:["vet","disabled"],description:"Spring season for the CAHL C League competitive roster.", headCoach:2,    roster:[1,4,5,8,9,10,11,12,13,14,15,16,21,22]},
  {id:2,pid:"d",name:"CAHL D League – Warriors",         startDate:"2026-01-15",endDate:"2026-06-30",rosterSize:16,players:13,status:"active",tiers:["vet","disabled"],description:"Spring season for the CAHL D League competitive roster.", headCoach:7,    roster:[2,4,6,17,18,19,20,23,24,25,26,27,28,29]},
  {id:3,        name:"CAHL C League – Warriors (Winter)",startDate:"2026-09-06",endDate:"2026-12-20",rosterSize:18,players:0, status:"signup",tiers:["vet","disabled"],  description:"Winter season registration is now open for the C League.",headCoach:null, roster:[]},
];
var ADMIN_TOURNAMENTS_INIT = [
  {id:1,pid:"gc",name:"Guardians Cup 2026",startDate:"2026-08-15",endDate:"2026-08-17",location:"Nationwide Ice",rosterSize:20,participants:10,status:"active",tiers:["vet","disabled"],description:"The 2026 Guardians Cup is underway. Good luck to all participants!",                   headCoach:null,roster:[1,4,8,9,10,11,12,13,14,16]},
  {id:2,         name:"Guardians Cup 2027",startDate:"2027-08-14",endDate:"2027-08-16",location:"Nationwide Ice",rosterSize:20,participants:0, status:"signup",tiers:["vet","disabled"],description:"Registration is open for the 2027 Guardians Cup. Register your spot by Jul 15, 2027.",headCoach:null,roster:[]},
];
var ADMIN_VOLUNTEERS_INIT = [
  {id:1,name:"Ice Rink Clean-Up Day",  date:"2026-07-26",location:"Chiller North", spotsAvailable:20,volunteers:3,status:"signup",tiers:["vet","disabled","volunteer"],description:"Help prep the ice for the fall season. We'll be cleaning equipment, painting lines, and getting the facility ready. Lunch provided!", roster:[3,4,30]},
  {id:2,name:"Car Wash Fundraiser",    date:"2026-06-21",location:"Chiller Easton",spotsAvailable:12,volunteers:2,status:"signup",tiers:["vet","disabled","volunteer"],description:"Help raise funds for the program at our upcoming car wash event.", roster:[3,30]},
];
var ADMIN_GAMES_INIT = [
  {id:1,name:"Preseason Scrimmage vs Columbus Knights",date:"2026-08-01",time:"7:30 PM",location:"Chiller North",home:true,rosterSize:20,players:1,status:"signup",tiers:["vet","disabled"],description:"Open sign-up for a pre-season scrimmage before fall league kicks off. Great warm-up before the season!",headCoach:null,roster:[4]},
];

/* ═══ NEW SITE ═══ */

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
var NS_AVAIL = {
  yes:  {label:"Yes",         color:"#16a34a", bg:"#dcfce7"},
  no:   {label:"No",          color:"#dc2626", bg:"#fee2e2"},
  maybe:{label:"Maybe",       color:"#d97706", bg:"#fef3c7"},
  none: {label:"No Response", color:"#64748b", bg:"#f1f5f9"},
};
function NS_AVAIL_GET(a){return NS_AVAIL[a||"none"];}

function NSHeader({nav, curPage, isLoggedIn, onSignIn, onSignOut}) {
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
                {curPage!=="ns-portal"&&curPage!=="ns-admin"&&<button onClick={function(){nav("ns-portal");}} style={{height:36,boxSizing:"border-box",display:"flex",alignItems:"center",padding:"0 18px",background:C.navy,border:"none",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#fff",cursor:"pointer",letterSpacing:1,fontWeight:600}}>Dashboard</button>}
                <button onClick={function(){nav("ns-profile");}} style={{height:36,boxSizing:"border-box",display:"flex",alignItems:"center",gap:8,padding:"0 14px",background:"none",border:"1px solid #e2e8f0",borderRadius:6,cursor:"pointer",fontFamily:F.b,fontSize:13,color:"#475569",fontWeight:600}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:C.navy,overflow:"hidden",flexShrink:0}}>
                    <svg viewBox="0 0 200 200" style={{width:"100%",height:"100%"}}><circle cx="100" cy="75" r="35" fill="rgba(255,255,255,0.6)"/><ellipse cx="100" cy="170" rx="55" ry="45" fill="rgba(255,255,255,0.6)"/></svg>
                  </div>
                  My profile
                </button>
                <button onClick={function(){onSignOut();}} style={{height:36,boxSizing:"border-box",display:"flex",alignItems:"center",padding:"0 18px",background:"none",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#64748b",cursor:"pointer",letterSpacing:1,fontWeight:600}}>Sign out</button>
              </div>
            : <>
                <button onClick={function(){nav("ns-join");}} style={{height:36,boxSizing:"border-box",display:"flex",alignItems:"center",padding:"0 18px",background:C.red,border:"none",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#fff",letterSpacing:1,fontWeight:600,cursor:"pointer"}}>Join</button>
                <button onClick={function(){onSignIn ? onSignIn() : nav("ns-portal");}} style={{height:36,boxSizing:"border-box",display:"flex",alignItems:"center",padding:"0 18px",background:C.navy,border:"none",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#fff",cursor:"pointer",letterSpacing:1,fontWeight:600}}>Sign in</button>
              </>
          }
        </nav>
      </div>
      <div style={{height:3,background:C.red}} />
    </header>
  );
}

function NewSitePage({nav, adminNewsletters, navArticle}) {
  return (
    <div style={{background:"#fff",minHeight:"100vh",fontFamily:F.b}}>

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
        {(function(){
          var articles = (adminNewsletters||[]).filter(function(n){return n.status==="sent"&&(n.publishTarget==="website"||n.publishTarget==="both");}).slice(0,3);
          if (articles.length===0) return null;
          return (
            <div style={{marginBottom:40}}>
              <div style={{marginBottom:16}}>
                <div style={{fontFamily:NS_FH,fontSize:22,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",borderLeft:"3px solid "+C.red,paddingLeft:12}}>Latest News</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
                {articles.map(function(n,i){
                  return (
                    <div key={n.id} onClick={function(){navArticle(n.id);}} style={{cursor:"pointer",textDecoration:"none",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden",display:"flex",flexDirection:"column",transition:"box-shadow .15s"}}
                      onMouseEnter={function(e){e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.10)";}}
                      onMouseLeave={function(e){e.currentTarget.style.boxShadow="none";}}>
                      <div style={{height:150,overflow:"hidden",flexShrink:0,background:"#e2e8f0"}}>
                        {n.imageDataUrl && <img src={n.imageDataUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} />}
                      </div>
                      <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",flex:1}}>
                        <div style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{n.date}</div>
                        <div style={{fontFamily:NS_FH,fontSize:18,fontWeight:600,color:"#1e293b",letterSpacing:1,lineHeight:1.25,flex:1}}>{n.title}</div>
                        <div style={{fontFamily:F.b,fontSize:11,color:C.navy,fontWeight:700,marginTop:12,letterSpacing:1}}>READ MORE →</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

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

      {/* footer rendered by CWHSite */}
    </div>
  );
}

function NSArticlePage({nav, article}) {
  if (!article) return (
    <div style={{background:"#fff",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{fontFamily:F.b,fontSize:15,color:"#94a3b8"}}>Article not found.</div>
    </div>
  );
  return (
    <div style={{background:"#fff",minHeight:"100vh"}}>
      <div style={{maxWidth:760,margin:"0 auto",padding:"32px 24px 72px"}}>
        <button onClick={function(){nav("new-site");}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:F.b,fontSize:13,fontWeight:700,color:C.navy,padding:0,marginBottom:28,display:"flex",alignItems:"center",gap:6,letterSpacing:0.3}}>← Back to News</button>
        {article.imageDataUrl && <img src={article.imageDataUrl} alt="" style={{width:"100%",maxHeight:400,objectFit:"cover",borderRadius:10,display:"block",marginBottom:28}} />}
        {article.date && <div style={{fontFamily:F.b,fontSize:11,fontWeight:700,color:"#94a3b8",letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>{article.date}</div>}
        <div style={{fontFamily:NS_FH,fontSize:34,fontWeight:700,color:C.navy,letterSpacing:1,lineHeight:1.15,marginBottom:28}}>{article.headline||article.title}</div>
        <div style={{borderTop:"2px solid "+C.red,marginBottom:28}} />
        {article.body ? (
          <div>
            {article.body.split("\n\n").map(function(para,pi){
              return <p key={pi} style={{fontFamily:F.b,fontSize:16,color:"#334155",lineHeight:1.8,marginTop:pi===0?0:20,marginBottom:0}}>{para}</p>;
            })}
          </div>
        ) : (
          <p style={{fontFamily:F.b,fontSize:15,color:"#94a3b8",fontStyle:"italic"}}>No content yet.</p>
        )}
      </div>

      {/* Sponsor banner */}
      <div style={{borderTop:"1px solid #e2e8f0",background:"#f8fafc",padding:"32px 24px"}}>
        <div style={{maxWidth:760,margin:"0 auto"}}>
          <div style={{fontFamily:NS_FH,fontSize:13,fontWeight:700,color:"#94a3b8",letterSpacing:2,textTransform:"uppercase",textAlign:"center",marginBottom:20}}>Thank you to our sponsors</div>
          <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",gap:40}}>
            {NS_SPONSORS.map(function(s,i){
              return (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",opacity:0.7,transition:"opacity .15s"}}
                  onMouseEnter={function(e){e.currentTarget.style.opacity="1";}}
                  onMouseLeave={function(e){e.currentTarget.style.opacity="0.7";}}>
                  <img src={s.img} alt={s.name} style={{maxHeight:52,maxWidth:130,objectFit:"contain"}} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
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
      {/* footer rendered by CWHSite */}
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
      {/* footer rendered by CWHSite */}
    </div>
  );
}

function NSCoachPortalContent({showAllTeams, adminTeams, adminMembers, currentMemberId}) {
  /* Game schedule data keyed by team portal ID — admin doesn't manage schedules */
  var GAME_DATA = {
    "c":  {tag:"East",         nextGame:{dow:"Sunday",  date:"Jun 7, 2026", time:"7:30 PM", opp:"Team A", loc:"Chiller North",  home:true},  record:{w:8,l:3,t:1,gp:12},
           games:[{date:"Jun 21",time:"8:00 PM",loc:"Chiller Easton",opp:"Storm",  away:false,upcoming:true},{date:"Jun 14",time:"6:00 PM",loc:"Chiller Dublin",opp:"Rangers",away:true,upcoming:true},{date:"Jun 7",time:"7:30 PM",loc:"Chiller North",opp:"Team A",away:false,upcoming:true},{date:"May 22",opp:"Predators",gf:4,ga:2,r:"W"},{date:"May 15",opp:"Blue Jackets",gf:3,ga:3,r:"T"},{date:"May 8",opp:"Rangers",gf:2,ga:5,r:"L"},{date:"May 1",opp:"Knights",gf:4,ga:1,r:"W"},{date:"Apr 24",opp:"Storm",gf:3,ga:2,r:"W"},{date:"Apr 17",opp:"Wolves",gf:1,ga:3,r:"L"},{date:"Apr 10",opp:"Eagles",gf:5,ga:0,r:"W"},{date:"Apr 3",opp:"Predators",gf:2,ga:4,r:"L"},{date:"Mar 27",opp:"Blue Jackets",gf:4,ga:3,r:"W"},{date:"Mar 20",opp:"Rangers",gf:3,ga:1,r:"W"},{date:"Mar 13",opp:"Knights",gf:2,ga:3,r:"L"},{date:"Mar 6",opp:"Storm",gf:4,ga:2,r:"W"},{date:"Feb 27",opp:"Wolves",gf:3,ga:1,r:"W"}]},
    "d":  {tag:"West A",       nextGame:{dow:"Saturday",date:"Jun 6, 2026", time:"9:15 PM", opp:"Team B", loc:"Chiller Easton", home:false}, record:{w:5,l:5,t:2,gp:12},
           games:[{date:"Jun 20",time:"8:30 PM",loc:"Chiller Dublin",opp:"Wolves", away:false,upcoming:true},{date:"Jun 13",time:"7:00 PM",loc:"Chiller Easton",opp:"Knights",away:true,upcoming:true},{date:"Jun 6",time:"9:15 PM",loc:"Chiller Easton",opp:"Team B",away:false,upcoming:true},{date:"May 21",opp:"Knights",gf:5,ga:1,r:"W"},{date:"May 14",opp:"Storm",gf:2,ga:4,r:"L"},{date:"May 7",opp:"Wolves",gf:3,ga:3,r:"T"},{date:"Apr 30",opp:"Thunder",gf:4,ga:2,r:"W"},{date:"Apr 23",opp:"Knights",gf:1,ga:3,r:"L"},{date:"Apr 16",opp:"Storm",gf:3,ga:3,r:"T"},{date:"Apr 9",opp:"Wolves",gf:2,ga:4,r:"L"},{date:"Apr 2",opp:"Thunder",gf:4,ga:1,r:"W"},{date:"Mar 26",opp:"Knights",gf:1,ga:2,r:"L"}]},
    "gc": {tag:"Tournament",    nextGame:{dow:"Saturday",date:"Aug 15, 2026",time:"10:00 AM",opp:"Eagles",   loc:"Nationwide Ice", home:false}, record:{w:0,l:0,t:0,gp:0},
           games:[{date:"Aug 17",time:"2:00 PM",loc:"Nationwide Ice",opp:"TBD (Final)",away:false,upcoming:true},{date:"Aug 16",time:"10:00 AM",loc:"Nationwide Ice",opp:"Storm",away:false,upcoming:true},{date:"Aug 15",time:"10:00 AM",loc:"Nationwide Ice",opp:"Eagles",away:false,upcoming:true}]},
  };

  /* Derive team list from admin data */
  var activeAdminTeams = (adminTeams||[]).filter(function(t){return t.status==="active"&&t.pid;});
  var myAdminTeams = showAllTeams
    ? activeAdminTeams
    : activeAdminTeams.filter(function(t){return t.headCoach === currentMemberId;});
  var COACH_TEAMS = myAdminTeams.map(function(t){
    var gd = GAME_DATA[t.pid] || {tag:"",nextGame:{dow:"",date:"TBD",time:"",opp:"TBD",loc:"",home:true},record:{w:0,l:0,t:0,gp:0},games:[]};
    return {id:t.pid, label:t.name, tag:gd.tag, nextGame:gd.nextGame, record:gd.record, games:gd.games, adminRoster:t.roster||[]};
  });

  /* Derive roster from admin member records */
  var getRosterForTeam = function(adminRoster) {
    if (!adminMembers || !adminRoster) return [];
    return adminRoster.map(function(mid){
      var m = adminMembers.find(function(x){return x.id===mid;});
      if (!m || !m.pos) return null;
      return {name:m.name, jersey:m.jersey||"—", pos:m.pos, gp:(m.stats||{}).gp||0, g:(m.stats||{}).g||0, a:(m.stats||{}).a||0, pts:(m.stats||{}).pts||0, pim:(m.stats||{}).pim||0, avail:m.avail||"yes"};
    }).filter(Boolean);
  };

  /* Auto-fill lines from roster positions */
  var makeAutoLines = function(roster) {
    var nl = {offense:[{lw:null,c:null,rw:null},{lw:null,c:null,rw:null},{lw:null,c:null,rw:null}],defense:[{ld:null,rd:null},{ld:null,rd:null}],goalie:null};
    roster.forEach(function(p){
      if      (p.pos==="C"  && !nl.offense[0].c)  nl.offense[0].c  = p.name;
      else if (p.pos==="LW" && !nl.offense[0].lw) nl.offense[0].lw = p.name;
      else if (p.pos==="RW" && !nl.offense[0].rw) nl.offense[0].rw = p.name;
      else if (p.pos==="LD" && !nl.defense[0].ld) nl.defense[0].ld = p.name;
      else if (p.pos==="RD" && !nl.defense[0].rd) nl.defense[0].rd = p.name;
      else if (p.pos==="G"  && !nl.goalie)         nl.goalie = p.name;
    });
    return nl;
  };

  var sti = useState(0); var selectedTeamIdx = sti[0]; var setSelectedTeamIdx = sti[1];
  var TEAM = COACH_TEAMS[selectedTeamIdx];
  var ROSTER = TEAM ? getRosterForTeam(TEAM.adminRoster) : [];
  var INIT_LINES = makeAutoLines(ROSTER);
  var ORD = ["1st","2nd","3rd","4th"];

  var ls = useState(INIT_LINES); var lines = ls[0]; var setLines = ls[1];
  var ss = useState(null);       var sel   = ss[0]; var setSel   = ss[1];
  var sv = useState(false);      var saved = sv[0]; var setSaved = sv[1];
  var sc = useState("jersey");    var sortCol = sc[0]; var setSortCol = sc[1];
  var sd = useState("asc");      var sortDir = sd[0]; var setSortDir = sd[1];
  var pf = useState("");          var posFilter = pf[0]; var setPosFilter = pf[1];

  useEffect(function() {
    var t = COACH_TEAMS[selectedTeamIdx];
    var r = t ? getRosterForTeam(t.adminRoster) : [];
    setLines(makeAutoLines(r)); setSel(null); setSaved(false); setPosFilter("");
  }, [selectedTeamIdx]);

  var handleSort = function(col) {
    if (sortCol === col) { setSortDir(sortDir === "asc" ? "desc" : "asc"); }
    else { setSortCol(col); setSortDir(col === "name" || col === "pos" || col === "jersey" ? "asc" : "desc"); }
  };
  var sortedRoster = ROSTER.slice().sort(function(a, b) {
    var av = a[sortCol]; var bv = b[sortCol];
    if (typeof av === "string") return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    return sortDir === "asc" ? av - bv : bv - av;
  });

  var OFFENSE_POS = ["C","LW","RW"];
  var DEFENSE_POS = ["LD","RD"];
  var sortedPanelRoster = (function(){
    var allInLine = [];
    lines.offense.forEach(function(ln){if(ln.lw)allInLine.push(ln.lw);if(ln.c)allInLine.push(ln.c);if(ln.rw)allInLine.push(ln.rw);});
    lines.defense.forEach(function(pr){if(pr.ld)allInLine.push(pr.ld);if(pr.rd)allInLine.push(pr.rd);});
    if(lines.goalie) allInLine.push(lines.goalie);
    var getPosRank = function(pos) {
      if (posFilter && pos === posFilter) return 0;
      var filterIsOff = OFFENSE_POS.indexOf(posFilter) >= 0;
      var filterIsDef = DEFENSE_POS.indexOf(posFilter) >= 0;
      if (filterIsOff) {
        if (OFFENSE_POS.indexOf(pos) >= 0) return 1;
        if (DEFENSE_POS.indexOf(pos) >= 0) return 2;
        return 3;
      }
      if (filterIsDef) {
        if (DEFENSE_POS.indexOf(pos) >= 0) return 1;
        if (OFFENSE_POS.indexOf(pos) >= 0) return 2;
        return 3;
      }
      if (OFFENSE_POS.indexOf(pos) >= 0) return 1;
      if (DEFENSE_POS.indexOf(pos) >= 0) return 2;
      return 3;
    };
    var getAvailRank = function(avail) {
      if (avail === "yes")   return 0;
      if (avail === "maybe") return 1;
      return 2;
    };
    return ROSTER.filter(function(p){ return p.avail !== "no"; })
      .sort(function(a,b){
        var ar=getPosRank(a.pos); var br=getPosRank(b.pos);
        if (ar !== br) return ar - br;
        var aIn=allInLine.indexOf(a.name)>=0?1:0; var bIn=allInLine.indexOf(b.name)>=0?1:0;
        if (aIn !== bIn) return aIn - bIn;
        var aa=getAvailRank(a.avail); var ba=getAvailRank(b.avail);
        if (aa !== ba) return aa - ba;
        return a.jersey - b.jersey;
      });
  })();

  var getSlotVal = function(slot) {
    if (!slot) return null;
    if (slot.type === "goalie")  return lines.goalie;
    if (slot.type === "offense") return lines.offense[slot.idx][slot.pos];
    if (slot.type === "defense") return lines.defense[slot.idx][slot.pos];
    return null;
  };
  var isSelSlot = function(slot) {
    return sel && sel.type===slot.type && sel.idx===slot.idx && sel.pos===slot.pos;
  };
  var inLineNames = function() {
    var n = [];
    lines.offense.forEach(function(ln){if(ln.lw)n.push(ln.lw);if(ln.c)n.push(ln.c);if(ln.rw)n.push(ln.rw);});
    lines.defense.forEach(function(pr){if(pr.ld)n.push(pr.ld);if(pr.rd)n.push(pr.rd);});
    if(lines.goalie) n.push(lines.goalie);
    return n;
  };
  var POS_MAP = {lw:"LW",c:"C",rw:"RW",ld:"LD",rd:"RD",g:"G"};
  var clickSlot = function(slot) {
    if (isSelSlot(slot)) { setSel(null); setPosFilter(""); return; }
    setSel(slot);
    setPosFilter(slot.type === "goalie" ? "G" : (POS_MAP[slot.pos] || ""));
  };
  var assignPlayer = function(playerName) {
    if (!sel) return;
    var nl = JSON.parse(JSON.stringify(lines));
    nl.offense = nl.offense.map(function(ln){return {lw:ln.lw===playerName?null:ln.lw, c:ln.c===playerName?null:ln.c, rw:ln.rw===playerName?null:ln.rw};});
    nl.defense = nl.defense.map(function(pr){return {ld:pr.ld===playerName?null:pr.ld, rd:pr.rd===playerName?null:pr.rd};});
    if (nl.goalie===playerName) nl.goalie=null;
    if (sel.type==="goalie")        nl.goalie=playerName;
    else if (sel.type==="offense")  nl.offense[sel.idx][sel.pos]=playerName;
    else if (sel.type==="defense")  nl.defense[sel.idx][sel.pos]=playerName;
    setLines(nl); setSel(null); setSaved(false);
  };
  var addOffenseLine = function(){ var nl=JSON.parse(JSON.stringify(lines)); nl.offense.push({lw:null,c:null,rw:null}); setLines(nl); setSaved(false); };
  var addDefensePair = function(){ var nl=JSON.parse(JSON.stringify(lines)); nl.defense.push({ld:null,rd:null}); setLines(nl); setSaved(false); };

  var slotBtn = function(slot) {
    var val    = getSlotVal(slot);
    var active = isSelSlot(slot);
    return (
      <button onClick={function(){clickSlot(slot);}}
        style={{width:"100%",padding:"6px 8px",borderRadius:6,border:"2px solid "+(active?"#3b82f6":"#e2e8f0"),background:active?"#eff6ff":val?"#fff":"#f8fafc",cursor:"pointer",fontFamily:F.b,fontSize:12,color:active?"#2563eb":val?"#1e293b":"#94a3b8",fontWeight:val?600:400,transition:"all .15s",textAlign:"center",minHeight:34}}>
        {val || "—"}
      </button>
    );
  };

  var inL  = inLineNames();
  var cardH = function(t){ return <div style={{background:C.navy,padding:"12px 20px"}}><div style={{fontFamily:NS_FH,fontSize:12,fontWeight:600,color:"#fff",letterSpacing:2,textTransform:"uppercase"}}>{t}</div></div>; };

  if (COACH_TEAMS.length === 0) {
    return (
      <main style={{maxWidth:1100,margin:"0 auto",padding:"32px 24px 60px"}}>
        <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"48px 32px",textAlign:"center"}}>
          <div style={{fontFamily:NS_FH,fontSize:20,color:C.navy,letterSpacing:1,marginBottom:8}}>No Teams Assigned</div>
          <div style={{fontFamily:F.b,fontSize:13,color:"#64748b"}}>You are not currently assigned as head coach of any active team. Contact an admin to be added.</div>
        </div>
      </main>
    );
  }

  return (
    <main style={{maxWidth:1100,margin:"0 auto",padding:"32px 24px 60px"}}>

      {COACH_TEAMS.length > 1 && (
        <div style={{display:"flex",gap:0,border:"1px solid #e2e8f0",borderRadius:8,overflow:"hidden",marginBottom:28,width:"fit-content"}}>
          {COACH_TEAMS.map(function(t,i){
            var active = selectedTeamIdx === i;
            return (
              <button key={t.id} onClick={function(){setSelectedTeamIdx(i);}} style={{padding:"8px 20px",border:"none",borderRight:i<COACH_TEAMS.length-1?"1px solid #e2e8f0":"none",cursor:"pointer",fontFamily:F.b,fontSize:13,fontWeight:700,background:active?C.navy:"#fff",color:active?"#fff":"#64748b",transition:"all .15s"}}>
                {t.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Team header + Next Game + Record */}
      <div style={{marginBottom:32}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,borderLeft:"3px solid "+C.red,paddingLeft:12}}>
          <div style={{fontFamily:NS_FH,fontSize:22,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase"}}>{TEAM.label}</div>
          <span style={{fontFamily:F.b,fontSize:11,fontWeight:700,color:C.navy,background:"rgba(0,41,77,0.09)",padding:"3px 10px",borderRadius:20}}>{TEAM.tag}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
            {cardH("Next Game")}
            <div style={{padding:"14px 20px",display:"flex",alignItems:"center",gap:16}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:NS_FH,fontSize:24,fontWeight:700,color:"#1e293b",letterSpacing:1}}>vs {TEAM.nextGame.opp}</div>
                <div style={{fontFamily:F.b,fontSize:13,color:"#64748b",marginTop:4}}>{TEAM.nextGame.dow}, {TEAM.nextGame.date} · {TEAM.nextGame.time}</div>
                <div style={{fontFamily:F.b,fontSize:13,color:"#64748b",marginTop:2}}>{TEAM.nextGame.loc}</div>
              </div>
              <span style={{fontFamily:F.b,fontSize:11,fontWeight:700,color:TEAM.nextGame.home?"#fff":"#8c7046",background:TEAM.nextGame.home?C.olive:"#f5e9d6",padding:"4px 12px",borderRadius:20,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap"}}>{TEAM.nextGame.home?"Home":"Away"}</span>
            </div>
          </div>
          <div style={{background:C.navy,borderRadius:10,padding:"16px 20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
            <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.55)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Season Record</div>
            <div style={{fontFamily:NS_FH,fontSize:44,fontWeight:700,color:"#fff",letterSpacing:2,lineHeight:1}}>{TEAM.record.w}–{TEAM.record.l}–{TEAM.record.t}</div>
            <div style={{fontFamily:F.b,fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:6,letterSpacing:1}}>W–L–T · {TEAM.record.gp} GP</div>
          </div>
        </div>
      </div>

      {/* Season Schedule */}
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
          {TEAM.games.map(function(g,j){return (
            <div key={j} style={{display:"grid",gridTemplateColumns:"80px 1fr 130px 44px",padding:"6px 16px",borderBottom:j<TEAM.games.length-1?"1px solid #f1f5f9":"none",alignItems:"center",background:g.upcoming?"#f0f9ff":"transparent"}}>
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

      {/* Team Roster */}
      <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden",marginBottom:32}}>
        <div style={{background:C.navy,padding:"12px 20px"}}>
          <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.55)",letterSpacing:2,textTransform:"uppercase"}}>Team Roster</div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:"#fff",borderBottom:"1px solid #e2e8f0",position:"sticky",top:0,zIndex:1}}>
                {[["jersey","#"],["name","Player"],["pos","Pos"],["gp","GP"],["g","G"],["a","A"],["pts","PTS"],["pim","PIM"]].map(function(col){
                  var active = sortCol === col[0];
                  return (
                    <th key={col[0]} onClick={function(){handleSort(col[0]);}}
                      style={{padding:"6px 16px",fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase",textAlign:"left",cursor:"pointer",whiteSpace:"nowrap",userSelect:"none"}}>
                      <span style={{display:"inline-flex",alignItems:"center",gap:4}}>
                        {col[1]}
                        <span style={{display:"inline-flex",flexDirection:"column",gap:1}}>
                          <span style={{fontSize:7,fontFamily:"sans-serif",color:active&&sortDir==="asc"?"#475569":"#d1d5db",lineHeight:1}}>▲</span>
                          <span style={{fontSize:7,fontFamily:"sans-serif",color:active&&sortDir==="desc"?"#475569":"#d1d5db",lineHeight:1}}>▼</span>
                        </span>
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {sortedRoster.map(function(p,i){
                return (
                  <tr key={i} style={{borderBottom:"1px solid #f1f5f9"}}>
                    <td style={{padding:"6px 16px",fontFamily:F.b,fontSize:12,color:"#94a3b8",fontWeight:600}}>{p.jersey}</td>
                    <td style={{padding:"6px 16px",fontFamily:F.b,fontSize:13,color:"#334155",fontWeight:600}}>{p.name}</td>
                    <td style={{padding:"6px 16px",fontFamily:F.b,fontSize:13,color:"#334155"}}>{p.pos}</td>
                    <td style={{padding:"6px 16px",fontFamily:F.b,fontSize:13,color:"#334155"}}>{p.gp}</td>
                    <td style={{padding:"6px 16px",fontFamily:F.b,fontSize:13,color:"#334155"}}>{p.g}</td>
                    <td style={{padding:"6px 16px",fontFamily:F.b,fontSize:13,color:"#334155"}}>{p.a}</td>
                    <td style={{padding:"6px 16px",fontFamily:F.b,fontSize:13,color:"#334155"}}>{p.pts}</td>
                    <td style={{padding:"6px 16px",fontFamily:F.b,fontSize:13,color:"#334155"}}>{p.pim}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Game Lines */}
      <div style={{marginBottom:32}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontFamily:NS_FH,fontSize:18,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",borderLeft:"3px solid "+C.red,paddingLeft:12}}>Game Lines</div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {saved && <span style={{fontFamily:F.b,fontSize:12,color:"#16a34a",fontWeight:700}}>Lines saved</span>}
            <button onClick={function(){setLines({offense:lines.offense.map(function(){return {lw:null,c:null,rw:null};}),defense:lines.defense.map(function(){return {ld:null,rd:null};}),goalie:null});setSel(null);setPosFilter("");setSaved(false);}} style={{padding:"8px 16px",background:"none",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:12,color:"#64748b",cursor:"pointer"}}>Clear all</button>
            <button onClick={function(){setSaved(true);}} style={{padding:"8px 20px",background:C.red,color:"#fff",border:"none",borderRadius:6,fontFamily:F.b,fontSize:12,fontWeight:700,letterSpacing:1,cursor:"pointer"}}>Save lines</button>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:16,alignItems:"start"}}>

          {/* Lines grid */}
          <div style={{display:"flex",flexDirection:"column",gap:12}}>

            {/* Offense */}
            <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
              <div style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0",padding:"8px 16px"}}>
                <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:700,color:"#94a3b8",letterSpacing:2,textTransform:"uppercase"}}>Offense</div>
              </div>
              <div style={{padding:"12px 16px"}}>
                <div style={{display:"grid",gridTemplateColumns:"44px 1fr 1fr 1fr 24px",gap:6,marginBottom:6}}>
                  {["","LW","C","RW",""].map(function(h,i){return <div key={i} style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase",textAlign:i===0?"left":"center"}}>{h}</div>;})}
                </div>
                {lines.offense.map(function(ln,i){
                  return (
                    <div key={i} style={{display:"grid",gridTemplateColumns:"44px 1fr 1fr 1fr 24px",gap:6,marginBottom:6,alignItems:"center"}}>
                      <div style={{fontFamily:F.b,fontSize:11,fontWeight:700,color:"#cbd5e1"}}>{ORD[i]}</div>
                      {["lw","c","rw"].map(function(pos){return <div key={pos}>{slotBtn({type:"offense",idx:i,pos:pos})}</div>;})}
                      {lines.offense.length > 1
                        ? <button onClick={function(){var nl=JSON.parse(JSON.stringify(lines));nl.offense.splice(i,1);if(sel&&sel.type==="offense"&&sel.idx===i)setSel(null);setLines(nl);setSaved(false);}} style={{background:"none",border:"none",color:"#cbd5e1",cursor:"pointer",padding:0,display:"flex",alignItems:"center"}}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
                        : <div/>}
                    </div>
                  );
                })}
                {lines.offense.length < 4 && (
                  <button onClick={addOffenseLine} style={{marginTop:4,width:"100%",padding:"6px",background:"none",border:"1px dashed #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:12,color:"#94a3b8",cursor:"pointer"}}>+ Add line</button>
                )}
              </div>
            </div>

            {/* Defense */}
            <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
              <div style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0",padding:"8px 16px"}}>
                <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:700,color:"#94a3b8",letterSpacing:2,textTransform:"uppercase"}}>Defense</div>
              </div>
              <div style={{padding:"12px 16px"}}>
                <div style={{display:"grid",gridTemplateColumns:"44px 1fr 1fr 24px",gap:6,marginBottom:6}}>
                  {["","LD","RD",""].map(function(h,i){return <div key={i} style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase",textAlign:i===0?"left":"center"}}>{h}</div>;})}
                </div>
                {lines.defense.map(function(pr,i){
                  return (
                    <div key={i} style={{display:"grid",gridTemplateColumns:"44px 1fr 1fr 24px",gap:6,marginBottom:6,alignItems:"center"}}>
                      <div style={{fontFamily:F.b,fontSize:11,fontWeight:700,color:"#cbd5e1"}}>{ORD[i]}</div>
                      {["ld","rd"].map(function(pos){return <div key={pos}>{slotBtn({type:"defense",idx:i,pos:pos})}</div>;})}
                      {lines.defense.length > 1
                        ? <button onClick={function(){var nl=JSON.parse(JSON.stringify(lines));nl.defense.splice(i,1);if(sel&&sel.type==="defense"&&sel.idx===i)setSel(null);setLines(nl);setSaved(false);}} style={{background:"none",border:"none",color:"#cbd5e1",cursor:"pointer",padding:0,display:"flex",alignItems:"center"}}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
                        : <div/>}
                    </div>
                  );
                })}
                {lines.defense.length < 3 && (
                  <button onClick={addDefensePair} style={{marginTop:4,width:"100%",padding:"6px",background:"none",border:"1px dashed #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:12,color:"#94a3b8",cursor:"pointer"}}>+ Add pair</button>
                )}
              </div>
            </div>

            {/* Goalie */}
            <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
              <div style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0",padding:"8px 16px"}}>
                <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:700,color:"#94a3b8",letterSpacing:2,textTransform:"uppercase"}}>Goalie</div>
              </div>
              <div style={{padding:"12px 16px"}}>
                {(function(){var slot={type:"goalie",idx:0,pos:"g"};var active=isSelSlot(slot);return (
                  <button onClick={function(){clickSlot(slot);}} style={{width:"100%",padding:"8px 12px",borderRadius:6,border:"2px solid "+(active?"#3b82f6":"#e2e8f0"),background:active?"#eff6ff":lines.goalie?"#fff":"#f8fafc",cursor:"pointer",fontFamily:F.b,fontSize:13,color:active?"#2563eb":lines.goalie?"#1e293b":"#94a3b8",fontWeight:lines.goalie?600:400,transition:"all .15s",textAlign:"left"}}>
                    {lines.goalie || "Click to assign"}
                  </button>
                );})()}
              </div>
            </div>
          </div>

          {/* Roster picker */}
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden",position:"sticky",top:80}}>
            <div style={{background:C.navy,padding:"10px 16px"}}>
              <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.55)",letterSpacing:2,textTransform:"uppercase"}}>Roster</div>
              {sel && <div style={{fontFamily:F.b,fontSize:11,color:"#93c5fd",marginTop:2}}>Click a player to assign</div>}
            </div>
            {/* Column headers */}
            <div style={{display:"grid",gridTemplateColumns:"28px 1fr 40px 86px",padding:"5px 14px",borderBottom:"1px solid #e2e8f0",background:"#fff"}}>
              <div style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>#</div>
              <div style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>Player</div>
              <div style={{fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>Pos</div>
              <div />
            </div>
            <div style={{maxHeight:420,overflowY:"auto"}}>
              {sortedPanelRoster.map(function(p,i){
                var inLine=inL.indexOf(p.name)>=0;
                var posActive=!!sel&&posFilter===p.pos;
                return (
                  <button key={i}
                    onClick={function(){if(sel) assignPlayer(p.name);}}
                    style={{display:"grid",gridTemplateColumns:"28px 1fr 40px 86px",alignItems:"center",width:"100%",padding:"8px 14px",background:inLine?"#eff6ff":"#fff",border:"none",borderBottom:"1px solid #f1f5f9",cursor:sel?"pointer":"default",textAlign:"left",transition:"background .1s",borderLeft:inLine?"3px solid #93c5fd":"3px solid transparent"}}
                    onMouseEnter={function(e){if(sel)e.currentTarget.style.background="#f0f9ff";}}
                    onMouseLeave={function(e){e.currentTarget.style.background=inLine?"#eff6ff":"#fff";}}>
                    <span style={{fontFamily:F.b,fontSize:11,color:"#94a3b8"}}>{p.jersey}</span>
                    <span style={{fontFamily:F.b,fontSize:13,color:"#1e293b",fontWeight:inLine?600:400}}>{p.name}</span>
                    <span
                      onClick={function(e){e.stopPropagation();setPosFilter(posFilter===p.pos?"":p.pos);}}
                      style={{fontFamily:F.b,fontSize:11,fontWeight:posActive?700:400,color:posActive?"#1d4ed8":"#64748b",background:posActive?"#dbeafe":"#f1f5f9",padding:"2px 6px",borderRadius:4,cursor:"pointer",userSelect:"none",textAlign:"center"}}>
                      {p.pos}
                    </span>
                    {inLine
                      ? <span style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:"#1d4ed8",background:"#dbeafe",padding:"2px 6px",borderRadius:4,justifySelf:"end",whiteSpace:"nowrap"}}>In lineup</span>
                      : (function(){var a=NS_AVAIL_GET(p.avail);return <span style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:a.color,background:a.bg,padding:"2px 6px",borderRadius:4,justifySelf:"end",whiteSpace:"nowrap"}}>{a.label}</span>;}())
                    }
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

function NSAdminPortal({nav, adminTeams, setAdminTeams, adminTournaments, setAdminTournaments, adminVolunteers, setAdminVolunteers, adminGames, setAdminGames, newsletters, setNewsletters}) {

  var as = useState("members"); var activeSection = as[0]; var setActiveSection = as[1];
  var ms = useState(ADMIN_MEMBERS); var members = ms[0]; var setMembers = ms[1];
  var msc = useState(null); var memberSortCol = msc[0]; var setMemberSortCol = msc[1];
  var msd = useState("asc"); var memberSortDir = msd[0]; var setMemberSortDir = msd[1];
  var tst = useState("teams"); var teamsSubTab = tst[0]; var setTeamsSubTab = tst[1];
  var suo = useState(false); var showSignupModal = suo[0]; var setShowSignupModal = suo[1];
  var fe  = useState({});    var formErrors = fe[0];      var setFormErrors = fe[1];
  var mi  = useState(null);  var managingItem = mi[0];    var setManagingItem = mi[1];
  var ap  = useState("");    var addPlayerPick = ap[0];   var setAddPlayerPick = ap[1];
  var EMPTY_FORM = {name:"",startDate:"",endDate:"",rosterSize:"",location:"",spotsAvailable:"",description:"",time:"",homeAway:"home"};
  var openSignupModal = function() { setSignupForm(EMPTY_FORM); setFormErrors({}); setShowSignupModal(true); };
  var getManagingObj = function() {
    if (!managingItem) return null;
    var arr = managingItem.type==="teams" ? adminTeams : managingItem.type==="tournaments" ? adminTournaments : managingItem.type==="games" ? adminGames : adminVolunteers;
    return arr.find(function(x){return x.id===managingItem.id;}) || null;
  };
  var updateManagedItem = function(patch) {
    var setter = managingItem.type==="teams" ? setAdminTeams : managingItem.type==="tournaments" ? setAdminTournaments : managingItem.type==="games" ? setAdminGames : setAdminVolunteers;
    var countField = managingItem.type==="teams" ? "players" : managingItem.type==="tournaments" ? "participants" : managingItem.type==="games" ? "players" : "volunteers";
    setter(function(prev){return prev.map(function(x){
      if(x.id!==managingItem.id) return x;
      var updated = Object.assign({},x,patch);
      if(patch.roster !== undefined) updated[countField] = patch.roster.length;
      return updated;
    });});
  };
  var suf = useState({name:"",startDate:"",endDate:"",rosterSize:"",location:"",spotsAvailable:"",description:"",time:"",homeAway:"home"}); var signupForm = suf[0]; var setSignupForm = suf[1];
  var ne  = useState(null); var editingNL = ne[0]; var setEditingNL = ne[1];
  var pnl = useState(null); var previewingNL = pnl[0]; var setPreviewingNL = pnl[1];
  var nf  = useState({title:"",headline:"",body:"",imageDataUrl:"",date:"",status:"draft",publishTarget:"website"}); var nlForm = nf[0]; var setNlForm = nf[1];
  var nlsc = useState(null);   var nlSortCol = nlsc[0]; var setNlSortCol = nlsc[1];
  var nlsd = useState("asc");  var nlSortDir = nlsd[0]; var setNlSortDir = nlsd[1];
  var bds = useState(BOARD_MEMBERS.map(function(p){return Object.assign({},p);})); var boardStaff = bds[0]; var setBoardStaff = bds[1];
  var ops = useState(OPS_STAFF.map(function(p){return Object.assign({},p);})); var opsStaff = ops[0]; var setOpsStaff = ops[1];
  var chs = useState(COACHING.map(function(p){return Object.assign({},p);})); var coachStaff = chs[0]; var setCoachStaff = chs[1];
  var se = useState(null); var editingStaff = se[0]; var setEditingStaff = se[1];
  var sf = useState({name:"",role:"",branch:"",years:""}); var staffForm = sf[0]; var setStaffForm = sf[1];

  var TIER_LABELS = {vet:"Veteran",disabled:"Disabled",volunteer:"Volunteer"};
  var TIER_COLORS = {vet:{color:"#92400e",bg:"#fef3c7"},disabled:{color:"#16a34a",bg:"#dcfce7"},volunteer:{color:"#b91c1c",bg:"#fee2e2"}};
  var ROLE_LABELS = {admin:"Admin",staff:"Staff",coach:"Coach",player:"Player"};
  var ROLE_COLORS = {admin:{color:"#16a34a",bg:"#dcfce7"},staff:{color:"#64748b",bg:"#f1f5f9"},coach:{color:"#92400e",bg:"#fef3c7"},player:{color:"#64748b",bg:"#f1f5f9"}};

  var chip = function(label, color, bg) {
    return <span style={{display:"inline-block",fontFamily:F.b,fontSize:10,fontWeight:700,color:color,background:bg,padding:"2px 8px",borderRadius:20,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap"}}>{label}</span>;
  };
  var docChip = function(docs) {
    if (!docs.submitted) return chip("Pending",  "#94a3b8", "#f1f5f9");
    if (docs.approved)   return chip("Approved", "#16a34a", "#dcfce7");
    return chip("Submitted", "#92400e", "#fef3c7");
  };
  var sectionHead = function(title, action) {
    return (
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div style={{fontFamily:NS_FH,fontSize:20,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",borderLeft:"3px solid "+C.red,paddingLeft:12}}>{title}</div>
        {action}
      </div>
    );
  };
  var actionBtn = function(label, onClick, variant) {
    var isDanger = variant === "danger";
    var isGhost = variant === "ghost";
    return (
      <button onClick={onClick} style={{padding:"5px 12px",border:isDanger?"1px solid #fca5a5":isGhost?"1px solid #e2e8f0":"none",borderRadius:6,fontFamily:F.b,fontSize:12,fontWeight:700,cursor:"pointer",background:isDanger?"#fff":isGhost?"#fff":C.navy,color:isDanger?"#dc2626":isGhost?"#64748b":"#fff",letterSpacing:.5}}>{label}</button>
    );
  };

  var NAV_ITEMS = [
    {key:"members",    label:"Members"},
    {key:"teams",      label:"Programs"},
    {key:"newsletters",label:"Newsletters"},
    {key:"staff",      label:"Staff"},
  ];

  /* ── STAFF helpers ── */
  var startEditStaff = function(group, idx) {
    var arr = group==="board"?boardStaff:group==="ops"?opsStaff:coachStaff;
    var p = arr[idx];
    setEditingStaff({group,idx});
    setStaffForm({name:p.name||"",role:p.role||"",branch:p.branch||"",years:p.years||""});
  };
  var saveStaff = function() {
    var setter = editingStaff.group==="board"?setBoardStaff:editingStaff.group==="ops"?setOpsStaff:setCoachStaff;
    var arr = (editingStaff.group==="board"?boardStaff:editingStaff.group==="ops"?opsStaff:coachStaff).slice();
    if (editingStaff.idx === -1) { arr.push(Object.assign({},staffForm)); }
    else { arr[editingStaff.idx] = Object.assign({},staffForm); }
    setter(arr); setEditingStaff(null);
  };
  var removeStaff = function(group, idx) {
    var setter = group==="board"?setBoardStaff:group==="ops"?setOpsStaff:setCoachStaff;
    var arr = (group==="board"?boardStaff:group==="ops"?opsStaff:coachStaff).slice();
    arr.splice(idx,1); setter(arr);
  };
  var staffCard = function(p, i, group) {
    var isEditing = editingStaff && editingStaff.group===group && editingStaff.idx===i;
    if (isEditing) {
      return (
        <div key={i} style={{background:"#fff",border:"2px solid "+C.navy,borderRadius:10,padding:"16px",display:"flex",flexDirection:"column",gap:8}}>
          {[["Name","name"],["Role","role"],["Branch","branch"],["Years","years"]].map(function(pair){
            return <input key={pair[1]} placeholder={pair[0]} value={staffForm[pair[1]]} onChange={function(e){setStaffForm(function(prev){var n=Object.assign({},prev);n[pair[1]]=e.target.value;return n;});}} style={{padding:"6px 10px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:12,color:"#1e293b",outline:"none"}} />;
          })}
          <div style={{display:"flex",gap:6,marginTop:4}}>
            {actionBtn("Save",saveStaff)}
            {actionBtn("Cancel",function(){setEditingStaff(null);},"ghost")}
          </div>
        </div>
      );
    }
    return (
      <div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"16px",display:"flex",flexDirection:"column",gap:4}}>
        <div style={{fontFamily:NS_FH,fontSize:15,fontWeight:700,color:p.name==="Vacant"?"#94a3b8":C.navy,letterSpacing:1}}>{p.name||"Vacant"}</div>
        <div style={{fontFamily:F.b,fontSize:12,color:C.red,fontWeight:600}}>{p.role}</div>
        {p.branch && <div style={{fontFamily:F.b,fontSize:11,color:"#64748b"}}>{p.branch}</div>}
        {p.years  && <div style={{fontFamily:F.b,fontSize:11,color:"#94a3b8"}}>{p.years}</div>}
        <div style={{display:"flex",gap:6,marginTop:8}}>
          {actionBtn("Edit",function(){startEditStaff(group,i);},"ghost")}
          {actionBtn("Remove",function(){removeStaff(group,i);},"danger")}
        </div>
      </div>
    );
  };
  var staffSection = function(title, arr, group) {
    return (
      <div style={{marginBottom:28}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontFamily:F.b,fontSize:13,fontWeight:700,color:"#475569",letterSpacing:1,textTransform:"uppercase"}}>{title}</div>
          {actionBtn("+ Add",function(){setEditingStaff({group,idx:-1});setStaffForm({name:"",role:"",branch:"",years:""});},"ghost")}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>
          {arr.map(function(p,i){return staffCard(p,i,group);})}
          {editingStaff && editingStaff.group===group && editingStaff.idx===-1 && (
            <div style={{background:"#fff",border:"2px solid "+C.navy,borderRadius:10,padding:"16px",display:"flex",flexDirection:"column",gap:8}}>
              {[["Name","name"],["Role","role"],["Branch","branch"],["Years","years"]].map(function(pair){
                return <input key={pair[1]} placeholder={pair[0]} value={staffForm[pair[1]]} onChange={function(e){setStaffForm(function(prev){var n=Object.assign({},prev);n[pair[1]]=e.target.value;return n;});}} style={{padding:"6px 10px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:12,color:"#1e293b",outline:"none"}} />;
              })}
              <div style={{display:"flex",gap:6,marginTop:4}}>
                {actionBtn("Save",saveStaff)}
                {actionBtn("Cancel",function(){setEditingStaff(null);},"ghost")}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ── MEMBERS sort ── */
  var memberSortToggle = function(col) {
    if (memberSortCol === col) { setMemberSortDir(function(d){return d==="asc"?"desc":"asc";}); }
    else { setMemberSortCol(col); setMemberSortDir("asc"); }
  };
  var sortedMembers = (function() {
    if (!memberSortCol) return members;
    return members.slice().sort(function(a,b) {
      var av, bv;
      if      (memberSortCol==="name")      { av=a.name;      bv=b.name; }
      else if (memberSortCol==="email")     { av=a.email;     bv=b.email; }
      else if (memberSortCol==="tier")      { av=a.tier;      bv=b.tier; }
      else if (memberSortCol==="paperwork") {
        var rank = function(d) { return d.approved?2:d.submitted?1:0; };
        av=rank(a.docs); bv=rank(b.docs);
        return memberSortDir==="asc" ? av-bv : bv-av;
      }
      else if (memberSortCol==="role")      { av=a.role;      bv=b.role; }
      else if (memberSortCol==="joined")    { av=a.joined;    bv=b.joined; }
      if (av < bv) return memberSortDir==="asc" ? -1 : 1;
      if (av > bv) return memberSortDir==="asc" ?  1 : -1;
      return 0;
    });
  })();

  /* ── SIGN-UP modal ── */
  var submitSignup = function() {
    var isTm   = teamsSubTab==="teams";
    var isTr   = teamsSubTab==="tournaments";
    var isVol  = teamsSubTab==="volunteers";
    var isGame = teamsSubTab==="games";
    var e = {};
    if (!signupForm.name.trim())        e.name = "Required";
    if ((isTr||isVol||isGame) && !signupForm.location.trim()) e.location = "Required";
    if (!signupForm.startDate)          e.startDate = "Required";
    if (isGame && !signupForm.time.trim()) e.time = "Required";
    if (isTm||isTr) {
      if (!signupForm.endDate)          e.endDate = "Required";
      else if (signupForm.startDate && signupForm.endDate <= signupForm.startDate) e.endDate = "End date must be after start date";
    }
    if ((isTm||isTr||isGame) && !signupForm.rosterSize) e.rosterSize = "Required";
    if (isVol && !signupForm.spotsAvailable)             e.spotsAvailable = "Required";
    if (!signupForm.description.trim()) e.description = "Required";
    if (Object.keys(e).length > 0) { setFormErrors(e); return; }
    var id = Date.now();
    if (isTm) {
      setAdminTeams(function(prev){return prev.concat([{id:id, name:signupForm.name, startDate:signupForm.startDate, endDate:signupForm.endDate, rosterSize:parseInt(signupForm.rosterSize,10)||0, players:0, status:"signup", tiers:["vet","disabled"], description:signupForm.description, headCoach:null, roster:[]}]);});
    } else if (isTr) {
      setAdminTournaments(function(prev){return prev.concat([{id:id, name:signupForm.name, startDate:signupForm.startDate, endDate:signupForm.endDate, location:signupForm.location, rosterSize:parseInt(signupForm.rosterSize,10)||0, participants:0, status:"signup", tiers:["vet","disabled"], description:signupForm.description, headCoach:null, roster:[]}]);});
    } else if (isGame) {
      setAdminGames(function(prev){return prev.concat([{id:id, name:signupForm.name, date:signupForm.startDate, time:signupForm.time, location:signupForm.location, home:signupForm.homeAway==="home", rosterSize:parseInt(signupForm.rosterSize,10)||0, players:0, status:"signup", tiers:["vet","disabled"], description:signupForm.description, headCoach:null, roster:[]}]);});
    } else {
      setAdminVolunteers(function(prev){return prev.concat([{id:id, name:signupForm.name, date:signupForm.startDate, location:signupForm.location, spotsAvailable:parseInt(signupForm.spotsAvailable,10)||0, volunteers:0, status:"signup", tiers:["vet","disabled","volunteer"], description:signupForm.description, roster:[]}]);});
    }
    setSignupForm(EMPTY_FORM); setFormErrors({}); setShowSignupModal(false);
  };

  /* ── NEWSLETTER helpers ── */
  var NL_EMPTY = {title:"",headline:"",body:"",imageDataUrl:"",date:"",status:"draft",publishTarget:"website"};
  var openNLEditor = function(nl) {
    if (nl) { setNlForm({title:nl.title,headline:nl.headline||"",body:nl.body||"",imageDataUrl:nl.imageDataUrl||"",date:nl.date,status:nl.status,publishTarget:nl.publishTarget||"website"}); setEditingNL(nl.id); }
    else     { setNlForm(NL_EMPTY); setEditingNL("new"); }
  };
  var saveNL = function() {
    var entry = {title:nlForm.title,headline:nlForm.headline,body:nlForm.body,imageDataUrl:nlForm.imageDataUrl,date:nlForm.date,status:nlForm.status,publishTarget:nlForm.publishTarget};
    if (editingNL === "new") {
      setNewsletters(function(prev){return prev.concat([Object.assign({id:Date.now(),recipients:0},entry)]);});
    } else {
      setNewsletters(function(prev){return prev.map(function(n){return n.id===editingNL?Object.assign({},n,entry):n;});});
    }
    setEditingNL(null);
  };
  var nlSortToggle = function(col) {
    if (nlSortCol===col) { setNlSortDir(function(d){return d==="asc"?"desc":"asc";}); }
    else { setNlSortCol(col); setNlSortDir("asc"); }
  };
  var sortedNewsletters = (function(){
    var arr = newsletters.slice();
    if (!nlSortCol) return arr;
    arr.sort(function(a,b){
      var av, bv;
      if      (nlSortCol==="title")      { av=a.title;       bv=b.title; }
      else if (nlSortCol==="date")       { av=a.date;        bv=b.date; }
      else if (nlSortCol==="status")     { av=a.status;      bv=b.status; }
      else if (nlSortCol==="recipients") { return nlSortDir==="asc" ? a.recipients-b.recipients : b.recipients-a.recipients; }
      if (av<bv) return nlSortDir==="asc"?-1:1;
      if (av>bv) return nlSortDir==="asc"?1:-1;
      return 0;
    });
    return arr;
  })();

  /* ── RENDER ── */
  return (
    <div style={{background:"#f1f5f9",minHeight:"100vh"}}>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"32px 24px 60px",display:"flex",gap:24,alignItems:"flex-start"}}>

        {/* Sidebar nav */}
        <div style={{width:180,flexShrink:0,background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden",position:"sticky",top:80}}>
          <div style={{background:C.navy,padding:"14px 16px"}}>
            <div style={{fontFamily:NS_FH,fontSize:13,fontWeight:700,color:"#fff",letterSpacing:2,textTransform:"uppercase"}}>Admin Portal</div>
          </div>
          {NAV_ITEMS.map(function(item){
            var active = activeSection===item.key;
            return (
              <button key={item.key} onClick={function(){setActiveSection(item.key);}} style={{display:"block",width:"100%",textAlign:"left",padding:"11px 16px",background:active?"#f0f4ff":"none",border:"none",borderLeft:active?"3px solid "+C.red:"3px solid transparent",fontFamily:F.b,fontSize:13,fontWeight:active?700:500,color:active?C.navy:"#64748b",cursor:"pointer"}}>
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Main content */}
        <div style={{flex:1,minWidth:0}}>

          {/* ── MEMBERS ── */}
          {activeSection==="members" && (
            <div>
              {sectionHead("Members")}
              <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 130px 160px 120px 80px",gap:0,background:"#f8fafc",borderBottom:"1px solid #e2e8f0",padding:"8px 16px"}}>
                  {[["Name","name"],["Email","email"],["Tier","tier"],["Paperwork","paperwork"],["Role","role"],["Joined","joined"]].map(function(pair){
                    var label=pair[0], col=pair[1];
                    var active = memberSortCol===col;
                    return (
                      <button key={col} onClick={function(){memberSortToggle(col);}} style={{background:"none",border:"none",padding:0,textAlign:"left",cursor:"pointer",fontFamily:F.b,fontSize:10,fontWeight:700,color:active?"#1e293b":"#94a3b8",letterSpacing:1,textTransform:"uppercase",display:"inline-flex",alignItems:"center",gap:4,userSelect:"none"}}>
                        {label}
                        <span style={{display:"inline-flex",flexDirection:"column",gap:1}}>
                          <span style={{fontSize:7,fontFamily:"sans-serif",color:active&&memberSortDir==="asc"?"#475569":"#d1d5db",lineHeight:1}}>▲</span>
                          <span style={{fontSize:7,fontFamily:"sans-serif",color:active&&memberSortDir==="desc"?"#475569":"#d1d5db",lineHeight:1}}>▼</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                {sortedMembers.map(function(m,i){
                  var ddStyle = {padding:"4px 8px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:12,color:"#1e293b",background:"#fff",cursor:"pointer",outline:"none"};
                  return (
                    <div key={m.id} style={{display:"grid",gridTemplateColumns:"1fr 1fr 130px 160px 120px 80px",gap:0,padding:"10px 16px",borderBottom:i<sortedMembers.length-1?"1px solid #f1f5f9":"none",alignItems:"center"}}>
                      <div style={{fontFamily:F.b,fontSize:13,fontWeight:600,color:"#1e293b"}}>{m.name}</div>
                      <div style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{m.email}</div>
                      <div>
                        <select value={m.tier} onChange={function(e){var val=e.target.value;setMembers(function(prev){return prev.map(function(x){return x.id===m.id?Object.assign({},x,{tier:val}):x;});});}} style={ddStyle}>
                          <option value="vet">Veteran</option>
                          <option value="disabled">Disabled</option>
                          <option value="volunteer">Volunteer</option>
                        </select>
                      </div>
                      <div style={{display:"flex",gap:6,alignItems:"center"}}>
                        {docChip(m.docs)}
                        {m.docs.submitted && (
                          <button style={{background:"none",border:"none",fontFamily:F.b,fontSize:11,color:C.navy,cursor:"pointer",padding:0,fontWeight:600,textDecoration:"underline"}}>View</button>
                        )}
                      </div>
                      <div>
                        <select value={m.role} onChange={function(e){var val=e.target.value;setMembers(function(prev){return prev.map(function(x){return x.id===m.id?Object.assign({},x,{role:val}):x;});});}} style={ddStyle}>
                          <option value="player">Player</option>
                          <option value="coach">Coach</option>
                          <option value="staff">Staff</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div style={{fontFamily:F.b,fontSize:11,color:"#94a3b8"}}>{m.joined}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── TEAMS ── */}
          {activeSection==="teams" && (function() {
            var fmt = function(ds) {
              if (!ds) return "";
              var d = new Date(ds+"T00:00:00");
              return d.toLocaleString("default",{month:"short",day:"numeric",year:"numeric"});
            };
            var statusChip = function(s) {
              if (s==="active")  return chip("Active",  "#16a34a","#dcfce7");
              if (s==="signup")  return chip("Sign-up Open","#92400e","#fef3c7");
              return chip("Closed","#64748b","#f1f5f9");
            };
            var SUB_TABS = [{key:"teams",label:"Teams"},{key:"tournaments",label:"Tournaments"},{key:"games",label:"Single game"},{key:"volunteers",label:"Volunteer opportunities"}];
            var btnLabel = teamsSubTab==="teams" ? "+ New team" : teamsSubTab==="tournaments" ? "+ New tournament" : teamsSubTab==="games" ? "+ New game" : "+ New opportunity";
            return (
              <div>
                {sectionHead("Programs")}

                {/* Sub-tabs + create button on same row */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
                  <div style={{display:"flex",gap:0,border:"1px solid #e2e8f0",borderRadius:8,overflow:"hidden",width:"fit-content"}}>
                    {SUB_TABS.map(function(t){
                      var active = teamsSubTab===t.key;
                      return <button key={t.key} onClick={function(){setTeamsSubTab(t.key);}} style={{padding:"8px 18px",border:"none",borderRight:t.key!=="volunteers"?"1px solid #e2e8f0":"none",cursor:"pointer",fontFamily:F.b,fontSize:12,fontWeight:700,background:active?C.navy:"#fff",color:active?"#fff":"#64748b",transition:"all .15s"}}>{t.label}</button>;
                    })}
                  </div>
                  {actionBtn(btnLabel,openSignupModal,"ghost")}
                </div>

                {/* Teams list */}
                {teamsSubTab==="teams" && (
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    {adminTeams.map(function(t){
                      return (
                        <div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
                          <div>
                            <div style={{fontFamily:NS_FH,fontSize:16,fontWeight:700,color:C.navy,letterSpacing:1,marginBottom:4}}>{t.name}</div>
                            <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                              <span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{fmt(t.startDate)} – {fmt(t.endDate)}</span>
                              <span style={{fontFamily:F.b,fontSize:12,color:"#94a3b8"}}>·</span>
                              <span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{t.players}/{t.rosterSize} players</span>
                            </div>
                          </div>
                          <div style={{display:"flex",gap:8,alignItems:"center"}}>
                            {statusChip(t.status)}
                            {actionBtn("Manage",function(){setManagingItem({type:"teams",id:t.id});},"ghost")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tournaments list */}
                {teamsSubTab==="tournaments" && (
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    {adminTournaments.map(function(t){
                      return (
                        <div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
                          <div>
                            <div style={{fontFamily:NS_FH,fontSize:16,fontWeight:700,color:C.navy,letterSpacing:1,marginBottom:4}}>{t.name}</div>
                            <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                              <span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{fmt(t.startDate)}{t.endDate&&t.endDate!==t.startDate?" – "+fmt(t.endDate):""}</span>
                              {t.location && <><span style={{fontFamily:F.b,fontSize:12,color:"#94a3b8"}}>·</span><span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{t.location}</span></>}
                              <span style={{fontFamily:F.b,fontSize:12,color:"#94a3b8"}}>·</span>
                              <span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{t.participants}/{t.rosterSize} registered</span>
                            </div>
                          </div>
                          <div style={{display:"flex",gap:8,alignItems:"center"}}>
                            {statusChip(t.status)}
                            {actionBtn("Manage",function(){setManagingItem({type:"tournaments",id:t.id});},"ghost")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Single game list */}
                {teamsSubTab==="games" && (
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    {adminGames.map(function(g){
                      return (
                        <div key={g.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
                          <div>
                            <div style={{fontFamily:NS_FH,fontSize:16,fontWeight:700,color:C.navy,letterSpacing:1,marginBottom:4}}>{g.name}</div>
                            <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                              <span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{fmt(g.date)}{g.time?" · "+g.time:""}</span>
                              {g.location && <><span style={{fontFamily:F.b,fontSize:12,color:"#94a3b8"}}>·</span><span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{g.location}</span></>}
                              <span style={{fontFamily:F.b,fontSize:12,color:"#94a3b8"}}>·</span>
                              <span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{g.home?"Home":"Away"}</span>
                              <span style={{fontFamily:F.b,fontSize:12,color:"#94a3b8"}}>·</span>
                              <span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{g.players}/{g.rosterSize} players</span>
                            </div>
                          </div>
                          <div style={{display:"flex",gap:8,alignItems:"center"}}>
                            {statusChip(g.status)}
                            {actionBtn("Manage",function(){setManagingItem({type:"games",id:g.id});},"ghost")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Volunteers list */}
                {teamsSubTab==="volunteers" && (
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    {adminVolunteers.map(function(v){
                      return (
                        <div key={v.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
                          <div>
                            <div style={{fontFamily:NS_FH,fontSize:16,fontWeight:700,color:C.navy,letterSpacing:1,marginBottom:4}}>{v.name}</div>
                            <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                              <span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{fmt(v.date)}</span>
                              {v.location && <><span style={{fontFamily:F.b,fontSize:12,color:"#94a3b8"}}>·</span><span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{v.location}</span></>}
                              <span style={{fontFamily:F.b,fontSize:12,color:"#94a3b8"}}>·</span>
                              <span style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{v.volunteers}/{v.spotsAvailable} volunteers</span>
                            </div>
                          </div>
                          <div style={{display:"flex",gap:8,alignItems:"center"}}>
                            {statusChip(v.status)}
                            {actionBtn("Manage",function(){setManagingItem({type:"volunteers",id:v.id});},"ghost")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

          {/* ── MANAGE MODAL ── */}
          {(function(){
            if (!managingItem) return null;
            var obj = getManagingObj();
            if (!obj) return null;
            var fmt = function(ds) {
              if (!ds) return "";
              var d = new Date(ds+"T00:00:00");
              return d.toLocaleString("default",{month:"short",day:"numeric",year:"numeric"});
            };
            var isVol = managingItem.type==="volunteers";
            var isTeam = managingItem.type==="teams";
            var isTr = managingItem.type==="tournaments";
            var isGame = managingItem.type==="games";
            var countLabel = isVol ? "volunteers" : isTr ? "registered" : "players";
            var countField = isVol ? "volunteers" : isTr ? "participants" : "players";
            var capacityField = isVol ? "spotsAvailable" : "rosterSize";
            var coaches = members.filter(function(m){return m.role==="admin"||m.role==="coach";});
            var headCoachMember = obj.headCoach ? members.find(function(m){return m.id===obj.headCoach;}) : null;
            var rosterMembers = (obj.roster||[]).map(function(rid){return members.find(function(m){return m.id===rid;});}).filter(Boolean);
            var nonRoster = members.filter(function(m){return !(obj.roster||[]).includes(m.id);});
            return (
              <div onClick={function(){setManagingItem(null); setAddPlayerPick("");}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:200,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:48,overflowY:"auto"}}>
                <div onClick={function(e){e.stopPropagation();}} style={{background:"#f8fafc",borderRadius:12,width:"100%",maxWidth:680,margin:"0 16px 48px",boxShadow:"0 8px 40px rgba(0,0,0,0.18)",overflow:"hidden"}}>

                  {/* Header */}
                  <div style={{background:C.navy,padding:"18px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
                    <div>
                      <div style={{fontFamily:NS_FH,fontSize:18,fontWeight:700,color:"#fff",letterSpacing:1}}>{obj.name}</div>
                      <div style={{fontFamily:F.b,fontSize:12,color:"rgba(255,255,255,0.7)",marginTop:2}}>
                        {obj[countField]}/{obj[capacityField]} {countLabel}
                        {(isTeam||isTr) && obj.startDate && <span style={{marginLeft:10}}>{fmt(obj.startDate)}{obj.endDate?" – "+fmt(obj.endDate):""}</span>}
                        {isVol && obj.date && <span style={{marginLeft:10}}>{fmt(obj.date)}</span>}
                        {isGame && obj.date && <span style={{marginLeft:10}}>{fmt(obj.date)}{obj.time?" · "+obj.time:""}{obj.home!==undefined?" · "+(obj.home?"Home":"Away"):""}</span>}
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <select value={obj.status} onChange={function(e){
                        var v=e.target.value;
                        var setter = managingItem.type==="teams" ? setAdminTeams : managingItem.type==="tournaments" ? setAdminTournaments : managingItem.type==="games" ? setAdminGames : setAdminVolunteers;
                        setter(function(prev){return prev.map(function(x){return x.id===obj.id?Object.assign({},x,{status:v}):x;});});
                      }} style={{padding:"6px 10px",border:"1px solid rgba(255,255,255,0.3)",borderRadius:6,fontFamily:F.b,fontSize:12,background:"rgba(255,255,255,0.12)",color:"#fff",cursor:"pointer",outline:"none"}}>
                        <option value="signup" style={{color:"#1e293b"}}>Sign-up open</option>
                        <option value="active" style={{color:"#1e293b"}}>Active</option>
                        <option value="closed" style={{color:"#1e293b"}}>Closed</option>
                      </select>
                      <button onClick={function(){setManagingItem(null); setAddPlayerPick("");}} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.7)",fontSize:20,lineHeight:1,padding:4,display:"flex",alignItems:"center"}}>✕</button>
                    </div>
                  </div>

                  <div style={{padding:"24px"}}>

                    {/* Head Coach (teams + tournaments only) */}
                    {!isVol && (
                      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"18px 20px",marginBottom:16}}>
                        <div style={{fontFamily:NS_FH,fontSize:13,fontWeight:700,color:C.navy,letterSpacing:0.8,marginBottom:12}}>HEAD COACH</div>
                        <div style={{display:"flex",alignItems:"center",gap:12}}>
                          <select value={obj.headCoach||""} onChange={function(e){
                            var v=e.target.value;
                            updateManagedItem({headCoach:v?parseInt(v,10):null});
                          }} style={{flex:1,padding:"8px 12px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#1e293b",background:"#fff",outline:"none",cursor:"pointer"}}>
                            <option value="">— Unassigned —</option>
                            {coaches.map(function(c){return <option key={c.id} value={c.id}>{c.name} ({c.role})</option>;})}
                          </select>
                          {headCoachMember && (
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              {chip(headCoachMember.tier,"#334155","#e2e8f0")}
                              {chip(headCoachMember.role,"#334155","#e2e8f0")}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Roster */}
                    <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
                      <div style={{padding:"14px 20px",borderBottom:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                        <div style={{fontFamily:NS_FH,fontSize:13,fontWeight:700,color:C.navy,letterSpacing:0.8}}>
                          ROSTER <span style={{fontFamily:F.b,fontSize:12,fontWeight:400,color:"#64748b",marginLeft:4}}>{obj[countField]}/{obj[capacityField]}</span>
                        </div>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          <select value={addPlayerPick} onChange={function(e){setAddPlayerPick(e.target.value);}} style={{padding:"6px 10px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:12,color:"#1e293b",background:"#fff",outline:"none",cursor:"pointer"}}>
                            <option value="">Select a member…</option>
                            {nonRoster.map(function(m){return <option key={m.id} value={m.id}>{m.name} ({m.role})</option>;})}
                          </select>
                          <button onClick={function(){
                            if(!addPlayerPick) return;
                            var newId = parseInt(addPlayerPick,10);
                            var newRoster = (obj.roster||[]).concat([newId]);
                            updateManagedItem({roster:newRoster});
                            setAddPlayerPick("");
                          }} style={{padding:"6px 14px",background:C.navy,color:"#fff",border:"none",borderRadius:6,fontFamily:F.b,fontSize:12,fontWeight:700,cursor:"pointer"}}>Add</button>
                        </div>
                      </div>
                      {rosterMembers.length===0 ? (
                        <div style={{padding:"24px 20px",fontFamily:F.b,fontSize:13,color:"#94a3b8",textAlign:"center"}}>No members on the roster yet.</div>
                      ) : (
                        <div>
                          {rosterMembers.map(function(m){
                            return (
                              <div key={m.id} style={{padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #f1f5f9"}}>
                                <div style={{display:"flex",alignItems:"center",gap:10}}>
                                  <div style={{width:32,height:32,borderRadius:"50%",background:"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.b,fontSize:12,fontWeight:700,color:"#475569"}}>{m.name.split(" ").map(function(n){return n[0];}).join("").slice(0,2)}</div>
                                  <div>
                                    <div style={{fontFamily:F.b,fontSize:13,fontWeight:700,color:"#1e293b"}}>{m.name}</div>
                                    <div style={{fontFamily:F.b,fontSize:11,color:"#64748b"}}>{m.email}</div>
                                  </div>
                                </div>
                                <div style={{display:"flex",alignItems:"center",gap:8}}>
                                  {chip(m.tier,"#334155","#e2e8f0")}
                                  {chip(m.role,"#334155","#e2e8f0")}
                                  <button onClick={function(){
                                    var newRoster = (obj.roster||[]).filter(function(rid){return rid!==m.id;});
                                    updateManagedItem({roster:newRoster});
                                  }} style={{background:"none",border:"1px solid #fca5a5",borderRadius:6,cursor:"pointer",padding:"4px 10px",fontFamily:F.b,fontSize:11,color:C.red,fontWeight:700}}>Remove</button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── NEWSLETTERS ── */}
          {activeSection==="newsletters" && (
            <div>
              {sectionHead("Newsletters", actionBtn("+ Create newsletter",function(){openNLEditor(null);},"ghost"))}

              {/* Editor form */}
              {editingNL && (
                <div style={{background:"#fff",border:"2px solid "+C.navy,borderRadius:10,padding:"24px",marginBottom:20}}>
                  <div style={{fontFamily:NS_FH,fontSize:15,fontWeight:700,color:C.navy,letterSpacing:1,marginBottom:18}}>{editingNL==="new"?"New Newsletter":"Edit Newsletter"}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:14}}>

                    {/* Row 1: Title + Date */}
                    <div style={{display:"grid",gridTemplateColumns:"1fr 180px",gap:12}}>
                      <div style={{display:"flex",flexDirection:"column",gap:4}}>
                        <label style={{fontFamily:F.b,fontSize:11,color:"#64748b"}}>Title</label>
                        <input value={nlForm.title} onChange={function(e){setNlForm(function(p){return Object.assign({},p,{title:e.target.value});});}} placeholder="e.g. Spring 2026 Update" style={{padding:"8px 12px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#1e293b",outline:"none"}} />
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:4}}>
                        <label style={{fontFamily:F.b,fontSize:11,color:"#64748b"}}>Date</label>
                        <input value={nlForm.date} onChange={function(e){setNlForm(function(p){return Object.assign({},p,{date:e.target.value});});}} placeholder="e.g. Jun 21, 2026" style={{padding:"8px 12px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#1e293b",outline:"none"}} />
                      </div>
                    </div>

                    {/* Row 2: Headline */}
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      <label style={{fontFamily:F.b,fontSize:11,color:"#64748b"}}>Headline</label>
                      <input value={nlForm.headline} onChange={function(e){setNlForm(function(p){return Object.assign({},p,{headline:e.target.value});});}} placeholder="e.g. Get Ready for Fall 2026" style={{padding:"8px 12px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#1e293b",outline:"none"}} />
                    </div>

                    {/* Row 3: Image upload */}
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      <label style={{fontFamily:F.b,fontSize:11,color:"#64748b"}}>Cover image (.jpg)</label>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        {nlForm.imageDataUrl && <img src={nlForm.imageDataUrl} alt="" style={{width:100,height:68,objectFit:"cover",borderRadius:6,border:"1px solid #e2e8f0",flexShrink:0}} />}
                        <label style={{display:"inline-block",padding:"6px 14px",background:"#fff",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:12,fontWeight:700,cursor:"pointer",color:"#64748b",userSelect:"none"}}>
                          {nlForm.imageDataUrl?"Change image":"Upload image"}
                          <input type="file" accept=".jpg,.jpeg" style={{display:"none"}} onChange={function(e){var file=e.target.files[0];if(file){var r=new FileReader();r.onload=function(ev){var url=ev.target.result;setNlForm(function(p){return Object.assign({},p,{imageDataUrl:url});});};r.readAsDataURL(file);}e.target.value="";}} />
                        </label>
                        {nlForm.imageDataUrl && <button onClick={function(){setNlForm(function(p){return Object.assign({},p,{imageDataUrl:""});});}} style={{background:"none",border:"1px solid #fca5a5",borderRadius:6,cursor:"pointer",padding:"5px 12px",fontFamily:F.b,fontSize:11,color:C.red,fontWeight:700}}>Remove</button>}
                      </div>
                    </div>

                    {/* Row 4: Body */}
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      <label style={{fontFamily:F.b,fontSize:11,color:"#64748b"}}>Body — press Enter twice to add a paragraph break</label>
                      <textarea value={nlForm.body} onChange={function(e){setNlForm(function(p){return Object.assign({},p,{body:e.target.value});});}} rows={10} placeholder="Write the newsletter content here…" style={{padding:"8px 12px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#1e293b",outline:"none",resize:"vertical",lineHeight:1.65,boxSizing:"border-box",width:"100%"}} />
                    </div>

                    {/* Row 5: Status + Publish target */}
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                      <div style={{display:"flex",flexDirection:"column",gap:4}}>
                        <label style={{fontFamily:F.b,fontSize:11,color:"#64748b"}}>Status</label>
                        <select value={nlForm.status} onChange={function(e){setNlForm(function(p){return Object.assign({},p,{status:e.target.value});});}} style={{padding:"8px 12px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#1e293b",outline:"none",background:"#fff",cursor:"pointer"}}>
                          <option value="draft">Draft</option>
                          <option value="sent">Published</option>
                        </select>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:4}}>
                        <label style={{fontFamily:F.b,fontSize:11,color:"#64748b"}}>Publish to</label>
                        <select value={nlForm.publishTarget} onChange={function(e){setNlForm(function(p){return Object.assign({},p,{publishTarget:e.target.value});});}} style={{padding:"8px 12px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#1e293b",outline:"none",background:"#fff",cursor:"pointer"}}>
                          <option value="website">Website only</option>
                          <option value="both">Email + Website</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 6: Actions */}
                    <div style={{display:"flex",gap:8,paddingTop:4}}>
                      {actionBtn("Save",saveNL)}
                      {actionBtn("Preview",function(){setPreviewingNL(Object.assign({},nlForm,{id:editingNL}));},"ghost")}
                      {actionBtn("Cancel",function(){setEditingNL(null);},"ghost")}
                    </div>
                  </div>
                </div>
              )}

              {/* Newsletters table */}
              <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 120px 100px 140px 75px 210px",background:"#f8fafc",borderBottom:"1px solid #e2e8f0",padding:"8px 16px",columnGap:16}}>
                  {[["Title","title"],["Date","date"],["Status","status"],["Publish to",null],["Recipients","recipients"],["",null]].map(function(pair,i){
                    var label=pair[0], col=pair[1];
                    var active = col && nlSortCol===col;
                    if (!col) return <div key={i} style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase",textAlign:i===5?"right":"left"}}>{label}</div>;
                    return (
                      <button key={i} onClick={function(){nlSortToggle(col);}} style={{background:"none",border:"none",padding:0,textAlign:"left",cursor:"pointer",fontFamily:F.b,fontSize:10,fontWeight:700,color:active?"#1e293b":"#94a3b8",letterSpacing:1,textTransform:"uppercase",display:"inline-flex",alignItems:"center",gap:4,userSelect:"none"}}>
                        {label}
                        <span style={{display:"inline-flex",flexDirection:"column",gap:1}}>
                          <span style={{fontSize:7,fontFamily:"sans-serif",color:active&&nlSortDir==="asc"?"#475569":"#d1d5db",lineHeight:1}}>▲</span>
                          <span style={{fontSize:7,fontFamily:"sans-serif",color:active&&nlSortDir==="desc"?"#475569":"#d1d5db",lineHeight:1}}>▼</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                {sortedNewsletters.map(function(n,i){
                  return (
                    <div key={n.id} style={{display:"grid",gridTemplateColumns:"1fr 120px 100px 140px 75px 210px",padding:"10px 16px",columnGap:16,borderBottom:i<sortedNewsletters.length-1?"1px solid #f1f5f9":"none",alignItems:"center"}}>
                      <div style={{fontFamily:F.b,fontSize:13,fontWeight:600,color:"#1e293b"}}>{n.title}</div>
                      <div style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{n.date}</div>
                      <div>{n.status==="sent"?chip("Published","#16a34a","#dcfce7"):chip("Draft","#92400e","#fef3c7")}</div>
                      <div style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{n.publishTarget==="both"?"Email + Website":"Website only"}</div>
                      <div style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{n.status==="sent"?n.recipients:"—"}</div>
                      <div style={{display:"flex",gap:6,justifyContent:"flex-end",flexWrap:"nowrap",paddingLeft:12}}>
                        {actionBtn("Preview",function(){setPreviewingNL(n);},"ghost")}
                        {actionBtn("Edit",function(){openNLEditor(n);},"ghost")}
                        {actionBtn("Remove",function(){setNewsletters(function(prev){return prev.filter(function(x){return x.id!==n.id;});});},"danger")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STAFF ── */}
          {activeSection==="staff" && (
            <div>
              {sectionHead("Staff")}
              <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"20px 24px"}}>
                {staffSection("Board of Directors",boardStaff,"board")}
                {staffSection("Operations Staff",opsStaff,"ops")}
                {staffSection("Coaching Staff",coachStaff,"coaching")}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── CREATE MODAL ── */}
      {showSignupModal && (function() {
        var isTm   = teamsSubTab==="teams";
        var isTr   = teamsSubTab==="tournaments";
        var isVol  = teamsSubTab==="volunteers";
        var isGame = teamsSubTab==="games";
        var modalTitle = isTm ? "New Team Sign-Up" : isTr ? "New Tournament" : isGame ? "New Single Game" : "New Volunteer Opportunity";
        var submitLabel = isTm ? "Create sign-up" : isTr ? "Create tournament" : isGame ? "Create game" : "Create opportunity";
        var inp = function(label,key,type) {
          var hasErr = !!formErrors[key];
          return (
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              <label style={{fontFamily:F.b,fontSize:11,color:hasErr?C.red:"#64748b"}}>{label}</label>
              <input type={type||"text"} min={type==="number"?"1":undefined} value={signupForm[key]} onChange={function(e){var v=e.target.value;setSignupForm(function(p){var n=Object.assign({},p);n[key]=v;return n;});if(hasErr)setFormErrors(function(p){var n=Object.assign({},p);delete n[key];return n;});}} style={{padding:"8px 12px",border:"1px solid "+(hasErr?C.red:"#e2e8f0"),borderRadius:6,fontFamily:F.b,fontSize:13,color:"#1e293b",outline:"none",background:"#fff",boxSizing:"border-box"}} />
              {hasErr && <div style={{fontFamily:F.b,fontSize:11,color:C.red}}>{formErrors[key]}</div>}
            </div>
          );
        };
        return (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={function(e){if(e.target===e.currentTarget){setShowSignupModal(false);setFormErrors({});}}}>
            <div style={{background:"#fff",borderRadius:12,width:"100%",maxWidth:520,padding:"28px 28px 24px",boxShadow:"0 8px 40px rgba(0,0,0,0.18)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
                <div style={{fontFamily:NS_FH,fontSize:18,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",borderLeft:"3px solid "+C.red,paddingLeft:12}}>{modalTitle}</div>
                <button onClick={function(){setShowSignupModal(false);setFormErrors({});}} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:18,lineHeight:1,padding:4}}>✕</button>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {inp("Name","name")}

                {(isTr||isVol||isGame) && inp("Location","location")}

                {(isTm||isTr) && (
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {inp("Start date","startDate","date")}
                    {inp("End date","endDate","date")}
                  </div>
                )}

                {isVol && inp("Date","startDate","date")}

                {isGame && (
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {inp("Date","startDate","date")}
                    {inp("Time (e.g. 7:30 PM)","time")}
                  </div>
                )}

                {isGame && (function(){
                  var hasErr = !!formErrors.homeAway;
                  return (
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      <label style={{fontFamily:F.b,fontSize:11,color:"#64748b"}}>Home or Away</label>
                      <select value={signupForm.homeAway} onChange={function(e){var v=e.target.value;setSignupForm(function(p){var n=Object.assign({},p);n.homeAway=v;return n;});}} style={{padding:"8px 12px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:13,color:"#1e293b",outline:"none",background:"#fff",boxSizing:"border-box",cursor:"pointer"}}>
                        <option value="home">Home</option>
                        <option value="away">Away</option>
                      </select>
                    </div>
                  );
                })()}

                {(isTm||isTr||isGame) && inp("Roster / team size","rosterSize","number")}
                {isVol && inp("Spots available","spotsAvailable","number")}

                {inp("Description (shown to players)","description")}
              </div>

              <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:24,paddingTop:16,borderTop:"1px solid #e2e8f0"}}>
                {actionBtn("Cancel",function(){setShowSignupModal(false);setFormErrors({});},"ghost")}
                {actionBtn(submitLabel,submitSignup)}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── NEWSLETTER PREVIEW MODAL ── */}
      {previewingNL && (
        <div onClick={function(){setPreviewingNL(null);}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:40,overflowY:"auto"}}>
          <div onClick={function(e){e.stopPropagation();}} style={{background:"#fff",borderRadius:12,width:"100%",maxWidth:680,margin:"0 16px 48px",boxShadow:"0 8px 40px rgba(0,0,0,0.22)",overflow:"hidden"}}>
            <div style={{background:C.navy,padding:"18px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontFamily:NS_FH,fontSize:14,fontWeight:700,color:"#fff",letterSpacing:2,textTransform:"uppercase"}}>Newsletter Preview</div>
              <button onClick={function(){setPreviewingNL(null);}} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.7)",fontSize:20,lineHeight:1,padding:4}}>✕</button>
            </div>
            {previewingNL.imageDataUrl && <img src={previewingNL.imageDataUrl} alt="" style={{width:"100%",maxHeight:280,objectFit:"cover",display:"block"}} />}
            <div style={{padding:"32px 36px"}}>
              {previewingNL.date && <div style={{fontFamily:F.b,fontSize:11,fontWeight:700,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>{previewingNL.date}</div>}
              {previewingNL.headline && <div style={{fontFamily:NS_FH,fontSize:30,fontWeight:700,color:C.navy,letterSpacing:1,lineHeight:1.15,marginBottom:20}}>{previewingNL.headline}</div>}
              {previewingNL.body ? (
                <div>
                  {previewingNL.body.split("\n\n").map(function(para,pi){
                    return <p key={pi} style={{fontFamily:F.b,fontSize:14,color:"#334155",lineHeight:1.7,marginTop:pi===0?0:16,marginBottom:0}}>{para.split("\n").reduce(function(acc,line,li){return li===0?[line]:acc.concat([<br key={li}/>],line);},[])}</p>;
                  })}
                </div>
              ) : (
                <div style={{fontFamily:F.b,fontSize:13,color:"#94a3b8",fontStyle:"italic"}}>No body text yet.</div>
              )}
            </div>
            <div style={{padding:"16px 36px 24px",borderTop:"1px solid #e2e8f0",display:"flex",justifyContent:"flex-end"}}>
              {actionBtn("Close",function(){setPreviewingNL(null);},"ghost")}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function NSPlayerPortal({nav, nsRole, coachIsAlsoPlayer, tier, programs, teamCount, adminTeams, adminTournaments, adminVolunteers, adminGames, currentMemberId}) {
  var role = nsRole;
  var currentMember = ADMIN_MEMBERS.find(function(m){return m.id===currentMemberId;}) || null;
  var DISPLAY_NAME = currentMember ? currentMember.name : "Player";
  var ALL_TEAMS = [
    {
      id:"c",
      label:"CAHL C League",
      tag:"East",
      nextGame:{dow:"Sunday",date:"Jun 7, 2026",time:"7:30 PM",opp:"Team A",loc:"Chiller North",home:true},
      record:{w:8,l:3,t:1,gp:12},
      myStats:currentMember&&currentMember.stats ? currentMember.stats : {gp:12,g:5,a:9,pts:14,pim:2},
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
        setBy:"Matt Chamblin",
        offense:[
          {lw:"Brent McCreedy",  c:"Taylor DeCicco", rw:"Player A"},
          {lw:"Marcus Webb",     c:"Jake Torres",    rw:"Chris Holt"},
          {lw:"Mike Tran",       c:"James Ortiz",    rw:"Kevin Shaw"},
        ],
        defense:[
          {ld:"Derek Neal",  rd:"Player D"},
          {ld:"Travis Ford", rd:"Aaron Liu"},
        ],
        goalie:"Sam Roper",
      },
    },
    {
      id:"d",
      label:"CAHL D League",
      tag:"West A",
      nextGame:{dow:"Saturday",date:"Jun 6, 2026",time:"9:15 PM",opp:"Team B",loc:"Chiller Easton",home:false},
      record:{w:5,l:5,t:2,gp:12},
      myStats:currentMember&&currentMember.stats ? currentMember.stats : {gp:10,g:3,a:5,pts:8,pim:2},
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
      lines:{
        set:true,
        setBy:"Player C",
        offense:[
          {lw:"Dom Russo",   c:"Player B",    rw:"Brian Fox"},
          {lw:"Ty Benson",   c:"Pete Ochoa",  rw:"Liam Grant"},
          {lw:"Noah Bauer",  c:"Chad Monroe", rw:null},
        ],
        defense:[
          {ld:"Matt Chamblin", rd:"Carlos Diaz"},
          {ld:"Ethan Hill",    rd:"Scott Lenz"},
        ],
        goalie:"Ryan Cole",
      },
    },
    {
      id:"gc",
      label:"Guardians Cup 2026",
      tag:"Tournament",
      nextGame:{dow:"Saturday",date:"Aug 15, 2026",time:"10:00 AM",opp:"Eagles",loc:"Nationwide Ice",home:false},
      record:{w:0,l:0,t:0,gp:0},
      myStats:currentMember&&currentMember.stats ? currentMember.stats : {gp:0,g:0,a:0,pts:0,pim:0},
      games:[
        {date:"Aug 17",time:"2:00 PM", loc:"Nationwide Ice",opp:"TBD (Final)",away:false,upcoming:true},
        {date:"Aug 16",time:"10:00 AM",loc:"Nationwide Ice",opp:"Storm",      away:false,upcoming:true},
        {date:"Aug 15",time:"10:00 AM",loc:"Nationwide Ice",opp:"Eagles",     away:false,upcoming:true},
      ],
      lines:{set:false},
    },
  ];
  var TODAY = (function(){var d=new Date();d.setHours(0,0,0,0);return d;})();
  var TEAMS = (function(){
    var result = [];
    (adminTeams||[]).filter(function(t){
      return t.status==="active"&&t.pid&&(t.tiers||[]).indexOf(tier)>=0&&(t.roster||[]).indexOf(currentMemberId)>=0;
    }).forEach(function(at){
      var match = ALL_TEAMS.find(function(pt){return pt.id===at.pid;});
      if (match && result.indexOf(match)<0) result.push(match);
    });
    (adminTournaments||[]).filter(function(t){
      return t.status==="active"&&t.pid&&(t.tiers||[]).indexOf(tier)>=0&&(t.roster||[]).indexOf(currentMemberId)>=0;
    }).forEach(function(at){
      var match = ALL_TEAMS.find(function(pt){return pt.id===at.pid;});
      if (match && result.indexOf(match)<0) result.push(match);
    });
    return result.sort(function(a,b){return new Date(a.nextGame.date)-new Date(b.nextGame.date);}).slice(0,teamCount);
  })();
  var MY_EVENTS = (adminVolunteers||[]).filter(function(v){
    if ((v.roster||[]).indexOf(currentMemberId)<0) return false;
    var evtDate = v.date ? new Date(v.date+"T00:00:00") : null;
    return evtDate && evtDate >= TODAY;
  }).map(function(v){return Object.assign({},v,{kind:"volunteer"});}).concat(
    (adminGames||[]).filter(function(g){
      if ((g.roster||[]).indexOf(currentMemberId)<0) return false;
      var gDate = g.date ? new Date(g.date+"T00:00:00") : null;
      return gDate && gDate >= TODAY;
    }).map(function(g){return Object.assign({},g,{kind:"game"});})
  ).sort(function(a,b){return new Date(a.date)-new Date(b.date);});
  var fmtDateRange = function(start,end) {
    var fmt = function(ds) { if(!ds)return""; var d=new Date(ds+"T00:00:00"); return d.toLocaleString("default",{month:"short",day:"numeric",year:"numeric"}); };
    return end && end!==start ? fmt(start)+" – "+fmt(end) : fmt(start);
  };
  var signedUpEventIds = new Set((adminVolunteers||[]).filter(function(v){return (v.roster||[]).indexOf(currentMemberId)>=0;}).map(function(v){return v.id;}));
  var ALL_PROGRAMS = (adminTeams||[]).filter(function(t){return t.status==="signup";}).map(function(t){
    return {label:t.name,type:"team",date:fmtDateRange(t.startDate,t.endDate),desc:t.description||"",tiers:t.tiers||[]};
  }).concat(
    (adminTournaments||[]).filter(function(t){return t.status==="signup";}).map(function(t){
      return {label:t.name,type:"tournament",date:fmtDateRange(t.startDate,t.endDate),location:t.location,desc:t.description||"",tiers:t.tiers||[]};
    })
  ).concat(
    (adminVolunteers||[]).filter(function(v){return v.status==="signup" && !signedUpEventIds.has(v.id);}).map(function(v){
      return {label:v.name,type:"volunteer",date:fmtDateRange(v.date,""),location:v.location,desc:v.description||"",tiers:v.tiers||[]};
    })
  );
  var AVAIL_PROGRAMS = programs === "no" ? [] : ALL_PROGRAMS.filter(function(p){ return p.tiers.indexOf(tier) >= 0; });
  var ORD = ["1st","2nd","3rd"];
  var nameCell = function(name) {
    var me = name === DISPLAY_NAME;
    return <span style={{fontFamily:F.b,fontSize:13,color:me?C.red:"#334155",fontWeight:me?700:400}}>{name}</span>;
  };
  var thStyle = function(align) { return {fontFamily:F.b,fontSize:10,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase",textAlign:align||"left"}; };
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
              {AVAIL_PROGRAMS.map(function(prog,i){
                var typeLabel = prog.type==="tournament" ? "Tournament" : prog.type==="volunteer" ? "Volunteer" : "Team";
                var typeBg = prog.type==="tournament" ? {color:"#1d4ed8",bg:"#dbeafe"} : prog.type==="volunteer" ? {color:"#92400e",bg:"#fef3c7"} : {color:"#16a34a",bg:"#dcfce7"};
                return (
                  <div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"20px 24px",display:"flex",flexDirection:"column",gap:10,minWidth:280,maxWidth:280,flexShrink:0}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
                      <div>
                        <div style={{fontFamily:NS_FH,fontSize:18,fontWeight:700,color:"#1e293b",letterSpacing:1}}>{prog.label}</div>
                        {prog.date && <div style={{fontFamily:F.b,fontSize:12,color:"#94a3b8",marginTop:2}}>{prog.date}</div>}
                        {prog.location && <div style={{fontFamily:F.b,fontSize:12,color:"#94a3b8"}}>{prog.location}</div>}
                      </div>
                      <div style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:typeBg.color,background:typeBg.bg,padding:"3px 10px",borderRadius:20,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap",flexShrink:0}}>{typeLabel}</div>
                    </div>
                    <div style={{fontFamily:F.b,fontSize:13,color:"#64748b"}}>{prog.desc}</div>
                    <div style={{marginTop:"auto"}}>
                      <button style={{width:"100%",padding:"9px 0",background:C.navy,color:"#fff",border:"none",borderRadius:6,fontFamily:F.b,fontSize:13,fontWeight:700,letterSpacing:1,cursor:"pointer"}}>Register</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* My Events */}
        {MY_EVENTS.length > 0 && (
          <div style={{marginBottom:40}}>
            <div style={{fontFamily:NS_FH,fontSize:22,fontWeight:700,color:"#1e293b",letterSpacing:2,textTransform:"uppercase",borderLeft:"3px solid "+C.red,paddingLeft:12,lineHeight:1,marginBottom:16}}>My Events</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {MY_EVENTS.map(function(ev,i){
                var evtDate = new Date(ev.date+"T00:00:00");
                var isToday = evtDate.toDateString()===TODAY.toDateString();
                var fmtEvt = function(ds){var d=new Date(ds+"T00:00:00");return d.toLocaleString("default",{weekday:"long",month:"long",day:"numeric",year:"numeric"});};
                var isGame = ev.kind==="game";
                return (
                  <div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,overflow:"hidden"}}>
                    <div style={{background:C.navy,padding:"12px 20px"}}>
                      <div style={{fontFamily:NS_FH,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:1}}>{ev.name}</div>
                    </div>
                    <div style={{padding:"14px 20px",display:"flex",alignItems:"center",gap:24,flexWrap:"wrap"}}>
                      <div style={{flex:1,minWidth:200}}>
                        <div style={{fontFamily:F.b,fontSize:13,fontWeight:600,color:"#1e293b",marginBottom:4}}>{fmtEvt(ev.date)}{isGame&&ev.time?" · "+ev.time:""}</div>
                        {isGame && <div style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{ev.home?"Home":"Away"}</div>}
                        {ev.location && <div style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{ev.location}</div>}
                        {!isGame && ev.description && <div style={{fontFamily:F.b,fontSize:12,color:"#64748b",marginTop:6}}>{ev.description}</div>}
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0}}>
                        {isGame
                          ? <div style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{ev.players}/{ev.rosterSize} rostered</div>
                          : <div style={{fontFamily:F.b,fontSize:12,color:"#64748b"}}>{ev.volunteers}/{ev.spotsAvailable} signed up</div>
                        }
                        <span style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:"#15803d",background:"#dcfce7",padding:"3px 10px",borderRadius:20,letterSpacing:1,textTransform:"uppercase"}}>{isGame?"Rostered":"Registered"}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                    <div style={{fontFamily:NS_FH,fontSize:12,fontWeight:600,color:"#fff",letterSpacing:2,textTransform:"uppercase"}}>Next Game</div>
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
    {/* footer rendered by CWHSite */}
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
      {/* footer rendered by CWHSite */}
    </div>
  );
}

/* ═══ APP ═══ */
export default function CWHSite() {
  var pg = useState("home"); var page = pg[0]; var setPage = pg[1];
  var au = useState(null); var user = au[0]; var setUser = au[1];
  var nav = function(p) { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); };
  var aboutPages = ["about","news","leadership","sponsors","become-sponsor","contributor"];
  var aboutItems = [{l:"About Us",p:"about"},{l:"News",p:"news"},{l:"Leadership",p:"leadership"},{l:"Sponsors",p:"sponsors"},{l:"Sponsor",p:"become-sponsor"},{l:"Contribute",p:"contributor"}];
  var isAbout = aboutPages.indexOf(page) >= 0;

  /* NS dev + auth + role state */
  var dm  = useState(false);   var devMode = dm[0];  var setDevMode = dm[1];
  var li  = useState(false);   var isLoggedIn = li[0]; var setIsLoggedIn = li[1];
  var ro  = useState("player"); var nsRole = ro[0];  var setNsRole = ro[1];
  var pv  = useState("player"); var portalView = pv[0]; var setPortalView = pv[1];
  var cip = useState(true);    var coachIsAlsoPlayer = cip[0]; var setCoachIsAlsoPlayer = cip[1];
  var tr  = useState("vet");   var tier = tr[0];    var setTier = tr[1];
  var pr  = useState("yes");   var programs = pr[0]; var setPrograms = pr[1];
  var tc  = useState(2);       var teamCount = tc[0]; var setTeamCount = tc[1];
  var at2 = useState(ADMIN_TEAMS_INIT);       var adminTeams = at2[0];       var setAdminTeams = at2[1];
  var atr = useState(ADMIN_TOURNAMENTS_INIT); var adminTournaments = atr[0]; var setAdminTournaments = atr[1];
  var avl = useState(ADMIN_VOLUNTEERS_INIT);  var adminVolunteers = avl[0];  var setAdminVolunteers = avl[1];
  var ag  = useState(ADMIN_GAMES_INIT);       var adminGames = ag[0];        var setAdminGames = ag[1];
  var nls = useState(INIT_NEWSLETTERS);       var newsletters = nls[0];      var setNewsletters = nls[1];
  var cai = useState(null); var currentArticleId = cai[0]; var setCurrentArticleId = cai[1];
  var navArticle = function(id) { setCurrentArticleId(id); nav("ns-article"); };

  var onSignIn  = function() { setIsLoggedIn(true);  nav("ns-portal"); };
  var onSignOut = function() { setIsLoggedIn(false); setDevMode(false); setPortalView("player"); setNsRole("player"); setPage("new-site"); window.scrollTo({top:0}); };

  /* roles the current user holds; drives "View as" dropdown */
  var availableViews = (function() {
    if (nsRole === "admin")  return [{v:"admin",l:"Admin"},{v:"coach",l:"Coach"},{v:"player",l:"Player"}];
    if (nsRole === "coach" && coachIsAlsoPlayer) return [{v:"coach",l:"Coach"},{v:"player",l:"Player"}];
    return [];
  })();

  var devSelect = function(label, value, setter, opts) {
    return (
      <label style={{display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontFamily:F.b,fontSize:11,color:"rgba(255,255,255,0.4)"}}>{label}</span>
        <select value={value} onChange={function(e){setter(e.target.value);}} style={{background:"rgba(167,139,250,0.12)",border:"1px solid rgba(167,139,250,0.3)",borderRadius:4,fontFamily:F.b,fontSize:11,color:"#a78bfa",padding:"3px 8px",cursor:"pointer",outline:"none"}}>
          {opts.map(function(o){return <option key={o.value} value={o.value} style={{background:"#1e1b4b",color:"#a78bfa"}}>{o.label}</option>;})}
        </select>
      </label>
    );
  };

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
    case "ice-schedules": content = <IceSchedulesPage />; break;
    case "team-dv": content = <TeamPage team="team-dv" />; break;
    case "team-c": content = <TeamPage team="team-c" />; break;
    case "team-d": content = <TeamPage team="team-d" />; break;
    case "mental-health": content = <ResourcePage page="mental-health" />; break;
    case "reg-guides": content = <ResourcePage page="reg-guides" />; break;
    case "players-corner": content = <ResourcePage page="players-corner" />; break;
    case "coaching": content = <ResourcePage page="coaching" />; break;
    case "lineup": content = <LineupPage />; break;
    case "leaderboard": content = <LeaderboardPage />; break;
    case "recaps": content = <RecapsPage />; break;
    case "gallery": content = <GalleryPage />; break;
    case "social-graphics": content = <SocialGraphicsPage />; break;
    case "login": content = <LoginPage nav={nav} setUser={setUser} />; break;
    case "new-site": content = <NewSitePage nav={nav} adminNewsletters={newsletters} navArticle={navArticle} />; break;
    case "ns-article":
      var artNL = newsletters.find(function(n){return n.id===currentArticleId;}) || null;
      content = <NSArticlePage nav={nav} article={artNL} />;
      break;
    case "ns-about": content = <NSAboutPage nav={nav} />; break;
    case "ns-leadership": content = <NSLeadershipPage nav={nav} />; break;
    case "ns-sponsors": content = <NSSponsorsPage nav={nav} />; break;
    case "ns-join": content = <NSJoinPage nav={nav} />; break;
    case "ns-portal":
      var currentMemberId = nsRole==="admin" ? 1 : nsRole==="coach" ? 7 : nsRole==="staff" ? 3 : tier==="disabled" ? 5 : tier==="volunteer" ? 30 : 4;
      if (portalView === "admin")  content = <NSAdminPortal nav={nav} adminTeams={adminTeams} setAdminTeams={setAdminTeams} adminTournaments={adminTournaments} setAdminTournaments={setAdminTournaments} adminVolunteers={adminVolunteers} setAdminVolunteers={setAdminVolunteers} adminGames={adminGames} setAdminGames={setAdminGames} newsletters={newsletters} setNewsletters={setNewsletters} />;
      else if (portalView === "coach") content = <NSCoachPortalContent showAllTeams={nsRole==="admin"} adminTeams={adminTeams} adminMembers={ADMIN_MEMBERS} currentMemberId={currentMemberId} />;
      else content = <NSPlayerPortal nav={nav} nsRole={nsRole} coachIsAlsoPlayer={coachIsAlsoPlayer} tier={tier} programs={programs} teamCount={teamCount} adminTeams={adminTeams} adminTournaments={adminTournaments} adminVolunteers={adminVolunteers} adminGames={adminGames} currentMemberId={currentMemberId} />;
      break;
    case "ns-admin":  content = <NSAdminPortal nav={nav} adminTeams={adminTeams} setAdminTeams={setAdminTeams} adminTournaments={adminTournaments} setAdminTournaments={setAdminTournaments} adminVolunteers={adminVolunteers} setAdminVolunteers={setAdminVolunteers} adminGames={adminGames} setAdminGames={setAdminGames} newsletters={newsletters} setNewsletters={setNewsletters} />; break;
    case "ns-profile": content = <NSProfilePage nav={nav} />; break;
    default: content = <HomePage nav={nav} />;
  }

  var isNewSite = page === "new-site" || page === "ns-about" || page === "ns-leadership" || page === "ns-sponsors" || page === "ns-join" || page === "ns-portal" || page === "ns-admin" || page === "ns-profile" || page === "ns-article";

  return (
    <div style={{background:C.w,minHeight:"100vh"}}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
      <GlobalStyles />
      {!isNewSite && <Navbar nav={nav} curPage={page} />}
      {!isNewSite && isAbout && (
        <div style={{paddingTop:110,background:C.olive,borderBottom:"2px solid "+C.red,overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          <div style={{display:"flex",gap:0,padding:"0 16px",minWidth:"max-content",maxWidth:1200,margin:"0 auto"}}>
            {aboutItems.map(function(it,i) {
              return <button key={i} onClick={function(){nav(it.p)}} style={{background:"none",border:"none",cursor:"pointer",padding:"12px 16px",fontFamily:F.h,fontSize:16,fontWeight:400,color:it.p===page?"#fff":"rgba(255,255,255,0.6)",borderBottom:it.p===page?"2px solid "+C.w:"2px solid transparent",textTransform:"uppercase",letterSpacing:2,whiteSpace:"nowrap"}}>{it.l}</button>;
            })}
          </div>
        </div>
      )}
      {isNewSite && (
        <NSHeader nav={nav} curPage={page} isLoggedIn={isLoggedIn} onSignIn={onSignIn} onSignOut={onSignOut} />
      )}
      {isNewSite && devMode && (
        <div style={{background:"#1e1b4b",padding:"8px 24px",display:"flex",alignItems:"center",gap:20,position:"sticky",top:64,zIndex:90,flexWrap:"wrap"}}>
          <span style={{fontFamily:F.b,fontSize:10,fontWeight:700,color:"#a78bfa",background:"rgba(167,139,250,0.15)",padding:"2px 8px",borderRadius:4,letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>Dev</span>
          {devSelect("Role:", nsRole, function(v){setNsRole(v);setPortalView(v);}, [
            {value:"player",label:"Player"},
            {value:"coach", label:"Coach"},
            {value:"admin", label:"Admin"},
          ])}
          {nsRole==="coach" && devSelect("Coach on team:", String(coachIsAlsoPlayer), function(v){setCoachIsAlsoPlayer(v==="true");}, [
            {value:"true", label:"Yes"},
            {value:"false",label:"No"},
          ])}
          {nsRole!=="admin" && devSelect("Player Tier:", tier, setTier, [
            {value:"vet",      label:"Veteran"},
            {value:"disabled", label:"Disabled"},
            {value:"volunteer",label:"Volunteer"},
          ])}
          {nsRole!=="admin" && devSelect("Programs:", programs, setPrograms, [
            {value:"yes",label:"Available"},
            {value:"no", label:"None"},
          ])}
          {portalView==="player" && devSelect("Teams:", String(teamCount), function(v){setTeamCount(Number(v));}, [
            {value:"0",label:"0 Teams"},
            {value:"1",label:"1 Team"},
            {value:"2",label:"2 Teams"},
            {value:"3",label:"3 Teams"},
          ])}
        </div>
      )}
      {isNewSite && page==="ns-portal" && (isLoggedIn||devMode) && availableViews.length > 0 && (
        <div style={{background:"#fff",borderBottom:"1px solid #e2e8f0",padding:"10px 24px",display:"flex",justifyContent:"flex-end",alignItems:"center",gap:10}}>
          <span style={{fontFamily:F.b,fontSize:12,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>View as</span>
          <select value={portalView} onChange={function(e){setPortalView(e.target.value);}} style={{padding:"5px 10px",border:"1px solid #e2e8f0",borderRadius:6,fontFamily:F.b,fontSize:12,fontWeight:600,color:"#1e293b",background:"#fff",cursor:"pointer",outline:"none"}}>
            {availableViews.map(function(item){return <option key={item.v} value={item.v}>{item.l}</option>;})}
          </select>
        </div>
      )}
      {content}
      {!isNewSite && <Footer />}
      {isNewSite && NS_FOOTER(nav, devMode, setDevMode)}
    </div>
  );
}
