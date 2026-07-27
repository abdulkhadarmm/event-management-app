package com.eventeasy.service;

import com.eventeasy.dto.request.AIEventPlannerRequest;
import com.eventeasy.dto.response.AIEventPlannerResponse;

/**
 * <p>Reusable AI Service interface declaring AI capabilities for EventEasy SaaS platform.</p>
 * <p>Provider-agnostic design (supports Gemini, Groq, Ollama, OpenRouter implementations seamlessly).</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
public interface AIService {

    /**
     * Generate structured executive Event Plan proposal based on client request specification.
     *
     * @param request AIEventPlannerRequest client event specification
     * @return AIEventPlannerResponse structured proposal payload
     */
    AIEventPlannerResponse generateEventPlan(AIEventPlannerRequest request);
}
