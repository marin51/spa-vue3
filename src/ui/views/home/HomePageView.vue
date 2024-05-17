<template>
    <h1>car-me.info</h1>

    <div class="main-container">
        <div class="left-side">
            <user-element></user-element>
            <edit-car-component
                v-if="carToUpdate"
                :car="carToUpdate"
                @update:car="handleChange"
            ></edit-car-component>
        </div>
        <div class="right-side">
            <h2>These are your cars:</h2>
            <div class="car-list">
                <car-list-component :cars="cars" @edit="handleEdit"></car-list-component>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { CarService } from '@/primary/car/CarService';
    import { UserService } from '@/primary/user/UserService';
    import { carStore } from '@/secondary/car/resources/CarStore';
    import { CarProperties } from '@/domain/car/types';
    // import { Timestamp } from 'firebase/firestore';
    import { ref, inject, onMounted, computed } from 'vue';
    import CarListComponent from '@/ui/components/CarListComponent.vue';
    import EditCarComponent from '@/ui/components/EditCarComponent.vue';
    import UserElement from '@/ui/views/home/elements/UserElement.vue';

    const userService = inject<UserService>('userService');
    const carService = inject<CarService>('carService');

    const loading = ref<boolean>(true);
    const username = ref<string>('');
    const cars = computed(() => carStore.getters.getCars());

    let carToUpdate = ref<CarProperties | null>(null);

    onMounted(async () => {
        const user = await userService?.getCurrentUser();
        await carService?.getCars();
        username.value = user?.name || '';
        loading.value = false;
    });

    defineProps<{ msg: string }>();

    function handleEdit(carId: string) {
        const car = cars.value.find((car) => car.id === carId);
        carToUpdate.value = car || null;
    }

    function handleChange(carToSave: CarProperties) {
        carService?.updateCar(carToSave, carToSave.id);
        carToUpdate.value = null;
    }
</script>

<style scoped>
    .main-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px;
    }
    .left-side {
        display: flex;
        flex-direction: column;
        min-width: 320px;
        gap: 32px;
    }
</style>
