
# Tors-Bored Studio — About Modal Implementation Spec

**User choices locked:**  
- Vignette: **subtle soft fade** (CSS radial-gradient)  
- Close behaviors: **click-outside + Esc + X button**  
- Background scroll: **allowed** (no page scroll lock)  
- Modal size: **tight card** (≈ 640–720px wide)  
- Transition: **quick fade** (+ slight scale)  
- Icons: **clean vector SVG** (no painterly chips for v1)

This document details the exact HTML structure, CSS, and JS wiring to add an **About** modal overlay (not a separate page) to the existing single-file gallery implementation.

---

## 1) Files & Assets

Already in repo:
- `background.jpeg`, `tors-bored.png`, `about.png`
- Vases: `vase4.jpeg`, `vase1.png`, `tomato.png`, `vase3.png`, `vase2.png`, `vase_flower.png`

New (optional) assets used inside the modal (background texture etc.):  
- `paper_texture.png` (parchment panel background)

> **Note:** We will NOT use `modal_vignette.png` for v1. The vignette is pure CSS.

---

## 2) DOM Structure (to append after the SVG)

```html
<!-- ===== ABOUT MODAL (overlay) ===== -->
<div id="about-overlay" class="overlay" hidden>
  <div class="backdrop" data-close="true" aria-hidden="true"></div>

  <section
    id="about-modal"
    class="panel"
    role="dialog"
    aria-modal="true"
    aria-labelledby="about-title"
    aria-describedby="about-desc"
  >
    <button class="close" type="button" aria-label="Close About">×</button>

    <header class="head">
      <h2 id="about-title">About Tor</h2>
    </header>

    <div id="about-desc" class="content">
      <p><strong>Hey, my name’s Tor.</strong> I’m from Saint Paul, Minnesota, a Notre Dame graduate, now living in NYC. I have a passion for building and trying new things whether that be in my career or outside of it. This includes, but isn’t limited to: pottery, cooking, baking, yo-yoing, various adult rec sports, and more.</p>

      <h3>About the Projects</h3>
      <p>The projects shown here are ways I use programming and coding to make life easier—or just to try new things. All the project images on the homepage are actual vases I made.</p>

      <h3>Find Me Elsewhere</h3>
      <nav class="social">
        <!-- Vector icons for LinkedIn, Instagram, GitHub -->
      </nav>
    </div>
  </section>
</div>
```

---

## 3) CSS

```css
.overlay[hidden] { display: none !important; }
.overlay { position: fixed; inset: 0; z-index: 999; }
.overlay .backdrop {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 45%,
              rgba(0,0,0,0.40) 68%,
              rgba(0,0,0,0.70) 100%);
}
.panel {
  position: absolute; inset: 0; margin: auto;
  width: min(680px, 92vw);
  max-height: min(85vh, 760px);
  background: #f7f3e8 url('paper_texture.png') center/cover no-repeat;
  border-radius: 18px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.35);
  padding: 24px 28px 28px;
  overflow: auto;
  opacity: 0; transform: translateY(6px) scale(0.985);
  transition: opacity 160ms ease, transform 160ms ease;
}
.overlay:not([hidden]) .panel { opacity: 1; transform: translateY(0) scale(1); }
```

---

## 4) JavaScript Wiring

```js
(function() {
  const aboutLink = document.getElementById('about-link');
  const overlay = document.getElementById('about-overlay');
  const closeBtn = overlay.querySelector('.close');
  const backdrop = overlay.querySelector('.backdrop');
  let lastFocus = null;

  function openAbout() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    closeBtn.focus();
  }
  function closeAbout() {
    overlay.hidden = true;
    if (lastFocus) lastFocus.focus();
  }

  aboutLink.addEventListener('click', (e)=>{ e.preventDefault(); openAbout(); });
  closeBtn.addEventListener('click', closeAbout);
  backdrop.addEventListener('click', closeAbout);
  document.addEventListener('keydown', (e)=>{ if(!overlay.hidden && e.key==='Escape') closeAbout(); });

  overlay.addEventListener('keydown', (e)=>{
    if(e.key!=='Tab') return;
    const f=overlay.querySelectorAll('button,[href],[tabindex]:not([tabindex="-1"])');
    const list=Array.from(f);
    if(!list.length) return;
    const first=list[0], last=list[list.length-1];
    if(e.shiftKey && document.activeElement===first){ last.focus(); e.preventDefault(); }
    else if(!e.shiftKey && document.activeElement===last){ first.focus(); e.preventDefault(); }
  });
})();
```

---

## 5) Integration Checklist

- [ ] Paste the **DOM structure** right after `<svg id="scene">`  
- [ ] Copy the **CSS** into your `<style>`  
- [ ] Add the **JS wiring** after your existing script  
- [ ] Place `paper_texture.png` in the same folder as the HTML  
- [ ] Test desktop and mobile close behaviors  

---

**End of spec — ready to implement.**
