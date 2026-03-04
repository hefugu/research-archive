"use client"

import { useState } from "react"
import { projects } from "../data/projects"
import ProjectCard from "../components/ProjectCard"
import FieldFilter from "../components/FieldFilter"
import TeacherFilter from "../components/TeacherFilter"
import SearchBar from "../components/SearchBar"

export default function Home() {

  const [field, setField] = useState<number | null>(null)
  const [teacher, setTeacher] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  const teachers = Array.from(
    new Set(projects.map((p) => p.teacher))
  )

  const filtered = projects.filter((p) => {

    if (field !== null && p.field !== field) return false

    if (teacher !== null && p.teacher !== teacher) return false

    if (query !== "" &&
        !p.title.toLowerCase().includes(query.toLowerCase()) &&
        !p.abstract.toLowerCase().includes(query.toLowerCase())
    ) return false

    return true
  })

  return (
    <main className="p-10 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        課題研究アーカイブ
      </h1>

      <SearchBar value={query} onChange={setQuery} />

      <FieldFilter value={field} onChange={setField} />

      <TeacherFilter
        teachers={teachers}
        value={teacher}
        onChange={setTeacher}
      />

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