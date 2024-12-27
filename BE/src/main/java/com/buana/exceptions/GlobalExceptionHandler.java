// package com.buana.exceptions;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.AccessDeniedException;
// import org.springframework.web.bind.MethodArgumentNotValidException;
// import org.springframework.web.bind.annotation.ControllerAdvice;
// import org.springframework.web.bind.annotation.ExceptionHandler;
// import org.springframework.web.server.ResponseStatusException;

// import com.buana.dto.error.ErrorResponse;

// import jakarta.servlet.ServletException;

// @ControllerAdvice
// public class GlobalExceptionHandler {

//     @ExceptionHandler({ValidationException.class, MethodArgumentNotValidException.class})
//     public ResponseEntity<ErrorResponse> handleValidationException(Exception e) {
//         ErrorResponse error = new ErrorResponse(
//             e.getMessage(), 
//             "VALIDATION_ERROR"
//         );
//         return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
//     }

//     // Tambahkan handler untuk AccessDeniedException
//     @ExceptionHandler(AccessDeniedException.class)
//     public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException e) {
//         ErrorResponse error = new ErrorResponse(
//             "Tidak memiliki akses", 
//             "ACCESS_DENIED"
//         );
//         return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
//     }

//     @ExceptionHandler(ResponseStatusException.class)
//     public ResponseEntity<ErrorResponse> handleResponseStatusException(ResponseStatusException e) {
//         ErrorResponse error = new ErrorResponse(
//             e.getReason(),
//             "UNAUTHORIZED"
//         );
//         return new ResponseEntity<>(error, e.getStatusCode());
//     }

//     // @ExceptionHandler(Exception.class)
//     // public ResponseEntity<ErrorResponse> handleAllExceptions(Exception e) {
//     //     ErrorResponse error = new ErrorResponse(
//     //         e.getMessage(),
//     //         "INTERNAL_SERVER_ERROR"
//     //     );
//     //     return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
//     // }

//     @ExceptionHandler(NoSuchMethodError.class)
//     public ResponseEntity<ErrorResponse> handleNoSuchMethodError(NoSuchMethodError e) {
//         ErrorResponse error = new ErrorResponse(
//             e.getMessage() + " " + e.getCause(), 
//             "CONFIGURATION_ERROR"
//         );
//         return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//     @ExceptionHandler(NoSuchMethodException.class)
//     public ResponseEntity<ErrorResponse> handleNoSuchMethodException(NoSuchMethodException e) {
//         ErrorResponse error = new ErrorResponse(
//             "Method tidak ditemukan: " + e.getMessage(), 
//             "METHOD_NOT_FOUND"
//         );
//         return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//     @ExceptionHandler(ServletException.class)
//     public ResponseEntity<ErrorResponse> handleServletException(ServletException e) {
//         ErrorResponse error = new ErrorResponse(
//             "Terjadi kesalahan pada server: " + e.getMessage(),
//             "SERVLET_ERROR"
//         );
//         return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
// } 