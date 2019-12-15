<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar>
      <sidebar-link to="/admin">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <!-- <sidebar-link to="/admin/users">
        <md-icon>person</md-icon>
        <p>Admins</p>
      </sidebar-link> -->
      <sidebar-link to="/admin/transactions">
        <md-icon>content_paste</md-icon>
        <p>Transaction</p>
      </sidebar-link>
      <sidebar-link to="/admin/products">
        <md-icon>bubble_chart</md-icon>
        <p>Products</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content></dashboard-content>

    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "@/components/admin/TopNavbar.vue";
import DashboardContent from "@/components/admin/Content.vue";

export default {
    name: 'adminHome',
    components: {
        TopNavbar,
        DashboardContent
    }
};
</script>
