
async function main() {
let t = await fetch('http://map.baidu.com/?qt=subwayscity&t=0000');
let j = await t.json();
let resArr = [];
 await Promise.all(j.subways_city.cities.map(async v=>{
     if (v.code < 500) {
         let cs = await ( await fetch(`https://map.baidu.com/?qt=bsi&c=${v.code}&t=0000`)).json();
         let n = {contents: [], city_name: v.cn_name};
          cs.content.map(v=>{
             let nv = { stops: []};
             nv.line_name = decodeURI(v.line_name);
             v.stops.map(s=>{
                 nv.stops.push(decodeURI(s.name));
             });
             n.contents.push(nv);
            });
           
            resArr.push(n);
     }
  })
);
 console.log(JSON.stringify(resArr));
}

main();
