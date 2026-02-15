
// Komponen loading card

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function LoadingCardBiasa(){

    return(
        <div>
            <Card className="rounded-xl overflow-hidden">
          <CardContent className="p-4 space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>

            {/* Price Skeleton */}
            <div className="space-y-2 pt-1">
              
              
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-5 w-full" />
          </CardFooter>
        </Card>
        </div>
    )


}


