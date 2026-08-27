type ProjectCardProps = {
  number: string;
  title: string;
  tags: string;
  image: string;
  alt: string;
  href: string;
};

export function ProjectCard({ number, title, tags, image, alt, href }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-image-wrap">
        <img src={image} alt={alt} className="project-image" />
      </div>
      <div className="project-info">
        <span className="project-number">{number}</span>
        <h3>{title}</h3>
        <p>{tags}</p>
        <a href={href}>VER MAIS <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}
