<script setup lang="ts">
import Vanara from "@/assets/img/ico-app.ico";

const stats = [
  { value: "7+", label: "Modul Terintegrasi" },
  { value: "24/7", label: "Real-time Monitoring" },
  { value: "100%", label: "Digital Checklist" },
];
</script>

<template>
  <div
    class="hidden lg:flex lg:w-1/2 relative overflow-hidden"
    style="background: #0a0f1a"
  >
    <!-- Geometric Grid Pattern -->
    <div class="absolute inset-0" style="opacity: 0.06">
      <div
        class="absolute inset-0"
        style="
          background-image: linear-gradient(rgba(39, 194, 109, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(39, 194, 109, 0.8) 1px, transparent 1px);
          background-size: 48px 48px;
        "
      />
    </div>

    <!-- Corner accent lines -->
    <div class="absolute top-0 left-0 w-24 h-24" style="opacity: 0.4">
      <div class="absolute top-8 left-0 w-full h-px" style="background: #14b8a6" />
      <div class="absolute top-0 left-8 h-full w-px" style="background: #14b8a6" />
    </div>
    <div class="absolute bottom-0 right-0 w-24 h-24" style="opacity: 0.4">
      <div class="absolute bottom-8 left-0 w-full h-px" style="background: #14b8a6" />
      <div class="absolute top-0 right-8 h-full w-px" style="background: #14b8a6" />
    </div>

    <!-- Teal glow orb -->
    <div
      class="absolute"
      style="
        width: 480px;
        height: 480px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%);
        top: -80px;
        right: -120px;
        pointer-events: none;
      "
    />

    <div class="relative z-10 flex flex-col justify-center px-12 text-white h-full">
      <!-- Logo + Brand -->
      <div class="flex items-center gap-4 mb-10">
        <div
          class="w-14 h-14 flex items-center justify-center rounded-sm"
          style="
            background: rgba(20, 184, 166, 0.1);
            border: 1px solid rgba(39, 194, 109, 0.3);
          "
        >
          <img :src="Vanara" alt="Logo" class="w-9 h-9 object-contain" />
        </div>
        <div>
          <div class="flex items-baseline gap-0.5">
            <span
              class="text-3xl font-black tracking-tight"
              style="color: #27c26d; font-family: 'Georgia', serif"
              >Vanara</span
            >
            <span
              class="text-3xl font-light tracking-tight"
              style="color: #e2e8f0; font-family: 'Georgia', serif"
              >Admin</span
            >
          </div>
          <div class="flex items-center gap-2 mt-0.5">
            <div class="h-px w-4" style="background: #27c26d" />
            <p
              class="text-xs tracking-widest uppercase"
              style="color: #64748b; letter-spacing: 0.18em"
            >
              Management System
            </p>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="mb-8 flex items-center gap-3">
        <div class="h-px flex-1" style="background: rgba(255, 255, 255, 0.06)" />
        <div class="w-1.5 h-1.5 rotate-45" style="background: #27c26d" />
        <div class="h-px flex-1" style="background: rgba(255, 255, 255, 0.06)" />
      </div>

      <!-- Main heading -->
      <h2
        class="text-3xl font-bold mb-4 leading-tight"
        style="color: #f1f5f9; letter-spacing: -0.01em"
      >
        Administrasi <span style="color: #27c26d">Sistem</span> dan
        <span style="color: #27c26d">Pencatatan Pegawai </span><br />
      </h2>

      <!-- Acronym badge -->
      <div class="inline-flex items-center gap-2 mb-6 w-fit">
        <div
          class="px-3 py-1 rounded-sm text-xs font-bold tracking-widest"
          style="
            background: rgba(20, 184, 166, 0.12);
            border: 1px solid rgba(20, 184, 166, 0.3);
            color: #27c26d;
            letter-spacing: 0.2em;
          "
        >
          <div class="flex items-center gap-1">
            <p
              class="text-xs tracking-widest uppercase"
              style="color: #27c26d; letter-spacing: 0.18em"
            >
              VANARA
            </p>
            <p
              class="text-xs tracking-widest uppercase"
              style="color: #e2e8f0; letter-spacing: 0.18em"
            >
              ADMIN
            </p>
          </div>
        </div>
      </div>

      <p
        class="text-sm mb-10"
        style="color: #64748b; max-width: 4000px; line-height: 1.6"
      >
        Platform digital terintegrasi untuk mengelola seluruh proses operasi — dari
        penjadwalan hingga pelaporan, secara efisien dan aman.
      </p>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-3">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="relative p-4 rounded-sm"
          style="
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.07);
          "
        >
          <!-- top-left corner accent -->
          <div
            class="absolute top-0 left-0 w-4 h-4"
            style="
              border-top: 1.5px solid rgba(39, 194, 109, 0.5);
              border-left: 1.5px solid rgba(39, 194, 109, 0.5);
            "
          />
          <div
            class="text-2xl font-black mb-1"
            style="color: #27c26d; font-variant-numeric: tabular-nums"
          >
            {{ stat.value }}
          </div>
          <div class="text-xs leading-snug" style="color: #475569">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
