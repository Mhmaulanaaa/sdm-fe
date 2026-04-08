export const useSyarat = () => {
    const syarat = useState<any[]>("syarat", () => []);

    // ✅ NORMALIZE (INI KUNCI)
    const normalize = (item: any) => ({
        id: item.id ?? 0,
        nama: item.nama ?? "",
        deskripsi: item.deskripsi ?? "",
        tipe: item.tipe ?? "",
        wajib: item.wajib ?? "",
        status: item.status ?? "Aktif",
        no_urut: item.no_urut ?? 1,
        publish: item.publish ?? "Tidak",
    });

    // ✅ LOAD DATA
    const loadData = () => {
        if (typeof window === 'undefined') return // ⛔ penting

        const data = localStorage.getItem("syarat");

        if (data) {
            const parsed = JSON.parse(data);
            syarat.value = parsed.map(normalize); // 🔥 FIX DATA LAMA
        } else {
            syarat.value = [
                normalize({
                    id: 1,
                    nama: "Pendidikan Terakhir",
                    deskripsi:
                        "Minimal D3/S1 Teknik Informatika, Sistem Informasi, atau sejenis",
                    tipe: "Text",
                    wajib: "Ya",
                    status: "Aktif",
                    no_urut: 1,
                    publish: "Ya",
                }),
            ];
            saveData();
        }
    };

    // ✅ SAVE
    const saveData = () => {
        if (typeof window === 'undefined') return // ⛔ penting
        localStorage.setItem("syarat", JSON.stringify(syarat.value));
    };

    // ✅ CREATE
    const addSyarat = (data: any) => {
        const newData = normalize({
            ...data,
            id: Date.now(),
        });

        syarat.value = [...syarat.value, newData];
        saveData();
    };

    // ✅ UPDATE
    const updateSyarat = (id: number, newData: any) => {
        syarat.value = syarat.value.map((item) =>
            Number(item.id) === Number(id)
                ? normalize({ ...item, ...newData })
                : item
        );

        saveData();
    };

    // ✅ DELETE
    const deleteSyarat = (id: number) => {
        syarat.value = syarat.value.filter(
            (i) => Number(i.id) !== Number(id)
        );
        saveData();
    };

    return {
        syarat,
        loadData,
        addSyarat,
        updateSyarat,
        deleteSyarat,
    };
};