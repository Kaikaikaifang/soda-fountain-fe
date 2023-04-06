<template>
  <div
    class="w-full h-screen relative overflow-y-scroll flex flex-col snap-mandatory snap-y"
  >
    <PageHeader class="z-10" />
    <Canvas class="absolute w-full h-[400vh] top-0 left-0 z-[-1]" />
    <Index class="scrool-center" />
    <Background class="scrool-center" />
    <Introduction class="scrool-center" />
    <AboutUs class="scrool-center" />
  </div>
</template>

<script setup>
import Canvas from "@/components/Canvas.vue";
import AboutUs from "@/views/AboutUs.vue";
import Index from "@/views/Index.vue";
import Introduction from "@/views/Introduction.vue";
import Background from "@/views/Background.vue";
import PageHeader from "@/layouts/PageHeader.vue";
</script>

<style lang="scss" scoped>
.scrool-center {
  @apply snap-center shrink-0;
}
</style>
