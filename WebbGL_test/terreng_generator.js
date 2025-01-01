

var sliders = document.getElementsByClassName("slider");

var settingtags = document.getElementsByClassName("setting");

for (var i = settingtags.length - 1; i >= 0; i--) {

    sliders[i].addEventListener('change', update_terrain);

}

document.getElementById("go_btn").addEventListener('click', changeCords);




	var strävhetv;
	var kull_storlek;
	var lager1;

	var bstorlek;
	var baltitudpotens;
    var btäthet;

    var kstorlek;
    var ktäthet;
    var kaltitudpotens;

	var vattennivå;
	var öutformning;

    var altitudsgräns;

  



var scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 150);
camera.position.z = 100;
camera.position.y = 90;
camera.lookAt(new THREE.Vector3(0, 40, 60));


var renderer = new THREE.WebGLRenderer({
    antialiasing: true
});
renderer.setClearColor("#111133");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



var terrain_material = new THREE.MeshLambertMaterial({
    vertexColors: THREE.VertexColors
});

var waterMaterial = new THREE.MeshLambertMaterial({
    color: 0x333388
    , transparent: true
    , opacity: 0.7
});



var columns = 80;
var rows = 150;
var quadSize = 1;

var terrain;

var offsetx = Math.random() * 99999;
var offsetz = Math.random() * 99999;




create_terrain();

function create_terrain() {

    terrain = new THREE.Mesh(generate_mesh(), terrain_material);
    calculate_colors(terrain.geometry);   
    terrain.position.x = rows * quadSize * -0.5;
    terrain.position.y = 20;
    scene.add(terrain);

    water = new THREE.Mesh(generate_water(), waterMaterial);
    water.position.x = rows * quadSize * -0.5;
    scene.add(water);

}

function update_terrain() {

    terrain.geometry = generate_mesh(false);
    water.geometry = generate_water();
    calculate_colors(terrain.geometry);
    renderer.render(scene, camera);
}

function changeCords() {

    terrain.geometry = generate_mesh(true);
    calculate_colors(terrain.geometry);
    renderer.render(scene, camera);
}




function update_settings() {


    factorsettinglistan = [];
    settingvals = [strävhetv , kull_storlek, lager1, bstorlek, baltitudpotens, btäthet, kstorlek, ktäthet, kaltitudpotens, vattennivå, öutformning, altitudsgräns];
  
        for (var i = 0; i < settingtags.length; i++) {

            settingvals[i] = parseFloat(settingtags[i].children[2].innerHTML) * 0.01 * settingtags[i].getAttribute("data-maxoutput");

        
        }

     strävhetv = settingvals[0];
     kull_storlek = settingvals[1];
     lager1 = settingvals[2];

     bstorlek = settingvals[3];
     baltitudpotens = settingvals[4];
     btäthet = settingvals[5];

      ktäthet  = settingvals[6];
     kstorlek = settingvals[7];
     kaltitudpotens = settingvals[8];

     vattennivå = settingvals[9];
     öutformning = settingvals[10];

     altitudsgräns = settingvals[11];



    
}


function gen_island(waterlevel, heightfactor) {

    var valuelist = [];
    update_settings();

    for (var z = 0; z <= columns; z++) {

        for (var x = 0; x <= rows; x++) {

            dist = -Math.sqrt(Math.pow(z - (columns * 0.5), 2) + Math.pow(x - (rows * 0.5), 2));

            dist += 20;


            valuelist.push(dist * (heightfactor));

        }

    } 

    return valuelist;
}


function generate_mesh(randomisePos) {


    update_settings();
    valuelist = gen_island(vattennivå, öutformning);//här hämtas hur mycket öformationen påvärkar fomen på landskapet;


    if (randomisePos) {

        offsetx = Math.random() * 9999;
        offsetz = Math.random() * 9999;

    }

    var geometry = new THREE.Geometry();


    var bergnoiseindex = []; 

    var islandvalue = 0;

    for (var z = 0; z <= columns; z++) {

        for (var x = 0; x <= rows; x++) {

            var y = 0;



            layer_start = noise.perlin2((x * 0.015) + offsetx, (z * 0.015) + offsetz) * lager1;
            

            


            punktberg = noise.perlin2((x * btäthet) + offsetx, (z * btäthet) + offsetz) * bstorlek;
            
          




            kedjor = noise.perlin2((x * ktäthet) + offsetx, (z * ktäthet) + offsetz) * (kstorlek * -1) +3;




            kedjor = (1 - Math.abs(kedjor));
          




            strävhet = noise.perlin2((x * 0.3) + offsetx, (z * 0.3) + offsetz) * strävhetv ;



            kullstorlek = noise.perlin2((x * 0.1) + offsetx, (z * 0.1) + offsetz) * kull_storlek;



            y = layer_start + kullstorlek + strävhet + kedjor + punktberg;


            y = y + valuelist[islandvalue];


            islandvalue++;
       



            geometry.vertices.push(new THREE.Vector3(x * quadSize, y, z * quadSize));




            var bergnoise = noise.perlin2((x * 0.1) + (offsetx * 5), (z * 0.1) + (offsetz * 5));
            bergnoiseindex.push(bergnoise);




        }
    }


    var i = 0;
    for (var z = 0; z < columns; z++) {

        for (var x = 0; x < rows; x++) {

            var tri1 = new THREE.Face3(i, rows + (i + 1), i + 1);
            var tri2 = new THREE.Face3(i + 1, rows + (i + 1), rows + (i + 2))

            geometry.faces.push(tri2);
            geometry.faces.push(tri1);

            i++;

        }

        i++;
    }


    return (geometry);


}

 

