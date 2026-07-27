package com.eventeasy.service;

import com.eventeasy.dto.request.GalleryItemRequest;
import com.eventeasy.dto.response.GalleryItemResponse;

import java.util.List;
import java.util.UUID;

/**
 * <p>Service interface defining gallery item management operations.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
public interface GalleryItemService {

    List<GalleryItemResponse> getPublicActiveGalleryItems();

    List<GalleryItemResponse> getAllGalleryItems();

    GalleryItemResponse getGalleryItemById(UUID id);

    GalleryItemResponse createGalleryItem(GalleryItemRequest request);

    GalleryItemResponse updateGalleryItem(UUID id, GalleryItemRequest request);

    void deleteGalleryItem(UUID id);
}
