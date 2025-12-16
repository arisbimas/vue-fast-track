import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
    // State
    const users = ref([])
    const loading = ref(false)
    const error = ref(null)

    // Getters (Computed)
    const userCount = computed(() => users.value.length)
    const sortedUsers = computed(() => [...users.value].sort((a, b) => a.name.localeCompare(b.name)))

    // Actions
    const fetchUsers = async () => {
        loading.value = true
        error.value = null
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            if (!response.ok) throw new Error('Failed to fetch')
            const data = await response.json()
            // Transform data if needed
            users.value = data.map(u => ({
                id: u.id,
                name: u.name,
                email: u.email,
                company: u.company.name
            }))
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    const addUser = (userData) => {
        // Optimistic update
        const newUser = {
            id: Date.now(),
            ...userData
        }
        users.value.push(newUser)
    }

    const removeUser = (id) => {
        users.value = users.value.filter(u => u.id !== id)
    }

    return {
        users,
        loading,
        error,
        userCount,
        sortedUsers,
        fetchUsers,
        addUser,
        removeUser
    }
})
