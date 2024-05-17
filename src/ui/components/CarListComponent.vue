<template>
    <div v-for="car in props.cars" :key="car.id">
        <h2>
            {{ car.make }}
            <edit-icon-component @click="emit('edit', car.id)"></edit-icon-component>
        </h2>

        <div v-if="car.serviceActions.length">
            <h4>repair list:</h4>
            <p v-for="serviceAction in car.serviceActions">
                {{ serviceAction.repair }}
            </p>
        </div>
        <p v-else>There are no reported service actions</p>
    </div>
</template>
<script setup lang="ts">
    import { CarProperties } from '@/domain/car/types';
    import { defineProps } from 'vue';
    import EditIconComponent from '@/ui/components/icons/EditIconComponent.vue';

    const props = defineProps<{
        cars: Array<CarProperties>;
    }>();

    const emit = defineEmits<{
        edit: [id: string]; // named tuple syntax
    }>();
</script>
<style></style>
