$(document).ready(function() {
    // Fetch data from numbers API
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        method: 'GET',
        success: function(response) {
            $('#api-content').html(`
                <div class="fade-in">
                    <i class="fas fa-info-circle me-2"></i>
                    ${response.text}
                </div>
            `);
        },
        error: function(error) {
            console.error('Error fetching data:', error);
            $('#api-content').html(`
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    Error loading content
                </div>
            `);
        }
    });

    // Upload box interactions
    const uploadBox = $('.upload-box');
    
    // Hover effect
    uploadBox.hover(
        function() {
            $(this).find('i').addClass('fa-bounce');
        },
        function() {
            $(this).find('i').removeClass('fa-bounce');
        }
    );

    // Click handler
    uploadBox.on('click', function() {
        // Will implement file upload functionality later
        $(this).addClass('upload-box-active');
        setTimeout(() => {
            $(this).removeClass('upload-box-active');
        }, 200);
    });

    // Smooth scroll for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // Add active class to nav items on scroll
    $(window).scroll(function() {
        const scrollPosition = $(window).scrollTop();
        
        $('section').each(function() {
            const currentSection = $(this);
            const sectionTop = currentSection.offset().top - 100;
            const sectionBottom = sectionTop + currentSection.height();
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = currentSection.attr('id');
                $('.nav-link').removeClass('active');
                $(`.nav-link[href="#${currentId}"]`).addClass('active');
            }
        });
    });
}); 