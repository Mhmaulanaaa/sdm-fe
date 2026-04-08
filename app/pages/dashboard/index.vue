<script setup lang="ts">
import AppBreadcrumb from "~/components/AppBreadcrumb.vue";
definePageMeta({
  layout: "default",
  breadcrumb: [
    { label: "Home", to: "/dashboard" },
    { label: "Dashboard", to: "/dashboard" },
  ],
});

useHead({
  title: "Dashboard - SDM Admin",
});

// Dark mode state
const colorMode = useColorMode();

/* ================== TOP CARDS ================== */
const stats = [
  {
    title: "Total Pegawai",
    value: 4555,
    icon: "i-lucide-users",
    color: "emerald",
    bgGradient: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "PNS / CPNS",
    value: 1820,
    icon: "i-lucide-users",
    color: "blue",
    bgGradient: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "PPPK",
    value: 1106,
    icon: "i-lucide-users",
    color: "amber",
    bgGradient: "from-amber-500/20 to-amber-600/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "BLUD",
    value: 54,
    icon: "i-lucide-users",
    color: "violet",
    bgGradient: "from-violet-500/20 to-violet-600/10",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Dokter Mitra",
    value: 248,
    icon: "i-lucide-users",
    color: "violet",
    bgGradient: "from-violet-500/20 to-violet-600/10",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Lainnya",
    value: 52,
    icon: "i-lucide-users",
    color: "violet",
    bgGradient: "from-violet-500/20 to-violet-600/10",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
];

/* ================== PIE ================== */
const pie1 = [55, 33, 7, 3, 2];
const pie2 = [40, 60];

const pieOptions = (labels: string[]) => ({
  chart: { type: "pie" },
  labels,
  legend: {
    position: "bottom",
    labels: {
      colors: document.documentElement.classList.contains("dark")
        ? "#94a3b8" // slate-200
        : "#374151", // gray-700
    },
  },
});

/* ================== LINE ================== */
const lineSeries = [
  {
    name: "Jumlah Pegawai",
    data: [1200, 1180, 1150, 300, 320, 310, 1700],
  },
];

const lineOptions = computed(() => ({
  chart: {
    type: "line",
    toolbar: { show: false },
    background: "transparent",
    foreColor: colorMode.value === "dark" ? "#94a3b8" : "#64748b",
  },

  theme: {
    mode: colorMode.value === "dark" ? "dark" : "light",
  },

  stroke: {
    curve: "smooth",
    width: 3,
  },

  colors: ["#22c55e"],

  fill: {
    type: "gradient",
    gradient: {
      shade: colorMode.value === "dark" ? "dark" : "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: ["#4ade80"],
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 100],
    },
  },

  markers: {
    size: 4,
    colors: ["#22c55e"],
    strokeColors: "#fff",
    strokeWidth: 2,
    hover: {
      size: 6,
    },
  },

  grid: {
    borderColor: colorMode.value === "dark" ? "#1e293b" : "#e5e7eb",
    strokeDashArray: 4,
  },

  xaxis: {
    categories: ["31 Mar", "01 Apr", "02 Apr", "03 Apr", "04 Apr", "05 Apr", "06 Apr"],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },

  yaxis: {
    labels: {
      formatter: (val: number) => val.toFixed(0),
    },
  },

  tooltip: {
    theme: colorMode.value === "dark" ? "dark" : "light",
    x: {
      show: true,
    },
    y: {
      formatter: (val: number) => `${val} Pegawai`,
    },
  },

  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: { height: 250 },
      },
    },
  ],
}));

/* ================== TABLE ================== */
const tableData = Array.from({ length: 7 }, (_, i) => ({
  name: "User " + (i + 1),
  status: "Datang",
  shift: "SHIFT SIANG",
  time: "2026-04-06 13:54",
}));
</script>

