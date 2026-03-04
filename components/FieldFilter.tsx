type Props = {
    value: number | null
    onChange: (value: number | null) => void
}

export default function FieldFilter({ value, onChange }: Props) {
    return (
        <div className="flex gap-3 mb-6">
            <button
                className="px-3 py-1 border rounded"
                onClick={() => onChange(null)}
            >
                すべて
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => onChange(1)}
            >
                1分野
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => onChange(2)}
            >
                2分野
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => onChange(3)}
            >
                3分野
            </button>
        </div>
    )
}