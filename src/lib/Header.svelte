<script lang="ts">
  import SearchBar from '$lib/SearchBar.svelte';

  export const user: {
    name: string;
    avatar: string;
  } = {
    name: 'Shusako',
    avatar:
      'https://cdn.discordapp.com/avatars/255466728308342804/b8303861409ea543ae49f2952ae540e8',
  };
</script>

<header class="flex justify-between h-12 bg-primary-dark">
  <a href="/" class="flex">
    <img src="/favicon.png" class="m-1 h-10" />
    <h1 class="m-1 font-bold text-3xl text-white">Crystal</h1>
  </a>

  <div class="self-center">
    <SearchBar />
  </div>

  <!-- <nav>
		<ul>
			<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.url.pathname === '/about'}>
				<a sveltekit:prefetch href="/about">About</a>
			</li>
			<li class:active={$page.url.pathname === '/todos'}>
				<a sveltekit:prefetch href="/todos">Todos</a>
			</li>
		</ul>
	</nav> -->

  {#if user}
    <div class="flex items-center justify-between">
      <span class="username">{user.name}</span>
      <img
        class="h-full m-1 rounded-2xl border-solid border-4 border-primary-dark self-start"
        alt="Users avatar"
        src={user.avatar}
      />
    </div>
  {/if}
  {#if !user}{/if}
</header>
