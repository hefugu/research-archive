import { writeFile, readFile } from "fs/promises"
import path from "path"

export async function POST(req: Request) {

  const form = await req.formData()

  const title = form.get("title") as string
  const author = form.get("author") as string
  const teacher = form.get("teacher") as string
  const year = Number(form.get("year"))
  const abstract = form.get("abstract") as string

  const file = form.get("file") as File

  if (!file) {
    return Response.json({ error: "ファイルなし" }, { status: 400 })
  }

  // MIMEチェック
  if (file.type !== "application/pdf") {
    return Response.json({ error: "PDFのみアップロード可能です" }, { status: 400 })
  }

  // ファイル名サニタイズ
  const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_")

  // PDF保存
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const pdfPath = path.join(
    process.cwd(),
    "public/pdf",
    safeName
  )

  await writeFile(pdfPath, buffer)

  // JSON読み込み
  const jsonPath = path.join(
    process.cwd(),
    "data/projects.json"
  )

  const data = await readFile(jsonPath, "utf8")

  const projects = JSON.parse(data)

  const newProject = {
    id: Date.now(),
    title,
    author,
    teacher,
    year,
    tags: [],
    abstract,
    pdf: `/pdf/${safeName}`
  }

  projects.push(newProject)

  await writeFile(
    jsonPath,
    JSON.stringify(projects, null, 2)
  )

  return Response.json({ status: "ok" })
}