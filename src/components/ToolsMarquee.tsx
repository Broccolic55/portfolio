import { featuredTools } from '../data/profile'

export default function ToolsMarquee() {
  return <section className="tools section-shell" id="tools">
    <div className="section-marker"><span>04</span><span>TOOLS IN PRACTICE</span></div>
    <div className="section-head centered-section-head tools-section-head">
      <h2>Tools I’m familiar with</h2>
    </div>
    <div className="tool-marquee" role="region" aria-label={`Continuously scrolling tool logos: ${featuredTools.map(tool => tool.name).join(', ')}.`}>
      <div className="tool-track">
        {[0, 1].map(group => <div className="tool-set" key={group} aria-hidden={group === 1}>
          {featuredTools.map((tool, index) => <div className="tool-item" key={`${tool.name}-${index}`} aria-label={group === 0 ? tool.name : undefined}>
            <div className={`tool-mark mark-${index} ${tool.logo ? 'has-logo' : ''}`} aria-hidden="true"><span>{tool.mark}</span>{tool.logo && <img src={tool.logo} alt="" loading="lazy" decoding="async" onError={event => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement?.classList.remove('has-logo') }} />}<i/><b/></div>
          </div>)}
        </div>)}
      </div>
    </div>
  </section>
}
