<template>
  <div>
    <nav>
      <nuxt-link v-for="navItem in $store.state.nav" :key="navItem.path" :to="navItem.path">
        {{ navItem.title }}
      </nuxt-link>
    </nav>
    <nuxt />
  </div>
</template>
