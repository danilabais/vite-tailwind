<template>
  <main class="sm:container sm:mx-auto px-4 h-screen flex items-center">
    <router-view class="flex-1"/>
  </main>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('fetchCurrencies')
  }
}
</script>