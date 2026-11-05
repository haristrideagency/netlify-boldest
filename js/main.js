(function(){
"use strict";
const RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const state={prefill:null,pendingScroll:null,firstLoad:true};
const IMG={"bn_care": "assets/img/bn_care.webp", "bn_commerce": "assets/img/bn_commerce.webp", "bn_creative": "assets/img/bn_creative.webp", "hero": "assets/img/hero.webp", "home_about": "assets/img/home_about.webp", "home_faq": "assets/img/home_faq.webp", "lib_about": "assets/img/lib_about.webp", "lib_ca_coll_p": "assets/img/lib_ca_coll_p.webp", "lib_ca_coll_t": "assets/img/lib_ca_coll_t.webp", "lib_ca_contact_p": "assets/img/lib_ca_contact_p.webp", "lib_ca_contact_t": "assets/img/lib_ca_contact_t.webp", "lib_ca_loyalty_p": "assets/img/lib_ca_loyalty_p.webp", "lib_ca_loyalty_t": "assets/img/lib_ca_loyalty_t.webp", "lib_ca_rep_p": "assets/img/lib_ca_rep_p.webp", "lib_ca_rep_t": "assets/img/lib_ca_rep_t.webp", "lib_contact": "assets/img/lib_contact.webp", "lib_cr_ai_p": "assets/img/lib_cr_ai_p.webp", "lib_cr_ai_t": "assets/img/lib_cr_ai_t.webp", "lib_cr_beh_p": "assets/img/lib_cr_beh_p.webp", "lib_cr_beh_t": "assets/img/lib_cr_beh_t.webp", "lib_cr_data_p": "assets/img/lib_cr_data_p.webp", "lib_cr_data_t": "assets/img/lib_cr_data_t.webp", "lib_cr_uxui_p": "assets/img/lib_cr_uxui_p.webp", "lib_cr_uxui_t": "assets/img/lib_cr_uxui_t.webp", "lib_film_pathbreaker": "assets/img/lib_film_pathbreaker.webp", "lib_film_pathfinder": "assets/img/lib_film_pathfinder.webp", "lib_film_pathway": "assets/img/lib_film_pathway.webp", "lib_film_pathwise": "assets/img/lib_film_pathwise.webp", "lib_ind_b2b": "assets/img/lib_ind_b2b.webp", "lib_ind_banking": "assets/img/lib_ind_banking.webp", "lib_ind_retail": "assets/img/lib_ind_retail.webp", "lib_ind_telecom": "assets/img/lib_ind_telecom.webp", "lib_ind_travel": "assets/img/lib_ind_travel.webp", "lib_pathbreaker": "assets/img/lib_pathbreaker.webp", "lib_pathfinder": "assets/img/lib_pathfinder.webp", "lib_pathway": "assets/img/lib_pathway.webp", "lib_pathwise": "assets/img/lib_pathwise.webp", "lib_privacy": "assets/img/lib_privacy.webp", "lib_products": "assets/img/lib_products.webp", "lib_sol_advisory": "assets/img/lib_sol_advisory.webp", "lib_sol_agentic": "assets/img/lib_sol_agentic.webp", "lib_sol_experiences": "assets/img/lib_sol_experiences.webp", "lib_solutions": "assets/img/lib_solutions.webp", "lib_specialisms": "assets/img/lib_specialisms.webp", "lib_usecases": "assets/img/lib_usecases.webp", "logotag_white": "assets/img/logotag_white.png", "macaweye": "assets/img/macaweye.webp", "magenta": "assets/img/magenta.webp", "nv_banner": "assets/img/nv_banner.webp", "nv_gold": "assets/img/nv_gold.webp", "nv_pink": "assets/img/nv_pink.webp", "nv_purple": "assets/img/nv_purple.webp", "nv_red": "assets/img/nv_red.webp", "ps_nugget": "assets/img/ps_nugget.webp", "pt_banner": "assets/img/pt_banner.webp", "reddahlia": "assets/img/reddahlia.webp", "redfan": "assets/img/redfan.webp", "redfeathers2": "assets/img/redfeathers2.webp", "tm_anthony": "assets/img/tm_anthony.webp", "tm_dilip": "assets/img/tm_dilip.webp", "tm_gamal": "assets/img/tm_gamal.webp", "tm_gopi": "assets/img/tm_gopi.webp", "tm_keith": "assets/img/tm_keith.webp", "tm_omar": "assets/img/tm_omar.webp", "tm_pradeep": "assets/img/tm_pradeep.webp", "tm_rahul": "assets/img/tm_rahul.webp", "tm_ramy": "assets/img/tm_ramy.webp", "tm_scott": "assets/img/tm_scott.webp", "tm_sydney": "assets/img/tm_sydney.webp"};for(const k in IMG)IMG[k]=new URL(IMG[k],document.baseURI).href;
const PLUS='<svg aria-hidden="true"><use href="#i-plus"/></svg>';
document.querySelectorAll('img[data-img]').forEach(i=>{i.src=IMG[i.dataset.img]});
function rng(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s>>>=0;s^=s>>17;s^=s<<5;s>>>=0;return s/4294967296}}

/* ---------- Data ---------- */
const ARTICLES=[
 {date:'2026-10-01',label:'Oct 1, 2026',title:'Beyond the SaaS Ceiling: A C-Suite Guide to Scaling Beyond Shopify Plus',excerpt:'For ambitious brands, monolithic SaaS eventually becomes a growth ceiling. A strategic framework for what comes next.',url:'#beyond-shopify-plus',img:'nv_gold',topic:'Commerce'},
 {date:'2026-09-24',label:'Sep 24, 2026',title:'5 Signs You\u2019ve Outgrown Your SaaS Platform: A Guide to B2B Commerce Modernization',excerpt:'Hitting the operational ceiling of a SaaS commerce platform is a common growth challenge for scaling B2B businesses.',url:'#b2b-commerce-modernization',img:'nv_pink',topic:'B2B commerce'},
 {date:'2026-03-09',label:'Mar 9, 2026',title:'The END of PLPs',excerpt:'For two decades, the product listing page has been the engine of online retail. Here\u2019s why that is changing.',url:'#the-end-of-plps',img:'nv_red',topic:'Experience'},
 {date:'2026-02-05',label:'Feb 5, 2026',title:'The Creative Supply Chain is Broken',excerpt:'A silent crisis in how creative gets made, and why PathBreaker is the infrastructure that fixes it.',url:'#the-creative-supply-chain-is-broken',img:'nv_purple',topic:'Creative'}
];
const LOGO={Metarouter:'metarouter',Hightouch:'hightouch','360Learning':'360learning',Shopware:'shopware',MoEngage:'moengage',Nugget:'nugget'};
const PNAME=(p,cls,st)=>LOGO[p.name]?'<'+(cls==='slide-name'?'p':'h2')+' class="'+cls+'"'+st+'><span class="plogo lg-'+LOGO[p.name]+'" role="img" aria-label="'+p.name+'"></span></'+(cls==='slide-name'?'p':'h2')+'>':'<'+(cls==='slide-name'?'p':'h2')+' class="'+cls+'"'+st+'>'+p.name+'</'+(cls==='slide-name'?'p':'h2')+'>';
const PARTNERS=[
 {name:'Metarouter',kind:'Server-side customer data infrastructure',site:'metarouter.io',img:'redfeathers2',lead:'A unified server-side data pipeline that replaces heavy client-side tags: faster sites, cleaner data and stronger privacy controls.',body:'It removes third-party JavaScript, strengthens GDPR and CCPA compliance and delivers consistent, unblocked data.',stats:[['127%','better desktop Lighthouse scores'],['250ms','latency saved per tag removed'],['GDPR / CCPA','enhanced compliance']]},
 {name:'Hightouch',kind:'Composable CDP',site:'hightouch.com',img:'magenta',lead:'Turns the data warehouse into a real-time activation engine, without maintaining a monolithic CDP.',body:'Identity resolution, audience building and omnichannel activation layered on the warehouse you already have. Event volume grew 10\u00d7 in a year.',stats:[['20B+','monthly syncs'],['300+','enterprise customers'],['1 trillion','events across pipelines'],['35\u201368%','higher ad match rates']]},
 {name:'360Learning',kind:'LXP and LMS platform',site:'360learning.com',img:'reddahlia',lead:'Serves Michelin, Heineken, ArcelorMittal and JBS USA, who consolidated 10 LMSs onto one platform.',body:'Rated #1 AI LMS by eLearning Industry, it integrates with Workday, SAP, UKG, Salesforce, Microsoft, Slack and BOLDEST\u2019s own AI products.',stats:[['2,700','organizations'],['20 million','learners globally'],['80+','integrations'],['10','LMSs consolidated']]},
 {name:'Shopware',kind:'Open-source, API-first ecommerce',site:'shopware.com',img:'hero',lead:'A European ecommerce powerhouse growing in the US, trusted by AIDA Cruises, Viking, MissPompadour, MEGABAD and REIFF.',body:'AI-powered merchant tools, enterprise B2B features and fast deployments. Shopware is integrated with BOLDEST\u2019s PathSuite.',stats:[['115','of Germany\u2019s top 1,000 shops'],['41%','PayPal\u2019s stake'],['~2 weeks','B2C deployments'],['6\u20138 weeks','B2B deployments']]},
 {name:'MoEngage',kind:'AI-driven customer engagement',site:'moengage.com',img:'redfan',lead:'One of the world\u2019s most powerful AI-driven engagement platforms, reaching over a billion consumers every month.',body:'AI decisioning, multi-channel journey orchestration and deep analytics, ranked a Leader on Gartner Peer Insights.',stats:[['1,500+','global brands'],['4.7 / 5','Gartner Peer Insights'],['50\u201360%','faster campaign go-live'],['20\u201330%','more conversions']]}
,
 {name:'Nugget',kind:'AI-native customer support, by Zomato',site:'',img:'ps_nugget',lead:'An AI-native, no-code customer support platform from Zomato Labs, built over three years for Zomato, Blinkit and Hyperpure and now open to businesses worldwide.',body:'Conversational and voice AI agents, automated quality audits and AI analytics. A natural fit for BOLDEST Care: contact solutions and collections.',stats:[['15M+','support interactions a month'],['Up to 80%','of queries resolved autonomously'],['20%','faster resolution time'],['No-code','no dev team needed']]}];
const AREAS=['Creative','CRM','Loyalty','MarTech','Commerce','Mixed reality','Payments','Supply chain','Personalization','DSP / SSP','PIM / DAM','Workforce experience','Content and ad production','SEO / AEO / GEO','AR / VR','Live commerce'];

/* ---------- News ---------- */
function meta(a){return '<div class="meta"><span>Article</span><span>'+a.topic+'</span></div>'}
function ncard(a,cls){return '<a class="ncard '+cls+'" href="'+a.url+'"><div class="txt"><span class="mono">Views</span><h3>'+a.title+'</h3>'+(cls==='big'?'<p class="muted" style="font-size:.92rem">'+a.excerpt+'</p>':'')+meta(a)+'</div><div class="photo"><img src="'+IMG[a.img]+'" alt=""></div></a>'}
$('#home-news').innerHTML=ncard(ARTICLES[0],'big')+'<div class="news-side">'+ncard(ARTICLES[1],'sm')+ncard(ARTICLES[2],'sm')+'</div>';
function renderViews(q){q=(q||'').trim().toLowerCase();const l=ARTICLES.filter(a=>!q||(a.title+' '+a.excerpt).toLowerCase().includes(q));
 $('#all-articles').innerHTML=l.map(a=>ncard(a,'sm')).join('');$('#views-empty').hidden=l.length>0;
 $('#result-count').textContent=q?(l.length+(l.length===1?' article':' articles')+' found'):ARTICLES.length+' articles'}
renderViews('');
$('#view-search').addEventListener('input',e=>renderViews(e.target.value));
$('#clear-search').addEventListener('click',()=>{const s=$('#view-search');s.value='';renderViews('');s.focus()});

/* ---------- Partners ---------- */
const statsHTML=p=>'<div class="slide-stats">'+p.stats.map(s=>'<div><strong>'+s[0]+'</strong><span>'+s[1]+'</span></div>').join('')+'</div>';
$('#plist').innerHTML=PARTNERS.map((p,i)=>'<article class="cardx prow rv"><div><span class="mono">'+String(i+1).padStart(2,'0')+' / Partner</span>'+PNAME(p,'pname','')+'<p class="kind">'+p.kind+'</p>'+(p.site?'<a class="lplus" href="https://'+p.site+'" target="_blank" rel="noopener">'+p.site+' <svg aria-hidden="true"><use href="#i-arrow"/></svg></a>':'')+'</div><div><p class="plead">'+p.lead+'</p><p class="pbody">'+p.body+'</p>'+statsHTML(p)+'</div></article>').join('');
(function(){let i=0;const copy=$('#ps-copy'),img=$('#ps-img'),cnt=$('#ps-count');if(!copy)return;
 function show(n,anim){i=(n+PARTNERS.length)%PARTNERS.length;const p=PARTNERS[i];
  copy.innerHTML='<span class="mono">'+p.kind+'</span>'+PNAME(p,'slide-name','')+'<p class="slide-lead">'+p.lead+'</p>'+(p.site?'<a class="lplus" style="align-self:flex-start;margin-bottom:28px" href="https://'+p.site+'" target="_blank" rel="noopener">'+p.site+' <svg aria-hidden="true"><use href="#i-arrow"/></svg></a>':'<span style="margin-bottom:28px"></span>')+statsHTML(p);
  img.src=IMG[p.img];cnt.textContent=String(i+1).padStart(2,'0')+' / '+String(PARTNERS.length).padStart(2,'0');
  if(anim&&!RM){[copy,img].forEach(el=>{el.classList.remove('fade-swap');void el.offsetWidth;el.classList.add('fade-swap')})}}
 $('#ps-prev').addEventListener('click',()=>show(i-1,true));$('#ps-next').addEventListener('click',()=>show(i+1,true));
 $('#pslider').addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(i-1,true);if(e.key==='ArrowRight')show(i+1,true)});
 show(0,false)})();

