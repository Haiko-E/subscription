<script setup lang="ts">
import type { OnClickOutsideHandler } from "@vueuse/core";
import Button from "./Button.vue";
import { OnClickOutside } from "@vueuse/components";

defineProps<{
  email: string;
  showModal: boolean;
}>();

defineEmits<{
  (e: "closeModal"): void;
}>();
</script>

<template>
  <div
    class="absolute inset-0 z-10 flex min-h-[100dvh] w-full items-center bg-project-300 text-project-200 sm:justify-center"
  >
    <OnClickOutside @trigger="$emit('closeModal')">
      <div
        class="absolute inset-0 flex items-center bg-white p-10 sm:static sm:w-[500px] sm:flex-col sm:rounded-xl"
      >
        <div class="grid auto-rows-min gap-14">
          <img src="/icon-success.svg" alt="success" />
          <h1 class="text-5xl font-bold">Thanks for subscribing!</h1>
          <p>
            A confirmation email has been sent to
            <span class="font-semibold">{{ email }}</span
            >. Please open it and click the button inside to confirm your
            subscription
          </p>
        </div>
        <Button
          @click="$emit('closeModal')"
          class="absolute bottom-5 left-5 right-5 sm:static sm:mt-14 sm:w-full"
          >Dismiss message</Button
        >
      </div>
    </OnClickOutside>
  </div>
</template>
