import { type ReactNode, useEffect, useState } from 'react';
import { ArrowUpLeft, ChevronLeft, ExternalLink, Headphones, KeyRound, Menu, MessageCircle, Radio, Search, Send, ShieldCheck, Sparkles, X } from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const asset = (file: string) => `${import.meta.env.BASE_URL}original/assets/${file}`;
const inviteUrl = 'https://discord.gg/arab-share-70k-797765373822763018';
const supportUrl = 'https://discord.com/channels/797765373822763018/1528269143999123567';
const adminApplicationUrl = 'https://aarb-shyr-or-ltqdym-ldry--fareskr6263.replit.app';

const navItems = [
  { href: '/', label: 'الرئيسية' },
  { href: '/admins', label: 'مسؤولو عرب شير' },
  { href: '/rooms', label: 'رومات عرب شير' },
  { href: '/publishing', label: 'نظام النشر' },
  { href: '/support', label: 'الدعم الفني' },
];

const stats = [
  { value: '69,624', label: 'عدد أعضاء السيرفر' },
  { value: '1,947', label: 'عدد المتواجدين' },
  { value: '16', label: 'عدد الرومات' },
];

const rules = [
  'احترام جميع أعضاء السيرفر وعدم الإساءة أو التقليل من أي شخص.',
  'يمنع السب والشتم والإهانات داخل شاتات السيرفر.',
  'يمنع السبام والتكرار المزعج في الشاتات.',
  'يمنع نشر أو مشاركة أي محتوى مخالف لقوانين السيرفر أو الآداب العامة.',
];

const admins = [
  { id: '01', name: 'Mohammed bin Salman', role: 'Owner Ship', description: 'المسؤول و المشرف الأول على سيرفر عرب شير', image: 'Screenshot_20260829_160619_Discord_1788017898839-DPBY8IHm.png' },
  { id: '02', name: 'Al Qsaimi [ أبو عتب ]', role: 'Owner', description: 'المسؤول على تنظيم الفريق الإداري و الإعلانات و شركات', image: 'Screenshot_20260829_160541_Discord_1788017898865-CpIipLY0.png' },
  { id: '03', name: 'كوسه موسى', role: 'Trail Assistant / posting management', description: 'عضو في الطاقم الإداري', image: 'Screenshot_20260829_160706_Discord_1788017898871-BAQHcKvx.png' },
  { id: '04', name: 'F', role: 'إداري سابق', description: '', image: 'Screenshot_20260829_160652_Discord_1788017898878-BgviDXsK.png' },
];

const rooms = [
  { id: '01', name: 'قوانين السيرفر', description: 'القواعد والأنظمة المعتمدة', image: 'arab-share-room-laws-D8gsEPHK.png', icon: ShieldCheck, url: 'https://discord.com/channels/797765373822763018/1514350825600716931' },
  { id: '02', name: 'شات النشر', description: 'شارك ما يستحق أن يصل', image: 'arab-share-room-publishing-9g4lixEW.png', icon: Send, url: 'https://discord.com/channels/797765373822763018/1514350813831757945' },
  { id: '03', name: 'الشات العام', description: 'مساحتنا اليومية المفتوحة', image: 'arab-share-room-general-By9hVUDw.png', icon: MessageCircle, url: 'https://discord.com/channels/797765373822763018/1542948735661772960' },
  { id: '04', name: 'شروط الشركات', description: 'لشراكات أوضح وأفضل', image: 'arab-share-room-companies-DcSR4rPz.png', icon: BuildingIcon, url: 'https://discord.com/channels/797765373822763018/1524946123876339805' },
  { id: '05', name: 'الدعم الفني', description: 'نحن هنا للمساعدة', image: 'arab-share-room-support-CYBW1dhu.png', icon: Headphones, url: supportUrl },
  { id: '06', name: 'اسعار الإعلانات', description: 'اعرف خيارات الظهور', image: 'arab-share-room-ads-w1P7QoHk.png', icon: Radio, url: 'https://discord.com/channels/797765373822763018/1520013094485495878' },
  { id: '07', name: 'روم التقديم', description: 'خطوتك الأولى معنا', image: 'arab-share-room-applications-DSATR7VZ.png', icon: KeyRound, url: 'https://discord.com/channels/797765373822763018/1527527888528740414' },
];

