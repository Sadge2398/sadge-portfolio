(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{695:e=>{e.exports={style:{fontFamily:"'Megrim', 'Megrim Fallback'",fontWeight:400,fontStyle:"normal"},className:"__className_6897de"}},2353:e=>{e.exports={style:{fontFamily:"'Geist', 'Geist Fallback'",fontStyle:"normal"},className:"__className_9ff245",variable:"__variable_9ff245"}},4526:(e,t,a)=>{Promise.resolve().then(a.bind(a,8342)),Promise.resolve().then(a.t.bind(a,695,23)),Promise.resolve().then(a.t.bind(a,2353,23)),Promise.resolve().then(a.t.bind(a,7275,23)),Promise.resolve().then(a.t.bind(a,9324,23))},7275:e=>{e.exports={style:{fontFamily:"'Geist Mono', 'Geist Mono Fallback'",fontStyle:"normal"},className:"__className_abd485",variable:"__variable_abd485"}},8342:(e,t,a)=>{"use strict";a.d(t,{default:()=>b});var r=a(5155),o=a(7558),n=a(4688),i=a(2115),l=a(3816),s=a(3264),c=a(4102);class m extends s.BKk{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${c.r>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}let u=e=>new s.Pq0().setFromSpherical(new s.YHV(e,Math.acos(1-2*Math.random()),2*Math.random()*Math.PI)),f=i.forwardRef(({radius:e=100,depth:t=50,count:a=5e3,saturation:r=0,factor:o=4,fade:n=!1,speed:c=1},f)=>{let d=i.useRef(null),[v,h,p]=i.useMemo(()=>{let n=[],i=[],l=Array.from({length:a},()=>(.5+.5*Math.random())*o),c=new s.Q1f,m=e+t,f=t/a;for(let e=0;e<a;e++)m-=f*Math.random(),n.push(...u(m).toArray()),c.setHSL(e/a,r,.9),i.push(c.r,c.g,c.b);return[new Float32Array(n),new Float32Array(i),new Float32Array(l)]},[a,t,o,e,r]);(0,l.C)(e=>d.current&&(d.current.uniforms.time.value=e.clock.elapsedTime*c));let[b]=i.useState(()=>new m);return i.createElement("points",{ref:f},i.createElement("bufferGeometry",null,i.createElement("bufferAttribute",{attach:"attributes-position",args:[v,3]}),i.createElement("bufferAttribute",{attach:"attributes-color",args:[h,3]}),i.createElement("bufferAttribute",{attach:"attributes-size",args:[p,1]})),i.createElement("primitive",{ref:d,object:b,attach:"material",blending:s.EZo,"uniforms-fade-value":n,depthWrite:!1,transparent:!0,vertexColors:!0}))});var d=a(4319),v=a(5830),h=a(7268);function p(e){let{count:t=5e3}=e,a=(0,i.useRef)(null),o=(0,i.useMemo)(()=>{let e=new Float32Array(3*t);return d.To(e,{radius:1.5}),e},[t]);return(0,r.jsx)("group",{rotation:[0,0,Math.PI/4],children:(0,r.jsx)(v.ON,{ref:a,positions:o,stride:3,frustumCulled:!1,children:(0,r.jsx)(h.q,{transparent:!0,color:"#ffa0e0",size:.005,sizeAttenuation:!0,depthWrite:!1})})})}function b(e){let{children:t}=e;return(0,r.jsxs)("main",{className:"min-h-screen w-full relative",children:[(0,r.jsx)("div",{className:"fixed inset-0 -z-10 h-screen",children:(0,r.jsxs)(o.Hl,{camera:{position:[0,0,1]},style:{background:"black"},children:[(0,r.jsx)(n.N,{enableZoom:!1,enablePan:!1,rotateSpeed:.5,autoRotate:!0,autoRotateSpeed:.5}),(0,r.jsx)(p,{}),(0,r.jsx)(f,{radius:100,depth:50,count:7e3,factor:4,saturation:.5,fade:!0,speed:.3})]})}),(0,r.jsx)("div",{className:"relative z-10",children:t})]})}},9324:()=>{}},e=>{var t=t=>e(e.s=t);e.O(0,[844,831,367,413,961,441,684,358],()=>t(4526)),_N_E=e.O()}]);