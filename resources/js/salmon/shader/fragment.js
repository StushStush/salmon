const fs_color0 = `

	uniform vec2 resolution;
	uniform float time;
	uniform vec3 mouse;
	varying vec2 vUv;
	varying vec3 vPosition;
    varying float vRadius;
	uniform float settEnergy_fs0;
	uniform float settTint_fs0;
    uniform float settPos_fs0;
    uniform float settScale_fs0;

    uniform float c_r;
    uniform float c_g;
    uniform float c_b;
    uniform float c_a;

    

    float map(float value, float min1, float max1, float min2, float max2) {
      return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }


    void main() {

        float timer = sin(time/10.);

        float v_y =  ( (gl_FragCoord.y/resolution.x) ) * settPos_fs0;
        float v_x =  ( (gl_FragCoord.x/resolution.y) ) * settPos_fs0;
        v_y += sin(v_y * settTint_fs0 -1.) * sin(v_x * settTint_fs0 * 1.) * timer;
        v_x += cos(v_x * settTint_fs0 -1.) * cos(v_y * settTint_fs0 * 1.);
        
        float c = 10.5 + 10.5 * sin(time) * settTint_fs0;
        
        vec3 color1 = vec3(1.0,0.0,1.0) * c_r;
        vec3 color2 = vec3(1.0,0.0,1.0) * c_g;
        vec3 color3 = vec3(1.0,1.0,0.0) * c_b;
        vec3 color4 = vec3(0.0,1.0,1.0) * c_a;
        
        vec3 colorTop = mix(color1, color2, (sin(v_y) - log(v_x)) );
        vec3 colorBtm = mix(color3, color4, (cos(v_x) + log(v_y)) * settEnergy_fs0 );
        vec3 outMix = mix(colorBtm, colorTop, (sin(v_y) + log(v_y)) * settScale_fs0 * timer );
    
        gl_FragColor = vec4(outMix, 1.0);
        gl_FragColor *= vec4(vRadius);
    }



`



const fs_color1 = `

    uniform vec2 resolution;
    uniform float time;
    uniform vec3 mouse;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vRadius;
    uniform float settEnergy_fs1;
    uniform float settTint_fs1;
    uniform float settPos_fs1;

    uniform float c_r;
    uniform float c_g;
    uniform float c_b;

    float map(float value, float min1, float max1, float min2, float max2) {
      return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }

    #define S sin
    #define C cos
    #define t time/5.
    #define X uv.x*2.
    #define Y uv.y*2.

    void main( void ) {
        vec2 uv = (( gl_FragCoord.xy-.5* resolution.xy )/resolution.y-.5) * settEnergy_fs1;
        
        vec2 direction = normalize(vPosition.xy - mouse.xy);
        float dist = length(vPosition - mouse);
        float prox = 1. - map( dist, 0.0 ,0.4, 0.0, 0.1 );
        prox = clamp(prox, 0.0, 1.0 );

        float c = (S( X/settTint_fs1 + Y/15. ) * S( X/20. + t + S( 2. * t + Y/settPos_fs1 ) )) * dist;

        gl_FragColor = vec4( vec3( c_r, c + c_g , c + c_b ), 1.0 );
        gl_FragColor *= vec4(vRadius);

    }


`



