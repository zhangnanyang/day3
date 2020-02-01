<template>
    <div class="home">
        <ul>
            <li v-for="item in list" :key="item.id">{{ item.name }}{{ item.age }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
        };
    },
};
</script>
