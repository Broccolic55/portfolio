import { useEffect, useRef, useState } from 'react'
import useModalScrollLock from '../hooks/useModalScrollLock'

const BOARD_WIDTH = 1352
const BOARD_HEIGHT = 1163

const noticeItems = [
  {
    id: 'tryhackme', title: 'TryHackMe · 100+ labs', kind: 'HANDS-ON LEARNING', image: 'tryhackme.png',
    detail: [
      'Completed 100+ hands-on labs on TryHackMe.',
      'Practised on vulnerable Linux and Windows machines.',
      'Strengthened foundations in computer networking.',
      'Explored blue-team techniques and offensive security training.',
    ], x: 97, y: 151, w: 346, h: 392,
  },
  {
    id: 'python', title: 'Python · HackerRank Basic', kind: 'SKILL NOTE', image: 'python.png',
    detail: [
      'Completed the Python (Basic) certification on HackerRank.',
      'Write small scripts to understand and work with code.',
      'Automate log-parsing tasks and explore packet analysis.',
    ], x: 407, y: 113, w: 121, h: 140,
  },
  {
    id: 'cybersecurity-conference', title: 'Cybersecurity Meetups', kind: 'COMMUNITY', image: 'cybersecurity-conference.png',
    detail: [
      'Take part in cybersecurity meetups and learn from industry experts.',
      'Stay current with emerging security trends and ideas.',
      'Build connections through thoughtful conversations with new people.',
      'Every conversation is a chance to see security from a new perspective.',
    ], x: 605, y: 132, w: 428, h: 316,
  },
  {
    id: 'portswigger', title: 'PortSwigger · 100+ labs', kind: 'WEB SECURITY', image: 'portswigger.png',
    detail: [
      'Completed 100+ PortSwigger Web Security Academy labs.',
      'Built a strong foundation in the OWASP Top 10 vulnerabilities.',
      'Practised how web requests and responses work.',
      'Used Burp Suite and learned to reason from an attacker’s perspective.',
    ], x: 1008, y: 139, w: 253, h: 330,
  },
  {
    id: 'ibm', title: 'IBM Security Operations Center', kind: 'TRAINING', image: 'ibm.png',
    detail: [
      'Explored Artificial Intelligence Fundamentals.',
      'Studied security operations through IBM Security Operations Center in Practice.',
      'Connected AI concepts with the workflows used to monitor and respond to security events.',
    ], x: 458, y: 284, w: 164, h: 140,
  },
  {
    id: 'codetrix', title: 'CodeTrix', kind: 'CYBERSECURITY EVENT', image: 'codetrix.png',
    detail: [
      'Helped organize CodeTrix in March 2025 with the Whitehatians Club.',
      'Focused on UI/UX design informed by secure practices.',
      'Engaged with participants at an event built around creative thinking.',
    ], x: 535, y: 425, w: 505, h: 388,
  },
  {
    id: 'hackthebox', title: 'Hack The Box', kind: 'PRACTICE', image: 'hackthebox.png',
    detail: [
      'Actively explore and solve machines on Hack The Box.',
      'Build an attacker’s mindset through hands-on offensive techniques, tactics, and methodologies.',
      'Read write-ups for challenging labs and consider how defenders can detect and prevent similar attacks.',
    ], x: 1030, y: 470, w: 258, h: 300,
  },
  {
    id: 'workshop-photo', title: 'Best Mini Project · First Prize', kind: 'PROJECT AWARD', image: 'workshop-photo.png',
    detail: [
      'Won first prize in the Best Mini Project competition for securing MRI images with cryptography and steganography.',
      'Implemented and clearly demonstrated the project, its benefits, and potential advancements.',
      'Built hands-on technical expertise while exploring real-world projects at the event.',
      'Received a cash prize and quantitative aptitude books; strengthened teamwork and leadership.',
    ], x: 92, y: 520, w: 458, h: 301,
  },
  {
    id: 'jira', title: 'Jira', kind: 'PROJECT WORKFLOW', image: 'jira.png',
    detail: [
      'Create and track security incident tickets, investigation status, and next actions.',
      'Document evidence and timelines so each investigation has a clear record.',
      'Close false positives after thorough investigation; escalate true positives with supporting findings.',
    ], x: 341, y: 786, w: 248, h: 162,
  },
  {
    id: 'letsdefend', title: 'LetsDefend', kind: 'SOC PRACTICE', image: 'letsdefend.png',
    detail: [
      'Actively practise through LetsDefend SOC labs.',
      'Build hands-on experience with alert triage, investigation, and incident handling.',
      'Explore phishing and email, network-log, and malware analysis.',
    ], x: 988, y: 751, w: 217, h: 163,
  },
  {
    id: 'sql', title: 'SQL · HackerRank Intermediate', kind: 'SKILL NOTE', image: 'sql.png',
    detail: [
      'Earned the HackerRank SQL (Intermediate) certificate.',
      'Strong foundation in SQL fundamentals and data retrieval, filtering, sorting, and manipulation.',
      'Apply structured data analysis to security and operational use cases.',
      'Understand how SQL injection attacks target database queries.',
    ], x: 551, y: 869, w: 167, h: 156,
  },
  {
    id: 'apisec', title: 'APIsec University', kind: 'TRAINING', image: 'apisec.png',
    detail: [
      'Explored offensive API testing to identify weaknesses in endpoints, authentication, and data handling.',
      'Studied defensive techniques such as secure API design, access controls, input validation, and safer error handling.',
      'Practised thinking through both how API risks are found and how they can be reduced.',
    ], x: 1035, y: 905, w: 201, h: 164,
  },
]

