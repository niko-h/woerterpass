import { writable } from 'svelte/store';

export const modul = writable(0);
export const level = writable("-");
export const showModal = writable(false);
export const showStats = writable(false);
export const showLaengeHilfe = writable(false);
export const stats = writable([]);
export const wortScore = writable(0);
export const wortProgress = writable(0);
