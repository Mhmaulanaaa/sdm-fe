<script setup lang="ts">
import { ref, watch } from "vue";
import BaseDatePicker from "~/components/form/BaseDatePicker.vue";
import BaseTextArea from "~/components/form/BaseTextArea.vue";
import BaseLeaflet from "~/components/form/BaseLeaflet.vue";
import AppBreadcrumb from "~/components/AppBreadcrumb.vue";
import BaseDateTime from "~/components/form/BaseDateTime.vue";
const { addPresensi } = usePresensi();
useHead({
  title: "Tambah Data Presensi - SDM Admin",
});

definePageMeta({
  breadcrumb: [
    { label: "Home", to: "/dashboard" },
    { label: "Data", to: "/data/ijin" },
    { label: "Tambah Ijin" },
  ],
});

const checkKeterangan = () => {
  if (!form.value.waktu || !form.value.jenis_presensi) return;

  const date = new Date(form.value.waktu);

  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const totalMinutes = hours * 60 + minutes;

  const batasMasuk = 7 * 60 + 30; // 07:30
  const batasPulang = 16 * 60; // 16:00

  // Hanya Senin - Jumat
  if (day < 1 || day > 5) {
    form.value.keterangan = "Di luar hari kerja";
    return;
  }

  // Datang
  if (form.value.jenis_presensi === "Datang") {
    if (totalMinutes <= batasMasuk) {
      form.value.keterangan = "Diterima";
    } else {
      form.value.keterangan = "Terlambat";
    }
  }
  // Pulang
  if (form.value.jenis_presensi === "Pulang") {
    if (totalMinutes < batasPulang) {
      form.value.keterangan = "Pulang Lebih Cepat";
    } else if (totalMinutes === batasPulang) {
      form.value.keterangan = "Tepat Waktu";
    } else {
      form.value.keterangan = "Lembur";
    }
  }
};

/* OPTIONS */
const namaOptions = [
  { label: "John Doe", value: "John Doe" },
  { label: "Jane Smith", value: "Jane Smith" },
  { label: "Michael Johnson", value: "Michael Johnson" },
];

const jenisPresensiOptions = [
  { label: "Datang", value: "Datang" },
  { label: "Pulang", value: "Pulang" },
];

const instalasiOptions = [
  { label: "Model A", value: "Model A" },
  { label: "Model B", value: "Model B" },
  { label: "Model C", value: "Model C" },
];

const jenisShiftOptions = [
  { label: "Pagi", value: "Pagi" },
  { label: "Siang", value: "Siang" },
  { label: "Malam", value: "Malam" },
];

const form = ref({
  nama: undefined,
  jenis_presensi: undefined,
  instalasi: undefined,
  shift: undefined,
  waktu: "",
  lat: 0,
  lng: 0,
  keterangan: "",
});

const router = useRouter();

const getValue = (val: any) => {
  return typeof val === "object" ? val.value : val;
};

const formatDateTime = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const submitForm = () => {
  const waktuFormatted = formatDateTime(new Date(form.value.waktu));

  addPresensi({
    nama: getValue(form.value.nama),
    jenis_presensi: getValue(form.value.jenis_presensi),
    instalasi: getValue(form.value.instalasi),
    shift: getValue(form.value.shift),
    waktu: waktuFormatted,
    lat: form.value.lat,
    lng: form.value.lng,
    keterangan: form.value.keterangan,
  });

  router.push("/data/presensi");
};

console.log(form.value);

const goBack = () => {
  router.back();
};

watch(
  () => [form.value.waktu, form.value.jenis_presensi],
  () => {
    checkKeterangan();
  },
  { immediate: true },
);
</script>

<template>
  <div class="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
    <!-- HEADER -->
    <div class="mb-4">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
        Tambah Data Presensi
      </h1>
      <AppBreadcrumb />
    </div>

    <!-- CARD -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <!-- ACTION -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-semibold text-gray-700 dark:text-white">
          Tambah Presensi Baru
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
            Simpan Presensi
          </button>
        </div>
      </div>

      <!-- FORM -->
      <div class="grid md:grid-cols-2 gap-4">
        <!-- FORM DATA -->

        <!-- PEGAWAI -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Nama Pegawai</label
          >
          <USelectMenu
            label="Nama Pegawai"
            placeholder="Pilih Nama Pegawai"
            v-model="form.nama"
            :items="namaOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- JENIS PRESENSI -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Jenis Presensi</label
          >
          <USelectMenu
            label="Jenis Presensi"
            placeholder="Pilih Jenis Presensi"
            v-model="form.jenis_presensi"
            :items="jenisPresensiOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- INSTALASI -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Instalasi</label
          >
          <USelectMenu
            label="Instalasi"
            placeholder="Pilih Instalasi"
            v-model="form.instalasi"
            :items="instalasiOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- JENIS SHIFT -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Jenis Shift</label
          >
          <USelectMenu
            label="Jenis Shift"
            placeholder="Pilih Jenis Shift"
            v-model="form.shift"
            :items="jenisShiftOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- TANGGAL -->
        <div>
          <BaseDateTime
            v-model="form.waktu"
            label="Waktu Presensi"
            placeholder="Pilih Waktu Presensi"
          />
        </div>

        <!-- PILIH LOKASI -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Pilih Lokasi</label
          >
          <BaseLeaflet v-model:lat="form.lat" v-model:lng="form.lng" />
        </div>

        <!-- KETERANGAN -->
        <div>
          <BaseTextArea
            v-model="form.keterangan"
            label="Keterangan"
            placeholder="Otomatis"
            disabled
          />
        </div>
      </div>
      <!-- END FORM -->
    </div>
  </div>
</template>
