<template>
  <div class="c-app flex-row align-items-center" style="background: #0040A1;">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="6">
          <div class="jmx-auto mt-4">
            <img  src="@/assets/images/login_handshake.png" alt="" style="max-width:400px" class="text-center">
            <h4 class="welcome-intro mt-3">Enjoy the power of real workplace collaboration</h4>
          </div>
        </CCol>
        <CCol md="5">
            <CCard class="shadow-md login-card">
              <CCardBody class="p-4">
                <CForm ref="form" @submit.prevent="login()">
                  <div class="mb-4">
                      <h1 class="login-h1 text-center ">Log into your account</h1>
                  </div>
                  <CInput
                    class="pb-3"
                    type="email"
                    label="Email Address"
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="form.email"
                    size="lg"
                  >
                    <!-- <template #prepend-content><CIcon name="cil-user"/></template> -->
                  </CInput>
                  <CInput
                    class="pb-3" 
                    placeholder="Password"
                    label="Password"
                    type="password"  
                    autocomplete="curent-password"
                    v-model="form.password"
                    size="lg"
                  >
                    <!-- <template #prepend-content><CIcon name="cil-lock-locked"/></template> -->
                  </CInput>
                  <CRow>
                    <CCol col="12" class="mt-2">
                      <CButton class="login-submit btn-block" type="submit">Login</CButton>
                    </CCol>
                    <!-- <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
                    </CCol> -->
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<style scoped>
  .login-card{
    height: 450px;
    border-radius: 10px;;
  }
  .login-h1{
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 18px;
    color: #344168;
    padding-bottom: 10px;
  }
  .login-submit{
    background: #00EC83;
    opacity: 0.8;
    border-radius: 8.57143px;
    padding: 10px 12px;
    font-weight: bold;
  }
  .welcome-intro{
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 42px;
    line-height: 55px;
    color: #FFFFFF;
    width: 300px;;
    text-align: left;
  }
</style>
<script>
import { mapState } from "vuex";
export default {
  name: 'Login',

  data(){
     return {
       form: {
         email: "",
         password: '',
       }
     }
  }, 

  computed: {
    ...mapState("auth", ["error", "success", "validationErrors"]),
  },

  methods: {
    login(){  
      this.$store.dispatch("auth/login", this.form).then(() => {
        if(this.success !== false && this.error === false ) {
          if (this.$route.query.returnTo) {
            this.$router.replace(this.$route.query.returnTo);
          } else { 
            this.$router.replace({
              name: "dashboard",
            });
          }
        }
      });
    }
  }
}  
</script>
