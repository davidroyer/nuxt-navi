<template>
  <div>
    <nav>
      <nuxt-link v-for="navItem in $store.state.nav" :key="navItem.path" :to="navItem.path">
        {{ navItem.title }}
      </nuxt-link>
    </nav>
    <pre>{{ this.$nav }}</pre>
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted () {
    // eslint-disable-next-line no-console
    console.log('this.nav', this.$nav)
  }
}
</script>
