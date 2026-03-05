"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function UploadPage() {

  const router = useRouter()

  const [title,setTitle] = useState("")
  const [author,setAuthor] = useState("")
  const [teacher,setTeacher] = useState("")
  const [year,setYear] = useState(2026)
  const [field,setField] = useState(1)
  const [tags,setTags] = useState("")
  const [abstract,setAbstract] = useState("")
  const [file,setFile] = useState<File | null>(null)

  async function handleSubmit(e:React.FormEvent) {

    e.preventDefault()

    if(!file){
      alert("PDFを選択してください")
      return
    }

    const form = new FormData()

    form.append("title",title)
    form.append("author",author)
    form.append("teacher",teacher)
    form.append("year",String(year))
    form.append("field",String(field))
    form.append("tags",tags)
    form.append("abstract",abstract)
    form.append("file",file)

    const res = await fetch("/api/upload",{
      method:"POST",
      body:form
    })

    if(!res.ok){
      alert("アップロード失敗")
      return
    }

    alert("アップロード完了")

    router.push("/")
  }

  return (
    <main className="p-10 max-w-xl mx-auto">

      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          ← ホームへ戻る
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        研究アップロード
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="border p-2 w-full"
          placeholder="タイトル"
          value={title}
          onChange={e=>setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="作成者"
          value={author}
          onChange={e=>setAuthor(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="担当教員"
          value={teacher}
          onChange={e=>setTeacher(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={field}
          onChange={e=>setField(Number(e.target.value))}
        >
          <option value={1}>1分野</option>
          <option value={2}>2分野</option>
          <option value={3}>3分野</option>
        </select>

        <input
          className="border p-2 w-full"
          placeholder="タグ（カンマ区切り） 例: AI,画像処理"
          value={tags}
          onChange={e=>setTags(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 w-full"
          value={year}
          onChange={e=>setYear(Number(e.target.value))}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="概要"
          value={abstract}
          onChange={e=>setAbstract(e.target.value)}
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={e=>setFile(e.target.files?.[0] || null)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          アップロード
        </button>

      </form>

    </main>
  )
}