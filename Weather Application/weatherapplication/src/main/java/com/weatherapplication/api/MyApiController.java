package com.weatherapplication.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MyApiController {
    @GetMapping("/test")
    public String test() {
        return "API is working!";
    }
}