/* ---------- Gauge ---------- */
(function(){const g=$('#gauge');if(!g)return;const cx=220,cy=215,N=41,T=52,num=$('#gauge-num');let h='';
 for(let k=0;k<N;k++){const a=Math.PI*(1-k/(N-1)),L=k%5===0?20:12,r1=178,r2=r1-L;
  h+='<line class="gt" x1="'+(cx+Math.cos(a)*r1).toFixed(1)+'" y1="'+(cy-Math.sin(a)*r1).toFixed(1)+'" x2="'+(cx+Math.cos(a)*r2).toFixed(1)+'" y2="'+(cy-Math.sin(a)*r2).toFixed(1)+'" stroke-opacity="'+(k%5===0?.85:.4)+'" stroke-width="'+(k%5===0?2.4:1.6)+'" stroke-linecap="round"/>'}
 h+='<g id="pf-needle"><line x1="'+cx+'" y1="'+cy+'" x2="'+cx+'" y2="'+(cy-152)+'" stroke="#E76F7B" stroke-width="2.4" stroke-linecap="round"/><path d="M'+(cx-7)+' '+(cy-146)+' L'+cx+' '+(cy-160)+' L'+(cx+7)+' '+(cy-146)+'" fill="none" stroke="#E76F7B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g>';
 g.innerHTML=h;g.style.color='var(--text)';
 const needle=$('#pf-needle'),ticks=$$('.gt',g);let raf=0;
 function set(d,val){needle.setAttribute('transform','rotate('+d.toFixed(2)+' '+cx+' '+cy+')');ticks.forEach((t,k)=>t.classList.toggle('lit',-90+180*k/(N-1)<=d+.5));if(val!=null)num.textContent=val}
 const back=p=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(p-1,3)+c1*Math.pow(p-1,2)};
 function stop(){cancelAnimationFrame(raf);raf=0}
 function idle(){const t0=performance.now();(function f(t){const s=(t-t0)/1000;set(T+Math.sin(s*1.3)*3.2+Math.sin(s*3.1)*1.1);raf=requestAnimationFrame(f)})(t0)}
 function play(){stop();if(RM){set(T,15);return}const t0=performance.now(),D=2200;
  (function f(t){const p=Math.min(1,(t-t0)/D);set(-90+(T+90)*back(p),Math.round(15*Math.min(1,p*1.15)));if(p<1)raf=requestAnimationFrame(f);else idle()})(t0)}
 set(-90,0);
 if('IntersectionObserver' in window){new IntersectionObserver(es=>{const e=es[0];if(e.isIntersecting&&g.closest('.page').classList.contains('active'))play();else{stop();if(!RM)set(-90,0)}},{threshold:.35}).observe(g)}else play();
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});})();




