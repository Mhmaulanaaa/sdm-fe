<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import AppBreadcrumb from "~/components/AppBreadcrumb.vue";
import { useJadwalDokterPKS } from "#imports";
import BaseSearch from "~/components/form/BaseSearch.vue";

useHead({
  title: "Data Jadwal Dokter PKS - SDM Admin",
});

definePageMeta({
  breadcrumb: [
    { label: "Home", to: "/dashboard" },
    { label: "Data", to: "/data" },
    { label: "Jadwal Dokter PKS" },
  ],
});

// ================= TYPES =================
type DoctorOption = {
  label: string;
  value: string;
};

// ================= COMPOSABLE =================
const {
  schedules,
  doctorOptions,
  days,
  loadData,
  addSchedule,
  deleteSchedule,
  toggleDay,
} = useJadwalDokterPKS();

// ================= INIT =================
onMounted(() => {
  loadData();
});

// ================= STATE =================
const search = ref("");
const selectedDoctor = ref<DoctorOption>();
const selectedDays = ref<string[]>([]);

// ================= ACTION =================
const onToggleDay = (day: string) => {
  selectedDays.value = toggleDay(selectedDays.value, day);
};

const saveSchedule = () => {
  if (!selectedDoctor.value || selectedDays.value.length === 0) {
    alert("Lengkapi data dulu");
    return;
  }

  addSchedule(selectedDoctor.value, selectedDays.value);

  selectedDoctor.value = undefined;
  selectedDays.value = [];
};

// ================= FILTER =================
const filteredSchedules = computed(() => {
  return schedules.value.filter((item) =>
    item.nama.toLowerCase().includes(search.value.toLowerCase()),
  );
});
</script>

<template>
  <div class="mb-4">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">
      Data Jadwal Dokter PKS
    </h1>
    <AppBreadcrumb />
  </div>

  <div
    class="bg-white dark:bg-slate-800 p-5 rounded-2xl min-h-screen shadow-sm border border-gray-100 dark:border-slate-700 mt-5"
  >
    <div class="space-y-6">
      <!-- ================= FORM ================= -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700"
      >
        <h2 class="text-base font-semibold text-gray-800 dark:text-white mb-5">
          Perjanjian Jadwal Baru
        </h2>

        <!-- SELECT DOKTER -->
        <div class="mb-5">
          <label
            class="text-xs font-medium text-gray-500 dark:text-slate-400 block mb-1"
          >
            Nama Dokter
          </label>

          <USelectMenu
            v-model="selectedDoctor"
            :items="doctorOptions"
            placeholder="Pilih Nama Dokter"
            class="w-full h-[44px] px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700"
          />
        </div>

        <!-- PILIH HARI -->
        <div class="mb-6 w-full">
          <label
            class="text-xs font-medium text-gray-500 dark:text-slate-400 block mb-2"
          >
            Pilih Hari Aktif
          </label>

          <div
            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 w-full"
          >
            <button
              v-for="day in days"
              :key="day"
              type="button"
              @click="onToggleDay(day)"
              :class="[
                'py-2 text-sm rounded-xl border-0 transition',
                selectedDays.includes(day)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-50 dark:bg-slate-900 border-gray-200 hover:bg-blue-50 hover:text-blue-600',
              ]"
            >
              {{ day }}
            </button>
          </div>
        </div>

        <!-- BUTTON -->
        <div class="flex justify-end">
          <button
            type="button"
            @click="saveSchedule"
            class="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm"
          >
            <UIcon name="heroicons:document-text" class="w-4 h-4" />
            <span>Simpan Jadwal</span>
          </button>
        </div>
      </div>

      <!-- ================= TABLE ================= -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-semibold text-gray-800 dark:text-white">
            List Jadwal Dokter
          </h2>
        </div>

        <!-- SEARCH -->
        <div class="mb-5 w-full">
          <BaseSearch
            v-model="search"
            placeholder="Cari dokter..."
            class="w-full"
          />
        </div>

        <!-- TABLE -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr
                class="text-left text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-700"
              >
                <th class="py-3 px-3">No</th>
                <th class="px-3">Dokter</th>
                <th class="px-3">Hari Aktif</th>
                <th class="px-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(row, i) in filteredSchedules"
                :key="row.id"
                class="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition"
              >
                <td class="py-3 px-3 text-xs text-gray-400">
                  {{ i + 1 }}
                </td>

                <td class="px-3 font-medium">
                  {{ row.nama }}
                </td>

                <td class="px-3">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="(d, index) in row.hari"
                      :key="index"
                      class="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-md"
                    >
                      {{ d }}
                    </span>
                  </div>
                </td>

                <td class="px-3">
                  <button
                    type="button"
                    class="px-3 py-1 bg-blue-500 text-white text-xs mr-1"
                  >
                    <UIcon
                      name="heroicons:document-text"
                      class="w-4 h-4 inline-block"
                    />
                  </button>

                  <button
                    type="button"
                    @click="deleteSchedule(row.id)"
                    class="px-3 py-1 bg-red-500 text-white text-xs"
                  >
                    <UIcon
                      name="heroicons:trash"
                      class="w-4 h-4 inline-block"
                    />
                  </button>
                </td>
              </tr>

              <tr v-if="filteredSchedules.length === 0">
                <td colspan="4" class="text-center py-6 text-gray-400 text-sm">
                  Tidak ada data
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
