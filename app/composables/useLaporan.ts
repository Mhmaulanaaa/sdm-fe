export const useLaporan = () => {
    const laporan = useState<any[]>("laporan", () => []);

    const normalize = (item: any) => ({
        id: item.id ?? 0,
        nama: item.nama ?? "",
        jenis_pegawai: item.jenis_pegawai ?? "",
        unit_kerja: item.unit_kerja ?? "",
    });
    // INIT dari localStorage
    const loadData = () => {
        if (typeof window === "undefined") return;

        const data = localStorage.getItem("laporan");

        if (data) {
            const parsed = JSON.parse(data);
            laporan.value = parsed.map(normalize);
        } else {
            laporan.value = [
                normalize({
                    id: 1,
                    nama: "Ahmad Fauzi",
                    jenis_pegawai: "PNS",
                    unit_kerja: "IGD",
                }),
            ];
            saveData();
        }
    };

    const saveData = () => {
        if (typeof window === "undefined") return;
        localStorage.setItem("laporan", JSON.stringify(laporan.value));
    };

    // CREATE
    const addLaporan = (data: any) => {
        const newData = normalize({
            id: Date.now(),
            ...data,
        });

        laporan.value = [...laporan.value, newData];
        saveData();
    };

    // UPDATE
    const updateLaporan = (id: number, newData: any) => {
        laporan.value = laporan.value.map((item) =>
            item.id === id
                ? {
                    ...item,
                    ...newData,
                }
                : item
        );

        saveData();
    };

    // DELETE
    const deleteLaporan = (id: number) => {
        laporan.value = laporan.value.filter((i) => i.id !== id);
        saveData();
    };

    return {
        laporan,
        loadData,
        addLaporan,
        updateLaporan,
        deleteLaporan,
    };
};