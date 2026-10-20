import { useEffect, useRef, useState } from 'react'
import useModalScrollLock from '../hooks/useModalScrollLock'

const certificates = {
  tryhackme: {
    title: 'TryHackMe SOC Level 1 Learning Path certificate',
    banner: publicAsset('/certificates/tryhackme-soc-banner.webp'),
    hoverBanner: publicAsset('/certificates/tryhackme-soc-banner-hover.webp'),
    certificate: publicAsset('/certificates/tryhackme-soc-certificate.webp'),
    alt: 'TryHackMe SOC Level 1 Learning Path',
  },
  ibm: {
    title: 'IBM Security Operations Center in Practice certificate',
    banner: publicAsset('/certificates/ibm-soc-banner.webp'),
    hoverBanner: publicAsset('/certificates/ibm-soc-banner-hover.webp'),
    certificate: publicAsset('/certificates/ibm-certificate.webp'),
    alt: 'IBM SOC in practice',
  },
}

type CertificateKey = keyof typeof certificates

export default function CertificateBanners() {
  const [active, setActive] = useState<CertificateKey | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openedAtScrollY = useRef<number | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (active && dialog && !dialog.open) dialog.showModal()
    if (!active && dialog?.open) dialog.close()
  }, [active])

  useModalScrollLock(active !== null, openedAtScrollY)

  const closeDialog = () => {
    dialogRef.current?.close()
    setActive(null)
  }

  return <>
    <div className="credential-banners" aria-label="Certificates">
      {(Object.entries(certificates) as [CertificateKey, (typeof certificates)[CertificateKey]][]).map(([id, certificate]) => <button
        className={`credential-banner credential-banner-${id}`}
        type="button"
        key={id}
        aria-label={`View ${certificate.title}`}
        onClick={() => { openedAtScrollY.current = window.scrollY; setActive(id) }}
      >
        <img className="credential-banner-default" src={certificate.banner} alt={certificate.alt} loading="lazy" decoding="async" />
        <img className="credential-banner-hover" src={certificate.hoverBanner} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      </button>)}
    </div>
    <dialog className="certificate-dialog" ref={dialogRef} aria-label={active ? certificates[active].title : 'Certificate'} onClose={() => setActive(null)} onClick={event => { if (event.target === dialogRef.current) closeDialog() }}>
      {active && <div className="certificate-dialog-content">
        <button type="button" className="certificate-dialog-close" aria-label="Close certificate" autoFocus onClick={closeDialog}><span aria-hidden="true">×</span></button>
        <img src={certificates[active].certificate} alt={certificates[active].title} loading="lazy" decoding="async" fetchPriority="high" />
      </div>}
    </dialog>
  </>
}
import { publicAsset } from '../utils/publicAsset'
