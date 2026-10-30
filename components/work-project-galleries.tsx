"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { workCategories } from "@/lib/work-categories";
import { getProjectFilms, type FilmMedia } from "@/lib/work-media";
import { useWorkFilms } from "@/components/work-film-player";

function FilmPreview({ film, subsection }: { film: FilmMedia; subsection: string }) {
  const { previewsEnabled,openFilm }=useWorkFilms();
  const card=useRef<HTMLButtonElement>(null);
  const video=useRef<HTMLVideoElement>(null);
  const [near,setNear]=useState(false);
  const [visible,setVisible]=useState(false);
  const [ready,setReady]=useState(false);
  const [failed,setFailed]=useState(false);

  useEffect(()=>{
    const element=card.current;
    if (!element) return;
    const preload=new IntersectionObserver(([entry])=>{ if(entry.isIntersecting){setNear(true);preload.disconnect();} },{rootMargin:"300px"});
    const playback=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15});
    preload.observe(element); playback.observe(element);
    return ()=>{preload.disconnect();playback.disconnect();};
  },[]);
  useEffect(()=>{
    const element=video.current;
    if (!element) return;
    let cancelled=false;
    if(previewsEnabled&&visible&&ready&&!failed) element.play().catch(error=>{if(!cancelled&&error.name!=="AbortError")setFailed(true);});
    else element.pause();
    return ()=>{cancelled=true;element.pause();};
  },[previewsEnabled,visible,ready,failed]);

  return <button ref={card} type="button" className="work-film-tile" data-format={film.width>film.height?"landscape":"portrait"} style={{"--film-aspect":`${film.width} / ${film.height}`} as CSSProperties} aria-label={`Watch ${film.sample?"sample footage, ":""}${film.title} for ${subsection}`} onClick={event=>openFilm(film,event.currentTarget)}>
    <video ref={video} src={near?film.preview:undefined} poster={film.poster} muted loop playsInline preload={near?"auto":"none"} aria-hidden="true" tabIndex={-1} onLoadedData={()=>setReady(true)} onError={()=>setFailed(true)}/>
    <span className="work-film-expand" aria-hidden="true"><Maximize2 size={20}/></span>
    <span className="sr-only">{film.sample?"Sample footage. ":""}{failed?"Open the full film to play.":"Open full film"}</span>
  </button>;
}

function groupFilmRows(films: FilmMedia[]) {
  const rows: FilmMedia[][]=[];
  let row: FilmMedia[]=[],aspect=0;
  for(const film of films){
    const ratio=film.width/film.height;
    if(row.length&&(row.length>=4||aspect+ratio>4.4)){ rows.push(row);row=[];aspect=0; }
    row.push(film);aspect+=ratio;
  }
  if(row.length) rows.push(row);
  return rows;
}

const publishedCategories=workCategories.map(category=>({...category,subsections:category.subsections.filter(name=>getProjectFilms(category.id,name).length>0)})).filter(category=>category.subsections.length>0);

function CategoryGallery({ category }: { category: { id:string; title:string; subsections:readonly string[] } }) {
  const [selected,setSelected]=useState<string>(category.subsections[0]);
  const buttons=useRef<(HTMLButtonElement|null)[]>([]);
  const subsections: readonly string[]=category.subsections;
  const selectedIndex=subsections.indexOf(selected);
  const films=getProjectFilms(category.id,selected);
  const filmRows=groupFilmRows(films);
  const panelId=`${category.id}-films`;
  const selectWithKeyboard=(event:KeyboardEvent<HTMLButtonElement>,index:number)=>{
    let next=index;
    if(event.key==="ArrowRight") next=(index+1)%category.subsections.length;
    else if(event.key==="ArrowLeft") next=(index-1+category.subsections.length)%category.subsections.length;
    else if(event.key==="Home") next=0;
    else if(event.key==="End") next=category.subsections.length-1;
    else return;
    event.preventDefault(); setSelected(category.subsections[next]); buttons.current[next]?.focus({preventScroll:true});
  };

  return <section id={`work-${category.id}`} className="work-category" aria-labelledby={`${category.id}-title`}>
    <h3 id={`${category.id}-title`}>{category.title}</h3>
    <div className="work-subsection-carousel">
      <button type="button" className="work-subsection-step" aria-label={`Previous ${category.title} project`} onClick={()=>setSelected(subsections[(selectedIndex-1+subsections.length)%subsections.length])}><ChevronLeft size={24}/></button>
      <div className="work-subsections" role="tablist" aria-label={`${category.title} projects`} data-count={subsections.length}>
        {category.subsections.map((name,index)=>{
          let offset=(index-selectedIndex+subsections.length)%subsections.length;
          if(offset>subsections.length/2) offset-=subsections.length;
          const distance=Math.abs(offset);
          return <button ref={element=>{buttons.current[index]=element;}} id={`${category.id}-tab-${index}`} key={name} className="hover-target" type="button" role="tab" aria-selected={selected===name} aria-controls={panelId} tabIndex={selected===name?0:-1} data-distance={distance} onClick={()=>setSelected(name)} onKeyDown={event=>selectWithKeyboard(event,index)} style={{"--choice-offset":offset,"--choice-scale":Math.max(.58,1-distance*.2),"--choice-y":`${distance*6}px`,"--choice-angle":`${offset===0?0:offset<0?16:-16}deg`,"--choice-opacity":distance===0?1:distance===1?.65:.4,zIndex:10-distance} as CSSProperties}><span className="hover-label">{name}</span></button>;
        })}
      </div>
      <button type="button" className="work-subsection-step" aria-label={`Next ${category.title} project`} onClick={()=>setSelected(subsections[(selectedIndex+1)%subsections.length])}><ChevronRight size={24}/></button>
    </div>
    <div id={panelId} role="tabpanel" aria-labelledby={`${category.id}-tab-${selectedIndex}`} className="work-film-grid" data-total={films.length} key={selected}>
      {filmRows.map((row,index)=><div className="work-film-row" key={index} data-count={row.length} style={{"--film-columns":row.map(film=>`${film.width/film.height*100}fr`).join(" "),"--row-aspect":row.reduce((sum,film)=>sum+film.width/film.height,0),"--row-count":row.length} as CSSProperties}>
        {row.map(film=><FilmPreview key={film.id} film={film} subsection={selected}/>)}
      </div>)}
    </div>
  </section>;
}

export function WorkProjectGalleries() {
  return <div className="work-project-galleries">
    {publishedCategories.map(category=><CategoryGallery key={category.id} category={category}/>)}
  </div>;
}
