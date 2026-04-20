<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import AppBreadcrumb from "~/components/AppBreadcrumb.vue";
import BaseSearch from "~/components/form/BaseSearch.vue";
import BaseDatePicker from "~/components/form/BaseDatePicker.vue";
import BaseModal from "~/components/form/BaseModal.vue";
const search = ref("");
const selectedDate = ref("");
const selectedUnit = ref<{ label: string; value: string } | undefined>(
  undefined,
);
const { laporan, loadData, deleteLaporan, updateLaporan } = useLaporan();

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

const showModal = ref(false);
const selectedData = ref<any>(null);

const showLaporan = (row: any) => {
  selectedData.value = row;
  showModal.value = true;
};

const filterOptions = [
  { label: "Semua", value: "" },
  { label: "IGD", value: "IGD" },
  { label: "Rawat Inap", value: "Rawat Inap" },
  { label: "Laboratorium", value: "Laboratorium" },
  { label: "Poli Umum", value: "Poli Umum" },
];

const filteredData = computed(() => {
  return tableData.value.filter((item) => {
    const matchSearch =
      !search.value ||
      (item.nama || "").toLowerCase().includes(search.value.toLowerCase()) ||
      (item.jenispegawai || "")
        .toLowerCase()
        .includes(search.value.toLowerCase()) ||
      (item.unitkerja || "").toLowerCase().includes(search.value.toLowerCase());

    const matchUnit =
      !selectedUnit.value?.value || item.unitkerja === selectedUnit.value.value;

    return matchSearch && matchUnit;
  });
});

const tableData = computed(() => laporan.value || []);

onMounted(() => {
  loadData();
  console.log(laporan.value);
});
</script>

<template>
  <div class="mb-4">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">
      Data Laporan
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
          Data Laporan
        </h3>
      </div>

      <!-- ROW 2: SEARCH -->
      <div class="relative w-full md:w-80">
        <BaseSearch v-model="search" placeholder="Cari nama pegawai..." />
      </div>

      <!-- ROW 3: FILTER -->
      <div
        class="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
      >
        <!-- FILTER GROUP -->
        <div
          class="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div class="flex flex-col md:flex-row gap-4">
            <!-- TANGGAL -->
            <div class="flex flex-col w-full md:w-48">
              <BaseDatePicker
                v-model="selectedDate"
                label="Tanggal"
                placeholder="Pilih tanggal"
                class="h-[44px]"
              />
            </div>

            <!-- UNIT KERJA -->
            <div class="flex flex-col w-full md:w-64 m-2">
              <label
                class="text-xs mb-1 text-gray-500 dark:text-slate-400 font-bold"
              >
                Unit Kerja
              </label>

              <div class="relative">
                <USelectMenu
                  label="Status Approval"
                  placeholder="Pilih Status"
                  v-model="selectedUnit"
                  :items="filterOptions"
                  class="w-48 w-full h-[44px] px-3 py-3 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
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
            <td
              class="px-2 text-gray-700 dark:text-slate-200 text-xs font-medium"
            >
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
                @click="showLaporan(row)"
                class="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs"
              >
                <UIcon
                  name="heroicons:document-text"
                  class="w-4 h-4 inline-block"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div>
    <BaseModal v-model="showModal" title="Detail Laporan">
      <div class="space-y-5 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-500">Nama Pegawai</span>
          <span class="font-medium">{{ selectedData?.nama }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Jenis Pegawai</span>
          <span class="font-medium">{{ selectedData?.jenispegawai }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Unit Kerja</span>
          <span class="font-medium">{{ selectedData?.unitkerja }}</span>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
