<script setup>
// defineProps is a compiler macro, no import needed
const props = defineProps({
  msg: {
    type: String,
    required: true,
    default: 'Default Message'
  }
})

// defineEmits is also a macro
const emit = defineEmits(['notify-parent'])

const sendAck = () => {
  emit('notify-parent', 'Message received loud and clear!')
}
</script>

<template>
  <div class="child">
    <h3>Child Component</h3>
    <p>Prop received: <strong>{{ msg }}</strong></p>
    <button @click="sendAck">Emit event to Parent</button>
  </div>
</template>

<style scoped>
.child { border: 2px dashed #9c27b0; padding: 1rem; margin-top: 1rem; background: #f3e5f5; }
button { background: #ab47bc; color: white; border: none; padding: 0.5rem 1rem; cursor: pointer; }
button:hover { background: #8e24aa; }
</style>
