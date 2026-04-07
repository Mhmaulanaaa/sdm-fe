export const usePengumuman = () => {
    const pengumuman = useState<any[]>("pengumuman", () => [])

    // INIT dari localStorage
    const loadData = () => {
        if (typeof window === "undefined") return

        const data = localStorage.getItem("pengumuman")

        if (data) {
            pengumuman.value = JSON.parse(data)
        } else {
            pengumuman.value = [
                {
                    id: 1,
                    judul: "Judul Pengumuman 1",
                    tanggalpublish: "2024-05-01",
                    status: "Aktif",
                },
            ]
            saveData()
        }
    }

    const saveData = () => {
        if (typeof window === 'undefined') return // ⛔ penting
        localStorage.setItem("pengumuman", JSON.stringify(pengumuman.value))
    }

    // CREATE
    const addPengumuman = (data: any) => {
        data.id = Date.now()
        pengumuman.value = [...pengumuman.value, data] // 🔥 trigger reactivity
        saveData()
    }

    // UPDATE
    const updatePengumuman = (id: number, newData: any) => {
        pengumuman.value = pengumuman.value.map((item) =>
            item.id === id ? { ...item, ...newData } : item
        )
        saveData()
    }

    // DELETE
    const deletePengumuman = (id: number) => {
        pengumuman.value = pengumuman.value.filter((i) => i.id !== id)
        saveData()
    }

    return {
        pengumuman,
        loadData,
        addPengumuman,
        updatePengumuman,
        deletePengumuman,
    }
}