function initPF2(root){
 if(!root||root.dataset.ready)return;root.dataset.ready=1;
 const RMq=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const q=(s,r)=>Array.from((r||root).querySelectorAll(s)),one=s=>root.querySelector(s);
 const NS='http://www.w3.org/2000/svg',svg=one('.pf2-wires'),eng=one('.pf2-engine'),feed=one('.pf2-feedlist'),intentEl=one('.pf2-intent'),act=one('.pf2-action'),cap=one('.pf2-cap'),btn=one('.pf2-play');
 const CH={web:'Website',app:'Mobile app',call:'Call center',store:'Store',ads:'Advertising',mail:'Email'};
 const SC=[
  {name:'Retail',sig:[['web','Views the same running shoes three times'],['ads','Clicks a sale ad on social'],['store','Visits a store, leaves without buying']],intent:'Ready to buy, price-sensitive',out:['intent','decision','conv'],action:'PathWay opens a guided conversation with the right offer.'},
  {name:'Telecom',sig:[['app','Checks data usage every day this week'],['call','Calls about billing twice'],['mail','Ignores the renewal email']],intent:'At risk of leaving',out:['needs','insight','decision'],action:'The retention team gets a prioritised insight to act on today.'},
  {name:'Service',sig:[['mail','Emails about a delayed order'],['web','Searches the help center'],['call','Starts a call to support']],intent:'Needs help now',out:['view','insight','conv'],action:'Agents see one connected view and resolve it in a single conversation.'}];
 const STEPS=['Bringing the signals together','Finding the pattern across touchpoints','Interpreting intent','Surfacing the insight','Orchestrating the right agents','Activating the experience'];
 let paths={},paused=false,cur=0,run=0,manual=false;
 const scenWrap=one('.pf2-scen');
 scenWrap.innerHTML=SC.map((s,i)=>'<button type="button" aria-pressed="'+(i===0)+'">'+s.name+'</button>').join('');
 const scenBtns=q('.pf2-scen button');
 function rel(el){const r=el.getBoundingClientRect(),R=root.getBoundingClientRect();return{x:r.left-R.left,y:r.top-R.top,w:r.width,h:r.height}}
 function layout(){svg.innerHTML='';paths={};const e=rel(eng),stacked=rel(q('[data-sig]')[0]).y+20<e.y&&rel(q('[data-sig]')[0]).x+rel(q('[data-sig]')[0]).w>e.x;
  const mk=(d,key)=>{const p=document.createElementNS(NS,'path');p.setAttribute('d',d);svg.appendChild(p);paths[key]=p};
  q('[data-sig]').forEach((n,i,a)=>{const b=rel(n);let d;
   if(stacked){const sx=b.x+b.w/2,sy=b.y+b.h,tx=e.x+e.w*(.2+.6*i/(a.length-1)),ty=e.y;d=`M${sx},${sy} C${sx},${sy+30} ${tx},${ty-30} ${tx},${ty}`}
   else{const sx=b.x+b.w,sy=b.y+b.h/2,tx=e.x,ty=e.y+e.h*(.3+.4*i/(a.length-1));const m=(sx+tx)/2;d=`M${sx},${sy} C${m},${sy} ${m},${ty} ${tx},${ty}`}
   mk(d,'s-'+n.dataset.sig)});
  q('[data-out]').forEach((n,i,a)=>{const b=rel(n);let d;
   if(stacked){const tx=b.x+b.w/2,ty=b.y,sx=e.x+e.w*(.2+.6*i/(a.length-1)),sy=e.y+e.h;d=`M${sx},${sy} C${sx},${sy+30} ${tx},${ty-30} ${tx},${ty}`}
   else{const tx=b.x,ty=b.y+b.h/2,sx=e.x+e.w,sy=e.y+e.h*(.3+.4*i/(a.length-1));const m=(sx+tx)/2;d=`M${sx},${sy} C${m},${sy} ${m},${ty} ${tx},${ty}`}
   mk(d,'o-'+n.dataset.out)})}
 function wait(ms,id){return new Promise(res=>{let left=ms,last=performance.now();(function f(t){if(id!==run)return res(false);if(!paused)left-=t-last;last=t;if(left<=0)return res(true);requestAnimationFrame(f)})(last)})}
 function travel(key,ok,id){const p=paths[key];if(!p)return wait(10,id);p.classList.add('hot');ok&&p.classList.add('ok');const c=document.createElementNS(NS,'circle');c.setAttribute('r',5);ok&&c.setAttribute('class','ok');svg.appendChild(c);const L=p.getTotalLength(),D=800;let el=0,last=performance.now();
  return new Promise(res=>{(function f(t){if(id!==run){c.remove();return res(false)}if(!paused)el+=t-last;last=t;const k=Math.min(1,el/D),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,pt=p.getPointAtLength(L*e);c.setAttribute('cx',pt.x);c.setAttribute('cy',pt.y);if(k<1)requestAnimationFrame(f);else{c.remove();setTimeout(()=>p.classList.remove('hot','ok'),500);res(true)}})(last)})}
 function stage(i){q('.pf2-stages span').forEach(s=>s.classList.toggle('on',+s.dataset.st===i))}
 function reset(){q('.pf2-node,.pf2-mod').forEach(n=>n.classList.remove('on','done'));feed.innerHTML='';intentEl.textContent='Waiting for signals';intentEl.classList.remove('on');act.textContent='';stage(-1)}
 function addFeed(ch,t){feed.insertAdjacentHTML('beforeend','<li><b>'+CH[ch]+'</b>'+t+'</li>')}
 function staticState(s){reset();s.sig.forEach(([c,t])=>{one('[data-sig="'+c+'"]').classList.add('on');addFeed(c,t)});q('.pf2-mod').forEach(m=>m.classList.add('done'));intentEl.textContent=s.intent;intentEl.classList.add('on');s.out.forEach(o=>one('[data-out="'+o+'"]').classList.add('on'));act.textContent=s.action;stage(2);cap.textContent=s.name+': '+s.sig.length+' signals in, intent "'+s.intent+'", '+s.action}
 async function play(i){const id=++run;cur=i;scenBtns.forEach((b,k)=>b.setAttribute('aria-pressed',k===i));const s=SC[i];
  if(RMq){staticState(s);return}
  reset();await wait(400,id);
  stage(0);cap.textContent='1 \u00b7 Signals arrive from connected channels';
  for(const [c,t] of s.sig){const n=one('[data-sig="'+c+'"]');n.classList.add('on');if(!await travel('s-'+c,false,id))return;addFeed(c,t);if(!await wait(250,id))return}
  stage(1);
  const mods=q('.pf2-mod');
  for(let k=0;k<mods.length;k++){mods.forEach((m,j)=>{m.classList.toggle('on',j===k);if(j<k)m.classList.add('done')});cap.textContent='2 \u00b7 PathFinder: '+STEPS[k].toLowerCase();
   if(k===2){intentEl.textContent=s.intent;intentEl.classList.add('on')}if(!await wait(750,id))return}
  mods.forEach(m=>{m.classList.remove('on');m.classList.add('done')});
  stage(2);cap.textContent='3 \u00b7 Outcomes your teams can act on';
  await Promise.all(s.out.map((o,k)=>wait(k*180,id).then(ok=>ok&&travel('o-'+o,true,id).then(ok2=>{if(ok2)one('[data-out="'+o+'"]').classList.add('on')}))));
  if(id!==run)return;act.textContent=s.action;cap.textContent=s.name+' journey: '+s.action;
  if(!await wait(3200,id))return;if(!manual)play((i+1)%SC.length);else{manual=false;play((i+1)%SC.length)}}
 scenBtns.forEach((b,k)=>b.addEventListener('click',()=>{if(paused)setPause(false);play(k)}));
 function setPause(p){paused=p;btn.innerHTML=p?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg><span>Play</span>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor"/></svg><span>Pause</span>';btn.setAttribute('aria-label',p?'Play animation':'Pause animation')}
 btn.addEventListener('click',()=>setPause(!paused));
 if(RMq){btn.style.display='none'}
 let started=false;
 const go=()=>{layout();if(!started){started=true;play(0)}};
 if('IntersectionObserver' in window){new IntersectionObserver(es=>{const v=es[0].isIntersecting;if(v&&root.offsetParent){go();if(!userPaused)setPause(false)}else if(started&&!userPaused)setPause(true)},{threshold:.25}).observe(root)}else go();
 let userPaused=false;btn.addEventListener('click',()=>{userPaused=paused});
 let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(root.offsetParent)layout()},150)});
 root.__relayout=()=>{if(root.offsetParent)layout()};
}


/* ---------- Quick email form (classic home) ---------- */
(function(){const f=$('#quick-form');if(!f)return;const i=$('#quick-email'),e=$('#quick-err');
 f.addEventListener('submit',ev=>{ev.preventDefault();const v=i.value.trim();
  if(!v||!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){e.textContent=v?'Use an address like name@company.com.':'Enter your work email to continue.';i.setAttribute('aria-invalid','true');i.focus();return}
  e.textContent='';i.removeAttribute('aria-invalid');state.prefill={email:v,focus:true};navigate('contact')});
 i.addEventListener('input',()=>{if(i.getAttribute('aria-invalid')){i.removeAttribute('aria-invalid');e.textContent=''}})})();

/* ---------- Hero bird loop ---------- */
(function(){const v=$('#fiona2-vid'),d=$('#fiona2data');if(!v||!d)return;try{const bin=atob(d.textContent.trim()),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);v.src=URL.createObjectURL(new Blob([u],{type:'video/mp4'}))}catch(e){}})();
$$('#banner video.bvid').forEach(v=>{const dec=(el,type)=>{if(el.dataset.src)return el.dataset.src;const bin=atob(el.textContent.trim()),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return URL.createObjectURL(new Blob([u],{type}))};
 v.muted=true;v.defaultMuted=true;v.playsInline=true;v.loop=false;v.removeAttribute('loop');
 const srcs=[];const mp=v.dataset.mp4&&document.getElementById(v.dataset.mp4),wm=v.dataset.webm&&document.getElementById(v.dataset.webm);
 if(mp&&v.canPlayType('video/mp4; codecs="avc1.42E01E"'))srcs.push([mp,'video/mp4']);if(wm&&v.canPlayType('video/webm; codecs="vp9"'))srcs.push([wm,'video/webm']);if(!srcs.length&&mp)srcs.push([mp,'video/mp4']);
 let k=0;const load=()=>{if(k>=srcs.length)return;try{v.src=dec(srcs[k][0],srcs[k][1]);v.load()}catch(e){k++;load()}};v.addEventListener('error',()=>{k++;load()});load();
 if(RM){v.removeAttribute('autoplay');v.pause()}});
/* ---------- Reel: silent loop in the box, full film with sound on click ---------- */
(function(){const btn=$('#reel-play'),dlg=$('#vmodal'),v=$('#vplayer'),rv=$('#reel-vid'),src=$('#vdata');if(!btn||!dlg||!src)return;let url=null;
 function load(){if(url)return url;if(src.dataset.src){url=src.dataset.src;return url}const bin=atob(src.textContent.trim()),n=bin.length,u=new Uint8Array(n);for(let i=0;i<n;i++)u[i]=bin.charCodeAt(i);url=URL.createObjectURL(new Blob([u],{type:'video/mp4'}));return url}
 function startLoop(){if(RM||!rv)return;if(!rv.src){rv.src=load();rv.addEventListener('playing',()=>rv.classList.add('on'),{once:true})}const p=rv.play();p&&p.catch&&p.catch(()=>{})}
 if(rv&&'IntersectionObserver' in window){new IntersectionObserver(es=>{const on=es[0].isIntersecting&&rv.closest('.page').classList.contains('active');if(on&&!dlg.open)startLoop();else if(rv.src)rv.pause()},{threshold:.15}).observe($('#reel'))}
 btn.addEventListener('click',()=>{if(!v.src)v.src=load();if(rv)rv.pause();if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');v.currentTime=0;const p=v.play();if(p&&p.catch)p.catch(()=>{});$('#vclose').focus()});
 function close(){v.pause();if(dlg.open)dlg.close()}
 v.addEventListener('error',()=>{if(!dlg.querySelector('.verr'))v.insertAdjacentHTML('afterend','<p class="verr" style="color:#F5F5F5;padding:16px;margin:0">This browser can\'t play the film here. Try Chrome, Edge or Safari.</p>')});
 $('#vclose').addEventListener('click',close);dlg.addEventListener('close',()=>{v.pause();if(rv&&rv.src)startLoop()});dlg.addEventListener('click',e=>{if(e.target===dlg)close()})})();
/* ---------- Banner: Fiona, Creative, Commerce, Care ---------- */
const banner=(function(){const c=$('#banner');if(!c)return{};const sl=$$('.bslide',c),btn=$$('.bnav button',c),DUR=7000;let i=-1,t=null,hover=false;c.style.setProperty('--dur',DUR+'ms');
 const vidOf=k=>sl[k]&&sl[k].querySelector('video.bvid');const ok=v=>v&&!v.error&&isFinite(v.duration)&&v.duration>0;
 const chat=$('#chat');let chatT=[];
 function playChat(){chatT.forEach(clearTimeout);chatT=[];if(!chat)return;const m=$$('.msg',chat);m.forEach(x=>x.classList.remove('show'));m.forEach((x,k)=>chatT.push(setTimeout(()=>x.classList.add('show'),RM?0:400+k*1300)))}
 function resetBar(k){const g=btn[k]&&btn[k].querySelector('i');if(g){g.style.animation='none';void g.offsetWidth;g.style.animation=''}}
 function show(n){const pv=i;i=(n+sl.length)%sl.length;const s=sl[i];c.classList.toggle('is-light',s.classList.contains('light')||s.classList.contains('vlight'));
  sl.forEach((x,k)=>{const on=k===i;x.classList.toggle('on',on);x.setAttribute('aria-hidden',!on);$$('a,button',x).forEach(e=>e.tabIndex=on?0:-1)});
  btn.forEach((b,k)=>b.setAttribute('aria-current',k===i));
  sl.forEach((x,k)=>{const v=vidOf(k);if(!v||RM)return;if(k===i){if(pv!==i){try{v.currentTime=0}catch(_){}}const p=v.play();p&&p.catch&&p.catch(()=>{})}else v.pause()});
  if(s.contains(chat))playChat();const v=vidOf(i);c.style.setProperty('--dur',(ok(v)?Math.round(v.duration*1000):DUR)+'ms');resetBar(i);sched()}
 function sched(){clearTimeout(t);if(RM||hover)return;let wait=DUR;const v=vidOf(i);if(ok(v)){wait=v.paused?Math.round(v.duration*1000):Math.max(600,(v.duration-v.currentTime)*1000+400)}
  t=setTimeout(()=>{if(document.hidden||!$('[data-page=home]').classList.contains('active')){sched();return}show(i+1)},wait)}
 btn.forEach(b=>b.addEventListener('click',()=>show(+b.dataset.i)));
 sl.forEach((x,k)=>{const v=vidOf(k);if(!v)return;
  v.addEventListener('ended',()=>{if(k!==i)return;if(document.hidden||!$('[data-page=home]').classList.contains('active')){v.currentTime=0;const p=v.play();p&&p.catch&&p.catch(()=>{});return}show(i+1)});
  v.addEventListener('loadedmetadata',()=>{if(k===i){c.style.setProperty('--dur',Math.round(v.duration*1000)+'ms');resetBar(k);sched()}});
  v.addEventListener('error',()=>{if(k===i)sched()})});
 c.addEventListener('focusin',e=>{if(e.target.closest('.bnav'))return;if(!c.matches(':focus-visible')&&!e.target.matches(':focus-visible'))return;hover=true;clearTimeout(t);c.classList.add('paused')});c.addEventListener('focusout',e=>{if(!c.contains(e.relatedTarget)){hover=false;c.classList.remove('paused');sched()}});
 c.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)});
 show(0);return{sched}})();


