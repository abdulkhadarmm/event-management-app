package com.eventeasy.filter;

import com.eventeasy.constants.SecurityConstants;
import com.eventeasy.jwt.JwtTokenProvider;
import com.eventeasy.security.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * <p>Stateless request filter intercepting incoming HTTP calls to extract, validate, and set SecurityContext authentication from JWT headers.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService userDetailsService;

    /**
     * Constructor injection for filter dependencies.
     *
     * @param tokenProvider JwtTokenProvider component
     * @param userDetailsService CustomUserDetailsService component
     */
    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider, CustomUserDetailsService userDetailsService) {
        this.tokenProvider = tokenProvider;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Execute filter evaluation extracting JWT token and populating SecurityContextHolder authentication.
     *
     * @param request current HTTP request
     * @param response current HTTP response
     * @param filterChain downstream servlet filter chain
     * @throws ServletException in case of filter execution errors
     * @throws IOException in case of I/O errors
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);

            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                String username = tokenProvider.getUsernameFromToken(jwt);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            log.error("Could not set user authentication in security context: {}", ex.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Extract raw JWT string from Authorization header bearer scheme.
     *
     * @param request incoming HTTP request
     * @return extracted token string or null if header is missing
     */
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(SecurityConstants.AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(SecurityConstants.BEARER_PREFIX)) {
            return bearerToken.substring(SecurityConstants.BEARER_PREFIX_LENGTH);
        }
        return null;
    }
}
