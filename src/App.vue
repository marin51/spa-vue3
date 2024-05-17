<script setup lang="ts">
    import HomePage from '@/ui/views/home/HomePageView.vue';
</script>

<template>
    <div class="app">
        <home-page :msg="$t('global.greeting')" />
    </div>
</template>

<style scoped></style>
