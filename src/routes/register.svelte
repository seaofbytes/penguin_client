<script>
  // Imports
  import * as yup from "yup";
  import { createForm } from "svelte-forms-lib";
  import { registerUser } from "../helpers/userHelpers";
  import { getNotificationsContext } from "svelte-notifications";

  // Notifications
  const { addNotification } = getNotificationsContext();

  // Yup Register Form
  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().min(3, "Must be min 3 characters").required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(6, "Password must be min 6 characters"),
      password_confirmation: yup.string().min(6, "Password must be min 6 characters").required(),
    }),
    onSubmit: (values) => {
      const user = registerUser(values);
      if (user) {
        addNotification({
          text: "Sign up successful.",
          position: "top-center",
          type: "success",
          removeAfter: 2000,
        });
      }
    },
  });
</script>

<main>
  <div class="bg-grey-lighter flex flex-col main-container">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up</h1>
        <input
          bind:value={$form.username}
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="fullname"
          placeholder="Username"
        />
        {#if $errors.username}
          <small class="uppercase">{$errors.email}</small>
        {/if}

        <input
          on:change={handleChange}
          bind:value={$form.email}
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="email"
          placeholder="Email"
        />
        {#if $errors.email}
          <small class="uppercase">{$errors.email}</small>
        {/if}

        <input
          on:change={handleChange}
          bind:value={$form.password}
          type="password"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          placeholder="Password"
        />
        {#if $errors.password}
          <small class="uppercase">{$errors.password}</small>
        {/if}
        <input
          on:change={handleChange}
          bind:value={$form.password_confirmation}
          type="password"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="password_confirmation"
          placeholder="Confirm Password"
        />
        {#if $errors.password_confirmation}
          <small class="uppercase">{$errors.password_confirmation}</small>
        {/if}

        <button
          on:click={handleSubmit}
          class="ml-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
          type="button"
        >
          Create Account
        </button>

        <div class="btn text-center text-sm text-grey-dark mt-4">
          By signing up, you agree to the
          <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
            Terms of Service
          </a>
          and
          <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
            Privacy Policy
          </a>
        </div>
      </div>

      <!-- <div class="text-grey-dark mt-6">
				Already have an account?
				<p on:click={x} class="no-underline border-b border-blue text-blue">Log in</p>
				.
			</div> -->
    </div>
  </div>
</main>

<style>
  .main-container {
    margin-top: 150px;
  }

  .btn {
    margin-top: 35px;
    margin-bottom: 25px;
  }
</style>
