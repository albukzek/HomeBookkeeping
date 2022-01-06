<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <a href="/history" class="breadcrumb">{{"D_History" | localize}}</a>
        <a class="breadcrumb" @click.prevent>
          {{record.type === 'income' ? 'Income'  : 'Outcome' | localize}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card"
              :class="{
                'red' : record.type === 'outcome',
                'green' : record.type === 'income'
              }">
            <div class="card-content white-text">
              <p>{{"D_Description" | localize}}: {{record.description}}</p>
              <p>{{"D_Amount" | localize}}: {{record.amount | currency("RUB")}}</p>
              <p>{{"MenuCategory" | localize}}: {{ record.categoryName }}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{"D_RecNotFound1" | localize}} {{$route.params.id}} {{"D_RecNotFound1" | localize}}</p>
  </div>
</template>

<script>

export default {
  metaInfo(){
    return {
      title: this.$title('Details')
    }
  },
  name:'detail',
  data:() => ({
    record: null,
    loading: true
  }),
  async mounted(){
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordsById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)


    this.record = {
      ...record,
      categoryName: category.title
    }
 
    this.loading = false
  }
}
</script>
