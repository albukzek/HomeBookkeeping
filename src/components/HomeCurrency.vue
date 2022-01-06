<template>
  <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">{{"ExchangeRates" | localize}}</span>
            </div>
            <table>
              <thead>
              <tr>
                <th>{{"Сurrency" | localize}}</th>
                <th>{{"Well" | localize}}</th>
                <th>{{"Date" | localize}}</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="cur in currenncies" :key="cur">
                <td>{{cur}}</td>
                <td>{{rates[cur].toFixed(3)}}</td>
                <td>{{date | date('date')}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props:['rates', 'date'],
  data:()=>({
    currenncies:['RUB','USD','EUR']
  })
}
</script>