function calculate_colors(geometry) {



    geometry.faces = [];
    update_settings();
    var i = 0
    bergnoiseindex = 5;
    stenighet = 3;





    sand = new THREE.Color(0x555555);


    for (var z = 0; z < columns; z++) {

        for (var x = 0; x < rows; x++) {

        
            

           

            var tri1 = new THREE.Face3(i, rows + (i + 1), i + 1);
            var tri2 = new THREE.Face3(i + 1, rows + (i + 1), rows + (i + 2))



            v0 = geometry.vertices[i];
            v1 = geometry.vertices[i + 1 + rows];
            v2 = geometry.vertices[i + 1];
            v3 = geometry.vertices[i + rows + 2];





            v0c = new THREE.Color();
            v1c = new THREE.Color();
            v2c = new THREE.Color();
            v3c = new THREE.Color();

            var vectorColors = [v0c, v1c, v2c, v3c]; 


      
            var gri = Math.random();


     


            v0v = bergnoiseindex[i];
            v1v = bergnoiseindex[i + 1 + rows];
            v2v = bergnoiseindex[i + 1];
            v3v = bergnoiseindex[i + rows + 2];




            function makeGrass(){


                gräs0 = new THREE.Color(0x224400);
                gräs1 = new THREE.Color(0x004422);
                gräs2 = new THREE.Color(0x225522);
                gräs3 = new THREE.Color(0x224422);
                gräs4 = new THREE.Color(0x113311);
                gräs5 = new THREE.Color(0x226622);

                var colarray = [gräs0, gräs1, gräs2, gräs3, gräs4, gräs5];

                gri = Math.random();
                gri *= 5;
                gri = Math.round(gri);
            
                          return(colarray[gri]);

            };

             function makeBerg(){


                berg0 = new THREE.Color(0x383838);              
                berg1 = new THREE.Color(0x353535);
                berg2 = new THREE.Color(0x404040);
               


                gri = Math.random();
                gri *= 2;
                gri = Math.round(gri);


                var colarray = [berg0, berg1, berg2];

            
                          return(colarray[gri]);

            };


          
         
           
           



          


            if (v0.y > altitudsgräns - 5) {

                  tri1.vertexColors[0] = makeBerg();
               
            }else{

                tri1.vertexColors[0] = makeGrass();

            }
          


            if (v1.y > altitudsgräns - 5) {

                     tri1.vertexColors[1] = makeBerg();
                 tri2.vertexColors[1] = makeBerg();


            }else{

                     tri1.vertexColors[1] = makeGrass();
                 tri2.vertexColors[1] = makeGrass();

            }




            if (v2.y > altitudsgräns - 5) {

               
 tri1.vertexColors[2] = makeBerg();
            tri2.vertexColors[0] = makeBerg();


            }else{

                 tri1.vertexColors[2] = makeGrass();
            tri2.vertexColors[0] = makeGrass();


            }


            if (v3.y > altitudsgräns - 5) {

                 tri2.vertexColors[2] = makeBerg();

            }else{


                 tri2.vertexColors[2] = makeGrass();

            }






            geometry.faces.push(tri2);
            geometry.faces.push(tri1);

            i++;

        }

        i++;

    }

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

}




function createTrees(vertices, settinglist) {



    for (var i = vertices.length - 1; i >= 0; i--) {



        if (vertices[i].y > settinglist) {


        }



    }

    renderer.render(scene, camera);

}




function generate_water(waterlevel) {



    update_settings();


    var waterG = new THREE.Geometry();



    for (var z = 0; z <= columns; z++) {

        for (var x = 0; x <= rows; x++) {


            waterG.vertices.push(new THREE.Vector3(x * quadSize, vattennivå, z * quadSize));

        }
    }


    var i = 0;
    for (var z = 0; z < columns; z++) {

        for (var x = 0; x < rows; x++) {

            var tri1 = new THREE.Face3(i, rows + (i + 1), i + 1);
            var tri2 = new THREE.Face3(i + 1, rows + (i + 1), rows + (i + 2))

            waterG.faces.push(tri2);
            waterG.faces.push(tri1);

            i++;

        }

        i++;
    }

    waterG.computeFaceNormals();
    waterG.computeVertexNormals();
    return (waterG);

}




var light = new THREE.DirectionalLight(0xFFFFFF, 1, 500);
var alight = new THREE.AmbientLight(0xffffff, 1);
light.target = terrain;
light.position.set(10, 0, 25);
scene.add(light, alight);


renderer.render(scene, camera);
