package com.eventeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * <p>Generic reusable pagination response wrapper ensuring consistent structure across paginated REST APIs.</p>
 *
 * @param <T> content element type
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagedResponse<T> {

    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private int numberOfElements;
    private boolean first;
    private boolean last;
    private String sort;

    /**
     * Static factory method converting a Spring Data Page object to PagedResponse.
     *
     * @param pageObj Spring Data Page instance
     * @param mappedContent list of mapped DTO content items
     * @param <T> DTO content type
     * @return PagedResponse instance
     */
    public static <T> PagedResponse<T> fromPage(Page<?> pageObj, List<T> mappedContent) {
        String sortDescription = pageObj.getSort().isSorted()
                ? pageObj.getSort().toString()
                : "UNSORTED";

        return PagedResponse.<T>builder()
                .content(mappedContent)
                .page(pageObj.getNumber())
                .size(pageObj.getSize())
                .totalElements(pageObj.getTotalElements())
                .totalPages(pageObj.getTotalPages())
                .numberOfElements(pageObj.getNumberOfElements())
                .first(pageObj.isFirst())
                .last(pageObj.isLast())
                .sort(sortDescription)
                .build();
    }
}