const publishingRules = [
  'ان يكون النشر في الشات المخصص فقط .',
  'يمنع منعاً باتاً نشر سيرفرات مخله في الاداب او سيرفرات (+18)  .',
  'يمنع السوالف في شات النشر .',
  'يمنع السب او الشتم في شاتات السيرفر وشات النشر .',
  'يمنع نشر سيرفر (كازينو - سيرفر فري مايك - سيرفر +18) او اي سيرفر مخالف لشريعه الاسلاميه .',
  'يمنع النشر في الخاص فقط النشر في الشات ويمنع التواصل معه في الخاص ويعرضك لعقوبه .',
  'يمنع السبام او التكرار في الشات اكثر من مره',
  'يمنع ارسال استبيان اكثر من سطرين في النشر كاتعبير عن السيرفر ممنوع عقوبه ميوت ٥ ساعات',
  'يمنع المنشن لاكثر من اثنين في شات النشر',
  'يمنع التشهير في عضو او في سيرفر عقوبه بان نهائي',
  'ممنوع نشر تطبيقات التواصل الاجتماعي  = ميوت ساعه',
  'الأحترام واجب و حسن التصرف .',
  'لمن يشتكي على كل شخص يخالف النظام يحصل على رتبه جديده',
  'ومع الوقت سيتم إضافة لها صلاحيات تم اضافة لها روم خاص فيك',
];

const supportRules = [
  'يمنع إزعاج فريق الدعم الفني أو إرسال رسائل مزعجة ومتكررة.',
  'يمنع السبام أو تكرار فتح تذاكر الدعم الفني بدون حاجة.',
  'يمنع الاستهبال أو فتح التذاكر بدون سبب أو استخدامها بطريقة غير جادة.',
  'يجب احترام فريق الدعم الفني والتعامل معهم بأدب واحترام.',
];