/* ---------- Some of Us ---------- */
(function(){const g=$('#team-grid');if(!g)return;const TEAM=[
 {n:'Keith Pires',r:'CRO - Chief Revenue Officer',ph:'tm_keith',li:'https://www.linkedin.com/in/keithpires/'},
 {n:'Ramy G. Youssef',r:'CTO - Chief Technology Officer',ph:'tm_ramy',li:'https://www.linkedin.com/in/ramyyoussef/'},
 {n:'Scott Allen',r:'Vice President Sales',ph:'tm_scott',li:'https://www.linkedin.com/in/scottallen1729/'},
 {n:'Dilip Keshu',r:'CSO - Chief Strategy Officer',ph:'tm_dilip',li:'https://www.linkedin.com/in/dilip-keshu/'},
 {n:'Rahuldas R',r:'Senior Designer AI & Digital Experience',ph:'tm_rahul',li:'https://www.linkedin.com/in/rahuldas-rahul-1b468397/'},
 {n:'Sydney Maringas',r:'Client Manager',ph:'tm_sydney',li:'https://www.linkedin.com/in/sydneymaringas/'},
 {n:'Pradeep A',r:'Director',ph:'tm_pradeep',li:'https://www.linkedin.com/in/pradeepgovindaraju/'},
 {n:'Gopinath S',r:'Manager Digital Transformation',ph:'tm_gopi',li:'https://www.linkedin.com/in/gopinathsubbarayan/'},
 {n:'Tony Buxton',r:'Technical Lead',ph:'tm_anthony',li:'https://www.linkedin.com/in/tonybuxton/'},
 {n:'Omar Ayman',r:'Software Engineer',ph:'tm_omar',li:'https://www.linkedin.com/in/omar2205/'},
 {n:'Gamal Mohd',r:'Software Engineer',ph:'tm_gamal'}];
 const ML='<svg aria-hidden="true"><use href="#i-mail"/></svg>',IN='<svg aria-hidden="true"><use href="#i-in"/></svg>';
 g.innerHTML=TEAM.map((p,k)=>'<article class="person rv" style="--d:'+(k%4*.06)+'s"><div class="pic photo-pic"><img src="'+IMG[p.ph]+'" alt="Portrait of '+p.n+'" loading="lazy"></div><div class="info"><h3>'+p.n+'</h3><span class="role">'+p.r+'</span><div class="links">'+(p.li?'<a href="'+p.li+'" target="_blank" rel="noopener" aria-label="'+p.n+' on LinkedIn">'+IN+'<span class="sr"> (opens LinkedIn)</span></a>':'')+'</div></div></article>').join('')+'<a class="person tribe rv" href="#contact"><span class="mono">And many more</span><p>We have a much larger tribe of bold thinkers. This lot is a sampler of the Boldies.</p><span class="lplus">Work with us <svg aria-hidden="true"><use href="#i-plus"/></svg></span></a>'})();
document.querySelectorAll('[data-bg]').forEach(e=>{e.style.setProperty('--img','url('+IMG[e.dataset.bg]+')')});

/* ---------- 360 view: highlight from the legend ---------- */
(function(){const svg=$('.r360');if(!svg)return;let pinned=null;
 function hl(k){svg.classList.toggle('focus',!!k);$$('[data-k]',svg).forEach(e=>e.classList.toggle('hl',!!k&&e.dataset.k===k))}
 $$('.r-chip').forEach(c=>{c.setAttribute('aria-pressed','false');
  c.addEventListener('mouseenter',()=>{if(!pinned)hl(c.dataset.k)});c.addEventListener('mouseleave',()=>{if(!pinned)hl(null)});
  c.addEventListener('focus',()=>{if(!pinned)hl(c.dataset.k)});c.addEventListener('blur',()=>{if(!pinned)hl(null)});
  c.addEventListener('click',()=>{const on=pinned!==c;$$('.r-chip').forEach(x=>x.setAttribute('aria-pressed','false'));if(on){pinned=c;c.setAttribute('aria-pressed','true');hl(c.dataset.k)}else{pinned=null;hl(null)}})});
 $$('.r-stalk,.r-arc,.r-top,.r-core',svg).forEach(e=>{e.addEventListener('mouseenter',()=>{if(!pinned)hl(e.dataset.k)});e.addEventListener('mouseleave',()=>{if(!pinned)hl(null)})});})();
/* ---------- Product films (Vimeo, loaded on click) ---------- */
$$('.vframe').forEach(f=>{const b=f.querySelector('.vplay');b.addEventListener('click',()=>{const ifr=document.createElement('iframe');ifr.src='https://player.vimeo.com/video/'+f.dataset.vimeo+'?autoplay=1&title=0&byline=0&portrait=0&dnt=1';ifr.title=f.dataset.title;ifr.allow='autoplay; fullscreen; picture-in-picture';ifr.allowFullscreen=true;f.appendChild(ifr);f.classList.add('playing');b.remove();ifr.focus()})});

/* ---------- PathFinder use cases & agents ---------- */
(function(){const root=$('#uc');if(!root)return;const D=JSON.parse($('#uc-data').textContent),tabs=$$('.uc-tab',root),st=$('#uc-stage'),DUR=9000;let i=0,t=null,hover=false,stopped=false,seen=false;root.style.setProperty('--ucdur',DUR+'ms');
 const lay=$$('.uc-l',st);let lt=[];
 function layers(){lt.forEach(clearTimeout);lt=[];lay.forEach(l=>l.classList.remove('on'));if(RM){lay.forEach(l=>l.classList.add('on'));return}
  [2,1,0].forEach((L,k)=>lt.push(setTimeout(()=>lay.filter(l=>l.dataset.l==L).forEach(l=>l.classList.add('on')),1500+k*280)))}
 window.__ucShow=k=>show(k,true);
 function show(n,user){i=(n+D.length)%D.length;const d=D[i];
  tabs.forEach((b,k)=>{const on=k===i;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;const g=b.querySelector('i');g.style.animation='none';void g.offsetWidth;g.style.animation=''});
  st.setAttribute('aria-labelledby','uct-'+d.k);$('#uc-name').textContent=d.t;$('#uc-agent').innerHTML=d.a;
  $('#uc-out').innerHTML=d.o.map((x,k)=>'<li style="--k:'+k+'">'+x+'</li>').join('');
  $('#uc-src').innerHTML=d.s.map((x,k)=>'<li style="--k:'+k+'">'+x+'</li>').join('');
  st.classList.remove('run');void st.offsetWidth;st.classList.add('run');layers();
  if(user){stopped=true;root.classList.add('stopped')}sched()}
 function sched(){clearTimeout(t);if(RM||stopped||hover||!seen)return;t=setTimeout(()=>{if(document.hidden||!root.closest('.page').classList.contains('active')){sched();return}show(i+1)},DUR)}
 tabs.forEach((b,k)=>{b.addEventListener('click',()=>show(k,true));b.addEventListener('keydown',e=>{let j=null;if(e.key==='ArrowDown'||e.key==='ArrowRight')j=k+1;if(e.key==='ArrowUp'||e.key==='ArrowLeft')j=k-1;if(e.key==='Home')j=0;if(e.key==='End')j=D.length-1;if(j!==null){e.preventDefault();show(j,true);tabs[(j+D.length)%D.length].focus()}})});
 root.addEventListener('mouseenter',()=>{hover=true;clearTimeout(t);root.classList.add('paused')});root.addEventListener('mouseleave',()=>{hover=false;root.classList.remove('paused');sched()});
 const io2=('IntersectionObserver' in window)?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){if(!seen){seen=true;show(i)}else sched()}else clearTimeout(t)}),{threshold:.25}):null;
 io2?io2.observe(st):(seen=true,show(0));
 show(0);st.classList.remove('run');})();
document.addEventListener('click',e=>{if(e.target.closest('[data-print]'))window.print()});

/* ---------- Testimonials slider ---------- */
(function(){const r=$('#tslider');if(!r)return;const s=$$('.tq',r),d=$$('.tq-dots button',r);let i=0,t=null,hov=false;
 function show(n){i=(n+s.length)%s.length;s.forEach((x,k)=>{x.classList.toggle('on',k===i);x.setAttribute('aria-hidden',k!==i)});d.forEach((b,k)=>{b.setAttribute('aria-current',k===i);const g=b.querySelector('i');g.style.animation='none';void g.offsetWidth;g.style.animation=''});sched()}
 function sched(){clearTimeout(t);if(RM||hov)return;t=setTimeout(()=>{if(!document.hidden&&r.closest('.page').classList.contains('active'))show(i+1);else sched()},6500)}
 d.forEach((b,k)=>b.addEventListener('click',()=>show(k)));r.addEventListener('mouseenter',()=>{hov=true;clearTimeout(t);r.classList.add('paused')});r.addEventListener('mouseleave',()=>{hov=false;r.classList.remove('paused');sched()});show(0)})();
