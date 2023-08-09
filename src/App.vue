<script setup lang="ts">
import { z } from "zod";
import { ref, watch } from "vue";
import { useMediaQuery } from "@vueuse/core";
import ListItem from "./components/ListItem.vue";
import Button from "./components/Button.vue";
import Modal from "./components/Modal.vue";

// VueUse, changing image src after a 640px
const isMobile = useMediaQuery("(min-width: 640px)");

// Zod, validation schema for email input
const Email = z
  .string()
  .email("Valid email required")
  .min(1, { message: "Cant be empty" });

// Ref's
const email = ref("");
const emailErrorMessage = ref("");
const showModal = ref(false);

// When clicked on the "subscribe to monthly" check validity email
function subscribe() {
  const result = Email.safeParse(email.value);
  if (!result.success) {
    emailErrorMessage.value = result.error.errors[0].message;
    return;
  } else {
    email.value = result.data;
    showModal.value = true;
    console.log(result.data);
  }
}

// Reset values when click on dismiss button
function dismiss() {
  showModal.value = false;
  email.value = "";
}

// After first 'subscribe', watch email input on every keystroke
watch(email, () => {
  if (!emailErrorMessage.value) {
    return;
  } else {
    const result = Email.safeParse(email.value);
    if (!result.success) {
      emailErrorMessage.value = result.error.errors[0].message;
    } else {
      emailErrorMessage.value = "";
    }
  }
});
</script>

<template>
  <div
    class="grid min-h-[100dvh] w-full grid-rows-[auto_1fr] place-items-center bg-project-500 text-project-200 sm:h-[641px] sm:min-h-0 sm:max-w-[928px] sm:grid-cols-2 sm:grid-rows-1 sm:rounded-3xl sm:p-8"
  >
    <div class="order-2 flex h-fit w-full flex-col gap-8 p-4 sm:order-1 sm:p-8">
      <h1 class="text-5xl font-bold text-project-200">Stay Updated!</h1>
      <p>Join 60,000+ product managers receiving monthly updates on:</p>
      <ul class="flex flex-col justify-center gap-2">
        <ListItem> Product discovery and building what matters </ListItem>
        <ListItem>Measuring to ensure updates are a success</ListItem>
        <ListItem>And much more!</ListItem>
      </ul>
      <form @submit.prevent="subscribe">
        <label class="mb-2 flex text-sm font-semibold" for="email">
          <p class="flex-1">Email address</p>
          <p v-if="emailErrorMessage" class="text-project-100">
            {{ emailErrorMessage }}
          </p>
        </label>
        <input
          v-model="email"
          :class="`block w-full rounded-md border p-4 ${
            emailErrorMessage
              ? 'border-project-100 bg-project-100 bg-opacity-20 text-project-100  focus-visible:outline-none '
              : ''
          }`"
          type="text"
          name="email"
          id="email"
          placeholder="email@company.com"
        />
        <Button class="w-full" type="submit">
          Subscribe to monthly newsletter
        </Button>
      </form>
    </div>
    <div class="order-1 w-full sm:order-2 sm:h-full sm:place-self-center">
      <img
        class="h-full w-full object-cover object-right sm:rounded-3xl"
        :src="
          isMobile
            ? './src/assets/illustration-sign-up-desktop.svg'
            : './src/assets/illustration-sign-up-mobile.svg'
        "
        alt="Picture"
      />
    </div>
  </div>
  <Modal
    v-if="showModal"
    @closeModal="dismiss"
    :showModal="showModal"
    :email="email"
  />
</template>