function BuildingIcon({ size = 19 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 21h18M6 21V5l6-3 6 3v16M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1" /></svg>;
}

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const current = navItems.find((item) => item.href === location);
    document.title = current ? `${current.label} | عرب شير` : 'عرب شير | مجتمع عربي';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="arab-page" dir="rtl">
      <header className="nav-wrap">
        <div className="site-container nav-inner">
          <Link href="/" className="brand-lockup" data-testid="link-brand">
            <img src={asset('assets-arab-share-Cnao8nVL.png')} alt="شعار مجتمع عرب شير" />
            <span><strong>عرب شير</strong><small>خدمة عربية</small></span>
          </Link>
          <nav className="nav-links" aria-label="التنقل الرئيسي">
            {navItems.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? 'active' : ''} data-testid={`link-nav-${item.href === '/' ? 'home' : item.href.slice(1)}`}>{item.label}</Link>)}
          </nav>
          <a className="button-primary nav-cta desktop-cta" href={inviteUrl} target="_blank" rel="noreferrer" data-testid="link-nav-invite">انضم إلى المجتمع <ExternalLink size={16} aria-hidden="true" /></a>
          <button className="hamburger" type="button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
        <nav className={`site-container mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="قائمة الهاتف">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? 'active' : ''} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${item.href === '/' ? 'home' : item.href.slice(1)}`}>{item.label}</Link>)}
          <a className="button-primary nav-cta" href={inviteUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} data-testid="link-mobile-invite">انضم إلى المجتمع <ExternalLink size={16} aria-hidden="true" /></a>
        </nav>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img className="footer-logo" src={asset('assets-arab-share-Cnao8nVL.png')} alt="شعار مجتمع عرب شير" />
            <h3>Arab Share | عرب شير</h3><span className="footer-service-label">خدمة عربية</span>
            <p>مرحبًا بكم في سيرفر عرب شير، مجتمع عربي يهدف إلى توفير بيئة مميزة لأعضائه.</p>
          </div>
          <div><h3>استكشف</h3>{navItems.map((item) => <Link key={item.href} href={item.href} data-testid={`link-footer-${item.href === '/' ? 'home' : item.href.slice(1)}`}>{item.label}</Link>)}</div>
          <div><h3>على تواصل</h3><p>الباب مفتوح دائماً لمن يبحث عن مساحة عربية مرتبة وموثوقة.</p><a className="button-primary footer-cta" href={inviteUrl} target="_blank" rel="noreferrer" data-testid="link-footer-invite">انضم إلى السيرفر <ArrowUpLeft size={14} aria-hidden="true" /></a></div>
        </div>
        <div className="footer-bottom"><span>© Arab Share — جميع الحقوق محفوظة</span><span>خدمة عربية</span></div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="site-container hero-grid">
          <div className="hero-copy reveal"><div className="eyebrow">Arab Share / خدمة عربية</div><h1>مرحبًا بك في<br /><span>عرب شير</span></h1><p className="hero-lead">مجتمع عربي يجمعنا</p>
            <div className="hero-actions"><a className="button-primary" href={inviteUrl} target="_blank" rel="noreferrer" data-testid="link-hero-invite">انضم إلى سيرفر عرب شير <ExternalLink size={17} aria-hidden="true" /></a><a className="button-primary button-admin-apply" href={adminApplicationUrl} target="_blank" rel="noreferrer" data-testid="link-hero-admin-application">تقديم على الطاقم الإداري <ArrowUpLeft size={17} aria-hidden="true" /></a><Link className="button-quiet" href="/rooms" data-testid="link-hero-rooms">اكتشف الرومات <ChevronLeft size={17} aria-hidden="true" /></Link></div>
          </div>
          <div className="hero-art reveal reveal-delay-2"><img className="hero-logo" src={asset('assets-arab-share-Cnao8nVL.png')} alt="شعار مجتمع عرب شير" data-testid="img-hero-logo" /><div className="hero-stamp"><b>عرب شير</b>مساحة تجمعنا</div></div>
        </div>
      </section>
      <section className="section"><div className="site-container"><div className="section-heading"><div><div className="kicker">تعريف مؤقت</div><h2>نبذة عن عرب شير</h2></div><p>مرحبًا بكم في سيرفر عرب شير، مجتمع عربي يهدف إلى توفير بيئة مميزة لأعضائه. هذا النص مؤقت وقابل للاستبدال من هذا الملف.</p></div></div></section>
      <section className="stats-strip" aria-labelledby="stats-title"><div className="site-container"><div className="section-heading compact-heading"><div><div className="kicker">الأرقام الحالية</div><h2 id="stats-title">إحصائيات السيرفر</h2></div></div><div className="stats-grid">{stats.map((stat, index) => <div className="stat reveal" key={stat.label} data-testid={`stat-community-${index}`}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div></section>
      <section className="section"><div className="site-container"><div className="section-heading"><div><div className="kicker">محتوى مؤقت</div><h2>قوانين السيرفر</h2></div><p>سيتم استبدال هذه العناصر بالقوانين الرسمية عند إرسالها واعتمادها.</p></div><div className="rules-list">{rules.map((rule, index) => <div className="rule-item" key={rule} data-testid={`rule-placeholder-${index}`}><span className="rule-number">0{index + 1}</span><span>{rule}</span></div>)}</div></div></section>
      <section className="cta-band"><div className="site-container"><div className="cta-box glass"><div><h2>خذ مكانك بيننا.</h2><p>الرابط الرسمي للمجتمع — يفتح في نافذة جديدة.</p></div><a className="button-primary" href={inviteUrl} target="_blank" rel="noreferrer" data-testid="link-cta-invite">انضم الآن <ExternalLink size={17} aria-hidden="true" /></a></div></div></section>
    </>
  );
}

function PageHero({ eyebrow, title, children, className = '' }: { eyebrow: string; title: string; children: ReactNode; className?: string }) {
  return <section className={`page-hero ${className}`}><div className="site-container page-title reveal"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{children}</p></div></section>;
}

function Admins() {
  return <><PageHero eyebrow="الوجوه خلف المساحة" title="مسؤولو عرب شير">فريق الإدارة هو جزء من هوية المجتمع. هذه السجلات مؤقتة إلى أن يتم اعتماد الأسماء والأدوار الرسمية.</PageHero><section className="section"><div className="site-container"><div className="section-heading"><div><div className="kicker">الفريق</div><h2>إدارة تُرى<br />وتُعرف.</h2></div><p>لا صور أو أسماء نهائية في الوقت الحالي. ستظهر البيانات المعتمدة هنا كما هي.</p></div><div className="admin-grid">{admins.map((admin) => <article className="admin-card glass reveal" key={admin.id} data-testid={`card-admin-${admin.id}`}><img className="admin-photo" src={asset(admin.image)} alt={`صورة ${admin.name}`} /><div className="admin-info"><h3>{admin.name}</h3><span className="admin-role">{admin.role}</span><p>{admin.description || 'لا يوجد وصف إضافي.'}</p></div></article>)}</div></div></section></>;
}

