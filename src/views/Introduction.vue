<template>
  <Layout>
    <div
      class="w-full bg-black shadow-white shadow-inner bg-opacity-90 font-medium text-center text-white flex flex-col gap-2 py-10 items-center"
    >
      <h1 class="font-medium text-6xl">Soda Fountain</h1>
      <h2 class="text-2xl">项目介绍</h2>
      <p class="text-lg w-1/2">
        我们的饮料机采用了先进的自动化技术♻️，让用户可以轻松地选择自己喜欢的饮料🥤，并且可以根据自己的口味自由搭配不同的饮料和配料🍯。我们的饮料机还具有智能化的监测和清洁系统🛸，可以及时检测和清洁机器内部，确保卫生和安全✅。此外，我们的饮料机还拥有时尚、简约的外观设计，融入了现代化的元素🏅，让它成为一个不仅实用，而且美观的装置。
      </p>
      <t-swiper
        class="tdesign-demo-block--swiper xl:w-[800px] w-[400px]"
        :height="600"
        :duration="300"
        :interval="2000"
      >
        <t-swiper-item>
          <img src="@/assets/coffee.png" alt="coffee" />
        </t-swiper-item>
        <t-swiper-item>
          <img src="@/assets/juicy.png" alt="juicy" />
        </t-swiper-item>
        <t-swiper-item>
          <img src="@/assets/cola.png" alt="cola" />
        </t-swiper-item>
      </t-swiper>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/layouts/Layout.vue";
</script>

<style lang="scss" scoped></style>
