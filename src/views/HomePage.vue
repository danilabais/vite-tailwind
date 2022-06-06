<template>
  <section class="ex">
    <h1 class="ex__title">
      Crypto Exchange
    </h1>
    <span class="ex__subtitle">
      Exchange fast and easy
    </span>
    <div class="ex__input-wrap flex items-center flex-col md:flex-row">
      <inputCurrency class="ex__select"/>
      <SwapIcon class="ex-img cursor-pointer md:mx-7 ml-auto md:my-0 my-3 md:rotate-0 rotate-90"/>
      <inputCurrency class="ex__select"/>
    </div>
    
  </section>
</template>

<script>
import inputCurrency from "@/components/inputCurrency.vue";
import SwapIcon from "@/components/icons/SwapIcon.vue";
export default {
  components: {
    inputCurrency,SwapIcon
  },
  
}
</script>