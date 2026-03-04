type Props = {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="研究検索..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border p-2 rounded mb-6"
    />
  )
}