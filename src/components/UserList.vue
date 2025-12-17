<script setup>
import { onMounted, ref, computed, reactive } from 'vue'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'
import Modal from './Modal.vue'

// Access the store
const store = useUserStore()

// Destructure state/getters with storeToRefs to keep reactivity
const { sortedUsers, loading, error, userCount } = storeToRefs(store)

// Actions can be destructured directly
const { fetchUsers, removeUser } = store

// --- Search & Filter Logic ---
const searchQuery = ref('')
const showFilterModal = ref(false)

const advancedFilters = reactive({
  name: '',
  email: '',
  company: ''
})

const hasActiveFilters = computed(() => {
  return !!(advancedFilters.name || advancedFilters.email || advancedFilters.company)
})

const resetFilters = () => {
  advancedFilters.name = ''
  advancedFilters.email = ''
  advancedFilters.company = ''
  searchQuery.value = ''
}

const filteredUsers = computed(() => {
  let users = sortedUsers.value || []

  // 1. Advanced Filters (Priority)
  if (hasActiveFilters.value) {
    users = users.filter(user => {
      if (!user) return false
      const userName = (user.name || '').toLowerCase()
      const userEmail = (user.email || '').toLowerCase()
      const userCompany = (user.company || '').toLowerCase()

      const filterName = (advancedFilters.name || '').toLowerCase()
      const filterEmail = (advancedFilters.email || '').toLowerCase()
      const filterCompany = (advancedFilters.company || '').toLowerCase()

      const matchName = !filterName || userName.includes(filterName)
      const matchEmail = !filterEmail || userEmail.includes(filterEmail)
      const matchCompany = !filterCompany || userCompany.includes(filterCompany)

      return matchName && matchEmail && matchCompany
    })
  }
  // 2. Global Search
  else if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    users = users.filter(user => {
      if (!user) return false
      const userName = (user.name || '').toLowerCase()
      const userEmail = (user.email || '').toLowerCase()
      const userCompany = (user.company || '').toLowerCase()

      return userName.includes(query) ||
        userEmail.includes(query) ||
        userCompany.includes(query)
    })
  }

  return users
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
      <div class="title-group">
        <h2>User List ({{ userCount }})</h2>
        <span v-if="hasActiveFilters" class="filter-badge">Active Filters</span>
      </div>
      <button @click="fetchUsers" :disabled="loading">
        {{ loading ? 'Loading...' : 'Refresh Data' }}
      </button>
    </div>

    <!-- Search Bar & Filter Button -->
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search users..." class="search-input" :disabled="hasActiveFilters"
        :title="hasActiveFilters ? 'Clear advanced filters to use quick search' : ''" />
      <button class="filter-btn" @click="showFilterModal = true">
        Advanced Filter
      </button>
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
      No users match your criteria.
    </div>

    <!-- Advanced Filter Modal -->
    <Modal :isOpen="showFilterModal" title="Advanced Filters" @close="showFilterModal = false">
      <div class="filter-form">
        <div class="form-group">
          <label>Name matches:</label>
          <input v-model="advancedFilters.name" placeholder="e.g. Leanne" />
        </div>
        <div class="form-group">
          <label>Email matches:</label>
          <input v-model="advancedFilters.email" placeholder="e.g. @april.biz" />
        </div>
        <div class="form-group">
          <label>Company matches:</label>
          <input v-model="advancedFilters.company" placeholder="e.g. Romaguera" />
        </div>
      </div>

      <template #footer>
        <button class="secondary" @click="resetFilters">Clear Filters</button>
        <button @click="showFilterModal = false">Done</button>
      </template>
    </Modal>
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
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 0.95rem;
}

.search-input:focus {
  outline: 2px solid var(--color-primary);
  border-color: transparent;
}

.search-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.filter-btn {
  background: var(--color-secondary);
  color: white;
  white-space: nowrap;
}

.filter-btn:hover {
  background: #2c3e50;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-badge {
  background: var(--color-accent);
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
}

.no-results {
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-style: italic;
}

/* Modal Form Styles */
.filter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-form label {
  font-weight: 500;
  color: var(--color-secondary);
  margin-bottom: 0.2rem;
  display: block;
}

.filter-form input {
  width: 100%;
  box-sizing: border-box;
}

button.secondary {
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
}

button.secondary:hover {
  background: #f5f5f5;
}
</style>
