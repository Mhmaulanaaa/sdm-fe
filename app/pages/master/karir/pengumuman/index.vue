<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
const search = ref("");
const selectedDate = ref("");
useHead({
  title: "Pengumuman Lowongan - SDM Admin",
});

const router = useRouter();
const { pengumuman, loadData, deletePengumuman } = usePengumuman();

const goToTambah = () => {
  router.push("/master/karir/pengumuman/create");
};

// ✅ langsung pakai state
const tableData = computed(() => pengumuman.value);

// ✅ filter sesuai field
const filteredData = computed(() => {
  return tableData.value.filter((item) => {
    const keyword = search.value.toLowerCase();

    return (
      !search.value ||
      item.judul?.toLowerCase().includes(keyword) ||
      item.status?.toLowerCase().includes(keyword)
    );
  });
});

onMounted(() => {
  loadData();
});
</script>

<template>
  <!-- Table -->
  <div class="mb-4">
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white">Pengumuman</h1>
    <p class="text-sm text-gray-400">Master - Karir - Pengumuman</p>
  </div>
  <div
    class="bg-white dark:bg-slate-800 p-5 rounded-2xl min-h-screen shadow-sm border border-gray-100 dark:border-slate-700 mt-5"
  >
    <!-- HEADER -->
    <div class="space-y-4 mb-5">
      <!-- ROW 1: TITLE + BUTTON -->
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-800 dark:text-white">Master Pengumuman</h3>

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
        <UIcon
          name="heroicons:magnifying-glass"
          class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          v-model="search"
          type="text"
          placeholder="Cari Master Pengumuman..."
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
            <th class="px-2">Judul</th>
            <th class="px-2">Tanggal Publish</th>
            <th class="px-2">Status</th>
            <th class="px-5">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, i) in filteredData"
            :key="i"
            class="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition"
          >
            <td class="py-3 px-2">
              {{ i + 1 }}
            </td>
            <td class="px-2 text-xs font-medium text-gray-700 dark:text-slate-200">
              {{ row.judul }}
            </td>

            <td class="px-2 text-xs text-gray-500">
              {{ row.tanggalpublish }}
            </td>

            <td class="px-2">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  row.status === 'Aktif'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300',
                ]"
              >
                {{ row.status }}
              </span>
            </td>

            <td class="px-2">
              <div class="justify-center">
                <button
                  @click="$router.push(`/master/karir/pengumuman/edit/${row.id}`)"
                  class="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30"
                >
                  <UIcon name="heroicons:pencil-square" class="w-4 h-4 text-blue-500" />
                </button>
                <button
                  @click="deletePengumuman(row.id)"
                  :key="row.id"
                  class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  <UIcon name="heroicons:trash" class="w-4 h-4 text-red-500" />
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
