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
      <div class="flex">
        <div
          class="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden"
        >
          <img src="https://avatars0.githubusercontent.com/u/38799309?v=4" alt="profilepic" />
        </div>
        <span class="pt-1 ml-2 font-bold text-sm">{post.post_author}</span>
      </div>
      <span class="px-2 hover:bg-gray-300 cursor-pointer rounded"
        ><i class="fas fa-ellipsis-h pt-2 text-lg" /></span
      >
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
      <div class="pt-1">
        <div class="mb-2 text-sm">
          <span class="font-medium mr-2">sandilukez</span>
          {post.description}
        </div>
      </div>
      <div class="text-sm mb-2 text-gray-400 cursor-pointer font-medium">View all 14 comments</div>
      <div class="mb-2">
        <div class="mb-2 text-sm">
          <span class="font-medium mr-2">razzle_dazzle</span>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .main-container-post {
    margin-left: 180px;
  }
</style>
