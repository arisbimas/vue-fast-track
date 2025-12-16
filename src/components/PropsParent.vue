<script setup>
import { ref } from 'vue'
import PropsChild from './PropsChild.vue'

const parentMessage = ref('Hello from Parent!')
const notification = ref('')

// Function to handle event emitted from child
const handleChildNotify = (msg) => {
  notification.value = `Received from child: "${msg}" at ${new Date().toLocaleTimeString()}`
}
</script>

<template>
  <div class="card parent">
    <h2>3. Props & Emits (Parent)</h2>
    
    <div class="control">
      <label>Message to Child: </label>
      <input v-model="parentMessage" />
    </div>

    <!-- Pass prop 'msg' and listen to 'notify-parent' -->
    <PropsChild 
      :msg="parentMessage" 
      @notify-parent="handleChildNotify" 
    />

    <p v-if="notification" class="notification">{{ notification }}</p>
  </div>
</template>

<style scoped>
/* Inherits .card */
.card.parent { 
  border: 2px solid var(--color-accent); 
  background: #f0f9ff;
}

.control { 
  margin-bottom: 1.5rem; 
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.notification { 
  margin-top: 1rem;
  color: #c62828; 
  font-weight: 500; 
  background: #ffebee; 
  padding: 0.8rem; 
  border-radius: 6px;
  border: 1px solid #ffcdd2;
}
</style>
