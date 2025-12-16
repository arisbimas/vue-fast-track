<script setup>
import { onMounted, ref, computed } from 'vue' // Added ref and computed
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'

// Access the store
const store = useUserStore()

// Destructure state/getters with storeToRefs to keep reactivity
// We still use sortedUsers as the source for our local filter
const { sortedUsers, loading, error, userCount } = storeToRefs(store)

// Actions can be destructured directly
const { fetchUsers, removeUser } = store

// --- Search Logic ---
const searchQuery = ref('')

const filteredUsers = computed(() => {
  if (!searchQuery.value) return sortedUsers.value

  const query = searchQuery.value.toLowerCase()
  return sortedUsers.value.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    (user.company && user.company.toLowerCase().includes(query))
  )
})

onMounted(() => {
  if (store.users.length === 0) {
    fetchUsers()
  }
})
</script>

<template>
  <div class="user-list">
    <div class="header">
      <h2>User List ({{ userCount }})</h2>
      <button @click="fetchUsers" :disabled="loading">
        {{ loading ? 'Loading...' : 'Refresh Data' }}
      </button>
    </div>

    <!-- Search Input -->
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search users..." class="search-input" />
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="loading && userCount === 0" class="loading">
      Fetching users from API...
    </div>

    <ul v-else class="list">
      <li v-for="user in filteredUsers" :key="user.id">
        <div class="user-info">
          <strong>{{ user.name }}</strong>
          <small>{{ user.email }}</small>
          <span v-if="user.company" class="company">🏢 {{ user.company }}</span>
        </div>
        <button class="delete-btn" @click="removeUser(user.id)">Delete</button>
      </li>
    </ul>

    <div v-if="!loading && filteredUsers.length === 0 && userCount > 0" class="no-results">
      No users match your search.
    </div>
  </div>
</template>

<style scoped>
.user-list {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.header {
  padding: 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.header button {
  font-size: 0.8em;
  padding: 0.5em 1em;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background: #f8f9fa;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.user-info strong {
  color: var(--color-text);
}

.user-info small {
  color: #64748b;
}

.company {
  font-size: 0.75em;
  color: var(--color-primary);
  font-weight: 500;
  background: #e8f5e9;
  padding: 2px 6px;
  border-radius: 4px;
  width: fit-content;
}

.delete-btn {
  background: transparent;
  color: #ef4444;
  border: 1px solid #fee2e2;
  padding: 0.4rem 0.8rem;
}

.delete-btn:hover {
  background: #fee2e2;
}

.error {
  padding: 1.5rem;
  color: #ef4444;
  background: #fef2f2;
}

.loading {
  padding: 3rem;
  text-align: center;
  color: #94a3b8;
}

.search-bar {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  background: #fff;
}

.search-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 0.95rem;
  box-sizing: border-box;
  /* Important for full width */
}

.search-input:focus {
  outline: 2px solid var(--color-primary);
  border-color: transparent;
}

.no-results {
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-style: italic;
}
</style>
