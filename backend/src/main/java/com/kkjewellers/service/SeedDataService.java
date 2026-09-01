package com.kkjewellers.service;

import com.kkjewellers.entity.*;
import com.kkjewellers.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class SeedDataService implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final CategoryRepository categoryRepository;
    private final CollectionRepository collectionRepository;
    private final ProductRepository productRepository;
    private final GalleryItemRepository galleryItemRepository;
    private final WebsiteSettingsRepository websiteSettingsRepository;
    private final EnquiryRepository enquiryRepository;
    private final AppointmentRepository appointmentRepository;
    private final PasswordEncoder passwordEncoder;

    public SeedDataService(
            AdminUserRepository adminUserRepository,
            CategoryRepository categoryRepository,
            CollectionRepository collectionRepository,
            ProductRepository productRepository,
            GalleryItemRepository galleryItemRepository,
            WebsiteSettingsRepository websiteSettingsRepository,
            EnquiryRepository enquiryRepository,
            AppointmentRepository appointmentRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.adminUserRepository = adminUserRepository;
        this.categoryRepository = categoryRepository;
        this.collectionRepository = collectionRepository;
        this.productRepository = productRepository;
        this.galleryItemRepository = galleryItemRepository;
        this.websiteSettingsRepository = websiteSettingsRepository;
        this.enquiryRepository = enquiryRepository;
        this.appointmentRepository = appointmentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        seedWebsiteSettings();
        seedAdminUser();
        if (categoryRepository.count() == 0) {
            seedCatalogueData();
        }
        if (galleryItemRepository.count() == 0) {
            seedGallery();
        }
        if (enquiryRepository.count() == 0) {
            seedEnquiriesAndAppointments();
        }
    }

    private void seedWebsiteSettings() {
        if (websiteSettingsRepository.count() == 0) {
            WebsiteSettings s = new WebsiteSettings();
            s.setBusinessName("KK JEWELLERS");
            s.setTagline("Timeless Elegance. Crafted for Generations.");
            s.setLogoUrl("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80");
            s.setPhone("+91 9440156446");
            s.setWhatsappNumber("919440156446");
            s.setEmail("enquiry@kkjewellers.com");
            s.setAddress("KK JEWELLERS, Main Road, Kamavarapukota, Andhra Pradesh");
            s.setGoogleMapsUrl("https://www.google.com/maps/place/KK+JEWELLERS/@17.0118298,81.1917804,17z/data=!4m14!1m7!3m6!1s0x3a365e70dec22845:0x96133a8e2d0219a1!2sKK+JEWELLERS!8m2!3d17.0118298!4d81.1943553!16s%2Fg%2F11g7z8t869!3m5!1s0x3a365e70dec22845:0x96133a8e2d0219a1!8m2!3d17.0118298!4d81.1943553!16s%2Fg%2F11g7z8t869");
            s.setOpeningHours("Mon - Sun: 10:30 AM - 08:30 PM");
            s.setInstagram("https://instagram.com/kkjewellers_official");
            s.setFacebook("https://facebook.com/kkjewellers.official");
            s.setYoutube("https://youtube.com/@kkjewellers");
            s.setFooterDescription("KK JEWELLERS is a premier Indian jewellery destination renowned for handcrafted gold, certified solitaire diamond ornaments, and bespoke royal bridal collections passed down through generations.");
            websiteSettingsRepository.save(s);
        }
    }

    private void seedAdminUser() {
        if (adminUserRepository.count() == 0) {
            AdminUser admin = new AdminUser("admin", passwordEncoder.encode("admin123"), "Master Admin", "admin@kkjewellers.com");
            adminUserRepository.save(admin);
        }
    }

    private void seedCatalogueData() {
        // Create Categories
        Category catGold = categoryRepository.save(new Category("Gold Jewellery", "gold-jewellery", "Pure 22K & 18K handcrafted gold jewellery", "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80", 1));
        Category catDiamond = categoryRepository.save(new Category("Diamond Jewellery", "diamond-jewellery", "Certified VVS-EF solitaire & diamond studded jewellery", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80", 2));
        Category catBridal = categoryRepository.save(new Category("Bridal Jewellery", "bridal-jewellery", "Opulent royal bridal neckwear, harams, and matha patti", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80", 3));
        Category catRings = categoryRepository.save(new Category("Rings", "rings", "Statement rings, solitaires, and royal gold bands", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80", 4));
        Category catNecklaces = categoryRepository.save(new Category("Necklaces", "necklaces", "Chokers, collar necklaces, and traditional harams", "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80", 5));
        Category catEarrings = categoryRepository.save(new Category("Earrings", "earrings", "Classic Jhumkas, Chandbalis, studs, and drops", "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80", 6));
        Category catBangles = categoryRepository.save(new Category("Bangles", "bangles", "Kadas, broad Nakshi bangles, and diamond bracelets", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80", 7));
        Category catChains = categoryRepository.save(new Category("Chains", "chains", "Handcrafted solid gold chains and sleek designs", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", 8));
        Category catBracelets = categoryRepository.save(new Category("Bracelets", "bracelets", "Luxury tennis bracelets and gold cuffs", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", 9));
        Category catMens = categoryRepository.save(new Category("Men's Jewellery", "mens-jewellery", "Sophisticated signet rings, gold kadas, and chains", "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80", 10));
        Category catKids = categoryRepository.save(new Category("Kids Jewellery", "kids-jewellery", "Lightweight hypoallergenic gold bangles & nazariya", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80", 11));

        // Create Collections
        CollectionEntity colBridal = collectionRepository.save(new CollectionEntity("Bridal Collection", "bridal-collection", "Grand heritage sets crafted for royal Indian weddings.", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&q=80", true, 1));
        CollectionEntity colTraditional = collectionRepository.save(new CollectionEntity("Traditional Collection", "traditional-collection", "Intricate Temple & Antique Kundan craftsmanship.", "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1000&q=80", true, 2));
        CollectionEntity colContemporary = collectionRepository.save(new CollectionEntity("Contemporary Collection", "contemporary-collection", "Modern diamond cuts and minimalist high-fashion gold.", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&q=80", true, 3));
        CollectionEntity colFestival = collectionRepository.save(new CollectionEntity("Festival Collection", "festival-collection", "Festive glitter for Diwali, Dhanteras, and family celebrations.", "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1000&q=80", false, 4));
        CollectionEntity colDailyWear = collectionRepository.save(new CollectionEntity("Daily Wear Collection", "daily-wear-collection", "Lightweight, durable, and comfortable gold & diamond elegance.", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&q=80", false, 5));

        // Seed Products
        createProduct("The Royal Kundan Heritage Choker", "KK-NK-001", catNecklaces, colBridal, "Gold", "22K", "68.4 gms", "Women", "Wedding",
                "A grand 22K yellow gold choker embellished with uncut Polki diamonds and ruby droplets.",
                "Handcrafted by master artisans from Jaipur, this choker necklace features intricate meenakari reverse engraving, certified uncut diamonds, and natural Zambian rubies. Ideal for royal wedding celebrations.",
                true, true,
                List.of(
                        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1000&q=80",
                        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&q=80"
                ));

        createProduct("Elysian Solitaire Diamond Ring", "KK-RN-002", catRings, colContemporary, "Diamond", "18K", "6.2 gms", "Women", "Engagement",
                "A 1.5-carat VVS EF solitaire diamond mounted on a sleek 18K white gold platinum-finished band.",
                "Designed for everlasting promises, the Elysian Solitaire ring showcases a GIA-certified brilliant round cut diamond held firmly by a 6-prong crown setting with pave diamond shoulders.",
                true, true,
                List.of(
                        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&q=80",
                        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&q=80"
                ));

        createProduct("Nakshi Heritage Gold Bangles (Set of 2)", "KK-BG-003", catBangles, colTraditional, "Gold", "22K", "54.0 gms", "Women", "Wedding",
                "Heavily carved 22K Nakshi gold broad kadas depicting auspicious Goddess Lakshmi motifs.",
                "Crafted using ancient South Indian Temple embossing technique, these broad bangles reflect rich Indian mythology and tradition. Comes with a screw lock mechanism for secure wear.",
                true, false,
                List.of(
                        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&q=80",
                        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1000&q=80"
                ));

        createProduct("Temple Heritage Jhumka Earrings", "KK-ER-004", catEarrings, colTraditional, "Gold", "22K", "28.5 gms", "Women", "Festival",
                "Classic multi-tier 22K antique gold Jhumkas with freshwater pearls and ruby embellishments.",
                "These traditional Jhumka earrings capture the grandeur of classical Indian festivals. Features intricate filigree work, tiny gold beads (ghungroos), and pearly drops.",
                true, true,
                List.of(
                        "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1000&q=80"
                ));

        createProduct("Classic Solid Gold Rope Chain", "KK-CH-005", catChains, colDailyWear, "Gold", "22K", "24.0 gms", "Men", "Daily Wear",
                "A robust 22K yellow gold twisted rope chain engineered for daily comfort and sheen.",
                "Precision twisted gold strands create a dense, highly durable chain that glistens from every angle. Ideal for executive daily wear or pairing with gold pendants.",
                false, false,
                List.of(
                        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&q=80"
                ));

        createProduct("Rajwada Bridal Haar & Maang Tikka Set", "KK-BR-006", catBridal, colBridal, "Gold", "22K", "145.0 gms", "Women", "Wedding",
                "A regal multi-layered bridal Haar set with matching chandeliers and elaborate Maang Tikka.",
                "The ultimate masterpiece for a bride. Made with 22K gold, certified Polki diamonds, emerald cabochons, and hand-strung South Sea pearls.",
                true, true,
                List.of(
                        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&q=80",
                        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1000&q=80"
                ));

        createProduct("Imperial Men's Signet Diamond Ring", "KK-RN-007", catMens, colContemporary, "Diamond", "18K", "14.2 gms", "Men", "Party",
                "Bold 18K yellow gold signet ring embedded with a princess cut solitaire diamond.",
                "A strong masculine design featuring brushed satin gold finish with high-polish bevelled edges and a central VS clarity diamond accent.",
                false, true,
                List.of(
                        "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=1000&q=80"
                ));

        createProduct("Diamond Line Tennis Bracelet", "KK-BR-008", catBracelets, colContemporary, "Diamond", "18K", "18.5 gms", "Women", "Party",
                "Continuous row of brilliant round cut diamonds set in 18K rose gold four-prong links.",
                "Sophisticated and luminous, this tennis bracelet features 4.5 carats of total diamond weight with double safety clasp lock.",
                true, false,
                List.of(
                        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&q=80"
                ));

        createProduct("Subtle Floral Diamond Pendant Necklace", "KK-NK-009", catNecklaces, colDailyWear, "Diamond", "18K", "8.4 gms", "Women", "Daily Wear",
                "Minimalist 18K yellow gold chain featuring a blooming floral motif diamond pendant.",
                "Perfect for modern everyday elegance. Light, stylish, and comfortable for office or formal wear.",
                false, false,
                List.of(
                        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1000&q=80"
                ));

        createProduct("Cute Gold Kada for Toddlers", "KK-KD-010", catKids, colDailyWear, "Gold", "22K", "8.0 gms", "Kids", "Daily Wear",
                "Smooth rounded 22K yellow gold adjustable bangles with protective black seed beads.",
                "Specially designed for delicate wrists, featuring skin-safe smooth edges and traditional auspicious protection beads.",
                false, false,
                List.of(
                        "https://images.unsplash.com/photo-1611591475168-9a67a0528e08?w=1000&q=80"
                ));

        createProduct("South Indian Temple Gold Haram", "KK-NK-011", catNecklaces, colTraditional, "Gold", "22K", "82.0 gms", "Women", "Wedding",
                "Long traditional 22K gold temple Haram with detailed Lord Ganesha carvings.",
                "An heirloom piece depicting divine motifs carved in high relief 22K yellow gold, finished with antique red patina.",
                true, false,
                List.of(
                        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1000&q=80"
                ));

        createProduct("Celestial Diamond Drop Earrings", "KK-ER-012", catEarrings, colContemporary, "Diamond", "18K", "12.6 gms", "Women", "Party",
                "Cascading 18K white gold earrings encrusted with pear and marquise cut diamonds.",
                "Fluid movement and exceptional brilliant sparkle, designed to catch the light beautifully for evening galas.",
                false, true,
                List.of(
                        "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1000&q=80"
                ));
    }

    private void createProduct(
            String name, String code, Category cat, CollectionEntity col,
            String material, String purity, String weight, String gender, String occasion,
            String shortDesc, String fullDesc, boolean featured, boolean newArrival, List<String> imageUrls
    ) {
        Product p = new Product();
        p.setName(name);
        p.setProductCode(code);
        p.setCategory(cat);
        p.setCollection(col);
        p.setMaterial(material);
        p.setPurity(purity);
        p.setWeight(weight);
        p.setGender(gender);
        p.setOccasion(occasion);
        p.setShortDescription(shortDesc);
        p.setFullDescription(fullDesc);
        p.setFeatured(featured);
        p.setNewArrival(newArrival);
        p.setActive(true);

        int order = 0;
        for (String url : imageUrls) {
            ProductImage img = new ProductImage(url, order == 0, order++);
            p.addImage(img);
        }

        productRepository.save(p);
    }

    private void seedGallery() {
        galleryItemRepository.save(new GalleryItem("Royal Kundan Suite", "Jewellery", "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1000&q=80", 1));
        galleryItemRepository.save(new GalleryItem("Bridal Sanctuary Lounge", "Showroom", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&q=80", 2));
        galleryItemRepository.save(new GalleryItem("Solitaire Diamond Exhibition", "Events", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&q=80", 3));
        galleryItemRepository.save(new GalleryItem("Heritage Bride Couture", "Bridal", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&q=80", 4));
        galleryItemRepository.save(new GalleryItem("Master Artisan Workshop", "Showroom", "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=1000&q=80", 5));
        galleryItemRepository.save(new GalleryItem("Festival Gold Showcase", "Collections", "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1000&q=80", 6));
    }

    private void seedEnquiriesAndAppointments() {
        Enquiry e1 = new Enquiry("Sujata Rao", "+91 98490 12345", "sujata.rao@gmail.com", 1L, "The Royal Kundan Heritage Choker", "KK-NK-001", "I would like to inquire about the customization options for matching Jhumkas for this choker.");
        e1.setStatus("NEW");
        enquiryRepository.save(e1);

        Enquiry e2 = new Enquiry("Vikram Verma", "+91 97110 56789", "vikram.verma@hotmail.com", 2L, "Elysian Solitaire Diamond Ring", "KK-RN-002", "Interested in checking the ring size availability and GIA diamond certificate.");
        e2.setStatus("CONTACTED");
        e2.setInternalNotes("Called customer on Aug 20. Sent digital certificate PDF on WhatsApp.");
        enquiryRepository.save(e2);

        Appointment a1 = new Appointment("Ananya Reddy", "+91 99887 65432", "ananya.r@yahoo.com", LocalDate.now().plusDays(2), "03:00 PM", "Bridal Collection", "We would like a private consultation for a complete wedding jewellery package.");
        a1.setStatus("CONFIRMED");
        appointmentRepository.save(a1);
    }
}