<template>
  <!-- ================= HEADER ================= -->
  <div class="mb-4">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">Dashboard</h1>
    <AppBreadcrumb />
  </div>
  <!-- ================= TOP CARDS ================= -->
  <div class="p-6 mb-5 bg-white dark:bg-slate-800 space-y-3 rounded-2xl">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
      <UCard v-for="stat in stats" :key="stat.title" class="shadow-sm">
        <div class="flex justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ stat.title }}</p>
            <p class="text-2xl font-bold">{{ stat.value }}</p>
          </div>
          <UIcon :name="stat.icon" class="w-6 h-6" />
        </div>
      </UCard>
    </div>
  </div>
  <!-- ================= PIE ================= -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- LEFT -->
    <div class="bg-white dark:bg-slate-800 p-5 py-5 rounded-xl shadow">
      <h3 class="text-sm mb-3 text-center text-gray-700 dark:text-slate-200">
        Statistik Pegawai Berdasarkan Kelompok Pegawai
      </h3>
      <ClientOnly>
        <apexchart
          type="pie"
          height="400"
          :options="pieOptions(['PNS/CPNS', 'PPPK', 'BLUD', 'Dokter', 'Lainnya'])"
          :series="pie1"
        />
      </ClientOnly>
    </div>

    <!-- RIGHT -->
    <div class="bg-white dark:bg-slate-800 p-5 py-5 rounded-xl shadow">
      <h3 class="text-sm mb-3 text-center text-gray-700 dark:text-slate-200">
        Statistik Pegawai Berdasarkan Jenis Kelamin
      </h3>
      <ClientOnly>
        <apexchart
          type="pie"
          height="400"
          :options="pieOptions(['Laki-Laki', 'Perempuan'])"
          :series="pie2"
        />
      </ClientOnly>
    </div>
  </div>

  <!-- ================= LINE ================= -->
  <div
    class="bg-white dark:bg-slate-800 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 mt-5"
  >
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-sm font-semibold text-gray-700 dark:text-slate-200">
          Absensi Harian
        </h3>
        <p class="text-xs text-gray-400 dark:text-slate-500">7 Hari Terakhir</p>
      </div>

      <UIcon
        name="heroicons:chart-bar"
        class="w-5 h-5 text-gray-400 dark:text-slate-500"
      />
    </div>

    <!-- CHART -->
    <ClientOnly>
      <apexchart type="line" height="300" :options="lineOptions" :series="lineSeries" />
    </ClientOnly>
  </div>

  <!-- ================= TABLE ABSENSI ================= -->
  <div
    class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mt-5"
  >
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-semibold text-gray-800 dark:text-white">Detail Absensi Hari Ini</h3>
    </div>

    <!-- SEARCH -->
    <div class="relative mb-4">
      <UIcon
        name="heroicons:magnifying-glass"
        class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Cari nama / shift..."
        class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
      />
    </div>

    <!-- TABLE -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr
            class="text-left text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-700"
          >
            <th class="py-3 px-2">No</th>
            <th class="px-2">Nama</th>
            <th class="px-2">Status</th>
            <th class="px-2">Shift</th>
            <th class="px-2">Waktu</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, i) in tableData"
            :key="i"
            class="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition"
          >
            <td class="py-3 px-2 text-gray-400 text-xs">{{ i + 1 }}</td>

            <!-- Nama -->
            <td class="px-2 font-small text-xs text-gray-700 dark:text-slate-200">
              {{ row.name }}
            </td>

            <!-- Status -->
            <td class="px-2">
              <span
                :class="[
                  'px-2.5 py-1 rounded-full text-xs font-medium',
                  row.status === 'Datang'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
                ]"
              >
                {{ row.status }}
              </span>
            </td>

            <!-- Shift -->
            <td class="px-2 text-gray-500 dark:text-slate-300 text-xs">
              {{ row.shift }}
            </td>

            <!-- Waktu -->
            <td class="px-2 text-gray-400 text-xs">
              {{ row.time }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ================= TABLE IZIN ================= -->
  <div
    class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mt-5"
  >
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-semibold text-gray-800 dark:text-white">Izin & Cuti Aktif</h3>
    </div>

    <!-- SEARCH -->
    <div class="relative mb-4">
      <UIcon
        name="heroicons:magnifying-glass"
        class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Cari data izin..."
        class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>

    <!-- EMPTY STATE -->
    <div class="flex flex-col items-center justify-center py-10 text-center">
      <UIcon name="heroicons:document-text" class="w-10 h-10 text-gray-300 mb-2" />
      <p class="text-sm text-gray-400">Belum ada data izin & cuti</p>
    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(148, 163, 184, 0.3);
  border-radius: 20px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(148, 163, 184, 0.5);
}

/* Animasi Stagger */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group {
  animation: slideIn 0.5s ease-out forwards;
  opacity: 0;
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass Effect Enhancement */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.dark .glass {
  background: rgba(15, 23, 42, 0.7);
}
</style>
