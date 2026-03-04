type Props = {
  teachers: string[]
  value: string | null
  onChange: (teacher: string | null) => void
}

export default function TeacherFilter({ teachers, value, onChange }: Props) {
  return (
    <div className="flex gap-3 mb-6 flex-wrap">

      <button
        className="px-3 py-1 border rounded"
        onClick={() => onChange(null)}
      >
        すべて
      </button>

      {teachers.map((t) => (
        <button
          key={t}
          className="px-3 py-1 border rounded"
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}

    </div>
  )
}