type NoticeItem = (typeof noticeItems)[number]

export default function NoticeBoard() {
  const [activeItem, setActiveItem] = useState<NoticeItem | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const openedAtScrollY = useRef<number | null>(null)

  useEffect(() => {
    const board = boardRef.current
    if (!board) return
    board.classList.add('scroll-glass-item')
    if (!('IntersectionObserver' in window)) {
      board.classList.add('is-revealed')
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      board.classList.toggle('is-revealed', entry.isIntersecting)
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' })
    observer.observe(board)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (activeItem && dialog && !dialog.open) dialog.showModal()
    if (!activeItem && dialog?.open) dialog.close()
  }, [activeItem])

  useModalScrollLock(activeItem !== null, openedAtScrollY)

  const closeDialog = () => {
    dialogRef.current?.close()
    setActiveItem(null)
  }

  return <div className="notice-board-component" ref={boardRef}>
    <p className="notice-board-hint"><span aria-hidden="true">✦</span> Explore pinned Posters</p>
    <div className="notice-board-stage" aria-label="Interactive cybersecurity notice board">
      <svg className="notice-board-threads" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className="notice-board-thread-shadow" d="M50 1 L8 11 M50 1 L92 11" />
        <path className="notice-board-thread" d="M50 1 L8 11 M50 1 L92 11" />
      </svg>
      <span className="notice-board-hanger" aria-hidden="true"><i /></span>
      <img className="notice-board-art" src={publicAsset('/noticeboard/board.png')} alt="A corkboard of cybersecurity training, event posters, and achievement badges." draggable="false" loading="lazy" decoding="async" />
      {noticeItems.map(item => <button
        className="notice-board-pin"
        key={item.id}
        type="button"
        aria-label={`Open details: ${item.title}`}
        onClick={() => { openedAtScrollY.current = window.scrollY; setActiveItem(item) }}
        style={{
          left: `${item.x / BOARD_WIDTH * 100}%`,
          top: `${item.y / BOARD_HEIGHT * 100}%`,
          width: `${item.w / BOARD_WIDTH * 100}%`,
          height: `${item.h / BOARD_HEIGHT * 100}%`,
        }}
      >
        <img src={publicAsset(`/noticeboard/${item.image}`)} alt="" draggable="false" loading="lazy" decoding="async" />
      </button>)}
    </div>
    <dialog className="notice-board-dialog" ref={dialogRef} aria-labelledby="notice-dialog-title" onClose={() => setActiveItem(null)} onClick={event => { if (event.target === dialogRef.current) closeDialog() }}>
      {activeItem && <div className="notice-dialog-content">
        <span className="notice-dialog-kicker">NOTICE BOARD / {activeItem.kind}</span>
        <h3 id="notice-dialog-title">{activeItem.title}</h3>
        <ul className="notice-dialog-details">{activeItem.detail.map(detail => <li key={detail}>{detail}</li>)}</ul>
        <button type="button" className="notice-dialog-close" aria-label="Close poster details" autoFocus onClick={closeDialog}><span aria-hidden="true">×</span></button>
      </div>}
    </dialog>
  </div>
}
import { publicAsset } from '../utils/publicAsset'
