export const useLowongan = () => {
    const lowongan = useState<any[]>("lowongan", () => [])

    // INIT dari localStorage
    const loadData = () => {
        if (typeof window === 'undefined') return // ⛔ penting

        const data = localStorage.getItem("lowongan")

        if (data) {
            lowongan.value = JSON.parse(data)
        } else {
            lowongan.value = [
                {
                    id: 1,
                    kode: "LWG001",
                    nama: "Perawat IGD",
                    unit: "IGD",
                    kebutuhan: 5,
                    tutup: "2026-04-30",
                    status: "Aktif",
                },
            ]
            saveData()
        }
    }

    const saveData = () => {
        if (typeof window === 'undefined') return // ⛔ penting
        localStorage.setItem("lowongan", JSON.stringify(lowongan.value))
    }

    // CREATE
    const addLowongan = (data: any) => {
        data.id = Date.now()
        lowongan.value = [...lowongan.value, data] // 🔥 trigger reactivity
        saveData()
    }

    // UPDATE
    const updateLowongan = (id: number, newData: any) => {
        lowongan.value = lowongan.value.map((item) =>
            item.id === id ? { ...item, ...newData } : item
        )
        saveData()
    }

    // DELETE
    const deleteLowongan = (id: number) => {
        lowongan.value = lowongan.value.filter((i) => i.id !== id)
        saveData()
    }

    return {
        lowongan,
        loadData,
        addLowongan,
        updateLowongan,
        deleteLowongan,
    }
}