const config = {
  cloudinary: {
    API_NAME: 'fotososnowiec',
    API_KEY: '689599169355125',
    API_SECRET: 'WXLERFA7A_cHj9bZalKspEyp0NM',
    API_ENV: 'CLOUDINARY_URL=cloudinary://689599169355125:WXLERFA7A_cHj9bZalKspEyp0NM@fotososnowiec',
    urls: {
      upload: 'https://api.cloudinary.com/v1_1/${cloudName}/upload'
    }
  },
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebase: {
    apiKey: "AIzaSyDqHDb3Hk4ukPWFB7fP94ba9m_hwUZOP_M",
    authDomain: "fotososnowiec-2020.firebaseapp.com",
    databaseURL: "https://fotososnowiec-2020.firebaseio.com",
    projectId: "fotososnowiec-2020",
    storageBucket: "fotososnowiec-2020.appspot.com",
    messagingSenderId: "779828748910",
    appId: "1:779828748910:web:6f576a8317f17b5e997c7f",
    measurementId: "G-ZZRJEVLTG4"
  },
  defaults: {
    position: {
      lat: 50.2579,
      lng: 19.0210
    },
    firebaseCollection: 'fotos'
  }
}

export default config;