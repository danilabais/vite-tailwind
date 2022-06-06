<template>
<div class="relative cursor-pointer w-full">
  <input @focus="isActive = true" @blur="isActive = false" :class="{'rounded-b-md': !isActive}" class="rounded-t-md l-4 focus:placeholder:opacity-0 placeholder:transition-opacity bg-slate-100 border  border-gray-300 placeholder:text-gray-400 focus:border-gray-300 min-w-full  focus:ring-0 placeholder:pr-10" placeholder="Search"  type="text">
  <div class="absolute top-2 right-0 flex items-center flrx-row pointer-events-none">
    <img class="border-l pl-10 border-gray-200 w-auto mr-4" :class="{'opacity-0': isActive}" :src="choosedCurr.image" alt="">
    <span class=" mt-1 mr-8  w-7" :class="{'opacity-0': isActive}" >{{choosedCurr.ticker?choosedCurr.ticker.toUpperCase():'' || '&nbsp;'}}</span>
    <ArrowIcon :class="{'rotate-180': isActive}" class="mr-3 transition-all"/>
  </div>
  <ul class="absolute w-full rounded-b-md bg-slate-100 transition-opacity z-40" :class="{'opacity-0 pointer-events-none': !isActive}">
  
    <li @click="chooseCurr(item)" class="flex flex-row items-center pl-4 pt-3 pb-3 hover:bg-slate-200" v-for="item in filterCur" :key="item.name">
      <img class="mr-3" :src="item.image" :alt="item.ticker">
      <span class="mr-4">{{item.ticker.toUpperCase()}}</span>
      <span>{{item.name}}</span>
    </li>

  </ul>
</div>
</template>

<script>
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
           isActive: false,
           choosedCurr: ''
        }
    },
    components: {
        ArrowIcon
    },
    methods: {
      chooseCurr(e){
          this.choosedCurr = e
      }
    },
    computed: {
        ...mapGetters(['curr']),
        filterCur() {
          return this.curr.slice(0, 3)
        }
    }
    
   
  
}
</script>
