package com.BingeVerse.BingeVerse.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*") // Allow CORS for frontend
public class TestController {

        @GetMapping
        public String testApi() {
            return "Backend is working!";
        }
}
