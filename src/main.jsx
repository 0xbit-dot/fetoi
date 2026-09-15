import { createContext, StrictMode, useContext, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, ChevronRight, Heart, Menu, X } from 'lucide-react';
import './styles.css';

const LanguageContext = createContext(null);
const translations = {
  ur: {
    dresses: 'ملبوسات', story: 'ہماری کہانی', process: 'طریقۂ کار', gallery: 'گیلری', contact: 'رابطہ', order: 'مقامی آرڈر',
    localCraft: 'مقامی ہنر · گلگت کا ورثہ · جدید انداز', heroTitle: 'روایت، آپ کے لیے سلی ہوئی', heroIntro: 'گلگت بلتستان کے رنگوں، ہنر اور پُرسکون اعتماد سے متاثر خوبصورت خواتین کے ملبوسات۔', explore: 'ملبوسات دیکھیں', custom: 'اپنی سلائی کا آرڈر دیں',
    localPoint: 'ایک مقامی انداز', belong: 'ایسا لباس پہنیں جو آپ کا ہو', localText: 'گلگت کے ہمارے چھوٹے سے اسٹوڈیو میں ہر FETOI لباس محبت سے تیار ہوتا ہے۔ روایتی تفصیل کو آپ کی روزمرہ زندگی کے آرام دہ انداز کے ساتھ جوڑا جاتا ہے۔', edit: 'منتخب انداز / ۰۱', extraordinary: 'روزمرہ کو خاص بنائیں', viewAll: 'تمام ملبوسات دیکھیں', making: 'تیاری کا عمل / ۰۲', firstCut: 'پہلی کٹ سے آخری سلائی تک', makingText: 'اچھے لباس میں وقت لگتا ہے۔ ہر ناپ، سلائی اور آخری تفصیل پر ہم پوری توجہ دیتے ہیں۔', startOrder: 'اپنا آرڈر شروع کریں', hello: 'آئیے، بات کرتے ہیں', beautiful: 'آئیے کچھ خوبصورت سیتے ہیں', tradition: 'روایت · معیار · آپ', simple: 'سادہ شلوار قمیض', detail: 'تفصیل دیکھیں', close: 'تصویر بند کریں',
    fullEdit: 'مکمل مجموعہ', dressesTitle: 'آپ کی زندگی کے لیے ملبوسات', dressesIntro: 'سادہ اور نفیس شلوار قمیض، مقامی طور پر تیار اور محبت سے مکمل۔', all: 'سب', pieces: 'ملبوسات', contactPrice: 'قیمت کے لیے رابطہ کریں',
    makingTitle: 'پہلی کٹ سے آخری سلائی تک', makingIntro: 'اچھے لباس میں وقت لگتا ہے۔ FETOI کا لباس خیال سے تیار ہونے کے مراحل دیکھیں۔', storyEyebrow: 'ہماری کہانی', storyTitle: 'گلگت سے جڑے، آپ کے لیے بنے', storyIntro: 'FETOI گلگت بلتستان کے رنگ، ہنر اور قدرتی حسن سے متاثر مقامی خواتین کے ملبوسات کا اسٹوڈیو ہے۔', galleryEyebrow: 'گیلری', galleryTitle: 'آپ کا انداز، ہمارے ملبوسات', galleryIntro: 'FETOI اسٹوڈیو کے رنگوں، کپڑوں اور نفیس تفصیلات کا مجموعہ۔', contactEyebrow: 'آئیے، بات کرتے ہیں', contactTitle: 'آئیے کچھ خوبصورت سیتے ہیں', contactIntro: 'کیا آپ کے ذہن میں کوئی ڈیزائن ہے؟ ہمیں بتائیں، ہم جلد آپ سے رابطہ کریں گے۔', name: 'آپ کا نام', phone: 'فون نمبر', dressType: 'لباس کی قسم', details: 'مزید تفصیل', choose: 'لباس کی قسم منتخب کریں', send: 'استفسار بھیجیں', sent: 'استفسار بھیج دیا گیا', thankYou: 'شکریہ، ہم جلد آپ سے رابطہ کریں گے۔', language: 'English', local: 'گلگت بلتستان، پاکستان', whatsapp: 'واٹس ایپ پر رابطہ کریں', madeGilgit: 'گلگت میں تیار', customMade: 'آپ کے ناپ کا', careful: 'محنت سے مکمل',
  },
  en: {
    dresses: 'Dresses', story: 'Our story', process: 'Process', gallery: 'Gallery', contact: 'Contact', order: 'Order local', localCraft: 'Local craft · Gilgit heritage · modern style', heroTitle: 'Tradition, tailored for you.', heroIntro: 'Beautifully stitched ladieswear, rooted in the colours, craft and quiet confidence of Gilgit-Baltistan.', explore: 'Explore dresses', custom: 'Order custom stitching', localPoint: 'A local point of view', belong: 'Wear something that belongs to you.', localText: 'From our little studio in Gilgit, every FETOI piece carries a hand in its making. We pair time-honoured detail with silhouettes made for your actual life.', edit: 'The edit / 01', extraordinary: 'Made for the everyday extraordinary.', viewAll: 'View all pieces', making: 'The making / 02', firstCut: 'From first cut to final stitch.', makingText: 'Good clothes take time. We take care with every measurement, seam and finishing touch.', startOrder: 'Start your order', hello: 'Come by, say hello', beautiful: "Let's stitch something beautiful.", tradition: 'Tradition · Quality · You', simple: 'simple shalwar kameez', detail: 'View detail', close: 'Close image preview', fullEdit: 'The full edit', dressesTitle: 'Dresses made for your life.', dressesIntro: 'Explore simple, elegant shalwar kameez styles, stitched locally and finished with care.', all: 'All', pieces: 'pieces', contactPrice: 'Contact for price', makingTitle: 'From first cut to final stitch.', makingIntro: 'Good clothes take time. Here is how a FETOI piece moves from an idea to something you can live in.', storyEyebrow: 'Our story', storyTitle: 'Rooted in Gilgit, made for you.', storyIntro: "FETOI is a local ladieswear stitching studio creating shalwar kameez inspired by Gilgit-Baltistan's colour, craft and landscape.", galleryEyebrow: 'The gallery', galleryTitle: 'Our dresses, your style.', galleryIntro: 'A growing collection of colours, textures and details from the FETOI studio.', contactEyebrow: 'Come by, say hello', contactTitle: "Let's stitch something beautiful.", contactIntro: 'Have a design in mind? Tell us what you are looking for and we will get back to you shortly.', name: 'Your name', phone: 'Phone number', dressType: 'Dress type', details: 'Tell us a little more', choose: 'Select a dress type', send: 'Send enquiry', sent: 'Enquiry sent', thankYou: 'Thank you. We will contact you shortly.', language: 'اردو', local: 'Gilgit-Baltistan, Pakistan', whatsapp: 'WhatsApp us', madeGilgit: 'Made in Gilgit', customMade: 'Stitched for you', careful: 'Finished with care',
  },
};

