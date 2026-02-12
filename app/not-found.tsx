// Halaman Not Found

export default function NotFound(){

    return(
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="text-8xl md:text-9xl font-black bg-linear-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-8">
        404
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
        Halaman Tidak Ada
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-md mb-12">
        Halaman yang anda tuju tidak tersedia.
      </p>
      
    </div>
    )

}