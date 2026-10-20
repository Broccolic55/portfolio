const logos = [
  { brand: 'github', label: 'GitHub', image: 'github-plaque.png', href: 'https://github.com/Broccolic55' },
  { brand: 'linkedin', label: 'LinkedIn', image: 'linkedin-plaque.png', href: 'https://www.linkedin.com/in/abimanyu-m/' },
  { brand: 'email', label: 'Email', image: 'gmail-plaque.png', href: 'mailto:abimanyu1452005@gmail.com' },
]

export default function ContactHillside() {
  return <div className="contact-landscape" aria-label="Connect with me">
    <img className="contact-hillside-photo" src={publicAsset('/images/contact-hillside-premium.png')} alt="A wildflower-covered green hillside beneath a cloudy sky" loading="lazy" decoding="async" />
    <div className="contact-emblem-row">
      {logos.map(({ brand, label, image, href }) => <a key={brand} className={`contact-emblem contact-emblem-${brand}`} href={href} target={brand === 'email' ? undefined : '_blank'} rel={brand === 'email' ? undefined : 'noreferrer'} aria-label={brand === 'email' ? 'Send me an email' : `Visit my ${label} profile`}>
        <img src={publicAsset(`/images/contact-logos/${image}`)} alt="" />
      </a>)}
    </div>
    <img className="contact-grass-foreground" src={publicAsset('/images/contact-hillside-premium.png')} alt="" aria-hidden="true" loading="lazy" decoding="async" />
  </div>
}
import { publicAsset } from '../utils/publicAsset'
