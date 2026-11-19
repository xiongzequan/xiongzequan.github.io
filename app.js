const faculty='https://faculty.ecnu.edu.cn/_s24/xzq/main.psp';
// Verified sources: ECNU faculty profile, original personal website and DOI records.
// Edit this array to add publications; no build step is required.
const publications=[
 {year:2025,lang:'zh',title:'面向学科交叉的高校图书馆信息服务——基于100所世界知名高校图书馆的调研',authors:'熊泽泉, 毛璐, 彭霞, 等',journal:'大学图书馆学报, 43(6): 93–100',url:faculty},
 {year:2025,lang:'en',title:'Continuance intention to use the self-built e-reserve databases (SED) in Chinese academic libraries: An integrative model',authors:'Xiong, Z., Peng, X., & Yang, L.',journal:'Journal of Librarianship and Information Science',doi:'10.1177/09610006251330886'},
 {year:2025,lang:'zh',title:'阅读推广：AI时代中国公共图书馆的选择',authors:'段宇锋, 范并思, 熊泽泉*',journal:'中国图书馆学报, 51(6): 18–32',url:faculty},
 {year:2024,lang:'en',title:'Can document characteristics affect motivations for literature usage?',authors:'Peng, X., Xiong, Z.*, & Yang, L.',journal:'Scientometrics, 129: 3543–3563',doi:'10.1007/s11192-024-05044-w'},
 {year:2023,lang:'en',title:'Motivation for downloading academic publications',authors:'Xiong, Z., Peng, X., Yang, L., Lou, W.*, & Zhao, S. X.',journal:'Library & Information Science Research, 45(2): 101239',doi:'10.1016/j.lisr.2023.101239'},
 {year:2025,lang:'zh',title:'AIGC背景下信息素养高阶思维教学模式构建——基于ICAP学习方式分类框架',authors:'赵建庆, 宋振世, 熊泽泉, 等',journal:'国家图书馆学刊, 34(6): 91–102',url:faculty},
 {year:2025,lang:'zh',title:'基于游戏化学习的高校图书馆信息素养教育实践活动研究',authors:'赵建庆, 刘倩秀, 熊泽泉*',journal:'国家图书馆学刊, 34(1): 79–90',url:faculty},
 {year:2024,lang:'zh',title:'基于BERT的领域分词优化高校图书馆借阅热点分析',authors:'陈金传, 成志强, 熊泽泉, 等',journal:'情报科学, 42(11): 76–83, 111',url:faculty},
 {year:2023,lang:'en',title:'Exploring librarians’ intentions to collaborate in research: A model integrating the Theory of Planned Behavior and Social Exchange Theory',authors:'Peng, X., Xie, Y., Xiong, Z.*, & Yang, L.',journal:'Journal of Librarianship and Information Science, 55(3): 744–762',doi:'10.1177/09610006221104259'},
 {year:2022,lang:'zh',title:'基于使用数据计量的CASHL文献资源保障研究',authors:'熊泽泉, 彭霞, 杨莉',journal:'大学图书馆学报, 40(2): 11–19',url:faculty},
 {year:2021,lang:'zh',title:'数字经济分类的国际进展与中国探索',authors:'刘伟, 许宪春, 熊泽泉',journal:'财贸经济, 42(7): 32–48',url:faculty},
 {year:2021,lang:'zh',title:'CiteScore与期刊影响因子的学科差异性研究',authors:'杨莉, 熊泽泉*',journal:'中国科技期刊研究, 32(1): 135–143',url:faculty},
 {year:2019,lang:'en',title:'Evaluating the impact of books in Chinese Studies: A case study of books authored by UCLA scholars',authors:'Xiong, Z., & Duan, Y.*',journal:'Malaysian Journal of Library & Information Science, 24(3): 23–38',doi:'10.22452/mjlis.vol24no3.2'},
 {year:2018,lang:'zh',title:'论文早期下载量可否预测后期被引量？——以图书情报领域期刊为例',authors:'熊泽泉, 段宇锋',journal:'图书情报知识, (4): 49–59',url:faculty},
 {year:2017,lang:'en',title:'Download patterns of journal papers and their influencing factors',authors:'Duan, Y., & Xiong, Z.*',journal:'Scientometrics, 112(3): 1761–1775',doi:'10.1007/s11192-017-2456-1'}
];
const projects=[
 ['2019.12 — 2023.06','科学大数据背景下学术文献的使用动机研究','Motivations for Using Scholarly Literature in the Context of Scientific Big Data','上海市哲学社会科学规划青年课题 · 2019ETQ004 · 主持 · 已结题','Shanghai Philosophy and Social Sciences Planning Project · 2019ETQ004 · PI · Completed'],
 ['2021.06 — 2024.06','基于交叉学科前沿分析的潜在合作领域与合作伙伴发现','Identifying Potential Collaboration Areas and Partners through Interdisciplinary Frontier Analysis','华东师范大学人文社会科学青年预研究项目 · 主持 · 已结题','ECNU Humanities and Social Sciences Preliminary Research Project · PI · Completed'],
 ['2023.09 — 2024.09','高校图书馆科技信息资源利用与产业咨询服务能力培训项目','Training in Scientific Information Resources and Industry Consulting for Academic Libraries','教育部产学合作协同育人项目 · 主持 · 已结题','Ministry of Education Industry–University Collaborative Education Project · PI · Completed']
];
const otherProjects=[
 ['2020 — 2021','基于使用数据计量和使用动机调查的CASHL文献资源保障研究','CASHL Resource Provision Based on Usage Metrics and User Motivation','CASHL前瞻性研究课题 · 2020KT009 · 主持 · 已结题','CASHL Research Project · 2020KT009 · PI · Completed'],
 ['2018.06 — 2021.06','Altmetrics指标在图书影响力评价中的作用','The Role of Altmetrics in Evaluating Book Impact','中央高校基本科研业务经费项目 · 主持 · 已结题','Fundamental Research Funds for the Central Universities · PI · Completed'],
 ['2018.01 — 2018.12','CiteScore与JCR影响因子的学科差异性研究','Disciplinary Differences between CiteScore and Journal Impact Factor','中国科学技术信息研究所课题 · 主持 · 已结题','Institute of Scientific and Technical Information of China · PI · Completed']
];
const education=[
 ['2016 — 2021','华东师范大学','East China Normal University','博士 · 经济与管理学部','PhD · Faculty of Economics and Management'],
 ['2007 — 2010','华东师范大学','East China Normal University','硕士 · 生命科学学院','Master’s degree · School of Life Sciences'],
 ['2003 — 2007','海南大学','Hainan University','本科 · 海洋学院','Bachelor’s degree · College of Ocean Sciences']
];
const experience=[
 ['2024.12 —','研究馆员','Research Librarian','华东师范大学图书馆 · 至今','ECNU Library · Present'],
 ['2019 — 2024','副研究馆员','Associate Research Librarian','华东师范大学图书馆','ECNU Library'],
 ['2012 — 2019','馆员','Librarian','华东师范大学图书馆','ECNU Library'],
 ['2010 — 2012','助理馆员','Assistant Librarian','华东师范大学图书馆','ECNU Library']
];
const honors=[
 ['2024 / 2020','上海市优秀科技情报工作者','Shanghai Outstanding Scientific and Technical Information Professional'],
 ['2018–2020','上海市高校图书馆学术之星','Academic Star of Shanghai University Libraries'],
 ['2018','第三届上海市信息资源管理研究生优秀成果奖一等奖','First Prize, 3rd Shanghai Graduate Outstanding Achievement Award in Information Resource Management'],
 ['2013','首届长三角地区优秀科技情报工作者','Outstanding Scientific and Technical Information Professional in the Yangtze River Delta']
];
const en={skip:'Skip to content',academic:'ACADEMIC PROFILE',navAbout:'About',navResearch:'Research',navPubs:'Publications',navProjects:'Projects',navContact:'Contact',institution:'EAST CHINA NORMAL UNIVERSITY · LIBRARY',position:'Research Librarian <span> / </span> PhD <span> / </span> Master’s Supervisor',intro1:'I am Director of the Interdisciplinary Support Center at ECNU Library and Deputy Director of the Institute of Information Studies, East China Normal University. My research spans scientometrics, the digital economy, and interdisciplinary research.',intro2:'I study how scholarly information is used, evaluated, and served, with a focus on the flow of knowledge and the role of libraries in interdisciplinary discovery and innovation.',explore:'Explore publications',getInTouch:'Get in touch',portraitLabel:'Zequan Xiong · ECNU',affiliation:'Interdisciplinary Support Center',faculty:'ECNU Profile',researchTitle:'Research interests',researchNote:'Understanding knowledge and innovation.',r1:'Scientometrics',r1desc:'Scholarly information use, research impact evaluation, and quantitative analysis of scientific knowledge.',r2:'Digital economy',r2desc:'Classification and measurement of the digital economy, and the economic and social effects of digital technologies.',r3:'Interdisciplinary research',r3desc:'Knowledge discovery across disciplines, identification of potential collaborations, and library service innovation.',pubsTitle:'Publications',pubsNote:'Recent and selected work',all:'All',english:'English',chinese:'Chinese',showMore:'Show more publications',projectsTitle:'Research projects',projectsNote:'Connecting research with practice.',nsfcLabel:'National Social Science Fund of China',ongoing:'Ongoing · PI',featuredTitle:'An Innovative Information Resource Service System for Interdisciplinary Integration',projectCode:'Grant: 23BTQ084',moreProjects:'Other projects as principal investigator',backgroundTitle:'Academic background',education:'Education',experience:'Appointments',honors:'Honors & awards',teaching:'Teaching & academic service',course:'Course: Educational Literature Retrieval and Data Analysis.',service1:'Deputy Chair, Young Scholars Committee, Shanghai Library Association (2023–2027).',service2:'Reviewer for Scientometrics, Scientific Reports, and Journal of Librarianship and Information Science.',contactTitle:'Let’s connect',contactDesc:'For conversations on scientometrics, interdisciplinary research, and library services.',contactPlace:'ECNU Library<br>Interdisciplinary Support Center<br>Minhang Campus · Shanghai 200241, China',print:'Print / Save as PDF',footerName:'Zequan Xiong',footerNote:'Academic inquiry begins with curiosity.',backTop:'Back to top'};
const zh={};
document.querySelectorAll('[data-i18n]').forEach(el=>zh[el.dataset.i18n]=el.innerHTML);
let lang='zh',filter='all',expanded=false;
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderPublications(){
 const q=document.getElementById('search').value.toLocaleLowerCase().trim();
 const matches=publications.filter(p=>(filter==='all'||p.lang===filter)&&`${p.title} ${p.authors} ${p.journal} ${p.year}`.toLocaleLowerCase().includes(q));
 const items=expanded||q||filter!=='all'?matches:matches.slice(0,5);
 document.getElementById('publication-list').innerHTML=items.length?items.map(p=>`<article class="publication-row"><time class="pub-year">${p.year}</time><div><h3 class="pub-title ${p.lang}"><a href="${esc(p.doi?'https://doi.org/'+p.doi:p.url)}" target="_blank" rel="noopener">${esc(p.title)}</a></h3><p class="pub-authors">${esc(p.authors).replace(/(熊泽泉|Xiong, Z\.)/g,'<strong>$1</strong>')}</p><p class="pub-journal">${esc(p.journal)}</p></div><a class="pub-source" href="${esc(p.doi?'https://doi.org/'+p.doi:p.url)}" target="_blank" rel="noopener" aria-label="${esc(p.title)} — ${p.doi?'DOI':lang==='en'?'ECNU source':'机构主页来源'}">${p.doi?'DOI':lang==='en'?'Source':'来源'}</a></article>`).join(''):`<p class="empty">${lang==='en'?'No matching publications. Try another keyword.':'未找到匹配的成果，请尝试其他关键词。'}</p>`;
 document.getElementById('publication-count').textContent=lang==='en'?`Showing ${items.length} of ${matches.length} selected publications`:`显示 ${items.length} / ${matches.length} 篇精选论文`;
 const btn=document.getElementById('show-more');btn.hidden=Boolean(q)||filter!=='all'||matches.length<=5;
 btn.textContent=lang==='en'?(expanded?'Show fewer':'Show more publications'):(expanded?'收起部分成果':'展开更多成果');
}
function projectHTML(p){return `<article class="project-row"><div class="project-date">${p[0]}</div><div><h3>${esc(p[lang==='en'?2:1])}</h3><p>${esc(p[lang==='en'?4:3])}</p></div></article>`;}
function timelineHTML(p){return `<div class="timeline-row"><span class="timeline-date">${p[0]}</span><div><h4>${esc(p[lang==='en'?2:1])}</h4><p>${esc(p[lang==='en'?4:3])}</p></div></div>`;}
function renderDetails(){
 document.getElementById('project-list').innerHTML=projects.map(projectHTML).join('');
 document.getElementById('other-projects').innerHTML=otherProjects.map(projectHTML).join('');
 document.getElementById('education-list').innerHTML=education.map(timelineHTML).join('');
 document.getElementById('experience-list').innerHTML=experience.map(timelineHTML).join('');
 document.getElementById('honor-list').innerHTML=honors.map(p=>`<div class="honor-row"><time>${p[0]}</time><p>${esc(p[lang==='en'?2:1])}</p></div>`).join('');
}
function setLanguage(next){
 lang=next;document.documentElement.lang=next==='en'?'en':'zh-CN';
 document.querySelectorAll('[data-i18n]').forEach(el=>el.innerHTML=(lang==='en'?en:zh)[el.dataset.i18n]||zh[el.dataset.i18n]);
 document.getElementById('name').textContent=lang==='en'?'Zequan Xiong':'熊泽泉';
 document.querySelector('.roman-name').textContent=lang==='en'?'熊泽泉':'Zequan Xiong';
 document.getElementById('language').textContent=lang==='en'?'中文':'EN';
 document.getElementById('language').setAttribute('aria-label',lang==='en'?'切换为中文':'Switch to English');
 document.getElementById('search').placeholder=lang==='en'?'Search title, author or journal':'检索标题、作者或期刊';
 document.getElementById('search').setAttribute('aria-label',lang==='en'?'Search publications':'检索论文');
 document.getElementById('navigation').setAttribute('aria-label',lang==='en'?'Main navigation':'主导航');
 document.querySelector('.filters').setAttribute('aria-label',lang==='en'?'Filter by publication language':'论文语言筛选');
 document.querySelectorAll('.english-sub').forEach(el=>el.hidden=lang==='en');
 document.getElementById('menu').setAttribute('aria-label',lang==='en'?'Toggle navigation':'展开导航');
 renderPublications();renderDetails();
 try{localStorage.setItem('academic-language',lang)}catch{}
}
document.getElementById('language').addEventListener('click',()=>setLanguage(lang==='en'?'zh':'en'));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});renderPublications();
}));
document.getElementById('search').addEventListener('input',renderPublications);
document.getElementById('show-more').addEventListener('click',()=>{expanded=!expanded;renderPublications();if(!expanded)document.getElementById('publications').scrollIntoView({behavior:'smooth'})});
const menu=document.getElementById('menu'),nav=document.getElementById('navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.getElementById('print').addEventListener('click',()=>{expanded=true;renderPublications();window.print()});
document.getElementById('year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id))}})},{rootMargin:'-12% 0px -62% 0px',threshold:0});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
let initial='zh';try{if(localStorage.getItem('academic-language')==='en')initial='en'}catch{}
setLanguage(initial);
