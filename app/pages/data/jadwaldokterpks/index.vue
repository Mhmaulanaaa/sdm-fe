<script setup lang="ts">
import { ref, computed } from "vue";
import AppBreadcrumb from "~/components/AppBreadcrumb.vue";
const selectedDate = ref("");
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

const search = ref("");

// form
const selectedDoctor = ref("");
const selectedDays = ref<string[]>([]);

// data table
const schedules = ref([
  {
    nama: "dr. Yusuf Azmi",
    hari: ["Senin", "Selasa", "Rabu"],
  },
  {
    nama: "dr. Siti Rahma",
    hari: ["Kamis", "Jumat"],
  },
  {
    nama: "dr. Budi Santoso",
    hari: ["Sabtu", "Minggu"],
  },
  {
    nama: "dr. Dewi Lestari",
    hari: ["Senin", "Kamis"],
  },
]);

// list hari
const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

// toggle hari
const toggleDay = (day: string) => {
  if (selectedDays.value.includes(day)) {
    selectedDays.value = selectedDays.value.filter((d) => d !== day);
  } else {
    selectedDays.value.push(day);
  }
};

// simpan
const saveSchedule = () => {
  if (!selectedDoctor.value || selectedDays.value.length === 0) {
    alert("Lengkapi data dulu");
    return;
  }

  schedules.value.push({
    nama: selectedDoctor.value,
    hari: [...selectedDays.value],
  });

  // reset
  selectedDoctor.value = "";
  selectedDays.value = [];
};

// search
const filteredSchedules = computed(() => {
  return schedules.value.filter((item) =>
    item.nama.toLowerCase().includes(search.value.toLowerCase())
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
  <!-- Table -->
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

        <!-- SELECT -->
        <div class="mb-5">
          <label class="text-xs font-medium text-gray-500 dark:text-slate-400 block mb-1">
            Nama Pegawai
          </label>
          <select
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option>Pilih Nama Dokter</option>
          </select>
        </div>

        <!-- HARI -->
        <div class="mb-6 w-full">
          <label class="text-xs font-medium text-gray-500 dark:text-slate-400 block mb-2">
            Pilih Hari Aktif
          </label>

          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 w-full">
            <button
              v-for="day in days"
              :key="day"
              @click="toggleDay(day)"
              :class="[
                'py-2 text-sm rounded-xl border transition',
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
            @click="saveSchedule"
            class="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm"
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
        <div class="relative mb-5">
          <UIcon
            name="heroicons:magnifying-glass"
            class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="search"
            type="text"
            placeholder="Cari dokter..."
            class="w-full pl-3 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm"
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
                :key="i"
                class="hover:bg-gray-50 transition"
              >
                <td class="py-3 px-3 text-xs text-gray-400">{{ i + 1 }}</td>

                <td class="px-3 font-medium">{{ row.nama }}</td>

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
                  <button class="px-3 py-1 bg-blue-500 text-white text-xs">
                    <UIcon name="heroicons:document-text" class="w-4 h-4 inline-block" />
                  </button>
                  <button class="px-3 py-1 bg-red-500 text-white text-xs">
                    <UIcon name="heroicons:trash" class="w-4 h-4 inline-block" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
