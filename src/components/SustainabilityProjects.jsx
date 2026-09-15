import { Link, useParams } from "react-router-dom";
import { sustainabilityProjects, portfolioIntro, projectDisclaimer, photoCredit } from "../data/sustainabilityProjects.js";
import "./SustainabilityProjects.css";

const ProjectImage = ({ project }) => (
  <div className="project-image-shell">
    <img src={project.image} alt={project.alt} onError={(event)=>{event.currentTarget.style.display="none";event.currentTarget.nextElementSibling.hidden=false;}} />
    <div className="project-image-placeholder" hidden><span>Project photograph coming soon</span><small>{project.caption}</small></div>
  </div>
);

export function SustainabilityProjects(){
  const years=[2026,2025];
  return <main className="projects-page">
    <header className="projects-hero"><div className="projects-container"><p className="projects-kicker">Applied research · Ghana</p><h1>Sustainability Projects</h1><p>{portfolioIntro}</p><div className="projects-stats"><span><strong>16</strong> project stories</span><span><strong>2</strong> research years</span><span><strong>1</strong> practical mission</span></div></div></header>
    <section className="projects-intro"><div className="projects-container"><div><p className="projects-kicker dark">Greener production in practice</p><h2>Turning discarded materials into skills, products and possibilities.</h2></div><p>Explore how ProWIFETA learners and research teams apply prevention, reduction, recycling, upcycling and reuse through hands-on fashion, textile and product development.</p></div></section>
    {years.map(year=><section className="projects-year" key={year}><div className="projects-container"><div className="projects-year-heading"><div><p className="projects-kicker dark">Research portfolio</p><h2>{year} Projects</h2></div><span>{sustainabilityProjects.filter(p=>p.year===year).length} stories</span></div><div className="projects-grid">{sustainabilityProjects.filter(p=>p.year===year).map(project=><article className="project-card" key={project.slug}><ProjectImage project={project}/><div className="project-card-body"><div className="project-meta"><span>{project.year}</span><span>{project.approach}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-evidence"><strong>Key evidence</strong><p>{project.evidence}</p></div><Link to={`/projects/${project.slug}`}>Explore project <span aria-hidden="true">→</span></Link></div></article>)}</div></div></section>)}
    <section className="projects-cta"><div className="projects-container"><div><p className="projects-kicker">Research · Training · Partnership</p><h2>Help us advance greener production and inclusive enterprise.</h2></div><Link to="/contact">Partner with ProWIFETA</Link></div></section>
  </main>;
}

export function SustainabilityProject(){
 const {slug}=useParams(); const project=sustainabilityProjects.find(item=>item.slug===slug);
 if(!project) return <main className="project-detail"><section className="project-not-found projects-container"><h1>Project not found</h1><Link to="/projects">Return to Sustainability Projects</Link></section></main>;
 return <main className="project-detail">
  <header className="project-detail-hero"><div className="projects-container"><Link className="project-back" to="/projects">← Sustainability Projects</Link><p className="projects-kicker">{project.year} research portfolio</p><h1>{project.title}</h1><p className="project-detail-lead">{project.description}</p><div className="project-detail-tags"><span>{project.approach}</span></div></div></header>
  <section className="project-detail-content"><div className="projects-container project-detail-grid"><div><ProjectImage project={project}/><p className="project-caption">{project.caption}</p><p className="project-credit">{photoCredit}</p></div><div className="project-detail-copy"><p className="projects-kicker dark">Research team</p><h2>{project.team}</h2><div className="detail-block"><h3>Sustainability approach</h3><p>{project.approach}</p></div><div className="detail-block evidence"><h3>Key evidence</h3><p>{project.evidence}</p></div></div></div></section>
  <section className="project-disclaimer"><div className="projects-container"><strong>Research evidence note</strong><p>{projectDisclaimer}</p></div></section>
  <section className="projects-cta"><div className="projects-container"><div><p className="projects-kicker">Continue the conversation</p><h2>Discuss training, research or partnership opportunities.</h2></div><Link to="/contact">Contact ProWIFETA</Link></div></section>
 </main>;
}
