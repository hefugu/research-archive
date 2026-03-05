import projects from "../../../data/projects.json"
import Link from "next/link"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function ProjectPage({ params }: Props) {

  const { id } = await params

  const projectId = Number(id)

  const project = projects.find((p:any) => p.id === projectId)

  if (!project) {
    return (
      <main className="p-10 max-w-4xl mx-auto">

        <p className="text-lg mb-4">
          研究が見つかりません
        </p>

        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          ホームへ戻る
        </Link>

      </main>
    )
  }

  return (
    <main className="p-10 max-w-4xl mx-auto">

      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          ホームへ戻る
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">
        {project.title}
      </h1>

      <div className="text-gray-600 space-y-1 mb-6">
        <p>年度: {project.year}</p>
        <p>作成者: {project.author}</p>
        <p>担当教員: {project.teacher}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          概要
        </h2>

        <p className="leading-relaxed">
          {project.abstract}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">

        {(project.tags ?? []).map((tag:string) => (

          <Link key={tag} href={`/tags/${tag}`}>

            <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-gray-700">
              {tag}
            </span>

          </Link>

        ))}

      </div>

      <a
        href={project.pdf}
        target="_blank"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        PDFを開く
      </a>

    </main>
  )
}