function useLanguage() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  return { language, toggleLanguage, t: (key) => translations[language][key] || key };
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ur');
  const toggleLanguage = () => setLanguage((current) => current === 'ur' ? 'en' : 'ur');
  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr'; }, [language]);
  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>;
}

const products = [
  { name: 'Riwaaj', type: 'Traditional / Hand-finished', category: 'Traditional', image: '/images/riwaaj.jpg' },
  { name: 'Rozana', type: 'Everyday / Soft cotton', category: 'Daily wear', image: '/images/riwaaj.jpg' },
  { name: 'Mehfil', type: 'Embroidered / Occasion', category: 'Embroidered', image: '/images/mehfil.jpg' },
  { name: 'Satrangi', type: 'Classic / Easy drape', category: 'Classic', image: '/images/riwaaj.jpg' },
];

const gallery = [
  { title: 'Soft beginnings', image: products[1].image },
  { title: 'Riwaaj detail', image: products[0].image },
  { title: 'An evening edit', image: products[2].image },
  { title: 'Everyday colour', image: products[3].image },
  { title: 'The finishing touch', image: '/images/process.jpg' },
  { title: 'Made to measure', image: products[0].image },
];

function GarmentStage() {
  const { t } = useLanguage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const resetImage = () => setImageOffset({ x: 0, y: 0 });
  const moveImage = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setImageOffset({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 12,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 12,
    });
  };
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (previewOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [previewOpen]);
  return <div className="garment-wrap">
    <div className="stage-label">{t('simple')}</div>
    <button className="garment-stage photo-stage" onClick={() => setPreviewOpen(true)} onPointerMove={moveImage} onPointerLeave={resetImage} onKeyDown={(event) => { if (event.key === 'Escape') setPreviewOpen(false); }} style={{ '--image-x': `${imageOffset.x}px`, '--image-y': `${imageOffset.y}px` }} aria-label={t('detail')}>
      <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=90" alt={t('simple')} />
        <img src="/images/riwaaj.jpg" alt={t('simple')} />
      <div className="garment-caption"><span>۰۱</span><b>RIWAAJ</b><small>گلگتی انداز · آپ کے ناپ کا</small></div>
      <span className="photo-action">{t('detail')} <ArrowUpRight size={14} /></span>
    </button>
    {previewOpen && <div className="lightbox hero-lightbox" role="dialog" aria-label={t('detail')} onClick={() => setPreviewOpen(false)}><button onClick={() => setPreviewOpen(false)} aria-label={t('close')}><X /></button><img onClick={(event) => event.stopPropagation()} src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=90" alt={t('simple')} /></div>}
    {previewOpen && <div className="lightbox hero-lightbox" role="dialog" aria-label={t('detail')} onClick={() => setPreviewOpen(false)}><button onClick={() => setPreviewOpen(false)} aria-label={t('close')}><X /></button><img onClick={(event) => event.stopPropagation()} src="/images/riwaaj.jpg" alt={t('simple')} /></div>}
  </div>;
}

