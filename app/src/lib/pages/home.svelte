<style>
    h1 {
        color: red;
    }

    .special {
        color: blue;
    }
</style>

<script>
    import Nav from "../components/nav.svelte";

    export let name = "world";

    const makeAName = () => "WJPPPP";
</script>

<Nav color="blue"/>

<h1>Hello {name}!</h1>
<h1 class="special">Hello {name}!</h1>

<button on:click={makeAName}>Click</button>