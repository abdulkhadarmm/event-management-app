package com.eventeasy.initializer;

import com.eventeasy.entity.Enquiry;
import com.eventeasy.entity.EventPackage;
import com.eventeasy.entity.EventTheme;
import com.eventeasy.entity.EventType;
import com.eventeasy.entity.GalleryItem;
import com.eventeasy.entity.NewsletterSubscriber;
import com.eventeasy.entity.PackageFeature;
import com.eventeasy.entity.Role;
import com.eventeasy.entity.User;
import com.eventeasy.enums.EnquiryStatus;
import com.eventeasy.enums.RoleType;
import com.eventeasy.enums.UserStatus;
import com.eventeasy.enums.VenueType;
import com.eventeasy.repository.EnquiryRepository;
import com.eventeasy.repository.EventPackageRepository;
import com.eventeasy.repository.EventThemeRepository;
import com.eventeasy.repository.EventTypeRepository;
import com.eventeasy.repository.GalleryItemRepository;
import com.eventeasy.repository.NewsletterSubscriberRepository;
import com.eventeasy.repository.RoleRepository;
import com.eventeasy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Master Data Initializer populating initial roles, admin accounts, event categories,
 * packages with full inclusion feature lists in INR (₹), multi-color design themes,
 * celebration gallery showcase, sample customer enquiries, and newsletter subscribers.
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Component
@Slf4j
public class BusinessDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final EventTypeRepository eventTypeRepository;
    private final EventPackageRepository packageRepository;
    private final EventThemeRepository themeRepository;
    private final GalleryItemRepository galleryRepository;
    private final EnquiryRepository enquiryRepository;
    private final NewsletterSubscriberRepository subscriberRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.init.admin.email}")
    private String adminEmail;

    @Value("${app.init.admin.password}")
    private String adminPassword;

    @Value("${app.init.admin.first-name:System}")
    private String adminFirstName;

    @Value("${app.init.admin.last-name:Administrator}")
    private String adminLastName;

    public BusinessDataInitializer(
            UserRepository userRepository,
            RoleRepository roleRepository,
            EventTypeRepository eventTypeRepository,
            EventPackageRepository packageRepository,
            EventThemeRepository themeRepository,
            GalleryItemRepository galleryRepository,
            EnquiryRepository enquiryRepository,
            NewsletterSubscriberRepository subscriberRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.eventTypeRepository = eventTypeRepository;
        this.packageRepository = packageRepository;
        this.themeRepository = themeRepository;
        this.galleryRepository = galleryRepository;
        this.enquiryRepository = enquiryRepository;
        this.subscriberRepository = subscriberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Starting Business Data Initialization process...");

        // 1. Initialize Security Roles
        Role adminRole = initializeRoles();

        // 2. Initialize Default Administrator User
        initializeAdminUser(adminRole);

        // 3. Initialize Event Categories (Event Types)
        List<EventType> eventTypes = initializeEventTypes();

        // 4. Initialize Core Service Packages in INR (₹) with Feature Inclusions
        List<EventPackage> packages = initializePackages();

        // 5. Initialize Luxury Design Themes with Multi-Color Palettes
        List<EventTheme> themes = initializeThemes();

        // 6. Initialize Celebration Showcase Gallery
        initializeGallery();

        // 7. Initialize Sample Customer Booking Enquiries
        initializeEnquiries(eventTypes, packages, themes);

        // 8. Initialize Sample Newsletter Subscribers
        initializeSubscribers();

        log.info("Master data initialization complete.");
    }

    private Role initializeRoles() {
        for (RoleType roleType : RoleType.values()) {
            roleRepository.findByName(roleType).orElseGet(() -> {
                Role role = new Role(roleType, "System Role: " + roleType.name());
                log.info("Creating security role: {}", roleType);
                return roleRepository.save(role);
            });
        }
        return roleRepository.findByName(RoleType.ROLE_ADMIN)
                .orElseThrow(() -> new IllegalStateException("ROLE_ADMIN could not be retrieved"));
    }

    private void initializeAdminUser(Role adminRole) {
        userRepository.findByEmail(adminEmail).ifPresentOrElse(
                user -> {
                    user.setPassword(passwordEncoder.encode(adminPassword));
                    userRepository.save(user);
                    log.info("Updated existing primary admin user account credentials: {}", adminEmail);
                },
                () -> {
                    User admin = new User();
                    admin.setEmail(adminEmail);
                    admin.setPassword(passwordEncoder.encode(adminPassword));
                    admin.setFirstName(adminFirstName);
                    admin.setLastName(adminLastName);
                    admin.setStatus(UserStatus.ACTIVE);
                    admin.setRoles(Set.of(adminRole));

                    userRepository.save(admin);
                    log.info("Successfully seeded initial primary admin account: {}", adminEmail);
                }
        );
    }

    private List<EventType> initializeEventTypes() {
        if (eventTypeRepository.count() > 0) {
            log.info("Event categories already populated.");
            return eventTypeRepository.findAll();
        }

        log.info("Seeding default Event Categories...");
        List<EventType> types = new ArrayList<>();
        types.add(eventTypeRepository.save(EventType.builder().name("Wedding").code("WEDDING").description("Grand luxury weddings, reception ceremonies, and traditional rituals.").iconName("CrownOutlined").displayOrder(1).activeStatus(true).build()));
        types.add(eventTypeRepository.save(EventType.builder().name("Birthday Party").code("BIRTHDAY").description("Milestone birthdays, theme celebrations, and kids parties.").iconName("GiftOutlined").displayOrder(2).activeStatus(true).build()));
        types.add(eventTypeRepository.save(EventType.builder().name("Corporate Event").code("CORPORATE").description("Annual conferences, product launches, galas, and executive summits.").iconName("AppstoreOutlined").displayOrder(3).activeStatus(true).build()));
        types.add(eventTypeRepository.save(EventType.builder().name("Engagement").code("ENGAGEMENT").description("Rings exchange, pre-wedding cocktail parties, and family gatherings.").iconName("HeartOutlined").displayOrder(4).activeStatus(true).build()));
        types.add(eventTypeRepository.save(EventType.builder().name("Reception").code("RECEPTION").description("Post-wedding grand reception galas and banquet dining.").iconName("StarOutlined").displayOrder(5).activeStatus(true).build()));
        types.add(eventTypeRepository.save(EventType.builder().name("Anniversary").code("ANNIVERSARY").description("Silver, gold, and milestone marriage anniversary celebrations.").iconName("TrophyOutlined").displayOrder(6).activeStatus(true).build()));
        return types;
    }

    private List<EventPackage> initializePackages() {
        packageRepository.deleteAll();
        log.info("Seeding default Event Packages with Inclusion Features in ₹ INR...");
        List<EventPackage> packages = new ArrayList<>();

        // 1. Silver Package
        EventPackage silver = EventPackage.builder()
                .name("Silver Celebration")
                .subtitle("Essential")
                .price(new BigDecimal("150000.00"))
                .description("Essential decoration, standard sound & lighting, venue coordination, and basic catering management.")
                .displayOrder(1)
                .popularFlag(false)
                .activeStatus(true)
                .features(new ArrayList<>())
                .build();
        addFeature(silver, "Standard Stage Backdrop & Entrance Arch", 1);
        addFeature(silver, "High-Quality Sound System & Ambient Lighting", 2);
        addFeature(silver, "On-Site Event Coordinator (1 Manager)", 3);
        addFeature(silver, "Basic Guest Seating & Linens Setup", 4);
        addFeature(silver, "Catering Vendor Logistics Management", 5);
        packages.add(packageRepository.save(silver));

        // 2. Gold Package
        EventPackage gold = EventPackage.builder()
                .name("Gold Elegance")
                .subtitle("Popular")
                .price(new BigDecimal("350000.00"))
                .description("Full floral styling, premium stage FX, DJ & sound master, live counters, and dedicated event manager.")
                .displayOrder(2)
                .popularFlag(true)
                .activeStatus(true)
                .features(new ArrayList<>())
                .build();
        addFeature(gold, "Bespoke Fresh Floral & Crystal Stage Backdrop", 1);
        addFeature(gold, "Concert-Grade Sound Setup with Professional DJ", 2);
        addFeature(gold, "Dedicated Lead Manager & 3 Assistant Coordinators", 3);
        addFeature(gold, "Interactive Live Food Counter Installations", 4);
        addFeature(gold, "Professional Photography & Video Highlight Reel", 5);
        addFeature(gold, "Cold Pyros & Fog Special Effects for Entries", 6);
        packages.add(packageRepository.save(gold));

        // 3. Platinum Package
        EventPackage platinum = EventPackage.builder()
                .name("Platinum Royalty")
                .subtitle("Luxury")
                .price(new BigDecimal("750000.00"))
                .description("Bespoke 3D decor, celebrity artists, multi-cuisine banquet, LED wall backdrop, and 360-degree photography team.")
                .displayOrder(3)
                .popularFlag(false)
                .activeStatus(true)
                .features(new ArrayList<>())
                .build();
        addFeature(platinum, "3D Architectural Stage Design & Ultra HD LED Walls", 1);
        addFeature(platinum, "Celebrity Artist Booking & Live Entertainment", 2);
        addFeature(platinum, "Full Concierge Team (5 VIP Event Executives)", 3);
        addFeature(platinum, "Luxury Multi-Cuisine Gourmet Banquet Management", 4);
        addFeature(platinum, "360 Video Booth & Drone Cinematic Coverage", 5);
        addFeature(platinum, "Royal Welcome Troupe & Grand Entry FX", 6);
        addFeature(platinum, "Custom Invitation Suites & Guest Concierge Desk", 7);
        packages.add(packageRepository.save(platinum));

        return packages;
    }

    private void addFeature(EventPackage pkg, String name, int order) {
        PackageFeature feature = PackageFeature.builder()
                .featureName(name)
                .displayOrder(order)
                .activeStatus(true)
                .eventPackage(pkg)
                .build();
        pkg.getFeatures().add(feature);
    }

    private List<EventTheme> initializeThemes() {
        themeRepository.deleteAll();
        log.info("Seeding default Design Themes with Multi-Color Palettes...");
        List<EventTheme> themes = new ArrayList<>();
        themes.add(themeRepository.save(EventTheme.builder().name("Royal Gold & Crimson").category("Traditional").accentColor("#D97706,#DC2626,#F59E0B,#78350F").description("Rich golden drapes, crimson roses, brass lamps, and majestic mandap architecture.").imagePath("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80").displayOrder(1).activeStatus(true).build()));
        themes.add(themeRepository.save(EventTheme.builder().name("Midnight Opulence").category("Modern").accentColor("#4F46E5,#1E1B4B,#06B6D4,#EC4899").description("Deep indigo velvet, crystal chandeliers, neon accents, and contemporary geometric stage.").imagePath("https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80").displayOrder(2).activeStatus(true).build()));
        themes.add(themeRepository.save(EventTheme.builder().name("Pastel Blossom Haven").category("Luxury").accentColor("#EC4899,#F472B6,#FDE047,#A7F3D0").description("Blush pink cherry blossoms, champagne gold chairs, fairy lights, and botanical garden aesthetic.").imagePath("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80").displayOrder(3).activeStatus(true).build()));
        themes.add(themeRepository.save(EventTheme.builder().name("Monochrome Modernist").category("Minimalist").accentColor("#0F172A,#334155,#94A3B8,#F1F5F9").description("Sleek slate black, crisp white florals, architectural spotlighting, and matte metallic accents.").imagePath("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80").displayOrder(4).activeStatus(true).build()));
        return themes;
    }

    private void initializeGallery() {
        if (galleryRepository.count() > 0) {
            log.info("Gallery items already populated, skipping initialization.");
            return;
        }

        log.info("Seeding default Celebration Gallery Showcase...");
        galleryRepository.save(GalleryItem.builder().title("Royal Palace Wedding").location("Udaipur, Rajasthan").category("Wedding").year("2025").imagePath("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80").displayOrder(1).activeStatus(true).build());
        galleryRepository.save(GalleryItem.builder().title("Tech Summit Annual Gala").location("Bengaluru, Karnataka").category("Corporate Event").year("2025").imagePath("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80").displayOrder(2).activeStatus(true).build());
        galleryRepository.save(GalleryItem.builder().title("Midnight Gold Birthday Party").location("Mumbai, Maharashtra").category("Birthday Party").year("2025").imagePath("https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80").displayOrder(3).activeStatus(true).build());
        galleryRepository.save(GalleryItem.builder().title("Pastel Sunset Reception").location("Goa Beach Resort").category("Reception").year("2025").imagePath("https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80").displayOrder(4).activeStatus(true).build());
    }

    private void initializeEnquiries(List<EventType> eventTypes, List<EventPackage> packages, List<EventTheme> themes) {
        if (enquiryRepository.count() > 0) {
            log.info("Enquiries already populated, skipping initial seed.");
            return;
        }

        log.info("Seeding initial Customer Booking Enquiries...");

        EventType wedding = eventTypes.stream().filter(t -> "WEDDING".equalsIgnoreCase(t.getCode())).findFirst().orElse(eventTypes.get(0));
        EventType corporate = eventTypes.stream().filter(t -> "CORPORATE".equalsIgnoreCase(t.getCode())).findFirst().orElse(eventTypes.get(0));
        EventType birthday = eventTypes.stream().filter(t -> "BIRTHDAY".equalsIgnoreCase(t.getCode())).findFirst().orElse(eventTypes.get(0));

        EventPackage goldPkg = packages.stream().filter(p -> "Gold Elegance".equalsIgnoreCase(p.getName())).findFirst().orElse(packages.get(0));
        EventPackage platinumPkg = packages.stream().filter(p -> "Platinum Royalty".equalsIgnoreCase(p.getName())).findFirst().orElse(packages.get(0));
        EventPackage silverPkg = packages.stream().filter(p -> "Silver Celebration".equalsIgnoreCase(p.getName())).findFirst().orElse(packages.get(0));

        EventTheme royalTheme = themes.stream().filter(t -> "Royal Gold & Crimson".equalsIgnoreCase(t.getName())).findFirst().orElse(themes.get(0));
        EventTheme midnightTheme = themes.stream().filter(t -> "Midnight Opulence".equalsIgnoreCase(t.getName())).findFirst().orElse(themes.get(0));

        // Enquiry 1
        Enquiry e1 = Enquiry.builder()
                .enquiryNumber("EVT-2026-000001")
                .fullName("Rahul Sharma")
                .email("rahul.sharma@example.com")
                .phone("+91 98765 43210")
                .city("Bengaluru")
                .eventType(wedding)
                .eventPackage(goldPkg)
                .eventTheme(royalTheme)
                .eventDate(LocalDate.now().plusDays(45))
                .expectedGuests(300)
                .venue("Leela Palace Convention Center")
                .venueType(VenueType.BOTH)
                .estimatedBudget(new BigDecimal("350000.00"))
                .additionalRequirements("Mandap decoration with fresh marigold and lotus florals. Require live shehnai players for entrance.")
                .status(EnquiryStatus.NEW)
                .aiPlanSummary("Engagement Architecture Proposal – BTM Layout, Bengaluru (250 Guests, ₹3,50,000)")
                .aiProvider("Google Gemini")
                .aiModel("gemini-1.5-flash")
                .aiGeneratedAt(LocalDateTime.now().minusHours(2))
                .build();
        enquiryRepository.save(e1);

        // Enquiry 2
        Enquiry e2 = Enquiry.builder()
                .enquiryNumber("EVT-2026-000002")
                .fullName("Priya Verma")
                .email("priya.verma@domain.com")
                .phone("+91 98123 45678")
                .city("Mumbai")
                .eventType(corporate)
                .eventPackage(platinumPkg)
                .eventTheme(midnightTheme)
                .eventDate(LocalDate.now().plusDays(20))
                .expectedGuests(500)
                .venue("St. Regis Grand Ballroom")
                .venueType(VenueType.INDOOR)
                .estimatedBudget(new BigDecimal("750000.00"))
                .additionalRequirements("Annual Tech Leadership Summit gala dinner & award ceremony. Require 4K LED wall & 360 photo booth.")
                .status(EnquiryStatus.CONTACTED)
                .aiPlanSummary("Corporate Leadership Summit & Gala (500 Guests, ₹7,50,000)")
                .aiProvider("Google Gemini")
                .aiModel("gemini-1.5-flash")
                .aiGeneratedAt(LocalDateTime.now().minusDays(1))
                .build();
        enquiryRepository.save(e2);

        // Enquiry 3
        Enquiry e3 = Enquiry.builder()
                .enquiryNumber("EVT-2026-000003")
                .fullName("Ananya Deshmukh")
                .email("ananya.d@techcorp.in")
                .phone("+91 97654 32109")
                .city("Udaipur")
                .eventType(birthday)
                .eventPackage(silverPkg)
                .eventTheme(midnightTheme)
                .eventDate(LocalDate.now().plusDays(15))
                .expectedGuests(100)
                .venue("Oberoi Udaivilas Lawn")
                .venueType(VenueType.OUTDOOR)
                .estimatedBudget(new BigDecimal("150000.00"))
                .additionalRequirements("Milestone 30th Birthday Sunset Cocktail Party. Acoustic live band setup.")
                .status(EnquiryStatus.CONFIRMED)
                .aiPlanSummary("Bespoke Sunset Birthday Soirée (100 Guests, ₹1,50,000)")
                .aiProvider("Google Gemini")
                .aiModel("gemini-1.5-flash")
                .aiGeneratedAt(LocalDateTime.now().minusDays(3))
                .build();
        enquiryRepository.save(e3);
    }

    private void initializeSubscribers() {
        if (subscriberRepository.count() > 0) {
            log.info("Subscribers already populated, skipping initial seed.");
            return;
        }

        log.info("Seeding initial Newsletter Subscribers...");
        subscriberRepository.save(new NewsletterSubscriber("abdulkhadarmm12@gmail.com"));
        subscriberRepository.save(new NewsletterSubscriber("sarah.jenkins@example.com"));
        subscriberRepository.save(new NewsletterSubscriber("rahul.events@domain.com"));
        subscriberRepository.save(new NewsletterSubscriber("priya.v@company.com"));
    }
}
