<script setup lang="ts">
import { ref, computed } from "vue";
import AppBreadcrumb from "~/components/AppBreadcrumb.vue";
import BaseSearch from "~/components/form/BaseSearch.vue";

const router = useRouter();
const search = ref("");
const { ijin, loadData, deleteIjin, updateIjin } = useIjin();
const statusFilter = ref<{ label: string; value: string } | undefined>(undefined);
const pegawaiOptions = ref<Array<{ label: string; value: string }>>([]);
const modelIjinOptions = ref<Array<{ label: string; value: string }>>([]);
const jenisIjinOptions = ref<Array<{ label: string; value: string }>>([]);
const tipeIjinOptions = ref<Array<{ label: string; value: string }>>([]);
const shiftKerjaOptions = ref<Array<{ label: string; value: string }>>([]);
const statusApprovalOptions = ref<Array<{ label: string; value: string }>>([]);
useHead({
  title: "Data Ijin - SDM Admin",
});

definePageMeta({
  breadcrumb: [
    { label: "Home", to: "/dashboard" },
    { label: "Data", to: "/data" },
    { label: "Ijin" },
  ],
});

const approveIjin = (row: any) => {
  if (row.approval === "Disetujui") return;

  updateIjin(row.id, {
    approval: "Disetujui",
  });
};

const showLaporan = (row: any) => {
  window.alert(`
Nama: ${row.nama_pegawai}
Ijin: ${row.nama_ijin}
Jenis: ${row.jenis_ijin}
Alasan: ${row.alasan}
Status: ${row.approval}
Tanggal: ${row.tanggal_mulai} - ${row.tanggal_selesai}
  `);
};

const filterOptions = [
  { label: "Semua", value: "" },
  { label: "Disetujui", value: "disetujui" },
  { label: "Belum Disetujui", value: "belum disetujui" },
  { label: "Ditolak", value: "ditolak" },
];

const goToTambah = () => {
  router.push("/data/ijin/create");
};

const filteredData = computed(() => {
  return tableData.value.filter((item) => {
    const keyword = search.value.toLowerCase();
    const status = statusFilter.value?.value?.toLowerCase() || "";

    const matchSearch =
      !search.value ||
      item.name.toLowerCase().includes(keyword) ||
      item.nama_ijin.toLowerCase().includes(keyword) ||
      item.approval.toLowerCase().includes(keyword);

    const matchStatus = !status || item.approval.toLowerCase() === status;

    return matchSearch && matchStatus;
  });
});
const stats = computed(() => [
  {
    title: "Total Ijin",
    value: tableData.value.length,
    icon: "i-lucide-calendar-check",
    color: "emerald",
    bgGradient: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Disetujui",
    value: tableData.value.filter((i) => i.approval === "Disetujui").length,
    icon: "i-lucide-check-circle",
    color: "blue",
    bgGradient: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Belum Disetujui",
    value: tableData.value.filter((i) => i.approval === "Belum Disetujui").length,
    icon: "i-lucide-clock",
    color: "amber",
    bgGradient: "from-amber-500/20 to-amber-600/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
]);

const tableData = computed(() => ijin.value || []);

onMounted(async () => {
  await loadData();

  const normalize = (val: any) => {
    return typeof val === "object" ? val.value : val;
  };

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

  ijin.value = ijin.value.map((item: any) => ({
    ...item,
    nama_pegawai:
      pegawaiOptions.find((opt) => opt.value === normalize(item.nama_pegawai))?.label ||
      normalize(item.nama_pegawai),
    nama_ijin:
      modelIjinOptions.find((opt) => opt.value === normalize(item.nama_ijin))?.label ||
      normalize(item.nama_ijin),
    tipe_ijin:
      tipeIjinOptions.find((opt) => opt.value === normalize(item.tipe_ijin))?.label ||
      normalize(item.tipe_ijin),
    jenis_ijin:
      jenisIjinOptions.find((opt) => opt.value === normalize(item.jenis_ijin))?.label ||
      normalize(item.jenis_ijin),
    shift_kerja:
      shiftKerjaOptions.find((opt) => opt.value === normalize(item.shift_kerja))?.label ||
      normalize(item.shift_kerja),
    approval:
      statusApprovalOptions.find((opt) => opt.value === normalize(item.approval))
        ?.label || normalize(item.approval),
  }));
});
</script>

<template>
  <div class="mb-4">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">Data Ijin</h1>
    <AppBreadcrumb />
  </div>
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
        <div class="relative">
          <BaseSearch v-model="search" class="" />
        </div>

        <!-- FILTER -->
        <div>
          <USelectMenu
            label="Status Approval"
            placeholder="Pilih Status"
            v-model="statusFilter"
            :items="filterOptions"
            class="w-48 w-full px-3 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <!-- BUTTON TAMBAH -->
        <button
          @click="goToTambah"
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
              {{ row.nama_pegawai }}
            </td>

            <td class="px-2 text-xs">
              {{ row.nama_ijin }}
            </td>

            <td class="px-2 text-xs">
              {{ row.tipe_ijin }}
            </td>

            <td class="px-2 text-xs">
              {{ row.jenis_ijin }}
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
              {{ row.tanggal_mulai }}
            </td>

            <td class="px-2 text-xs">
              {{ row.tanggal_selesai }}
            </td>

            <!-- AKSI -->
            <td class="px-2 text-center">
              <div class="flex justify-center items-center gap-2">
                <!-- EDIT -->
                <button
                  @click="$router.push(`/data/ijin/edit/${row.id}`)"
                  class="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
                  title="Edit"
                >
                  <UIcon name="heroicons:pencil-square" class="w-4 h-4 text-blue-500" />
                </button>

                <!-- CHECKLIST -->
                <button
                  @click="approveIjin(row)"
                  :disabled="row.approval === 'Disetujui'"
                  class="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition"
                  title="Checklist"
                >
                  <UIcon name="heroicons:check-circle" class="w-4 h-4 text-green-500" />
                </button>

                <!-- LAPORAN -->
                <button
                  @click="showLaporan(row)"
                  class="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition"
                  title="Laporan"
                >
                  <UIcon name="heroicons:document-text" class="w-4 h-4 text-purple-500" />
                </button>
              </div>
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
