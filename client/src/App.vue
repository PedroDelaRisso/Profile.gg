<script lang="ts">
import ValorantAPI from 'unofficial-valorant-api'
import type { AccountFetchOptions } from 'unofficial-valorant-api'
import { defineComponent } from 'vue';

const api = new ValorantAPI();

export default defineComponent({
  methods: {
    fetchMatches(gn: string) {
      this.loading_fetch = true;

      const gameNameStrings = gn.split('#');
      const accountFetchOptions: AccountFetchOptions = {
        name: gameNameStrings[0],
        tag: gameNameStrings[1],
      };

      api.getAccount(accountFetchOptions)
        .then((getAccountResponse) => {
          const puuid: string = (getAccountResponse as any).data.puuid;
          api.getMatchesByPUUID({ puuid: puuid, region: 'br' })
            .then((getMatchesResponse) => {
              this.matches = (getMatchesResponse as any).data;
              this.loading_fetch = false;
            });
        });
    },
    getPlayTime() {
      console.log(this.matches);
    }
  },
  data() {
    return {
      gameName: '',
      loading_fetch: false,
      matches: [],
    }
  },
})

</script>

<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col">
          <input
            style="max-width: 33vw; min-width: 512px;"
            type="text"
            placeholder="In-game Name#YOURTAG"
            v-model="gameName"
          />
        </div>
        <div class="col">
          <button type="button" class="btn btn-primary" :disabled="loading_fetch" @click="fetchMatches(gameName)">
            {{ loading_fetch ? "Fetching..." : "Fetch" }}
          </button>
          <button type="button" class="btn btn-primary" :disabled="!matches" @click="getPlayTime">
            Get Play Time
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
