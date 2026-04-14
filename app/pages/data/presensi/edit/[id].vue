<script setup lang="ts">
import { ref } from "vue";
import BaseTextArea from "~/components/form/BaseTextArea.vue";
import BaseDatePicker from "~/components/form/BaseDatePicker.vue";
import BaseLeaflet from "~/components/form/BaseLeaflet.vue";
import AppBreadcrumb from "~/components/AppBreadcrumb.vue";
import BaseDropzone from "~/components/form/BaseDropzone.vue";

const route = useRoute();
const router = useRouter();

const { ijin, loadData, updateIjin } = useIjin();

useHead({
  title: "Edit Presensi",
});

definePageMeta({
  breadcrumb: [
    { label: "Home", to: "/dashboard" },
    { label: "Data", to: "/data/presensi" },
    { label: "Edit Presensi" },
  ],
});

const pegawaiOptions = [
  { label: "John Doe", value: "John Doe" },
  { label: "Jane Smith", value: "Jane Smith" },
  { label: "Michael Johnson", value: "Michael Johnson" },
];

const modelIjinOptions = [
  { label: "Model A", value: "Model A" },
  { label: "Model B", value: "Model B" },
  { label: "Model C", value: "Model C" },
];

const jenisIjinOptions = [
  { label: "Sakit", value: "Sakit" },
  { label: "Cuti", value: "Cuti" },
  { label: "Ijin Lainnya", value: "Ijin Lainnya" },
];

const tipeIjinOptions = [
  { label: "Tipe 1", value: "Tipe 1" },
  { label: "Tipe 2", value: "Tipe 2" },
  { label: "Tipe 3", value: "Tipe 3" },
];

const shiftKerjaOptions = [
  { label: "Pagi", value: "Pagi" },
  { label: "Siang", value: "Siang" },
  { label: "Malam", value: "Malam" },
];

const statusApprovalOptions = [
  { label: "Disetujui", value: "Disetujui" },
  { label: "Belum Disetujui", value: "Belum Disetujui" },
  { label: "Ditolak", value: "Ditolak" },
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
  nama_pegawai: "",
  model_ijin: "",
  jenis_ijin: "",
  tipe_ijin: "",
  shift_kerja: "",
  alasan: "",
  status_approval: "",
  tanggal_buka: "",
  tanggal_tutup: "",
  lat: -7.2575,
  lng: 112.7521,
  file: null as File | null,
  keterangan: "",
});

onMounted(async () => {
  await loadData();

  const id = Number(route.params.id);
  const data = ijin.value.find((i: any) => i.id === id);

  if (!data) return;

  form.value = {
    id: data.id ?? 0,
    nama_pegawai: data.nama_pegawai ?? "",
    model_ijin: data.nama_ijin ?? "",
    jenis_ijin: data.jenis_ijin ?? "",
    tipe_ijin: data.tipe_ijin ?? "",
    shift_kerja: data.shift_kerja ?? "",
    alasan: data.alasan ?? "",
    status_approval: normalize(data.approval),
    tanggal_buka: formatDate(data.buka ?? data.tanggal_mulai),
    tanggal_tutup: formatDate(data.tutup ?? data.tanggal_selesai),
    lat: data.latitude ?? 0,
    lng: data.longitude ?? 0,
    file: null,
    keterangan: data.keterangan_approval ?? "",
  };
});

const submitForm = () => {
  if (!form.value.id) {
    alert("ID tidak ditemukan!");
    return;
  }

  updateIjin(form.value.id, {
    nama_pegawai: form.value.nama_pegawai,
    nama_ijin: form.value.model_ijin,
    jenis_ijin: form.value.jenis_ijin,
    tipe_ijin: form.value.tipe_ijin,
    shift_kerja: form.value.shift_kerja,
    alasan: form.value.alasan,
    approval: form.value.status_approval,
    tanggal_mulai: form.value.tanggal_buka,
    tanggal_selesai: form.value.tanggal_tutup,
    latitude: form.value.lat,
    longitude: form.value.lng,
    berkas: form.value.file,
    keterangan_approval: form.value.keterangan,
  });

  router.push("/data/ijin");
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
      <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
        Edit Presensi
      </h1>
      <p class="text-sm text-gray-400">Master - Presensi - Edit</p>
    </div>

    <!-- CARD -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <!-- ACTION -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-semibold text-gray-700 dark:text-white">
          Edit Presensi
        </h2>

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
            Update Ijin
          </button>
        </div>
      </div>

      <!-- FORM -->
      <div class="grid md:grid-cols-2 gap-4">
        <!-- FORM DATA -->
        <!-- PEGAWAI -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Pegawai</label
          >
          <USelectMenu
            label="Pegawai"
            placeholder="Pilih Pegawai"
            value-key="value"
            option-attribute="label"
            v-model="form.nama_pegawai"
            :items="pegawaiOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- MODEL IJIN -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Model Ijin</label
          >
          <USelectMenu
            label="Model Ijin"
            placeholder="Pilih Model Ijin"
            value-key="value"
            option-attribute="label"
            v-model="form.model_ijin"
            :items="modelIjinOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- JENIS IJIN -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Jenis Ijin</label
          >
          <USelectMenu
            label="Jenis Ijin"
            placeholder="Pilih Jenis Ijin"
            value-key="value"
            option-attribute="label"
            v-model="form.jenis_ijin"
            :items="jenisIjinOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- TIPE IJIN -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Tipe Ijin</label
          >
          <USelectMenu
            label="Tipe Ijin"
            placeholder="Pilih Tipe Ijin"
            value-key="value"
            option-attribute="label"
            v-model="form.tipe_ijin"
            :items="tipeIjinOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- SHIFT KERJA -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Shift Kerja</label
          >
          <USelectMenu
            label="Shift Kerja"
            placeholder="Pilih Shift Kerja"
            value-key="value"
            option-attribute="label"
            v-model="form.shift_kerja"
            :items="shiftKerjaOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- TANGGAL BUKA -->
        <div>
          <BaseDatePicker
            v-model="form.tanggal_buka"
            label="Tanggal Mulai"
            placeholder="Pilih tanggal Mulai"
          />
        </div>

        <!-- TANGGAL TUTUP -->
        <div>
          <BaseDatePicker
            v-model="form.tanggal_tutup"
            label="Tanggal Selesai"
            placeholder="Pilih tanggal Selesai"
          />
        </div>

        <!-- BERKAS -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Upload Berkas</label
          >
          <BaseDropzone
            v-model="form.file"
            label="Berkas Pendukung"
            placeholder="Unggah berkas pendukung (opsional)"
            :max-files="1"
            :accepted-formats="['application/pdf', 'image/*']"
          />
        </div>

        <!-- PILIH LOKASI -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Pilih Lokasi</label
          >
          <BaseLeaflet v-model:lat="form.lat" v-model:lng="form.lng" />
        </div>

        <!-- STATUS APPROVAL -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Status Approval</label
          >
          <USelectMenu
            label="Status Approval"
            placeholder="Pilih Status Approval"
            value-key="value"
            option-attribute="label"
            v-model="form.status_approval"
            :items="statusApprovalOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- ALASAN -->
        <div>
          <BaseTextArea
            v-model="form.alasan"
            label="Alasan"
            placeholder="Masukkan Alasan"
          />
        </div>

        <!-- KETERANGAN APPROVAL -->
        <div>
          <BaseTextArea
            v-model="form.keterangan"
            label="Keterangan Approval"
            placeholder="Masukkan Keterangan Approval"
          />
        </div>
      </div>
    </div>
  </div>
</template>
