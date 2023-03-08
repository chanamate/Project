<template>
    <register/>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import register from '../components/register.vue';
  
  export default defineComponent({
    name: 'register1',
  
    components: {
      register,
    },
  });
  </script>
  