const fs_color2 = `


    uniform vec2 resolution;
    uniform float time;
    uniform vec3 mouse;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vRadius;
    uniform float settEnergy_fs2;
    uniform float settTint_fs2;
    uniform float settPos_fs2;

    uniform float c_r;
    uniform float c_g;
    uniform float c_b;

    float map(float value, float min1, float max1, float min2, float max2) {
      return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }


     void main(){


        vec2 direction = normalize(vPosition.xy - mouse.xy);
        float dist = length(vPosition - mouse);
        float prox = (1.) - map( dist, 0.0 ,0.4, 0.0, 0.1 );
        prox = clamp(prox, 0.0, 1.0 );


        vec2 p=(2.0*gl_FragCoord.xy-resolution)/max(resolution.x,resolution.y)  * settPos_fs2;
        
        float numbers_wave = settTint_fs2;
        float blur_wave = settEnergy_fs2;

        for( float i=blur_wave; i < numbers_wave; i++){

            p.x += .5/i*cos(i*p.y )+10.;
            p.y += .5/i*sin(i*p.x )+30.;
        } 
        
        p.y += sin(time/10.);
        p.x += sin(time/10.);
        
        vec3 col= vec3( 
            (abs(sin(2.*p.x + p.y))*1.3) * c_r,  
            (abs(cos(1.*p.y + p.x))+0.3) * c_g, 
            (abs(sin(.5*p.x+p.y))+0.3) * c_b
            );

        float out_color = sqrt( col.x * col.x + col.y * col.y + col.z * col.z );

        gl_FragColor=vec4( col / out_color, 1.0);
        gl_FragColor *= vec4(vRadius);
    }
   
  

`



const fs_color3 = `

    uniform vec2 resolution;
    uniform float time;
    uniform vec3 mouse;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vRadius;
    uniform float settEnergy_fs3;
    uniform float settTint_fs3;
    uniform float settPos_fs3;
    uniform float c_r;
    uniform float c_g;
    uniform float c_b;

    float map(float value, float min1, float max1, float min2, float max2) {
      return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }


    void main( void ) {

    float pi = 3.141592;

    vec2 direction = normalize(vPosition.xy - mouse.xy);
    float dist = length(vPosition - mouse);
    float prox = (1.) - map( dist, 0.0 ,0.4, 0.0, 0.1 );
    prox = clamp(prox, 0.0, 1.0 );


    // vec3 uvA = vec3(gl_FragCoord.x / resolution.x) * settEnergy_fs3 * prox;
    // vec3 uvB = vec3(gl_FragCoord.y / resolution.y) * settEnergy_fs3 * dist;

    vec3 uvA = vec3(gl_FragCoord.x / resolution.x) * settEnergy_fs3 ;
    vec3 uvB = vec3(gl_FragCoord.y / resolution.y) * settEnergy_fs3 ;
    float timer = time/10.;
    vec3 rgbA = 

        vec3( 
            0., 
            2. * pi / 3., 
            4. * pi / 3.
        );

    vec3 rgbB = 

        vec3(
            (4.) + c_r, 
            (0. * pi / 3.) + c_g, 
            (2. * pi / 3.) + c_b
        ) * timer;

    

    vec3 colorA = cos( settEnergy_fs3 * uvA - rgbA ) * settTint_fs3 + 0.5;
    vec3 colorB = sin( settEnergy_fs3 * uvB - rgbB ) * settTint_fs3 + 0.5;

    vec3 outColor = mix(colorA, colorB, settPos_fs3);
    

    gl_FragColor = vec4(outColor, 1.0 );
    gl_FragColor *= vec4(vRadius);


}

`


const fs_color4 = `

    uniform vec2 resolution;
    uniform float time;
    uniform vec3 mouse;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vRadius;
    uniform float settEnergy_fs4;
    uniform float settTint_fs4;
    uniform float settPos_fs4;
    uniform float settScale_fs4;

    uniform float c_r;
    uniform float c_g;
    uniform float c_b;
    uniform float c_a;

    float map(float value, float min1, float max1, float min2, float max2) {
      return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }


    vec3 hsv2rgb(vec3 c)
    {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main( void ) {



        vec2 uv = ((( gl_FragCoord.xy - (settScale_fs4) * resolution )/resolution.y) * settTint_fs4) * 12.;

            vec2 direction = normalize(vPosition.xy - mouse.xy);
            float dist = length(vPosition - mouse);
            float prox = 1. - map( dist, 0.0 ,0.4, 0.0, 0.1 );
            prox = clamp(prox, 0.0, 1.0 );

        float StarColor = 
            cos( 
                sin( (uv.x) * (uv.y) * cos( settEnergy_fs4 * 3. ) / 64. ) + (((uv.x) *(uv.y)+(uv.x) *(uv.y)) / 9. - settEnergy_fs4 ) 
            * settPos_fs4  + sin(time /2.));

        vec3 colorA = vec3(c_r,c_g,c_b);
        vec3 colorB = hsv2rgb(vec3(c_b,c_r,c_g));
        vec3 outShader = mix(colorA,colorB, StarColor );
        gl_FragColor = vec4( outShader, 1. );
        gl_FragColor *= vec4(vRadius);
    }


`





