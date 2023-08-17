const UISwitcherHTML = `
<style type="text/css">
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @-webkit-keyframes come-in {
    0% {
      -webkit-transform: translatey(100px);
      transform: translatey(100px);
      opacity: 0;
    }
    30% {
      -webkit-transform: translateX(-50px) scale(0.4);
      transform: translateX(-50px) scale(0.4);
    }
    70% {
      -webkit-transform: translateX(0px) scale(1.2);
      transform: translateXe(0px) scale(1.2);
    }
    100% {
      -webkit-transform: translatey(0px) scale(1);
      transform: translatey(0px) scale(1);
      opacity: 1;
    }
  }
  @keyframes come-in {
    0% {
      -webkit-transform: translatey(100px);
      transform: translatey(100px);
      opacity: 0;
    }
    30% {
      -webkit-transform: translateX(-50px) scale(0.4);
      transform: translateX(-50px) scale(0.4);
    }
    70% {
      -webkit-transform: translateX(0px) scale(1.2);
      transform: translateX(0px) scale(1.2);
    }
    100% {
      -webkit-transform: translatey(0px) scale(1);
      transform: translatey(0px) scale(1);
      opacity: 1;
    }
  }

  .floating-container {
    position: fixed;
    width: 150px;
    height: 30px;
    bottom: 0;
    right: 0;
    margin: 25px;
    z-index: 99;
    font-family: 'Roboto', sans-serif;
  }

  .floating-container:hover {
    height: 300px;
  }

  .floating-container:hover .floating-button {
    box-shadow: 0 10px 25px rgba(44, 179, 240, 0.6);
    -webkit-transform: translatey(5px);
    transform: translatey(5px);
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .floating-container .element-container a {
    color: #444;
    text-decoration: none;
  }

  .floating-container:hover .element-container .float-element:nth-child(1) {
    -webkit-animation: come-in 0.4s forwards 0.2s;
    animation: come-in 0.4s forwards 0.2s;
  }
  .floating-container:hover .element-container .float-element:nth-child(2) {
    -webkit-animation: come-in 0.4s forwards 0.4s;
    animation: come-in 0.4s forwards 0.4s;
  }
  .floating-container:hover .element-container .float-element:nth-child(3) {
    -webkit-animation: come-in 0.4s forwards 0.6s;
    animation: come-in 0.4s forwards 0.6s;
  }

  .floating-container .floating-button {
    position: absolute;
    width: 32px;
    height: 32px;
    background: #fff;
    bottom: 0;
    border-radius: 50%;
    left: 0;
    right: 0;
    margin: auto;
    color: white;
    line-height: 65px;
    text-align: center;
    font-size: 23px;
    z-index: 100;
    box-shadow: 0 10px 25px -5px rgba(44, 179, 240, 0.6);
    cursor: pointer;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .floating-container .floating-button img {
    width: 80%;
  }

  .floating-container .float-element {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    border-radius: 6px;
    border: 1px solid #EEE;
    padding: 0 16px;
    width: content;
    max-width: 200px;
    height: 50px;
    margin: 15px auto;
    color: white;
    font-weight: 500;
    text-align: center;
    line-height: 50px;
    z-index: 0;
    opacity: 0;
    background-color: #ffffff !important;
    -webkit-transform: translateY(100px);
    transform: translateY(100px);
  }

  .floating-container .float-element span {
    color: #444;
    font-weight: 600;
    font-size: 14px;
  }

  .floating-container .float-element img {
    width: 25px;
  }

  .floating-container .float-element {
    
    box-shadow: 0 20px 20px -10px rgba(121, 170, 209, 0.5);
  }


</style>
<div class="floating-container">
  <div class="floating-button">
    <img src="https://cdn-icons-png.flaticon.com/512/7641/7641455.png" />
  </div>
  <div class="element-container">

    <a href="" id="go-to-stoplight">
      <span class="float-element">
        <img src="https://avatars.githubusercontent.com/u/10767217?s=30&v=4" />
        <span>Stoplight</span>
      </span>
    </a>
    <a href="" id="go-to-swagger">
      <span class="float-element">
        <img src="https://avatars.githubusercontent.com/u/7658037?s=30&v=4" />
        <span>Swagger</span>
      </span>
    </a>
    <a href="" id="go-to-redoc">
      <span class="float-element">
        <img src="https://res.cloudinary.com/apideck/image/upload/w_30,f_auto/v1594740999/icons/redoc.png" />
        <span>Redoc</span>
      </span>
    </a>
  </div>
</div>
<script>

  function updateUISwitcherURL() {
    const url = new URL(window.location.href);

    url.searchParams.set('ui', 'swagger');
    document.getElementById('go-to-swagger').setAttribute('href', url.toString());

    url.searchParams.set('ui', 'stoplight');
    document.getElementById('go-to-stoplight').setAttribute('href', url.toString());

    url.searchParams.set('ui', 'redoc');
    document.getElementById('go-to-redoc').setAttribute('href', url.toString());
  }

  document.onclick = function () {
    console.log('clicked')
    setTimeout(() => {
      updateUISwitcherURL();
    }, 1000)
  }
  
  updateUISwitcherURL();

</script>
`
export { UISwitcherHTML }
