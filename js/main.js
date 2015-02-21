(function() {
  
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth - 25, window.innerHeight - 25);
    document.body.appendChild(renderer.domElement);
    
    function createBox(width, height, depth) {
        var boxObj = new THREE.Object3D();
        var boxMat = new THREE.MeshBasicMaterial({
            color: 0x00FF00,
            wireframe: true,
            side: THREE.DoubleSide
        });
        
        var x = width/2;
        var y = height/2;
        var z = depth/2;
        
        /*
         *     1.+-----2+
         *    .' |    .'|
         *  0+---+-3+'  |
         *   |   |  |   |
         *   | 5,+--+--6+
         *   |.'    | .' 
         *  4+-----7+'   
         */
        
        var left = new THREE.PlaneGeometry(depth, height, 4, 4);
        var leftMesh = new THREE.Mesh(left, boxMat);
        leftMesh.rotation = new THREE.Euler(0, Math.PI/2, 0, 'XYZ');
        leftMesh.position = new THREE.Vector3(-x, 0, 0);
        
        var rightMesh = leftMesh.clone();
        leftMesh.position = new THREE.Vector3(x, 0, 0);
        
        var top = new THREE.PlaneGeometry(width, depth, 4, 4);
        var topMesh = new THREE.Mesh(top, boxMat);
        topMesh.rotation = new THREE.Euler(Math.PI/2, 0, 0, 'XYZ');
        topMesh.position = new THREE.Vector3(0, y, 0);
        
        var bottomMesh = topMesh.clone();
        bottomMesh = new THREE.Vector3(0, -y, 0);
        
        
        boxObj.add(leftMesh);
        boxObj.add(rightMesh);
        boxObj.add(topMesh);
        boxObj.add(bottomMesh);
        
        return boxObj;
    }
    
    /* Pitch Box */
    
    scene.add(createBox(1, 1, 1));
    
    /* Ball */
    var ballGeom = new THREE.SphereGeometry(0.1, 32, 32);
    var ballMat  = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    var ballMesh = new THREE.Mesh(ballGeom, ballMat);
    
    scene.add(ballMesh);
    
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    requestAnimationFrame(render);    
    
})();