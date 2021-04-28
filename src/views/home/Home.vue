<template>
    <div id="home">

        <express/>
        <Register/>

    </div>




</template>

<script>

    import Express from "components/common/express/Express";
    import Register from "components/common/register/Register";


    export default {
        name: "Home",
        components: {
            Express,
            Register,
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped>

</style>