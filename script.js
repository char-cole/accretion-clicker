// data for conversion
// 1 solar mass ~ 2x10^30 (2000000000000000000000000000000)
// minimum size for fusion ~ 0.08 solar mass (160000000000000000000000000000)
// minimum size of gas giant ~ 50 earth mass
// earth mass ~ 5.972 x 10^24 (5972000000000000000000000)
// smallest spherical rocky (Pallas) ~ 2.11 x 10^20 (211000000000000000000)

var massData = {
  totalMass: 500,
  auto: 0
}

var size = {
  sunW: 100,
  sunH: 100
}

// Different timing for the three ranges of Automatter
setInterval(addRock, 500);
// setInterval(addAsteroid, 2000);
// setInterval(addMoon, 5000);


// Determines mass and displays in UI converted to appropriate unit of measurement
function printData() {
  // mass unit conversion data
  var convert = {
    solar: massData.totalMass / 2e30,
    earth: massData.totalMass / 5.972e24,
    lunar: massData.totalMass / 7.342e22
  }
  if (massData.totalMass >= 1e29) {
    $('#reportMass').text(convert.solar.toFixed(3) + " solar masses")
  } else if (massData.totalMass >= 1e23) {
    $('#reportMass').text(convert.earth.toFixed(3) + " earth masses")
  } else if (massData.totalMass >= 1e20) {
    $('#reportMass').text(convert.lunar.toFixed(3) + " lunar masses")
  } else if (massData.totalMass >= 1e7) {
    $('#reportMass').text((massData.totalMass).toExponential(3) + " kg")
  } else {
    $('#reportMass').text((massData.totalMass) + " kg")
  }
}

// Determine which image to show based on actual mass, runs on every mass change
function sizeCheck() {
  if (massData.totalMass > 1.6e29) {
    document.getElementById("sunPic").style.backgroundImage = "url('img/sun-shiny.png')";
    document.getElementById("sunPic").style.backgroundSize = "110%";
    $("#announce").text("Nuclear fusion achieved!");
    $("#instruct").text("Earth's sun is 1.989e+30kg. The largest known stars are 300 times that!");
  } else if (massData.totalMass > 2.5e26) {
    document.getElementById("sunPic").style.backgroundImage = "url('img/gas-giant.png')";
    document.getElementById("sunPic").style.backgroundSize = "75%";
    $("#announce").text("Almost there! You have a gas giant!");
  } else if (massData.totalMass > 2.11e20) {
    document.getElementById("sunPic").style.backgroundImage = "url('img/rocky-planet.png')";
    document.getElementById("sunPic").style.backgroundSize = "45%";
    $("#announce").text("Like very large asteroids and moons, your object is crushed into a sphere by gravity!");
  } else {
    document.getElementById("sunPic").style.backgroundImage = "url('img/rock.png')";
    document.getElementById("sunPic").style.backgroundSize = "20%";
    if (massData.totalMass >= 1e11) {
      $("#announce").text("Your object has surpassed the mass of 101955 Bennu, which is about 0.25km long.")
    }
  }
}

// accumulates average Automatter per second
function checkAuto() {
  var autoMPS = massData.auto * 2;
  $('#reportAuto').text("Mass per second: " + autoMPS.toExponential(3) + " kg");
}

// Checks current value of clicking to add mass and updates display
function checkClick() {
  $("#clickMe").children("span").text(clickAdd.toExponential(2));
}

// consolidates updates into one function
function runUpdates() {
  sizeCheck();
  printData();
  checkClick();
  checkAuto();
}

// Recurring event to update mass for each auto-add
function addRock() {
  massData.totalMass += massData.auto;
  runUpdates();
}

// Adds set amount to mass on click
var clickAdd = 1000;
$('#clickMe').click(function () {
  massData.totalMass += clickAdd;
  runUpdates();
})

// Spend mass on auto-add capability
$(".buy").click(function (){
  var addVal = $(this).data("cost");
  if ($(this).data("cost") < massData.totalMass ) {
    massData.totalMass -= $(this).data("cost")
    $(this).data("cost", parseInt($(this).data("cost") * 1.05) );
    $(this).children("span").text(addVal.toExponential(3));
    if ($(this).data("mass") === 100000) {
      massData.auto += 100000;
      clickAdd += 500000;
    } else if ($(this).data("mass") === 10000000000) {
      massData.auto += 10000000000;
      clickAdd += 100000000000;
    } else if ($(this).data("mass") === 100000000000000000000) {
      massData.auto += 100000000000000000000;
      clickAdd += 100000000000000000000;
    } else if ($(this).data("mass") === 10000000000000000000000) {
      massData.auto += 10000000000000000000000;
      clickAdd += 10000000000000000000000;
    } else {
      massData.auto += 1000;
    }
  }
  runUpdates();
})
