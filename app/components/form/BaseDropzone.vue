<script setup lang="ts">
const props = defineProps<{
  modelValue: File | null;
}>();

const emit = defineEmits(["update:modelValue"]);

const fileName = ref("");
const inputFile = ref<HTMLInputElement | null>(null);

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  const file = e.dataTransfer?.files[0];
  if (file) {
    fileName.value = file.name;
    emit("update:modelValue", file);
  }
};

const handleFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    fileName.value = file.name;
    emit("update:modelValue", file);
  }
};
</script>

<template>
  <div
    @dragover.prevent
    @drop="handleDrop"
    class="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-6 text-center bg-gray-50 dark:bg-slate-900 hover:border-blue-400 transition cursor-pointer"
  >
    <input type="file" class="hidden" @change="handleFile" ref="inputFile" />

    <div @click="inputFile?.click()">
      <p class="text-sm text-gray-500">Seret file ke sini atau klik untuk upload</p>

      <p v-if="fileName" class="mt-2 text-green-500 text-sm">
        {{ fileName }}
      </p>
    </div>
  </div>
</template>
