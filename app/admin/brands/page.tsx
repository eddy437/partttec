import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit } from "lucide-react"
import Link from "next/link"
import { brands } from "@/lib/data"
import Image from "next/image"

export default function BrandsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Brand Management</h1>
          <p className="text-white/60">
            Manage {brands.length} supported vehicle manufacturers, upload assets, and edit content.
          </p>
        </div>
        <Link href="/admin/brands/new">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" /> Add Brand
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link href={`/admin/brands/${brand.slug}`} key={brand.id}>
            <Card className="bg-neutral-900 border-white/10 text-white hover:border-red-500/50 transition-all cursor-pointer group h-full relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Edit className="h-4 w-4 text-red-500" />
              </div>

              {brand.banner && (
                <div className="h-24 w-full relative opacity-40 group-hover:opacity-60 transition-opacity">
                  <Image src={brand.banner || "/placeholder.svg"} alt={brand.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                </div>
              )}

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-0">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  {brand.logo && !brand.logo.includes("placeholder") ? (
                    <div className="w-6 h-6 relative rounded-full overflow-hidden bg-white">
                      <Image
                        src={brand.logo || "/placeholder.svg"}
                        alt={brand.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  ) : null}
                  {brand.name}
                </CardTitle>
                <div className="text-xs text-white/40">{brand.foundedYear || "Global"}</div>
              </CardHeader>
              <CardContent className="relative z-0">
                <div className="text-2xl font-bold">{brand.partCount?.toLocaleString() || 0}</div>
                <p className="text-xs text-white/60 mt-1">Active Parts</p>
                {brand.description ? (
                  <p className="text-[10px] text-green-400 mt-2 truncate max-w-full opacity-70">✓ Content Active</p>
                ) : (
                  <p className="text-[10px] text-yellow-400 mt-2 truncate max-w-full opacity-70">
                    ⚠ Missing Description
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