function SiteHeader({ menuOpen, setMenuOpen, solid = false }) {
  const { t, toggleLanguage, language } = useLanguage();
  const links = [[t('dresses'), 'dresses'], [t('story'), 'about'], [t('process'), 'process'], [t('gallery'), 'gallery'], [t('contact'), 'contact']];
  return <nav className={`nav ${solid ? 'solid-nav' : ''}`}><a className="brand" href="#home" onClick={() => setMenuOpen(false)}>FETOI <small>GILGITI LADIES WEAR</small></a><div className={`nav-links ${menuOpen ? 'open' : ''}`}>{links.map(([label, hash]) => <a href={`#${hash}`} key={hash} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-order" href="#contact" onClick={() => setMenuOpen(false)}>{t('order')} <ArrowUpRight size={15} /></a><button className="language-button" onClick={toggleLanguage} aria-label={`Switch to ${t('language')}`}>{t('language')}</button></div><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></nav>;
}

function ProductCard({ product, favorite, onFavorite }) {
  const { t, language } = useLanguage();
  const categoryLabels = language === 'ur' ? { Traditional: 'روایتی', 'Daily wear': 'روزمرہ', Embroidered: 'کڑھائی', Classic: 'کلاسک' } : {};
  const typeLabels = language === 'ur' ? { 'Traditional / Hand-finished': 'روایتی / نفیس تکمیل', 'Everyday / Soft cotton': 'روزمرہ / نرم کپڑا', 'Embroidered / Occasion': 'کڑھائی / تقریبات', 'Classic / Easy drape': 'کلاسک / آرام دہ' } : {};
  return <article className="product"><div className="product-image"><img src={product.image} alt={`${product.name} FETOI collection`} /><span>{categoryLabels[product.category] || product.category}</span><button className={`favorite-button ${favorite ? 'active' : ''}`} onClick={() => onFavorite(product.name)} aria-label={`${favorite ? 'Remove' : 'Add'} ${product.name} favorite`}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button></div><div className="product-meta"><h3>{product.name}</h3><p>{typeLabels[product.type] || product.type}</p><span>{t('contactPrice')}</span></div></article>;
}

function DressesPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const categories = ['All', ...new Set(products.map((product) => product.category))];
  const visible = filter === 'All' ? products : products.filter((product) => product.category === filter);
  const toggleFavorite = (name) => setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  return <PageShell eyebrow={t('fullEdit')} title={<>{t('dressesTitle')}</>} intro={t('dressesIntro')}><div className="filter-row">{categories.map((category) => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{filter === category && category === 'All' ? t('all') : category}</button>)}<span>{visible.length} {t('pieces')}</span></div><div className="product-grid full-grid">{visible.map((product) => <ProductCard key={product.name} product={product} favorite={favorites.includes(product.name)} onFavorite={toggleFavorite} />)}</div></PageShell>;
}

function ProcessPage() {
  const { t, language } = useLanguage();
  const steps = language === 'ur' ? [['۰۱', 'کپڑے کا انتخاب', 'اپنے انداز، موسم اور آرام کے مطابق کپڑا منتخب کریں۔'], ['۰۲', 'کٹنگ', 'درست ناپ لے کر ہر حصے کو آپ کی ساخت کے مطابق کاٹا جاتا ہے۔'], ['۰۳', 'سلائی', 'صاف تکمیل کے ساتھ احتیاط سے سلائی کی جاتی ہے۔'], ['۰۴', 'معیار کی جانچ', 'ترسیل سے پہلے ہر لباس کو اچھی طرح دیکھا اور استری کیا جاتا ہے۔'], ['۰۵', 'آپ کے لیے تیار', 'آپ کا مکمل لباس وصولی یا مقامی ترسیل کے لیے تیار ہے۔']] : [['01', 'Fabric selection', 'Choose a fabric based on your preferred style, season and comfort.'], ['02', 'Cutting', 'We take precise measurements and cut each panel to your shape.'], ['03', 'Stitching', 'Careful stitching brings the silhouette together with clean finishing.'], ['04', 'Quality check', 'Every dress is reviewed, pressed and prepared before it leaves us.'], ['05', 'Ready for you', 'Your finished piece is ready for collection or local delivery.']];
  return <PageShell eyebrow={t('making')} title={<>{t('makingTitle')}</>} intro={t('makingIntro')}><div className="process-list">{steps.map(([number, title, text]) => <div className="process-row" key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p><Check size={18} /></div>)}</div></PageShell>;
}

function AboutPage() {
  const { t } = useLanguage();
  return <PageShell eyebrow={t('storyEyebrow')} title={<>{t('storyTitle')}</>} intro={t('storyIntro')}><div className="about-split"><img src={products[0].image} alt={t('storyTitle')} /><div><p>ہم سمجھتے ہیں کہ بہترین لباس مانوس بھی ہو اور بالکل آپ کا اپنا بھی۔ ہمارا کام روایتی حوالوں کو آرام دہ اور جدید انداز میں پیش کرتا ہے۔</p><p>پہلی گفتگو سے آخری استری تک، ہم مقامی صارفین کے ساتھ مل کر ایسا لباس بناتے ہیں جو ان کی زندگی، تقریبات اور پسند کے مطابق ہو۔</p><div className="stats"><div><b>{t('local')}</b><span>{t('madeGilgit')}</span></div><div><b>{t('custom')}</b><span>{t('customMade')}</span></div><div><b>{t('careful')}</b><span>{t('careful')}</span></div></div></div></div></PageShell>;
}

function GalleryPage() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const move = (amount) => setSelected((current) => (current === null ? 0 : (current + amount + gallery.length) % gallery.length));
  return <PageShell eyebrow={t('galleryEyebrow')} title={<>{t('galleryTitle')}</>} intro={t('galleryIntro')}><div className="gallery-grid">{gallery.map((item, index) => <button className={`gallery-tile tile-${index + 1}`} onClick={() => setSelected(index)} key={`${item.title}-${index}`}><img src={item.image} alt={item.title} /><span>{item.title}</span></button>)}</div>{selected !== null && <div className="lightbox" role="dialog" aria-label={gallery[selected].title} onClick={() => setSelected(null)}><button onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Previous image"><ChevronLeft /></button><img src={gallery[selected].image} alt={gallery[selected].title} /><button onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Next image"><ChevronRight /></button></div>}</PageShell>;
}

