import { useEffect, useState } from 'react';
import { ArrowRight, Check, Layers, Monitor, Pause, Play, Upload, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import restaurant from '@/assets/signage-restaurant.jpg';
import cafe from '@/assets/signage-cafe.jpg';
import retail from '@/assets/signage-retail.jpg';
import gym from '@/assets/signage-gym.jpg';
import salon from '@/assets/signage-salon.jpg';
import hotel from '@/assets/signage-hotel.jpg';
import office from '@/assets/signage-office.jpg';
import event from '@/assets/signage-event.jpg';
import promotion from '@/assets/signage-promotion.jpg';
import seasonal from '@/assets/signage-seasonal.jpg';

const samples = [
  { category: 'Restaurant', image: restaurant, title: 'Big flavor.\nFresh daily.', label: 'THE DAILY KITCHEN', line: 'Your next favorite bite.' },
  { category: 'Café', image: cafe, title: 'Sip slowly.\nStay awhile.', label: 'THE MATCHA CLUB', line: 'A little pause. A better day.' },
  { category: 'Retail', image: retail, title: 'Your style.\nYour next chapter.', label: 'THE EDIT', line: 'Discover the new collection.' },
  { category: 'Gym', image: gym, title: 'Show up.\nGet stronger.', label: 'MOVE STUDIO', line: 'Make today your starting point.' },
  { category: 'Salon', image: salon, title: 'A fresh look.\nA little you-time.', label: 'STUDIO BLOOM', line: 'Make time for yourself.' },
  { category: 'Hotel', image: hotel, title: 'Arrive. Relax.\nFeel at home.', label: 'THE GRAND', line: 'Your stay starts here.' },
  { category: 'Office', image: office, title: 'Good morning.\nGreat ideas ahead.', label: 'WELCOME TO THE TEAM', line: 'A space to do your best work.' },
  { category: 'Event', image: event, title: 'Feel the music.\nLive the moment.', label: 'LIVE SESSIONS', line: 'A night worth remembering.' },
  { category: 'Promotion', image: promotion, title: 'Fresh kicks.\nBig energy.', label: 'IN THE SPOTLIGHT', line: 'Find your next favorite.' },
  { category: 'Seasonal', image: seasonal, title: 'A little magic.\nA lot of joy.', label: 'THE FESTIVE EDIT', line: 'Make the season feel special.' },
] as const;

export function SignageArtwork({ index }: { index: number }) {
  const sample = samples[index] ?? samples[0];
  return <div className="signage-artwork" key={sample.category} data-signage-category={sample.category}>
    <img src={sample.image} alt={`${sample.category} digital signage sample`} width={1536} height={1024} />
    <div className="signage-copy"><span className="signage-brand">{sample.label}</span><div><small>{sample.category.toUpperCase()}</small><h2>{sample.title}</h2><p>{sample.line}</p></div><span className="signage-bottom">LEITBUILT COLLECTION &nbsp; / &nbsp; SAMPLE DISPLAY</span></div>
  </div>;
}

export function SignageShowcase() {
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const transferring = selected !== displayed;
  const selectedSample = samples[selected] ?? samples[0];
  const displayedSample = samples[displayed] ?? samples[0];
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setInterval(() => setSelected(value => (value + 1) % samples.length), 6500);
    return () => window.clearInterval(timer);
  }, [playing, reduced]);
  useEffect(() => {
    const timer = window.setTimeout(() => setDisplayed(selected), reduced ? 0 : 1500);
    return () => window.clearTimeout(timer);
  }, [selected, reduced]);
  const choose = (index: number) => { setPlaying(false); setSelected(index); };
  return <div className="showcase">
    <div className={`device-scene ${transferring ? 'is-transferring' : ''}`} onPointerMove={event => { if (reduced || event.pointerType !== 'mouse') return; const bounds = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 5}deg`); event.currentTarget.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height - .5) * -3}deg`); }} onPointerLeave={event => { event.currentTarget.style.setProperty('--pointer-x', '0deg'); event.currentTarget.style.setProperty('--pointer-y', '0deg'); }}>
      <div className="scene-caption" aria-hidden="true"><span>FROM YOUR LAPTOP</span><span>TO THE BIG SCREEN <ArrowRight size={12} /></span></div>
      <div className="showcase-tv"><div className="television"><div className="tv-screen"><SignageArtwork index={displayed} /></div><div key={`${selected}-${playing}`} className={`screen-progress ${playing && !reduced ? 'is-playing' : ''}`} aria-hidden="true" /></div><div className="tv-neck" /><div className="tv-base" /></div>
      <div className="laptop"><div className="laptop-lid"><div className="laptop-app"><div className="laptop-toolbar"><span><Layers size={11} /> leitbuilt.</span><span className="laptop-status"><span className="live-dot" /> My content</span></div><div className="laptop-workspace"><aside><Layers size={13} /><Monitor size={13} /><Upload size={13} /></aside><div className="laptop-editor"><div className="laptop-editor-title"><span>{selectedSample.category}</span><span>{selected + 1} / 10</span></div><div className="laptop-canvas"><SignageArtwork index={selected} /></div><div className="laptop-thumbnails">{samples.slice(0,4).map((sample,index) => <Button key={sample.category} variant="ghost" className={`sample-thumb ${selected === index ? 'is-active' : ''}`} aria-label={`Show ${sample.category} sample`} onClick={() => choose(index)}><img src={sample.image} alt="" width={90} height={60} loading="lazy" /></Button>)}</div><div className="laptop-publish"><span>{transferring ? 'Sending to screen…' : 'Ready on screen'}</span>{transferring ? <Upload size={11} /> : <Check size={11} />}</div></div></div></div></div><div className="laptop-base" /></div>
      <div className="transfer-track" aria-hidden="true"><span /><span /><span /><ArrowRight size={16} /></div>
      {transferring && <div key={selected} className="flying-image" aria-hidden="true"><img src={selectedSample.image} alt="" width={180} height={120} /></div>}
      <div className="screen-badge"><Wifi size={13} /><span>{transferring ? 'Updating preview…' : `${displayedSample.category} display`}</span><span className="live-dot" /></div>
    </div>
    <div className="showcase-controls"><div className="category-selector" aria-label="Signage categories">{samples.map((sample,index) => <Button key={sample.category} variant="ghost" className={`category-option ${selected === index ? 'is-selected' : ''}`} aria-pressed={selected === index} onClick={() => choose(index)}><img src={sample.image} alt="" width={90} height={60} loading="lazy" /><span>{sample.category}</span></Button>)}</div><Button variant="outline" size="icon" className="playback-button" title={reduced ? 'Next sample' : playing ? 'Pause slideshow' : 'Play slideshow'} aria-label={reduced ? 'Next sample' : playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => { if (reduced) setSelected(value => (value + 1) % samples.length); else setPlaying(value => !value); }}>{playing && !reduced ? <Pause /> : <Play />}</Button></div>
    <div className="preview-meta"><span>{String(selected + 1).padStart(2, '0')} / 10</span><span className="collection-name">{selectedSample.category} collection</span><span><span className="live-dot" /> Screen preview</span></div>
  </div>;
}