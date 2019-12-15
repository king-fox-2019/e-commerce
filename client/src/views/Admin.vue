<template>
    <div class="admin-page">
        <div class="link">
            <router-link to="/admin/">Transactions </router-link> | 
            <router-link to="/admin/add">Add Items </router-link> |
            <router-link to="/admin/listitem">List Items </router-link>
        </div>
    <router-view></router-view>
    </div>
</template>

<script>

export default {
    name:'admin-page',
    data(){
        return {

        }
    },

    methods: {
    },
    created(){
    },

}
</script>

<style scoped>

.admin-page{
    
    margin-top:150px;
    max-width:100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

</style>