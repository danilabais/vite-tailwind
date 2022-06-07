<template>
  <section class="ex select-none">
    <h1 class="ex__title">
      Crypto Exchange
    </h1>
    <span class="ex__subtitle">
      Exchange fast and easy
    </span>
    <div class="ex__input-wrap flex items-center flex-col md:flex-row">
      <inputCurrency :propValue="minAm"  :choosedCurr="choosedCurr1" @changeCurr="changeCurr('choosedCurr1',$event)" class="ex__select"/>
      <SwapIcon @click="swap" class="ex-img cursor-pointer md:mx-7 ml-auto md:my-0 my-3 md:rotate-0 rotate-90"/>
      <inputCurrency :propValue="est" :choosedCurr="choosedCurr2" @changeCurr="changeCurr('choosedCurr2',$event)" class="ex__select"/>
    </div>
    
  </section>
</template>

<script>
import axios from 'axios'
import inputCurrency from "@/components/inputCurrency.vue";
import SwapIcon from "@/components/icons/SwapIcon.vue";
export default {
  data() {
    return {
       choosedCurr1: {},
       choosedCurr2: {},
       minAm: null,
       est: null,
       apikey: 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd',
    }
  },
  methods: {
    swap(){
      [this.choosedCurr1,this.choosedCurr2]=[this.choosedCurr2,this.choosedCurr1]
      this.fetchMinAmount()
      this.fetchEst()
    },
    async changeCurr(type,value) {
      this[type] = value
      if (Object.keys(this.choosedCurr1).length && Object.keys(this.choosedCurr2).length) {
        await this.fetchMinAmount()
        this.fetchEst()
      }

    },
    async fetchMinAmount() {
       this.minAm = ((await axios.get(`https://api.changenow.io/v1/min-amount/${this.choosedCurr1.ticker}_${this.choosedCurr2.ticker}?api-key=${this.apikey}`))
       .data)
       .minAmount
    },
    async fetchEst() {
        this.est = ((await axios.get(`https://api.changenow.io/v1/exchange-amount/${this.minAm}/${this.choosedCurr1.ticker}_${this.choosedCurr2.ticker}?api_key=${this.apikey}`))
        .data)
        .estimatedAmount
    }
  },
  
  components: {
    inputCurrency,SwapIcon
  },
  
}
</script>