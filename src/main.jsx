import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, ChevronRight, Heart, Menu, X } from 'lucide-react';
import './styles.css';

const products = [
  { name: 'Riwaaj', type: 'Traditional / Hand-finished', category: 'Traditional', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85' },
  { name: 'Rozana', type: 'Everyday / Soft cotton', category: 'Daily wear', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85' },
  { name: 'Mehfil', type: 'Embroidered / Occasion', category: 'Embroidered', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85' },
  { name: 'Satrangi', type: 'Classic / Easy drape', category: 'Classic', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85' },
];

const gallery = [
  { title: 'Soft beginnings', image: products[1].image },
  { title: 'Riwaaj detail', image: products[0].image },
  { title: 'An evening edit', image: products[2].image },
  { title: 'Everyday colour', image: products[3].image },
  { title: 'The finishing touch', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Made to measure', image: products[0].image },
];

function GarmentStage() {
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
    <div className="stage-label">simple shalwar kameez</div>
    <button className="garment-stage photo-stage" onClick={() => setPreviewOpen(true)} onPointerMove={moveImage} onPointerLeave={resetImage} onKeyDown={(event) => { if (event.key === 'Escape') setPreviewOpen(false); }} style={{ '--image-x': `${imageOffset.x}px`, '--image-y': `${imageOffset.y}px` }} aria-label="Open shalwar kameez image preview">
      <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=90" alt="Simple shalwar kameez in a warm maroon tone" />
      <div className="garment-caption"><span>01</span><b>THE RIWAAJ SET</b><small>Gilgiti inspired · made to measure</small></div>
      <span className="photo-action">View detail <ArrowUpRight size={14} /></span>
    </button>
    {previewOpen && <div className="lightbox hero-lightbox" role="dialog" aria-label="Shalwar kameez preview" onClick={() => setPreviewOpen(false)}><button onClick={() => setPreviewOpen(false)} aria-label="Close image preview"><X /></button><img onClick={(event) => event.stopPropagation()} src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=90" alt="Large view of a simple shalwar kameez" /></div>}
  </div>;
}

function SiteHeader({ menuOpen, setMenuOpen, solid = false }) {
  const links = [['Dresses', 'dresses'], ['Our story', 'about'], ['Process', 'process'], ['Gallery', 'gallery'], ['Contact', 'contact']];
  return <nav className={`nav ${solid ? 'solid-nav' : ''}`}><a className="brand" href="#home" onClick={() => setMenuOpen(false)}>FETOI <small>GILGITI LADIES WEAR</small></a><div className={`nav-links ${menuOpen ? 'open' : ''}`}>{links.map(([label, hash]) => <a href={`#${hash}`} key={hash} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-order" href="#contact" onClick={() => setMenuOpen(false)}>Order local <ArrowUpRight size={15} /></a></div><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></nav>;
}

function ProductCard({ product, favorite, onFavorite }) {
  return <article className="product"><div className="product-image"><img src={product.image} alt={`${product.name} FETOI collection`} /><span>{product.category}</span><button className={`favorite-button ${favorite ? 'active' : ''}`} onClick={() => onFavorite(product.name)} aria-label={`${favorite ? 'Remove' : 'Add'} ${product.name} favorite`}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button></div><div className="product-meta"><h3>{product.name}</h3><p>{product.type}</p><span>Contact for price</span></div></article>;
}

function DressesPage() {
  const [filter, setFilter] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const categories = ['All', ...new Set(products.map((product) => product.category))];
  const visible = filter === 'All' ? products : products.filter((product) => product.category === filter);
  const toggleFavorite = (name) => setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  return <PageShell eyebrow="The full edit" title={<>Dresses made<br /><i>for your life.</i></>} intro="Explore simple, elegant shalwar kameez styles, stitched locally and finished with care."><div className="filter-row">{categories.map((category) => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>)}<span>{visible.length} pieces</span></div><div className="product-grid full-grid">{visible.map((product) => <ProductCard key={product.name} product={product} favorite={favorites.includes(product.name)} onFavorite={toggleFavorite} />)}</div></PageShell>;
}

function ProcessPage() {
  const steps = [['01', 'Fabric selection', 'Choose a fabric based on your preferred style, season and comfort.'], ['02', 'Cutting', 'We take precise measurements and cut each panel to your shape.'], ['03', 'Stitching', 'Careful stitching brings the silhouette together with clean finishing.'], ['04', 'Quality check', 'Every dress is reviewed, pressed and prepared before it leaves us.'], ['05', 'Ready for you', 'Your finished piece is ready for collection or local delivery.']];
  return <PageShell eyebrow="The making" title={<>From first cut<br />to <i>final stitch.</i></>} intro="Good clothes take time. Here is how a FETOI piece moves from an idea to something you can live in."><div className="process-list">{steps.map(([number, title, text]) => <div className="process-row" key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p><Check size={18} /></div>)}</div></PageShell>;
}

function AboutPage() {
  return <PageShell eyebrow="Our story" title={<>Rooted in Gilgit,<br /><i>made for you.</i></>} intro="FETOI is a local ladieswear stitching studio creating shalwar kameez inspired by Gilgit-Baltistan's colour, craft and landscape."><div className="about-split"><img src={products[0].image} alt="FETOI traditional clothing detail" /><div><p>We believe the best clothes feel both familiar and entirely your own. Our work brings traditional references into comfortable silhouettes, with room for your preferences at every step.</p><p>From the first conversation to the final press, we work closely with local customers to create pieces that fit their lives, their celebrations and their sense of style.</p><div className="stats"><div><b>Local</b><span>Made in Gilgit</span></div><div><b>Custom</b><span>Stitched for you</span></div><div><b>Careful</b><span>Finished by hand</span></div></div></div></div></PageShell>;
}

function GalleryPage() {
  const [selected, setSelected] = useState(null);
  const move = (amount) => setSelected((current) => (current === null ? 0 : (current + amount + gallery.length) % gallery.length));
  return <PageShell eyebrow="The gallery" title={<>Our dresses,<br /><i>your style.</i></>} intro="A growing collection of colours, textures and details from the FETOI studio."><div className="gallery-grid">{gallery.map((item, index) => <button className={`gallery-tile tile-${index + 1}`} onClick={() => setSelected(index)} key={`${item.title}-${index}`}><img src={item.image} alt={item.title} /><span>{item.title}</span></button>)}</div>{selected !== null && <div className="lightbox" role="dialog" aria-label={gallery[selected].title} onClick={() => setSelected(null)}><button onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Previous image"><ChevronLeft /></button><img src={gallery[selected].image} alt={gallery[selected].title} /><button onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Next image"><ChevronRight /></button></div>}</PageShell>;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return <PageShell eyebrow="Come by, say hello" title={<>Let's stitch<br /><i>something beautiful.</i></>} intro="Have a design in mind? Tell us what you are looking for and we will get back to you shortly."><div className="contact-layout"><div className="contact-details"><p>Gilgit-Baltistan, Pakistan</p><a href="tel:+923000000000">+92 300 0000000</a><a href="mailto:hello@fetoi.pk">hello@fetoi.pk</a><a href="https://wa.me/923000000000">WhatsApp us <ArrowUpRight size={15} /></a></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Your name<input required placeholder="How should we call you?" /></label><label>Phone number<input required type="tel" placeholder="03XX XXXXXXX" /></label><label>Dress type<select required defaultValue=""><option value="" disabled>Select a dress type</option><option>Shalwar Kameez</option><option>Traditional Gilgiti Dress</option><option>Embroidered Suit</option><option>Custom Design</option></select></label><label>Tell us a little more<textarea rows="4" placeholder="Colour, fabric, measurements or occasion" /></label><button className="button primary" type="submit">{sent ? 'Enquiry sent' : 'Send enquiry'} <ArrowUpRight size={16} /></button>{sent && <p className="form-success"><Check size={15} /> Thank you. We will contact you shortly.</p>}</form></div></PageShell>;
}

function PageShell({ eyebrow, title, intro, children }) {
  return <section className="inner-page"><div className="page-heading"><p className="section-kicker">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div><div className="page-content">{children}</div></section>;
}

function App() {
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
    <section className="hero" id="top"><div className="mountain-bg" /><div className="hero-grain" /><div className="hero-copy"><p className="eyebrow"><span /> Local craft · Gilgit heritage · modern style</p><h1>Tradition,<br /><em>tailored</em> for you.</h1><p className="hero-intro">Beautifully stitched ladieswear, rooted in the colours, craft and quiet confidence of Gilgit-Baltistan.</p><div className="hero-actions"><a className="button primary" href="#collection">Explore dresses <ArrowDown size={16} /></a><a className="text-link" href="#order">Order custom stitching <ArrowUpRight size={16} /></a></div></div><GarmentStage /><div className="scroll-hint"><span>Scroll to discover</span><ArrowDown size={15} /></div><div className="hero-index">01 <span>/</span> 06</div></section>
    <section className="intro-band"><p className="section-kicker">A local point of view</p><h2>Wear something<br /><i>that belongs</i> to you.</h2><p className="intro-text">From our little studio in Gilgit, every FETOI piece carries a hand in its making. We pair time-honoured detail with silhouettes made for your actual life.</p></section>
    <section className="collection" id="collection"><div className="section-heading"><div><p className="section-kicker">The edit / 01</p><h2>Made for the<br /><i>everyday extraordinary.</i></h2></div><a className="text-link dark" href="#order">View all pieces <ArrowUpRight size={16} /></a></div><div className="product-grid">{products.map((product, index) => <article className="product" key={product.name}><div className="product-image"><img src={product.image} alt={`${product.name} FETOI collection`} /><span>0{index + 1}</span><button aria-label={`View ${product.name}`}><ArrowUpRight size={18} /></button></div><div className="product-meta"><h3>{product.name}</h3><p>{product.type}</p><span>Contact for price</span></div></article>)}</div></section>
    <section className="process" id="process"><div className="process-image" /><div className="process-copy"><p className="section-kicker">The making / 02</p><h2>From first cut<br />to <i>final stitch.</i></h2><p>Good clothes take time. We take care with every measurement, seam and finishing touch, so your dress feels considered from the inside out.</p><div className="steps"><div><b>01</b><span>Choose your fabric</span></div><div><b>02</b><span>Measure & refine</span></div><div><b>03</b><span>Stitch & deliver</span></div></div><a className="button dark-button" href="#order">Start your order <ArrowUpRight size={16} /></a></div></section>
    <section className="order" id="order"><div><p className="section-kicker">Come by, say hello</p><h2>Let's stitch<br /><i>something beautiful.</i></h2></div><form onSubmit={(event) => event.preventDefault()}><label>Your name<input required placeholder="How should we call you?" /></label><label>Phone number<input required type="tel" placeholder="03XX XXXXXXX" /></label><label>What are you looking for?<select defaultValue=""><option value="" disabled>Select a dress type</option><option>Shalwar Kameez</option><option>Traditional Gilgiti Dress</option><option>Custom Design</option></select></label><button className="button primary" type="submit">Send enquiry <ArrowUpRight size={16} /></button></form></section>
    <footer><a className="brand" href="#top">FETOI <small>GILGITI LADIES WEAR</small></a><p>Tradition · Quality · You</p><span>© 2026 FETOI · Gilgit-Baltistan, Pakistan</span></footer>
  </main>;
}

function Footer() {
  return <footer><a className="brand" href="#home">FETOI <small>GILGITI LADIES WEAR</small></a><p>Tradition · Quality · You</p><span>© 2026 FETOI · Gilgit-Baltistan, Pakistan</span></footer>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);