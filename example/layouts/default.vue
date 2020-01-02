<template>
  <div>
    <nav>
      <nuxt-link v-for="navItem in $store.state.nav" :key="navItem.path" :to="navItem.path">
        {{ navItem.title }}
      </nuxt-link>
    </nav>
    <hr>
    <!-- <pre>{{ $store.state.nav }}</pre> -->
    <h2>$auto</h2>
    <pre>{{ this.$auto }}</pre>
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted () {
    // eslint-disable-next-line no-console
    console.log('this.$auto', this.$auto)
  }
}
</script>
