<template>
  <div v-if="props.visibility" class="alert" :class="alertType">
    {{ message }}
  </div>
</template>
<script setup>
const props = defineProps({
  message: String,
  visibility: Boolean,
  alertType: String,
});
</script>

<style>
.alert {
  position: absolute;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;

  color: #ffffff;
  top: 0px;
  right: 0px;
}
.alertSuccess {
  background-color: rgb(16, 221, 16);
}
.alertDelete {
  background-color: red;
}
</style>
