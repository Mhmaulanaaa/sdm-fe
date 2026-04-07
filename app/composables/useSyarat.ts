export const useSyarat = () => {
    const syarat = useState<any[]>("syarat", () => [])

    // INIT dari localStorage
    const loadData = () => {
        if (typeof window === 'undefined') return // ⛔ penting

        const data = localStorage.getItem("syarat")

        if (data) {
            syarat.value = JSON.parse(data)
        } else {
            syarat.value = [
                {
                    id: 1,
                    nama: "Pendidikan Terakhir",
                    deskripsi: "Minimal D3/S1 Teknik Informatika, Sistem Informasi, atau sejenis",
                    tipe: "select",
                    wajib: "Ya",
                    status: "Aktif",
                },
            ]
            saveData()
        }
    }

    const saveData = () => {
        if (typeof window === 'undefined') return // ⛔ penting
        localStorage.setItem("syarat", JSON.stringify(syarat.value))
    }

    // CREATE
    const addSyarat = (data: any) => {
        data.id = Date.now()
        syarat.value = [...syarat.value, data] // 🔥 trigger reactivity
        saveData()
    }

    // UPDATE
    const updateSyarat = (id: number, newData: any) => {
        syarat.value = syarat.value.map((item) =>
            item.id === id ? { ...item, ...newData } : item
        )
        saveData()
    }

    // DELETE
    const deleteSyarat = (id: number) => {
        syarat.value = syarat.value.filter((i) => i.id !== id)
        saveData()
    }

    return {
        syarat,
        loadData,
        addSyarat,
        updateSyarat,
        deleteSyarat,
    }
}