/* ---------- Subtle word-rise on section headings ---------- */
(function(){if(RM||!('IntersectionObserver' in window))return;const hs=$$('main .page h2.h2, main .page .d1, main .page .d2').filter(h=>!h.closest('.banner'));
 hs.forEach(h=>{h.__en=h.innerHTML;let w=0;const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){if(!c.textContent.trim())return;const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){f.appendChild(document.createTextNode(p));return}const s=document.createElement('span');s.className='wd';s.style.setProperty('--w',w++);s.textContent=p;f.appendChild(s)});c.replaceWith(f)}else if(c.nodeType===1&&c.tagName!=='BR')walk(c)})};walk(h);h.classList.add('wd-h')});
 const o=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('wd-in');o.unobserve(en.target)}}),{threshold:.2});hs.forEach(h=>o.observe(h))})();

/* ---------- Fiona: video + manifesto bubble ---------- */
(function(){const v=$('#fiona-vid'),list=$('#fiona-list'),bub=$('#fiona-bubble');if(!v||!list)return;
 const dec=(el,type)=>{if(el.dataset.src)return el.dataset.src;const bin=atob(el.textContent.trim()),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return URL.createObjectURL(new Blob([u],{type}))};
 v.muted=true;v.playsInline=true;
 const srcs=[];const w=$('#fionawebm'),m=$('#fionamp4');if(m&&v.canPlayType('video/mp4; codecs="avc1.42E01E"'))srcs.push([m,'video/mp4']);if(w&&v.canPlayType('video/webm; codecs="vp9"'))srcs.push([w,'video/webm']);if(m&&!srcs.length)srcs.push([m,'video/mp4']);
 let si=0;const load=()=>{if(si>=srcs.length)return;try{v.src=dec(srcs[si][0],srcs[si][1]);v.load();const p=v.play();p&&p.catch&&p.catch(()=>{})}catch(e){si++;load()}};v.addEventListener('error',()=>{si++;load()});load();
 if(RM)v.removeAttribute('autoplay');
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(RM)return;if(en.isIntersecting){const p=v.play();p&&p.catch&&p.catch(()=>{})}else v.pause()}),{threshold:.2});io.observe(v);
 const btns=$$('button',list);let i=0,t=null,hold=false;
 function set(n){i=(n+btns.length)%btns.length;btns.forEach((b,k)=>b.setAttribute('aria-current',k===i));}
 function sched(){clearTimeout(t);if(RM||hold)return;t=setTimeout(()=>{set(i+1);sched()},2800)}
 btns.forEach((b,k)=>{b.addEventListener('mouseenter',()=>{hold=true;clearTimeout(t);set(k)});b.addEventListener('focus',()=>{hold=true;clearTimeout(t);set(k)});b.addEventListener('click',()=>{hold=true;clearTimeout(t);set(k)})});
 list.addEventListener('mouseleave',()=>{hold=false;sched()});
 new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)sched();else clearTimeout(t)}),{threshold:.3}).observe(list)})();
/* FAQ: one answer open at a time */
$$('.acc details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.acc details').forEach(o=>{if(o!==d)o.open=false})}));
/* ---------- Tile tabs (Creative, Care) ---------- */
$$('[data-tiles]').forEach(list=>{const tabs=$$('.tile',list);
 function sel(k,focus,scroll){tabs.forEach((t,j)=>{const on=j===k;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;$('#'+t.getAttribute('aria-controls')).hidden=!on});if(focus)tabs[k].focus();if(scroll){const p=$('#'+tabs[k].getAttribute('aria-controls'));const y=p.getBoundingClientRect().top+scrollY-110;if(Math.abs(p.getBoundingClientRect().top)>innerHeight*.6)scrollTo({top:y,behavior:RM?'auto':'smooth'})}}
 tabs.forEach((t,k)=>{t.addEventListener('click',()=>sel(k,false,true));t.addEventListener('keydown',e=>{let j=null;if(e.key==='ArrowRight')j=(k+1)%tabs.length;if(e.key==='ArrowLeft')j=(k-1+tabs.length)%tabs.length;if(e.key==='Home')j=0;if(e.key==='End')j=tabs.length-1;if(j!==null){e.preventDefault();sel(j,true)}})})});



/* ---------- ATIR highlight on reveal ---------- */
function atirIn(root){$$('[data-atir]',root).forEach(a=>{if(a.dataset.done)return;a.dataset.done=1;$$('span',a).forEach((s,k)=>{if(s.dataset.hi==='1')setTimeout(()=>s.classList.add('hi'),RM?0:300+k*220)})})}

/* ---------- Clean line-by-line statement ---------- */
function linesTick(){const L=$('#lines');if(!L||!L.offsetParent)return;const r=L.getBoundingClientRect(),sp=$$('span',L);
 const p=(innerHeight*.82-r.top)/(r.height+innerHeight*.25);sp.forEach((s,k)=>s.classList.toggle('in',RM||p>k/sp.length))}

/* ---------- PathFinder diagram pulse ---------- */
(function(){const pf=$('#pf');if(!pf||RM)return;const ins=$$('.pf-in .pf-chip',pf),outs=$$('.pf-out .pf-chip',pf),mods=$$('.pf-mod',pf);let k=0;
 setInterval(()=>{if(!pf.classList.contains('in')||!pf.offsetParent||document.hidden)return;
  const a=ins[k%ins.length];a.classList.add('ping');setTimeout(()=>a.classList.remove('ping'),900);
  const m=mods[k%mods.length];m.classList.remove('act');void m.offsetWidth;m.classList.add('act');setTimeout(()=>m.classList.remove('act'),1500);
  setTimeout(()=>{const o=outs[(k+2)%outs.length];o.classList.add('ping');setTimeout(()=>o.classList.remove('ping'),900)},700);k++},1100)})();

/* ---------- Industries ---------- */
(function(){const IND=[
 {id:'retail',name:'Retail and ecommerce',img:'lib_ind_retail',challenge:'Shoppers move between site, app, store and ads, and static listing pages miss what they actually want.',outcomes:['Better conversion','Larger order sizes','Dynamic bundling','1:1 personalization'],mods:[['PathFinder','#products','pathfinder'],['PathWay','#products','pathway'],['PathBreaker','#products','pathbreaker'],['Shopware','#partners'],['MoEngage','#partners']],uc:['Replace static listing pages with conversation','Bundle and recommend from live intent','Produce campaign creative faster']},
 {id:'telecom',name:'Telecom',img:'lib_ind_telecom',challenge:'Plans, devices and support span stores, call centers and digital, and churn signals hide between them.',outcomes:['Lower churn','Higher NPS','Client acquisition','Revenue acceleration'],mods:[['PathFinder','#products','pathfinder'],['PathWay','#products','pathway'],['Care','#care'],['Hightouch','#partners'],['MoEngage','#partners']],uc:['Spot churn intent across channels','Guide plan and device choice in conversation','Serve customers with AI-enabled contact centers']},
 {id:'banking',name:'Banking and fintech',img:'lib_ind_banking',challenge:'Customers expect fast, personal service on every channel while data stays private and compliant.',outcomes:['Client acquisition','Lower churn','Higher NPS','Service experience'],mods:[['PathFinder','#products','pathfinder'],['Care','#care'],['Metarouter','#partners'],['Hightouch','#partners']],uc:['Read service intent across voice, chat, email and web','Activate warehouse data with privacy controls','Personalize onboarding journeys']},
 {id:'travel',name:'Travel and hospitality',img:'lib_ind_travel',challenge:'Travelers research across ads, search, apps and agents before they book, and expect help after.',outcomes:['Revenue acceleration','1:1 personalization','Higher NPS','Larger order sizes'],mods:[['PathFinder','#products','pathfinder'],['PathWay','#products','pathway'],['PathWise','#products','pathwise'],['MoEngage','#partners']],uc:['Turn search and browse signals into offers','Be found in AI answer engines','Upsell and cross-sell in conversation']},
 {id:'b2b',name:'B2B and manufacturing',img:'lib_ind_b2b',challenge:'Complex catalogs, partner networks and workforces outgrow monolithic SaaS platforms.',outcomes:['Modern commerce','Supply chain','Partner experience','Employee experience'],mods:[['Advisory','#solutions','advisory'],['Shopware','#partners'],['360Learning','#partners'],['PathFinder','#products','pathfinder']],uc:['Scale beyond monolithic SaaS commerce','Consolidate learning platforms','Design supplier and workforce experiences']}];
 const tl=$('#ind-tabs'),pp=$('#ind-panels');
 const strip=$('#ind-strip');if(strip)strip.innerHTML=IND.map((d,k)=>'<a class="ind-sc rv" style="--d:'+(k*.05)+'s" href="#use-cases" data-ind="'+d.id+'" data-scroll="industries"><img src="'+IMG[d.img]+'" alt=""><span class="n">0'+(k+1)+'</span><span class="t"><b>'+d.name+'</b><small>'+d.outcomes.slice(0,2).join(' \u00b7 ')+'</small></span><span class="go">'+PLUS+'</span></a>').join('');
 if(!tl)return;
 const link=m=>'<a href="'+(m[1]==='#products'&&m[2]?'#'+m[2]:m[1])+'"'+(m[2]&&m[1]!=='#products'?' data-scroll="'+m[2]+'"':'')+'>'+m[0]+'</a>';
 const jump=$('#ind-jump');if(jump)jump.innerHTML=IND.map(d=>'<a href="#use-cases" data-ind="'+d.id+'" data-scroll="industries">'+d.name+'</a>').join('');
 IND.forEach((d,k)=>{tl.insertAdjacentHTML('beforeend','<button type="button" class="ind-li" role="tab" id="ind-t-'+d.id+'" aria-controls="ind-p-'+d.id+'" aria-selected="'+(k===0)+'"'+(k?' tabindex="-1"':'')+'><span class="n">0'+(k+1)+'</span><span class="t"><b>'+d.name+'</b><small>'+d.outcomes.slice(0,2).join(' \u00b7 ')+'</small></span><svg class="go" aria-hidden="true"><use href="#i-arrow"/></svg></button>');
  pp.insertAdjacentHTML('beforeend','<div class="ind-detail" role="tabpanel" id="ind-p-'+d.id+'" aria-labelledby="ind-t-'+d.id+'"'+(k?' hidden':'')+'>'
  +'<div class="ind-head"><img src="'+IMG[d.img]+'" alt=""><div><span class="mono">0'+(k+1)+' / Industry</span><h3>'+d.name+'</h3><p>'+d.challenge+'</p></div></div>'
  +'<div class="ind-grid"><div class="cardx ind-out2"><span class="mono">Outcomes we design for</span><ul>'+d.outcomes.map((o,i)=>'<li><span>0'+(i+1)+'</span>'+o+'</li>').join('')+'</ul></div>'
  +'<div class="cardx ind-uc2"><span class="mono">Typical use cases</span><ul>'+d.uc.map(u=>'<li>'+u+'</li>').join('')+'</ul></div></div>'
  +'<div class="cardx ind-flow"><span class="mono">How it comes together</span><div class="steps">'
  +'<div class="st"><span class="sn">1</span><b>Signals in</b><p>PathFinder reads intent across web, app, stores, call centers, ads and email.</p></div><i class="ar" aria-hidden="true"></i>'
  +'<div class="st"><span class="sn">2</span><b>Products and partners</b><div class="mods">'+d.mods.map(link).join('')+'</div></div><i class="ar" aria-hidden="true"></i>'
  +'<div class="st"><span class="sn">3</span><b>Outcomes out</b><p>'+d.outcomes.slice(0,2).join(' and ')+', measured against what the engagement targets.</p></div></div></div>'
  +'<div class="cardx night ind-cta"><p>Talk to us about <b>'+d.name.toLowerCase()+'</b>.</p><a class="btnx" href="#contact" data-topic="Not sure yet" data-msg="We would like to discuss use cases for '+d.name.toLowerCase()+'.">Start a conversation<span class="ic">'+PLUS+'</span></a></div>'
  +'</div>')});
 const tabs=$$('[role=tab]',tl);
 function sel(n,f){tabs.forEach((t,k)=>{const on=k===n;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;const p=$('#'+t.getAttribute('aria-controls'));p.hidden=!on;if(on){p.classList.remove('in');void p.offsetWidth;p.classList.add('in')}});if(f)tabs[n].focus()}
 tabs.forEach((t,k)=>{t.addEventListener('click',()=>{sel(k);if(innerWidth<900){const p=$('#'+t.getAttribute('aria-controls'));p.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})}});t.addEventListener('keydown',e=>{let j=null;if(e.key==='ArrowRight'||e.key==='ArrowDown')j=(k+1)%tabs.length;if(e.key==='ArrowLeft'||e.key==='ArrowUp')j=(k-1+tabs.length)%tabs.length;if(j!==null){e.preventDefault();sel(j,true)}})});
 window.__showInd=id=>{const k=IND.findIndex(d=>d.id===id);if(k>=0)sel(k)};sel(0);
})();

