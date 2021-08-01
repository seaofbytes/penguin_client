import { writable } from "svelte/store";

export let UserStore = writable({ user: {} });

// Set the stored value or a sane default.
export const Token = writable("" || "/");
