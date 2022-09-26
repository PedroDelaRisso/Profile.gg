<script lang="ts">
import ValorantAPI from 'unofficial-valorant-api'
import type { AccountFetchOptions } from 'unofficial-valorant-api'
import type IMatch from '@/constants/Match'
import { defineComponent } from 'vue'

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
      const minutes = Number.parseInt(minutes_withDecimals.toString().split('.')[0]);
      const seconds = ((minutes_withDecimals - minutes) * 60).toString().split('.')[0];
      this.hoursPlayed_Patched = `${hours} horas, ${minutes} minutos e ${seconds} segundos.`
    },
    getTotalKills() {
      this.totalKills = 0;
      (this.matches as IMatch[]).forEach((m) => {
        this.totalKills += m.players.all_players.filter((p) => this.gameName.includes(p.name))[0].stats.kills;
      })
    },
    getMostPlayedAgent() {
      const charactersPlayed = (this.matches.map((m: IMatch) => m.players?.all_players?.filter((p) => this.gameName.includes(p.name as string)).map((p) => ({ character: p.character as string, assets: p.assets }))) as any).flat();
      var agents: Object = {};
      var max = '';
      let maxImage = '';
      var maxNumber = 0;
      charactersPlayed.forEach((c: ({ character: string, assets: any })) => {
        if (isNaN((agents as any)[c.character])) {
          (agents as any)[c.character] = 0;
        }
        (agents as any)[c.character]++;
        if ((agents as any)[c.character] > maxNumber) {
          maxNumber = (agents as any)[c.character];
          max = c.character;
          maxImage = c.assets.agent.full;
        }
      });
      this.mostPlayedAgent = max;
      this.mostPlayedAgentImage = maxImage;
    },
    getHitData() {
      const stats = (this.matches.map((m: IMatch) => m.players.all_players.filter((p) => this.gameName.includes(p.name as string)).map((p) => {
        return p.stats;
      })));

      stats.forEach((s) => {


        this.hitData.headShots += s[0].headshots;
        this.hitData.bodyShots += s[0].bodyshots;
        this.hitData.legShots += s[0].legshots;

        this.hitData.totalShots += (s[0].headshots + s[0].bodyshots + s[0].legshots);


      })
    },
    getWinRate() {
      let matchesWon = 0;
      this.matches.forEach((m: IMatch) => {

        const p = m.players.all_players.filter((p) => this.gameName.includes(p.name as string))[0];

        let whoWon = m.teams.blue.has_Won ? "Blue" : "Red";

        if (whoWon === p.team) {
          matchesWon++;
        }
        this.winRate = ((matchesWon / this.matches.length) * 100);
      })
    },
    getPlayerRank() {
      const player = (this.matches.filter((m: IMatch) => m.metadata.mode === 'Competitive').map((m: IMatch) => m.players?.all_players?.filter((p) => this.gameName.includes(p.name as string))[0])[0]);
      if(player) {
        switch (player.currenttier_patched) {
          case 'Iron 1':
            this.playerRank.image = './assets/rank_png/Iron_1_Rank.png'
            this.playerRank.name = 'Ferro 1'
            break;
          case 'Iron 2':
            this.playerRank.image = './assets/rank_png/Iron_2_Rank.png'
            this.playerRank.name = 'Ferro 2'
            break;
          case 'Iron 3':
            this.playerRank.image = './assets/rank_png/Iron_3_Rank.png'
            this.playerRank.name = 'Ferro 3'
            break;
          case 'Bronze 1':
            this.playerRank.image = './assets/rank_png/Bronze_1_Rank.png'
            this.playerRank.name = 'Bronze 1'
            break;
          case 'Bronze 2':
            this.playerRank.image = './assets/rank_png/Bronze_2_Rank.png'
            this.playerRank.name = 'Bronze 2'
            break;
          case 'Bronze 3':
            this.playerRank.image = './assets/rank_png/Bronze_3_Rank.png'
            this.playerRank.name = 'Bronze 3'
            break;
          case 'Silver 1':
            this.playerRank.image = './assets/rank_png/Silver_1_Rank.png'
            this.playerRank.name = 'Prata 1'
            break;
          case 'Silver 2':
            this.playerRank.image = './assets/rank_png/Silver_2_Rank.png'
            this.playerRank.name = 'Prata 2'
            break;
          case 'Silver 3':
            this.playerRank.image = './assets/rank_png/Silver_3_Rank.png'
            this.playerRank.name = 'Prata 3'
            break;
          case 'Gold 1':
            this.playerRank.image = './assets/rank_png/Gold_1_Rank.png'
            this.playerRank.name = 'Ouro 1'
            break;
          case 'Gold 2':
            this.playerRank.image = './assets/rank_png/Gold_2_Rank.png'
            this.playerRank.name = 'Ouro 2'
            break;
          case 'Gold 3':
            this.playerRank.image = './assets/rank_png/Gold_3_Rank.png'
            this.playerRank.name = 'Ouro 3'
            break;
          case 'Platinum 1':
            this.playerRank.image = './assets/rank_png/Platinum_1_Rank.png'
            this.playerRank.name = 'Platina 1'
            break;
          case 'Platinum 2':
            this.playerRank.image = './assets/rank_png/Platinum_2_Rank.png'
            this.playerRank.name = 'Platina 2'
            break;
          case 'Platinum 3':
            this.playerRank.image = './assets/rank_png/Platinum_3_Rank.png'
            this.playerRank.name = 'Platina 3'
            break;
          case 'Diamond 1':
            this.playerRank.image = './assets/rank_png/Diamond_1_Rank.png'
            this.playerRank.name = 'Diamante 1'
            break;
          case 'Diamond 2':
            this.playerRank.image = './assets/rank_png/Diamond_2_Rank.png'
            this.playerRank.name = 'Diamante 2'
            break;
          case 'Diamond 3':
            this.playerRank.image = './assets/rank_png/Diamond_3_Rank.png'
            this.playerRank.name = 'Diamante 3'
            break;
          case 'Ascendant 1':
            this.playerRank.image = './assets/rank_png/Ascendant_1_Rank.png'
            this.playerRank.name = 'Ascendente 1'
            break;
          case 'Ascendant 2':
            this.playerRank.image = './assets/rank_png/Ascendant_2_Rank.png'
            this.playerRank.name = 'Ascendente 2'
            break;
          case 'Ascendant 3':
            this.playerRank.image = './assets/rank_png/Ascendant_3_Rank.png'
            this.playerRank.name = 'Ascendente 3'
            break;
          case 'Immortal 1':
            this.playerRank.image = './assets/rank_png/Immortal_1_Rank.png'
            this.playerRank.name = 'Imortal 1'
            break;
          case 'Immortal 2':
            this.playerRank.image = './assets/rank_png/Immortal_2_Rank.png'
            this.playerRank.name = 'Imortal 2'
            break;
          case 'Immortal 3':
            this.playerRank.image = './assets/rank_png/Immortal_3_Rank.png'
            this.playerRank.name = 'Imortal 3'
            break;
          case 'Radiant':
            this.playerRank.image = './assets/rank_png/Radiant_Rank.png'
            this.playerRank.name = 'Radiante'
            break;
        }
      }
    },
    downloadImage() {
      const myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;

      const a = document.createElement('a');
      a.href = myCanvas.toDataURL();
      a.download = `perfil-${this.gameName.split('#')[0]}.png`;
      a.click();

      document.body.appendChild(a);
    },
    getImageUrl(name: string) {
        return new URL(name, import.meta.url).href;
    }
  },

  watch: {
    matches() {
      this.getPlayTime();
      this.getTotalKills();
      this.getMostPlayedAgent();
      this.getHitData();
      this.getWinRate();
      this.getPlayerRank();
      this.downloadImage();
    }
  },
  data() {
    return {
      gameName: 'SantaCleiton#7191',
      loading_fetch: false,
      matches: [],
      hoursPlayed: 0,
      hoursPlayed_Patched: '',
      totalKills: 0,
      winRate: 0.0,
      hitData: {
        totalShots: 0,
        headShots: 0,
        bodyShots: 0,
        legShots: 0,
      },
      mostPlayedAgent: '',
      mostPlayedAgentImage: '',
      playerRank: {
        image: '',
        name: '',
      }
    }
  },
})

