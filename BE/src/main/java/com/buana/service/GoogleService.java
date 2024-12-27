package com.buana.service;

import javax.net.ssl.SSLContext;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;

import com.buana.dto.google.GoogleDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;

@Service
public class GoogleService {

    private HttpClientBuilder httpClientBuilder;

    @PostConstruct
    public void init() throws NoSuchAlgorithmException, KeyStoreException, KeyManagementException {
        SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
                .loadTrustMaterial(null, new org.apache.http.conn.ssl.TrustSelfSignedStrategy())
                .build();
        SSLConnectionSocketFactory sslConSocFactory = new SSLConnectionSocketFactory(sslContext, 
                org.apache.http.conn.ssl.NoopHostnameVerifier.INSTANCE);
        httpClientBuilder = HttpClients.custom().setSSLSocketFactory(sslConSocFactory);
    }

    public GoogleDTO.Response getGoogleAccount(@RequestHeader("Authorization") String token) throws IOException {
        try (CloseableHttpClient httpClient = httpClientBuilder.build()) {
            HttpGet httpGet = new HttpGet("https://content-people.googleapis.com/v1/people/me?personFields=names%2Cbirthdays%2CemailAddresses%2Cgenders");
            httpGet.setHeader("Authorization", "Bearer " + URLEncoder.encode(token, StandardCharsets.UTF_8));
            try (CloseableHttpResponse httpResponse = httpClient.execute(httpGet)) {
                if (httpResponse.getStatusLine().getStatusCode() == 401) {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "INVALID_TOKEN");
                }
                HttpEntity entity = httpResponse.getEntity();
                return new ObjectMapper().readValue(EntityUtils.toString(entity), GoogleDTO.Response.class);
            }
        }
    }
}
