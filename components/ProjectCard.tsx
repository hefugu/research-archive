import Link from "next/link"

type Props = {
  id: number
  title: string
  year: number
  abstract: string
  tags: string[]
}

export default function ProjectCard({
  id,
  title,
  year,
  abstract,
  tags
}: Props) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">

      <Link href={`/projects/${id}`}>
        <h2 className="text-lg font-bold hover:underline cursor-pointer">
          {title}
        </h2>
      </Link>

      <p className="text-sm text-gray-500">
        {year}
      </p>

      <p className="mt-2">
        {abstract}
      </p>

      <div className="flex gap-2 mt-3 flex-wrap">
        {tags.map((tag) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <span className="bg-gray-800 px-2 py-1 rounded text-xs hover:bg-gray-700 cursor-pointer">
              {tag}
            </span>
          </Link>
        ))}
      </div>

    </div>
  )
}