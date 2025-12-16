<script setup>
import { reactive } from 'vue'
import { useUserStore } from '../stores/userStore'

const store = useUserStore()

// Form State with reactive
const formData = reactive({
  name: '',
  email: '',
  company: ''
})

const handleSubmit = () => {
  if (!formData.name || !formData.email) return
  
  store.addUser({ ...formData })
  
  // Reset form
  formData.name = ''
  formData.email = ''
  formData.company = ''
}
</script>

<template>
  <div class="user-form">
    <h3>Add New User</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Name:</label>
        <input v-model="formData.name" placeholder="John Doe" required />
      </div>
      
      <div class="form-group">
        <label>Email:</label>
        <input v-model="formData.email" type="email" placeholder="john@example.com" required />
      </div>

      <div class="form-group">
        <label>Company:</label>
        <input v-model="formData.company" placeholder="Acme Inc" />
      </div>

      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<style scoped>
.user-form { 
  background: white; 
  padding: 2rem; 
  border-radius: 12px; 
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.form-group { margin-bottom: 1.2rem; display: flex; flex-direction: column; }
.form-group label { margin-bottom: 0.5rem; font-weight: 500; color: var(--color-secondary); }

button { 
  background: var(--color-primary); 
  color: white; 
  width: 100%;
  margin-top: 1rem;
}
button:hover { background: var(--color-primary-dark); }
</style>
