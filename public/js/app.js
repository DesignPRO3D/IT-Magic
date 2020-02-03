// Start with Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Service worker registered!');
    });
}

// Install app on home screen 
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  defferedPrompt = event;
  return false;
});

const shareBtn = document.getElementById('share-btn');

shareBtn.addEventListener('click', function() {
  if (defferedPrompt) {
    defferedPrompt.prompt();
    defferedPrompt.userChoice.then(function(result) {
      console.log(result.outcome);

      if (result.outcome === 'dismissed') {
        console.log('User cancelled instalation');
      } else {
        console.log('User added to home screen');
      }
    });

    defferedPrompt = null;
  }
});


// Get the current year of the copyright
$('#year').text(new Date().getFullYear());

// Init Scrollspy
// Init Scrollspy
$('body').scrollspy({ target: '#main-nav' });

// Smooth Scrolling
$("#main-nav a, #showcase .btn").on('click', function (event) {
  if (this.hash !== "") {
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function () {

      window.location.hash = hash;
    });
  }
});

// Calculate SIMPLE PANEL
new Vue({
  el: '#appCalcSimplePanel',
  data: {
    gap: 0,
    length: null,
    barDiameter: null,
    barNumber: null,
    startPoints: []
  },
  methods: {
    calculateGap: function() {
      const length = parseFloat(this.length);
      const barD = parseFloat(this.barDiameter);
      const barN = parseFloat(this.barNumber);

      if (length > (barD * barN) && barD > 0 && barN > 0) {
        const gap = ( length - barD * barN ) / (barN + 1);
        this.gap = gap.toFixed(1);
        this.calculateStartPoints();
        const panelData = {
          gap: this.gap,
          length: this.length, 
          barDiameter: this.barDiameter, 
          barNumber: this.barNumber, 
          startPoints: this.startPoints
        }
        localStorage.setItem('SimplePanel', JSON.stringify(panelData));
      } else {
        this.gap = 0;
        this.startPoints = [];
      }
    },
    calculateStartPoints: function() {
      const barD = parseFloat(this.barDiameter);
      const barN = parseFloat(this.barNumber);
      const gap = parseFloat(this.gap);
      if (this.gap < 1) {
        this.startPoints = [];
        return;
      }
      let starts = [];
      let start_x = parseFloat(gap + barD / 2);
      const center = parseFloat(gap + barD);
      starts.push(parseFloat(start_x.toFixed(0)));
      for (let i = 1; i < barN; i++) {
        start_x += center;
        starts.push(Math.round(start_x));
      }
      this.startPoints = starts;
    }
  },
  mounted() {
    const storageData = JSON.parse(localStorage.getItem('SimplePanel'));
    if (storageData) {
      this.gap = storageData.gap;
      this.length = storageData.length;
      this.barDiameter = storageData.barDiameter;
      this.barNumber = storageData.barNumber;
      this.startPoints = storageData.startPoints;
    }
  }
});

// Calculate TAPERED TREADS
new Vue({
  el: '#tapperedTreads',
  data: {
    radiusOUT: null,
    radiusIN: null,
    angle: null,
    treadNumber: null,
    lMid: 0,
    angleTread: 0,
    stairWidth: 0,
    d1: 0,
    d2: 0
  },
  methods: {
    calculateData: function() {

      const _Rout = parseFloat(this.radiusOUT);
      const _Rin = parseFloat(this.radiusIN);
      const _angle = parseFloat(this.angle);
      const _treadNum = parseFloat(this.treadNumber);

      const _width = _Rout - _Rin;
      const _angleT = _angle / _treadNum;
      const _angleRad = (_angleT/2) / 180 * Math.PI;
      const _RMid = _Rout - (_width/2);
      const _LMid = 2 * Math.PI * _RMid / 360 * _angleT;
      const _D1 = Math.sin(_angleRad) * _Rin;
      const _D2 = Math.sin(_angleRad) * _Rout;

      if (_Rout && _Rin && _angle && _treadNum) {
        this.lMid = Number(_LMid.toFixed(1));
        this.stairWidth = Number(_width.toFixed(0));
        this.angleTread = Number(_angleT.toFixed(1));
        this.d1 = Number(_D1.toFixed(1));
        this.d2 = Number(_D2.toFixed(1));

        const storageData = {
          radiusOUT: this.radiusOUT,
          radiusIN: this.radiusIN,
          angle: this.angle,
          treadNumber: this.treadNumber,
          lMid: this.lMid,
          angleTread: this.angleTread,
          stairWidth: this.stairWidth,
          d1: this.d1,
          d2: this.d2
        }
        localStorage.setItem('tapperedTreadsStair', JSON.stringify(storageData));
      } else {
        this.lMid = 0;
        this.stairWidth = 0;
        this.angleTread = 0;
        this.d1 = 0;
        this.d2 = 0;
      }
      
    }
  },
  mounted() {
    const storageData = JSON.parse(localStorage.getItem('tapperedTreadsStair'));
    if (storageData) {
          this.radiusOUT = storageData.radiusOUT,
          this.radiusIN = storageData.radiusIN,
          this.angle = storageData.angle,
          this.treadNumber = storageData.treadNumber,
          this.lMid = storageData.lMid,
          this.angleTread = storageData.angleTread,
          this.stairWidth = storageData.stairWidth,
          this.d1 = storageData.d1,
          this.d2 = storageData.d2
    }
  }
});