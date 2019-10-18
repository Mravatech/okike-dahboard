<template>
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
    <Loader v-if="loading" :show-full="true" loading-text=" Please wait..."/>
    <div class="content-wrapper d-flex align-items-center auth">
        <div class="row w-100">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left p-5">
              <div class="brand-logo">
                <img src="../../assets/images/moovetv.svg">
              </div>
              <h4>New here?</h4>
              <h6 class="font-weight-light">Signing up is easy. It only takes a few steps</h6>
              <form class="pt-3" @submit.prevent="Register">
                  <div class="form-group">
                      <input type="text" class="form-control form-control-lg" v-model="name"  placeholder="Name">
                  </div>
                <div class="form-group">
                  <input type="email" class="form-control form-control-lg" v-model="email"  placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control form-control-lg" v-model="password"  placeholder="Password">
                </div>
                <div class="mt-3">
                  <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn btn-rounded">SIGN UP</button>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  Already have an account? <router-link to="login" class="text-primary">Login</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>

</template>


<script>
    import Loader from "../../components/Loader/Loader";
    import {userService} from "../../services/user.service";

    export default {
        name: 'Register',
        components: {Loader},
        data: function () {
            return {
                name:'',
                email:'',
                password: '',
                client_id:'',
                loading: false,
                isSuccess: false,
            }
        },

        methods: {
            async Register() {
                this.loading = true;
                await userService.register({
                    name:this.name,
                    email: this.email,
                    password: this.password,
                    client_id:3,
                }).then((res) => {
                    this.$toastr.success(res.message, "", {timeOut: 5000});
                }).catch((error) => {
                    this.$toastr.error(error.error.message, "signup failed!", {timeOut: 5000});
                });
                this.loading = false;

            },


        }

    }
</script>

<style scoped>
 .content-wrapper {
        background: #000000;
    }

    .auth .auth-form-light {
        border-radius: 20px;
        background: #101010;
    }

    h4, h6 {
        color: white;
    }

    .auth form .form-group .form-control {
        border-radius: 30px;
        color: white;
    }
    .font-weight-light{
        color:white
    }
</style>
