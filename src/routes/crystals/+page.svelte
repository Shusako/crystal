<script lang="ts">
  export let data: any;
</script>

{#each data.list as file}
  <a href="crystals/{file}">{file}</a>
{/each}
