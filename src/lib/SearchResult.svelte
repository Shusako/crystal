<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="px-3 py-2 hover:bg-primary-light" on:click>
  <p class="font-semibold">{title}</p>
  <p class="text-subtle">{description}</p>
</div>
