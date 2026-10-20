import { useEffect, useRef, useState } from 'react'
import { profile } from './data/profile'
import { publicAsset } from './utils/publicAsset'
import ToolsMarquee from './components/ToolsMarquee'
import ResumePdf from './components/ResumePdf'
import NoticeBoard from './components/NoticeBoard'
import CertificateBanners from './components/CertificateBanners'
import ContactHillside from './components/ContactHillside'
import securityMonitoringArchitecture from './assets/security-monitoring-architecture.png'
import homeFirewallArchitecture from './assets/home-firewall-architecture.png'
import mriSecurityArchitecture from './assets/mri-security-architecture.png'
import healthcareFederatedArchitecture from './assets/healthcare-federated-learning-architecture.png'

const navLinks = [['Home', 'home'], ['About', 'about'], ['Training & Certifications', 'certifications'], ['Tools', 'tools'], ['Projects', 'projects'], ['Contact', 'contact']]
const resumeFile = Object.entries(import.meta.glob('/resume/*.pdf', { eager: true, query: '?url', import: 'default' }) as Record<string, string>)[0]
const resumeUrl = resumeFile?.[1] ?? profile.resume
const resumeFilename = resumeFile?.[0].split('/').pop() ?? 'resume.pdf'
const heroRotations = [
  { before: '', highlight: 'hunting web exploits.', after: '', tone: 'offense' },
  { before: '', highlight: 'mastering log analysis.', after: '', tone: 'defense' },
  { before: '', highlight: 'exposing network vulnerabilities.', after: '', tone: 'offense' },
  { before: '', highlight: 'leveraging threat intelligence.', after: '', tone: 'defense' },
  { before: '', highlight: 'simulating Linux attacks.', after: '', tone: 'offense' },
  { before: '', highlight: 'performing malware analysis.', after: '', tone: 'defense' },
]
const educationMilestones = [
  { key: 'curiosity', kind: 'beginning', label: 'THE FIRST SPARK', year: 'ORIGIN', title: 'Curiosity came first', subtitle: 'A habit of asking how things work.', result: 'THE START OF THE JOURNEY' },
  { key: 'foundation', kind: 'school', label: 'SECONDARY SCHOOL', year: '2019–2020', title: 'Government Higher Secondary School, Sanaveli', subtitle: 'Secondary School', result: '87% SCORE' },
  { key: 'higher-secondary', kind: 'highschool', label: 'HIGHER SECONDARY', year: '2020–2022', title: 'Government Higher Secondary School, Sanaveli', subtitle: 'Higher Secondary Education', result: '90% SCORE' },
  { key: 'university', kind: 'university', label: 'UNIVERSITY', year: '2022–2026', title: 'SRM Valliammai Engineering College', subtitle: 'Bachelor of Engineering in Cyber Security', result: '8.7 CGPA' },
  { key: 'next', kind: 'next', label: 'THE NEXT CHAPTER', year: 'AHEAD', title: 'Ready to make an impact', subtitle: 'Open to cybersecurity opportunities in Chennai.', result: 'LET’S BUILD WHAT’S NEXT' },
]

function EducationArtwork({ kind }: { kind: string }) {
  const positions: Record<string, string> = { beginning: '0%', school: '33.333%', highschool: '66.666%' }
  if (kind === 'next') return <svg viewBox="0 0 180 220" aria-hidden="true"><defs><linearGradient id="office-clay" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff0d7"/><stop offset="1" stopColor="#d6bfa7"/></linearGradient><linearGradient id="office-glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a8e1df"/><stop offset="1" stopColor="#5d9da5"/></linearGradient></defs><ellipse cx="90" cy="205" rx="66" ry="9" fill="#687b9b" opacity=".14"/><rect x="43" y="67" width="94" height="129" rx="13" fill="url(#office-clay)"/><path d="M36 68q0-12 12-12h84q12 0 12 12v10H36z" fill="#4e9e9a"/><path d="M73 78h34v118H73z" fill="#d79570"/><path d="M52 93h13v17H52zm63 0h13v17h-13zM52 121h13v17H52zm63 0h13v17h-13zM52 149h13v17H52zm63 0h13v17h-13z" fill="url(#office-glass)"/><path d="M80 87h20v18H80zm0 28h20v18H80zm0 28h20v18H80z" fill="#f5e4cd"/><path d="M35 194h110q8 0 11 8H27q2-8 8-8" fill="#9f8162"/><circle cx="90" cy="42" r="20" fill="#e7c8a5"/><path d="M90 26v16l12 8" fill="none" stroke="#6c6970" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
  if (kind === 'university') return <img className="journey-university-building" src={publicAsset("/images/university-building-clay.png")} loading="lazy" decoding="async" alt="" />
  return <span className="journey-clay-sprite" style={{ '--clay-position': positions[kind] ?? '100%' } as React.CSSProperties} aria-hidden="true" />
}

const educationWalkerPositions = ['0%', '33.333%', '66.667%', '100%']
type FocusInspection = { category: string; title: string; subtitle: string; description: string }
function isFocusInspection(value: unknown): value is FocusInspection {
  if (!value || typeof value !== 'object') return false
  const card = value as Partial<FocusInspection>
  return ['category', 'title', 'subtitle', 'description'].every(key => typeof card[key as keyof FocusInspection] === 'string')
}

