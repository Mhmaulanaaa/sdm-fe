<script setup lang="ts">
import { ref, computed } from "vue";
import AppBreadcrumb from "~/components/AppBreadcrumb.vue";
const search = ref("");
const selectedDate = ref("");
const selectedUnit = ref("");
useHead({
  title: "Data Laporan - SDM Admin",
});

definePageMeta({
  breadcrumb: [
    { label: "Home", to: "/dashboard" },
    { label: "Data", to: "/data" },
    { label: "Laporan" },
  ],
});

const filteredData = computed(() => {
  return tableData.filter((item) => {
    const matchSearch =
      !search.value ||
      item.nama.toLowerCase().includes(search.value.toLowerCase()) ||
      item.jenispegawai.toLowerCase().includes(search.value.toLowerCase()) ||
      item.unitkerja.toLowerCase().includes(search.value.toLowerCase());

    const matchUnit = !selectedUnit.value || item.unitkerja === selectedUnit.value;

    // karena kamu belum punya waktu → skip dulu
    const matchDate = !selectedDate.value;

    return matchSearch && matchUnit && matchDate;
  });
});

const tableData = [
  {
    nama: "Ahmad Fauzi",
    jenispegawai: "Dokter",
    unitkerja: "IGD",
    waktu: "2026-04-04",
  },
  {
    nama: "Siti Rahma",
    jenispegawai: "Perawat",
    unitkerja: "Rawat Inap",
    waktu: "2026-05-04",
  },
  {
    nama: "Budi Santoso",
    jenispegawai: "Dokter",
    unitkerja: "Laboratorium",
    waktu: "2026-06-04",
  },
  {
    nama: "Dewi Lestari",
    jenispegawai: "Perawat",
    unitkerja: "Poli Umum",
    waktu: "2026-07-04",
  },
];
</script>

<template>
  <div class="mb-4">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">Data Laporan</h1>
    <AppBreadcrumb />
  </div>
  <!-- Table -->
  <div
    class="bg-white dark:bg-slate-800 p-5 rounded-2xl min-h-screen shadow-sm border border-gray-100 dark:border-slate-700 mt-5"
  >
    <!-- HEADER -->
    <div class="space-y-4 mb-5">
      <!-- ROW 1: TITLE + BUTTON -->
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-800 dark:text-white">Data Laporan</h3>
      </div>

      <!-- ROW 2: SEARCH -->
      <div class="relative w-full md:w-80">
        <UIcon
          name="heroicons:magnifying-glass"
          class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          v-model="search"
          type="text"
          placeholder="Cari nama pegawai..."
          class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      <!-- ROW 3: FILTER -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <!-- FILTER GROUP -->
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- TANGGAL -->
            <div class="flex flex-col w-full md:w-48">
              <label class="text-xs mb-1 text-gray-500 dark:text-slate-400">
                Tanggal
              </label>
              <input
                v-model="selectedDate"
                type="date"
                class="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
              />
            </div>

            <!-- UNIT KERJA -->
            <div class="flex flex-col w-full md:w-64">
              <label class="text-xs mb-1 text-gray-500 dark:text-slate-400">
                Unit Kerja
              </label>

              <div class="relative">
                <!-- ICON -->
                <UIcon
                  name="heroicons:building-office-2"
                  class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <!-- SELECT -->
                <select
                  v-model="selectedUnit"
                  class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none appearance-none"
                >
                  <option value="">Semua Unit</option>
                  <option value="IGD">IGD</option>
                  <option value="Rawat Inap">Rawat Inap</option>
                  <option value="Laboratorium">Laboratorium</option>
                  <option value="Poli Umum">Poli Umum</option>
                </select>

                <!-- ARROW -->
                <UIcon
                  name="heroicons:chevron-down"
                  class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
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
            <th class="px-2">Nama Pegawai</th>
            <th class="px-2">Jenis Pegawai</th>
            <th class="px-2">Unit Kerja</th>
            <th class="px-2">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, i) in filteredData"
            :key="i"
            class="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition"
          >
            <!-- NO -->
            <td class="py-3 px-2 text-gray-400 text-xs">
              {{ i + 1 }}
            </td>

            <!-- NAMA -->
            <td class="px-2 text-gray-700 dark:text-slate-200 text-xs font-medium">
              {{ row.nama }}
            </td>

            <!-- JENIS PEGAWAI (ambil dari shift / atau bisa kamu rename datanya) -->
            <td class="px-2 text-xs">
              <span class="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded-md">
                {{ row.jenispegawai }}
              </span>
            </td>

            <!-- UNIT KERJA -->
            <td class="px-2 text-xs text-gray-500">
              {{ row.unitkerja }}
            </td>

            <!-- AKSI -->
            <td class="px-2 text-xs">
              <button
                class="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs"
              >
                <UIcon name="heroicons:document-text" class="w-4 h-4 inline-block" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
