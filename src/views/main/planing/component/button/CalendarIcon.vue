<template lang="">
  <div @click="$emit('click')">
    <svg
      class="datepicker-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="35px"
      height="35px"
    >
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v14c0 1.1 0.9 2 2 2h14c1.1 0 2-0.9 2-2V5c0-1.1-0.9-2-2-2zm0 16H5V8h14v11zm-7-9h-5v5h5V10zm2 0v5h5V10h-5z"/>
    </svg>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .datepicker-icon {
    cursor: pointer;
    fill: #7367f0 ;
    margin-right: 20px;
  }
</style>