type Props = {
  tags: string[]
  value: string | null
  onChange: (tag: string | null) => void
}

export default function TagFilter({ tags, value, onChange }: Props) {

  return (
    <div className="flex gap-2 flex-wrap mb-6">

      <button
        className="px-3 py-1 border rounded"
        onClick={() => onChange(null)}
      >
        すべて
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          className="px-3 py-1 border rounded"
          onClick={() => onChange(tag)}
        >
          {tag}
        </button>
      ))}

    </div>
  )
}