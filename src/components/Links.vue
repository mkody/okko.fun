<template>
  <div id="links">
    <h3 class="title">Links & Resources</h3>
    <h5 class="subtitle">Where to find more fans or know more about the show.</h5>

    <transition-group name="fadeUp" tag="div" class="columns is-multiline">
      <div
        class="column is-half"
        v-for="category in $parent.links_ressources"
        v-if="mnt"
        :category="category"
        :key="category.title">
        <div class="card category">
          <header class="card-header">
            <p class="card-header-title">
              {{ category.title }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p>{{ category.description }}</p>
              <ul>
                <li
                  v-for="linkEl in category.links"
                  :key="linkEl.title">
                  <a :href="linkEl.link">{{ linkEl.title }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'links',
  metaInfo: {
    title: 'Links & Resources'
  },
  data () {
    return {
      mnt: false
    }
  },
  mounted () {
    var t = this
    setTimeout(function () {
      t.mnt = true
    }, t.$parent.mntDelay)
  }
}
</script>

<style scoped>
.category ul {
    margin: 0;
    list-style: none;
}
</style>
