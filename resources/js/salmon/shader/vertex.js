const vshader = `

uniform float time;

uniform vec3 mouse;
varying vec2 vUv;
varying vec3 vPosition;
varying float vRadius;
uniform float light_sett;


void main() {

	vUv = uv;
	vPosition = position;
	float dist = distance(uv,vPosition.xy);
	vRadius = dist * light_sett;

	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}


`

export default vshader


