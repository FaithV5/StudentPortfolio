document.addEventListener('DOMContentLoaded', function () {
  const gwaCards = Array.from(document.querySelectorAll('.gwa-card'));
  let labels = [];
  let gwaData = [];
  let rankingData = [];
  let chartLabels = [];
  let chartGwaData = [];
  let chartRankingData = [];
  if(gwaCards.length){
    gwaCards.forEach(card=>{
      const label = card.getAttribute('data-label') || (card.querySelector('.gwa-value')?.textContent || 'GWA');
      const gwa = parseFloat(card.getAttribute('data-gwa'));
      const rankAttr = card.getAttribute('data-rank');
      labels.push(label);
      gwaData.push(Number.isFinite(gwa) ? gwa : NaN);
      if(rankAttr !== null){
        const r = parseInt(rankAttr,10);
        if(Number.isFinite(r)) rankingData.push(r);
      }

      const isSchoolLevel = /SHS|JHS/i.test(label);
      const isLargeValue = Number.isFinite(gwa) && gwa > 10;
      if(!isSchoolLevel && !isLargeValue){
        chartLabels.push(label);
        chartGwaData.push(Number.isFinite(gwa) ? gwa : NaN);
        if(rankAttr !== null){
          const r = parseInt(rankAttr,10);
          if(Number.isFinite(r)) chartRankingData.push(r);
        }
      }
    });
  } else {
    labels = ['1st Year 1st Semester','1st Year 2nd Semester','2nd Year 1st Semester','2nd Year 2nd Semester'];
    gwaData = [1.4457,1.2826,1.5652,1.4783];
    rankingData = [2,1,6,5];
    chartLabels = labels.slice();
    chartGwaData = gwaData.slice();
    chartRankingData = rankingData.slice();
  }

  const gwaCtx = document.getElementById('gwaChart');
  if(gwaCtx){
    new Chart(gwaCtx.getContext('2d'), {
      type: 'line',
      data: {
        labels: chartLabels.length ? chartLabels : labels,
        datasets: [{
          label: 'GWA',
          data: chartGwaData.length ? chartGwaData : gwaData,
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14,165,233,0.12)',
          tension: 0.3,
          fill: true,
          pointRadius:4
        }]
      },
      options: {responsive:true, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:false, reverse:true}}}
    });

    const numericChartGwas = chartGwaData.filter(v=>Number.isFinite(v));
    const numericGwas = (numericChartGwas.length ? numericChartGwas : gwaData.filter(v=>Number.isFinite(v)));
    const gwaScoreEl = document.getElementById('gwaScore');
    const gwaMetaEl = document.getElementById('gwaMeta');
    if(gwaScoreEl && numericGwas.length){
      const latest = numericGwas[numericGwas.length-1];
      const best = Math.min(...numericGwas);
      const avg = (numericGwas.reduce((a,b)=>a+b,0)/numericGwas.length).toFixed(4);
      gwaScoreEl.textContent = Number.isFinite(latest) ? latest.toFixed(4) : latest;
      if(gwaMetaEl) gwaMetaEl.textContent = `Best: ${best.toFixed(4)} • Avg: ${avg}`;
    }
  }

  const rankCtx = document.getElementById('rankingChart');
  if(rankCtx){
    const rankDataset = chartRankingData.length ? chartRankingData : (rankingData.length ? rankingData : []);
    new Chart(rankCtx.getContext('2d'), {
      type: 'line',
      data: {
        labels: chartLabels.length ? chartLabels : labels,
        datasets: [{
          label: 'Ranking',
          data: rankDataset.length ? rankDataset : Array((chartLabels.length ? chartLabels : labels).length).fill(null),
          borderColor: '#a78bfa',
          backgroundColor: 'rgba(167,139,250,0.12)',
          tension: 0.25,
          fill:true,
          pointRadius:4
        }]
      },
      options: {
        responsive:true,
        plugins:{legend:{display:false}},
        scales:{y:{beginAtZero:true, reverse:true, ticks:{stepSize:1}}}
      }
    });
  }
});