/* ---------- Platform map ---------- */
(function(){
 const N={
  exp:[['Customer experience','Bold experiences','Striking visual brand identity and memorable experiences that are engaging and relatable for your audiences.','#solutions','experiences'],
       ['Supplier experience','Bold experiences','Experience development for the suppliers and partners your business depends on.','#solutions','experiences'],
       ['Workforce experience','Bold experiences','Experiences for employees, from learning to daily tools, built on the same cognitive stack.','#solutions','experiences']],
  act:[['PathWay','PathSuite product','Conversational commerce built on PathFinder and driven by customer intent.','#products','pathway',1],
       ['PathBreaker','PathSuite product','Create digital ads 5\u00d7 faster by analysing and benchmarking high-performing creative.','#products','pathbreaker',1],
       ['PathWise','PathSuite product','Build visibility across AI engines with the right prompts, citations and trusted sources.','#products','pathwise',1],
       ['PathIQ utility','Managed service','Prompt-based content and ad production, SEO/AEO/GEO, AR/VR and live commerce, run as a utility with outcome-based accountability.','#commerce']],
  int:[['PathFinder','PathSuite product','An intelligent orchestrator for a connected view of customer interactions across 16+ channels, so brands understand intent and decide better.','#products','pathfinder',1],
       ['PathTrace','AI stack','Part of the BOLDEST AI stack behind Cognitive Commerce. Ask us for a walkthrough.','#contact'],
       ['Cognitive Commerce','Operating system','Reading human intent in real time and converting it into deterministic, revenue-driving actions across every touchpoint.','#commerce']],
  fnd:[['Metarouter','Partner, data pipeline','Server-side customer data infrastructure: faster sites, cleaner data and stronger privacy controls.','#partners'],
       ['Hightouch','Partner, composable CDP','Turns the data warehouse into a real-time activation engine.','#partners'],
       ['Shopware','Partner, commerce','Open-source, API-first ecommerce, integrated with PathSuite.','#partners'],
       ['MoEngage','Partner, engagement','AI-driven customer engagement and journey orchestration.','#partners'],
       ['360Learning','Partner, learning','LXP and LMS platform that integrates with BOLDEST\u2019s AI products.','#partners']]};
 const det=$('#arch-detail');if(!det)return;const all=[];
 Object.keys(N).forEach(k=>{const box=$('[data-layer="'+k+'"]');N[k].forEach(d=>{const b=document.createElement('button');b.type='button';b.className='node'+(d[5]?' prod':'');b.textContent=d[0];b.setAttribute('aria-pressed','false');box.appendChild(b);all.push([b,d]);
  const sel=()=>{all.forEach(([x])=>x.setAttribute('aria-pressed',x===b));
   det.innerHTML='<span class="mono">'+d[1]+'</span><h3>'+d[0]+'</h3><p>'+d[2]+'</p><a class="lplus" href="'+d[3]+'"'+(d[4]&&d[3]==='#products'?' data-product="'+d[4]+'"':'')+(d[4]&&d[3]==='#solutions'?' data-scroll="'+d[4]+'"':'')+'>Learn more <svg aria-hidden="true"><use href="#i-plus"/></svg></a>';
   if(!RM){det.classList.remove('fade-swap');void det.offsetWidth;det.classList.add('fade-swap')}};
  b.addEventListener('click',sel);b.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches)sel()});b._sel=sel})});
 all.find(([b,d])=>d[0]==='PathFinder')[0]._sel();
})();

/* ---------- Rotating role ---------- */
(function(){const r=$('#rot');if(!r||RM)return;const it=$$('span',r);let i=0;
 setInterval(()=>{if(document.hidden)return;const a=it[i];i=(i+1)%it.length;const b=it[i];a.classList.remove('on');a.classList.add('out');b.classList.remove('out');b.classList.add('on');setTimeout(()=>a.classList.remove('out'),750)},2400)})();

/* ---------- Use cases ---------- */
(function(){const UC=[
 ['Commerce','Replace static listing pages with conversation','Turn product discovery into an intent-led dialogue instead of an endless grid.','PathWay','#products','pathway'],
 ['Commerce','Scale beyond monolithic SaaS commerce','Blueprint a composable move with platforms like Shopware, grounded in a business case.','Advisory','#solutions','advisory'],
 ['Marketing','Produce digital ads 5\u00d7 faster','Benchmark high-performing creative to cut cost and time to market.','PathBreaker','#products','pathbreaker'],
 ['Marketing','Get found in AI answers','Build visibility across AI engines with the right prompts, citations and trusted sources.','PathWise','#products','pathwise'],
 ['Marketing','Run marketing as a utility','Content and ads, SEO/AEO/GEO, AR/VR and live commerce with outcome-based accountability.','PathIQ','#commerce',''],
 ['Data','See every customer across 16+ channels','Connect interactions into one view and act on intent in the moment.','PathFinder','#products','pathfinder'],
 ['Data','Move tracking server-side','Replace heavy client-side tags with a unified server-side data pipeline.','Metarouter','#partners',''],
 ['Data','Activate the warehouse you already have','Real-time audiences from a composable CDP, without a monolithic platform.','Hightouch','#partners',''],
 ['Workforce','Consolidate learning platforms','Bring LXP and LMS together at enterprise scale.','360Learning','#partners',''],
 ['Workforce','Design supplier and workforce experiences','Experiences beyond the customer, for the people your business runs on.','Bold experiences','#solutions','experiences']];
 const cats=['All','Commerce','Marketing','Data','Workforce'],fb=$('#uc-filters'),grid=$('#uc-grid');if(!grid)return;
 fb.innerHTML=cats.map((c,i)=>'<button type="button" aria-pressed="'+(i===0)+'" data-c="'+c+'">'+c+'<sup>'+(c==='All'?UC.length:UC.filter(u=>u[0]===c).length)+'</sup></button>').join('');
 function render(c){grid.innerHTML=UC.filter(u=>c==='All'||u[0]===c).map((u,i)=>{const extra=u[5]?(u[4]==='#products'?' data-product="'+u[5]+'"':' data-scroll="'+u[5]+'"'):'';return '<a class="uc'+(RM?'':' enter')+'" style="animation-delay:'+(i*.04)+'s" href="'+u[4]+'"'+extra+'><span class="tag" style="align-self:flex-start">'+u[0]+'</span><h3>'+u[1]+'</h3><p>'+u[2]+'</p><span class="by"><span>Powered by <b>'+u[3]+'</b></span>'+PLUS+'</span></a>'}).join('')}
 $$('button',fb).forEach(b=>b.addEventListener('click',()=>{$$('button',fb).forEach(x=>x.setAttribute('aria-pressed',x===b));render(b.dataset.c)}));render('All')})();

/* ---------- Phases ---------- */
(function(){const P=[
 ['Blueprint','Advisory services','Know what to build, and why.',['Map AI, technology, architecture and business blueprints','Select the right platforms for your growth stage','Build the business case with our proprietary methods'],['Roadmap','Strategy','Platform selection','Business case']],
 ['Build','Agentic brand engagement','Put the platforms and agents in place.',['Implement industry-grade platforms across people, process and technology','Set up agentic orchestration and prompt-based asset creation','Connect data, CDP, CRM and OMS, with secure data vaults'],['Campaigns','Commerce','CDP and CRM','OMS']],
 ['Experience','Bold experiences','Make it unmistakably yours.',['Shape visual brand identity with our creative partners','Design customer, supplier and workforce experiences','Blend data science, creativity and modern technology'],['Brand identity','Customer','Supplier','Workforce']],
 ['Run','PathIQ managed utility','Get outcomes delivered, not just activity.',['Hand over some or all marketing and operational functions','Choose flexible commercial models','Hold us to outcome-based accountability'],['Managed service','Content and ads','SEO, AEO, GEO','Live commerce']]];
 const tl=$('#phase-tabs'),pp=$('#phase-panels'),bar=$('#phase-bar');if(!tl)return;
 P.forEach((p,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.id='ph-t'+i;b.setAttribute('aria-controls','ph-p'+i);b.setAttribute('aria-selected',i===0);b.tabIndex=i?-1:0;b.innerHTML='<span>0'+(i+1)+'</span>'+p[0];tl.appendChild(b);
  pp.insertAdjacentHTML('beforeend','<div class="phase-panel" role="tabpanel" id="ph-p'+i+'" aria-labelledby="ph-t'+i+'"'+(i?' hidden':'')+'><div><span class="tag">'+p[1]+'</span><h3>'+p[2]+'</h3><ul class="chips" style="margin-top:18px">'+p[4].map(c=>'<li>'+c+'</li>').join('')+'</ul></div><ol>'+p[3].map(x=>'<li>'+x+'</li>').join('')+'</ol></div>')});
 const tabs=$$('[role=tab]',tl);
 function sel(i,f){tabs.forEach((t,k)=>{t.setAttribute('aria-selected',k===i);t.tabIndex=k===i?0:-1;$('#ph-p'+k).hidden=k!==i});bar.style.transform='translateX('+(i*100)+'%)';if(f)tabs[i].focus()}
 tabs.forEach((t,i)=>{t.addEventListener('click',()=>sel(i));t.addEventListener('keydown',e=>{let j=null;if(e.key==='ArrowRight')j=(i+1)%4;if(e.key==='ArrowLeft')j=(i+3)%4;if(e.key==='Home')j=0;if(e.key==='End')j=3;if(j!==null){e.preventDefault();sel(j,true)}})})})();

