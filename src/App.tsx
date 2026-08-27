import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { SectionLabel } from './components/SectionLabel';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { siteContent, whatsappUrl } from './data/siteContent';
import './styles.css';

function App() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <Hero />

        <section className="manifesto section-light" id="sobre">
          <SectionLabel>01 / IDEIA CENTRAL</SectionLabel>
          <h2>{siteContent.manifesto.map((line) => <span key={line}>{line}</span>)}</h2>
          <p className="motion-note">UMA IGREJA QUE EDIFICA IGREJA.</p>
        </section>

        <section className="proof section-white" aria-labelledby="proof-title">
          <h2 id="proof-title">QUEM CAMINHA COM A GENTE</h2>
          <div className="proof-track">
            {siteContent.proof.map((item) => <span className="proof-item" key={item}>{item}</span>)}
          </div>
          <p className="proof-caption">Comunidade em movimento, com espaço para cada história.</p>
        </section>

        <section className="projects section-light" id="agenda">
          <SectionLabel>02 / EXPERIÊNCIAS DE FÉ</SectionLabel>
          <h2>ENCONTROS QUE<br />MARCAM</h2>
          <div className="project-grid">
            {siteContent.projects.map((project) => <ProjectCard key={project.number} {...project} />)}
          </div>
        </section>

        <section className="capacities section-dark" aria-labelledby="capacities-title">
          <SectionLabel light>03 / COMO VIVEMOS</SectionLabel>
          <h2 id="capacities-title">UMA FÉ QUE<br />CAMINHA JUNTA</h2>
          <div className="capacity-list">
            {siteContent.capacities.map((capacity) => (
              <a className="capacity-row" key={capacity.number} href={capacity.href}>
                <span>{capacity.number}</span>
                <strong>{capacity.name}</strong>
                <span className="capacity-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="impact section-white" aria-labelledby="impact-title">
          <SectionLabel>04 / NOSSA CAMINHADA</SectionLabel>
          <h2 id="impact-title" className="sr-only">Nossa caminhada em números</h2>
          <div className="impact-grid">
            {siteContent.impact.map((item) => (
              <div className="impact-card" key={item.description}>
                <strong>{item.value}</strong>
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="story section-light" aria-labelledby="story-title">
          <SectionLabel>05 / QUEM SOMOS</SectionLabel>
          <div className="story-grid">
            <div className="story-image-wrap"><img src="/assets/raw-03.png" alt="Momento de ministração na Igreja A Caverna" /></div>
            <div className="story-copy">
              <h2 id="story-title">UMA IGREJA QUE<br />EDIFICA IGREJA.</h2>
              <p>Inspirados pela caverna de Adulão, somos um lugar de refúgio, restauração e envio. Aqui, pessoas encontram Jesus, crescem em comunidade e descobrem como servir.</p>
              <blockquote>“Igreja não é apenas um lugar para ir. É uma família para pertencer.”</blockquote>
            </div>
          </div>
        </section>

        <section className="process section-white" id="processo" aria-labelledby="process-title">
          <SectionLabel>06 / COMO ACONTECE</SectionLabel>
          <h2 id="process-title">DO PRIMEIRO CONTATO<br />À VIDA EM COMUNIDADE</h2>
          <div className="process-grid">
            {siteContent.process.map((step) => (
              <article className="process-card" key={step.number}>
                <span className="process-number">{step.number}</span>
                <div className="process-symbol" aria-hidden="true">✦</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta section-dark" aria-labelledby="cta-title">
          <SectionLabel light>PRONTO PARA CAMINHAR COM A GENTE?</SectionLabel>
          <h2 id="cta-title">VENHA ENCONTRAR<br />UM LUGAR DE FÉ,<br />PRESENÇA E COMUNHÃO.</h2>
          <a className="final-cta-button" href={whatsappUrl('Olá! Quero conhecer a Igreja A Caverna.')}>INICIAR CONVERSA <span aria-hidden="true">↗</span></a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
