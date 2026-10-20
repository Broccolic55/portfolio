export const profile = {
  name: 'Abimanyu',
  shortName: 'ABIMANYU',
  title: 'Cybersecurity Engineer',
  email: '',
  github: '',
  linkedin: '',
  resume: '/resume.pdf',
  about: 'I’m a cybersecurity graduate with a Bachelor of Engineering in Cyber Security, graduating in 2026 with an 8.7 CGPA.',
  interests: ['Security Operations', 'SIEM', 'Network Security', 'Linux', 'Cloud Security', 'Web Application Security', 'Threat Detection', 'AI/ML for Security'],
  experience: [{ company: 'Big Bucks Innovation Private Limited', role: 'Cybersecurity / SOC Intern', period: 'Internship', details: ['Log monitoring and threat detection', 'Splunk dashboards and alerting', 'Firewall and authentication log analysis', 'Suspicious IP and brute-force detection'] }],
  certifications: ['SOC L1', 'IBM Security Operations Center'],
  achievements: [
    { title: 'TryHackMe', metric: '100+', detail: 'hands-on labs completed', logo: 'https://cdn.simpleicons.org/tryhackme/212C42' },
    { title: 'PortSwigger', metric: '100+', detail: 'Web Security Academy labs completed', logo: 'https://cdn.simpleicons.org/portswigger/FF6633' },
    { title: 'Hack The Box Player', metric: '', detail: 'Hands-on cybersecurity practice', logo: 'https://cdn.simpleicons.org/hackthebox/9FEF00' },
  ],
  projects: [
    { title: 'Security Monitoring Lab', category: 'SOC & SIEM', description: 'A hands-on SOC laboratory environment for collecting, forwarding, analyzing, detecting, and visualizing endpoint and infrastructure telemetry.', problem: 'Security events are harder to investigate when telemetry is fragmented.', solution: 'Connect Windows and Linux telemetry to SIEM tooling and investigate practical security scenarios.', technologies: ['Wazuh', 'Splunk', 'Windows', 'Linux', 'VirtualBox'], pipeline: ['Endpoints', 'Log collection', 'Forwarding', 'SIEM', 'Detection rules', 'Investigation'] },
    { title: 'Real-Time Dynamic Firewall Configuration for Home Devices', category: 'Network Security', description: 'A Linux-based security project that dynamically manages firewall rules for connected devices using Python and nftables.', problem: 'Home network controls can be difficult to adapt as device access needs change.', solution: 'Explore automated rule management to support dynamic network control and Linux security.', technologies: ['Linux', 'Python', 'nftables', 'Networking', 'Firewall Automation'], pipeline: ['Device context', 'Policy decision', 'Rule automation', 'Network control'] },
    { title: 'Securing MRI Images Using Steganography & Cryptographic Protection', category: 'Research', description: 'A security-focused medical imaging project exploring steganography, layered cryptographic protection, authentication, integrity verification, and controlled access.', problem: 'Medical images need confidentiality and integrity protections when stored or shared.', solution: 'A conceptual pipeline combines LSB steganography with cryptographic protection and verification. Experiments use the ADNI MRI dataset; this is not a production medical deployment.', technologies: ['Python', 'AES-128', 'ASCON', 'ECC', 'LSB Steganography', 'Image Processing'], pipeline: ['Image upload', 'Cover selection', 'LSB steganography', 'Cryptographic protection', 'Authentication', 'Retrieval & integrity verification'] },
    { title: 'A Privacy Preserving Framework for AI in healthcare', category: 'Research', description: 'A privacy-centered framework for collaborative healthcare AI that keeps hospital data local and combines federated learning, differential privacy, and homomorphic encryption to protect patient information during model training and aggregation.', problem: 'Centralizing sensitive patient records for AI training can increase the risk of breaches and privacy violations, erode patient trust, and conflict with healthcare regulations and ethical standards.', solution: 'Enable participating hospitals to train a shared model without moving their patient data. Apply differential privacy to limit information exposure from individual records and homomorphic encryption to protect model updates during aggregation, supporting responsible and regulation-aware AI adoption.', technologies: ['Federated Learning', 'Differential Privacy', 'Homomorphic Encryption', 'Healthcare AI', 'Data Privacy'], pipeline: ['Local hospital data', 'Federated model training', 'Differential privacy', 'Encrypted model updates', 'Secure aggregation', 'Collaborative AI model'] },
  ],
}

export const focusAreas = [
  ['01', 'Security Operations', 'SIEM, log analysis, detection engineering, alert investigation and incident response fundamentals.'],
  ['02', 'Networking', 'Traffic analysis, firewalls, segmentation, protocols and network monitoring.'],
  ['03', 'Linux', 'Processes, permissions, services, logs and practical system hardening.'],
  ['04', 'Web Application Security', 'OWASP, Burp Suite, web vulnerabilities and application security testing.'],
  ['05', 'Incident Response', 'Alert triage, incident investigation, containment and response fundamentals.'],
  ['06', 'Threat Intelligence', 'Threat research, indicators, adversary behavior and actionable intelligence.'],
]

export const featuredTools = [
  { name: 'Wireshark', mark: 'W', logo: 'https://cdn.simpleicons.org/wireshark/1679A7' },
  { name: 'Nmap', mark: 'N', logo: 'https://nmap.org/images/nmap-logo-256x256.png' },
  { name: 'Metasploit', mark: 'M', logo: '/tools/metasploit.png' },
  { name: 'Burp Suite', mark: 'B', logo: '/tools/burpsuite.png' },
  { name: 'SQLmap', mark: 'SQL', logo: '/tools/sqlmap.png' },
  { name: 'Netcat', mark: 'nc', logo: '/tools/netcat.png' },
  { name: 'Exploit Database', mark: 'EDB', logo: '/tools/exploit-db.png' },
  { name: 'John the Ripper', mark: 'JtR', logo: '/tools/john-the-ripper.svg' },
  { name: 'PEASS-ng', mark: 'PEASS', logo: '/tools/peass-ng-logo.svg' },
  { name: 'Visual Studio Code', mark: 'VS', logo: '/tools/vscode.png' },
  { name: 'GitHub', mark: 'GH', logo: '/tools/github.png' },
  { name: 'VirusTotal', mark: 'VT', logo: 'https://cdn.simpleicons.org/virustotal/394EFF' },
  { name: 'Hydra', mark: 'H', logo: '/tools/hydra.png' },
]
