<template>
  <CSidebar
    class="c-sidebar-light"
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/" >
      <CIcon 
        class="c-sidebar-brand-full" 
        
        size="custom-size"  
        :height="135" 
        viewBox="0 0 556 134"
      />
      <CIcon 
        class="c-sidebar-brand-minimized" 
        
        size="custom-size" 
        :height="135" 
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav"/>
  </CSidebar>
</template>
<style scoped>
.c-sidebar.c-sidebar-light .c-sidebar-brand {
    color: #000;
    background: #fff;
}
</style>

<script>
import nav from './_nav'

export default {
  name: 'TheSidebar',
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  }
}
</script>
