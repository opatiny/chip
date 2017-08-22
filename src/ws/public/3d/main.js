var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

var currentInfo={x:0, y:0, z:0};

function init() {
    scene = new THREE.Scene();

    initCube();
    initCamera();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initCube() {
    cube = new THREE.Mesh(new THREE.CubeGeometry(2, 1, 0.1), new THREE.MeshNormalMaterial());
    scene.add(cube);
}

function rotateCube() {
    cube.rotation.x = currentInfo * Math.PI;
    cube.rotation.y = currentInfo * Math.PI;
    cube.rotation.z = currentInfo * Math.PI;
	console.log(cube.rotation);
}

function render() {
    requestAnimationFrame(render);
    rotateCube();
    renderer.render(scene, camera);
}

function initWS() {
    var host = window.document.location.host.replace(/:.*/, '');
    var secure = window.document.location.protocol.replace('http','');
    var port = window.document.location.port;
    if (port) port = ':'+port;
    var ws = new WebSocket('ws'+secure+'//' + host + port);
    ws.onmessage = function (event) {
        currentInfo = JSON.parse(event.data);
    };
}


initWS();
init();
render();
