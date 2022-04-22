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
      <validation-observer ref="answer" v-slot="{ invalid, handleSubmit }">
          <form action="" @submit.prevent="handleSubmit(saveAnswer)"> 
              {{ form }}
              <CRow>
                <CCol sm="12">
                   <validation-provider  v-if="item.question.type == 'textbox'" 
                    name="Answer" rules="required|min:3|max:100"
                    v-slot="validationContext">
                      <CInput 
                        v-model="form.answer" :label="item.question.name"  
                        :invalid-feedback="validationContext.errors[0]"
                        :class="{ 'is-invalid': validationContext.errors[0] }"
                        placeholder="Enter your Answer"
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
                  <CButton type="submit" button="submit" :disabled="invalid"
                      class="bg-primary text-white px-4 rounded-10p mr-3  shadow-sm">Save </CButton>
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
      isanswerLocal: {
          get: function() {
              return this.isanswer
          },
          set: function(value) {
              this.$emit('isanswerchange', value)
          }
      }
  },

  data() {
    return {
    //  isanswerLocal:  this.isanswer,
     input_types: [
        { value: 'textbox', label: 'Textbox Input'}, 
        { value: 'radio', label: 'Choice'}, 
        { value: 'checkbox', label: 'Checkbox '}, 
        { value: 'upload', label: 'Upload '}, 
        { value: 'textarea', label: 'Textarea Input'}, 
        { value: 'date', label: 'Date '}, 
        { value: 'dropdown', label: 'Dropdown '}, 
      ], 
      form:{
        project_id: this.$route.params.name,
        makeup_group_id: false,
        field_id: '',
        type: '',
        answer: '',
      }
    }
  },

  created() {
    this.resetForm();
  }, 

  methods: {
    closeModal(){
      this.isanswerLocal = false
      console.log(this.isanswerLocal); 
    },

    resetForm(){ 
      console.log(this.item.answer);
      this.form = {
        project_id: this.$route.params.name,
        makeup_group_id: this.item.makeup_group_id,
        field_id: this.item.question.id,
        type: this.item.question.type,
        answer: (this.item.answer) ? this.item.answer.content : ''
      }
    },

    saveAnswer(){
       console.log(this.form);

       this.$store.dispatch("projects/store_makeup", this.form)
        .then(() => {
          if (this.success !== false && this.error === false) {
            this.loadRecords();
            let msg = this.success;
            this.$swal.fire("", msg, "success").then(function() {
              // console.log(vm.success); 
            });
          } else { 
            this.$refs.form.setErrors(this.validationErrors); // set VeeValidation error
            let msg = this.error;
            this.$swal.fire("", msg, "error");
          }
        })
        .catch((err) => {return err})
    },

    toggleMeasure(){
      this.question.measure = !this.question.measure;
    }
  }
}
</script>

<style>

</style>