/* ---------- Intent demo ---------- */
(function(){const NS='http://www.w3.org/2000/svg',dG=$('#demo-dots'),wG=$('#demo-wires'),lG=$('#demo-labels');if(!dG)return;
 const segCol=['#E76F7B','#6246B7','#57ADA4','#9D9D9D'],outCol=['#E76F7B','#6246B7','#57ADA4','#3BE087','#F2A65A'],outs=['Personalize','Converse','Recommend','Re-engage','Purchase'],OX=790,oy=i=>50+i*70;
 const r=rng(42),dots=[];for(let i=0;i<48;i++){const s=Math.floor(i/12),k=i%12;dots.push({cx:58+s*140+(k%3)*34,cy:120+Math.floor(k/3)*48,ix:50+r()*560,iy:40+r()*300,s,o:Math.floor(r()*5)})}
 const mk=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e};
 const cW=mk('g',{class:'wire'}),iW=mk('g',{class:'wire'});
 for(let s=0;s<4;s++)cW.appendChild(mk('path',{d:'M'+(92+s*140)+' 320 C '+(92+s*140)+' 360, 700 360, '+(OX-14)+' 190',fill:'none',stroke:segCol[s],'stroke-width':1.5,opacity:.8}));
 dots.forEach(d=>iW.appendChild(mk('line',{x1:d.ix,y1:d.iy,x2:OX-14,y2:oy(d.o),stroke:outCol[d.o],'stroke-width':.8,opacity:.5})));wG.append(cW,iW);
 dots.forEach(d=>{const c=mk('circle',{r:9,class:'dot',cx:0,cy:0});d.el=c;dG.appendChild(c)});
 const segL=[0,1,2,3].map(s=>{const t=mk('text',{x:48+s*140,y:95,'font-size':14,'font-weight':500,fill:'currentColor'});t.textContent='Segment '+'ABCD'[s];lG.appendChild(t);return t});
 const cN=mk('g',{});cN.appendChild(mk('rect',{x:OX-14,y:170,width:104,height:40,rx:6,fill:'none',stroke:'currentColor','stroke-width':1.5}));const ct=mk('text',{x:OX+38,y:195,'text-anchor':'middle','font-size':13,'font-weight':500,fill:'currentColor'});ct.textContent='Campaign';cN.appendChild(ct);lG.appendChild(cN);
 const oN=outs.map((o,i)=>{const g=mk('g',{});g.appendChild(mk('circle',{cx:OX-14,cy:oy(i),r:7,fill:outCol[i]}));const t=mk('text',{x:OX,y:oy(i)+5,'font-size':14,'font-weight':500,fill:'currentColor'});t.textContent=o;g.appendChild(t);lG.appendChild(g);return g});
 const CAP={cohort:'Cohort view: 48 customers sorted into four fixed segments. Everyone in a segment gets the same campaign, though their needs differ and shift through the day.',intent:'Intent view: each customer is read in the moment and routed to the action that fits what they mean right now. This is what PathFinder and the PathSuite stack are built for.'};
 function set(m){const it=m==='intent';dots.forEach(d=>{d.el.style.transform='translate('+(it?d.ix:d.cx)+'px,'+(it?d.iy:d.cy)+'px)';d.el.style.fill=it?outCol[d.o]:segCol[d.s];d.el.setAttribute('r',it?7:9)});
  cW.style.opacity=it?0:1;iW.style.opacity=it?1:0;[cN,...segL].forEach(n=>{n.style.transition='opacity .5s';n.style.opacity=it?0:1});oN.forEach(g=>{g.style.transition='opacity .5s';g.style.opacity=it?1:0});
  $$('#intent-demo .toggle button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===m));$('#demo-caption').textContent=CAP[m]}
 $$('#intent-demo .toggle button').forEach(b=>b.addEventListener('click',()=>set(b.dataset.mode)));set('cohort')})();

/* ---------- PathIQ builder ---------- */
(function(){const box=$('#chips'),sel=new Set(),out=$('#builder-summary'),go=$('#builder-go');
 box.innerHTML=AREAS.map(a=>'<button type="button" class="bchip" aria-pressed="false">'+a+'</button>').join('');
 const fmt=l=>l.length<2?l.join(''):l.slice(0,-1).join(', ')+' and '+l[l.length-1];
 $$('.bchip',box).forEach(c=>c.addEventListener('click',()=>{const a=c.textContent.trim();sel.has(a)?sel.delete(a):sel.add(a);c.setAttribute('aria-pressed',sel.has(a));const l=AREAS.filter(x=>sel.has(x));
  out.textContent=l.length?(l.length+(l.length===1?' area':' areas')+' selected: '+fmt(l)+'. We\u2019ll scope a managed utility around '+(l.length===1?'it.':'them.')):'Select one or more areas to shape your utility.';go.disabled=!l.length}));
 go.addEventListener('click',()=>{const l=AREAS.filter(x=>sel.has(x));state.prefill={topic:'PathIQ',message:'We\u2019d like to explore PathIQ running these areas for us: '+fmt(l)+'.'};navigate('contact')})})();

/* ---------- Forms ---------- */
const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
$$('[data-form]').forEach(form=>{
 const id=form.dataset.form,f=n=>$('#f-'+id+'-'+n),notice=$('#ok-'+id);let body='';
 function err(n,m){const el=f(n),e=$('#e-'+id+'-'+n);e.textContent=m||'';m?el.setAttribute('aria-invalid','true'):el.removeAttribute('aria-invalid')}
 ['name','email','msg'].forEach(n=>f(n).addEventListener('input',()=>{if(f(n).getAttribute('aria-invalid'))err(n,'')}));
 form.addEventListener('submit',e=>{e.preventDefault();if(f('web').value)return;
  const name=f('name').value.trim(),email=f('email').value.trim(),msg=f('msg').value.trim(),topic=f('topic').value,co=f('company').value.trim();let first=null;
  if(!name){err('name','Enter your name.');first=first||'name'}else err('name');
  if(!email){err('email','Enter your work email.');first=first||'email'}else if(!EMAIL.test(email)){err('email','Use an address like name@company.com.');first=first||'email'}else err('email');
  if(msg.length<10){err('msg',msg?'Add a little more detail, at least 10 characters.':'Tell us briefly what you\u2019d like to do.');first=first||'msg'}else err('msg');
  if(first){f(first).focus();return}
  body='Name: '+name+'\nEmail: '+email+(co?'\nCompany: '+co:'')+'\nTopic: '+topic+'\n\n'+msg;
  $('#mail-'+id).href='mailto:keith.pires@theboldest.ai?subject='+encodeURIComponent('Website enquiry: '+topic)+'&body='+encodeURIComponent(body);
  form.hidden=true;notice.hidden=false;notice.focus()});
 $('#edit-'+id).addEventListener('click',()=>{notice.hidden=true;form.hidden=false;f('msg').focus()});
 $('#copy-'+id).addEventListener('click',async function(){const lab=this;const t='To: keith.pires@theboldest.ai\n\n'+body;
  try{await navigator.clipboard.writeText(t);lab.textContent='Copied'}catch(_){const ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand('copy')}catch(__){}ta.remove();lab.textContent=ok?'Copied':'Copy failed'}
  setTimeout(()=>lab.textContent='Copy message',2400)});
});
function applyPrefill(){const p=state.prefill;if(!p)return false;state.prefill=null;const form=$('[data-form="contact"]');
 if(form.hidden){$('#ok-contact').hidden=true;form.hidden=false}
 if(p.email)$('#f-contact-email').value=p.email;
 if(p.topic){const s=$('#f-contact-topic');const o=[...s.options].find(o=>o.value===p.topic||o.__en===p.topic||o.text===p.topic);if(o)s.value=o.value}
 if(p.message&&!$('#f-contact-msg').value)$('#f-contact-msg').value=p.message;
 if(p.focus!==false){setTimeout(()=>{const t=$('#f-contact-name');t.scrollIntoView({block:'center'});t.focus({preventScroll:true})},80)}return true}

/* ---------- Reveal + counters ---------- */
function countUp(el){const end=+el.dataset.count;if(RM){el.textContent=end.toLocaleString('en-US');return}const t0=performance.now(),D=1600;
 (function f(t){const p=Math.min(1,(t-t0)/D),e=1-Math.pow(1-p,3);el.textContent=Math.round(end*e).toLocaleString('en-US');if(p<1)requestAnimationFrame(f)})(t0)}
const io=('IntersectionObserver' in window)?new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const el=en.target;el.classList.add('in');io.unobserve(el);
 $$('[data-count]',el).forEach(c=>{if(!c.dataset.done){c.dataset.done=1;countUp(c)}});atirIn(el);if(el.querySelector&&el.querySelector('#needle'))setTimeout(()=>{$('#needle').style.transform='rotate(52deg)'},50)}),{threshold:.14,rootMargin:'0px 0px -6% 0px'}):null;
function observe(root){$$('.rv',root).forEach(el=>{if(el.classList.contains('in'))return;if(io)io.observe(el);else el.classList.add('in')});
 $$('[data-count]',root).forEach(c=>{if(!c.closest('.rv')&&!c.dataset.done){c.dataset.done=1;countUp(c)}})}

