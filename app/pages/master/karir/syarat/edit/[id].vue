<script setup lang="ts">
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const { syarat, loadData, updateSyarat } = useSyarat();

useHead({
  title: "Edit Syarat",
});

// ✅ FORM HARUS SAMA DENGAN CREATE
const form = ref({
  id: 0,
  nama: "",
  deskripsi: "",
  tipe: "", // ✅ FIX (bukan syarat)
  wajib: "",
  status: "",
  no_urut: 1,
  publish: "Tidak",
});

// ✅ LOAD DATA (ASYNC FIX)
onMounted(async () => {
  await loadData();

  const data = syarat.value.find((i: any) => Number(i.id) === Number(route.params.id));

  console.log("DATA SYARAT:", data);

  if (!data) return;

  form.value = {
    id: data.id ?? 0,
    nama: data.nama ?? "",
    deskripsi: data.deskripsi ?? "",
    tipe: data.tipe ?? "", // ✅ FIX
    wajib: data.wajib ?? "",
    status: data.status ?? "",
    no_urut: data.no_urut ?? 1,
    publish: data.publish ?? "Tidak",
  };
});

// ✅ UPDATE
const submitForm = () => {
  if (!form.value.id) return;

  updateSyarat(form.value.id, {
    nama: form.value.nama,
    deskripsi: form.value.deskripsi,
    tipe: form.value.tipe,
    wajib: form.value.wajib,
    status: form.value.status,
    no_urut: form.value.no_urut,
    publish: form.value.publish,
  });

  router.push("/master/karir/syarat");
};

const goBack = () => router.back();
</script>

<template>
  <div class="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
    <!-- HEADER -->
    <div class="mb-4">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-white">Edit Syarat</h1>
      <p class="text-sm text-gray-400">Master - Syarat - Edit</p>
    </div>

    <!-- CARD -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <!-- ACTION -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-semibold text-gray-700 dark:text-white">Edit Syarat</h2>

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
            Update Syarat
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <!-- NAMA -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Nama Syarat</label>
          <input
            v-model="form.nama"
            type="text"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- DESKRIPSI -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Deskripsi</label>
          <input
            v-model="form.deskripsi"
            type="text"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <!-- Tipe Syarat -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Tipe Syarat</label>
          <select
            v-model="form.tipe"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          >
            <option value="">Pilih</option>
            <option value="Text">Text</option>
            <option value="File">File</option>
            <option value="Select">Select</option>
          </select>
        </div>

        <!-- KELOMPOK -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">Wajib</label>
          <select
            v-model="form.wajib"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          >
            <option value="">Pilih</option>
            <option>Ya</option>
            <option>Tidak</option>
          </select>
        </div>

        <!-- STATUS KEPEGAWAIAN -->
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

        <!-- NO URUT -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300">No Urut</label>
          <input
            v-model="form.no_urut"
            type="number"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          />
        </div>

        <!-- PUBLISH -->
        <div>
          <label class="text-sm text-gray-600 dark:text-gray-300"
            >Publish ke Publik?</label
          >
          <select
            v-model="form.publish"
            class="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm"
          >
            <option>Tidak</option>
            <option>Ya</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
