<template>
  <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>{{"Edit" | localize}}</h4>
            </div>

            <form @submit.prevent="submitHandler">
              <div class="input-field" >
                <select ref="select" v-model="current">
                  <option
                    v-for="c of categories"
                    :key="c.id"
                    :value="c.id"
                  >
                    {{c.title}}
                  </option>
                </select>
                <label>{{"R_SelectACategory" | localize}}</label>
              </div>

              <div class="input-field">
                <input
                    id="name"
                    type="text"
                    v-model="title"
                    :class="{invalid: $v.title.$dirty && !$v.title.required}"
                >
                <label for="name">{{"Name2" | localize}}</label>
                <span class="helper-text invalid"
                      v-if="$v.title.$dirty && !$v.title.required"
                >
                  {{"EnterNameCat" | localize}}</span>
              </div>

              <div class="input-field">
                <input
                    id="limit"
                    type="number"
                    v-model.number="limit"
                    :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
                >
                <label for="limit">{{"Limit" | localize}}</label>
                
                <span class="helper-text invalid"
                v-if="$v.limit.$dirty && !$v.limit.minValue"
                >{{"R_MinimumValue" | localize}} {{$v.limit.$params.minValue.min}}</span>
              
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                {{"Refresh" | localize}}
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
</template>

<script>
import M from 'materialize-css'
import {required, minValue} from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  validations:{
    title:{required},
    limit:{minValue: minValue(1)}
  },
  data:()=>({
    select:null,
    title:'',
    limit: 1,
    current:null
  }),
  methods:{
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }

      try{
        const categoryData = {
          id:this.current,
          title:this.title,
          limit:this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(localizeFilter('CatAdded'))
        this.$emit('updated', categoryData)
      } catch(e){
        console.log(e)
      }
    }
  },
  mounted(){
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed(){
    if(!this.select && this.select.destroy){
      this.select.destroy()
    }
  },
  props:{
    categories:{
      type:Array,
      required:true
    }
  },
  created(){
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  watch:{
    current(catId){
      const {title, limit} = this.categories.find( c => c.id === catId)
      this.title =title,
      this.limit =limit
    }
  }
}
</script>
