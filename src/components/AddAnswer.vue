<template>
  <div class="">
    <!-- Create -->
    <CModal
      :show.sync="isanswerLocal"
      :centered="true"
    > 
      <template slot="header">
          <h5 class="h5 bold">Answer {{isanswerLocal}}</h5>
          <button type="button" aria-label="Close" class="close text-danger" @click="closeModal"	>X</button>
      </template>
      <validation-observer ref="question" v-slot="{ invalid }">
          <form action="" > 
              {{ item }}
              <CRow>
                <CCol sm="12">
                   <validation-provider  v-if="item.question.type == 'textbox'" 
                    name="Answer" rules="required|min:3|max:100"
                    v-slot="validationContext">
                      <CInput 
                        v-model="question.name" :label="item.question.name"  
                        :invalid-feedback="validationContext.errors[0]"
                        :class="{ 'is-invalid': validationContext.errors[0] }"
                        placeholder="Enter your Question"
                      />
                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                  </validation-provider>
                </CCol> 
              </CRow>
              <!-- <CRow> 
                <CCol sm="12">
                    <validation-provider name="Input Type" rules="required" v-slot="validationContext">
                        <CSelect 
                          label="Input Type"  label-class="required"
                          :value.sync="question.type"
                          :invalid-feedback="validationContext.errors[0]"
                          :class="{ 'is-invalid': validationContext.errors[0] }"
                          :options="input_types"
                          placeholder="Select Input Type"
                        />
                      <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                    </validation-provider>
                </CCol> 
              </CRow> -->
              <div class="py-3 float-right">
                  <CButton type="button" button="submit" @click="addNewQuestion" :disabled="invalid"
                      class="bg-primary text-white px-4 rounded-10p mr-3  shadow-sm">{{ (question.editmode) ? 'Update' : 'Save'  }} </CButton>
              </div>
          </form>
      </validation-observer>
    </CModal>

  </div>
</template>

<script>
export default {
  name: 'AddAnswer',

  props: {
    isanswer: { 
      type: Boolean, 
      required: true,
    },
    item: {
      type: Object,
      default: {
        type: ''
      },
      required: true,
    }
  },
  model: {
        prop: 'isanswer',
        event: 'isanswerchange'
    },
  computed: {
      // isanswerLocal: {
      //     get: function() {
      //         return this.isanswer
      //     },
      //     set: function(value) {
      //         this.$emit('isanswerchange', value)
      //     }
      // }
  },

  data() {
    return {
     isanswerLocal:  this.isanswer,
     input_types: [
        { value: 'textbox', label: 'Textbox Input'}, 
        { value: 'radio', label: 'Choice'}, 
        { value: 'checkbox', label: 'Checkbox '}, 
        { value: 'upload', label: 'Upload '}, 
        { value: 'textarea', label: 'Textarea Input'}, 
        { value: 'date', label: 'Date '}, 
        { value: 'dropdown', label: 'Dropdown '}, 
      ], 
      question:{
        isquestion: false,
        editmode: false,
        measure: false,
        name: '',
        type: '',
        unit: ''
      }
    }
  },

  methods: {
    closeModal(){
      this.isanswerLocal = false
      console.log(this.isanswerLocal); 
    },

    addNewQuestion(){
       this.$emit('newQuestion', this.question);
       this.question ={
        isquestion: false,
        editmode: false,
        measure: false,
        name: '',
        type: '',
        unit: ''
      }
    },

    toggleMeasure(){
      this.question.measure = !this.question.measure;
    }
  }
}
</script>

<style>

</style>