document.addEventListener('DOMContentLoaded', async function(){
  const username = 'FaithV5'; // change if needed
  const canvas = document.getElementById('languagesChart');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;

  const sample = { labels:['JavaScript','Python','HTML','CSS','SQL'], data:[32,22,18,15,13] };

  async function fetchRepoLanguages(user){
    try{
      const reposRes = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`);
      if(!reposRes.ok) throw new Error('repos fetch failed');
      const repos = await reposRes.json();
      const langTotals = {};
      const limited = repos.slice(0, 60);
      const langPromises = limited.map(r=>fetch(r.languages_url).then(res=>res.ok?res.json():{}).catch(()=>({}))); 
      const langResults = await Promise.all(langPromises);
      langResults.forEach(obj=>{
        for(const [lang,bytes] of Object.entries(obj||{})){
          langTotals[lang] = (langTotals[lang]||0) + bytes;
        }
      });
      return langTotals;
    }catch(e){
      return null;
    }
  }

  function toChartData(langTotals){
    const entries = Object.entries(langTotals).sort((a,b)=>b[1]-a[1]);
    const top = entries.slice(0,8);
    return {
      labels: top.map(e=>e[0]),
      data: top.map(e=>Math.round(e[1]/1000))
    };
  }

  function render(labels,data){
    if(!ctx) return;
    new Chart(ctx,{
      type:'doughnut',
      data:{labels, datasets:[{data, backgroundColor:['#f97316','#f59e0b','#84cc16','#06b6d4','#ef4444','#a78bfa','#60a5fa','#f43f5e']}],},
      options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'right'}}}
    });
  }

  const totals = await fetchRepoLanguages(username);
  if(totals && Object.keys(totals).length){
    const chartData = toChartData(totals);
    render(chartData.labels, chartData.data);
  } else {
    render(sample.labels, sample.data);
  }
});