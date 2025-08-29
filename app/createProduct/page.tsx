'use client'

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"

type Product = {
    id: string
    name: string
    slug: string
    description: string
    price: number
    inventory: number
    images: string[]
    category?: { id: string; name: string }
    createdAt: string
}

type Category = { id: string; name: string }

const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Price must be positive"),
    inventory: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Inventory must be ≥ 0"),
    categoryId: z.string().min(1, "Select a category"),
})

type ProductFormValues = z.infer<typeof productSchema>

export default function ProductsDashboard() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [deletingIds, setDeletingIds] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [newImageUrl, setNewImageUrl] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { toast } = useToast()

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: { name: "", description: "", price: "", inventory: "", categoryId: "" },
    })

    // --- Fetch Products ---
    async function fetchProducts() {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch("/api/products?sortBy=createdAt")
            if (!res.ok) throw new Error(`Error fetching products: ${res.statusText}`)
            const data: Product[] = await res.json()
            setProducts(
                Array.isArray(data)
                    ? data.sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )
                    : []
            )
        } catch (err: any) {
            console.error(err)
            setError(err.message)
            toast({ variant: "destructive", title: "❌ Failed to fetch products", description: err.message })
        } finally {
            setLoading(false)
        }
    }

    // --- Fetch Categories ---
    async function fetchCategories() {
        setError(null)
        try {
            const res = await fetch("/api/categories")
            if (!res.ok) throw new Error(`Error fetching categories: ${res.statusText}`)
            const data: Category[] = await res.json()
            setCategories(Array.isArray(data) ? data : [])
        } catch (err: any) {
            console.error(err)
            setError(err.message)
            toast({ variant: "destructive", title: "❌ Failed to fetch categories", description: err.message })
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])

    // --- Image URL handlers ---
    function addImageUrl() {
        if (!newImageUrl.trim()) return
        setImageUrls((prev) => [...prev, newImageUrl.trim()])
        setNewImageUrl("")
    }

    function removeImageUrl(url: string) {
        setImageUrls((prev) => prev.filter((u) => u !== url))
    }

    // --- Form Submit ---
    async function onSubmit(values: ProductFormValues) {
        if (imageUrls.length === 0) {
            setError("At least one product image is required")
            return
        }

        setError(null)
        setSubmitting(true)
        try {
            const payload = {
                ...values,
                price: parseFloat(values.price),
                inventory: parseInt(values.inventory),
                images: imageUrls,
            }

            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Failed to create product")

            toast({ title: "✅ Product created successfully" })
            form.reset()
            setImageUrls([])
            fetchProducts()
            setDialogOpen(false) // auto close dialog
        } catch (err: any) {
            console.error(err)
            setError(err.message)
            toast({ variant: "destructive", title: "❌ Failed to create product", description: err.message })
        } finally {
            setSubmitting(false)
        }
    }

    // --- Delete Product ---
    async function deleteProduct(id: string) {
        setError(null)
        try {
            setDeletingIds((prev) => [...prev, id])
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Delete failed")
            toast({ title: "🗑️ Product deleted" })
            setProducts((prev) => prev.filter((p) => p.id !== id))
        } catch (err: any) {
            console.error(err)
            setError(err.message)
            toast({ variant: "destructive", title: "❌ Failed to delete product", description: err.message })
        } finally {
            setDeletingIds((prev) => prev.filter((pid) => pid !== id))
        }
    }

    return (
        <div className="p-6 space-y-8">
            {/* Add Product Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button>Add Product</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="iPhone 15" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product description..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Price + Inventory */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="199.99" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="inventory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Inventory</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="50" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Category */}
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <select {...field} className="border rounded px-2 py-1 w-full">
                                                <option value="">Select a category</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Images */}
                            <FormItem>
                                <FormLabel>Product Images (URLs)</FormLabel>
                                <div className="flex gap-2 mb-2">
                                    <Input
                                        placeholder="Paste image URL"
                                        value={newImageUrl}
                                        onChange={(e) => setNewImageUrl(e.target.value)}
                                    />
                                    <Button type="button" onClick={addImageUrl}>
                                        Add
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {imageUrls.map((url) => (
                                        <div key={url} className="relative w-24 h-24 border rounded overflow-hidden">
                                            <img src={url} alt="preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImageUrl(url)}
                                                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </FormItem>
                            <Button type="submit" disabled={submitting}>
                                {submitting ? "Saving..." : "Save Product"}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    <p>Error: {error}</p>
                </div>
            )}

            {/* Products List */}
            <div className="grid gap-4">
                {loading && <p>Loading products...</p>}
                {!loading && products.length === 0 && <p>No products found.</p>}
                {products.map((p) => {
                    const safeProduct = {
                        id: p.id ?? "unknown",
                        name: p.name ?? "Unnamed Product",
                        description: p.description ?? "",
                        price: p.price ?? 0,
                        inventory: p.inventory ?? 0,
                        category: p.category ?? null,
                    }
                    return (
                        <Card key={safeProduct.id} className="p-4 flex justify-between items-center">
                            <CardContent className="p-0">
                                <h2 className="font-bold">{safeProduct.name}</h2>
                                <p className="text-sm text-gray-600">{safeProduct.description}</p>
                                <p className="text-sm">
                                    ${safeProduct.price} | {safeProduct.inventory} in stock
                                </p>
                                <p className="text-xs text-gray-400">
                                    Category: {safeProduct.category?.name || "Uncategorized"}
                                </p>
                            </CardContent>
                            <Button
                                variant="destructive"
                                onClick={() => deleteProduct(safeProduct.id)}
                                disabled={deletingIds.includes(safeProduct.id)}
                            >
                                {deletingIds.includes(safeProduct.id) ? "Deleting..." : "Delete"}
                            </Button>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
