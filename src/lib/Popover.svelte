<script lang="ts">
  //export let anchor: Element;
  export let visible: Boolean;

  function click(event: MouseEvent) {
    alert('test');
    event.preventDefault();
    event.stopPropagation();
  }
</script>

{#if visible}
  <div class="popover" on:click>
    <slot />
  </div>
{/if}

<style>
  .popover {
    position: absolute;
    margin: 0;
    padding: 0;
    border-color: var(--color-highlight-default);
    z-index: 999;
  }
</style>
