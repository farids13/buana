package com.buana.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import com.buana.dto.auth.LoginDto;
import com.buana.dto.auth.LoginResponseDto;
import com.buana.dto.auth.RegisterDto;
import com.buana.dto.error.ApiErrorDto;
import com.buana.dto.google.GoogleDTO;
import com.buana.helper.JwtHelper;
import com.buana.model.User;
import com.buana.service.GoogleService;
import com.buana.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RestController
@RequestMapping(path = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {
    
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, GoogleService googleService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }


    @Operation(summary = "Register a new user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User registered successfully", content = @Content(schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "400", description = "Invalid request body", content = @Content(schema = @Schema(implementation = ApiErrorDto.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ApiErrorDto.class)))
    })
    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterDto req) {
        boolean isRegistered = userService.register(req);
        if (isRegistered) {
            User user = userService.getUserByEmail(req.email());
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @Operation(summary = "Login a user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User logged in successfully", content = @Content(schema = @Schema(implementation = LoginResponseDto.class))),
        @ApiResponse(responseCode = "401", description = "Invalid credentials", content = @Content(schema = @Schema(implementation = ApiErrorDto.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ApiErrorDto.class)))
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginDto req) {
        try {
            System.out.println("Mencoba login dengan email: " + req.email());
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));
            System.out.println("Autentikasi berhasil");
            String token = JwtHelper.generateToken(req.email());
            return ResponseEntity.ok(new LoginResponseDto(token, req.email()));
        } catch (BadCredentialsException e) {
            System.out.println("Autentikasi gagal: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }

    @Operation(summary = "Login with google")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
        description = "Req For Google Login",
        required = true,
        content = @Content(schema = @Schema(implementation = GoogleDTO.Request.class))
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User logged in successfully", content = @Content(schema = @Schema(implementation = LoginResponseDto.class))),
        @ApiResponse(responseCode = "401", description = "Invalid credentials", content = @Content(schema = @Schema(implementation = ApiErrorDto.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ApiErrorDto.class)))
    })
    @PostMapping("/login/google")
    public ResponseEntity<LoginResponseDto> loginWithGoogle(@Valid @RequestBody GoogleDTO.Request req) {
        try {
            System.out.println("Mencoba login dengan google");
            User user = userService.signInGoogle(req);
            System.out.println("User Ditemukan");
            // authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            String token = JwtHelper.generateToken(user.getEmail());
            return ResponseEntity.ok(new LoginResponseDto(token, user.getEmail()));
        } catch (Exception e) {
            System.out.println("Autentikasi gagal: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage().toString());
        }
    }

}

