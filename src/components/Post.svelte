<script>
  // Props
  export let post;

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("/");
  }
</script>

<main>
  <div
    class="rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0 main-container-post"
  >
    <div class="w-full flex justify-between p-3">
      <!-- user avatar -->
      <div class="flex">
        <div
          class="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden"
        >
          <img src="https://avatars0.githubusercontent.com/u/38799309?v=4" alt="profilepic" />
        </div>
        <span class="pt-1 ml-2 font-bold text-sm">{post.post_author}</span>
      </div>
      <!-- post options button -->
      <div class="relative inline-flex">
        <svg
          class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
          ><path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299"
            fill-rule="nonzero"
          /></svg
        >
        <!-- This example requires Tailwind CSS v2.0+ -->
        <div style="width: 30px" class="relative inline-block text-left">
          <div>
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              ...
              <!-- Heroicon name: solid/chevron-down -->
              <svg
                class="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
              <a
                href="/profile"
                class="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0">Edit post</a
              >
              <a
                href="/profile"
                class="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0">Remove post</a
              >
            </div>
          </div>
        </div>
        <!-- dropdown end -->
      </div>
    </div>
    <img class="w-full bg-cover" src={post.image_url} alt="img" />
    <div class="px-3 pb-2">
      <div class="pt-2">
        <!-- hearth like button -->
        <button
          style="background: red"
          class="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-red-600 rounded-full focus:shadow-outline hover:bg-indigo-800"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"
            ><path
              color="white"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            /></svg
          >
        </button>

        <span class="text-sm text-gray-400 font-medium mb-5">12 likes</span>
        <span class="text-sm text-black-400 font-medium float-right mt-3"
          >{formatDate(post.created_at)}</span
        >
      </div>
      <!-- post info -->
      <div class="pt-1">
        <div class="mb-2 text-sm">
          <span class="font-medium mr-2">{post.post_author}</span>
          {post.description}
        </div>
      </div>

      <!-- comments -->
      <div class="text-sm mb-2 text-gray-400 cursor-pointer font-medium">View all 14 comments</div>
      <div class="mb-2">
        <div class="mb-2 text-sm">
          <span class="font-medium mr-2">razzle_dazzle</span>
        </div>
      </div>
    </div>

    <!-- hashtags -->
    <div class="px-6 pt-4 pb-2">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#photography</span
      >
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#travel</span
      >
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#winter</span
      >
    </div>
  </div>
</main>

<style>
  .main-container-post {
    margin-left: 180px;
  }

  select {
    appearance: none;
  }
</style>
