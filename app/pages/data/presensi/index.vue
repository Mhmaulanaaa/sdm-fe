<script setup lang="ts">
import { ref, computed } from "vue";
const search = ref("");
const selectedDate = ref("");
useHead({
  title: "Data Presensi - SDM Admin",
});

const filteredData = computed(() => {
  return tableData.filter((item) => {
    const matchSearch =
      !search.value ||
      item.nama.toLowerCase().includes(search.value.toLowerCase()) ||
      item.instalasi.toLowerCase().includes(search.value.toLowerCase()) ||
      item.shift.toLowerCase().includes(search.value.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(search.value.toLowerCase());

    const matchDate =
      !selectedDate.value || item.waktu.split(" ")[0] === selectedDate.value;

    return matchSearch && matchDate;
  });
});

const tableData = [
  {
    jenis_presensi: "Datang",
    nama: "Ahmad Fauzi",
    instalasi: "IGD",
    shift: "Pagi",
    waktu: "2026-04-04 07:05",
    keterangan: "Diterima",
  },
  {
    jenis_presensi: "Pulang",
    nama: "Siti Rahma",
    instalasi: "Rawat Inap",
    shift: "Siang",
    waktu: "2026-04-04 15:10",
    keterangan: "Diterima",
  },
  {
    jenis_presensi: "Datang",
    nama: "Budi Santoso",
    instalasi: "Laboratorium",
    shift: "Malam",
    waktu: "2026-05-04 22:00",
    keterangan: "Terlambat",
  },
  {
    jenis_presensi: "Datang",
    nama: "Dewi Lestari",
    instalasi: "Poli Umum",
    shift: "Pagi",
    waktu: "2026-05-04 07:20",
    keterangan: "Diterima",
  },
];
</script>

<template>
  <!-- Table -->
  <div
    class="bg-white dark:bg-slate-800 p-5 rounded-2xl min-h-screen shadow-sm border border-gray-100 dark:border-slate-700 mt-5"
  >
    <!-- HEADER -->
    <div class="space-y-4 mb-5">
      <!-- ROW 1: TITLE + BUTTON -->
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-800 dark:text-white">Data Presensi</h3>

        <button
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition shadow-sm"
        >
          <UIcon name="heroicons:plus" class="w-4 h-4" />
          Tambah
        </button>
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
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <!-- LEFT: DATE PICKER -->
        <div class="flex items-center gap-2">
          <input
            v-model="selectedDate"
            type="date"
            class="px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          />
        </div>

        <!-- RIGHT: ACTION BUTTON -->
        <div class="flex items-center gap-2">
          <!-- FILTER -->
          <button
            class="flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
          >
            <UIcon name="heroicons:funnel" class="w-4 h-4" />
            Filter
          </button>

          <!-- EXPORT -->
          <button
            class="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition"
          >
            <UIcon name="mdi:microsoft-excel" class="w-4 h-4" />
            Excel
          </button>
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
            <th class="px-2">Jenis Presensi</th>
            <th class="px-2">Nama Lengkap</th>
            <th class="px-2">Instalasi</th>
            <th class="px-2">Jenis Shift</th>
            <th class="px-2">Waktu Presensi</th>
            <th class="px-2">Keterangan</th>
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

            <!-- JENIS PRESENSI -->
            <td class="px-2">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  row.jenis_presensi === 'Datang'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                ]"
              >
                {{ row.jenis_presensi }}
              </span>
            </td>

            <!-- NAMA -->
            <td class="px-2 text-gray-700 dark:text-slate-200 text-xs font-medium">
              {{ row.nama }}
            </td>

            <!-- INSTALASI -->
            <td class="px-2 text-xs text-gray-500">
              {{ row.instalasi }}
            </td>

            <!-- SHIFT -->
            <td class="px-2 text-xs">
              <span class="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded-md">
                {{ row.shift }}
              </span>
            </td>

            <!-- WAKTU -->
            <td class="px-2 text-xs text-gray-500">
              {{ row.waktu }}
            </td>

            <!-- KETERANGAN -->
            <td class="px-2 text-xs text-gray-400 italic">
              {{ row.keterangan }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
