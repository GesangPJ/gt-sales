
// Komponen skeleton loading detail

import { Skeleton } from "../ui/skeleton"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { ShimmerTable } from "../mvpblocks/skeleton-table-1"

export default function LoadingDetails(){

    return(
<div>
{/* Card Detail */}
<Card>
    <CardHeader>
        <CardTitle className="text-center">
            <Skeleton className="h-4 w w-2/3"/>
        </CardTitle>
    </CardHeader>
    <CardContent>
    <div className="space-y-2 mt-3 mb-5">
        <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
            <Skeleton className="h-4 w-25"/>
            <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
            <Skeleton className="h-4 w-25"/>
            <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
            <Skeleton className="h-4 w-25"/>
            <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
            <Skeleton className="h-4 w-25"/>
            <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
            <Skeleton className="h-4 w-25"/>
            <Skeleton className="h-4 w-32" />
        </div>
    </div>
    </CardContent>
</Card>

{/* Card Tabel */}
<Card>
    <CardHeader>
        <CardTitle className="text-center">
            <Skeleton className="h-4 w w-2/3"/>
        </CardTitle>
    </CardHeader>
    <CardContent>
        <ShimmerTable
        rowCount={10}
        columnCount={5}
        />
    </CardContent>
</Card>

</div>
    )
}