function Rooms() {
  const [query, setQuery] = useState('');
  const filteredRooms = rooms.filter((room) => room.name.includes(query) || room.description.includes(query));
  return <><PageHero eyebrow="مسارات داخل المجتمع" title="رومات عرب شير">كل روم له إيقاعه. نتريث في نشر الروابط حتى تكون البيانات رسمية ومكتملة — لا روابط وهمية هنا.</PageHero><section className="section"><div className="site-container"><div className="rooms-toolbar"><span className="rooms-count" data-testid="text-rooms-count">{filteredRooms.length} من {rooms.length} رومات</span><label className="search-box"><Search size={17} aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث في الرومات" aria-label="ابحث في الرومات" data-testid="input-room-search" /></label></div>{filteredRooms.length ? <div className="rooms-grid">{filteredRooms.map((room) => { const Icon = room.icon; return <a className="room-card glass" href={room.url} target="_blank" rel="noreferrer" key={room.id} data-testid={`card-room-${room.id}`}><img className="room-image" src={asset(room.image)} alt="" /><div className="room-content"><div><h3>{room.name}</h3><p>{room.description}</p></div><span className="room-open"><Icon size={18} aria-hidden="true" /><ExternalLink size={10} aria-hidden="true" /></span></div></a>; })}</div> : <div className="empty-state" data-testid="empty-rooms">لا توجد رومات مطابقة لبحثك.</div>}</div></section></>;
}

function Publishing() {
  return <><PageHero eyebrow="مساحة الأفكار" title="نظام النشر">مكان مخصص للمحتوى الذي يستحق أن يصل. التفاصيل الرسمية لنظام النشر ما زالت قيد التجهيز.</PageHero><section className="section"><div className="site-container publish-grid"><article className="publish-card glass"><div className="kicker">عن النظام</div><h2>فيما يلي التعليمات المعتمدة للنشر داخل سيرفر عرب شير.</h2><div className="publish-rules">{publishingRules.map((rule, index) => <div className="publish-rule" key={rule}><span className="rule-number">0{index + 1}</span><span>{rule}</span></div>)}</div></article><aside className="notes-card glass"><div className="kicker">ملاحظات</div><h2>النشر باحترام.</h2><div className="publishing-notes"><p>هنا النشر فقط يمنع النشر والسوالف في شات النشر</p><p>ملاحظة قابله للتعديل في اي وقت</p><p>شاكرين لكم على حسن ظنكم</p></div><div className="placeholder-note"><Sparkles size={14} aria-hidden="true" /> محتوى قابل للتعديل عند الحاجة.</div></aside></div></section></>;
}

function Support() {
  return <><PageHero eyebrow="نحن هنا للمساعدة" title="الدعم الفني" className="support-hero">للوصول إلى فريق الدعم الفني وفتح تذكرة، استخدم الزر الرسمي أدناه.<br /><a className="button-primary support-button" href={supportUrl} target="_blank" rel="noreferrer" data-testid="link-support-open">فتح الدعم الفني <ExternalLink size={17} aria-hidden="true" /></a></PageHero><section className="section"><div className="site-container"><div className="section-heading"><div><div className="kicker">إرشادات التواصل</div><h2>قوانين الدعم الفني</h2></div><p>للحفاظ على تجربة واضحة ومحترمة، يرجى الالتزام بالقواعد التالية عند التواصل مع فريق الدعم.</p></div><div className="support-rule-grid">{supportRules.map((rule, index) => <article className="support-rule glass reveal" key={rule} data-testid={`card-support-rule-${index}`}><div className="support-rule-icon"><Headphones size={20} /></div><span className="rule-number">0{index + 1}</span><p>{rule}</p></article>)}</div><div className="support-note glass"><ShieldCheck size={19} aria-hidden="true" /><span>للدخول إلى الدعم الفني، استخدم الرابط الرسمي فقط.</span></div></div></section></>;
}

function NotFound() {
  return <section className="page-hero"><div className="site-container page-title"><div className="eyebrow">404</div><h1>هذه الصفحة غير موجودة</h1><p>ربما تغيّر الطريق، لكن مساحة عرب شير ما زالت هنا.</p><Link className="button-primary support-button" href="/" data-testid="link-not-found-home">العودة للرئيسية <ChevronLeft size={16} /></Link></div></section>;
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/admins" component={Admins} /><Route path="/rooms" component={Rooms} /><Route path="/publishing" component={Publishing} /><Route path="/support" component={Support} /><Route component={NotFound} /></Switch>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Shell><Router /></Shell></WouterRouter>;
}

export default App;