// load required modules 
// includes illustrator stile (some libraries did not work)
// #include "/Users/andreasfrutiger/Daten/ds_Admin_Andreas/Studium/Vorlagen/Illustrator/Javascripts/test.js"

function Mologram(N,f,wl,r,n_m) {

	// calculates the mologram according to Christof Fattinger's formula, published in Phys, Rev X 2014. Focal Molography: Coherent Microscopic Detection of Biomolecular Interaction

	this.N = N; // effective refractive index waveguide
	this.f = f; // focal point of mologram (um)
	this.wl = wl; // readout wavelength (um)
	this.r = r; // radius of the mologram
	this.n_m = n_m; // medium refractive index.
	this.j_0 = Math.abs(f)*n_m/wl;
	
	this.calc_x_coordinate_of_mololine = function (j,y) {

		return (this.wl*this.N*(this.j_0+j)
			-Math.sqrt(Math.pow(this.n_m,2)*(Math.pow(this.N,2)-Math.pow(this.n_m,2))
				*(Math.pow(y,2)+Math.pow(f,2))+
				Math.pow((this.n_m*this.wl),2)*Math.pow(this.j_0+j,2)))/(Math.pow(this.N,2)-Math.pow(this.n_m,2))

	};

	this.calc_y_coordinate_of_mololine = function(j,x) {

		return Math.sqrt(Math.pow(this.N,2)*Math.pow(x,2) 
			- 2*this.N*this.f*x*this.n_m - 2*this.N*j*this.wl*x + 2*this.f*j*this.wl*this.n_m + 
			Math.pow(j,2)*Math.pow(this.wl,2) - Math.pow(x,2)*Math.pow(n_m,2))/this.n_m

	}

	this.draw_molo_line = function(docRef,array_of_points) {
		// draws a path with the specified number of points
		var myLine = docRef.pathItems.add();
		// //set stroked to true so we can see the path
		myLine.stroked = false;
		var colorRef = new RGBColor;
		colorRef.blue = 255;
		myLine.fillColor = colorRef;
		myLine.setEntirePath(array_of_points);


	}


	
}


var mologram = new Mologram(1.814,900,0.635,200,1.512)

var test = mologram.calc_x_coordinate_of_mololine(2.5,2);


var docRef = documents.add();
var artLayer = docRef.layers[0];

var grooves = artLayer.pathItems.ellipse(200,-200,400,400)
grooves.stroked = false;
var colorRef = new RGBColor;
colorRef.green = 255;
grooves.fillColor = colorRef;

docRef.layers.add()
var artLayer = docRef.layers[0];

// draw the mololines

for (var j = 630; j >= -479; j--) {

	points = []

	// draw the first half of the ridge
	for (var i = 200; i >= -201; i--) {

	points.push([i, mologram.calc_x_coordinate_of_mololine(j-0.25,i)])

	}
	// draw the second half of the ridge
	for (var i = -201; i <= +201; i++) {

	points.push([i, mologram.calc_x_coordinate_of_mololine(j+0.25,i)])

	}

	mologram.draw_molo_line(artLayer,points)
}

docRef.layers.add()

// the added item is always the first entry of the list. 
var artLayer2 = docRef.layers[0]

var ell1 = artLayer2.pathItems.ellipse(200,-200,400,400)
ell1.stroked = false;
var colorRef = new RGBColor;
colorRef.green = 255;
ell1.fillColor = colorRef;

// create the bragg circle

docRef.layers.add()

var bragglayer = docRef.layers[0]

var ell2 = bragglayer.pathItems.ellipse(-25,-520,1040,1040)

var ell3 = bragglayer.pathItems.ellipse(25,-570,1140,1140)

