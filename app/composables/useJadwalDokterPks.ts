import Swal from "sweetalert2";

export const useJadwalDokterPKS = () => {

    const { $toast } = useNuxtApp();

    const confirm = async (options?: {
        title?: string;
        text?: string;
        confirmText?: string;
        cancelText?: string;
    }) => {
        const result = await Swal.fire({
            title: options?.title || "Yakin?",
            text: options?.text || "Aksi ini tidak bisa dibatalkan",
            icon: "warning",
            showCancelButton: true,
            width: 400,
            padding: "0.7rem",
            confirmButtonColor: "#ef4444",
            confirmButtonText: options?.confirmText || "Ya",
            cancelButtonText: options?.cancelText || "Batal",

            customClass: {
                popup: "rounded-2xl",
                title: "text-sm",
                htmlContainer: "text-sm",
                confirmButton: "text-sm",
                cancelButton: "text-sm",
            },

        });

        return result.isConfirmed;
    };
    // ================= TYPES =================
    type Schedule = {
        id: number;
        nama: string;
        hari: string[];
    };

    type DoctorOption = {
        label: string;
        value: string;
    };

    // ================= STATE =================
    const schedules = useState<Schedule[]>("jadwal_dokter_pks", () => []);

    // ================= OPTIONS (UNTUK USelectMenu) =================
    const doctorOptions: DoctorOption[] = [
        { label: "dr. Yusuf Azmi", value: "dr. Yusuf Azmi" },
        { label: "dr. Siti Rahma", value: "dr. Siti Rahma" },
        { label: "dr. Budi Santoso", value: "dr. Budi Santoso" },
        { label: "dr. Dewi Lestari", value: "dr. Dewi Lestari" },
    ];

    const days = [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
        "Minggu",
    ];

    // ================= NORMALIZE =================
    const normalize = (item: any): Schedule => ({
        id: item.id ?? Date.now(),
        nama: item.nama ?? "",
        hari: Array.isArray(item.hari) ? item.hari : [],
    });

    // ================= STORAGE =================
    const saveData = () => {
        if (typeof window === "undefined") return;
        localStorage.setItem(
            "jadwal_dokter_pks",
            JSON.stringify(schedules.value)
        );
        $toast.success("Data berhasil disimpan");
    };

    const loadData = () => {
        if (typeof window === "undefined") return;

        const data = localStorage.getItem("jadwal_dokter_pks");

        if (data) {
            try {
                const parsed = JSON.parse(data);
                schedules.value = parsed.map(normalize);
            } catch (error) {
                console.error("Error parsing jadwal:", error);
                schedules.value = [];
            }
        }

        // default jika kosong
        if (schedules.value.length === 0) {
            schedules.value = [
                normalize({
                    id: 1,
                    nama: "dr. Yusuf Azmi",
                    hari: ["Senin", "Selasa", "Rabu"],
                }),
            ];
            saveData();
        }
    };

    // ================= CRUD =================
    const addSchedule = (doctor: DoctorOption | null, selectedDays: string[]) => {
        if (!doctor || selectedDays.length === 0) {
            alert("Lengkapi data dulu");
            return;
        }

        const newData: Schedule = normalize({
            id: Date.now(),
            nama: doctor.value, // 🔥 penting (USelectMenu)
            hari: [...selectedDays],
        });

        schedules.value = [...schedules.value, newData];
        saveData();
    };

    const updateSchedule = (id: number, newData: Partial<Schedule>) => {
        schedules.value = schedules.value.map((item) =>
            item.id === id
                ? normalize({
                    ...item,
                    ...newData,
                })
                : item
        );

        saveData();
    };

    const deleteSchedule = async (id: number) => {
        const ok = await confirm({
            title: "Hapus data?",
            text: "Data tidak bisa dikembalikan",
        });

        if (!ok) return;

        schedules.value = schedules.value.filter((i) => i.id !== id);
        saveData();

        $toast.success("Data berhasil dihapus 🗑️");
    };

    // ================= UTIL =================
    const toggleDay = (selectedDays: string[], day: string) => {
        if (selectedDays.includes(day)) {
            return selectedDays.filter((d) => d !== day);
        } else {
            return [...selectedDays, day];
        }
    };

    return {
        // state
        schedules,
        doctorOptions,
        days,

        // lifecycle
        loadData,

        // CRUD
        addSchedule,
        updateSchedule,
        deleteSchedule,

        // helper
        toggleDay,
    };
};