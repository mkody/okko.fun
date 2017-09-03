<template>
  <div id="links">
    <h3 class="title">Links & Resources</h3>
    <h5 class="subtitle">Where to find more fans or know more about the show.</h5>

    <div class="columns is-multiline">
      <div
        class="column is-half"
        v-for="category in categories"
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
    </div>

    <div class="notification is-info">
      <b>Found something useful to add?</b> Please tell us on <a class="is-underline" href="https://twitter.com/OKKOfun">Twitter</a> or via email (contact@okko.fun) and we'll take a look!<br>
      <small>(Note: don't suggest Discord servers.)</small>
    </div>
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
      categories: []
    }
  },
  mounted () {
    // Shortcut and URL to our API
    var t = this
    var apiUrl = 'https://data.okko.fun/api/latest/links.json'

    // Fetch our API
    fetch(apiUrl)
      .then(data => {
        return data.json()
      }, err => {
        console.log(err)
      })
      .then(json => {
        t.categories = json
      })
  }
}
</script>

<style scoped>
.category ul {
    margin: 0;
    list-style: none;
}
</style>