/* ---------- Scroll effects: reel + stacked cards ---------- */
let ticking=false;
function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;linesTick();const pg=$('.page.active');if(!pg||RM)return;const wide=innerWidth>760;
 const reel=$('.reel',pg);if(reel&&wide){const r=reel.getBoundingClientRect(),tot=reel.offsetHeight-innerHeight;let p=Math.min(1,Math.max(0,(-r.top+innerHeight*.35)/tot));p=1-Math.pow(1-p,2);reel.querySelector('.reel-box').style.setProperty('--s',(.38+.62*p).toFixed(4))}
 if(innerWidth>860)$$('[data-stack]',pg).forEach(st=>{const items=$$(':scope>li',st);items.forEach((li,i)=>{const c=li.firstElementChild,nx=items[i+1];if(!nx){c.style.transform='';return}
  const h=c.offsetHeight,top=li.getBoundingClientRect().top,nt=nx.getBoundingClientRect().top;let p=Math.min(1,Math.max(0,(top+h-nt)/h));
  c.style.transform=p?'perspective(1600px) rotateX('+(p*9).toFixed(2)+'deg) scale('+(1-p*.07).toFixed(4)+')':'';c.style.filter=p?'brightness('+(1-p*.25).toFixed(3)+')':''})})})}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);


/* ---------- Language: English / Español ---------- */
(function(){let D=null;try{D=JSON.parse(document.getElementById('i18n-es').textContent)}catch(e){return}
 const SEG=D.seg,ATT=D.attr,INL=new Set(['EM','STRONG','B','I','BR','A','SMALL','CODE','SUP','SPAN']),SK=new Set(['SCRIPT','STYLE','SVG','svg','TITLE','VIDEO','IMG','TEXTAREA','SELECT','INPUT','OPTION']);
 const norm=s=>s.replace(/\s+/g,' ').trim();let lang='en',busy=false;
 const isRoot=e=>{if(e.classList&&e.classList.contains('wd-h'))return true;let txt=false;for(const c of e.childNodes){if(c.nodeType===3&&/[A-Za-z]/.test(c.textContent))txt=true;else if(c.nodeType===1){if(!INL.has(c.tagName)||c.querySelector('svg'))return false;for(const x of c.querySelectorAll('*'))if(!INL.has(x.tagName))return false}}return txt};
 function attrs(el){['placeholder','aria-label','title'].forEach(a=>{const v=el.getAttribute(a);if(v==null)return;el.__ea=el.__ea||{};if(!(a in el.__ea))el.__ea[a]=v;const en=el.__ea[a];const t=lang==='es'?ATT[en]||SEG[en]:null;el.setAttribute(a,t||en)})}
 function apply(root){if(!root||SK.has(root.tagName))return;
  const visit=el=>{if(el.nodeType!==1)return;if(el.tagName==='INPUT'||el.tagName==='TEXTAREA'){attrs(el);return}if(el.tagName==='SELECT'){for(const o of el.options){if(!o.hasAttribute('value'))o.value=o.textContent;if(o.__en==null)o.__en=o.textContent;const t=lang==='es'?SEG[norm(o.__en)]:null;o.textContent=t||o.__en}return}if(SK.has(el.tagName)||(el.closest&&el.closest('[data-i18n-skip]')))return;attrs(el);
   if(isRoot(el)){if(el.__en==null)el.__en=el.innerHTML;const key=norm(el.__en.replace(/<span class="wd"[^>]*>(.*?)<\/span>/g,'$1'));const t=lang==='es'?SEG[key]:null;
     if(t!=null){if(el.innerHTML!==t){el.innerHTML=t;if(el.classList.contains('wd-h'))el.classList.add('wd-in')}}else if(el.__tr||lang==='en'){if(el.__tr)el.innerHTML=el.__en}el.__tr=t!=null;return}
   for(const c of el.childNodes){if(c.nodeType===3){if(!/[A-Za-z]/.test(c.textContent))continue;if(c.__en==null)c.__en=c.textContent;const k=norm(c.__en),t=lang==='es'?SEG[k]:null;const want=t!=null?c.__en.replace(k,t):c.__en;if(c.textContent!==want)c.textContent=want}else if(c.nodeType===1)visit(c)}};
  visit(root)}
 let mo=null;function setLang(l,save){lang=l==='es'?'es':'en';document.documentElement.lang=lang;busy=true;apply(document.body);if(mo)mo.takeRecords();busy=false;
  document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===lang));
  if(save){try{localStorage.setItem('boldest-lang',lang)}catch(e){}}}
 mo=new MutationObserver(ms=>{if(busy||lang==='en')return;busy=true;for(const m of ms){if(m.type==='childList'){const t=m.target.nodeType===1?m.target:m.target.parentElement;if(t){if(isRoot(t)){t.__en=null;t.__tr=false;apply(t.parentElement||t)}else m.addedNodes.forEach(n=>{if(n.nodeType===1)apply(n);else if(n.nodeType===3&&t)apply(t)})}}}mo.takeRecords();busy=false});mo.observe(document.body,{childList:true,subtree:true});
 document.addEventListener('click',e=>{const b=e.target.closest('.lang button');if(b)setLang(b.dataset.lang,true)});
 let saved='en';try{saved=localStorage.getItem('boldest-lang')||'en'}catch(e){}
 const q=(location.search.match(/[?&]lang=(es|en)/)||[])[1];if(q)saved=q;
 window.__setLang=setLang;window.__lang=()=>lang;if(saved==='es')setLang('es',false)})();

/* ---------- Header: collapse to the menu button whenever the links don't fit ---------- */
(function(){const hd=document.querySelector('.site-header');if(!hd)return;const nav=hd.querySelector('.nav'),seg=hd.querySelector('.seg'),right=hd.querySelector('.nav-right'),logo=hd.querySelector('.logo');
 function fit(){hd.classList.remove('nav-collapsed');const s=seg.getBoundingClientRect(),r=right.getBoundingClientRect(),l=logo.getBoundingClientRect();const n=nav.getBoundingClientRect();const tooWide=s.right>r.left-12||s.left<l.right+12||s.height>48||seg.scrollWidth>seg.clientWidth+1||r.right>n.right+1||nav.scrollWidth>nav.clientWidth+1;hd.classList.toggle('nav-collapsed',tooWide||innerWidth<1024)}
 let raf=0;const req=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(fit)};
 addEventListener('resize',req);document.addEventListener('click',e=>{if(e.target.closest('.lang button'))setTimeout(req,30)});
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(req);setTimeout(req,300);req()})();
/* ---------- Router & nav ---------- */
const pages={};$$('.page').forEach(p=>pages[p.dataset.page]=p);const md=document.querySelector('meta[name="description"]');
const mm=$('#mobile-menu');
function closeMenus(){if(mm.classList.contains('open')){mm.classList.remove('open');$('#menu-open').setAttribute('aria-expanded','false');document.body.style.overflow=''}}
function navigate(id){location.hash===('#'+id)?route():location.hash=id}
const ALIAS={team:'about','some-of-us':'about','cognitive-commerce':'commerce',cognitivecommerce:'commerce',pathiq:'commerce',pathsuite:'products','our-tech':'products','news-views':'views','some-of-us-x':'team'};
const CMAP={'c-creative':'creative','c-commerce':'commerce','c-care':'care'};
function route(){let id=(location.hash||'#home').slice(1)||'home',sc=state.pendingScroll;state.pendingScroll=null;
 if(ALIAS[id]){if(id==='pathiq')sc=sc||'pathiq';if(id==='team'||id==='some-of-us')sc=sc||'team';id=ALIAS[id]}if(sc&&CMAP[sc]){id=CMAP[sc];sc=null}
 if(!pages[id])id='home';
 Object.values(pages).forEach(p=>p.classList.toggle('active',p.dataset.page===id));if(id!=='home')$$('#banner video,#fiona-vid').forEach(v=>v.pause());const pg=pages[id];
 document.title=pg.dataset.title;md&&md.setAttribute('content',pg.dataset.desc);
 $$('[data-route]').forEach(a=>a.dataset.route===id?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
 {const pl=$('.seg a[data-route="products"]');if(pl)['products','pathfinder','pathway','pathwise','pathbreaker'].includes(id)?pl.setAttribute('aria-current','page'):pl.removeAttribute('aria-current')}
 closeMenus();if(id==='use-cases'&&state.pendingInd&&window.__showInd){window.__showInd(state.pendingInd);state.pendingInd=null}
 requestAnimationFrame(()=>{if(state.pendingUC!=null&&window.__ucShow){window.__ucShow(state.pendingUC);state.pendingUC=null}const t=sc&&document.getElementById(sc);if(t)t.scrollIntoView({behavior:RM?'auto':'smooth'});else scrollTo(0,0);
  observe(pg);onScroll();$$('[data-pf2]',pg).forEach(r=>{initPF2(r);r.__relayout&&r.__relayout()});let focused=false;if(id==='contact')focused=applyPrefill();
  if(!state.firstLoad&&!focused){const h=pg.querySelector('h1');h&&h.focus({preventScroll:true})}state.firstLoad=false})}
addEventListener('hashchange',route);
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href').slice(1);
 if(a.dataset.scroll)state.pendingScroll=a.dataset.scroll;if(a.dataset.uc!=null)state.pendingUC=+a.dataset.uc;if(a.dataset.product&&(id==='pathsuite'||id==='products'))state.pendingScroll='ps-'+a.dataset.product;if(a.dataset.topic)state.prefill={topic:a.dataset.topic,focus:true,message:a.dataset.msg||''};if(a.dataset.ind){state.pendingInd=a.dataset.ind;state.pendingScroll='ind-tabs'}
 if(pages[id]||ALIAS[id]){e.preventDefault();navigate(id);return}const el=document.getElementById(id);if(el){e.preventDefault();el.scrollIntoView();el.focus({preventScroll:true})}});
$('#menu-open').addEventListener('click',()=>{mm.classList.add('open');$('#menu-open').setAttribute('aria-expanded','true');document.body.style.overflow='hidden';$('#menu-close').focus()});
$('#menu-close').addEventListener('click',()=>{closeMenus();$('#menu-open').focus()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(mm.classList.contains('open')){closeMenus();$('#menu-open').focus()}}
 if(e.key==='Tab'&&mm.classList.contains('open')){const f=$$('a,button',mm),a=f[0],b=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();b.focus()}else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();a.focus()}}});
// Home quick: email field in home form carries over? Home form works standalone.
route();
})();
