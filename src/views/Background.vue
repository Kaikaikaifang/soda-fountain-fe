<template>
  <Layout>
    <div
      class="w-full bg-white bg-opacity-90 shadow-sky-200 shadow-innerfont-medium text-center flex flex-col gap-2 py-10 items-center"
    >
      <h1 class="font-medium text-6xl">Soda Fountain</h1>
      <h2 class="text-2xl">项目背景</h2>
      <p class="text-lg w-1/2">
        饮料机在现代社会中已经成为了人们生活中不可或缺❗️的一部分。然而，传统的饮料机存在一些问题❌，例如操作不方便、种类单一、卫生问题等。因此，我们团队决定设计一款新型的饮料机，以解决这些问题并提供更好的用户体验✅。
      </p>
      <t-swiper
        class="tdesign-demo-block--swiper xl:w-[800px] w-[400px]"
        :height="600"
        :duration="300"
        :interval="2000"
      >
        <t-swiper-item>
          <img src="@/assets/index.png" alt="index" />
        </t-swiper-item>
        <t-swiper-item>
          <img src="@/assets/hcoffee.png" alt="have a coffee" />
        </t-swiper-item>
        <t-swiper-item>
          <img src="@/assets/hjuicy.png" alt="have a juicy" />
        </t-swiper-item>
        <t-swiper-item>
          <img src="@/assets/hcola.png" alt="have a cola" />
        </t-swiper-item>
      </t-swiper>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/layouts/Layout.vue";
</script>

<style lang="scss" scoped></style>