function ContactPage() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  return <PageShell eyebrow={t('contactEyebrow')} title={<>{t('contactTitle')}</>} intro={t('contactIntro')}><div className="contact-layout"><div className="contact-details"><p>{t('local')}</p><a href="tel:+923000000000">+92 300 0000000</a><a href="mailto:hello@fetoi.pk">hello@fetoi.pk</a><a href="https://wa.me/923000000000">{t('whatsapp')} <ArrowUpRight size={15} /></a></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>{t('name')}<input required placeholder={t('name')} /></label><label>{t('phone')}<input required type="tel" placeholder="03XX XXXXXXX" /></label><label>{t('dressType')}<select required defaultValue=""><option value="" disabled>{t('choose')}</option><option>شلوار قمیض</option><option>گلگتی لباس</option><option>کڑھائی والا سوٹ</option><option>اپنی مرضی کا ڈیزائن</option></select></label><label>{t('details')}<textarea rows="4" placeholder="رنگ، کپڑا، ناپ یا تقریب" /></label><button className="button primary" type="submit">{sent ? t('sent') : t('send')} <ArrowUpRight size={16} /></button>{sent && <p className="form-success"><Check size={15} /> {t('thankYou')}</p>}</form></div></PageShell>;
}

function PageShell({ eyebrow, title, intro, children }) {
  return <section className="inner-page"><div className="page-heading"><p className="section-kicker">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div><div className="page-content">{children}</div></section>;
}

