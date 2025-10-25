<template>
  <div>
    <UAlert
      v-if="alert"
      :title="alert.title"
      :description="alert.description"
      :color="alert.color ?? 'neutral'"
      variant="solid"
      :actions="alert.actions?.map((a: { label: any; color: any; variant: any; onClick: () => void; }) => ({
        label: a.label,
        color: a.color ?? 'neutral',
        variant: a.variant ?? 'solid',
        onClick: () => {
          a.onClick?.();
          hideAlert();
        }
      }))"
      class="fixed top-5 left-1/2 -translate-x-1/2 w-96 z-50"
    />
  </div>
</template>

<script setup lang="ts">
import { currentAlert } from "~/composables/useAlerts";
import { watch } from "vue";

const alert = currentAlert;
let timeoutId: NodeJS.Timeout | null = null;

const hideAlert = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  currentAlert.value = null;
};

watch(currentAlert, (newAlert) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  if (newAlert && (!newAlert.actions || newAlert.actions.length === 0)) {
    timeoutId = setTimeout(() => {
      hideAlert();
    }, 3000);
  }
});
</script>
