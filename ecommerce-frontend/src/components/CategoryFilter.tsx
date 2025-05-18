interface Props { categories: string[]; selected: string; onSelect: (cat: string) => void }
export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 p-4">
      {categories.map(cat => (
        <button
          key={cat}
          className={`px-3 py-1 rounded ${selected === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => onSelect(cat)}
        >{cat}</button>
      ))}
    </div>
  )
}