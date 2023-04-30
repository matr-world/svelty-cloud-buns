<style>
    h1 {
        color: red;
    }
</style>

<script>
    import Nav from "../components/nav.svelte";

    export let name = "world";
</script>

<Nav color="blue"/>

<h1>Hello {name}!</h1>
