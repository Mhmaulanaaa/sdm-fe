<script setup lang="ts">
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const { pengumuman, loadData, updatePengumuman } = usePengumuman();

useHead({
  title: "Edit Pengumuman",
});

const formatDate = (val: string | undefined) => {
  if (!val) return "";
  return val.includes("T") ? val.split("T")[0] : val;
};

// ✅ FORM sama seperti CREATE
const form = ref({
  id: 0,
  judul: "",
  tanggalpublish: "",
  status: "",
});

onMounted(async () => {
  await loadData();

  const data = pengumuman.value.find(
    (i: any) => Number(i.id) === Number(route.params.id)
  );

  if (!data) return;

  form.value = {
    id: data.id ?? 0,
    judul: data.judul ?? "",
    tanggalpublish: "" + formatDate(data.tanggalpublish),
    status: data.status ?? "",
  };
});

// ✅ UPDATE (bukan add)
const submitForm = () => {
  if (!form.value.id) return;

  updatePengumuman(form.value.id, {
    judul: form.value.judul,
    tanggalpublish: form.value.tanggalpublish,
    status: form.value.status,
  });

  router.push("/master/karir/pengumuman");
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
    <!-- HEADER -->
    <div class="mb-4">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-white">Edit Pengumuman</h1>
      <p class="text-sm text-gray-400">Master - Pengumuman - Edit</p>
    </div>

    <!-- CARD -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <!-- ACTION -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-semibold text-gray-700 dark:text-white">Edit Pengumuman</h2>

        <div class="flex gap-2">
          <button
            @click="goBack"
            class="px-4 py-2 rounded-xl bg-gray-200 dark:bg-slate-700 text-sm"
          >
            Kembali
          </button>

          <button
            @click="submitForm"
            class="px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition"
          >
            Update Pengumuman
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <!-- JUDUL -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Judul</label>
          <input
            v-model="form.judul"
            type="text"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- TANGGAL PUBLISH -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Tanggal Publish</label>
          <input
            v-model="form.tanggalpublish"
            type="date"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- STATUS  -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Status</label>
          <select
            v-model="form.status"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          >
            <option value="">Pilih</option>
            <option>Aktif</option>
            <option>Tidak Aktif</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
