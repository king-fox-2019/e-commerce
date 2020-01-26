<template>
    <sui-form align="center" @submit.prevent="userRegister">
        <form-logo/>
        <sui-header>Please Register your Account</sui-header>
        <message :header="msgHeader"
                 :description="msgDescription"
                 :visibility="msgVisibility"
                 :type="msgType"/>
        <div id="formRegister">
            <sui-form-field>
                <input placeholder="input your full name here..."
                       type="text"
                       v-model="name"
                       required>
            </sui-form-field>
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
            <sui-form-field>
                <sui-checkbox
                        label="I agree to the Terms and Conditions"
                        v-model="agree"/>
            </sui-form-field>
            <sui-button primary type="submit" id="signUpButton">Sign Up</sui-button>
        </div>
        Already have account ?
        <router-link to="/login">Sign In Here</router-link>
        <br>
        back to
        <router-link to="/">Home</router-link>
    </sui-form>
</template>

<script>
    import formLogo from "../formLogo";
    import message from "../message";
    import router from "../../router";

    export default {
        name: "formRegister",
        data() {
            return {
                name: null,
                email: null,
                password: null,
                agree: true,
                msgHeader: null,
                msgDescription: null,
                msgVisibility: false,
                msgType: "info"
            }
        },
        methods: {
            userRegister() {
                if (!this.agree) {
                    console.log("You must agree with the term and conditions");
                    this.msgHeader = "Error Sign Up";
                    this.msgDescription = "You must agree with the term and conditions";
                    this.msgType = "negative";
                    this.msgVisibility = true;
                    return;
                }


                this.$dialog
                    .confirm('Save this data and continue ?')
                    .then(dialog => {
                        this.$axios({
                            method: 'post',
                            url: '/api/users/register',
                            data: {
                                name: this.name,
                                email: this.email,
                                password: this.password
                            }
                        }).then(response => {
                            console.log("User successfully register");
                            this.msgHeader = "Success Sign Up";
                            this.msgDescription = "User successfuly register";
                            this.msgType = "info";
                            this.msgVisibility = true;
                            localStorage.setItem('token', response.data.token);
                            router.push('/');
                            dialog.close()
                        }).catch(err => {
                            console.log({err});
                            this.msgHeader = "Error Sign Up";
                            this.msgDescription = err.response.data.errMsg;
                            this.msgType = "negative";
                            this.msgVisibility = true;
                            dialog.close()
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        this.$toast.info({
                            title: 'Cancel',
                            message: 'Sign up has been canceled :('
                        });
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
    #signUpButton {
        width: 100%;
    }

    #formRegister {
        margin: 25px 0 25px 0;
    }

    input {
        font-size: 16px !important;
    }
</style>