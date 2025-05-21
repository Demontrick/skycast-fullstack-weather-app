package com.weatherapplication.weatherapplication;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://127.0.0.1:5173" // Optional, in case the browser uses 127.0.0.1
}) // Allow requests from both localhost and 127.0.0.1
public class WeatherController {

    @Value("${openweathermap.api.key}")
    private String apiKey;

    @GetMapping("/weather")
    public ResponseEntity<String> getWeather(@RequestParam String city, @RequestParam String country) {
        String url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + apiKey;
        RestTemplate restTemplate = new RestTemplate();
        try {
            String response = restTemplate.getForObject(url, String.class);
            HttpHeaders headers = new HttpHeaders();
            headers.setCacheControl(CacheControl.noCache().getHeaderValue());
            return new ResponseEntity<>(response, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("{\"error\": \"Error fetching weather data\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
