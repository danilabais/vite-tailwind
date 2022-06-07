<template>
<div class="relative cursor-pointer w-full modalFix">
  <input @focus="setActive" v-model="sortCurr"  :placeholder="(typeof propValue == 'number')?propValue:'Search'" :class="{'rounded-b-md': !isActive, 'placeholder:line-through placeholder:text-red-400':propValue-propForState<0, 'placeholder:text-black':propValue}" class="rounded-t-md  l-4 focus:placeholder:opacity-0 placeholder:transition-opacity bg-slate-100 border  border-gray-300 placeholder:text-gray-400 focus:border-gray-300 min-w-full  focus:ring-0 placeholder:pr-10"   type="text">
  <div class="absolute top-2 right-0 flex items-center flex-row pointer-events-none">
    <img class="border-l pl-10 border-gray-200 w-auto mr-4" :class="{'opacity-0': isActive}" :src="choosedCurr.image" alt="">
    <span class="mt-1 mr-8  w-10 overflow-hidden" :class="{'opacity-0': isActive}" >{{choosedCurr.ticker?choosedCurr.ticker.toUpperCase():'' || '&nbsp;'}}</span>
    <ArrowIcon v-if="!isActive" class="mr-3 transition-all"/>
    <CloseIcon v-else class="mr-3 transition-all"/>
  </div>
  <ul class="absolute w-full rounded-b-md bg-slate-100 transition-opacity z-40 max-h-36 overflow-y-scroll"  :class="{'opacity-0 hidden':!isActive}">
    <li @click="chooseCurr(item)" class="flex flex-row items-center pl-4 pt-3 pb-3 hover:bg-slate-200" v-for="item in filterCur" :key="item.name">
      <img class="mr-3 w-4" :src="item.image" :alt="item.ticker">
      <span class="mr-4">{{item.ticker.toUpperCase()}}</span>
      <span>{{item.name}}</span>
    </li>
  </ul>
</div>
</template>
<script>
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
           isActive: false,
           sortCurr: '',
        }
    },
    props: {
      choosedCurr: Object,
      propValue: Number,
      propForState: Number,
    },
    components: {
        ArrowIcon,CloseIcon
    },
    methods: {
      chooseCurr(e){
        this.$emit('changeCurr',e)
        this.isActive = false
        this.sortCurr = ''
        window.removeEventListener('click',this.clickHandler)

      },
      clickHandler(e) {
        if (!this.$el.contains(e.target)) {
          this.isActive=false
          window.removeEventListener('click',this.clickHandler)
          this.sortCurr = ''
        }
      },
      setActive() {
        window.addEventListener('click',this.clickHandler)
        this.isActive = true
      }
    },

    computed: {
        ...mapGetters(['curr']),
        filterCur() {
          return (!this.sortCurr?this.curr:this.curr.filter((el)=>el.name.toLowerCase().includes(this.sortCurr.toLowerCase())))
        }
    }
    
   
  
}
</script>
