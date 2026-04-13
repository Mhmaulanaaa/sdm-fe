<script setup lang="ts">
import L from "leaflet";
import { onMounted, ref } from "vue";

const props = defineProps<{
  lat: number;
  lng: number;
}>();

const emit = defineEmits(["update:lat", "update:lng"]);

const mapContainer = ref();
let map: any;
let marker: any;

onMounted(() => {
  map = L.map(mapContainer.value).setView(
    [props.lat || -7.2575, props.lng || 112.7521],
    13
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);

  marker = L.marker([props.lat || -7.2575, props.lng || 112.7521], {
    draggable: true,
  }).addTo(map);

  // klik map
  map.on("click", (e: any) => {
    const { lat, lng } = e.latlng;
    marker.setLatLng([lat, lng]);

    emit("update:lat", lat);
    emit("update:lng", lng);
  });

  // drag marker
  marker.on("dragend", () => {
    const position = marker.getLatLng();
    emit("update:lat", position.lat);
    emit("update:lng", position.lng);
  });
});
</script>

<template>
  <div>
    <!-- MAP -->
    <div ref="mapContainer" class="h-72 rounded-xl mb-3"></div>

    <!-- LAT LONG -->
    <div class="grid grid-cols-2 gap-3">
      <input
        type="text"
        :value="lat"
        readonly
        class="px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-sm"
        placeholder="Latitude"
      />
      <input
        type="text"
        :value="lng"
        readonly
        class="px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-sm"
        placeholder="Longitude"
      />
    </div>
  </div>
</template>
