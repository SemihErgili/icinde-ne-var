interface NutritionalValues {
  calories: string
  protein: string
  carbs: string
  fat: string
  fiber: string
}

interface ProductInfoProps {
  product: {
    name: string
    brand: string
    price: string
    weight: string
    nutritionalValues: NutritionalValues
    origin: string
    expiryDate: string
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div>
      <div className="grid grid-cols-4 text-center mb-3 bg-gray-50 rounded-lg p-2">
        <NutritionSummary label="Yağ" value="0.2g" />
        <NutritionSummary label="Karb" value="14g" />
        <NutritionSummary label="Prot" value="0.3g" />
        <NutritionSummary label="Kalori" value={product.nutritionalValues.calories} />
      </div>

      <div className="mt-3">
        <h3 className="text-xs font-medium text-primary mb-2">Besin Değerleri (100g başına)</h3>

        <div className="space-y-2">
          <NutritionRow label="Kalori" value={product.nutritionalValues.calories} />
          <NutritionRow label="Protein" value={product.nutritionalValues.protein} />
          <NutritionRow label="Karbonhidrat" value={product.nutritionalValues.carbs} />
          <NutritionRow label="Yağ" value={product.nutritionalValues.fat} />
          <NutritionRow label="Lif" value={product.nutritionalValues.fiber} />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <button className="w-full bg-primary text-white rounded-md py-1.5 text-xs font-medium">Öğünlerime Ekle</button>
      </div>
    </div>
  )
}

interface NutritionSummaryProps {
  label: string
  value: string
}

function NutritionSummary({ label, value }: NutritionSummaryProps) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xs font-medium">{value}</div>
    </div>
  )
}

interface NutritionRowProps {
  label: string
  value: string
}

function NutritionRow({ label, value }: NutritionRowProps) {
  return (
    <div className="flex items-center justify-between py-1 text-xs">
      <div className="font-medium">{label}</div>
      <div>{value}</div>
    </div>
  )
}
