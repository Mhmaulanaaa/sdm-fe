<script setup lang="ts">
import { ref, computed } from "vue";
import AppBreadcrumb from "~/components/AppBreadcrumb.vue";
import BaseSearch from "~/components/form/BaseSearch.vue";
import BaseDatePicker from "~/components/form/BaseDatePicker.vue";
const search = ref("");
const router = useRouter();
const selectedDate = ref("");
const { presensi, loadData, deletePresensi, updatePresensi } = usePresensi();

useHead({
  title: "Data Presensi - SDM Admin",
});

definePageMeta({
  breadcrumb: [
    { label: "Home", to: "/dashboard" },
    { label: "Data", to: "/data" },
    { label: "Presensi" },
  ],
});

const goToTambah = () => {
  router.push("/data/presensi/create");
};

const filteredData = computed(() => {
  return tableData.value.filter((item) => {
    const matchSearch =
      !search.value ||
      item.nama.toLowerCase().includes(search.value.toLowerCase()) ||
      item.instalasi.toLowerCase().includes(search.value.toLowerCase()) ||
      item.shift.toLowerCase().includes(search.value.toLowerCase());

    const matchDate =
      !selectedDate.value || item.waktu.split(" ")[0] === selectedDate.value;

    return matchSearch && matchDate;
  });
});

const tableData = computed(() => presensi.value || []);

onMounted(async () => {
  await loadData();
  const normalize = (val: any) => {
    return typeof val === "object" ? val.value : val;
  };

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

  presensi.value = presensi.value.map((item) => ({
    ...item,
    nama:
      namaOptions.find((opt) => opt.value === normalize(item.nama))?.label ||
      normalize(item.nama),
    jenis_presensi:
      jenisPresensiOptions.find(
        (opt) => opt.value === normalize(item.jenis_presensi),
      )?.label || normalize(item.jenis_presensi),
    instalasi:
      instalasiOptions.find((opt) => opt.value === normalize(item.instalasi))
        ?.label || normalize(item.instalasi),
    shift:
      jenisShiftOptions.find((opt) => opt.value === normalize(item.shift))
        ?.label || normalize(item.shift),
  }));
});
</script>

<template>
  <div class="mb-4">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">
      Data Presensi
    </h1>
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
        <h3 class="font-semibold text-gray-800 dark:text-white">
          Data Presensi
        </h3>

        <button
          @click="goToTambah"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition shadow-sm"
        >
          <UIcon name="heroicons:plus" class="w-4 h-4" />
          Tambah
        </button>
      </div>

      <!-- ROW 2: SEARCH -->
      <div class="relative w-full md:w-80">
        <BaseSearch v-model="search" placeholder="Cari nama pegawai..." />
      </div>

      <!-- ROW 3: FILTER -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
      >
        <!-- LEFT: DATE PICKER -->
        <div class="relative gap-2 md:w-80">
          <BaseDatePicker v-model="selectedDate" />
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
            <td
              class="px-2 text-gray-700 dark:text-slate-200 text-xs font-medium"
            >
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
              <span
                :class="{
                  'text-green-600':
                    row.keterangan === 'Diterima' ||
                    row.keterangan === 'Tepat Waktu',
                  'text-red-500': row.keterangan === 'Terlambat',
                  'text-yellow-500': row.keterangan === 'Pulang Lebih Cepat',
                  'text-blue-500': row.keterangan === 'Lembur',
                }"
              >
                {{ row.keterangan }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
