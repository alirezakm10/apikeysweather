alert('با زدن نام شهر های ایران به صورت فارسی می توانید از سامانه هواشناسی کشور وضعیت هوا را از طریق این وب اپلیکیشن استعلام بگیرید بعد از وارد کردن نام دکمه استعلام را فشار دهید.')
let app = document.querySelector("#app")
let city = document.querySelector("#city")
async function getWeather(city) {
let response = await fetch(`http://developers.parsijoo.ir/web-service/v1/weather/?type=search&city=${city}`,
{
	headers:{
		"api-key":"a5e39495d7f445ce9b5fd499f8adced2"
	}
})

let data = await response.json()
let nowTemp = data.result.hava.summary.temp
let today = data.result.hava.dayList[0]
switch (today.condition) {
	case "آرام":
		today.bgColor ="aram"
		break;
	case "نسیم":
		today.bgColor ="nasim"
		break;
	case "باد ملایم":
		today.bgColor ="badMolayem"
		break;
	case "باد شدید":
		today.bgColor ="badShadid"
		break;
	case "طوفانی":
		today.bgColor ="toofani"
		break;
	default:
		today.bgColor="aram"
		break;
}
	app.innerHTML = `
	\t<div class="card mx-auto col-md-6">
\t\t\t\t  <div class="weather-wraper ${today.bgColor}"><i class="wi ${today.symbol}"></i></div>
\t\t\t\t  <div class="card-body">
\t\t\t\t   <h2>${city}</h2>
\t\t\t\t   <small class="my-1 d-block">${today.condition}</small>
\t\t\t\t   <div>
\t\t\t\t   \t<button class="btn btn-danger">${today.max}</button>
\t\t\t\t   \t<button class="btn btn-secondary">${nowTemp}</button>
\t\t\t\t   \t<button class="btn btn-primary">${today.min}</button>
\t\t\t\t   </div>
\t\t\t\t  </div>
\t\t\t\t</div>
	`;
}
city.addEventListener("submit",e=>{
	e.preventDefault()
	getWeather(e.target.city.value)
})