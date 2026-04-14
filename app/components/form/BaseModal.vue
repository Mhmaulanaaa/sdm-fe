<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  title?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};

const handleBackdrop = (e: MouseEvent) => {
  if (e.target === e.currentTarget) close();
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      @click="handleBackdrop"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4"
    >
      <!-- CARD -->
      <transition name="scale">
        <div
          class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative overflow-hidden"
        >
          <!-- HEADER -->
          <div class="flex justify-between items-center mb-4">
            <h2
              v-if="title"
              class="text-lg font-semibold text-gray-800 dark:text-white"
            >
              {{ title }}
            </h2>

            <!-- CLOSE -->
            <button
              @click="close"
              class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              ✕
            </button>
          </div>

          <!-- CONTENT -->
          <div class="max-h-[60vh] overflow-y-auto pr-1">
            <slot />
          </div>

          <!-- FOOTER -->
          <div class="mt-5 flex justify-end gap-2">
            <button
              @click="close"
              class="px-4 py-2 rounded-xl text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
/* BACKDROP FADE */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* MODAL SCALE + SLIDE */
.scale-enter-active {
  animation: scaleIn 0.25s ease;
}
.scale-leave-active {
  animation: scaleOut 0.2s ease;
}

@keyframes scaleIn {
  from {
    transform: translateY(10px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes scaleOut {
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(10px) scale(0.95);
    opacity: 0;
  }
}
</style>