</script>

<template>

  <body id="body1" v-if="!matches.length">
    <div class="container1">
      <form action="">
        <div class="content1">
          <div class="nick-modal1">
            <span id="label-nametag">Coloque seu nick e sua tag</span>
            <input type="text" placeholder="Nickname#TAG" v-model="gameName" @keyup.enter="fetchMatches(gameName)" />
          </div>
          <button type="submit" class="button1 color-red" :disabled="loading_fetch" @click="fetchMatches(gameName)">
            {{ loading_fetch ? "Gerando..." : "Gerar" }}
          </button>
        </div>
      </form>
    </div>
  </body>

  <body id="body2" v-else>
    <canvas id="myCanvas">
      <div class="content2">
        <div class="side-bar2">
          <span class="nick2">{{gameName.split('#')[0]}}</span>
          <div class="group-char2">
            <img :src="mostPlayedAgentImage" class="char-img2">
            <span class="char-base2">.</span>
          </div>
          <span class="char-name2">{{ mostPlayedAgent.toUpperCase() }}</span>
        </div>
        <div class="main-content2">
          <div class="row2">
            <div class="stat-comp2">
              <img src="@/assets/skull.png" class="img-stat2">
              <div class="stat-group2">
                <span class="stat-title2">Abates Totais:</span>
                <span class="stat-info2">{{ totalKills }}</span>
              </div>
            </div>
            <div class="stat-comp2">
              <img src="@/assets/clock.png" class="img-stat2">
              <div class="stat-group2">
                <span class="stat-title2">Horas jogadas:</span>
                <span class="stat-info2">{{ hoursPlayed_Patched }}</span>
              </div>
            </div>
          </div>
          <div class="row2">
            <div class="rank-comp2" v-if="playerRank.image">
              <span class="stat-title2">ELO:</span>
              <img :src="getImageUrl(playerRank.image)" class="img-stat2">
              <span class="stat-title2">{{ playerRank.name.toUpperCase() }}</span>
            </div>
            <div class="stat-comp2">
              <img src="@/assets/trophy.png" class="img-stat2">
              <div class="stat-group2">
                <span class="stat-title2">Winrate:</span>
                <span class="stat-info2">{{ winRate }}%</span>
              </div>
            </div>
          </div>
  
          <div class="row2">
            <div class="best-map2">
              <span>Melhor mapa:</span>
              <img src="@/assets/bind.png">
              <span>BIND</span>
            </div>
            <div class="hit-comp2">
              <span class="title2">Hits Locations:</span>
              <div class="dummy-comp2">
                <div class="data-hits2">
                  <div class="hit-info2">
                    <span class="sub-title2">HEAD:</span>
                    <span class="sub-title2">{{ ((hitData.headShots / hitData.totalShots) * 100).toFixed(2) }}%</span>
                  </div>
                  <div class="hit-info2">
                    <span class="sub-title2">BODY:</span>
                    <span class="sub-title2">{{ ((hitData.bodyShots / hitData.totalShots) * 100).toFixed(2) }}%</span>
                  </div>
                  <div class="hit-info2">
                    <span class="sub-title2">LEG:</span>
                    <span class="sub-title2">{{ ((hitData.legShots / hitData.totalShots) * 100).toFixed(2) }}%</span>
                  </div>
                </div>
                <img src="@/assets/body.png">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="triangle"></div>
    </canvas>
  </body>
</template>

<style scoped>
@import "@/assets/tela1.css";
@import "@/assets/tela2.css";
</style>
