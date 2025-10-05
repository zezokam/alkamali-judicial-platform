/* 
 * المرجع القضائي - ملف JavaScript الرئيسي
 * تصميم: القاضي عزان الكمالي
 */

document.addEventListener('DOMContentLoaded', function() {
    // التنقل المتجاوب للأجهزة المحمولة
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // إغلاق القائمة عند النقر على أي رابط
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnMenuBtn && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
    
    // تحقق من وجود الصور وإضافة صور بديلة إذا لم تكن موجودة
    const logoPlaceholder = document.getElementById('logo-placeholder');
    if (logoPlaceholder && logoPlaceholder.naturalWidth === 0) {
        logoPlaceholder.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOEI2RTRFIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+2KfZhNmF2LHYrNi5PC90ZXh0Pgo8L3N2Zz4=';
    }
    
    // تحقق من وجود صور البطاقات وإضافة صور بديلة إذا لم تكن موجودة
    const cardImgPlaceholders = [
        document.getElementById('calculator-img-placeholder'),
        document.getElementById('references-img-placeholder'),
        document.getElementById('legal-img-placeholder')
    ];
    
    const placeholderColors = ['#8B6E4E', '#4A6741', '#9C4A1A'];
    const placeholderTexts = ['حاسبة', 'مراجع', 'موارد'];
    
    cardImgPlaceholders.forEach((img, index) => {
        if (img && img.naturalWidth === 0) {
            const color = placeholderColors[index % placeholderColors.length];
            const text = placeholderTexts[index % placeholderTexts.length];
            img.src = `data:image/svg+xml;base64,${btoa(`<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="200" fill="${color}"/>
                <text x="150" y="100" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
                </svg>`)}`;
        }
    });
});
