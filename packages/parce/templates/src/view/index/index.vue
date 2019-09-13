<template>
    <div>
        <h1>hello, {{ msg }}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'world'
        };
    }
};
</script>

<style scoped>
h1 {
    font-size: 20px;
}
</style>
