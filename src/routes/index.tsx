import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, Play, Monitor, Upload, Wifi, Check, Zap, Globe, Layers, ArrowUpRight, Sparkles, Sun, CircleCheck, Image, LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import coast from '@/assets/signage-coast.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Leitbuilt — Your content. On the big screen.' },
    { name: 'description', content: 'Welcome to Leitbuilt digital signage. Bring your content to your TV with a simple, screen-ready setup.' },
    { property: 'og:title', content: 'Leitbuilt — Digital signage, made simple' },
    { property: 'og:description', content: 'A bigger canvas for your ideas. Discover an easy way to bring your content to your TV.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Welcome,
});

function Screen({ name = 'THE COAST', alternate = false }: { name?: string; alternate?: boolean }) {
  return <div className="tv-screen">
    <img src={coast} alt="Sunlit coastal architecture overlooking the blue sea" width={1536} height={1024} />
    <div className="screen-content">
      <div className="screen-brand"><Sun size={15} /> {name}</div>
      <div className="screen-message"><small>{alternate ? 'A little inspiration' : 'A change of scenery'}</small><h2>{alternate ? <>Make room<br />for big ideas.</> : <>Somewhere<br />you’d rather be.</>}</h2><p>{alternate ? 'Your next chapter starts here.' : 'Slow down. Look around. Stay a little longer.'}</p></div>
      <div className="screen-footer"><span>{alternate ? 'WELCOME • MAKE YOURSELF AT HOME' : 'EXPLORE MORE. DISCOVER THE COAST.'}</span><span>24° &nbsp; ☀</span></div>
    </div>
  </div>;
}

function Welcome() {
  const [dialog, setDialog] = useState<'setup' | 'demo' | null>(null);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('My first screen');
  const [alternate, setAlternate] = useState(false);
  const start = () => { setStep(0); setDialog('setup'); };
  return <>
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Leitbuilt home"><span className="brand-symbol"><Layers size={21} strokeWidth={2.2} /></span>leitbuilt<span className="text-primary">.</span></a>
      <nav className="nav-items" aria-label="Main navigation"><a className="nav-link" href="#how-it-works">How it works</a><Button variant="outline" size="sm" onClick={start}>Get started <ArrowUpRight /></Button></nav>
    </header>
    <main>
      <section className="hero">
        <div className="eyebrow reveal"><Sparkles size={13} /> Welcome to Leitbuilt</div>
        <h1 className="reveal">Your content.<br /><span>On the big screen.</span></h1>
        <p className="hero-copy reveal">Turn your TV into something extraordinary.<br />Beautiful digital signage. Simple to set up. Yours to control.</p>
        <div className="hero-actions reveal"><Button size="lg" onClick={start}>Set up your screen <ArrowRight /></Button><Button variant="outline" size="lg" onClick={() => setDialog('demo')}><Play size={14} /> See it in action</Button></div>
        <div className="fine-print reveal"><Check size={12} /> Your TV. Your content. A whole new possibility.</div>
        <div className="preview-stage">
          <div className="float-label float-left"><span className="float-icon"><Upload size={17} /></span><div><strong>Your content, ready to go</strong><small>Images, videos & more</small></div><CircleCheck size={14} className="text-success" /></div>
          <div className="television"><Screen /></div><div className="tv-neck" /><div className="tv-base" />
          <div className="float-label float-right"><span className="float-icon"><Monitor size={17} /></span><div><strong>Lobby display</strong><small><span className="live-dot" /> &nbsp; Preview playing</small></div><Wifi size={15} className="text-success" /></div>
          <div className="preview-meta"><span className="live-dot" /> A little preview of what’s possible</div>
        </div>
      </section>
      <div className="benefit-strip"><span><Monitor /> Made for your TV</span><span><Zap /> Easy from the start</span><span><Globe /> Manage from anywhere</span><span><Layers /> Content that stands out</span></div>
      <section className="setup-section" id="how-it-works">
        <div className="section-heading"><div><div className="eyebrow">Small setup. Big impact.</div><h2>From your idea to your TV.</h2></div><p>Three simple steps. One beautiful screen.</p></div>
        <div className="steps-grid">
          <article className="step"><div className="step-top"><Monitor size={23} /><span className="step-number">01 — CONNECT</span></div><h3>Give your TV a new purpose.</h3><p>Connect your display to Leitbuilt and make it part of your space.</p></article>
          <article className="step"><div className="step-top"><Upload size={23} /><span className="step-number">02 — CREATE</span></div><h3>Make it unmistakably yours.</h3><p>Add your images, videos, and messages. Build a display that tells your story.</p></article>
          <article className="step"><div className="step-top"><Play size={23} /><span className="step-number">03 — SHOW</span></div><h3>Let your screen do the talking.</h3><p>Bring your content to the big screen and keep it fresh, wherever you are.</p></article>
        </div>
      </section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Leitbuilt. Built for the big screen.</span><span>A better way to be seen.</span></footer>
    <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}>
      <DialogContent>
        <DialogTitle className="font-display text-2xl">{dialog === 'demo' ? 'A bigger canvas for your ideas.' : step === 0 ? 'Meet your first screen.' : step === 1 ? 'Choose your starting point.' : 'Looking good on the big screen.'}</DialogTitle>
        <DialogDescription>{dialog === 'demo' ? 'A sample of your next digital display.' : step === 0 ? 'Create a screen preview to make it your own.' : step === 1 ? 'Pick a sample layout for your preview.' : 'This is a preview only. A live TV connection is not configured yet.'}</DialogDescription>
        {dialog === 'demo' ? <><div className="demo-screen"><Screen alternate={alternate} /></div><Button variant="outline" onClick={() => setAlternate(value => !value)}><Layers /> Switch sample</Button></> : <>
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="text-primary">{step + 1}</span> / 3 <span className="ml-auto">Screen preview</span></div>
          {step === 0 && <div className="space-y-2"><label htmlFor="screen-name" className="text-sm font-medium">Screen name</label><input id="screen-name" className="setup-input" value={name} onChange={event => setName(event.target.value)} maxLength={40} placeholder="e.g. Reception TV" /></div>}
          {step === 1 && <div className="setup-options"><Button variant={!alternate ? 'default' : 'outline'} onClick={() => setAlternate(false)}><Image /> Coastal escape</Button><Button variant={alternate ? 'default' : 'outline'} onClick={() => setAlternate(true)}><LayoutTemplate /> Welcome display</Button></div>}
          {step === 2 && <div className="demo-screen"><Screen name={name.toUpperCase()} alternate={alternate} /></div>}
          <div className="flex justify-between gap-3 pt-2">{step > 0 ? <Button variant="ghost" onClick={() => setStep(value => value - 1)}>Back</Button> : <span />}<Button disabled={!name.trim()} onClick={() => step === 2 ? setDialog(null) : setStep(value => value + 1)}>{step === 2 ? 'Finish preview' : 'Continue'}{step === 2 ? <Check /> : <ArrowRight />}</Button></div>
        </>}
      </DialogContent>
    </Dialog>
  </>;
}
