let jKey

async function UJSON(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${jKey.city},${jKey.Country}&appid=${jKey.key}&units=metric`
    return await Utils.fetch(url)
            .then(res => res.text())
            .then(res => JSON.parse(res))
            .catch(console.error)
}

async function JSONRead(){
    const WJSON = Utils.readFile(`/home/emph/.config/.weather.json`)
    jKey = JSON.parse(WJSON)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(UJSON());
        }, 1000);
    });
}

class weather extends Service {
    static {
        Service.register(this, {
            "city-changed": ['string'],
            "icon-changed": ['string'],
            "weather-changed": ['string'],
            "temp-changed": ['int'],

        }, 
        {
            "city": ['string', 'r'],
            "icon": ['string', 'r'],
            "weather": ['string', 'r'],
            "temp": ['int', 'r'],
        })
    
    }
    #City = "";
    #Icon = "";
    #Weather = "";
    #Temp = 0;
    
    get city() {
        return this.#City;
    }

    get icon() {
        return this.#Icon;
    }

    get weather() {
        return this.#Weather;
    }

    get temp(){
        return this.#Temp;
    }
    
    constructor() {
        super();

        Utils.interval(600000, () => {
            this.#onChange();
        });

        //this.#onChange();
    }

    async #onChange(){
        try {
            const res = await JSONRead();
            
            this.#City = res.name;

            switch(res.weather[0].icon){
                case "04d": {
                    this.#Icon = "weather-overcast-symbolic";
                    break;
                }
                case "04n": {
                    this.#Icon = "weather-overcast-symbolic";
                    break;
                }
                case "09d": {
                    this.#Icon = "weather-showers-symbolic"
                    break;
                }
                case "09n": {
                    this.#Icon = "weather-showers-symbolic"
                    break;
                }
                case "10d": {
                    this.#Icon = "weather-showers-scattered-symbolic"
                    break;
                }
                case "10n": {
                    this.#Icon = "weather-showers-scattered-symbolic"
                    break;
                }

            }

            this.#Weather = res.weather[0].description;

            this.#Temp = res.main.temp;

            this.emit('changed');

            this.emit('city-changed', this.#City);
        }catch (error){
            console.error(error);
        }
    }
    connect(event = 'city-changed', callback) {
        return super.connect(event, callback);
    }
}

export default new weather