const fs_color5 = `


    uniform vec2 resolution;
    uniform float time;
    uniform vec3 mouse;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying float vRadius;

    uniform float settEnergy_fs5;
    uniform float settTint_fs5;
    uniform float settPos_fs5;
    uniform float settScale_fs5;

    uniform float c_r;
    uniform float c_g;
    uniform float c_b;
    uniform float c_a;


    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 2.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }



    float snoise(vec3 v){

        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

        // First corner
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 =   v - i + dot(i, C.xxx) ;

        // Other corners
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );

        //   x0 = x0 - 0.0 + 0.0 * C.xxx;
        //   x1 = x0 - i1  + 1.0 * C.xxx;
        //   x2 = x0 - i2  + 2.0 * C.xxx;
        //   x3 = x0 - 1.0 + 3.0 * C.xxx;
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
        vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

        // Permutations
        i = mod289(i);
        vec4 p = permute( permute( permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        // Gradients: 7x7 points over a square, mapped onto an octahedron.
        // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
        float n_ = 0.142857142857; // 1.0/7.0
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );

        //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
        //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        //Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        // Mix final noise value
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
        dot(p2,x2), dot(p3,x3) ) );
    }


    float hue2rgb(float f1, float f2, float hue) {
        if (hue < 0.0)
            hue += 1.0;
        else if (hue > 1.0)
            hue -= 1.0;
        float res;
        if ((6.0 * hue) < 1.0)
            res = f1 + (f2 - f1) * 6.0 * hue;
        else if ((2.0 * hue) < 1.0)
            res = f2;
        else if ((3.0 * hue) < 2.0)
            res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
        else
            res = f1;
        return res;
    }

    vec3 hsl2rgb(vec3 hsl) {
        vec3 rgb;
        
        if (hsl.y == 0.0) {
            rgb = vec3(hsl.z); // Luminance
        } else {
            float f2;
            
            if (hsl.z < 0.5)
                f2 = hsl.z * (1.0 + hsl.y);
            else
                f2 = hsl.z + hsl.y - hsl.y * hsl.z;
                
            float f1 = 2.0 * hsl.z - f2;
            
            rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));
            rgb.g = hue2rgb(f1, f2, hsl.x);
            rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));
        }   
        return rgb;
    }

    vec3 hsl2rgb(float h, float s, float l) {
        return hsl2rgb(vec3(h, s, l));
    }



    void main( void ) {

        float timer = sin(time/10.);


        vec2 uv = ( gl_FragCoord.xy / resolution.xy );

        vec2 center = uv ;
        center.x += length(cos(center.y * settEnergy_fs5) + settTint_fs5);
        center.y += length(cos(center.x * settEnergy_fs5) - settTint_fs5);

        float s = snoise( vec3((center), settScale_fs5)  * timer); 

        vec3 colorA = vec3(uv.x * c_r, uv.y * c_g, c_b);
        vec3 colorB = hsl2rgb((s * (settPos_fs5) + .2), .5, .5);

        vec3 outColor = mix(colorA, colorB, s);
        gl_FragColor = vec4(vec3(outColor), 1.);
        gl_FragColor *= vec4(vRadius);

    }


`



export { fs_color0, fs_color1, fs_color2, fs_color3, fs_color4, fs_color5 } 

