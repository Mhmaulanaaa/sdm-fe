<script setup lang="ts">
import { ref, onMounted } from "vue";
import BaseInput from "~/components/form/BaseInput.vue";
import BaseNumber from "~/components/form/BaseNumber.vue";
import BaseTextArea from "~/components/form/BaseTextArea.vue";
import BaseDatePicker from "~/components/form/BaseDatePicker.vue";

const route = useRoute();
const router = useRouter();

const { lowongan, loadData, updateLowongan } = useLowongan();

useHead({
  title: "Edit Lowongan",
});

const unitOptions = [
  { label: "IGD", value: "igd" },
  { label: "Poli Umum", value: "poli_umum" },
  { label: "Radiologi", value: "radiologi" },
];

const kelompokOptions = [
  { label: "Psikologi Klinis", value: "psikologi_klinis" },
  { label: "Kefarmasian", value: "kefarmasian" },
  { label: "Kesehatan Masyarakat", value: "kesehatan_masyarakat" },
];

const statusKepegawaianOptions = [
  { label: "PNS", value: "pns" },
  { label: "Non-PNS", value: "non_pns" },
  { label: "Kontrak", value: "kontrak" },
  { label: "BLUD", value: "blud" },
  { label: "Magang", value: "magang" },
];

const sistemKerjaOptions = [
  { label: "WFH", value: "wfh" },
  { label: "WFO", value: "wfo" },
  { label: "Hybrid", value: "hybrid" },
];

const statusLowonganOptions = [
  { label: "Buka", value: "Buka" },
  { label: "Tutup", value: "Tutup" },
  { label: "Draft", value: "Draft" },
];

const publishOptions = [
  { label: "Ya", value: "Ya" },
  { label: "Tidak", value: "Tidak" },
];

const normalize = (val: any): string => {
  if (!val) return "";
  if (typeof val === "object") return val.value ?? "";
  return val;
};

const formatDate = (val: string): string => {
  if (typeof val !== "string") return "";
  return val.includes("T") ? (val.split("T")[0] ?? "") : val;
};

const form = ref({
  id: 0,
  kode: "",
  nama: "",
  unit: undefined as any,
  kelompok: undefined as any,
  kategori: "",
  kebutuhan: 1,
  status_kepegawaian: undefined as any,
  sistem_kerja: undefined as any,
  tanggal_buka: "",
  tanggal_tutup: "",
  status_lowongan: undefined as any,
  publish: undefined as any,
  keterangan: "",
});

onMounted(async () => {
  await loadData();

  const id = Number(route.params.id);
  const data = lowongan.value.find((i: any) => i.id === id);

  if (!data) return;

  form.value = {
    id: data.id ?? 0,
    kode: data.kode ?? "",
    nama: data.nama ?? "",
    unit: normalize(data.unit),
    kelompok: normalize(data.kelompok),
    kategori: data.kategori ?? "",
    kebutuhan: data.kebutuhan ?? 1,
    status_kepegawaian: normalize(data.status_kepegawaian),
    sistem_kerja: normalize(data.sistem_kerja),
    tanggal_buka: formatDate(data.buka ?? data.tanggal_buka),
    tanggal_tutup: formatDate(data.tutup ?? data.tanggal_tutup),
    status_lowongan: normalize(data.status),
    publish: normalize(data.publish),
    keterangan: data.keterangan ?? "",
  };
});

const submitForm = () => {
  if (!form.value.id) {
    alert("ID tidak ditemukan!");
    return;
  }

  updateLowongan(form.value.id, {
    kode: form.value.kode,
    nama: form.value.nama,
    unit: form.value.unit,
    kelompok: form.value.kelompok,
    kategori: form.value.kategori,
    kebutuhan: form.value.kebutuhan,
    status_kepegawaian: form.value.status_kepegawaian,
    sistem_kerja: form.value.sistem_kerja,
    buka: form.value.tanggal_buka,
    tutup: form.value.tanggal_tutup,
    status: form.value.status_lowongan,
    publish: form.value.publish,
    keterangan: form.value.keterangan,
  });

  router.push("/master/karir/lowongan");
};

// 🔙 BACK
const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
    <!-- HEADER -->
    <div class="mb-4">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-white">Edit Lowongan</h1>
      <p class="text-sm text-gray-400">Master - Lowongan - Edit</p>
    </div>

    <!-- CARD -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <!-- ACTION -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-semibold text-gray-700 dark:text-white">Edit Lowongan</h2>

        <div class="flex gap-2">
          <button
            @click="goBack"
            class="px-4 py-2 rounded-xl bg-gray-200 dark:bg-slate-700 text-sm"
          >
            Kembali
          </button>

          <button
            @click="submitForm"
            class="px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition"
          >
            Update Lowongan
          </button>
        </div>
      </div>

      <!-- FORM -->
      <div class="grid md:grid-cols-2 gap-4">
        <BaseInput v-model="form.kode" label="Kode Lowongan" />
        <BaseInput v-model="form.nama" label="Nama Lowongan" />

        <div>
          <label class="text-sm">Unit Kerja</label>
          <USelectMenu
            v-model="form.unit"
            :items="unitOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <div>
          <label class="text-sm">Kelompok Pegawai</label>
          <USelectMenu
            v-model="form.kelompok"
            :items="kelompokOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <BaseInput v-model="form.kategori" label="Kategori" />
        <BaseNumber v-model="form.kebutuhan" label="Kebutuhan" />

        <div>
          <label class="text-sm">Status Kepegawaian</label>
          <USelectMenu
            v-model="form.status_kepegawaian"
            :items="statusKepegawaianOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <div>
          <label class="text-sm">Sistem Kerja</label>
          <USelectMenu
            v-model="form.sistem_kerja"
            :items="sistemKerjaOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <BaseDatePicker v-model="form.tanggal_buka" label="Tanggal Buka" />
        <BaseDatePicker v-model="form.tanggal_tutup" label="Tanggal Tutup" />

        <div>
          <label class="text-sm">Status Lowongan</label>
          <USelectMenu
            v-model="form.status_lowongan"
            :items="statusLowonganOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <div>
          <label class="text-sm">Publik</label>
          <USelectMenu
            v-model="form.publish"
            :items="publishOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>
      </div>

      <div class="mt-4">
        <BaseTextArea v-model="form.keterangan" label="Keterangan" />
      </div>
    </div>
  </div>
</template>
