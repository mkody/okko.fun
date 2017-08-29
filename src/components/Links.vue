<template>
  <div id="links">
    <h3 class="title">Links & Ressources</h3>
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
    title: 'Links & Ressources'
  },
  data () {
    return {
      categories: [
        {
          title: 'Official',
          description: 'Links to official pages and websites.',
          links: [
            {
              title: 'Crew Tumblr',
              link: 'https://ok-ko.tumblr.com/'
            },
            {
              title: '(Game) OK, K.O.! Lakewood Plaza Turbo!',
              link: 'http://dblstallion.com/ok-k-o-lakewood-plaza-turbo'
            }
          ]
        },
        {
          title: 'Wikis',
          description: 'Learn more about the show or complete the articles to help the others!',
          links: [
            {
              title: 'OK K.O.! Let\'s Be Heroes Wiki - Fandom',
              link: 'http://ok-ko.wikia.com/'
            },
            {
              title: 'OK K.O.! Let\'s Be Heroes - Wikipedia',
              link: 'https://en.wikipedia.org/wiki/OK_K.O.!_Let%27s_Be_Heroes'
            }
          ]
        },
        {
          title: 'Watch the show',
          description: 'The list to some official sources.',
          links: [
            {
              title: '(US) CN App',
              link: 'http://www.cartoonnetwork.com/apps/cartoon-network/cartoon-network/index.html'
            },
            {
              title: '(US) CN Website',
              link: 'http://www.cartoonnetwork.com/video/ok-ko/episodes/index.html'
            },
            {
              title: '(US) iTunes',
              link: 'https://itunes.apple.com/us/tv-season/ok-k-o-lets-be-heroes-vol-1/id1237702047'
            },
            {
              title: '(US) Amazon',
              link: 'https://www.amazon.com/Lets-Be-Heroes/dp/B071X4DXS1'
            },
            {
              title: '(US) Google Play',
              link: 'https://play.google.com/store/tv/show/OK_K_O_Let_s_Be_Heroes?id=HYu1ZYp6rL34jqCclgJrWw'
            }
          ]
        },
        {
          title: 'Cool Community Stuff',
          description: 'Fan-made content worth to mention',
          links: [
            {
              title: 'OK KO: PRESS START!!',
              link: 'https://okko-press-start.tumblr.com/post/163639104935'
            }
          ]
        },
        {
          title: 'Discord Servers',
          description: 'Here\'s some Discord servers. I know there may be tens of them, but have some picked ones.',
          links: [
            {
              title: '/r/OKKO',
              link: 'https://discord.gg/EksrtYZ'
            },
            {
              title: 'Kian\'s "OK K.O.! Let\'s Be Heroes"',
              link: 'https://discord.gg/YPcNwz7'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.category ul {
    margin: 0;
    list-style: none;
}
</style>
