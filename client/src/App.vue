<script lang="ts">
import ValorantAPI from 'unofficial-valorant-api'
import type { AccountFetchOptions } from 'unofficial-valorant-api'
import type IMatch from '@/constants/Match';
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
          api.getMatchesByPUUID({ puuid: puuid, region: 'br', size: 10 })
            .then((getMatchesResponse) => {
              this.matches = (getMatchesResponse as any).data;
              this.loading_fetch = false;
            });
        });
    },
    getPlayTime() {
      let millisseconds: number = 0;
      (this.matches as IMatch[]).forEach((m) => {
        millisseconds += m.metadata?.game_length as number;
      });
      this.hoursPlayed = (millisseconds / 1000) / 3600;
      const hoursPlayed_stringSplit = this.hoursPlayed.toString().split('.');
      const hours = Number.parseInt(hoursPlayed_stringSplit[0]);
      const minutes_withDecimals = (this.hoursPlayed - hours) * 60;
      const minutes =  Number.parseInt(minutes_withDecimals.toString().split('.')[0]);
      const seconds = ((minutes_withDecimals - minutes) * 60).toString().split('.')[0];
      this.hoursPlayed_Patched = `${hours} hours, ${minutes} minutes and ${seconds} seconds.`
    }
  },
  watch: {
    matches() {
      this.getPlayTime();
    }
  },
  data() {
    return {
      gameName: '',
      loading_fetch: false,
      matches: [],
      hoursPlayed: 0,
      hoursPlayed_Patched: '',
    }
  },
})

</script>

<template>
  <header>
    <div class="container">
      <form action="">
        <div class="row">
          <div class="col-md-4">
            <input
              type="text"
              placeholder="In-game Name#YOURTAG"
              v-model="gameName"
              @keyup.enter="fetchMatches(gameName)"
            />
          </div>
          <div class="col-md-8">
            <span>
              Total playtime: {{ hoursPlayed_Patched }}
            </span>
          </div>
          <div class="row">
            <div class="col-md-auto">
              <button type="submit" class="btn btn-primary" :disabled="loading_fetch" @click="fetchMatches(gameName)">
                {{ loading_fetch ? "Fetching..." : "Fetch" }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </header>
</template>

<style scoped>
/* header {
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
} */
</style>
