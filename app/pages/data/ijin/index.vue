<script setup lang="ts">
import { ref, computed } from "vue";
const search = ref("");
const statusFilter = ref("");
useHead({
  title: "Data Ijin - SDM Admin",
});

const filteredData = computed(() => {
  return tableData.filter((item) => {
    const matchSearch =
      !search.value ||
      item.name.toLowerCase().includes(search.value.toLowerCase()) ||
      item.nama_ijin.toLowerCase().includes(search.value.toLowerCase()) ||
      item.approval.toLowerCase().includes(search.value.toLowerCase());

    const matchStatus =
      !statusFilter.value || item.approval?.toLowerCase() === statusFilter.value;

    return matchSearch && matchStatus;
  });
});
const stats = [
  {
    title: "Total Ijin",
    value: 125,
    icon: "i-lucide-calendar-check",
    color: "emerald",
    bgGradient: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Disetujui",
    value: 98,
    icon: "i-lucide-check-circle",
    color: "blue",
    bgGradient: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Belum Disetujui",
    value: 27,
    icon: "i-lucide-clock",
    color: "amber",
    bgGradient: "from-amber-500/20 to-amber-600/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

const tableData = [
  {
    name: "Ahmad Fauzi",
    nama_ijin: "Cuti Tahunan",
    tipe: "Cuti",
    jenis: "Tahunan",
    alasan: "Liburan keluarga",
    approval: "Disetujui",
    start: "2026-04-01",
    end: "2026-04-05",
  },
  {
    name: "Siti Rahma",
    nama_ijin: "Ijin Sakit",
    tipe: "Ijin",
    jenis: "Sakit",
    alasan: "Demam tinggi",
    approval: "Belum Disetujui",
    start: "2026-04-03",
    end: "2026-04-04",
  },
  {
    name: "Budi Santoso",
    nama_ijin: "Cuti Besar",
    tipe: "Cuti",
    jenis: "Besar",
    alasan: "Keperluan pribadi",
    approval: "Ditolak",
    start: "2026-04-10",
    end: "2026-04-15",
  },
  {
    name: "Dewi Lestari",
    nama_ijin: "Ijin Melahirkan",
    tipe: "Ijin",
    jenis: "Melahirkan",
    alasan: "Persiapan persalinan",
    approval: "Disetujui",
    start: "2026-04-02",
    end: "2026-06-02",
  },
  {
    name: "Rizky Pratama",
    nama_ijin: "Cuti Tahunan",
    tipe: "Cuti",
    jenis: "Tahunan",
    alasan: "Acara keluarga",
    approval: "Belum Disetujui",
    start: "2026-04-07",
    end: "2026-04-09",
  },
  {
    name: "Lina Marlina",
    nama_ijin: "Ijin Setengah Hari",
    tipe: "Ijin",
    jenis: "Pribadi",
    alasan: "Urusan bank",
    approval: "Disetujui",
    start: "2026-04-06",
    end: "2026-04-06",
  },
];
</script>

<template>
  <!-- Stats -->
  <div class="p-6 mb-5 bg-white dark:bg-slate-800 space-y-3 rounded-2xl">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
      <UCard v-for="stat in stats" :key="stat.title" class="shadow-sm">
        <div class="flex justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ stat.title }}</p>
            <p class="text-2xl font-bold">{{ stat.value }}</p>
          </div>
          <UIcon :name="stat.icon" :class="['w-7 h-7', stat.iconColor]" />
        </div>
      </UCard>
    </div>
  </div>
  <!-- Table -->
  <div
    class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mt-5"
  >
    <!-- HEADER -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      <!-- LEFT -->
      <h3 class="font-semibold text-gray-800 dark:text-white">Data Ijin</h3>

      <!-- RIGHT (SEARCH + FILTER + BUTTON) -->
      <div class="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <!-- SEARCH -->
        <div class="relative w-full md:w-64">
          <UIcon
            name="heroicons:magnifying-glass"
            class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="search"
            type="text"
            placeholder="Cari pegawai..."
            class="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- FILTER -->
        <select
          v-model="statusFilter"
          class="px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
        >
          <option value="">Semua Status</option>
          <option value="disetujui">Disetujui</option>
          <option value="ditolak">Ditolak</option>
          <option value="belum disetujui">Belum Disetujui</option>
        </select>

        <!-- BUTTON TAMBAH -->
        <button
          class="flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition"
        >
          <UIcon name="heroicons:plus" class="w-4 h-4" />
          Tambah
        </button>
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
            <th class="px-2">Nama Ijin</th>
            <th class="px-2">Tipe Ijin</th>
            <th class="px-2">Jenis Ijin</th>
            <th class="px-2">Alasan</th>
            <th class="px-2">Approval</th>
            <th class="px-2">Mulai</th>
            <th class="px-2">Selesai</th>
            <th class="px-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, i) in filteredData"
            :key="i"
            class="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition"
          >
            <td class="py-3 px-2 text-gray-400 text-xs">
              {{ i + 1 }}
            </td>

            <td class="px-2 text-gray-700 dark:text-slate-200 text-xs">
              {{ row.name }}
            </td>

            <td class="px-2 text-xs">
              {{ row.nama_ijin }}
            </td>

            <td class="px-2 text-xs">
              {{ row.tipe }}
            </td>

            <td class="px-2 text-xs">
              {{ row.jenis }}
            </td>

            <td class="px-2 text-xs text-gray-500">
              {{ row.alasan }}
            </td>

            <!-- STATUS -->
            <td class="px-2">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  row.approval === 'Disetujui'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : row.approval === 'Belum Disetujui'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                ]"
              >
                {{ row.approval }}
              </span>
            </td>

            <td class="px-2 text-xs">
              {{ row.start }}
            </td>

            <td class="px-2 text-xs">
              {{ row.end }}
            </td>

            <!-- AKSI -->
            <td class="px-2 text-center">
              <div class="flex justify-center items-center gap-2">
                <!-- EDIT -->
                <button
                  class="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
                  title="Edit"
                >
                  <UIcon name="heroicons:pencil-square" class="w-4 h-4 text-blue-500" />
                </button>

                <!-- CHECKLIST -->
                <button
                  class="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition"
                  title="Checklist"
                >
                  <UIcon name="heroicons:check-circle" class="w-4 h-4 text-green-500" />
                </button>

                <!-- LAPORAN -->
                <button
                  class="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition"
                  title="Laporan"
                >
                  <UIcon name="heroicons:document-text" class="w-4 h-4 text-purple-500" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
