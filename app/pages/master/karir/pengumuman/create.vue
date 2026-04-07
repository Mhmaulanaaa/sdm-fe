<script setup lang="ts">
import { ref } from "vue";

const { addPengumuman } = usePengumuman();
useHead({
  title: "Tambah Pengumuman",
});

const form = ref({
  judul: "",
  tanggalpublish: "",
  status: "",
});

const router = useRouter();

const submitForm = () => {
  addPengumuman({
    judul: form.value.judul,
    tanggalpublish: form.value.tanggalpublish,
    status: form.value.status,
  });

  router.push("/master/karir/pengumuman");
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
    <!-- HEADER -->
    <div class="mb-4">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
        Tambah Pengumuman
      </h1>
      <p class="text-sm text-gray-400">Master - Pengumuman - Tambah</p>
    </div>

    <!-- CARD -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <!-- ACTION -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-semibold text-gray-700 dark:text-white">
          Tambah Pengumuman Baru
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
            Simpan Pengumuman
          </button>
        </div>
      </div>

      <!-- FORM -->
      <div class="grid md:grid-cols-2 gap-4">
        <!-- JUDUL -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Judul</label>
          <input
            v-model="form.judul"
            type="text"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- TANGGAL PUBLISH -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Tanggal Publish</label>
          <input
            v-model="form.tanggalpublish"
            type="text"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- STATUS  -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Status</label>
          <select
            v-model="form.status"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          >
            <option value="">Pilih</option>
            <option>Aktif</option>
            <option>Tidak Aktif</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
