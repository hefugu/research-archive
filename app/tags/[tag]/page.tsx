import projects from "../../../data/projects.json"
import ProjectCard from "../../../components/ProjectCard"
import Link from "next/link"

type Props = {
  params: {
    tag: string
  }
}

export default function TagPage({ params }: Props) {

  const tag = decodeURIComponent(params.tag)

  const filtered = projects.filter((p: any) =>
    (p.tags ?? []).includes(tag)
  )

  return (
    <main className="p-10 max-w-6xl mx-auto">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold">
          タグ: {tag}
        </h1>

        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          ホームへ戻る
        </Link>

      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500">
          このタグの研究はまだありません
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filtered.map((p: any) => (
          <ProjectCard
            key={p.id}
            id={p.id}
            title={p.title}
            year={p.year}
            abstract={p.abstract}
            tags={p.tags ?? []}
          />
        ))}

      </div>

    </main>
  )
}