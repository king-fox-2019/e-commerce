<template>
    <sui-form align="center" @submit.prevent="login">
        <form-logo/>
        <sui-header>Please Sign In to your Account</sui-header>
        <message :header="msgHeader"
                 :description="msgDescription"
                 :visibility="msgVisibility"
                 :type="msgType"/>
        <div id="formLogin">
            <sui-form-field>
                <input placeholder="input your email here..."
                       type="email"
                       v-model="email"
                       required>
            </sui-form-field>
            <sui-form-field>
                <input placeholder="input your password here..."
                       type="password"
                       v-model="password"
                       required>
            </sui-form-field>
            <sui-button primary type="submit" id="signInButton">Sign In</sui-button>
        </div>
        Don't have account yet ?
        <router-link to="/register">Sign Up Here</router-link>
        <br>
        back to
        <router-link to="/">Home</router-link>
    </sui-form>
</template>

<script>
    import formLogo from "../formLogo";
    import router from "../../router";
    import message from "../message";

    export default {
        name: "formLogin",
        data() {
            return {
                email: null,
                password: null,
                msgHeader: null,
                msgDescription: null,
                msgVisibility: false,
                msgType: "info"
            }
        },
        methods: {
            login() {
                this.$axios({
                    method: 'post',
                    url: '/api/users/login',
                    data: {
                        email: this.email,
                        password: this.password
                    }
                }).then(response => {
                    console.log("User successfully sign in");
                    localStorage.setItem('token', response.data.token);
                    router.push('/');
                    this.$toast.success({
                        title: 'Success',
                        message: `Welcome back  ${response.data.name} :)`
                    });
                }).catch(err => {
                    console.log({err});
                    this.msgHeader = "Error Sign In";
                    this.msgDescription = err.response.data.errMsg;
                    this.msgType = "negative";
                    this.msgVisibility = true;
                })
            }
        },
        components: {
            formLogo,
            message
        }
    }
</script>

<style scoped>
    #signInButton {
        width: 100%;
    }

    #formLogin {
        margin: 25px 0 25px 0;
    }

    input {
        font-size: 16px !important;
    }
</style>