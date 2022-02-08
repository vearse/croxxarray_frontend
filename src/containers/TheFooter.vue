<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://croxxtalent.io" target="_blank">CroxxArray</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} .</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="https://croxxtalent.io/vue">CroxxTallent</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
