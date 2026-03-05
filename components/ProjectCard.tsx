import Link from "next/link"

type Props = {
  id: number
  title: string
  year: number
  author: string
  abstract: string
  tags: string[]
}

export default function ProjectCard({
  id,
  title,
  year,
  author,
  abstract,
  tags
}: Props) {

  const safeTags = tags ?? []

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">

      <Link href={`/projects/${id}`}>
        <h3 className="text-lg font-bold hover:underline cursor-pointer">
          {title}
        </h3>
      </Link>

      <p className="text-sm text-gray-500">
        {author}
      </p>

      <p className="text-xs text-gray-400">
        {year}
      </p>

      <p className="mt-2 text-sm">
        {abstract}
      </p>

      <div className="flex gap-2 mt-3 flex-wrap">
        {safeTags.map((tag) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-gray-700 cursor-pointer">
              {tag}
            </span>
          </Link>
        ))}
      </div>

    </div>
  )
}