import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const step = ref(1)

  const colorThemes = [
    { id: 'gold-classic',   label: 'Gold Classic',    accent: '#c9a84c', accentDim: 'rgba(201,168,76,0.15)',   accentBorder: 'rgba(201,168,76,0.3)'   },
    { id: 'champagne',      label: 'Champagne',        accent: '#e8d5a0', accentDim: 'rgba(232,213,160,0.12)',  accentBorder: 'rgba(232,213,160,0.28)' },
    { id: 'antique-gold',   label: 'Antique Gold',     accent: '#b5892a', accentDim: 'rgba(181,137,42,0.15)',   accentBorder: 'rgba(181,137,42,0.3)'   },
    { id: 'deep-amber',     label: 'Deep Amber',       accent: '#b8760c', accentDim: 'rgba(184,118,12,0.15)',   accentBorder: 'rgba(184,118,12,0.3)'   },
    { id: 'warm-brass',     label: 'Warm Brass',       accent: '#c8a060', accentDim: 'rgba(200,160,96,0.15)',   accentBorder: 'rgba(200,160,96,0.3)'   },
    { id: 'old-gold',       label: 'Old Gold',         accent: '#a8892a', accentDim: 'rgba(168,137,42,0.15)',   accentBorder: 'rgba(168,137,42,0.3)'   },
    { id: 'pale-gold',      label: 'Pale Gold',        accent: '#d4b896', accentDim: 'rgba(212,184,150,0.13)',  accentBorder: 'rgba(212,184,150,0.26)' },
    { id: 'burnished',      label: 'Burnished Gold',   accent: '#9a7030', accentDim: 'rgba(154,112,48,0.15)',   accentBorder: 'rgba(154,112,48,0.3)'   },
  ]

  const fontPairs = [
    { id: 'josefin-poppins',      label: 'Josefin Sans + Poppins',          display: "'Josefin Sans', sans-serif",          body: "'Poppins', sans-serif",       googleUrl: 'Josefin+Sans:wght@400;600;700&family=Poppins:wght@300;400;500;600' },
    { id: 'cinzel-inter',         label: 'Cinzel + Inter',                   display: "'Cinzel', serif",                     body: "'Inter', sans-serif",         googleUrl: 'Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600' },
    { id: 'bebas-inter',          label: 'Bebas Neue + Inter',              display: "'Bebas Neue', sans-serif",            body: "'Inter', sans-serif",         googleUrl: 'Bebas+Neue&family=Inter:wght@300;400;500;600' },
    { id: 'playfair-inter',       label: 'Playfair Display + Inter',        display: "'Playfair Display', serif",           body: "'Inter', sans-serif",         googleUrl: 'Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600' },
    { id: 'cormorant-montserrat', label: 'Cormorant Garamond + Montserrat', display: "'Cormorant Garamond', serif",         body: "'Montserrat', sans-serif",    googleUrl: 'Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600' },
    { id: 'dm-serif-dm-sans',     label: 'DM Serif Display + DM Sans',      display: "'DM Serif Display', serif",           body: "'DM Sans', sans-serif",       googleUrl: 'DM+Serif+Display&family=DM+Sans:wght@300;400;500;600' },
    { id: 'unbounded-inter',      label: 'Unbounded + Inter',               display: "'Unbounded', sans-serif",             body: "'Inter', sans-serif",         googleUrl: 'Unbounded:wght@400;600;700&family=Inter:wght@300;400;500;600' },
    { id: 'big-shoulders-mulish', label: 'Big Shoulders Display + Mulish',  display: "'Big Shoulders Display', sans-serif", body: "'Mulish', sans-serif",        googleUrl: 'Big+Shoulders+Display:wght@400;600;700&family=Mulish:wght@300;400;500;600' },
    { id: 'bodoni-inter',         label: 'Bodoni Moda + Inter',             display: "'Bodoni Moda', serif",                body: "'Inter', sans-serif",         googleUrl: 'Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700&family=Inter:wght@300;400;500;600' },
    { id: 'baskerville-source',   label: 'Libre Baskerville + Source Sans', display: "'Libre Baskerville', serif",          body: "'Source Sans 3', sans-serif", googleUrl: 'Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@300;400;500;600' },
  ]

  const selectedColor = ref(null)
  const selectedFont  = ref(null)

  function pickColor(theme) {
    selectedColor.value = theme
    step.value = 2
  }

  function pickFont(pair) {
    selectedFont.value = pair
    injectFont(pair)
  }

  function injectFont(pair) {
    const id = `gf-${pair.id}`
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id   = id
      link.rel  = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${pair.googleUrl}&display=swap`
      document.head.appendChild(link)
    }
  }

  function reset() {
    step.value = 1
    selectedColor.value = null
    selectedFont.value  = null
  }

  return { step, colorThemes, fontPairs, selectedColor, selectedFont, pickColor, pickFont, injectFont, reset }
})
