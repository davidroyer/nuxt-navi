<template>
  <div>
    <h2>Page 2</h2>
  </div>
</template>

<script>
export default {
  head: {
    meta: [
      { hid: 'title', name: 'title', content: 'Page 2 Meta title' },
      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Page 2 Meta description' }
    ]
  }
}
</script>

<style lang="scss" scoped>

</style>
