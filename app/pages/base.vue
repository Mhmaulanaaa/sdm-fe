<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "~/components/form/BaseInput.vue";
import BaseNumber from "~/components/form/BaseNumber.vue";
import BaseTextArea from "~/components/form/BaseTextArea.vue";
import BaseDatePicker from "~/components/form/BaseDatePicker.vue";
import BaseSearch from "~/components/form/BaseSearch.vue";
import BaseSelect from "~/components/form/BaseSelect.vue";
const { addLowongan } = useLowongan();
useHead({
  title: "Base Template - SDM Admin",
});

const search = ref("");

const data = ref([{ nama: "Admin" }, { nama: "User" }, { nama: "Manager" }]);

const filteredData = computed(() => {
  return data.value.filter((item) =>
    item.nama.toLowerCase().includes(search.value.toLowerCase())
  );
});

const pilihanOptions = [
  { label: "Pilihan 1", value: "pilihan1" },
  { label: "Pilihan 2", value: "pilihan2" },
  { label: "Pilihan 3", value: "pilihan3" },
];

const form = ref({
  namasaya: "",
  pilihan: undefined,
  kode: "",
  nama: "",
  unit: undefined,
  kelompok: undefined,
  kategori: "",
  kebutuhan: 0,
  status_kepegawaian: "",
  sistem_kerja: "",
  tanggal_buka: "",
  tanggal_tutup: "",
  status_lowongan: "Draft",
  publish: "Tidak",
  keterangan: "",
});
</script>

<template>
  <div class="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
    <!-- HEADER -->
    <div class="mb-4">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-white">Base Template</h1>
      <p class="text-sm text-gray-400">Base - Template</p>
    </div>
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <div class="grid md:grid-cols-2 gap-4">
        <!-- COBA COBA -->
        <div>
          <BaseInput
            v-model="form.namasaya"
            label="Nama Saya"
            placeholder="Contoh: Staff Administrasi"
          />
        </div>

        <div class="mt-1">
          <label class="text-sm text-gray-600 dark:text-gray-300">Pilihan</label>
          <USelectMenu
            label="Pilihan"
            placeholder="Pilih Pilihan"
            v-model="form.pilihan"
            :items="pilihanOptions"
            class="w-48 w-full px-3 py-2 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        <div>
          <BaseNumber
            v-model="form.kebutuhan"
            label="Jumlah Kebutuhan"
            placeholder="Masukkan Number"
          />
        </div>

        <div>
          <BaseTextArea
            v-model="form.keterangan"
            label="Keterangan"
            placeholder="Masukkan keterangan"
          />
        </div>

        <div>
          <BaseDatePicker
            v-model="form.tanggal_buka"
            label="Tanggal Buka"
            placeholder="Pilih tanggal buka"
          />
        </div>

        <div class="mt-6">
          <BaseSearch v-model="search" />

          <div class="mt-4 overflow-x-auto">
            <table class="w-full text-sm text-left border-collapse">
              <!-- HEADER -->
              <thead>
                <tr
                  class="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300"
                >
                  <th class="px-4 py-3 font-medium rounded-l-xl">No</th>
                  <th class="px-4 py-3 font-medium">Nama</th>
                  <th class="px-4 py-3 font-medium rounded-r-xl text-right">Aksi</th>
                </tr>
              </thead>

              <!-- BODY -->
              <tbody>
                <tr
                  v-for="(item, index) in filteredData"
                  :key="item.nama"
                  class="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                >
                  <td class="px-4 py-3">{{ index + 1 }}</td>

                  <td class="px-4 py-3 font-medium text-gray-800 dark:text-white">
                    {{ item.nama }}
                  </td>

                  <td class="px-4 py-3 text-right">
                    <button class="text-blue-500 hover:underline text-xs">Detail</button>
                  </td>
                </tr>

                <!-- EMPTY STATE -->
                <tr v-if="filteredData.length === 0">
                  <td colspan="3" class="text-center py-6 text-gray-400">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
