import { projects } from "../../../data/projects"
import ProjectCard from "../../../components/ProjectCard"

type Props = {
  params: {
    tag: string
  }
}

export default function TagPage({ params }: Props) {

  const filtered = projects.filter((p) =>
    p.tags.includes(params.tag)
  )

  return (
    <main className="p-10 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        タグ: {params.tag}
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((p) => (
          <ProjectCard
            key={p.id}
            id={p.id}
            title={p.title}
            year={p.year}
            abstract={p.abstract}
            tags={p.tags}
          />
        ))}
      </div>

    </main>
  )
}