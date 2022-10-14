<script lang="ts">
  import MarkdownEditor from '$lib/MarkdownEditor.svelte';

  export let data: any;
</script>

<section class="p-2">
  <h1 class="font-bold text-3xl">{data.title}</h1>
  <!-- <div>
    {data.body}
  </div> -->
  <MarkdownEditor />
</section>
