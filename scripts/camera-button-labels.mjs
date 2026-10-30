/** Vector-authored replacement legends for the supplied Pentax's rear controls. */
export const buttonLegends = [
  { name:'LV', center:[2.3536406755,.631695807,1.0268878639], text:'LV', size:.052, boxed:true },
  { name:'Metering', center:[2.3536406755,.631695807,.8538013101], icon:'meter' },
  { name:'AF', center:[2.3536406755,.631695807,-.921464324], text:'AF', size:.055 },
  { name:'AE-L', center:[2.3041009903,.615252018,-1.1248537898], text:'AE-L', size:.048 },
  { name:'Green button', center:[2.4235036373,.329362303,-.6609633863], icon:'green' },
  { name:'Playback', center:[2.4235036373,.114167247,-.6609633863], icon:'play' },
  { name:'INFO', center:[2.4235036373,-.6632334888,-.6634759605], text:'INFO', size:.039 },
  { name:'MENU', center:[2.4235036373,-.6632334888,-.8548328876], text:'MENU', size:.038 },
  { name:'AF points', center:[2.4235036373,-.00184924,-.7928003371], icon:'points' },
  { name:'OK', center:[2.4503033161,-.3073801324,-.7931901813], text:'OK', size:.075 },
  { name:'Drive mode', center:[2.4325082302,-.1515351459,-.7931902111], icon:'drive' },
  { name:'WB', center:[2.4325082302,-.3073801249,-.6373452246], text:'WB', size:.043, direction:-1 },
  { name:'Focus mode', center:[2.4325082302,-.4632250965,-.7931902111], icon:'focus' },
  { name:'ISO', center:[2.4325082302,-.3073801398,-.9490352273], text:'ISO', size:.035, direction:1 },
];

const icons = {
  meter:'<rect x="-38" y="-27" width="76" height="54" rx="5"/><path d="M-22-14v28M22-14v28M-9-14v28M9-14v28"/>',
  play:'<rect x="-40" y="-28" width="80" height="56" rx="3"/><path d="m-12-17 29 17-29 17Z" fill="currentColor" stroke="none"/>',
  points:'<path d="M-31-12v-15h15M16-27h15v15M31 12v15H16M-16 27h-15V12"/><path d="M-9 0H9M0-9V9"/>',
  drive:'<rect x="-27" y="-17" width="60" height="38" rx="2"/><path d="M-35-25H22M-35-25V12"/>',
  focus:'<rect x="-36" y="-23" width="72" height="46" rx="2"/><path d="M-12-23v46M12-23v46M-36-8h72M-36 8h72"/>',
};

export function makeButtonAtlas(parts) {
  const tile = 256, side = 1024;
  const tiles = parts.map(({legend,part},index)=>{
    const width = (part.max[2]-part.min[2])*1000, height = (part.max[1]-part.min[1])*1000;
    const cx = width/2, cy = height/2;
    let mark;
    if (legend.text) {
      mark = `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-family="Arial,sans-serif" font-size="${legend.size*1000}" font-weight="700" fill="#f7f7f5">${legend.text}</text>`;
      if (legend.boxed) mark += `<rect x="${width*.15}" y="${height*.19}" width="${width*.7}" height="${height*.62}" rx="8" fill="none" stroke="#f7f7f5" stroke-width="3"/>`;
    } else if (legend.icon === 'green') {
      mark = `<circle cx="${cx}" cy="${cy}" r="${Math.min(width,height)*.31}" fill="#69cdbd"/>`;
    } else {
      const size = Math.min(width,height)*.72;
      mark = `<g transform="translate(${cx} ${cy}) scale(${size/100})" fill="none" color="${legend.icon==='play'?'#85c8ff':'#f7f7f5'}" stroke="currentColor" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${icons[legend.icon]}</g>`;
    }
    return `<svg x="${index%4*tile}" y="${Math.floor(index/4)*tile}" width="${tile}" height="${tile}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><rect width="${width}" height="${height}" fill="#151519"/>${mark}</svg>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${side}" height="${side}"><rect width="100%" height="100%" fill="#151519"/>${tiles}</svg>`;
}
