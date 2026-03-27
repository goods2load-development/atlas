fetch('https://restcountries.com/v3.1/name/India')
  .then(res => res.json())
  .then(data => console.log(data.map(d => ({ name: d.name.common, cca2: d.cca2 }))))
  .catch(console.error);
