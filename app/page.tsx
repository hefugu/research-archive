"use client"

import { useState } from "react"
import Link from "next/link"

import projects from "../data/projects.json"

import ProjectCard from "../components/ProjectCard"
import FieldFilter from "../components/FieldFilter"
import TeacherFilter from "../components/TeacherFilter"
import TagFilter from "../components/TagFilter"
import SearchBar from "../components/SearchBar"

export default function Home() {

  const [field, setField] = useState<number | null>(null)
  const [teacher, setTeacher] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [tag, setTag] = useState<string | null>(null)

  const teachers = Array.from(
    new Set(projects.map((p:any) => p.teacher))
  )

  const tags = Array.from(
    new Set(projects.flatMap((p:any) => p.tags ?? []))
  )

  const filtered = projects.filter((p:any) => {

    if (field !== null && p.field !== field) return false

    if (teacher !== null && p.teacher !== teacher) return false

    if (tag !== null && !(p.tags ?? []).includes(tag)) return false

    if (
      query !== "" &&
      !p.title.toLowerCase().includes(query.toLowerCase()) &&
      !p.abstract.toLowerCase().includes(query.toLowerCase())
    ) return false

    return true
  })

  const years = Array.from(
    new Set(filtered.map((p:any) => p.year))
  ).sort((a, b) => b - a)

  return (
    <main className="w-full max-w-none px-10 py-10">

      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-10">

        <h1 className="text-3xl font-bold">
          課題研究アーカイブ
        </h1>

        <Link
          href="/upload"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          研究をアップロード
        </Link>

      </div>

      <div className="grid grid-cols-[240px_minmax(0,1fr)] gap-12">

        {/* フィルター */}
        <aside className="space-y-6 sticky top-8 h-fit">

          <SearchBar
            value={query}
            onChange={setQuery}
          />

          <details className="border rounded p-4">
            <summary className="cursor-pointer font-semibold">
              分野
            </summary>

            <div className="mt-3">
              <FieldFilter
                value={field}
                onChange={setField}
              />
            </div>

          </details>

          <details className="border rounded p-4">

            <summary className="cursor-pointer font-semibold">
              担当教員
            </summary>

            <div className="mt-3">

              <TeacherFilter
                teachers={teachers}
                value={teacher}
                onChange={setTeacher}
              />

            </div>

          </details>

          <details className="border rounded p-4">

            <summary className="cursor-pointer font-semibold">
              タグ
            </summary>

            <div className="mt-3">

              <TagFilter
                tags={tags}
                value={tag}
                onChange={setTag}
              />

            </div>

          </details>

        </aside>

        {/* 研究一覧 */}
        <section className="space-y-12">

          {years.map((year) => {

            const yearProjects = filtered.filter(
              (p:any) => p.year === year
            )

            return (

              <div key={year}>

                <h2 className="text-2xl font-bold mb-6">
                  {year} ({yearProjects.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">

                  {yearProjects.map((p:any) => (

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

              </div>

            )

          })}

        </section>

      </div>

    </main>
  )
}