/*package com.example.biometricpayroll.service;

import com.example.biometricpayroll.entity.Employee;
import com.example.biometricpayroll.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class FaceService {

    private final EmployeeRepository repository;

    public FaceService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public boolean isDuplicateFace(String embeddingJson) {

        double[] input = parseEmbedding(embeddingJson);

        for (Employee emp : repository.findAll()) {
            double[] saved = parseEmbedding(emp.getEmbeddingJson());

            double similarity = cosineSimilarity(input, saved);

            if (similarity > 0.90) { // ✅ strict threshold
                return true;
            }
        }
        return false;
    }

    private double[] parseEmbedding(String json) {
        json = json.replace("[", "").replace("]", "");
        return Arrays.stream(json.split(","))
                .mapToDouble(Double::parseDouble)
                .toArray();
    }

    private double cosineSimilarity(double[] a, double[] b) {
        double dot = 0, magA = 0, magB = 0;

        for (int i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            magA += a[i] * a[i];
            magB += b[i] * b[i];
        }
        return dot / (Math.sqrt(magA) * Math.sqrt(magB));
    }
}
*/