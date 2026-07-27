package com.eventeasy.security;

import com.eventeasy.entity.User;
import com.eventeasy.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>Custom implementation of Spring Security {@link UserDetailsService} querying user entities by email login identifier.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Constructor injection for UserRepository dependency.
     *
     * @param userRepository repository for querying User entities
     */
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Locate user by unique email username for authentication verification.
     *
     * @param email account login email
     * @return UserDetails populated UserPrincipal instance
     * @throws UsernameNotFoundException if no user entity matches specified email
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User account not found with email: " + email));

        return UserPrincipal.create(user);
    }
}
