<template>
    <div id="app">
        <sui-button icon="user" id="dropdown-menu">
            <sui-dropdown :text="name"
                          id="suiButtonUser">
                <sui-dropdown-menu>
                    <sui-dropdown-item @click.native="toggle">
                        <sui-icon name="edit"/>
                        Add Item
                    </sui-dropdown-item>
                    <sui-dropdown-item @click.native="transactions">
                        <sui-icon name="list"/>
                        Transactions
                    </sui-dropdown-item>
                    <sui-dropdown-item @click="logout">
                        <sui-icon name="logout"/>
                        Logout
                    </sui-dropdown-item>
                </sui-dropdown-menu>
            </sui-dropdown>
        </sui-button>

        <sui-modal v-model="open">
            <sui-modal-header>
                Add Item
                <sui-icon name="close" id="close" color="red" @click="open = false"/>
            </sui-modal-header>
            <sui-modal-content scrolling>
                <add-item/>
            </sui-modal-content>
        </sui-modal>
    </div>
</template>

<script>
    import addItem from "./addItem";
    import router from "../../router";

    export default {
        name: "userButton",
        data() {
            return {
                name: null,
                open: false
            }
        },
        methods: {
            logout() {
                this.$dialog
                    .confirm('Log out from application ?')
                    .then(dialog => {
                        localStorage.clear();
                        location.reload();
                        this.$toast.success({
                            title: 'Success',
                            message: 'Bye, Please comeback soon :)'
                        });
                        dialog.close()
                    })
                    .catch(err => {
                        this.$toast.info({
                            title: 'Cancel',
                            message: 'Thank you for staying :)'
                        });
                    })
            },
            setName() {
                if (localStorage.getItem('name')) {
                    this.name = localStorage.getItem('name')
                }
            },
            toggle() {
                this.open = !this.open;
            },
            transactions() {
                router.push("/transactions")
            }
        },
        mounted() {
            this.setName();
        },
        components: {
            addItem
        }
    }
</script>

<style scoped>
    #dropdown-menu {
        background-color: white;
        color: #0d71bb;
    }

    #close {
        float: right;
        cursor: pointer;
    }
</style>