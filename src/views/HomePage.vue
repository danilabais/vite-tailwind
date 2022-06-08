<template>
  <section class="ex select-none">
    <h1 class="ex__title">Crypto Exchange</h1>
    <h3 class="ex__subtitle">Exchange fast and easy</h3>
    <div class="ex__input-wrap">
      <inputCurrency
        :propValue="minAm"
        :choosedCurr="choosedCurr1"
        @changeCurr="changeCurr('choosedCurr1', $event)"
        class="ex__select"
      />
      <SwapIcon @click="swap" class="ex__swap" />
      <inputCurrency
        :propValue="est"
        :propForState="minAm"
        :choosedCurr="choosedCurr2"
        @changeCurr="changeCurr('choosedCurr2', $event)"
        class="ex__select"
      />
    </div>
    <h4 class="mb-2">Your Etheruem Address</h4>
    <div class="ex__address">
      <input
        class="
          rounded-md
          flex-1
          mr-0
          md:mr-8
          bg-slate-100
          border border-gray-300
          placeholder:text-gray-400
          focus:border-gray-300 focus:ring-0
          placeholder:pr-10
        "
        type="text"
      />
      <div @click="submit" class="ex__address-btn">
        <span class="font-medium">exchange</span>
        <span :class="{ 'opacity-0': !error }" class="ex__address-error"
          >This pair is disabled now</span
        >
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import inputCurrency from "@/components/inputCurrency.vue";
import SwapIcon from "@/components/icons/SwapIcon.vue";

export default {
  data() {
    return {
      choosedCurr1: {},
      choosedCurr2: {},
      minAm: "",
      est: "",
      error: false,
      api: "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd",
    };
  },
  methods: {
    swap() {
      [this.choosedCurr1, this.choosedCurr2] = [
        this.choosedCurr2,
        this.choosedCurr1,
      ];
      this.fetchMinAmount();
      this.fetchEst();
    },
    async changeCurr(type, value) {
      this[type] = value;
      if (
        Object.keys(this.choosedCurr1).length &&
        Object.keys(this.choosedCurr2).length
      ) {
        await this.fetchMinAmount();
        this.fetchEst();
      }
    },
    async fetchMinAmount() {
      try {
        this.minAm = (
          await axios.get(
            `https://api.changenow.io/v1/min-amount/${this.choosedCurr1.ticker}_${this.choosedCurr2.ticker}?api-key=${this.api}`
          )
        ).data.minAmount;
      } catch (error) {
        console.log(eror);
      }
    },
    async fetchEst() {
      try {
        this.est = (
          await axios.get(
            `https://api.changenow.io/v1/exchange-amount/${this.minAm}/${this.choosedCurr1.ticker}_${this.choosedCurr2.ticker}?api_key=${this.api}`
          )
        ).data.estimatedAmount;
      } catch (error) {
        console.log(error);
      }
    },
    submit() {
      this.error = false;
      const timeOutTime = 4000;
      if (this.est === "" || this.minAm === "") {
        alert("Валюты не выбораны");
      } else if (this.est === null || this.minAm === null) {
        this.error = true;
        setTimeout(() => (this.error = false), timeOutTime);
      } else alert("success");
    },
  },

  components: {
    inputCurrency,
    SwapIcon,
  },
};
</script>