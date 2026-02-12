
// Halaman brand
import FormBrand from "./form-brand"

export default function HalamanBrand(){

    return(
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">

                {/* Tabel daftar brand */}
                <div>

                </div>

                {/* Form Tambah Brand */}
                <div>
                    <FormBrand/>
                </div>

            </div>

        </div>
    )
}

