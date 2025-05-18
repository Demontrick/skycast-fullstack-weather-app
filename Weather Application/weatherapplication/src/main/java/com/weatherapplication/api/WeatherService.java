package com.weatherapplication.api;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private final RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String fetchWeatherData(String city, String country) {
        // Integrate with OpenWeatherMap or any other weather API here
        String apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
        String url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + apiKey;
        return restTemplate.getForObject(url, String.class);
    }
}
