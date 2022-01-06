<template>
  <div>
    <div class="page-title">
      <h3>{{"Cat_Categories" | localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit 
        v-if="categories.length"
        :categories="categories"
        @updated="updateCategoryes"
        :key="categories.length + updateCount"
        />
        <p v-else class="center">{{"Cat_EnterCategories" | localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  data:()=>({
    categories:[],
    loading: true,
    updateCount:0
  }),
  methods:{
    addNewCategory(category){
      this.categories.push(category)
    },
    updateCategoryes(catData){
      const idx =  this.categories.findIndex(c => c.id === catData.id)
      this.categories[idx].title = catData.title
      this.categories[idx].limit = catData.limit
      this.updateCount++
    }
  },
  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components:{
    CategoryEdit,
    CategoryCreate
  }
}
</script>
