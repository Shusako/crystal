<script lang="ts">
  import Popover from './Popover.svelte';
  import SearchResult from './SearchResult.svelte';

  let popoverAnchor: Element;
  let popoverVisible = false;
  let searchTerms = '';

  function result(item: Number) {
    alert('test' + item.toString());
  }
</script>

<div on:mouseenter={() => (popoverVisible = true)} on:mouseleave={() => (popoverVisible = false)}>
  <input
    bind:this={popoverAnchor}
    bind:value={searchTerms}
    class="w-96"
    type="text"
    placeholder="Curious about something?"
  />
  <Popover anchor={popoverAnchor} visible={popoverVisible}>
    <div class="divide-y divide-primary-lighter overflow-x-hidden max-h-[50vh]">
      <SearchResult title="Title" description="Description goes here" on:click={() => result(1)} />
      <SearchResult title="Title" description="Description goes here" on:click={() => result(2)} />
      <SearchResult title="Title" description="Description goes here" on:click={() => result(3)} />
    </div>
  </Popover>
</div>

<style></style>
