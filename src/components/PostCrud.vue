<script setup>
import { ref, onMounted, watch } from 'vue'

// --- STATE ---
const posts = ref([])
const loading = ref(false)
const selectedPostId = ref(null)
const selectedPost = ref(null)
const isEditing = ref(false)
const notification = ref('')
const postLimit = ref(5) // New state for fetch limit

// Form State
const formData = ref({ title: '', body: '' })

// --- API HELPERS ---
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

// 1. GET (List) - Equivalent to fetching in useEffect(() => {}, [])
const fetchPosts = async () => {
    loading.value = true
    try {
        const res = await fetch(`${BASE_URL}?_limit=${postLimit.value}`)
        posts.value = await res.json()
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

// 2. GET (Details) - Fetches when ID changes
const fetchPostDetails = async (id) => {
    if (!id) {
        selectedPost.value = null
        return
    }
    loading.value = true
    try {
        const res = await fetch(`${BASE_URL}/${id}`)
        selectedPost.value = await res.json()
        // Pre-fill form if editing
        if (isEditing.value) {
            formData.value = { title: selectedPost.value.title, body: selectedPost.value.body }
        }
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

// 3. POST (Create)
const createPost = async () => {
    loading.value = true
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify({ ...formData.value, userId: 1 }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        const newPost = await res.json()
        // Fake update local list
        posts.value.unshift(newPost)
        showNotify('Post Created Successfully (Fake)')
        resetForm()
    } finally {
        loading.value = false
    }
}

// 4. PUT (Update)
const updatePost = async () => {
    if (!selectedPostId.value) return
    loading.value = true
    try {
        const res = await fetch(`${BASE_URL}/${selectedPostId.value}`, {
            method: 'PUT',
            body: JSON.stringify({ ...formData.value, userId: 1, id: selectedPostId.value }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        const updated = await res.json()

        // Update local list
        const index = posts.value.findIndex(p => p.id === selectedPostId.value)
        if (index !== -1) posts.value[index] = updated

        // Update selected view
        selectedPost.value = updated
        showNotify('Post Updated Successfully (Fake)')
        isEditing.value = false
    } finally {
        loading.value = false
    }
}

// 5. DELETE
const deletePost = async (id) => {
    if (!confirm('Are you sure?')) return
    loading.value = true
    try {
        await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
        posts.value = posts.value.filter(p => p.id !== id)
        if (selectedPostId.value === id) {
            selectedPostId.value = null
        }
        showNotify('Post Deleted Successfully (Fake)')
    } finally {
        loading.value = false
    }
}

// --- LIFECYCLE DEMOS ---

// A. onMounted -> Equivalent to React useEffect(() => { ... }, [])
// Runs once when component is mounted to DOM
onMounted(() => {
    console.log('Component Mounted - Fetching initial list')
    fetchPosts()
})

// B. watch -> Equivalent to React useEffect(() => { ... }, [selectedPostId])
// Runs whenever 'selectedPostId' changes
watch(selectedPostId, (newId, oldId) => {
    console.log(`Watcher: ID changed from ${oldId} to ${newId}`)
    fetchPostDetails(newId)
})

// C. Watch Limit Change
watch(postLimit, () => {
    console.log('Limit changed, refetching...')
    fetchPosts()
})

// --- UTILS ---
const selectPost = (id) => {
    selectedPostId.value = id
    isEditing.value = false
}

const startEdit = () => {
    isEditing.value = true
    formData.value = { title: selectedPost.value.title, body: selectedPost.value.body }
}

const cancelEdit = () => {
    isEditing.value = false
}

const resetForm = () => {
    formData.value = { title: '', body: '' }
    isEditing.value = false
    selectedPostId.value = null
}

const showNotify = (msg) => {
    notification.value = msg
    setTimeout(() => notification.value = '', 3000)
}
</script>

<template>
    <div class="crud-container">
        <!-- Notification Toast -->
        <div v-if="notification" class="toast">{{ notification }}</div>

        <div class="sidebar">
            <div class="header-row">
                <div class="title-group">
                    <h3>Posts</h3>
                    <select v-model="postLimit" class="limit-select">
                        <option :value="5">5 items</option>
                        <option :value="10">10 items</option>
                        <option :value="20">20 items</option>
                        <option :value="50">50 items</option>
                    </select>
                </div>
                <button class="sm" @click="resetForm">+ New</button>
            </div>

            <div v-if="loading && !posts.length">Loading list...</div>

            <ul class="post-list">
                <li v-for="post in posts" :key="post.id" :class="{ active: post.id === selectedPostId }"
                    @click="selectPost(post.id)">
                    <span class="post-title">{{ post.title }}</span>
                    <button class="delete-icon" @click.stop="deletePost(post.id)">&times;</button>
                </li>
            </ul>
        </div>

        <div class="main-content">
            <!-- CREATE / EDIT FORM -->
            <div v-if="!selectedPostId || isEditing" class="form-panel">
                <h2>{{ isEditing ? 'Edit Post' : 'Create New Post' }}</h2>
                <form @submit.prevent="isEditing ? updatePost() : createPost()">
                    <div class="form-group">
                        <label>Title</label>
                        <input v-model="formData.title" required />
                    </div>
                    <div class="form-group">
                        <label>Body</label>
                        <textarea v-model="formData.body" required rows="4"></textarea>
                    </div>
                    <div class="actions">
                        <button type="submit" :disabled="loading">
                            {{ loading ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
                        </button>
                        <button type="button" class="secondary" @click="isEditing ? cancelEdit() : resetForm()">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <!-- READ DETAILS -->
            <div v-if="selectedPostId && !isEditing" class="details-panel">
                <div v-if="loading">Loading details...</div>
                <div v-else-if="selectedPost">
                    <h2>{{ selectedPost.title }}</h2>
                    <p class="body-text">{{ selectedPost.body }}</p>
                    <p class="meta">ID: {{ selectedPost.id }} | UserID: {{ selectedPost.userId }}</p>

                    <div class="actions">
                        <button @click="startEdit">Edit Post</button>
                    </div>

                    <div class="lifecycle-note">
                        <h4>Lifecycle Concept:</h4>
                        <p>The details above were fetched because a <code>watch(selectedPostId)</code> detected the ID
                            change.</p>
                        <p>This is cleaner than putting the fetch inside the click handler, as it separates UI logic
                            from Side Effects.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.crud-container {
    display: flex;
    height: 600px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
    background: white;
}

.sidebar {
    width: 300px;
    border-right: 1px solid var(--color-border);
    overflow-y: auto;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
}

.header-row {
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-row h3 {
    margin: 0;
}

.post-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.post-list li {
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s;
}

.post-list li:hover {
    background: #eef2f6;
}

.post-list li.active {
    background: #e0f2f1;
    border-left: 4px solid var(--color-primary);
}

.post-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 220px;
    font-size: 0.9rem;
}

.delete-icon {
    background: none;
    border: none;
    color: #ef4444;
    font-size: 1.2rem;
    padding: 0 0.5rem;
}

.delete-icon:hover {
    background: #fee2e2;
    border-radius: 4px;
}

.main-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    position: relative;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--color-secondary);
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    box-sizing: border-box;
    font-family: inherit;
}

.actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.secondary {
    background: transparent;
    border: 1px solid var(--color-border);
    color: #666;
}

.lifecycle-note {
    margin-top: 3rem;
    padding: 1rem;
    background: #fff3cd;
    border: 1px solid #ffeeba;
    border-radius: 6px;
    color: #856404;
}

.lifecycle-note h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
}

.toast {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #333;
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    animation: slideIn 0.3s ease-out;
    z-index: 100;
}

@keyframes slideIn {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.title-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.limit-select {
    padding: 2px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 0.8rem;
    color: #444;
}
</style>