function SectionHead({ eyebrow, title, copy, className = '' }: { eyebrow?: string; title: string; copy?: string; className?: string }) { return <div className={`section-head ${className}`}>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{copy && <p>{copy}</p>}</div> }
function CredentialsSection() { return <section className="credentials section-shell" id="certifications"><div className="section-marker"><span>03</span><span>TRAINING & CERTIFICATIONS</span></div><SectionHead title="ACHIEVEMENTS" className="centered-section-head"/><div className="credential-grid notice-board-grid"><div className="credential-block"><span className="detail-label">CERTIFICATIONS / TRAINING</span><CertificateBanners/></div><div className="achievement-block notice-achievement-block"><NoticeBoard /></div></div></section> }
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const [projectFolderOpen, setProjectFolderOpen] = useState(false)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const [showArchitecture, setShowArchitecture] = useState(false)
  const [showMagicCard, setShowMagicCard] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [resumeClosing, setResumeClosing] = useState(false)
  const [resumePrintState, setResumePrintState] = useState<'idle' | 'printing' | 'printed'>('idle')
  const resumePrintStateRef = useRef(resumePrintState)
  const focusInspectOpenRef = useRef(false)
  resumePrintStateRef.current = resumePrintState
  const [printOrigin, setPrintOrigin] = useState({ x: 0, y: 0, scale: .28 })
  const printerRef = useRef<HTMLDivElement>(null)
  const printTargetRef = useRef<HTMLDivElement>(null)
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0)
  const [heroVisibleCharacters, setHeroVisibleCharacters] = useState(0)
  const [heroDeleting, setHeroDeleting] = useState(false)
  const [educationStep, setEducationStep] = useState(0)
  const [postFallVisible, setPostFallVisible] = useState(false)
  const [focusInspection, setFocusInspection] = useState<FocusInspection | null>(null)
  const selectedProjectTitle = selectedProjectIndex === null ? '' : profile.projects[selectedProjectIndex].title
  const selectedArchitecture = selectedProjectTitle === 'Security Monitoring Lab' ? securityMonitoringArchitecture : selectedProjectTitle === 'Real-Time Dynamic Firewall Configuration for Home Devices' ? homeFirewallArchitecture : selectedProjectTitle === 'Securing MRI Images Using Steganography & Cryptographic Protection' ? mriSecurityArchitecture : selectedProjectTitle === 'A Privacy Preserving Framework for AI in healthcare' ? healthcareFederatedArchitecture : null
  const isArchitectureProject = selectedArchitecture !== null

  const openResume = () => {
    setResumeClosing(false)
    setShowResume(true)
  }
  const closeResume = () => setResumeClosing(true)
  const closeFocusInspection = () => {
    document.querySelector<HTMLIFrameElement>('.focus-scene-frame')?.contentWindow?.postMessage({ type: 'focus-inspect-close' }, window.location.origin)
    setFocusInspection(null)
  }
  const startResumePrint = () => {
    if (resumePrintState === 'printing') return
    const printer = printerRef.current?.getBoundingClientRect()
    const target = printTargetRef.current?.getBoundingClientRect()
    if (printer && target) {
      const zoom = Number.parseFloat(getComputedStyle(document.documentElement).zoom) || 1
      const sheetWidthAtOutlet = printer.width * .235
      const outletLeft = printer.left + printer.width * .713 - sheetWidthAtOutlet / 2
      const outletTop = printer.top + printer.height * .69
      setPrintOrigin({
        x: (outletLeft - target.left) / zoom,
        y: (outletTop - target.top) / zoom,
        scale: sheetWidthAtOutlet / target.width,
      })
    }
    setResumePrintState('printing')
  }
  const hideResumeForScroll = () => {
    if (resumePrintStateRef.current === 'idle') return
    resumePrintStateRef.current = 'idle'
    setResumePrintState('idle')
  }
  const currentHeroPhrase = heroRotations[heroPhraseIndex]
  const currentEducation = educationMilestones[educationStep] ?? educationMilestones[0]
  const heroPhraseLength = currentHeroPhrase.before.length + currentHeroPhrase.highlight.length + currentHeroPhrase.after.length
  const visibleBefore = currentHeroPhrase.before.slice(0, heroVisibleCharacters)
  const visibleHighlight = currentHeroPhrase.highlight.slice(0, Math.max(0, Math.min(currentHeroPhrase.highlight.length, heroVisibleCharacters - currentHeroPhrase.before.length)))
  const visibleAfter = currentHeroPhrase.after.slice(0, Math.max(0, heroVisibleCharacters - currentHeroPhrase.before.length - currentHeroPhrase.highlight.length))
  useEffect(() => {
    setPostFallVisible(false)
    if (educationStep !== educationMilestones.length - 1) return
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 500 : 1340
    const timer = window.setTimeout(() => setPostFallVisible(true), delay)
    return () => window.clearTimeout(timer)
  }, [educationStep])
  useEffect(() => {
    let previousScrollY = window.scrollY
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 24)
      setHeaderHidden(currentScrollY > 24)
      if (currentScrollY > previousScrollY + 1) {
        hideResumeForScroll()
      }
      previousScrollY = currentScrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const frame = document.querySelector<HTMLIFrameElement>('.focus-scene-frame')
    if (!frame) return

    const onCarouselScrollChain = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.contentWindow) return
      if (event.data?.type === 'focus-carousel-scroll-start') {
        setHeaderHidden(window.scrollY > 24)
        if (event.data.deltaY > 0) hideResumeForScroll()
        return
      }
      if (event.data?.type !== 'focus-carousel-scroll-chain' || !Number.isFinite(event.data.deltaY)) return
      // Let the browser apply the wheel delta using its normal page scrolling.
      // The iframe cannot bubble wheel events across its document boundary, so
      // temporarily bypass the site's smooth anchor-scroll preference here.
      const root = document.documentElement
      const previousScrollBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      window.scrollBy(0, event.data.deltaY)
      root.style.scrollBehavior = previousScrollBehavior
    }
    window.addEventListener('message', onCarouselScrollChain)
    return () => {
      window.removeEventListener('message', onCarouselScrollChain)
    }
  }, [])

  useEffect(() => {
    const frame = document.querySelector<HTMLIFrameElement>('.focus-scene-frame')
    if (!frame) return

    const isSceneCentered = () => {
      const rect = frame.getBoundingClientRect()
      const sceneCenter = rect.top + rect.height / 2
      return Math.abs(sceneCenter - window.innerHeight / 2) <= window.innerHeight * 0.14
    }
    const syncCarouselScrollState = () => {
      frame.contentWindow?.postMessage({
        type: 'focus-carousel-active',
        active: isSceneCentered(),
      }, window.location.origin)
    }
    frame.addEventListener('load', syncCarouselScrollState)
    window.addEventListener('scroll', syncCarouselScrollState, { passive: true })
    window.addEventListener('resize', syncCarouselScrollState)
    syncCarouselScrollState()

    const routeWheelToCenteredCarousel = (event: WheelEvent) => {
      if (focusInspectOpenRef.current || !isSceneCentered()) return

      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (Math.abs(delta) < 2) return
      event.preventDefault()
      setHeaderHidden(window.scrollY > 24)
      const deltaModeScale = event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? window.innerHeight : 1
      if (delta > 0) hideResumeForScroll()
      frame.contentWindow?.postMessage({
        type: 'focus-carousel-wheel',
        deltaY: delta * deltaModeScale,
      }, window.location.origin)
    }

    window.addEventListener('wheel', routeWheelToCenteredCarousel, { passive: false })
    return () => {
      frame.removeEventListener('load', syncCarouselScrollState)
      window.removeEventListener('scroll', syncCarouselScrollState)
      window.removeEventListener('resize', syncCarouselScrollState)
      window.removeEventListener('wheel', routeWheelToCenteredCarousel)
    }
  }, [])

  useEffect(() => {
    const frame = document.querySelector<HTMLIFrameElement>('.focus-scene-frame')
    if (!frame) return

    let lockedScrollY = 0
    let previousRootOverflow = ''
    let previousBodyOverflow = ''
    let previousRootScrollBehavior = ''
    let previousScrollbarGutter = ''
    const syncInspector = (isOpen: boolean) => {
      if (isOpen === focusInspectOpenRef.current) return

      if (isOpen) {
        lockedScrollY = window.scrollY
        previousRootOverflow = document.documentElement.style.overflow
        previousBodyOverflow = document.body.style.overflow
        previousRootScrollBehavior = document.documentElement.style.scrollBehavior
        previousScrollbarGutter = document.documentElement.style.scrollbarGutter
        document.documentElement.style.scrollbarGutter = 'stable'
        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'
        focusInspectOpenRef.current = true
      } else {
        focusInspectOpenRef.current = false
        document.documentElement.style.overflow = previousRootOverflow
        document.body.style.overflow = previousBodyOverflow
        document.documentElement.style.scrollbarGutter = previousScrollbarGutter
        if (Math.abs(window.scrollY - lockedScrollY) > 1) {
          document.documentElement.style.scrollBehavior = 'auto'
          window.scrollTo({ top: lockedScrollY, behavior: 'instant' })
          requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = previousRootScrollBehavior })
        } else {
          document.documentElement.style.scrollBehavior = previousRootScrollBehavior
        }
        setFocusInspection(null)
      }
    }
    const onInspectorMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== 'focus-inspect-state') return
      const validOpen = Boolean(event.data.open && isFocusInspection(event.data.card))
      if (validOpen) {
        setFocusInspection(event.data.card)
        frame.contentWindow?.postMessage({ type: 'focus-inspect-parent-rendered' }, window.location.origin)
      }
      syncInspector(validOpen)
    }

    window.addEventListener('message', onInspectorMessage)
    const requestInspectorState = () => frame.contentWindow?.postMessage({ type: 'focus-inspect-query' }, window.location.origin)
    frame.addEventListener('load', requestInspectorState)
    requestInspectorState()
    return () => {
      window.removeEventListener('message', onInspectorMessage)
      frame.removeEventListener('load', requestInspectorState)
      if (focusInspectOpenRef.current) {
        focusInspectOpenRef.current = false
        document.documentElement.style.overflow = previousRootOverflow
        document.body.style.overflow = previousBodyOverflow
        document.documentElement.style.scrollbarGutter = previousScrollbarGutter
        document.documentElement.style.scrollBehavior = 'auto'
        window.scrollTo({ top: lockedScrollY, behavior: 'instant' })
        requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = previousRootScrollBehavior })
      }
    }
  }, [])

  useEffect(() => {
    if (!focusInspection) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      document.querySelector<HTMLIFrameElement>('.focus-scene-frame')?.contentWindow?.postMessage({ type: 'focus-inspect-close' }, window.location.origin)
      setFocusInspection(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [focusInspection])

  useEffect(() => {
    if (selectedProjectIndex === null) return
    const root = document.documentElement
    const body = document.body
    const previousRootOverflow = root.style.overflow
    const previousBodyOverflow = body.style.overflow
    root.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previousRootOverflow
      body.style.overflow = previousBodyOverflow
    }
  }, [selectedProjectIndex])

  useEffect(() => {
    const fullyTyped = heroVisibleCharacters >= heroPhraseLength
    const timer = window.setTimeout(() => {
      if (!heroDeleting && !fullyTyped) {
        setHeroVisibleCharacters(count => count + 1)
      } else if (!heroDeleting) {
        setHeroDeleting(true)
      } else if (heroVisibleCharacters > 0) {
        setHeroVisibleCharacters(count => Math.max(0, count - 2))
      } else {
        setHeroPhraseIndex(index => (index + 1) % heroRotations.length)
        setHeroDeleting(false)
      }
    }, heroDeleting ? 24 : fullyTyped ? 1450 : 36)
    return () => window.clearTimeout(timer)
  }, [heroDeleting, heroPhraseLength, heroVisibleCharacters])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main > section, footer'))
    sections.forEach(section => section.classList.add('scroll-glass-item'))
    if (!('IntersectionObserver' in window)) {
      sections.forEach(section => section.classList.add('is-revealed'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-revealed', entry.isIntersecting)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>([
      'main > section:not(.hero) .section-marker',
      'main > section:not(.hero) .section-head',
      'main > section:not(.hero) .about-grid',
      'main > section:not(.hero) .education-card',
      'main > section:not(.hero) .focus-card',
      'main > section:not(.hero) .skill-group',
      'main > section:not(.hero) .tool-marquee',
      'main > section:not(.hero) .experience-heading',
      'main > section:not(.hero) .timeline-item',
      'main > section:not(.hero) .credential-block',
      'main > section:not(.hero) .achievement-card',
      'main > section:not(.hero) .learning-item',
      'main > section:not(.hero) .contact-content',
    ].join(',')))
    revealTargets.forEach((element, index) => {
      element.classList.add('scroll-reveal')
      element.style.setProperty('--reveal-delay', `${(index % 5) * 75}ms`)
    })
    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach(element => element.classList.add('is-in-view'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-in-view', entry.isIntersecting)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    revealTargets.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const journey = document.querySelector<HTMLElement>('.education-journey')
    const stage = journey?.querySelector<HTMLElement>('.education-journey-stage')
    const route = journey?.querySelector<SVGPathElement>('.journey-route-progress')
    const routeTrack = journey?.querySelector<SVGPathElement>('.journey-route-base')
    const map = journey?.querySelector<HTMLElement>('.journey-map')
    const futureRoute = journey?.querySelector<SVGPathElement>('.journey-route-future')
    const routeArrow = journey?.querySelector<SVGPathElement>('.journey-route-arrow')
    const walker = journey?.querySelector<HTMLElement>('.journey-traveler')
    const walkerImage = walker?.querySelector<HTMLElement>('.journey-walker')
    const fallImage = walker?.querySelector<HTMLImageElement>('.journey-fall')
    const stops = Array.from(journey?.querySelectorAll<HTMLElement>('.journey-stop') ?? [])
    if (!journey || !stage || !route || !routeTrack || !map || !walker || !walkerImage || !fallImage || stops.length === 0) return

    let frame = 0
    let settleTimer = 0
    let currentStep = -1
    const supportsScrollEnd = 'onscrollend' in window
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const routeLength = routeTrack.getTotalLength()
    const waypointTargets = stops.map(stop => ({
      x: Number.parseFloat(stop.style.left) / 100 * 1200,
      y: Number.parseFloat(stop.style.top) / 100 * 580,
    }))
    const routeWaypoints = waypointTargets.map(target => {
      let nearestDistance = 0
      let nearestError = Number.POSITIVE_INFINITY
      const samples = Math.ceil(routeLength)
      for (let index = 0; index <= samples; index += 1) {
        const distance = routeLength * index / samples
        const point = routeTrack.getPointAtLength(distance)
        const dx = point.x - target.x
        const dy = point.y - target.y
        const error = dx * dx + dy * dy
        if (error < nearestError) {
          nearestError = error
          nearestDistance = distance
        }
      }
      return nearestDistance
    })
    route.style.strokeDasharray = 'none'

    const getProgress = () => {
      const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 80
      const scrollRange = Math.max(1, journey.offsetHeight - stage.offsetHeight)
      const journeyTop = journey.getBoundingClientRect().top
      return { progress: Math.min(1, Math.max(0, (headerHeight - journeyTop) / scrollRange)), scrollRange, headerHeight, journeyTop }
    }
    const render = () => {
      frame = 0
      const { progress } = getProgress()
      const active = progress * (stops.length - 1)
      const step = Math.min(stops.length - 1, Math.floor(active + 0.05))
      const segment = Math.min(educationWalkerPositions.length - 1, Math.floor(active))
      const segmentProgress = active - segment
      const segmentStart = routeWaypoints[segment] ?? 0
      const segmentEnd = routeWaypoints[Math.min(segment + 1, routeWaypoints.length - 1)] ?? routeLength
      const routeDistance = segmentStart + (segmentEnd - segmentStart) * segmentProgress
      // Four poses are repeated between each milestone. Keep the trail tip
      // on the rear shoe in each pose instead of centering it under the sprite.
      const walkCycle = (Math.max(0, segmentProgress) * 4) % 1
      const walkFrame = Math.min(3, Math.floor(walkCycle * 4))
      const rearFootOffset = [-0.25, -0.08, -0.25, -0.08][walkFrame]
      const routePoint = routeTrack.getPointAtLength(routeDistance)
      // Convert the SVG viewBox point straight into the map's local layout
      // coordinates. Screen CTMs include the 125% page zoom, while left/top
      // are CSS layout pixels, which otherwise puts the walker off the trail.
      const walkerX = routePoint.x / 1200 * map.offsetWidth
      const walkerY = routePoint.y / 580 * map.offsetHeight
      const routeSamples = Math.max(1, Math.ceil(routeDistance / 8))
      const visibleRoute = Array.from({ length: routeSamples + 1 }, (_, index) => {
        const point = routeTrack.getPointAtLength(routeDistance * index / routeSamples)
        return `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`
      }).join(' ')
      route.setAttribute('d', visibleRoute)
      route.style.opacity = progress > 0.002 ? '1' : '0'
      if (futureRoute) futureRoute.style.opacity = progress > 0.82 ? String(Math.min(1, (progress - 0.82) * 5.5)) : '0'
      if (routeArrow) routeArrow.style.opacity = progress > 0.94 ? String(Math.min(1, (progress - 0.94) * 16.7)) : '0'
      stage.style.setProperty('--journey-progress', String(progress))
      stage.classList.toggle('is-moving', progress > 0.002)
      walker.style.left = `${walkerX - rearFootOffset * walker.offsetWidth}px`
      walker.style.top = `${walkerY + 2}px`
      if (walkerImage.dataset.segment !== String(segment)) {
        walkerImage.style.setProperty('--walker-frame-x', educationWalkerPositions[segment])
        walkerImage.dataset.segment = String(segment)
      }
      // Repeat the four-pose cycle four times between milestones: 16 pose
      // changes per leg of the journey, driven entirely by scroll distance.
      walkerImage.style.setProperty('--walker-frame-y', `${walkFrame * 33.333}%`)
      const fadeIn = Math.max(0, Math.min(1, (segmentProgress - 0.02) / 0.05))
      const fadeOut = Math.max(0, Math.min(1, (1 - segmentProgress) / 0.035))
      // The final stop is the destination trigger. Scroll snapping can land
      // on it before raw journey progress reaches 1.0.
      const isFallen = step === stops.length - 1
      const walkOpacity = isFallen ? 0 : Math.min(fadeIn, fadeOut)
      walker.style.setProperty('--walker-opacity', String(Math.max(0, walkOpacity)))
      walker.classList.toggle('is-walking', walkOpacity > 0.02 && !isFallen)
      walker.classList.toggle('is-fallen', isFallen)
      stops.forEach((stop, index) => {
        stop.classList.toggle('is-active', index === step)
        stop.classList.toggle('has-passed', index < step)
        stop.classList.toggle('is-upcoming', index > step)
        stop.setAttribute('aria-current', index === step ? 'step' : 'false')
      })
      if (step !== currentStep) {
        currentStep = step
        setEducationStep(step)
      }
    }
    const settleOnNearestStop = () => {
      if (reducedMotion.matches) return
      const { progress, scrollRange } = getProgress()
      if (progress <= 0 || progress >= 1) return
      const snapped = Math.round(progress * (stops.length - 1)) / (stops.length - 1)
      const delta = (snapped - progress) * scrollRange
      if (Math.abs(delta) > 12) window.scrollTo({ top: window.scrollY + delta, behavior: 'smooth' })
    }
    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
      window.clearTimeout(settleTimer)
      if (!supportsScrollEnd) settleTimer = window.setTimeout(settleOnNearestStop, 480)
    }
    const onScrollEnd = () => { window.clearTimeout(settleTimer); settleOnNearestStop() }
    window.addEventListener('scroll', requestRender, { passive: true })
    if (supportsScrollEnd) window.addEventListener('scrollend', onScrollEnd, { passive: true })
    window.addEventListener('resize', requestRender, { passive: true })
    render()
    return () => {
      window.removeEventListener('scroll', requestRender)
      if (supportsScrollEnd) window.removeEventListener('scrollend', onScrollEnd)
      window.removeEventListener('resize', requestRender)
      if (frame) window.cancelAnimationFrame(frame)
      window.clearTimeout(settleTimer)
    }
  }, [])

  useEffect(() => {
    if (!showMagicCard) return
    const dismiss = window.setTimeout(() => setShowMagicCard(false), 5000)
    return () => window.clearTimeout(dismiss)
  }, [showMagicCard])

  useEffect(() => {
    if (!showResume) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeResume()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [showResume])

  useEffect(() => {
    if (!resumeClosing) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => {
      setShowResume(false)
      setResumeClosing(false)
    }, reducedMotion ? 40 : 420)
    return () => window.clearTimeout(timer)
  }, [resumeClosing])

  useEffect(() => {
    if (resumePrintState !== 'printing') return
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 40 : 2800
    const timer = window.setTimeout(() => setResumePrintState('printed'), delay)
    return () => window.clearTimeout(timer)
  }, [resumePrintState])

  useEffect(() => {
    if (selectedProjectIndex === null) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (showArchitecture) setShowArchitecture(false)
      else setSelectedProjectIndex(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedProjectIndex, showArchitecture])

  return <>
    {focusInspection && <div className="focus-dialog-layer" onMouseDown={event => { if (event.target === event.currentTarget) closeFocusInspection() }}>
      <section className="focus-dialog" role="dialog" aria-modal="true" aria-labelledby="focus-dialog-title">
        <div className="focus-dialog-info">
          <button className="focus-dialog-close" type="button" aria-label="Close security focus details" onClick={closeFocusInspection}>×</button>
          <span className="focus-dialog-category">{focusInspection.category}</span>
          <h2 id="focus-dialog-title">{focusInspection.title}</h2>
          {focusInspection.title !== 'Linux' && focusInspection.title !== 'Web Application Security' && focusInspection.title !== 'Incident Response' && focusInspection.title !== 'Threat Intelligence' && <>
            <p className="focus-dialog-subtitle">{focusInspection.subtitle}</p>
            <p className="focus-dialog-description">{focusInspection.description}</p>
          </>}
          {focusInspection.title === 'Security Operations' && <div className="focus-ops-details">
            <section className="siem-tools">
              <h3>SIEM Tools:</h3>
              <div className="siem-tool-logos" aria-label="Elastic, Wazuh, and Splunk">
                <span className="siem-tool-logo" role="img" aria-label="Elastic" tabIndex={0}>
                  <img src={publicAsset("/images/siem-tools/elastic.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">Elastic</span>
                </span>
                <span className="siem-tool-logo" role="img" aria-label="Wazuh" tabIndex={0}>
                  <img src={publicAsset("/images/siem-tools/wazuh.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">Wazuh</span>
                </span>
                <span className="siem-tool-logo" role="img" aria-label="Splunk" tabIndex={0}>
                  <img src={publicAsset("/images/siem-tools/splunk.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">Splunk</span>
                </span>
              </div>
            </section>
            <section>
              <h3>Log Analysis:</h3>
              <p>Linux/Windows event logs, firewall logs, event correlation and incident timeline reconstruction.</p>
            </section>
            <section>
              <h3>Incident Investigation:</h3>
              <ul>
                <li>Investigating suspicious authentication activity</li>
                <li>Assessing potential threats from security alerts</li>
              <li>Documenting findings and investigation evidence</li>
              </ul>
            </section>
            <section className="alert-management-tool">
              <h3>Alert Management Tool:</h3>
              <div className="siem-tool-logos" aria-label="Jira">
                <span className="jira-lockup" role="img" aria-label="Jira logo">
                  <img src={publicAsset("/images/siem-tools/jira.png")} loading="lazy" decoding="async" alt=""/>
                </span>
              </div>
            </section>
          </div>}
          {focusInspection.title === 'Networking' && <div className="focus-ops-details network-details">
            <section>
              <h3>Networking Fundamentals:</h3>
              <p>OSI/TCP-IP, TCP/UDP, IP addressing, subnetting, CIDR, DNS, DHCP, ARP and HTTP/HTTPS.</p>
            </section>
            <section>
              <h3>Routing and NAT:</h3>
              <p>Routing tables, default gateways, NAT/PAT, SNAT/DNAT, port forwarding and network troubleshooting.</p>
            </section>
            <section>
              <h3>Network Security:</h3>
              <p>Stateful firewalls, iptables, nftables, Netfilter, IDS/IPS and traffic filtering.</p>
            </section>
            <section>
              <h3>Packet Analysis:</h3>
              <p>Wireshark, tcpdump, TCP flags, ICMP analysis and packet capture.</p>
            </section>
            <section>
              <h3>SOC Networking:</h3>
              <p>Firewall log analysis, suspicious traffic investigation, ARP spoofing detection and network threat monitoring.</p>
            </section>
            <section className="network-tools">
              <h3>Tools:</h3>
              <div className="siem-tool-logos" aria-label="Wireshark, tcpdump, Snort, Suricata, and Zeek">
                <span className="siem-tool-logo" role="img" aria-label="Wireshark" tabIndex={0}>
                  <img src={publicAsset("/images/siem-tools/wireshark.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">Wireshark</span>
                </span>
                <span className="siem-tool-logo network-tool-logo wide-tool-logo" role="img" aria-label="tcpdump and libpcap" tabIndex={0}>
                  <img src={publicAsset("/images/network-tools/tcpdump.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">tcpdump / libpcap</span>
                </span>
                <span className="siem-tool-logo network-tool-logo wide-tool-logo" role="img" aria-label="Snort" tabIndex={0}>
                  <img src={publicAsset("/images/network-tools/snort.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">Snort</span>
                </span>
                <span className="siem-tool-logo network-tool-logo" role="img" aria-label="Suricata" tabIndex={0}>
                  <img src={publicAsset("/images/network-tools/suricata.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">Suricata</span>
                </span>
                <span className="siem-tool-logo network-tool-logo" role="img" aria-label="Zeek" tabIndex={0}>
                  <img src={publicAsset("/images/network-tools/zeek.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">Zeek</span>
                </span>
              </div>
            </section>
          </div>}
          {focusInspection.title === 'Linux' && <div className="focus-ops-details linux-details">
            <section className="siem-tools linux-distributions">
              <h3>Well Known Distributions:</h3>
              <div className="siem-tool-logos" aria-label="Ubuntu and Kali Linux">
                <span className="siem-tool-logo linux-distro-logo ubuntu-logo" role="img" aria-label="Ubuntu" tabIndex={0}>
                  <img src={publicAsset("/images/linux-distros/ubuntu.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">Ubuntu</span>
                </span>
                <span className="siem-tool-logo linux-distro-logo kali-logo" role="img" aria-label="Kali Linux" tabIndex={0}>
                  <img src={publicAsset("/images/linux-distros/kali-linux.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">Kali Linux</span>
                </span>
              </div>
            </section>
            <section>
              <h3>Linux Command Line and System Administration:</h3>
              <ul>
                <li>Linux CLI and Bash fundamentals</li>
                <li>File and directory management</li>
                <li>Process inspection</li>
              </ul>
            </section>
            <section>
              <h3>Users, Groups and File Permissions:</h3>
              <ul>
                <li>User and group management</li>
                <li>File ownership and permissions</li>
                <li>Special permissions: SUID, SGID and sticky bit</li>
              </ul>
            </section>
            <section>
              <h3>Linux Architecture and Internals:</h3>
              <ul>
                <li>Linux startup, boot process and system initialisation</li>
                <li>Kernel space versus user space</li>
                <li>System calls and the user-to-kernel transition</li>
                <li>Processes, threads, signals and process lifecycle</li>
              </ul>
            </section>
            <section>
              <h3>Linux Logs and SOC Operations:</h3>
              <ul>
                <li>Analysing authentication and system logs</li>
                <li>Working with journalctl, syslog, agents</li>
                <li>Investigating failed SSH logins and suspicious processes</li>
              </ul>
            </section>
          </div>}
          {focusInspection.title === 'Web Application Security' && <div className="focus-ops-details web-security-details">
            <section>
              <h3>Web Architecture:</h3>
              <ul>
                <li>Analysing HTTP requests, responses, headers and cookies</li>
                <li>Understanding reverse proxies and application servers</li>
                <li>Investigating client IP forwarding and proxy headers</li>
                <li>Understanding request routing and web server behaviour</li>
              </ul>
            </section>
            <section>
              <h3>OWASP TOP 10:</h3>
              <ul>
                <li>Understanding common web vulnerabilities</li>
                <li>Authentication weaknesses</li>
                <li>Broken access control</li>
                <li>Injection attacks, XSS, CSRF, SSRF, path traversal, file upload vulnerabilities, SSTI, and more</li>
              </ul>
            </section>
            <section>
              <h3>WAF and Defensive Security:</h3>
              <ul>
                <li>WAF rule concepts</li>
                <li>Web attack detection and prevention by rules</li>
                <li>Security alert analysis</li>
              </ul>
            </section>
            <section className="network-tools web-security-tools">
              <h3>Web Attack / Security Tools:</h3>
              <div className="siem-tool-logos" aria-label="Burp Suite, Nikto, and ModSecurity">
                <span className="siem-tool-logo" role="img" aria-label="Burp Suite" tabIndex={0}>
                  <img src={publicAsset("/images/web-tools/zap.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">Burp Suite</span>
                </span>
                <span className="siem-tool-logo" role="img" aria-label="Nikto" tabIndex={0}>
                  <img src={publicAsset("/images/web-tools/burp-suite.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">Nikto</span>
                </span>
                <span className="siem-tool-logo wide-tool-logo" role="img" aria-label="ModSecurity" tabIndex={0}>
                  <img src={publicAsset("/images/web-tools/modsecurity.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">ModSecurity</span>
                </span>
              </div>
            </section>
          </div>}
          {focusInspection.title === 'Incident Response' && <div className="focus-ops-details incident-response-details">
            <section>
              <h3>Alert Triage &amp; Investigation:</h3>
              <ul>
                <li>SIEM alert validation</li>
                <li>Severity assessment</li>
                <li>Event correlation</li>
                <li>False-positive analysis</li>
              </ul>
            </section>
            <section>
              <h3>Phishing Email Analysis:</h3>
              <ul>
                <li>Email header inspection</li>
                <li>Sender spoofing detection</li>
                <li>Suspicious URL analysis</li>
                <li>Attachment assessment</li>
              </ul>
            </section>
            <section>
              <h3>Malware Analysis:</h3>
              <ul>
                <li>Basic static and Dynamic analysis</li>
                <li>File hash extraction</li>
                <li>Suspicious behaviour investigation</li>
              </ul>
            </section>
          </div>}
          {focusInspection.title === 'Threat Intelligence' && <div className="focus-ops-details threat-intelligence-details">
            <section>
              <h3>Indicators of Compromise:</h3>
              <ul>
                <li>Identifying suspicious IP addresses, domains and URLs</li>
                <li>Extracting file hashes from suspicious files</li>
                <li>Recognising potential malicious network indicators</li>
              </ul>
            </section>
            <section>
              <h3>IP Address Analysis:</h3>
              <ul>
                <li>Investigating suspicious source IP addresses in firewall and SIEM logs</li>
                <li>Analysing suspicious connections and authentication attempts</li>
              </ul>
            </section>
            <section>
              <h3>Phishing and Malicious URL Investigation:</h3>
              <ul>
                <li>Examining suspicious URLs and email indicators</li>
                <li>Identifying phishing characteristics and sender spoofing</li>
                <li>Assessing malicious links and attachments</li>
              </ul>
            </section>
            <section>
              <h3>MITRE ATT&amp;CK Mapping</h3>
              <ul>
                <li>Understanding adversary tactics and techniques</li>
                <li>Using attack patterns to support investigations</li>
                <li>Connecting detection rules to known attacker behaviours</li>
              </ul>
            </section>
            <section className="network-tools threat-tools">
              <h3>Tools/Framework:</h3>
              <div className="siem-tool-logos" aria-label="VirusTotal, AbuseIPDB, OpenCTI, MISP, and MITRE ATT&CK">
                <span className="siem-tool-logo" role="img" aria-label="VirusTotal" tabIndex={0}>
                  <img src={publicAsset("/images/threat-tools/virustotal.svg")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">VirusTotal</span>
                </span>
                <span className="siem-tool-logo" role="img" aria-label="AbuseIPDB" tabIndex={0}>
                  <img src={publicAsset("/images/threat-tools/anti-hat-mark.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">AbuseIPDB</span>
                </span>
                <span className="siem-tool-logo wide-tool-logo opencti-logo" role="img" aria-label="OpenCTI" tabIndex={0}>
                  <img src={publicAsset("/images/threat-tools/opencti.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">OpenCTI</span>
                </span>
                <span className="siem-tool-logo" role="img" aria-label="MISP Threat Sharing" tabIndex={0}>
                  <img src={publicAsset("/images/threat-tools/misp.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">MISP</span>
                </span>
                <span className="siem-tool-logo wide-tool-logo" role="img" aria-label="MITRE ATT&CK" tabIndex={0}>
                  <img src={publicAsset("/images/threat-tools/mitre-attack.png")} loading="lazy" decoding="async" alt=""/><span className="siem-tool-name" aria-hidden="true">MITRE ATT&amp;CK</span>
                </span>
              </div>
            </section>
          </div>}
        </div>
      </section>
    </div>}
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${headerHidden ? 'is-hidden' : ''}`}>
      <div className="nav-wrap"><div className="brand"><button className="brand-mark brand-logo-button" type="button" aria-label="Show collectible card" onClick={() => setShowMagicCard(true)}><img src={publicAsset("/images/pola.jpeg")} alt="" /></button><a className="brand-name" href="#home"><span>Abimanyu - Portfolio</span></a></div>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
        <nav className={menuOpen ? 'open' : ''} aria-label='Main navigation'>{navLinks.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
        <div className={`header-printer ${resumePrintState === 'printing' ? 'is-printing' : ''}`} ref={printerRef}>
          <img className="header-printer-art" src={publicAsset("/images/pixel-resume-station.png")} loading="lazy" decoding="async" alt="" aria-hidden="true" />
          <button className="printer-screen-trigger" type="button" disabled={resumePrintState === 'printing'} onClick={startResumePrint} aria-label={resumePrintState === 'printing' ? 'Printing resume' : 'Print resume from the pixel computer'}>
            {resumePrintState === 'printing' ? <><span>PRINTING</span><i aria-hidden="true" /></> : <span>VIEW<br/>RESUME</span>}
          </button>
        </div>
      </div>
    </header>
    <div className="printer-output-anchor" ref={printTargetRef} aria-hidden="true" />
    {resumePrintState !== 'idle' && <div className={`printer-output ${resumePrintState}`} aria-live="polite" style={{ '--print-x': `${printOrigin.x}px`, '--print-y': `${printOrigin.y}px`, '--print-scale': printOrigin.scale } as React.CSSProperties}>
      {resumePrintState === 'printing' ? <div className="printer-output-paper" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/></div> : <button className="printed-resume" type="button" onClick={openResume} aria-label="Open printed resume"><span className="printed-resume-tape tape-left"/><span className="printed-resume-tape tape-right"/><span className="printed-resume-label">ABIMANYU</span><span className="printed-resume-rule"/><span className="printed-resume-preview"><ResumePdf src={resumeUrl}/></span></button>}
    </div>}

    <main id="main">
      <section className="hero section-shell" id="home"><div className="hero-copy"><h1 aria-label="Cybersecurity Engineer: exploring offensive security and defensive operations"><span className="hero-static-prefix">{profile.title}</span>{' '}<span className="hero-rotator" aria-hidden="true"><span>{visibleBefore}</span><em className={`hero-phrase-highlight ${currentHeroPhrase.tone}`}>{visibleHighlight}</em><span>{visibleAfter}</span><i className="hero-type-caret"/></span></h1><p className="hero-intro">Hi, my name is Abimanyu. I’m a 21-year-old junior cybersecurity engineer interested in security operations and looking for a job, currently located in Chennai.</p><div className="hero-contact-links"><a className="hero-contact-link linkedin-link" href="https://www.linkedin.com/in/abimanyu-m/" target="_blank" rel="noreferrer" aria-label="Open Abimanyu's LinkedIn profile"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 2H3.55C2.7 2 2 2.67 2 3.5v17c0 .83.7 1.5 1.55 1.5h16.9c.86 0 1.55-.67 1.55-1.5v-17c0-.83-.69-1.5-1.55-1.5ZM8 19H5V9h3v10ZM6.5 7.73a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-4.87c0-2.92-3.5-2.7-3.5 0V19h-3V9h3v1.6c1.4-2.6 6.5-2.8 6.5 2.5V19Z"/></svg></a><a className="hero-contact-link email-link" href="https://mail.google.com/mail/u/0/#inbox?compose=new&amp;to=abimanyu.mva%40gmail.com" aria-label="Compose an email to Abimanyu at abimanyu.mva@gmail.com"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18A1.5 1.5 0 0 1 22.5 7v10a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 17V7A1.5 1.5 0 0 1 3 5.5Z"/><path d="m2.5 7 9.5 7 9.5-7"/></svg></a><a className="hero-contact-link github-link" href="https://github.com/Broccolic55" target="_blank" rel="noreferrer" aria-label="Open Abimanyu's GitHub profile"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.77 2.02 3.22 1.46.1-.72.4-1.21.7-1.49-2.5-.28-5.13-1.25-5.13-5.54 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.63 5.25-5.14 5.53.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z"/></svg></a></div></div>
        <div className="hero-portrait" role="img" aria-label="Abimanyu studying; hover to see him wave"><img className="hero-portrait-study" src={publicAsset("/images/abi-study.webp")} alt="" loading="eager" fetchPriority="high" decoding="async" /><img className="hero-portrait-wave" src={publicAsset("/images/abi-wave.webp")} alt="" loading="eager" decoding="async" /></div>
        <div className="hero-index"><span>01</span><div/></div>
      </section>

      <section className="about section-shell" id="about"><div className="section-marker"><span>01</span><span>ABOUT</span></div><SectionHead eyebrow="ABOUT" title="ABOUT ME" className="about-section-head"/><div className="about-grid"><p className="about-lead">{profile.about}</p></div><div className="education-journey" style={{ '--journey-height': `${educationMilestones.length * 100}vh`, '--journey-count': educationMilestones.length } as React.CSSProperties}><div className="education-journey-stage"><div className="education-journey-frame"><header className="journey-header"><div><span className="journey-eyebrow">EDUCATION</span><h3>My Journey so far</h3></div></header><div className={`journey-map ${postFallVisible ? 'is-post-fall-visible' : ''}`}><svg className="journey-route" viewBox="0 0 1200 580" preserveAspectRatio="none" aria-hidden="true"><path className="journey-route-base" d="M96 490 C200 485 220 450 336 450 S470 450 588 400 S720 350 840 350 S965 340 1020 330"/><path className="journey-route-progress" d="M96 490 C200 485 220 450 336 450 S470 450 588 400 S720 350 840 350 S965 340 1020 330"/><path className="journey-route-future" d="M1020 330 C1040 326 1060 321 1080 312"/><g className="journey-route-nodes"><circle cx="336" cy="450" r="8"/><circle cx="588" cy="400" r="8"/><circle cx="840" cy="350" r="8"/><circle cx="1020" cy="330" r="8"/></g></svg><div className="journey-traveler" aria-hidden="true"><div className="journey-walker"/><img className="journey-fall" src={publicAsset("/images/education-fall-job.png")} loading="lazy" decoding="async" alt=""/></div><div className="journey-post-fall" aria-hidden="true"><img className="journey-post-fall-message" src={publicAsset("/images/journey-come-on.png")} loading="lazy" decoding="async" alt=""/><img className="journey-post-fall-character" src={publicAsset("/images/journey-slender-character.png")} loading="lazy" decoding="async" alt=""/></div>{educationMilestones.map((milestone, index) => { const positions = [[8, 84.5], [28, 77.6], [49, 69], [70, 60.3], [85, 56.9]][index]; return <div className={`journey-stop ${educationStep === index ? 'is-active' : ''} ${educationStep > index ? 'has-passed' : ''}`} key={milestone.key} style={{ left: `${positions[0]}%`, top: `${positions[1]}%` }} aria-current={educationStep === index ? 'step' : 'false'} aria-hidden={educationStep !== index}>{milestone.kind !== 'next' && <div className={`journey-art journey-art-${milestone.kind}`}><EducationArtwork kind={milestone.kind}/></div>}{milestone.kind !== 'beginning' && <span className="journey-stop-pin"/>}</div> })}</div><article className="journey-detail" key={currentEducation.key} aria-live="polite"><div className="journey-detail-top"><span>{currentEducation.label}</span><span>{currentEducation.year}</span></div><h4>{currentEducation.title}</h4><p>{currentEducation.subtitle}</p><strong className={/score|cgpa/i.test(currentEducation.result) ? 'journey-metric' : undefined}>{currentEducation.result}</strong></article><div className="journey-footer"><span>SCROLL TO FOLLOW THE JOURNEY</span><span>{String(educationStep + 1).padStart(2, '0')} / {String(educationMilestones.length).padStart(2, '0')}</span></div></div></div></div></section>

      <section className="focus section-shell" id="focus"><div className="section-marker"><span>02</span><span>AREAS OF FOCUS</span></div><SectionHead eyebrow="SECURITY, FROM THE SYSTEM UP" title="Areas I’m working on" copy="A broad foundation with a hands-on focus on defensive security and understanding the underlying systems." className="focus-section-head"/><div className="focus-scene-shell"><iframe className="focus-scene-frame" title="Interactive glass cards for cybersecurity focus areas" src={publicAsset("/areas-focus/index.html")} loading="lazy" allow="fullscreen" /></div><p className="focus-scene-hint" aria-hidden="true">DRAG TO EXPLORE · SCROLL TO MOVE</p></section>
      <CredentialsSection />


      <ToolsMarquee />

      <section className="projects project-explorer" id="projects">
        <div className="project-explorer-head"><h2>PROJECTS</h2><p>Hover over the folder to explore project files.</p></div>
        <div className={`project-folder-stage ${projectFolderOpen ? 'is-open' : ''}`} onMouseEnter={() => setProjectFolderOpen(true)} onMouseLeave={() => setProjectFolderOpen(false)} onFocusCapture={() => setProjectFolderOpen(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setProjectFolderOpen(false) }}>
          <div className="folder-documents">{profile.projects.map((project, index) => <button className={`folder-document folder-document-${index + 1}`} type="button" key={project.title} onClick={() => setSelectedProjectIndex(index)} aria-label={`Open project details: ${project.title}`}><span className="folder-document-meta">{project.category} <i>✦</i></span><strong>{project.title}</strong><span className="folder-document-highlight">Project notes</span><span className="folder-document-copy">{project.description}</span><span className="folder-document-foot">OPEN FILE <b>↗</b></span></button>)}</div>
          <button className="project-folder" type="button" aria-label="Open project folder" aria-expanded={projectFolderOpen} onClick={() => setProjectFolderOpen(open => !open)}><svg className="folder-back" viewBox="0 0 380 292" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="folder-fill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#58b9fa"/><stop offset=".55" stopColor="#2089d0"/><stop offset="1" stopColor="#1475ba"/></linearGradient><linearGradient id="folder-sheen" x1="0" y1="0" x2="1" y2=".5"><stop offset="0" stopColor="#ffffff" stopOpacity=".48"/><stop offset=".4" stopColor="#ffffff" stopOpacity="0"/><stop offset="1" stopColor="#ffffff" stopOpacity=".12"/></linearGradient></defs><path d="M2 42C2 23 17 8 36 8h52c10 0 17 3 24 9l27 19c7 5 14 6 23 6h182c19 0 34 15 34 34v178c0 19-15 34-34 34H36c-19 0-34-15-34-34Z" fill="url(#folder-fill)" stroke="#aadde4" strokeWidth="2"/><path d="M2 42C2 23 17 8 36 8h52c10 0 17 3 24 9l27 19c7 5 14 6 23 6h182c19 0 34 15 34 34v178c0 19-15 34-34 34H36c-19 0-34-15-34-34Z" fill="url(#folder-sheen)"/></svg><span className="folder-paper paper-one"/><span className="folder-paper paper-two"/><span className="folder-paper paper-three"/><span className="folder-front"><span className="folder-front-top"><span>PORTFOLIO ARCHIVE</span><span>0{profile.projects.length} FILES</span></span><span className="folder-front-date">PROJECTS</span></span></button>
          <span className="folder-hint">{projectFolderOpen ? 'SELECT A DOCUMENT TO OPEN' : 'HOVER TO OPEN THE PROJECT FOLDER'}</span>
        </div>
      </section>
      {selectedProjectIndex !== null && <div className="project-detail-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSelectedProjectIndex(null) }}>
        <section className={`project-detail-dialog ${isArchitectureProject ? 'project-detail-dialog-architecture' : ''} ${selectedProjectTitle === 'Securing MRI Images Using Steganography & Cryptographic Protection' ? 'project-detail-dialog-mri' : ''}`} role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
          <div className="project-dialog-top">{!isArchitectureProject && <span>PROJECT FILE / 0{selectedProjectIndex + 1}</span>}<button type="button" aria-label="Close project details" onClick={() => setSelectedProjectIndex(null)}>×</button>{selectedProjectTitle === 'Securing MRI Images Using Steganography & Cryptographic Protection' && <a className="project-conference-paper-link" href="https://ieeexplore.ieee.org/document/11377979" target="_blank" rel="noreferrer">Conference Paper</a>}</div>
          {!isArchitectureProject && <span className="project-dialog-category">{profile.projects[selectedProjectIndex].category}</span>}
          <h2 id="project-dialog-title">{profile.projects[selectedProjectIndex].title}</h2>
          <p className="project-dialog-summary">{profile.projects[selectedProjectIndex].description}</p>
          {isArchitectureProject ? <>
            <div className="project-architecture-wrap">
              <div className="project-dialog-label">{selectedProjectTitle === 'Security Monitoring Lab' ? 'LAB ARCHITECTURE' : selectedProjectTitle === 'Real-Time Dynamic Firewall Configuration for Home Devices' ? 'NETWORK ARCHITECTURE' : selectedProjectTitle === 'Securing MRI Images Using Steganography & Cryptographic Protection' ? 'MRI SECURITY ARCHITECTURE' : 'PRIVACY-PRESERVING AI ARCHITECTURE'}</div>
              <button className="project-architecture-trigger" type="button" aria-label={`Enlarge ${selectedProjectTitle} architecture`} onClick={() => setShowArchitecture(true)}>
                <img className="project-architecture" src={selectedArchitecture} alt={`${selectedProjectTitle} architecture diagram.`} />
              </button>
            </div>
            <div className="project-detail-sections">
              <section><h3 className="project-dialog-label">REQUIREMENTS</h3><div className="project-dialog-chip-row">{(selectedProjectTitle === 'Security Monitoring Lab' ? ['VirtualBox', 'Kali', 'Ubuntu', 'OPNsense', 'ModSecurity', 'Wazuh'] : selectedProjectTitle === 'Real-Time Dynamic Firewall Configuration for Home Devices' ? ['Router', 'Wi-Fi AP', 'Linux', 'Python', 'nftables', 'Threat Feeds'] : selectedProjectTitle === 'Securing MRI Images Using Steganography & Cryptographic Protection' ? ['Python', 'ADNI Dataset', 'MRI Images', 'AES-128', 'ASCON', 'ECC'] : ['Python', 'Hospital Data', 'Local Compute Nodes', 'Federated Learning', 'Differential Privacy', 'Homomorphic Encryption']).map(item => <span key={item}>{item}</span>)}</div></section>
              <section><h3 className="project-dialog-label">SKILLS</h3><div className="project-dialog-chip-row">{(selectedProjectTitle === 'Security Monitoring Lab' ? ['Networking', 'Firewalling', 'Pentesting', 'WAF', 'Logging', 'SIEM'] : selectedProjectTitle === 'Real-Time Dynamic Firewall Configuration for Home Devices' ? ['Networking', 'Firewall', 'nftables', 'Python', 'Automation', 'Monitoring'] : selectedProjectTitle === 'Securing MRI Images Using Steganography & Cryptographic Protection' ? ['Steganography', 'Cryptography', 'Encryption', 'Authentication', 'Integrity', 'Access Control', 'Image Processing', 'Secure Storage'] : ['Federated Learning', 'Differential Privacy', 'Homomorphic Encryption', 'Secure Aggregation', 'Healthcare AI', 'Data Privacy', 'Model Evaluation']).map(item => <span key={item}>{item}</span>)}</div></section>
            </div>
          </> : <>
            <div className="project-dialog-columns"><div><span className="project-dialog-label">THE QUESTION</span><p>{profile.projects[selectedProjectIndex].problem}</p></div><div><span className="project-dialog-label">APPROACH</span><p>{profile.projects[selectedProjectIndex].solution}</p></div></div>
            <div className="project-dialog-label">CONCEPTUAL FLOW</div><div className="project-dialog-flow">{profile.projects[selectedProjectIndex].pipeline.map((step, index) => <span key={step}>{step}{index < profile.projects[selectedProjectIndex].pipeline.length - 1 && <b>→</b>}</span>)}</div>
            <div className="project-dialog-tech">{profile.projects[selectedProjectIndex].technologies.map(technology => <span key={technology}>{technology}</span>)}</div>
          </>}
        </section>
        {showArchitecture && <div className="soc-architecture-lightbox" role="dialog" aria-modal="true" aria-label="Security monitoring lab architecture" onMouseDown={event => { if (event.target === event.currentTarget) setShowArchitecture(false) }}>
          <button className="soc-architecture-lightbox-close" type="button" aria-label="Close enlarged architecture" onClick={() => setShowArchitecture(false)}>×</button>
          <img src={selectedArchitecture ?? securityMonitoringArchitecture} alt={`Enlarged ${selectedProjectTitle} architecture diagram`} />
        </div>}
      </div>}


      <section className="learning section-shell">
        <div className="ai-feature-grid">
          <div className="ai-feature-copy"><span className="eyebrow">CURRENTLY EXPLORING</span><h2>Adapting to the AI Era</h2><p>I can vibe-code applications, use agentic AI to automate tasks, and learn complex topics in depth. I bring these skills into cybersecurity to investigate threats, analyze security data, and build practical defensive tools.</p></div>
          <figure className="ai-feature-visual"><img src={publicAsset("/images/ai-helpers.webp")} loading="lazy" decoding="async" alt="Abimanyu with an AI assistant robot" /></figure>
        </div>
      </section>

      <section className="contact section-shell" id="contact"><div className="contact-content"><div className="contact-intro"><h2>Let’s Connect</h2></div></div><ContactHillside/></section>
    </main>

    <footer className="footer section-shell"><p>© {new Date().getFullYear()} {profile.name}. Built with curiosity, code, and security in mind.</p><a href="#home" className="back-top">BACK TO TOP ↑</a></footer>

    {showResume && <div className={`resume-overlay ${resumeClosing ? 'is-closing' : ''}`} role="presentation" onClick={closeResume}><section className="resume-modal" role="dialog" aria-modal="true" aria-labelledby="resume-dialog-title" onClick={event => event.stopPropagation()}><div className="resume-book"><ResumePdf src={resumeUrl}/><div className="resume-toolbar"><h2 id="resume-dialog-title">Resume</h2><div><a className="resume-icon-button resume-download" href={resumeUrl} download={resumeFilename} aria-label="Download resume"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3"/></svg></a><button className="resume-icon-button resume-close" type="button" aria-label="Close resume" onClick={closeResume}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg></button></div></div></div></section></div>}

    {showMagicCard && <div className="magic-card-backdrop" role="presentation" onClick={() => setShowMagicCard(false)}><div className="magic-card-dialog" role="dialog" aria-modal="true" aria-label="Collectible card" onClick={event => event.stopPropagation()}><button className="magic-card-close" type="button" aria-label="Close card" onClick={() => setShowMagicCard(false)}>×</button><img className="magic-card-art" src={publicAsset("/images/card.png")} loading="lazy" decoding="async" alt="A collectible cybersecurity engineer card."/><div className="magic-card-caption"><span>SECURITY PORTFOLIO</span><strong><i className="rare-gem" aria-hidden="true"/>RARE FIND</strong></div></div></div>}
  </>
}

export default App
