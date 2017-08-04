<template>
  <div id="timeline">
    <timeline-element
      v-for="thing in elements"
      v-bind:thing="thing"
      v-bind:key="thing.id">
    </timeline-element>

    <div class="notification is-info">
      <b>Found an error or a typo?</b> Please tell us on <a class="is-underline" href="https://twitter.com/OKKOfun">Twitter</a> or <a class="is-underline" href="https://okkofun.tumblr.com">Tumblr</a> and we'll correct it as fast as we can!
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeline',
  metaInfo: {
    title: 'Timeline'
  },
  data () {
    return {
      elements: [
        {
          id: 0,
          title: 'Pilot of "Lakewood Plaza Turbo"',
          description: '<i>KO, Enid, and Rad investigate to find out who sprayed graffiti on the plaza\'s sign after being told to by Mr. Gar.</i><br> This episode, written by Ian Jones-Quartey, was released on Youtube on late-May 2013 as part of Cartoon Network\'s Summer Shorts project.<br> That was 4 years and 2 months before the show premiere on TV.',
          icon: 'tv',
          date: 'May 21, 2013',
          url: false
        },
        {
          id: 1,
          title: 'First set of shorts',
          description: 'Starting February 4, three shorts where released on Youtube by Cartoon Network.<ul><li>"KO" (Feb. 4)</li><li>"Enid" (Feb. 5)</li><li>"Rad" (Feb. 6)</li></ul>',
          icon: 'youtube',
          date: 'February 4, 2016',
          url: false
        },
        {
          id: 2,
          title: '"OK K.O.! Lakewood Plaza Turbo" for iOS and Android',
          description: 'On the same day the third short was published, the free mobile game was launched. The <i>beat \'em up</i> was developed by Double Stallion Games.<br> According to their website, Double Stallion were approached by Cartoon Network in late 2013 and worked closely with Ian Jones-Quartey.',
          icon: 'gamepad',
          date: 'February 6, 2016',
          url: 'http://dblstallion.com/ok-k-o-lakewood-plaza-turbo'
        },
        {
          id: 3,
          title: '5 new shorts',
          description: 'In December (and first of January), new shorts were published online. <ul><li>"Carol" (Dec. 13)</li><li>"Enid\'s Bad Day" (Dec. 22)</li><li>"Barrels and Crates" (Dec. 25)</li><li>"Rad Cries" (Dec. 29)</li><li>"Barrels and Crates" (Jan. 1)</li></ul>',
          icon: 'youtube',
          date: 'December 13 2016',
          url: false
        },
        {
          id: 4,
          title: 'And 4 more for promotion',
          description: 'Almost 4 years since the pilot, 4 new shorts are online. <ul><li>"Commercial"</li><li>"Power-Up!!!"</li><li>"Dendy"</li><li>"Boxmore Infomercial"</li></ul>',
          icon: 'youtube',
          date: 'May 3, 2017',
          url: false
        },
        {
          id: 5,
          title: '6 episodes released in exclusivity to the CN App',
          description: 'Episodes 1 to 6 went live on the CN App. <ul><li>"Let\'s Be Heroes"</li><li>"Let\'s Be Friends!"</li><li>"You\'re Everybody\'s Sidekick"</li><li>"We Messed Up"</li><li>"Jethro\'s All Yours"</li><li>"You\'re Level 100!"</li></ul> This is 50 days before the show starts to air on TV.',
          icon: 'mobile',
          date: 'June 12, 2017',
          url: false
        },
        {
          id: 6,
          title: 'OK K.O.! Premiere on TV',
          description: 'Episodes 1 to 4 aired on Cartoon Network from 6:15p to 7:15p. <ul><li>"Let\'s Be Heroes" (6:15p)</li><li>"Let\'s Be Friends!" (6:30p)</li><li>"You\'re Everybody\'s Sidekick" (6:45p)</li><li>"We Messed Up" (7:00p)</li></ul> The two first episodes re-aired the same day at 7:30p before CN\'s logout.<hr>The next day, episodes 5 and 6 aired on Cartoon Network from 6:15p to 6:45p. <ul><li>"Jethro\'s All Yours" (6:15p)</li><li>"You\'re Level 100!" (6:30p)</li></ul> They re-aired the same day at 7:30p, except it was first "You\'re Level 100!" and then "Jethro\'s All Yours". Previous episodes are now airing from 8:00-9:00a, 12:00-1:00p and 4:00-5:00p.',
          icon: 'tv',
          date: 'August 1, 2017',
          url: false
        },
        {
          id: 7,
          title: 'All new new new new episodes',
          description: 'New we\'re getting serious! Never-seen-before episodes 7 and 8 premiered on Cartoon Network.<ul><li>"Sibling Rivalry" (6:15p)</li><li>"I Am Dendy" (6:30p)</li></ul><hr>And again, we\'re getting two more on August 4.<ul><li>"Do You Have Any More in the Back?" (6:15p)</li><li>"My Dad Can Beat up Your Dad" (6:30p)</li></ul>',
          icon: 'tv',
          date: 'August 3, 2017',
          url: false
        }
      ]
    }
  }
}
</script>

<style lang="scss">
// Variables
$timeline-color: #ee4d4d;
@import '../assets/timeline';
</style>