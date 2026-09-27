"use client"

export default function PRODUCTS_ERROR_PAGE_CLIENT_RENDERED({ error }: { error: Error }) {
    return (
        <div><span className="text-xl">{ error ? error.message : "INTERNAL SERVER ISSUE!"}</span></div>
    )
}