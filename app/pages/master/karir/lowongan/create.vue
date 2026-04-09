<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "~/components/form/BaseInput.vue";
import BaseNumber from "~/components/form/BaseNumber.vue";
import BaseTextArea from "~/components/form/BaseTextArea.vue";
import BaseDatePicker from "~/components/form/BaseDatePicker.vue";
const { addLowongan } = useLowongan();
useHead({
  title: "Tambah Lowongan",
});

// Diatas Function Search dan Select2 Coba-Coba

const unitOptions = [
  { label: "IGD", value: "IGD" },
  { label: "Poli Umum", value: "Poli Umum" },
  { label: "Radiologi", value: "Radiologi" },
];

const kelompokOptions = [
  { label: "Psikologi Klinis", value: "Psikologi Klinis" },
  { label: "Kefarmasian", value: "Kefarmasian" },
  { label: "Kesehatan Masyarakat", value: "Kesehatan Masyarakat" },
];

const statusKepegawaianOptions = [
  { label: "PNS", value: "PNS" },
  { label: "Non-PNS", value: "Non-PNS" },
  { label: "Kontrak", value: "Kontrak" },
  { label: "BLUD", value: "BLUD" },
  { label: "Magang", value: "Magang" },
];

const sistemKerjaOptions = [
  { label: "WFH", value: "WFH" },
  { label: "WFO", value: "WFO" },
  { label: "Hybrid", value: "Hybrid" },
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

const form = ref({
  namasaya: "",
  pilihan: undefined,
  kode: "",
  nama: "",
  unit: undefined,
  kelompok: undefined,
  kategori: "",
  kebutuhan: 0,
  status_kepegawaian: undefined,
  sistem_kerja: undefined,
  tanggal_buka: "",
  tanggal_tutup: "",
  status_lowongan: undefined,
  publish: undefined,
  keterangan: "",
});

const router = useRouter();

const submitForm = () => {
  addLowongan({
    namasaya: form.value.namasaya,
    pilihan: form.value.pilihan,
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
    publish: form.value.publish,
    keterangan: form.value.keterangan,
    status: form.value.status_lowongan,
  });

  router.push("/master/karir/lowongan");
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
    <!-- HEADER -->
    <div class="mb-4">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-white">Tambah Lowongan</h1>
      <p class="text-sm text-gray-400">Master - Lowongan - Tambah</p>
    </div>

    <!-- CARD -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <!-- ACTION -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-semibold text-gray-700 dark:text-white">Tambah Lowongan Baru</h2>

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
            Simpan Lowongan
          </button>
        </div>
      </div>

      <!-- FORM -->
      <div class="grid md:grid-cols-2 gap-4">
        <!-- FORM DATA -->
        <!-- KODE -->
        <div>
          <BaseInput
            v-model="form.kode"
            label="Kode Lowongan"
            placeholder="Contoh: LWG001"
          />
        </div>

        <!-- NAMA -->
        <div>
          <BaseInput
            v-model="form.nama"
            label="Nama Lowongan"
            placeholder="Contoh: Staff Administrasi"
          />
        </div>

        <!-- UNIT -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Unit Kerja</label>
          <USelectMenu
            label="Unit Kerja"
            placeholder="Pilih Unit Kerja"
            v-model="form.unit"
            :items="unitOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- KELOMPOK -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Kelompok Pegawai</label>
          <USelectMenu
            label="Kelompok Pegawai"
            placeholder="Pilih Kelompok Pegawai"
            v-model="form.kelompok"
            :items="kelompokOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- KATEGORI -->
        <div>
          <BaseInput
            v-model="form.kategori"
            label="Kategori"
            placeholder="Contoh: Psikologi Klinis"
          />
        </div>

        <!-- KEBUTUHAN -->
        <div>
          <BaseNumber
            v-model="form.kebutuhan"
            label="Kebutuhan"
            placeholder="Contoh: 5"
          />
        </div>

        <!-- STATUS KEPEGAWAIAN -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Status Kepegawaian</label
          >
          <USelectMenu
            label="Status Kepegawaian"
            placeholder="Pilih Status Kepegawaian"
            v-model="form.status_kepegawaian"
            :items="statusKepegawaianOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- SISTEM KERJA -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Sistem Kerja</label>
          <USelectMenu
            label="Sistem Kerja"
            placeholder="Pilih Sistem Kerja"
            v-model="form.sistem_kerja"
            :items="sistemKerjaOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- TANGGAL -->
        <div>
          <BaseDatePicker v-model="form.tanggal_buka" label="Tanggal Buka" />
        </div>

        <div>
          <BaseDatePicker v-model="form.tanggal_tutup" label="Tanggal Tutup" />
        </div>

        <!-- STATUS LOWONGAN -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Status Lowongan</label>
          <USelectMenu
            label="Status Lowongan"
            placeholder="Pilih Status Lowongan"
            v-model="form.status_lowongan"
            :items="statusLowonganOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- PUBLISH -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Publik</label>
          <USelectMenu
            label="Publik"
            placeholder="Pilih Publik"
            v-model="form.publish"
            :items="publishOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>
      </div>

      <!-- KETERANGAN -->
      <div class="mt-4">
        <BaseTextArea
          v-model="form.keterangan"
          label="Keterangan"
          placeholder="Masukkan keterangan tambahan"
        />
      </div>
    </div>
  </div>
</template>
