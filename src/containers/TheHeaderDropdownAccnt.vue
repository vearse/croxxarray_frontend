<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink class="mx-2">
        <div class="c-avatar">
          <img
            src="img/avatars/4.jpg"
            class="c-avatar-img "
          />
        </div>
        <div class="ml-2">
          <h6 class="font-bold">
            {{user.firstname}} {{user.lastname}}
          </h6>
          <span>
            <span class="small">Admin</span>
          </span>
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <CDropdownItem>
      <router-link to="/logout" class="card-link">
           <CIcon name="cil-lock-locked" /> Logout
      </router-link>
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return {  
      itemsCount: 42,
      user: this.$store.state.auth.user
    }
  },

  computed: {
    // fullname: this.$store.state.auth.user.firstname + ' ' +this.$store.state.auth.user.lastname
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>