<template>
  <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>{{"R_Create" | localize}}</h4>
            </div>

            <form @submit.prevent="submitHandler">
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
                  {{"Enter category name" | localize}}</span>
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
                {{"R_Create" | localize}}
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
</template>

<script>
import M from 'materialize-css'
import localizeFilter from '@/filters/localize.filter'
import {required, minValue} from 'vuelidate/lib/validators'
export default {
  data:()=>({
    title:'',
    limit: 1
  }),
  validations:{
    title:{required},
    limit:{minValue: minValue(1)}
  },
  methods:{
    async submitHandler(){
      if(this.$v.$invalid){
         this.$v.$touch()
         return 
      }

      try{
        const category = await this.$store.dispatch('createCategory', {
        title:this.title,
        limit:this.limit
      })
      // console.log(category)
      this.title =""
      this.limit = 1
      this.$v.$reset()
      this.$message(localizeFilter('CreatedCategory'))
      this.$emit('created',category)
      }catch(e){
        console.log(e)
      }
      
    }
  },
  mounted(){
    M.updateTextFields()
  }
}
</script>