function App() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(window.location.hash.slice(1) || 'home');
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen]);
  useEffect(() => {
    const updatePage = () => { setPage(window.location.hash.slice(1) || 'home'); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);
  if (page === 'dresses') return <><SiteHeader solid menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><DressesPage /><Footer /></>;
  if (page === 'about') return <><SiteHeader solid menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><AboutPage /><Footer /></>;
  if (page === 'process') return <><SiteHeader solid menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><ProcessPage /><Footer /></>;
  if (page === 'gallery') return <><SiteHeader solid menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><GalleryPage /><Footer /></>;
  if (page === 'contact') return <><SiteHeader solid menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><ContactPage /><Footer /></>;
  return <main>
    <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <section className="hero" id="top"><div className="mountain-bg" /><div className="hero-grain" /><div className="hero-copy"><p className="eyebrow"><span /> {t('localCraft')}</p><h1>{t('heroTitle')}</h1><p className="hero-intro">{t('heroIntro')}</p><div className="hero-actions"><a className="button primary" href="#dresses">{t('explore')} <ArrowDown size={16} /></a><a className="text-link" href="#contact">{t('custom')} <ArrowUpRight size={16} /></a></div></div><GarmentStage /><div className="scroll-hint"><span>نیچے دیکھیں</span><ArrowDown size={15} /></div><div className="hero-index">۰۱ <span>/</span> ۰۶</div></section>
    <section className="intro-band"><p className="section-kicker">{t('localPoint')}</p><h2>{t('belong')}</h2><p className="intro-text">{t('localText')}</p></section>
    <section className="collection" id="collection"><div className="section-heading"><div><p className="section-kicker">{t('edit')}</p><h2>{t('extraordinary')}</h2></div><a className="text-link dark" href="#dresses">{t('viewAll')} <ArrowUpRight size={16} /></a></div><div className="product-grid">{products.map((product, index) => <ProductCard key={product.name} product={product} favorite={false} onFavorite={() => {}} />)}</div></section>
    <section className="process" id="process"><div className="process-image" /><div className="process-copy"><p className="section-kicker">{t('making')}</p><h2>{t('firstCut')}</h2><p>{t('makingText')}</p><div className="steps"><div><b>۰۱</b><span>کپڑا منتخب کریں</span></div><div><b>۰۲</b><span>ناپ اور کٹنگ</span></div><div><b>۰۳</b><span>سلائی اور ترسیل</span></div></div><a className="button dark-button" href="#contact">{t('startOrder')} <ArrowUpRight size={16} /></a></div></section>
    <section className="order" id="order"><div><p className="section-kicker">{t('hello')}</p><h2>{t('beautiful')}</h2></div><form onSubmit={(event) => event.preventDefault()}><label>{t('name')}<input required placeholder={t('name')} /></label><label>{t('phone')}<input required type="tel" placeholder="03XX XXXXXXX" /></label><label>{t('dressType')}<select defaultValue=""><option value="" disabled>{t('choose')}</option><option>شلوار قمیض</option><option>گلگتی لباس</option><option>اپنی مرضی کا ڈیزائن</option></select></label><button className="button primary" type="submit">{t('send')} <ArrowUpRight size={16} /></button></form></section>
    <Footer />
  </main>;
}

function Footer() {
  const { t } = useLanguage();
  return <footer><a className="brand" href="#home">FETOI <small>GILGITI LADIES WEAR</small></a><p>{t('tradition')}</p><span>© ۲۰۲۶ FETOI · {t('local')}</span></footer>;
}

createRoot(document.getElementById('root')).render(<StrictMode><LanguageProvider><App /></LanguageProvider></StrictMode>);