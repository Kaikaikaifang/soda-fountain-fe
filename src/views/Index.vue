<template>
  <Layout>
    <div
      class="w-full bg-black shadow-white shadow-inner bg-opacity-90 font-medium text-center text-white flex flex-col gap-2 py-10"
    >
      <h1 class="font-medium text-6xl">Soda Fountain</h1>
      <h2 class="text-2xl">智能饮料机</h2>
      <div class="flex gap-4 justify-center relative">
        <img
          src="@/assets/soft-drinks-colorful.png"
          class="xl:h-[450px] xl:w-[450px] h-[250px] w-[250px]"
          alt="Soda Fountain"
        />
        <img
          src="@/assets/soft-drinks.png"
          class="xl:h-[450px] xl:w-[450px] h-[250px] w-[250px] absolute"
          alt="Soda Fountain"
        />
      </div>
      <p class="text-lg text-white">进一步了解</p>
      <p class="text-lg text-white">👇</p>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/layouts/Layout.vue";
</script>

<style lang="scss" scoped></style>
