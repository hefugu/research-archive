import { projects } from "../../../data/projects"

type Props = {
    params: {
        id: string
    }
}

export default function ProjectPage({ params }: Props) {

    const project =projects.find(
        (p) => p.id === Number(params.id)
    )

    if(!project) {
        return <p>研究が見つかりませんでした</p>
    }
    
    return (
        <main className="p-10 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">
                {project.title}
            </h1>
            <p className="text-sm text-gray-400 mb-6">
                {project.year}年度
            </p>
            <p className="mb-6">
                {project.abstract}
            </p>

            <div className="flex gap=2">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-gray-800 px-2 py-1 rounded text-sm"
                        >
                            {tag}
                        </span> 
                ))}
            </div>
            </main>
    )
}