<template>
    <div class="user-element" v-if="user">
        <h2>
            {{ $t('global.greeting') }} {{ user.name }}
            <edit-icon-component @click="toggleForm"></edit-icon-component>
        </h2>

        <div v-if="showForm" class="edit-user-form">
            <div>
                <label for="user-name">Edit Name:</label>
                <input id="user-name" v-model="newUserName" />
            </div>

            <button @click="handleUpdate">Update</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { UserService } from '@/primary/user/UserService';
    import { inject, onMounted, ref } from 'vue';
    import EditIconComponent from '@/ui/components/icons/EditIconComponent.vue';
    import { UserProperties } from '@/domain/user/types';

    let user = ref<UserProperties | null>(null);
    let newUserName = ref<String>();
    let showForm = ref<Boolean>(false);
    const userService = inject<UserService>('userService');

    onMounted(async () => {
        const userRes = await userService?.getCurrentUser();
        user.value = userRes || null;
        newUserName.value = userRes?.name;
    });

    async function handleUpdate() {
        if (newUserName.value && user.value) {
            const updatedUser = { name: newUserName.value.toString() }; // Create an object with the correct type
            await userService?.updateUser(updatedUser, user.value.id); // Pass the object to the updateUser method
            user.value.name = newUserName.value.toString(); // Update the local user name to reflect the change
            toggleForm(); // Hide the form after update
        }
    }

    function toggleForm() {
        showForm.value = !showForm.value;
    }
</script>

<style>
    .edit-user-form {
        display: flex;
        gap: 8px;
        justify-content: flex-start;
        flex-direction: column;
    }

    .edit-user-form label {
        display: block;
        margin-bottom: 4px;
        font-weight: bold;
    }

    .edit-user-form input {
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px;
    }

    .edit-user-form button {
        cursor: pointer;
        align-self: flex-start;
    }
</style>
