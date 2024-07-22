<script setup lang="ts">
import { ref, watch } from 'vue'
import { loadFull } from 'tsparticles'
import type { Engine } from '@tsparticles/engine'

type LeaderboardItem = {
  colorClass: string
  points: number
}

const allItems = ref<LeaderboardItem[]>([
  {
    colorClass: 'bg-green-300',
    points: 200
  },
  {
    colorClass: 'bg-yellow-300',
    points: 100
  },
  {
    colorClass: 'bg-white',
    points: 100
  },
  {
    colorClass: 'bg-pink-300',
    points: 20
  },
  {
    colorClass: 'bg-purple-300',
    points: 100
  },
  {
    colorClass: 'bg-orange-300',
    points: 300
  },
  {
    colorClass: 'bg-blue-300',
    points: 100
  },
  {
    colorClass: 'bg-red-300',
    points: 100
  }
])

watch(
  allItems.value,
  () => {
    allItems.value.sort((a, b) => b.points - a.points)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="bg-gray-200 flex items-center justify-center h-screen">
    <div class="bg-gray-100 shadow-lg rounded-lg p-6 max-w-4xl w-full">
      <h1 class="text-5xl font-bold mb-4 text-center">SUMMERCAMP 2025</h1>
      <div class="flex flex-col gap-2 text-center">
        <template v-for="(item, index) in allItems" :key="item.colorClass">
          <div
            class="flex shadow-lg p-4 rounded-xl mb-2 text-xl text-center font-bold"
            :class="item.colorClass"
          >
            <div class="">{{ index + 1 }}.</div>
            <div class="flex-grow">{{ item.points }}</div>
          </div>
        </template>

        <vue-particles id="tsparticles" url="http://foo.bar/particles.json" />
      </div>
    </div>
  </div>
</template>
