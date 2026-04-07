<script setup lang="ts">
import { ref } from "vue";

const { addLowongan } = useLowongan();
useHead({
  title: "Tambah Lowongan",
});

const form = ref({
  kode: "",
  nama: "",
  unit: "",
  kelompok: "",
  kategori: "",
  kebutuhan: 1,
  status_kepegawaian: "",
  sistem_kerja: "",
  tanggal_buka: "",
  tanggal_tutup: "",
  status_lowongan: "Draft",
  publish: "Tidak",
  keterangan: "",
});

const router = useRouter();

const submitForm = () => {
  addLowongan({
    kode: form.value.kode,
    nama: form.value.nama,
    unit: form.value.unit,
    kebutuhan: form.value.kebutuhan,
    tutup: form.value.tanggal_tutup,
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
        <!-- KODE -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Kode Lowongan</label>
          <input
            v-model="form.kode"
            type="text"
            placeholder="Contoh: LWG001"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- NAMA -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Nama Lowongan</label>
          <input
            v-model="form.nama"
            type="text"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- UNIT -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Unit Kerja</label>
          <select
            v-model="form.unit"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          >
            <option value="">Pilih Unit</option>
            <option>IGD</option>
            <option>Poli Umum</option>
          </select>
        </div>

        <!-- KELOMPOK -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Kelompok Pegawai</label>
          <select
            v-model="form.kelompok"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          >
            <option value="">Pilih</option>
            <option>Psikologi Klinis</option>
            <option>Kefarmasian</option>
            <option>Kesehatan Masyarakat</option>
          </select>
        </div>

        <!-- KATEGORI -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Kategori</label>
          <input
            v-model="form.kategori"
            type="text"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          />
        </div>

        <!-- KEBUTUHAN -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Jumlah Kebutuhan</label>
          <input
            v-model="form.kebutuhan"
            type="number"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          />
        </div>

        <!-- STATUS KEPEGAWAIAN -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Status Kepegawaian</label
          >
          <select
            v-model="form.status_kepegawaian"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          >
            <option value="">Pilih</option>
            <option>PNS</option>
            <option>BLUD</option>
            <option>CPNS</option>
            <option>Outsorcing</option>
            <option>Tenaga Ahli</option>
          </select>
        </div>

        <!-- SISTEM KERJA -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Sistem Kerja</label>
          <select
            v-model="form.sistem_kerja"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          >
            <option value="">Pilih</option>
            <option>WFH</option>
            <option>WFO</option>
            <option>Hybrid</option>
          </select>
        </div>

        <!-- TANGGAL -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Tanggal Buka</label>
          <input
            v-model="form.tanggal_buka"
            type="date"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          />
        </div>

        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Tanggal Tutup</label>
          <input
            v-model="form.tanggal_tutup"
            type="date"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          />
        </div>

        <!-- STATUS LOWONGAN -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Status Lowongan</label>
          <select
            v-model="form.status_lowongan"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          >
            <option>Buka</option>
            <option>Tutup</option>
            <option>Draft</option>
          </select>
        </div>

        <!-- PUBLISH -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Publish ke Publik?</label
          >
          <select
            v-model="form.publish"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          >
            <option>Tidak</option>
            <option>Ya</option>
          </select>
        </div>
      </div>

      <!-- KETERANGAN -->
      <div class="mt-4">
        <label class="text-sm text-gray-600 dark:text-gray-300">Keterangan</label>
        <textarea
          v-model="form.keterangan"
          rows="4"
          class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
        ></textarea>
      </div>
    </div>
  </div>
</template>
