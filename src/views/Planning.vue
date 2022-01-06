<template>
  <div>
    <div class="page-title">
      <h3>{{"MenuPlaning" | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">{{"from" | localize}} <router-link  to="/categories">{{"P_AddNewCat" | localize}}</router-link></p>
    <section v-else>
      <div v-for='cat in categories' :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency('RUB')}} {{"Iz" | localize}} {{cat.limit | currency('RUB')}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width:cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'planina',
  data: () => ({
    loading: true,
    categories: [],

  }),
  computed:{
    ...mapGetters(['info'])
  },
  async mounted(){
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    
    this.categories = categories.map(cat =>{
      const spend = records
        .filter( r => r.categoryId === cat.id)
        .filter( r => r.type === 'outcome')
        .reduce((total,record)=>{
          return total += +record.amount
        },0)

        const percent = 100*spend/cat.limit 
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red'

        const tooltiValue = cat.limit- spend
        const tooltip  = `${tooltiValue < 0 ? localizeFilter('ExcessBy') : localizeFilter('Left')} ${currencyFilter(Math.abs(tooltiValue))}`
        // console.log(spend)
        return{
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
    })

    this.loading = false
  }
}
</script>
