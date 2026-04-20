export const usePresensi = () => {
    const presensi = useState<any[]>("presensi", () => []);

    const { $toast } = useNuxtApp();

    const normalize = (item: any) => ({
        id: item.id ?? 0,
        jenis_presensi: item.jenis_presensi ?? "",
        nama: item.nama ?? "",
        instalasi: item.instalasi ?? "",
        shift: item.shift ?? "",
        waktu: item.waktu ?? "",
        keterangan: item.keterangan ?? "",
        lat: item.lat ?? 0,
        lng: item.lng ?? 0,
    });
    // INIT dari localStorage
    const loadData = () => {
        if (typeof window === "undefined") return;

        const data = localStorage.getItem("presensi");

        if (data) {
            const parsed = JSON.parse(data);
            presensi.value = parsed.map(normalize);
        } else {
            presensi.value = [
                normalize({
                    id: 1,
                    nama: "Ahmad Fauzi",
                    jenis_presensi: "Datang",
                    instalasi: "IGD",
                    shift: "Pagi",
                    waktu: "2026-04-14 08:00",
                    keterangan: "Diterima",
                }),
            ];
            saveData();
        }
    };

    const saveData = () => {
        if (typeof window === "undefined") return;
        localStorage.setItem("presensi", JSON.stringify(presensi.value));
    };

    // CREATE
    const addPresensi = (data: any) => {
        const newData = normalize({
            id: Date.now(),
            ...data,
        });

        presensi.value = [...presensi.value, newData];
        saveData();
        $toast.success("Data berhasil disimpan");
    };

    // UPDATE
    const updatePresensi = (id: number, newData: any) => {
        presensi.value = presensi.value.map((item) =>
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
    const deletePresensi = (id: number) => {
        presensi.value = presensi.value.filter((i) => i.id !== id);
        saveData();
    };

    return {
        presensi,
        loadData,
        addPresensi,
        updatePresensi,
        deletePresensi,
    };
};