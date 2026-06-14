#!/usr/bin/env python3
"""Add Social Media Graphics page to App.jsx"""

# Read the social graphics component
SOCIAL_COMPONENT = '''
/* ─── SOCIAL MEDIA GRAPHICS PAGE ─── */
function SocialGraphicsPage() {
  var sd = useState(null); var schedule = sd[0]; var setSchedule = sd[1];
  var rc = useState(null); var recaps = rc[0]; var setRecaps = rc[1];
  var lb = useState(null); var board = lb[0]; var setBoard = lb[1];
  useEffect(function() {
    fetch("/data/schedule.json").then(function(r){return r.json()}).then(setSchedule);
    fetch("/data/recaps.json").then(function(r){return r.json()}).then(setRecaps);
    fetch("/data/leaderboard.json").then(function(r){return r.json()}).then(setBoard);
  }, []);

  var upcoming = [];
  if (schedule) {
    schedule.games.forEach(function(g) {
      if (!g.score || !g.score.trim()) upcoming.push(g);
    });
    upcoming.sort(function(a, b) {
      var months = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
      var pa = a.date.split(" "); var pb = b.date.split(" ");
      var da = new Date(2026, months[pa[0]]||0, parseInt(pa[1])||1);
      var db = new Date(2026, months[pb[0]]||0, parseInt(pb[1])||1);
      return da - db;
    });
  }

  var completed = [];
  if (schedule) {
    schedule.games.forEach(function(g) {
      if (g.score && g.score.trim()) completed.push(g);
    });
    completed.reverse();
  }

  var nextGames = upcoming.slice(0, 4);
  var lastGames = completed.slice(0, 4);

  function GameDayCard() {
    return (
      <div id="gameday-graphic" style={{width:1080,height:1080,background:"linear-gradient(135deg, #00294D 0%, #1a3a5c 50%, #00294D 100%)",position:"relative",overflow:"hidden",fontFamily:"'Bebas Neue',sans-serif"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,opacity:0.05,backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 35px,rgba(255,255,255,0.1) 35px,rgba(255,255,255,0.1) 70px)"}} />
        <div style={{height:8,background:C.red}} />
        <div style={{padding:"40px 50px 20px",textAlign:"center",position:"relative"}}>
          <div style={{fontSize:24,color:"#c8a84e",letterSpacing:6,textTransform:"uppercase",marginBottom:8}}>Columbus Warrior Hockey</div>
          <div style={{fontSize:72,color:"#fff",letterSpacing:4,textTransform:"uppercase",lineHeight:1}}>GAME DAY</div>
          <div style={{width:80,height:4,background:C.red,margin:"16px auto 0"}} />
        </div>
        <div style={{padding:"20px 50px"}}>
          {nextGames.map(function(g, i) {
            var isHome = g.homeAway === "Home";
            return (
              <div key={i} style={{background:"rgba(255,255,255,0.08)",borderRadius:12,padding:"20px 28px",marginBottom:16,borderLeft:"4px solid "+(isHome?"#4ade80":C.red),display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:16,color:isHome?"#4ade80":C.red,letterSpacing:3,marginBottom:4}}>{isHome?"HOME":"AWAY"}</div>
                  <div style={{fontSize:36,color:"#fff",letterSpacing:2,lineHeight:1.1}}>VS {(g.opponent||"").toUpperCase()}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:28,color:"#fff",letterSpacing:2}}>{g.date}</div>
                  <div style={{fontSize:22,color:"rgba(255,255,255,0.6)",letterSpacing:1}}>{g.time}</div>
                  <div style={{fontSize:14,color:"rgba(255,255,255,0.4)",letterSpacing:1,fontFamily:"'Source Sans 3',sans-serif",marginTop:4}}>{g.location}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 50px 30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:14,color:"rgba(255,255,255,0.4)",letterSpacing:2,fontFamily:"'Source Sans 3',sans-serif"}}>columbuswarriorhockey.org</div>
          <div style={{fontSize:14,color:"rgba(255,255,255,0.4)",letterSpacing:2,fontFamily:"'Source Sans 3',sans-serif"}}>FROM THE RINK TO RESILIENCE</div>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:8,background:C.olive}} />
      </div>
    );
  }

  function GameRecapCard() {
    return (
      <div id="recap-graphic" style={{width:1080,height:1080,background:"linear-gradient(135deg, #00294D 0%, #0a1e33 50%, #00294D 100%)",position:"relative",overflow:"hidden",fontFamily:"'Bebas Neue',sans-serif"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,opacity:0.05,backgroundImage:"repeating-linear-gradient(-45deg,transparent,transparent 35px,rgba(255,255,255,0.1) 35px,rgba(255,255,255,0.1) 70px)"}} />
        <div style={{height:8,background:C.red}} />
        <div style={{padding:"40px 50px 20px",textAlign:"center",position:"relative"}}>
          <div style={{fontSize:24,color:"#c8a84e",letterSpacing:6,textTransform:"uppercase",marginBottom:8}}>Columbus Warrior Hockey</div>
          <div style={{fontSize:72,color:"#fff",letterSpacing:4,textTransform:"uppercase",lineHeight:1}}>GAME RECAP</div>
          <div style={{width:80,height:4,background:C.red,margin:"16px auto 0"}} />
        </div>
        <div style={{padding:"20px 50px"}}>
          {lastGames.map(function(g, i) {
            var won = g.result && g.result.toUpperCase() === "W";
            var parts = (g.score||"").split("-");
            var s1 = (parts[0]||"").trim();
            var s2 = (parts[1]||"").trim();
            return (
              <div key={i} style={{background:"rgba(255,255,255,0.08)",borderRadius:12,padding:"20px 28px",marginBottom:16,borderLeft:"4px solid "+(won?"#4ade80":"#ef4444"),display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:16,color:won?"#4ade80":"#ef4444",letterSpacing:3,marginBottom:4}}>{won?"VICTORY":"DEFEAT"}</div>
                  <div style={{fontSize:32,color:"#fff",letterSpacing:2,lineHeight:1.1}}>VS {(g.opponent||"").toUpperCase()}</div>
                  <div style={{fontSize:14,color:"rgba(255,255,255,0.4)",letterSpacing:1,fontFamily:"'Source Sans 3',sans-serif",marginTop:4}}>{g.date} &bull; {g.homeAway}</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:56,color:"#fff",letterSpacing:4,lineHeight:1}}>{s1} - {s2}</div>
                  <div style={{fontSize:20,color:won?"#4ade80":"#ef4444",letterSpacing:4,marginTop:4}}>{won?"W":"L"}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{padding:"0 50px 20px",textAlign:"center"}}>
          <div style={{background:"rgba(200,168,78,0.15)",border:"1px dashed #c8a84e",borderRadius:12,padding:"16px 24px",display:"inline-block"}}>
            <div style={{fontSize:18,color:"#c8a84e",letterSpacing:4}}>PLAYER OF THE GAME</div>
            <div style={{fontSize:14,color:"rgba(255,255,255,0.4)",letterSpacing:1,fontFamily:"'Source Sans 3',sans-serif",marginTop:4}}>Add player photo here</div>
          </div>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 50px 30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:14,color:"rgba(255,255,255,0.4)",letterSpacing:2,fontFamily:"'Source Sans 3',sans-serif"}}>columbuswarriorhockey.org</div>
          <div style={{fontSize:14,color:"rgba(255,255,255,0.4)",letterSpacing:2,fontFamily:"'Source Sans 3',sans-serif"}}>FROM THE RINK TO RESILIENCE</div>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:8,background:C.olive}} />
      </div>
    );
  }

  function PlayerOfWeekCard() {
    if (!board || !board.playerOfTheWeek) return null;
    var p = board.playerOfTheWeek;
    return (
      <div style={{width:1080,height:1080,background:"linear-gradient(135deg, #525441 0%, #3d3f30 50%, #525441 100%)",position:"relative",overflow:"hidden",fontFamily:"'Bebas Neue',sans-serif"}}>
        <div style={{height:8,background:C.red}} />
        <div style={{padding:"60px 50px",textAlign:"center",position:"relative"}}>
          <div style={{fontSize:24,color:"#c8a84e",letterSpacing:6,textTransform:"uppercase",marginBottom:16}}>Columbus Warrior Hockey</div>
          <div style={{fontSize:64,color:"#fff",letterSpacing:4,textTransform:"uppercase",lineHeight:1}}>PLAYER OF</div>
          <div style={{fontSize:64,color:"#c8a84e",letterSpacing:4,textTransform:"uppercase",lineHeight:1,marginBottom:24}}>THE WEEK</div>
          <div style={{width:80,height:4,background:C.red,margin:"0 auto 40px"}} />
          <div style={{width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,0.1)",border:"4px solid #c8a84e",margin:"0 auto 24px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontSize:72,color:"#fff"}}>#{p.jersey||"?"}</div>
          </div>
          <div style={{fontSize:52,color:"#fff",letterSpacing:3,marginBottom:8}}>{(p.name||"").toUpperCase()}</div>
          <div style={{fontSize:24,color:"rgba(255,255,255,0.6)",letterSpacing:4,marginBottom:24}}>{p.team}</div>
          <div style={{display:"flex",justifyContent:"center",gap:40}}>
            <div><div style={{fontSize:48,color:"#c8a84e"}}>{p.g||0}</div><div style={{fontSize:16,color:"rgba(255,255,255,0.4)",letterSpacing:3}}>GOALS</div></div>
            <div><div style={{fontSize:48,color:"#c8a84e"}}>{p.a||0}</div><div style={{fontSize:16,color:"rgba(255,255,255,0.4)",letterSpacing:3}}>ASSISTS</div></div>
            <div><div style={{fontSize:48,color:"#c8a84e"}}>{p.pts||0}</div><div style={{fontSize:16,color:"rgba(255,255,255,0.4)",letterSpacing:3}}>POINTS</div></div>
          </div>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:8,background:C.navy}} />
      </div>
    );
  }

  return <PageWrap title="Social Media Graphics" sub="Auto-generated graphics for social media posts. Right-click and save, or screenshot.">
    <div style={{background:"#fef3c7",border:"1px solid #f59e0b",borderRadius:8,padding:"12px 16px",marginBottom:24}}>
      <p style={{fontFamily:F.b,fontSize:13,color:"#92400e",margin:0}}>These graphics update automatically from live schedule and stats data. Right-click the graphic and "Save Image As" or screenshot for social media. Graphics are sized 1080x1080 for Instagram.</p>
    </div>

    <h2 style={{fontFamily:F.h,fontSize:24,color:C.navy,letterSpacing:2,margin:"0 0 16px"}}>Game Day Post (Thursdays)</h2>
    <p style={{fontFamily:F.b,fontSize:13,color:C.g4,marginBottom:12}}>Shows next upcoming games across both teams. Post every Thursday to hype the weekend.</p>
    <div style={{overflowX:"auto",marginBottom:40,border:"1px solid "+C.g2,display:"inline-block"}}>
      {nextGames.length > 0 ? <GameDayCard /> : <p style={{fontFamily:F.b,color:C.g4,padding:20}}>No upcoming games found</p>}
    </div>

    <h2 style={{fontFamily:F.h,fontSize:24,color:C.navy,letterSpacing:2,margin:"0 0 16px"}}>Game Recap Post (Tuesdays)</h2>
    <p style={{fontFamily:F.b,fontSize:13,color:C.g4,marginBottom:12}}>Shows last completed games with scores. Post every Tuesday with results.</p>
    <div style={{overflowX:"auto",marginBottom:40,border:"1px solid "+C.g2,display:"inline-block"}}>
      {lastGames.length > 0 ? <GameRecapCard /> : <p style={{fontFamily:F.b,color:C.g4,padding:20}}>No completed games found</p>}
    </div>

    <h2 style={{fontFamily:F.h,fontSize:24,color:C.navy,letterSpacing:2,margin:"0 0 16px"}}>Player of the Week</h2>
    <p style={{fontFamily:F.b,fontSize:13,color:C.g4,marginBottom:12}}>Auto-generated from season stats leader. Post weekly.</p>
    <div style={{overflowX:"auto",marginBottom:40,border:"1px solid "+C.g2,display:"inline-block"}}>
      <PlayerOfWeekCard />
    </div>
  </PageWrap>;
}

'''

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Add nav item under Resources
content = content.replace(
    '{l:"Coaching for CWH",p:"coaching"}]},',
    '{l:"Coaching for CWH",p:"coaching"},{l:"Social Media Graphics",p:"social-graphics"}]},'
)

# 2. Insert component before export default
content = content.replace(
    'export default function CWHSite() {',
    SOCIAL_COMPONENT + '\nexport default function CWHSite() {'
)

# 3. Add route
content = content.replace(
    'case "coaching": content = <ResourcePage page="coaching" />; break;',
    'case "coaching": content = <ResourcePage page="coaching" />; break;\n    case "social-graphics": content = <SocialGraphicsPage />; break;'
)

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Done - Social Graphics page added")
