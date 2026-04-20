export const useIjin = () => {
    const ijin = useState<any[]>("ijin", () => []);

    const { $toast } = useNuxtApp();

    const normalize = (item: any) => ({
        id: item.id ?? 0,
        nama_pegawai: item.nama_pegawai ?? "",
        nama_ijin: item.nama_ijin ?? "",
        tipe_ijin: item.tipe_ijin ?? "",
        jenis_ijin: item.jenis_ijin ?? "",
        shift_kerja: item.shift_kerja ?? "",
        alasan: item.alasan ?? "",
        approval: item.approval ?? "",
        tanggal_mulai: item.tanggal_mulai ?? "",
        tanggal_selesai: item.tanggal_selesai ?? "",
        latitude: item.latitude ?? "0",
        longitude: item.longitude ?? "0",
        berkas: item.berkas ?? "",
        keterangan_approval: item.keterangan_approval ?? "",
    });
    // INIT dari localStorage
    const loadData = () => {
        if (typeof window === "undefined") return;

        const data = localStorage.getItem("ijin");

        if (data) {
            const parsed = JSON.parse(data);
            ijin.value = parsed.map(normalize);
        } else {
            ijin.value = [
                normalize({
                    id: 1,
                    nama_pegawai: "Ahmad Fauzi",
                    nama_ijin: "Cuti Tahunan",
                    tipe_ijin: "Cuti",
                    jenis_ijin: "Tahunan",
                    shift_kerja: "Pagi",
                    alasan: "Liburan keluarga",
                    approval: "Disetujui",
                    tanggal_mulai: "2026-04-01",
                    tanggal_selesai: "2026-04-05",
                    latitude: "-7.2575",
                    longitude: "112.7521",
                    berkas: "",
                    keterangan_approval: "",
                }),
            ];
            saveData();
        }
    };

    const saveData = () => {
        if (typeof window === "undefined") return;
        localStorage.setItem("ijin", JSON.stringify(ijin.value));
        $toast.success("Data berhasil disimpan");
    };

    // CREATE
    const addIjin = (data: any) => {
        const newData = {
            id: Date.now(),

            // mapping dari form
            nama_pegawai: data.nama_pegawai,
            nama_ijin: data.nama_ijin,
            tipe_ijin: data.tipe_ijin,
            jenis_ijin: data.jenis_ijin,
            shift_kerja: data.shift_kerja,

            alasan: data.alasan,
            approval: data.approval,

            tanggal_mulai: data.tanggal_mulai,
            tanggal_selesai: data.tanggal_selesai,

            latitude: data.latitude,
            longitude: data.longitude,

            berkas: data.berkas || "",
            keterangan_approval: data.keterangan_approval || "",
        };

        ijin.value = [...ijin.value, newData];
        saveData();
    };

    // UPDATE
    const updateIjin = (id: number, newData: any) => {
        ijin.value = ijin.value.map((item) =>
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
    const deleteIjin = (id: number) => {
        ijin.value = ijin.value.filter((i) => i.id !== id);
        saveData();
    };

    return {
        ijin,
        loadData,
        addIjin,
        updateIjin,
        deleteIjin,
    };
};