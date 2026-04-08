<script setup lang="ts">
import { ref, computed } from "vue";
import AppBreadcrumb from "~/components/AppBreadcrumb.vue";

useHead({
  title: "Lamaran Lowongan - SDM Admin",
});

definePageMeta({
  breadcrumb: [
    { label: "Home", to: "/dashboard" },
    { label: "Karir", to: "/master/karir" },
    { label: "Lamaran" },
  ],
});

const search = ref("");

const tableData = ref([
  {
    id: 1,
    nama_peserta: "Ahmad Fauzi",
    pelamar: "Perawat",
    lowongan: "Perawat IGD",
    status: "Proses",
    final: "Belum",
  },
  {
    id: 2,
    nama_peserta: "Siti Rahma",
    pelamar: "Bidan",
    lowongan: "Bidan Poli",
    status: "Lolos",
    final: "Ya",
  },
  {
    id: 3,
    nama_peserta: "Budi Santoso",
    pelamar: "Analis Lab",
    lowongan: "Laboratorium",
    status: "Tidak Lolos",
    final: "Tidak",
  },
]);

// 🔥 FILTER SEARCH
const filteredData = computed(() => {
  return tableData.value.filter((item) => {
    return (
      !search.value ||
      item.nama_peserta.toLowerCase().includes(search.value.toLowerCase()) ||
      item.pelamar.toLowerCase().includes(search.value.toLowerCase()) ||
      item.lowongan.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});
</script>

<template>
  <div class="mb-4">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">
      Master Lamaran
    </h1>
    <AppBreadcrumb />
  </div>
  <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm mt-5">
    <!-- HEADER -->
    <div class="space-y-4 mb-5">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-800 dark:text-white">Data Lamaran</h3>
      </div>

      <!-- SEARCH -->
      <div class="relative w-full md:w-80">
        <UIcon
          name="heroicons:magnifying-glass"
          class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          v-model="search"
          type="text"
          placeholder="Cari Master Lamaran..."
          class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>
    </div>

    <!-- TABLE -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr
            class="text-left text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-700"
          >
            <th class="py-3 px-2">No</th>
            <th class="px-2">Nama Peserta</th>
            <th class="px-2">Pelamar</th>
            <th class="px-2">Lowongan</th>
            <th class="px-2">Status</th>
            <th class="px-2">Final</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in filteredData"
            :key="i"
            class="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition"
          >
            <td class="py-3 px-2">{{ i + 1 }}</td>

            <td class="px-2 font-medium">
              {{ row.nama_peserta }}
            </td>

            <td class="px-2 text-gray-500">
              {{ row.pelamar }}
            </td>

            <td class="px-2">
              {{ row.lowongan }}
            </td>

            <!-- STATUS -->
            <td class="px-2">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  row.status === 'Lolos'
                    ? 'bg-green-100 text-green-700'
                    : row.status === 'Tidak Lolos'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700',
                ]"
              >
                {{ row.status }}
              </span>
            </td>

            <!-- FINAL -->
            <td class="px-2">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs',
                  row.final === 'Ya'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600',
                ]"
              >
                {{ row.final }}
              </span>
            </td>
          </tr>
          <!-- EMPTY -->
          <tr v-if="filteredData.length === 0">
            <td colspan="8" class="text-center py-5 text-gray-400">
              Data tidak ditemukan
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
