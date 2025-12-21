<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string; // 支持 v-model 语法，用于解析 <BV=BV号> 格式
  bv?: string;        // 传统 prop 语法支持
  bf?: boolean;       // BF: 自动播放 (默认false)
  jy?: boolean;       // JY: 静音 (默认true)
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  bv: '',
  bf: false,
  jy: true
});

const biliUrl = computed(() => {
  // 优先使用 modelValue（<BV=BV号> 格式），如果没有则使用 bv prop
  const input = props.modelValue || props.bv;
  if (!input) return '';
  
  // 解析格式：<BV=BV号;BF=true,JY=false>
  const [bvPart, configPart] = input.split(';');
  const bvid = bvPart.replace(/^BV=/, '').replace(/^BV/, '');
  
  // 解析配置项
  let autoplay = props.bf ? 1 : 0;
  let muted = props.jy ? 1 : 0;
  
  if (configPart) {
    const configs = configPart.split(',');
    configs.forEach(config => {
      const [key, value] = config.split('=');
      if (key.toUpperCase() === 'BF') {
        autoplay = value.toUpperCase() === 'TRUE' ? 1 : 0;
      } else if (key.toUpperCase() === 'JY') {
        muted = value.toUpperCase() === 'TRUE' ? 1 : 0;
      }
    });
  }
  
  return `https://player.bilibili.com/player.html?bvid=BV${bvid}&autoplay=${autoplay}&muted=${muted}&high_quality=1&danmaku=0`;
});
</script>

<template>
  <div v-if="biliUrl" class="bili-video-container">
    <iframe
      :src="biliUrl"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
      class="bili-video-iframe"
    ></iframe>
  </div>
</template>

<style scoped lang="scss">
.bili-video-container {
  width: 100%;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
  height: 0;
  overflow: hidden;
  border-radius: 12px; /* 添加圆角矩形 */
  margin: 1.5rem 0; /* 增加与上下文的间距 */
  box-shadow: 0 0 20px rgba(255, 255, 255, 0); /* 默认白色模式下无辉光 */

  /* 暗色模式下的白色辉光效果 */
  @media (prefers-color-scheme: dark) {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1), /* 外层淡白色辉光 */
                0 0 10px rgba(255, 255, 255, 0.2); /* 内层稍强的白色辉光 */
  }
}

.bili-video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  border-radius: 12px; /* 确保iframe也有圆角 */
}
</style>