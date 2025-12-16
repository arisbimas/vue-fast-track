<script setup>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'

const status = ref('Initializing...')

// Equivalent to useEffect(() => {}, [])
onMounted(() => {
  console.log('✅ Component MOUNTED')
  status.value = 'Mounted! Check console.'

  // Example: Start a timer
  const timer = setInterval(() => {
    console.log('⏱️ Timer tick')
  }, 5000)

  // Cleanup in unmount
  onUnmounted(() => {
    clearInterval(timer)
    console.log('🛑 Component UNMOUNTED - Timer cleared')
  })
})

const updateCount = ref(0)
onUpdated(() => {
  console.log('🔄 Component UPDATED')
  // REMOVED: updateCount.value++ (This caused the infinite loop!)
})
</script>

<template>
  <div class="card lifecycle">
    <h2>4. Lifecycle Hooks</h2>
    <p>Status: {{ status }}</p>
    <p class="hint">Check console for "Component UPDATED" logs when you click below.</p>
    <button @click="status = 'Updated at ' + new Date().toLocaleTimeString()">Trigger Update</button>
  </div>
</template>

<style scoped>
/* Inherits .card */
.lifecycle {
  background: white;
  border: 1px solid var(--color-primary);
}

.lifecycle h2 {
  color: var(--color-primary);
}

button {
  background: var(--color-secondary);
  color: white;
}
</style>
